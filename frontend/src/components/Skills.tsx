"use client";

import { useLanguage } from "@/components/LanguageContext";

interface CompetencyCategory {
  id: string;
  icon: string;
  catKey: string;
  descKey: string;
  impactKey: string;
  badges: string[];
  colorTheme: "orange" | "olive" | "neutral" | "brand";
}

const competencies: CompetencyCategory[] = [
  {
    id: "backend",
    icon: "💻",
    catKey: "skills_cat_backend",
    descKey: "skills_desc_backend",
    impactKey: "skills_impact_backend",
    badges: ["Python", "Java", "C#", "RESTful API", "Docker & Kubernetes", "DB Schema Design"],
    colorTheme: "brand",
  },
  {
    id: "data",
    icon: "🗄️",
    catKey: "skills_cat_data",
    descKey: "skills_desc_data",
    impactKey: "skills_impact_data",
    badges: ["ETL Pipelines", "Python Scripts", "Scikit-Learn / ML", "SQL Server / Postgres", "Data Automation"],
    colorTheme: "olive",
  },
  {
    id: "analytics",
    icon: "📊",
    catKey: "skills_cat_analytics",
    descKey: "skills_desc_analytics",
    impactKey: "skills_impact_analytics",
    badges: ["Power BI", "Tableau", "Advanced Excel", "SQL Queries", "Data Modeling"],
    colorTheme: "orange",
  },
];

export default function Skills() {
  const { t } = useLanguage();

  const getThemeColors = (theme: CompetencyCategory["colorTheme"]) => {
    switch (theme) {
      case "orange":
        return {
          border: "var(--orange-border)",
          bgTint: "var(--orange-tint)",
          fg: "var(--orange)",
        };
      case "olive":
        return {
          border: "var(--olive-border)",
          bgTint: "var(--olive-tint)",
          fg: "var(--olive)",
        };
      case "brand":
        return {
          border: "var(--olive-border)",
          bgTint: "var(--bg-card-inner)",
          fg: "var(--olive)",
        };
      default:
        return {
          border: "var(--card-border)",
          bgTint: "var(--bg-card-inner)",
          fg: "var(--fg-muted)",
        };
    }
  };

  return (
    <section id="skills" style={{ padding: "48px 5%", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "42px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>{t("skills_badge")}</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em",
              color: "var(--fg-color)", lineHeight: 1.1,
            }}>
              {t("skills_title")}<span style={{ color: "var(--orange)" }}>.</span>
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", maxWidth: "420px", lineHeight: "1.80" }}>
              {t("skills_desc")}
            </p>
          </div>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        {/* Competencies Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }} className="skills-grid">
          {competencies.map((comp) => {
            const colors = getThemeColors(comp.colorTheme);
            return (
              <div
                key={comp.id}
                className="card"
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--card-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "20px",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  {/* Category header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "1.5rem" }}>{comp.icon}</span>
                    <h3 style={{
                      fontWeight: "800", fontSize: "1rem",
                      color: "var(--fg-color)",
                      fontFamily: "var(--font-outfit)",
                      letterSpacing: "0.02em",
                    }}>
                      {t(comp.catKey)}
                    </h3>
                  </div>

                  {/* Trend Description */}
                  <p style={{ color: "var(--fg-muted)", fontSize: "0.88rem", lineHeight: "1.6", marginBottom: "16px" }}>
                    {t(comp.descKey)}
                  </p>

                  {/* Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {comp.badges.map((badge) => (
                      <span
                        key={badge}
                        className="tech-tag"
                        style={{
                          padding: "5px 12px",
                          fontSize: "0.76rem",
                          borderRadius: "6px",
                          background: "var(--bg-card-inner)",
                          border: "1px solid var(--card-border)",
                          color: "var(--fg-color)",
                          fontWeight: "600",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HR Callout Highlight Box */}
                <div style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: colors.bgTint,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}>
                  <span style={{ fontSize: "1rem", color: colors.fg }}>🎯</span>
                  <div style={{ fontSize: "0.78rem", color: "var(--fg-muted)", lineHeight: "1.5", fontWeight: "600" }}>
                    <span style={{ color: colors.fg, fontWeight: "800" }}>HR Highlight: </span>
                    {t(comp.impactKey)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
