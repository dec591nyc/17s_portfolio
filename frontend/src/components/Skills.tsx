"use client";

import { useLanguage } from "@/components/LanguageContext";

interface Skill {
  id: number;
  name: string;
  category: "Data Engineering" | "Backend" | "DevOps & Tools" | "ML & Analytics";
  proficiency: number;
}

const skills: Skill[] = [
  { id: 1, name: "ETL Pipeline Design", category: "Data Engineering", proficiency: 88 },
  { id: 2, name: "SQL / PostgreSQL / MySQL", category: "Data Engineering", proficiency: 90 },
  { id: 3, name: "Power BI", category: "Data Engineering", proficiency: 82 },
  { id: 4, name: "Tableau", category: "Data Engineering", proficiency: 78 },
  { id: 5, name: "Python (FastAPI / Flask)", category: "Backend", proficiency: 88 },
  { id: 6, name: "C# (.Net MVC / WebForm)", category: "Backend", proficiency: 82 },
  { id: 7, name: "Java (SpringBoot)", category: "Backend", proficiency: 75 },
  { id: 8, name: "RESTful API", category: "Backend", proficiency: 90 },
  { id: 9, name: "Docker", category: "DevOps & Tools", proficiency: 82 },
  { id: 10, name: "Kubernetes", category: "DevOps & Tools", proficiency: 72 },
  { id: 11, name: "GitLab CI/CD", category: "DevOps & Tools", proficiency: 80 },
  { id: 12, name: "Jenkins", category: "DevOps & Tools", proficiency: 70 },
  { id: 13, name: "LightGBM / GBDT", category: "ML & Analytics", proficiency: 72 },
  { id: 14, name: "Data Analysis", category: "ML & Analytics", proficiency: 85 },
  { id: 15, name: "Predictive Modeling", category: "ML & Analytics", proficiency: 70 },
  { id: 16, name: "Excel / Reporting", category: "ML & Analytics", proficiency: 88 },
];

export default function Skills() {
  const { t } = useLanguage();

  const categoryMeta: Record<string, { emoji: string; barColor: string; labelColor: string; translationKey: string }> = {
    "Data Engineering": { emoji: "🗄️", barColor: "var(--orange)", labelColor: "var(--orange)", translationKey: "skills_cat_de" },
    "Backend":          { emoji: "⚙️", barColor: "var(--olive)", labelColor: "var(--olive)", translationKey: "skills_cat_be" },
    "DevOps & Tools":   { emoji: "🐳", barColor: "var(--fg-color)", labelColor: "var(--fg-muted)", translationKey: "skills_cat_devops" },
    "ML & Analytics":   { emoji: "📊", barColor: "var(--olive)", labelColor: "var(--olive)", translationKey: "skills_cat_ml" },
  };

  const categories = ["Data Engineering", "Backend", "DevOps & Tools", "ML & Analytics"];

  return (
    <section id="skills" style={{ padding: "76px 5%", background: "var(--bg-secondary)" }}>
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
            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", maxWidth: "400px", lineHeight: "1.80" }}>
              {t("skills_desc")}
            </p>
          </div>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "22px" }} className="skills-grid">
          {categories.map((category) => {
            const meta = categoryMeta[category];
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <div key={category} className="card" style={{ padding: "26px", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--card-border)" }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <span style={{ fontSize: "1.3rem" }}>{meta.emoji}</span>
                  <span style={{
                    fontWeight: "800", fontSize: "0.82rem",
                    color: meta.labelColor,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    {t(meta.translationKey)}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {categorySkills.map((skill) => (
                    <div key={skill.id} style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "600", fontSize: "0.88rem", color: "var(--fg-color)" }}>{skill.name}</span>
                        <span style={{ fontSize: "0.80rem", fontWeight: "800", color: meta.barColor }}>{skill.proficiency}%</span>
                      </div>
                      {/* Track */}
                      <div style={{
                        width: "100%", height: "5px",
                        background: "var(--bg-card-inner)",
                        border: "1px solid var(--card-border)",
                        borderRadius: "3px", overflow: "hidden",
                      }}>
                        <div style={{
                          width: `${skill.proficiency}%`, height: "100%",
                          borderRadius: "3px", background: meta.barColor,
                          transition: "width 1s ease",
                        }} />
                      </div>
                    </div>
                  ))}
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
