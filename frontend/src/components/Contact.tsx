"use client";

import { useState } from "react";
import { API_URL } from "@/config";
import { useLanguage } from "@/components/LanguageContext";

type ContactIcon = "location" | "linkedin" | "github";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!formData.name.trim()) { setStatus("error"); setErrorMessage(t("contact_err_required")); return; }
    if (!validateEmail(formData.email)) { setStatus("error"); setErrorMessage(t("contact_err_email")); return; }
    if (formData.message.trim().length < 10) { setStatus("error"); setErrorMessage(t("contact_err_msg")); return; }
    if (formData.message.trim().length > 250) { setStatus("error"); setErrorMessage(t("contact_err_msg_long")); return; }
    setStatus("loading");
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        if (response.status === 429) throw new Error("rate_limited");
        if (response.status === 400 || response.status === 422) throw new Error("rejected");
        throw new Error("HTTP error " + response.status);
      }
      setStatus("success"); setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      console.warn("Backend API not reachable. Contact request was not delivered.", err);
      setStatus("error");
      const errorType = err instanceof Error ? err.message : "";
      if (errorType === "rate_limited") {
        setErrorMessage(t("contact_err_rate_limited"));
      } else if (errorType === "rejected") {
        setErrorMessage(t("contact_err_rejected"));
      } else {
        setErrorMessage(t("contact_err_failed"));
      }
    }
  };

  const contactInfo = [
    { icon: "location" as ContactIcon, label: "Location", value: t("location_label"), href: null },
    { icon: "linkedin" as ContactIcon, label: "LinkedIn", value: "Yichi Nien", href: "https://au.linkedin.com/in/zifuera17n9" },
    { icon: "github" as ContactIcon, label: "GitHub", value: "dec591nyc", href: "https://github.com/dec591nyc" },
  ];

  const renderContactIcon = (icon: ContactIcon) => {
    const commonProps = {
      width: 28,
      height: 28,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": true,
    };

    if (icon === "linkedin") {
      return (
        <svg {...commonProps} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#0A66C2" />
          <path d="M8.15 10.05H5.95V17.2H8.15V10.05Z" fill="#fff" />
          <path d="M7.05 8.95C7.77 8.95 8.35 8.37 8.35 7.68C8.35 6.98 7.77 6.42 7.05 6.42C6.33 6.42 5.75 6.98 5.75 7.68C5.75 8.37 6.33 8.95 7.05 8.95Z" fill="#fff" />
          <path d="M10.05 10.05H12.15V11.02C12.45 10.46 13.22 9.88 14.42 9.88C16.7 9.88 17.2 11.38 17.2 13.32V17.2H15V13.62C15 12.77 14.98 11.68 13.82 11.68C12.63 11.68 12.45 12.6 12.45 13.56V17.2H10.05V10.05Z" fill="#fff" />
        </svg>
      );
    }

    if (icon === "github") {
      return (
        <svg {...commonProps} viewBox="0 0 24 24">
          <path
            d="M12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 16.08 5.39 19.54 9.05 20.77C9.51 20.86 9.68 20.57 9.68 20.33C9.68 20.11 9.67 19.53 9.66 18.76C7.1 19.31 6.56 17.66 6.56 17.66C6.14 16.6 5.54 16.32 5.54 16.32C4.71 15.75 5.6 15.76 5.6 15.76C6.52 15.82 7 16.7 7 16.7C7.82 18.1 9.15 17.7 9.67 17.46C9.75 16.87 9.99 16.46 10.25 16.23C8.21 16 6.06 15.21 6.06 11.68C6.06 10.68 6.42 9.86 7.01 9.22C6.91 8.99 6.6 8.05 7.1 6.79C7.1 6.79 7.87 6.54 9.64 7.73C10.38 7.52 11.17 7.42 11.96 7.42C12.75 7.42 13.54 7.52 14.28 7.73C16.05 6.54 16.82 6.79 16.82 6.79C17.32 8.05 17.01 8.99 16.91 9.22C17.5 9.86 17.86 10.68 17.86 11.68C17.86 15.22 15.71 16 13.66 16.23C13.99 16.52 14.28 17.08 14.28 18.02C14.28 19.31 14.27 20.04 14.27 20.33C14.27 20.58 14.43 20.87 14.91 20.77C18.57 19.53 21.25 16.08 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
            fill="var(--fg-color)"
          />
        </svg>
      );
    }

    return (
      <svg {...commonProps}>
        <path d="M12 21C12 21 19 14.42 19 9.8C19 5.94 15.87 3 12 3C8.13 3 5 5.94 5 9.8C5 14.42 12 21 12 21Z" stroke="var(--olive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12.25C13.24 12.25 14.25 11.24 14.25 10C14.25 8.76 13.24 7.75 12 7.75C10.76 7.75 9.75 8.76 9.75 10C9.75 11.24 10.76 12.25 12 12.25Z" stroke="var(--olive)" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <section id="contact" style={{ padding: "76px 5%", background: "var(--bg-color)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "42px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>{t("contact_badge")}</span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
            fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em", color: "var(--fg-color)", lineHeight: 1.1,
          }}>
            {t("contact_title")}<span style={{ color: "var(--orange)" }}>.</span>
          </h2>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "28px", alignItems: "start" }} className="contact-grid">
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {contactInfo.map((item) => (
              <div key={item.label} className="card"
                style={{ padding: "18px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "14px", background: "var(--bg-card)", border: "1px solid var(--card-border)" }}
              >
                <div style={{
                  width: "54px", height: "54px", borderRadius: "14px",
                  background: "var(--bg-card-inner)", border: "1px solid var(--card-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                  flexShrink: 0,
                }}>
                  {renderContactIcon(item.icon)}
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "var(--fg-subtle)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer"
                      style={{ color: "var(--olive)", fontWeight: "700", fontSize: "0.88rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--olive-dark)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--olive)")}
                    >
                      {item.value} ↗
                    </a>
                  ) : (
                    <span
                      style={{
                        color: item.label === "Location" ? "var(--olive)" : "var(--fg-color)",
                        fontWeight: item.label === "Location" ? "800" : "600",
                        fontSize: "0.88rem",
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability banner */}
            <div style={{
              padding: "16px 18px", borderRadius: "12px",
              background: "var(--olive-tint)", border: "1.5px solid var(--olive-border)",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--olive)", flexShrink: 0, boxShadow: "0 0 8px var(--olive-glow)" }} />
              <div>
                <div style={{ fontWeight: "800", color: "var(--olive-dark)", fontSize: "0.85rem", letterSpacing: "0.03em" }}>{t("contact_avail_title")}</div>
                <div style={{ color: "var(--olive)", fontSize: "0.78rem", marginTop: "1px" }}>{t("contact_avail_desc")}</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card" style={{ padding: "30px", borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--card-border)" }}>
            {status === "success" ? (
              <div
                id="contact-success-banner"
                style={{
                  padding: "32px", borderRadius: "12px",
                  background: "var(--olive-tint)", border: "1.5px solid var(--olive-border)",
                  textAlign: "center", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>✅</span>
                <h3 style={{ color: "var(--olive-dark)", fontSize: "1.2rem" }}>{t("contact_success_title")}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--olive)" }}>
                  {t("contact_success_desc")}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: "8px", padding: "9px 22px", borderRadius: "6px",
                    background: "var(--olive-tint)", color: "var(--olive-dark)",
                    fontSize: "0.85rem", fontWeight: "700", border: "1px solid var(--olive-border)", cursor: "pointer",
                  }}
                >
                  {t("contact_success_btn")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {status === "error" && errorMessage && (
                  <div
                    id="contact-error-banner"
                    style={{
                      padding: "11px 14px", borderRadius: "8px",
                      background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.30)",
                      color: "var(--orange)", fontSize: "0.88rem", fontWeight: "600",
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label htmlFor="contact-name" style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--fg-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {t("contact_name_lbl")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    maxLength={80}
                    disabled={status === "loading"}
                    placeholder={t("contact_name_ph")}
                    style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)", color: "var(--fg-color)" }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label htmlFor="contact-email" style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--fg-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {t("contact_email_lbl")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    maxLength={120}
                    disabled={status === "loading"}
                    placeholder={t("contact_email_ph")}
                    style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)", color: "var(--fg-color)" }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label htmlFor="contact-message" style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--fg-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {t("contact_msg_lbl")}
                  </label>
                  <textarea
                    id="contact-message" rows={5}
                    maxLength={250}
                    disabled={status === "loading"}
                    placeholder={t("contact_msg_ph")}
                    style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)", color: "var(--fg-color)" }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--fg-subtle)", fontSize: "0.72rem", whiteSpace: "nowrap", fontFamily: "monospace" }}>
                      {formData.message.trim().length}/250
                    </span>
                  </div>
                  <p style={{ color: "var(--fg-subtle)", fontSize: "0.76rem", lineHeight: "1.55" }}>
                    {t("contact_delivery_note")}
                  </p>
                </div>

                <button
                  id="contact-submit-btn" type="submit"
                  disabled={status === "loading"}
                  style={{
                    padding: "14px 28px", borderRadius: "6px",
                    background: status === "loading" ? "var(--olive-tint)" : "var(--olive)",
                    color: "#ffffff", fontWeight: "700", fontSize: "0.85rem",
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    boxShadow: status === "loading" ? "none" : "0 4px 16px var(--olive-glow)",
                    display: "flex", justifyContent: "center", alignItems: "center", gap: "10px",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.background = "var(--olive-dark)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.background = "var(--olive)";
                    }
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <span style={{
                        width: "15px", height: "15px",
                        border: "2px solid rgba(255,255,255,0.40)",
                        borderTopColor: "#ffffff", borderRadius: "50%",
                        animation: "spin 1s linear infinite", display: "inline-block",
                      }} />
                      {t("contact_btn_sending")}
                    </>
                  ) : (
                    <>{t("contact_btn_send")} &rarr;</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
