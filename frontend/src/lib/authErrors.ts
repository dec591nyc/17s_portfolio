// Never show raw server messages or include credentials in diagnostics.
export function authErrorMessage(error: { code?: string; status?: number; name?: string } | null, zh: boolean) {
  switch (error?.code) {
    case "invalid_credentials": return zh ? "電子郵件或密碼不符。請用顯示按鈕確認輸入，並檢查密碼管理員是否填入舊密碼；仍無法登入可使用忘記密碼。" : "Email or password does not match. Show your entry and check whether your password manager filled an old password. Use Forgot password if needed.";
    case "same_password": return zh ? "新密碼與目前密碼相同，因此未變更。你可以使用目前密碼登入，或設定不同的新密碼。" : "The new password matches your current password; nothing changed. Sign in with your current password or choose a different one.";
    case "email_not_confirmed": return zh ? "電子郵件尚未驗證，請先完成帳號驗證。" : "Confirm your email before signing in.";
    case "weak_password": return zh ? "密碼強度不足，請使用較長且符合要求的新密碼。" : "Choose a stronger password that meets the requirements.";
    case "otp_expired":
    case "session_not_found": return zh ? "設定連結或登入階段已失效，請重新取得密碼重設郵件，並使用最新連結。" : "The link or session has expired. Request a new reset email and use its latest link.";
  }
  if (error?.status === 429) return zh ? "操作過於頻繁，請稍候再試，避免連續送出。" : "Too many attempts. Wait before trying again.";
  if (error?.name === "AuthRetryableFetchError" || (error?.status || 0) >= 500) return zh ? "登入服務暫時無法連線，請稍後重試。" : "The authentication service is temporarily unavailable. Please retry later.";
  return zh ? "驗證未完成，請重新登入；若正在設定密碼，請重新取得重設連結。" : "Authentication could not be completed. Sign in again, or request a new link when resetting your password.";
}
