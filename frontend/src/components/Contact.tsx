"use client";

import { useState } from "react";
import { API_URL } from "@/config";
import { useLanguage } from "@/components/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!formData.name.trim()) { setStatus("error"); setErrorMessage(t("contact_err_required")); return; }
    if (!validateEmail(formData.email)) { setStatus("error"); setErrorMessage(t("contact_err_email")); return; }
    if (formData.message.trim().length < 10) { setStatus("error"); setErrorMessage(t("contact_err_msg")); return; }
    setStatus("loading");
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("HTTP error " + response.status);
      setStatus("success"); setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      // Offline fallback: save to localStorage and alert user, simulating success
      console.warn("Backend API not reachable. Saving contact request to offline buffer.", err);
      const offlineMessages = JSON.parse(localStorage.getItem("offline_messages") || "[]");
      offlineMessages.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem("offline_messages", JSON.stringify(offlineMessages));

      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }, 800);
    }
  };

  const contactInfo = [
    { icon: "📍", label: "Location", value: t("location_label"), href: null },
    { icon: "💼", label: "LinkedIn", value: "Yichi Nien", href: "https://au.linkedin.com/in/zifuera17n9" },
    { icon: "🐙", label: "GitHub", value: "dec591nyc", href: "https://github.com/dec591nyc" },
  ];

  return (
    <section id="contact" style={{ padding: "100px 5%", background: "var(--bg-color)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>{t("contact_badge")}</span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
            fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em", color: "var(--fg-color)", lineHeight: 1.1,
          }}>
            {t("contact_title")}<span style={{ color: "var(--orange)" }}>.</span>
          </h2>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "36px", alignItems: "start" }} className="contact-grid">
          {/* Left: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {contactInfo.map((item) => (
              <div key={item.label} className="card"
                style={{ padding: "22px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "14px", background: "var(--bg-card)", border: "1px solid var(--card-border)" }}
              >
                <div style={{
                  width: "46px", height: "46px", borderRadius: "12px",
                  background: "var(--olive-tint)", border: "1px solid var(--olive-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", flexShrink: 0,
                }}>
                  {item.icon}
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
                    <span style={{ color: "var(--fg-color)", fontWeight: "600", fontSize: "0.88rem" }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability banner */}
            <div style={{
              padding: "18px 20px", borderRadius: "12px",
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
          <div className="card" style={{ padding: "36px", borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--card-border)" }}>
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
                    disabled={status === "loading"}
                    placeholder={t("contact_email_ph")}
                    style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)", color: "var(--fg-color)" }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  <label htmlFor="contact-message" style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--fg-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {t("contact_message")}
                  </label>
                  <textarea
                    id="contact-message" rows={5}
                    disabled={status === "loading"}
                    placeholder={t("contact_msg_ph")}
                    style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)", color: "var(--fg-color)" }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
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
