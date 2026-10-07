"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function PasswordField({ label, name, autoComplete, disabled, minLength, zh }: {
  label: string; name: string; autoComplete: "current-password" | "new-password";
  disabled?: boolean; minLength?: number; zh: boolean;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const form = input.current?.form;
    const dialog = input.current?.closest("dialog");
    const hide = () => setVisible(false);
    form?.addEventListener("reset", hide);
    dialog?.addEventListener("close", hide);
    return () => { form?.removeEventListener("reset", hide); dialog?.removeEventListener("close", hide); };
  }, []);
  return <div>
    <label htmlFor={id}>{label}</label>
    <div className="notes-password-field">
      <input ref={input} id={id} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} minLength={minLength} required disabled={disabled} autoCapitalize="none" spellCheck={false} />
      <button type="button" disabled={disabled} aria-controls={id} aria-pressed={visible} aria-label={`${visible ? (zh ? "隱藏" : "Hide") : (zh ? "顯示" : "Show")} ${label}`} onClick={() => setVisible(value => !value)}>{visible ? (zh ? "隱藏" : "Hide") : (zh ? "顯示" : "Show")}</button>
    </div>
  </div>;
}
