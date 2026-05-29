"use client";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 5% 80px 5%",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-color)",
      }}
    >
      {/* Editorial ghost text — background */}
      <div style={{
        position: "absolute", bottom: "-4%", left: "-2%",
        fontSize: "clamp(100px, 18vw, 240px)",
        fontWeight: "900", fontFamily: "var(--font-outfit)",
        color: "rgba(249,115,22,0.06)",
        letterSpacing: "-0.05em", lineHeight: 1,
        userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        DATA
      </div>
      <div style={{
        position: "absolute", top: "0%", right: "-2%",
        fontSize: "clamp(80px, 14vw, 180px)",
        fontWeight: "900", fontFamily: "var(--font-outfit)",
        color: "rgba(28,26,23,0.05)",
        letterSpacing: "-0.05em", lineHeight: 1,
        userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        ENG
      </div>

      <div
        style={{
          maxWidth: "1200px", width: "100%",
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "60px", alignItems: "center", zIndex: 10,
        }}
        className="hero-grid"
      >
        {/* Left: Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="section-badge">
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#6b7c3e", display: "inline-block" }} />
              Open to Opportunities
            </span>
          </div>

          {/* Main headline */}
          <div>
            <h1 style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              lineHeight: "1.05", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em", color: "#1c1a17",
            }}>
              Ethan<br />
              <span style={{ color: "var(--orange)" }}>Nien</span>
              <span style={{ color: "rgba(100,97,93,0.4)", fontSize: "0.6em" }}>.</span>
            </h1>
          </div>

          {/* Role label */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "3px", background: "#6b7c3e", borderRadius: "2px" }} />
            <span style={{
              fontSize: "0.95rem", fontWeight: "700",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#6b7c3e",
            }}>
              Data Engineer
            </span>
          </div>

          <p style={{
            fontSize: "1.05rem", color: "#3d3b38",
            maxWidth: "500px", lineHeight: "1.85", fontWeight: "400",
          }}>
            Software engineer with{" "}
            <strong style={{ color: "#f97316", fontWeight: "700" }}>4+ years</strong>{" "}
            of experience building backend systems, now specialising in data pipelines,
            analytics, and turning complex data into clear decisions.
          </p>

          {/* Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b6865", fontSize: "0.88rem" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Adelaide, South Australia, Australia
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", marginTop: "6px", flexWrap: "wrap" }} className="hero-buttons">
            <a
              id="hero-cta-projects" href="#projects"
              style={{
                padding: "14px 30px", borderRadius: "6px",
                background: "var(--olive)", color: "#ffffff",
                fontWeight: "700", fontSize: "0.85rem",
                letterSpacing: "0.07em", textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(107,124,62,0.35)",
                transition: "all 0.3s ease",
                display: "inline-flex", alignItems: "center", gap: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--olive-dark)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(107,124,62,0.48)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--olive)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(107,124,62,0.35)";
              }}
            >
              View Work →
            </a>
            <a
              id="hero-cta-contact" href="#contact"
              style={{
                padding: "14px 30px", borderRadius: "6px",
                background: "transparent",
                border: "1.5px solid var(--olive)",
                color: "var(--olive)",
                fontWeight: "700", fontSize: "0.85rem",
                letterSpacing: "0.07em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: "10px",
                transition: "all 0.3s ease",
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
              Contact Me
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: "0", marginTop: "16px",
            borderTop: "1px solid rgba(100,97,93,0.30)", paddingTop: "28px",
          }} className="hero-stats">
            {[
              { value: "4+", label: "Years Exp." },
              { value: "3", label: "Companies" },
              { value: "2", label: "Countries" },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                display: "flex", flexDirection: "column", gap: "4px",
                paddingRight: "32px", marginRight: "32px",
                borderRight: i < 2 ? "1px solid rgba(100,97,93,0.25)" : "none",
              }}>
                <span style={{
                  fontSize: "2rem", fontWeight: "900", color: "var(--orange)",
                  lineHeight: 1, fontFamily: "var(--font-outfit)",
                }}>{stat.value}</span>
                <span style={{
                  fontSize: "0.72rem", color: "#6b6865", fontWeight: "600",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Profile card */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-image-container">
          <div
            className="card animate-float"
            style={{
              width: "255px", padding: "0",
              borderRadius: "16px", overflow: "hidden",
              border: "1px solid rgba(100,97,93,0.30)",
            }}
          >
            {/* Olive + orange top strip */}
            <div style={{ height: "5px", background: "linear-gradient(90deg, #6b7c3e 50%, #f97316 100%)" }} />
            <div style={{ padding: "28px 22px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
              {/* Avatar */}
              <div style={{
                width: "78px", height: "78px", borderRadius: "50%",
                background: "#1c1a17",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", fontWeight: "900", color: "var(--orange)",
                fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em",
              }}>
                EN
              </div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#1c1a17", letterSpacing: "-0.02em" }}>Ethan Nien</div>
                <div style={{
                  color: "var(--olive)", fontSize: "0.78rem", fontWeight: "700",
                  letterSpacing: "0.10em", textTransform: "uppercase", marginTop: "3px",
                }}>Data Engineer</div>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(100,97,93,0.20)" }} />
              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                {["Python", "SQL", "Power BI", "Docker", "ETL"].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              {/* Social */}
              <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                {[
                  { label: "GitHub", href: "https://github.com/dec591nyc" },
                  { label: "LinkedIn", href: "https://au.linkedin.com/in/zifuera17n9" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    style={{
                      flex: 1, padding: "8px 0", borderRadius: "6px",
                      background: "rgba(100,97,93,0.14)", border: "1px solid rgba(100,97,93,0.22)",
                      color: "#3d3b38", fontWeight: "700", fontSize: "0.75rem",
                      textAlign: "center", letterSpacing: "0.04em", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--olive)";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "var(--olive)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(100,97,93,0.14)";
                      e.currentTarget.style.color = "#3d3b38";
                      e.currentTarget.style.borderColor = "rgba(100,97,93,0.22)";
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-buttons { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-image-container { order: -1; }
        }
      `}</style>
    </section>
  );
}
