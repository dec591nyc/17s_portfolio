import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
const preferenceKey = "portfolio-remember-session";

// This stores session tokens, never the user's password. With "remember" off,
// tokens live only in this tab's sessionStorage, not persistent localStorage.
const sessionStorageAdapter = {
  getItem(key: string) {
    return window.localStorage.getItem(preferenceKey) === "yes"
      ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
  },
  setItem(key: string, value: string) {
    const persistent = window.localStorage.getItem(preferenceKey) === "yes";
    (persistent ? window.sessionStorage : window.localStorage).removeItem(key);
    (persistent ? window.localStorage : window.sessionStorage).setItem(key, value);
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

export function rememberSession(remember: boolean) {
  window.localStorage.setItem(preferenceKey, remember ? "yes" : "no");
}

export function getSupabase(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: sessionStorageAdapter },
  });
  return client;
}
