"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageContext";
import { getSupabase } from "@/lib/supabase";
import { type Note, noteFields, validateNote } from "@/lib/notes";

type Draft = { title: string; body: string; category: string; tags: string };
const emptyDraft: Draft = { title: "", body: "", category: "工作心得", tags: "" };

export default function NotesPage() {
  const { isAdmin, ready, user } = useAuth();
  const { locale } = useLanguage();
  const zh = locale === "zh";
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [tab, setTab] = useState("published");
  const [selected, setSelected] = useState<string | null>(null);
  const [editor, setEditor] = useState<Note | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);
  const deleteDialog = useRef<HTMLDialogElement>(null);
  const revision = useRef(0);

  const load = useCallback(async () => {
    const current = ++revision.current;
    const supabase = getSupabase();
    setLoading(true); setFailed(false);
    if (!supabase) { setFailed(true); setLoading(false); return; }
    try {
      let request = supabase.from("notes").select(noteFields).order("created_at", { ascending: false });
      // RLS is authoritative. These filters also avoid retaining draft UI data on logout.
      if (!isAdmin) request = request.eq("status", "published").is("deleted_at", null);
      const { data, error } = await request;
      if (current !== revision.current) return;
      if (error) { setNotes([]); setFailed(true); }
      else setNotes((data || []) as Note[]);
    } catch { if (current === revision.current) { setNotes([]); setFailed(true); } }
    finally { if (current === revision.current) setLoading(false); }
  }, [isAdmin]);

  useEffect(() => {
    const counter = revision;
    const timer = setTimeout(() => { if (ready) void load(); }, 0);
    return () => { clearTimeout(timer); counter.current++; };
  }, [ready, load]);
  useEffect(() => {
    const sync = () => setSelected(new URL(window.location.href).searchParams.get("note"));
    const timer = setTimeout(sync, 0); window.addEventListener("popstate", sync);
    return () => { clearTimeout(timer); window.removeEventListener("popstate", sync); };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    const beforeSignOut = (event: Event) => {
      if (busy || (dirty && !window.confirm(zh ? "尚有未儲存內容，確定放棄修改並登出？" : "Discard unsaved changes and sign out?"))) event.preventDefault();
    };
    const signedOut = () => {
      setEditor(null); setDraft(emptyDraft); setDirty(false); setNotes([]);
      setDeleteTarget(null); deleteDialog.current?.close();
    };
    window.addEventListener("notes:before-signout", beforeSignOut);
    window.addEventListener("notes:signed-out", signedOut);
    return () => {
      window.removeEventListener("notes:before-signout", beforeSignOut);
      window.removeEventListener("notes:signed-out", signedOut);
    };
  }, [busy, dirty, zh]);

  const openNote = (id: string | null) => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("note", id); else url.searchParams.delete("note");
    window.history.pushState(null, "", url); setSelected(id); setMessage("");
  };
  const startEdit = (note: Note | "new") => {
    setEditor(note); setDirty(false); setMessage("");
    setDraft(note === "new" ? emptyDraft : { title: note.title, body: note.body, category: note.category, tags: note.tags.join(", ") });
  };
  const stopEdit = () => {
    if (dirty && !window.confirm(zh ? "尚有未儲存內容，要放棄修改嗎？" : "Discard unsaved changes?")) return;
    setEditor(null); setDirty(false);
  };
  const mutationFailure = (conflict: boolean) => setMessage(conflict
    ? (zh ? "這篇筆記已被其他視窗修改，或權限已變更。請先複製目前內容，再重新載入。" : "This note changed in another window, or access changed. Copy your edits before reloading.")
    : (zh ? "儲存失敗，內容仍保留在編輯器中。請確認連線或重新登入後重試。" : "Save failed. Your edits are still in the editor. Check your connection or sign in again."));

  const save = async (status: "draft" | "published") => {
    const supabase = getSupabase();
    if (!supabase || !isAdmin || !user || !editor || busy) return;
    const tags = [...new Set(draft.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean))];
    if (!validateNote(draft.title, draft.body, draft.category, tags)) {
      setMessage(zh ? "請填寫標題、內文與分類；標籤最多 12 個，每個 40 字。" : "Add a title, body and category. Use at most 12 tags, 40 characters each."); return;
    }
    setBusy(true); setMessage("");
    try {
      const payload = { title: draft.title.trim(), body: draft.body, category: draft.category.trim(), tags, status,
        published_at: status === "published" ? (editor !== "new" && editor.published_at || new Date().toISOString()) : null };
      const result = editor === "new"
        ? await supabase.from("notes").insert({ ...payload, author_id: user.id }).select(noteFields).single()
        : await supabase.from("notes").update(payload).eq("id", editor.id).eq("updated_at", editor.updated_at).select(noteFields).maybeSingle();
      if (result.error || !result.data) { mutationFailure(!result.error); return; }
      setDirty(false); setEditor(null); setTab(status); setCategory(""); setQuery("");
      openNote(result.data.id); await load();
      setMessage(zh ? (status === "published" ? "已發布，訪客現在可以閱讀。" : "草稿已儲存，僅管理員可見。") : (status === "published" ? "Published for everyone to read." : "Draft saved; administrators only."));
    } catch { mutationFailure(false); }
    finally { setBusy(false); }
  };

  const trash = async (note: Note, restore = false) => {
    const supabase = getSupabase();
    if (!supabase || !isAdmin || busy) return;
    setBusy(true); setMessage("");
    try {
      // Restoring never republishes automatically.
      const { data, error } = await supabase.from("notes").update({ deleted_at: restore ? null : new Date().toISOString(), status: "draft", published_at: null })
        .eq("id", note.id).eq("updated_at", note.updated_at).select("id").maybeSingle();
      if (error || !data) { mutationFailure(!error); return; }
      deleteDialog.current?.close(); setDeleteTarget(null); openNote(null); await load();
      setMessage(zh ? (restore ? "已復原為草稿。" : "已移至垃圾桶，可隨時復原。") : (restore ? "Restored as a draft." : "Moved to trash. You can restore it."));
    } catch { mutationFailure(false); }
    finally { setBusy(false); }
  };

  // Hide private data immediately even while the next request is in flight.
  const visible = isAdmin ? notes : notes.filter(n => n.status === "published" && !n.deleted_at);
  const activeTab = isAdmin ? tab : "published";
  const inTab = visible.filter(n => activeTab === "trash" ? !!n.deleted_at : !n.deleted_at && n.status === activeTab);
  const categories = [...new Set(inTab.map(n => n.category))].sort();
  const filtered = inTab.filter(n => (!category || n.category === category) && `${n.title} ${n.body} ${n.tags.join(" ")}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const note = visible.find(n => n.id === selected);
  const date = (n: Note) => new Date(n.published_at || n.created_at).toLocaleDateString(zh ? "zh-TW" : "en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
  const controls = (n: Note) => isAdmin && <div className="notes-row-actions">{n.deleted_at ? <button disabled={busy} onClick={() => void trash(n, true)}>{zh ? "復原為草稿" : "Restore draft"}</button> : <><button disabled={busy} onClick={() => startEdit(n)}>{zh ? "編輯" : "Edit"}</button><button disabled={busy} onClick={() => { setDeleteTarget(n); deleteDialog.current?.showModal(); }}>{zh ? "刪除" : "Delete"}</button></>}</div>;

  return <main className="notes-page">
    <div className="notes-heading"><div><span className="section-badge">WORK NOTES</span><h1>{zh ? "工作筆記" : "Work Notes"}<span>.</span></h1><p>{zh ? "記錄實作、問題排查與工作心得。" : "Implementation notes, troubleshooting and reflections."}</p></div>{isAdmin && !editor && <button className="notes-primary" onClick={() => startEdit("new")}>＋ {zh ? "新增筆記" : "New note"}</button>}</div>
    {message && <p className="notes-message" role="status">{message}</p>}
    {editor ? <section className="notes-editor">
      <div className="notes-editor-heading"><h2>{editor === "new" ? (zh ? "新增筆記" : "New note") : (zh ? "編輯筆記" : "Edit note")}</h2><button disabled={busy} onClick={stopEdit}>{zh ? "取消" : "Cancel"}</button><button disabled={busy || !isAdmin} onClick={() => void save("draft")}>{zh ? (editor !== "new" && editor.status === "published" ? "取消發布並存為草稿" : "儲存草稿") : (editor !== "new" && editor.status === "published" ? "Unpublish and save draft" : "Save draft")}</button><button className="notes-primary" disabled={busy || !isAdmin} onClick={() => void save("published")}>{busy ? (zh ? "儲存中…" : "Saving…") : (zh ? "發布" : "Publish")}</button></div>
      {!isAdmin && <p role="alert">{zh ? "登入已失效，請重新登入。未儲存內容仍保留。" : "Please sign in again. Your unsaved edits are preserved."}</p>}
      <label>{zh ? "標題" : "Title"}<input maxLength={160} value={draft.title} onChange={e => { setDraft({ ...draft, title: e.target.value }); setDirty(true); }} /></label>
      <div className="notes-editor-columns"><label>{zh ? "分類" : "Category"}<input maxLength={60} value={draft.category} onChange={e => { setDraft({ ...draft, category: e.target.value }); setDirty(true); }} /></label><label>{zh ? "標籤（以逗號分隔）" : "Tags (comma separated)"}<input value={draft.tags} onChange={e => { setDraft({ ...draft, tags: e.target.value }); setDirty(true); }} /></label></div>
      <label>{zh ? "筆記內容" : "Content"}<textarea className="notes-body-input" rows={16} maxLength={100000} value={draft.body} onChange={e => { setDraft({ ...draft, body: e.target.value }); setDirty(true); }} /></label>
      <p className="notes-muted">{dirty ? (zh ? "尚未儲存" : "Unsaved changes") : (zh ? "內容以純文字保存，保留換行。" : "Plain text with line breaks preserved.")}</p>
    </section> : <>
      {selected && <button className="notes-back" onClick={() => openNote(null)}>← {zh ? "所有工作筆記" : "All notes"}</button>}
      {loading || !ready ? <p className="notes-empty" role="status">{zh ? "讀取筆記中…" : "Loading notes…"}</p> : failed ? <div className="notes-empty" role="alert"><p>{zh ? "暫時無法讀取筆記，請稍後重試。" : "Notes are temporarily unavailable."}</p><button onClick={() => void load()}>{zh ? "重新載入" : "Retry"}</button></div> : selected ? note ? <article className="notes-article"><p className="notes-muted">{date(note)} · {note.category}{note.status === "draft" && (zh ? " · 草稿" : " · Draft")}</p><h2>{note.title}</h2><div className="notes-tags">{note.tags.map(t => <span key={t}>{t}</span>)}</div>{controls(note)}<div className="notes-body">{note.body}</div></article> : <p className="notes-empty">{zh ? "找不到這篇筆記，或內容尚未公開。" : "This note was not found or is not public."}</p> : <>
        {isAdmin && <div className="notes-admin-tabs" aria-label={zh ? "筆記狀態" : "Note status"}>{["published", "draft", "trash"].map((value, i) => <button key={value} aria-pressed={activeTab === value} onClick={() => { setTab(value); setCategory(""); }}>{(zh ? ["已發布", "草稿", "垃圾桶"] : ["Published", "Drafts", "Trash"])[i]}</button>)}</div>}
        <div className="notes-filters"><button aria-pressed={!category} onClick={() => setCategory("")}>{zh ? "全部" : "All"}</button>{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={zh ? "搜尋筆記…" : "Search notes…"} aria-label={zh ? "搜尋筆記" : "Search notes"} /></div>
        {!filtered.length && <p className="notes-empty">{query || category ? (zh ? "沒有符合條件的筆記。" : "No matching notes.") : (zh ? (activeTab === "published" ? "工作筆記整理中，發布後會顯示在這裡。" : "目前沒有筆記。") : "No notes here yet.")}</p>}
        {filtered.map(n => <article className="notes-row" key={n.id}><time dateTime={n.published_at || n.created_at}>{date(n)}</time><div><a className="notes-title" href={`/notes?note=${n.id}`} onClick={e => { if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) { e.preventDefault(); openNote(n.id); } }}>{n.title}</a><div className="notes-tags"><span>{n.category}</span>{n.tags.map(t => <span key={t}>{t}</span>)}</div></div>{controls(n)}</article>)}
      </>}
    </>}
    <dialog className="notes-login" ref={deleteDialog} onCancel={event => { if (busy) event.preventDefault(); }}><h2>{zh ? "移至垃圾桶？" : "Move to trash?"}</h2><p>{deleteTarget?.title}</p><p>{zh ? "訪客將無法閱讀這篇筆記，你可以從垃圾桶復原。" : "Visitors will no longer see this note. It can be restored from trash."}</p><div className="notes-row-actions"><button disabled={busy} onClick={() => deleteDialog.current?.close()}>{zh ? "取消" : "Cancel"}</button><button className="notes-primary" disabled={busy} onClick={() => deleteTarget && void trash(deleteTarget)}>{zh ? "移至垃圾桶" : "Move to trash"}</button></div></dialog>
  </main>;
}
