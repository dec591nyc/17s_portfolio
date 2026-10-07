"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import PasswordField from "./PasswordField";
import { authErrorMessage } from "@/lib/authErrors";
import type { User } from "@supabase/supabase-js";
import { getSupabase, rememberSession } from "@/lib/supabase";
import { useLanguage } from "./LanguageContext";

type AuthState = { user: User | null; isAdmin: boolean; ready: boolean; openLogin: () => void; signOut: () => Promise<boolean> };
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();
  const zh = locale === "zh";
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let alive = true, generation = 0;
    const refresh = async () => {
      const current = ++generation;
      // getUser validates with Auth; RLS independently validates every write.
      const { data } = await supabase.auth.getUser();
      let allowed = false;
      if (data.user) {
        const result = await supabase.from("site_admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
        allowed = !result.error && !!result.data;
      }
      if (alive && current === generation) { setUser(data.user); setIsAdmin(allowed); setReady(true); }
    };
    void refresh();
    // Do not await Supabase calls inside the auth callback (SDK lock).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setIsAdmin(false); setReady(false);
      setTimeout(() => { if (alive) void refresh(); }, 0);
    });
    return () => { alive = false; subscription.unsubscribe(); };
  }, []);

  const openLogin = useCallback(() => { setError(""); setInfo(""); dialog.current?.showModal(); }, []);
  const signOut = async () => {
    if (!window.dispatchEvent(new Event("notes:before-signout", { cancelable: true }))) return false;
    const supabase = getSupabase();
    if (supabase) {
      const { error: failure } = await supabase.auth.signOut({ scope: "local" });
      if (failure) { openLogin(); setError(zh ? "登出未完成，請重試。" : "Sign out failed. Please retry."); return false; }
    }
    window.dispatchEvent(new Event("notes:signed-out"));
    setUser(null); setIsAdmin(false); return true;
  };

  return <AuthContext.Provider value={{ user, isAdmin, ready, openLogin, signOut }}>
    {children}
    <dialog className="notes-login" ref={dialog} onCancel={event => { if (busy) event.preventDefault(); }}>
      <form onSubmit={async event => {
        event.preventDefault(); if (busy) return; setError(""); setInfo("");
        const supabase = getSupabase();
        if (!supabase) { setError(zh ? "登入服務尚未設定，請稍後再試。" : "Sign-in is not configured yet."); return; }
        const form = event.currentTarget;
        const fields = new FormData(form);
        setBusy(true);
        try {
          rememberSession(fields.get("remember") === "on");
          const { data, error: failure } = await supabase.auth.signInWithPassword({ email: String(fields.get("email")).trim(), password: String(fields.get("password")) });
          if (failure || !data.user) { setError(authErrorMessage(failure, zh)); return; }
          const admin = await supabase.from("site_admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
          if (admin.error || !admin.data) {
            await supabase.auth.signOut({ scope: "local" });
            setError(zh ? "此帳號沒有筆記管理權限。" : "This account cannot manage notes."); return;
          }
          setUser(data.user); setIsAdmin(true); setReady(true);
          form.reset(); dialog.current?.close();
        } catch { setError(zh ? "連線失敗，請稍後再試。" : "Connection failed. Please retry."); }
        finally { setBusy(false); }
      }}>
        <div className="notes-dialog-heading"><h2>{zh ? "管理員登入" : "Administrator sign-in"}</h2><button type="button" disabled={busy} onClick={() => dialog.current?.close()} aria-label={zh ? "關閉" : "Close"}>×</button></div>
        <label>{zh ? "電子郵件" : "Email"}<input ref={emailInput} name="email" type="email" autoComplete="username" required disabled={busy} /></label>
        <PasswordField label={zh ? "密碼" : "Password"} name="password" autoComplete="current-password" disabled={busy} zh={zh} />
        <label className="notes-checkbox"><input name="remember" type="checkbox" disabled={busy} />{zh ? "在此裝置保持登入" : "Keep me signed in on this device"}</label>
        {error && <p className="notes-error" role="alert">{error}</p>}
        {info && <p role="status">{info}</p>}
        <button className="notes-primary" disabled={busy}>{busy ? (zh ? "處理中…" : "Working…") : (zh ? "登入" : "Sign in")}</button>
        <button type="button" className="notes-quiet" disabled={busy} onClick={async () => {
          const email = emailInput.current;
          if (!email?.value || !email.reportValidity()) { email?.focus(); return; }
          const supabase = getSupabase();
          if (!supabase) { setError(zh ? "登入服務尚未設定。" : "Sign-in is not configured."); return; }
          setBusy(true); setError(""); setInfo("");
          try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: `${window.location.origin}/auth/reset` });
            if (error) setError(authErrorMessage(error, zh));
            else setInfo(zh ? "若帳號存在，將收到密碼重設郵件。" : "If the account exists, a reset email will arrive.");
          } catch { setError(zh ? "連線失敗，請稍後重試。" : "Connection failed. Please retry."); }
          finally { setBusy(false); }
        }}>{zh ? "忘記密碼" : "Forgot password"}</button>
      </form>
    </dialog>
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth requires AuthProvider");
  return context;
}
