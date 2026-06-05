"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useEffect, useState } from "react";

export default function Hero() {
  const { t, locale } = useLanguage();
  const [liveTime, setLiveTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString(locale === "en" ? "en-US" : "zh-TW", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  const stats = [
    { val: t("db_stat_exp_val"), lbl: t("db_stat_exp_lbl"), icon: "💼" },
    { val: t("db_stat_proj_val"), lbl: t("db_stat_proj_lbl"), icon: "🚀" },
    { val: t("db_stat_skills_val"), lbl: t("db_stat_skills_lbl"), icon: "🛠️" },
    { val: t("db_stat_status_val"), lbl: t("db_stat_status_lbl"), icon: "🟢" },
  ];

  const coreTech = ["Python", "SQL / Postgres", "Next.js", "Power BI", "Docker", "FastAPI", "Kubernetes"];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "120px 5% 80px 5%",
        background: "var(--bg-color)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Editorial ghost background text */}
      <div style={{
        position: "absolute", bottom: "2%", left: "-2%",
        fontSize: "clamp(100px, 16vw, 220px)",
        fontWeight: "900", fontFamily: "var(--font-outfit)",
        color: "var(--orange-tint)",
        letterSpacing: "-0.05em", lineHeight: 1,
        userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none",
        zIndex: 0,
      }}>
        DASHBOARD
      </div>

      <div style={{ maxWidth: "1200px", width: "100%", zIndex: 10, display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Top Header Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "16px", borderBottom: "1px solid var(--card-border)",
          paddingBottom: "20px",
        }}>
          <div>
            <span className="section-badge" style={{ marginBottom: "8px" }}>
              {t("db_telemetry")}
            </span>
            <h1 style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em",
              color: "var(--fg-color)", lineHeight: 1.1,
            }}>
              {t("db_welcome")}<span style={{ color: "var(--orange)" }}>.</span>
            </h1>
            <p style={{ color: "var(--fg-subtle)", fontSize: "0.92rem", marginTop: "4px" }}>
              {t("db_subtitle")}
            </p>
          </div>
          {/* Live system clock widget */}
          <div className="card" style={{
            padding: "10px 18px", borderRadius: "8px", background: "var(--bg-card-inner)",
            display: "flex", alignItems: "center", gap: "10px", border: "1px solid var(--card-border)",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: "0.80rem", fontWeight: "700", letterSpacing: "0.06em", color: "var(--fg-muted)" }}>
              LIVE: <span style={{ color: "var(--orange)", fontFamily: "monospace" }}>{liveTime}</span>
            </span>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="card" style={{
              padding: "20px", display: "flex", alignItems: "center", gap: "16px",
              background: "var(--bg-card)", border: "1px solid var(--card-border)",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "10px",
                background: idx === 3 ? "var(--olive-tint)" : "var(--orange-tint)",
                border: idx === 3 ? "1px solid var(--olive-border)" : "1px solid var(--orange-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem",
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontSize: "1.6rem", fontWeight: "900", color: idx === 3 ? "var(--olive)" : "var(--orange)",
                  fontFamily: "var(--font-outfit)", lineHeight: 1.1,
                }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", fontWeight: "600", marginTop: "2px" }}>
                  {stat.lbl}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid: Left Profile & Tech, Right Timeline Sparkline */}
        <div style={{
          display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px",
        }} className="dashboard-main-grid">
          {/* Left panel: Summary & Skills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Profile Summary Card */}
            <div className="card" style={{ padding: "28px", background: "var(--bg-card)" }}>
              <h3 style={{
                fontSize: "1.2rem", fontWeight: "800", color: "var(--fg-color)",
                marginBottom: "12px", fontFamily: "var(--font-outfit)", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span>👤</span> {t("db_profile_title")}
              </h3>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.92rem", lineHeight: "1.75", marginBottom: "20px" }}>
                {t("db_profile_desc")}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="#projects"
                  style={{
                    padding: "10px 22px", borderRadius: "6px",
                    background: "var(--olive)", color: "#ffffff",
                    fontSize: "0.80rem", fontWeight: "700",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    boxShadow: "0 2px 8px var(--olive-glow)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--olive-dark)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--olive)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {t("view_work")}
                </a>
                <a
                  href="#contact"
                  style={{
                    padding: "10px 22px", borderRadius: "6px",
                    border: "1.5px solid var(--olive)", color: "var(--olive)",
                    fontSize: "0.80rem", fontWeight: "700",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--olive)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--olive)";
                  }}
                >
                  {t("contact_me")}
                </a>
              </div>
            </div>

            {/* Core Stack widget */}
            <div className="card" style={{ padding: "24px", background: "var(--bg-card)" }}>
              <h3 style={{
                fontSize: "1rem", fontWeight: "800", color: "var(--fg-color)",
                marginBottom: "14px", fontFamily: "var(--font-outfit)", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span>🥞</span> {t("db_tech_stack")}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {coreTech.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag"
                    style={{
                      padding: "6px 14px", fontSize: "0.80rem", borderRadius: "6px",
                      background: "var(--bg-card-inner)", border: "1px solid var(--card-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Career Path Sparkline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card" style={{ padding: "28px", background: "var(--bg-card)", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{
                fontSize: "1.2rem", fontWeight: "800", color: "var(--fg-color)",
                marginBottom: "4px", fontFamily: "var(--font-outfit)", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span>📈</span> {t("db_timeline_title")}
              </h3>
              <p style={{ color: "var(--fg-subtle)", fontSize: "0.78rem", marginBottom: "24px" }}>
                {t("db_timeline_subtitle")}
              </p>

              {/* Sparkline Visual Nodes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "space-between" }}>
                {[
                  { company: "NCHU", role: "AI & Data Analysis (Taiwan)", year: "2026", color: "var(--olive)" },
                  { company: "St Peter's College", role: "Data Specialist (Adelaide)", year: "2025", color: "var(--orange)" },
                  { company: "UniSA", role: "Master of IT (Adelaide)", year: "2024-2025", color: "var(--olive)" },
                  { company: "FarEasTone", role: "Advanced Software Eng. (Taiwan)", year: "2020-2022", color: "var(--orange)" },
                  { company: "South China Insurance", role: "Software Programmer (Taiwan)", year: "2017-2020", color: "var(--orange)" },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "14px", position: "relative" }}>
                    {/* Connecting line */}
                    {idx < 4 && (
                      <div style={{
                        position: "absolute", left: "9px", top: "18px", bottom: "-18px",
                        width: "2px", background: "var(--card-border)",
                        zIndex: 1,
                      }} />
                    )}
                    {/* Dot */}
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: item.color, border: "4px solid var(--bg-card)",
                      boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                      zIndex: 2, marginTop: "2px",
                    }} />
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--fg-color)" }}>
                        {item.company}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "1px" }}>
                        {item.role}
                      </div>
                      <div style={{ fontSize: "0.70rem", color: "var(--fg-subtle)", fontFamily: "monospace" }}>
                        {item.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav Dashboard panel */}
        <div className="card" style={{
          padding: "24px", background: "var(--bg-card)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px",
        }}>
          {[
            { target: "#experience", title: t("nav_background"), desc: t("db_nav_bg_desc"), icon: "📜" },
            { target: "#projects", title: t("nav_projects"), desc: t("db_nav_proj_desc"), icon: "📂" },
            { target: "#skills", title: t("nav_skills"), desc: t("db_nav_skills_desc"), icon: "⚡" },
          ].map((nav, i) => (
            <a
              key={i}
              href={nav.target}
              style={{
                display: "flex", gap: "14px", padding: "16px", borderRadius: "10px",
                background: "var(--bg-card-inner)", border: "1px solid var(--card-border)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--orange)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "1.5rem", marginTop: "2px" }}>{nav.icon}</div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: "800", color: "var(--fg-color)" }}>
                  {nav.title} &rarr;
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "3px", lineHeight: 1.4 }}>
                  {nav.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 6px var(--olive-glow); }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @media (max-width: 900px) {
          .dashboard-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
