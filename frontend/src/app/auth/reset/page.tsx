"use client";

import { useEffect, useState } from "react";
import PasswordField from "@/components/PasswordField";
import { authErrorMessage } from "@/lib/authErrors";
import Navbar from "@/components/Navbar";
import { getSupabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageContext";

export default function ResetPassword() {
  const { locale } = useLanguage();
  const zh = locale === "zh";
  const [ready, setReady] = useState(false), [busy, setBusy] = useState(false), [message, setMessage] = useState("");
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let alive = true;
    void supabase.auth.getUser().then(({ data }) => { if (alive) setReady(!!data.user); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { if (alive) setReady(!!session); });
    return () => { alive = false; data.subscription.unsubscribe(); };
  }, []);
  return <><Navbar /><main className="notes-page"><form className="notes-editor" onSubmit={async e => {
    e.preventDefault(); if (busy) return; setMessage(""); const form = e.currentTarget; const fields = new FormData(form);
    const password = String(fields.get("password"));
    if (password !== fields.get("confirm")) { setMessage(zh ? "兩次密碼不同。" : "Passwords do not match."); return; }
    const supabase = getSupabase(); if (!supabase || !ready) return;
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setMessage(authErrorMessage(error, zh));
      else { form.reset(); setMessage(zh ? "密碼已更新，可返回工作筆記。" : "Password updated. You can return to Work Notes."); }
    } catch { setMessage(zh ? "連線失敗，請重試。" : "Connection failed. Please retry."); }
    finally { setBusy(false); }
  }}><h1>{zh ? "設定密碼" : "Set password"}</h1><p>{zh ? "請從密碼設定或重設郵件中的連結進入此頁。" : "Open this page using the link in your setup or recovery email."}</p><PasswordField label={zh ? "新密碼（至少 12 字元）" : "New password (at least 12 characters)"} name="password" autoComplete="new-password" minLength={12} disabled={!ready || busy} zh={zh} /><PasswordField label={zh ? "確認密碼" : "Confirm password"} name="confirm" autoComplete="new-password" minLength={12} disabled={!ready || busy} zh={zh} /><button className="notes-primary" disabled={!ready || busy}>{zh ? "儲存密碼" : "Save password"}</button>{message && <p role="status">{message}</p>}<p><a href="/notes">{zh ? "返回工作筆記" : "Back to Work Notes"}</a></p></form></main></>;
}
