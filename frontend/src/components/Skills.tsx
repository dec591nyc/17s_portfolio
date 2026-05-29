"use client";

interface Skill {
  id: number;
  name: string;
  category: string;
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

const categoryMeta: Record<string, { emoji: string; barColor: string; labelColor: string }> = {
  "Data Engineering": { emoji: "🗄️", barColor: "var(--orange)", labelColor: "var(--orange)" },
  "Backend":          { emoji: "⚙️", barColor: "var(--olive)", labelColor: "var(--olive)" },
  "DevOps & Tools":   { emoji: "🐳", barColor: "#1c1a17", labelColor: "#3d3b38" },
  "ML & Analytics":   { emoji: "📊", barColor: "var(--olive)", labelColor: "var(--olive)" },
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" style={{ padding: "100px 5%", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "60px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>Technical Skills</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em",
              color: "#1c1a17", lineHeight: 1.1,
            }}>
              What I<br /><span style={{ color: "#f97316" }}>Bring</span>
            </h2>
            <p style={{ color: "#3d3b38", fontSize: "0.95rem", maxWidth: "400px", lineHeight: "1.80" }}>
              4+ years of hands-on experience across backend development, data engineering,
              DevOps pipelines, and applied machine learning.
            </p>
          </div>
          <div style={{ width: "50px", height: "3px", background: "#6b7c3e", borderRadius: "2px" }} />
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "22px" }} className="skills-grid">
          {categories.map((category) => {
            const meta = categoryMeta[category] ?? { emoji: "🔧", barColor: "#f97316", labelColor: "#f97316" };
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <div key={category} className="card" style={{ padding: "30px", borderRadius: "12px" }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "26px" }}>
                  <span style={{ fontSize: "1.3rem" }}>{meta.emoji}</span>
                  <span style={{
                    fontWeight: "800", fontSize: "0.82rem",
                    color: meta.labelColor,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    {category}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {categorySkills.map((skill) => (
                    <div key={skill.id} style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "600", fontSize: "0.88rem", color: "#1c1a17" }}>{skill.name}</span>
                        <span style={{ fontSize: "0.80rem", fontWeight: "800", color: meta.barColor }}>{skill.proficiency}%</span>
                      </div>
                      {/* Track */}
                      <div style={{
                        width: "100%", height: "5px",
                        background: "rgba(100,97,93,0.20)",
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
