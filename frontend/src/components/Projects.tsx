"use client";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  github_url: string | null;
  demo_url: string | null;
  period: string;
  highlight: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Donor Analytics Pipeline",
    description:
      "A Python-based data pipeline built for St Peter's College to automate fundraising analytics. Extracted ~20 years of donation data from SQL Server, implemented predictive modeling to identify high-value donors, and delivered Power BI dashboards and Excel reports to fundraising coordinators.",
    category: "Data Engineering",
    tags: ["Python", "SQL Server", "Power BI", "ETL", "Predictive Modeling", "Excel"],
    github_url: "https://github.com/dec591nyc/Donor-Analytics-Pipeline",
    demo_url: null,
    period: "Aug – Nov 2025",
    highlight: "~20 years of data analyzed",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 5%", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>Featured Work</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em",
              color: "#1c1a17", lineHeight: 1.1,
            }}>
              Selected<br /><span style={{ color: "var(--orange)" }}>Projects</span>
            </h2>
            <p style={{ color: "#3d3b38", fontSize: "0.95rem", maxWidth: "380px", lineHeight: "1.80" }}>
              Real-world work demonstrating data engineering, pipeline design, and analytical thinking.
            </p>
          </div>
          <div style={{ width: "50px", height: "3px", background: "#6b7c3e", borderRadius: "2px" }} />
        </div>

        {/* Projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="card"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                borderRadius: "16px",
                overflow: "hidden",
                minHeight: "300px",
              }}

            >
              {/* Visual panel */}
              <div style={{
                background: "linear-gradient(145deg, var(--bg-card-inner) 0%, var(--bg-card) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "40px", position: "relative", overflow: "hidden",
              }}>
                {/* Decorative circles */}
                <div style={{
                  position: "absolute", width: "260px", height: "260px", borderRadius: "50%",
                  border: "40px solid rgba(107,124,62,0.10)",
                  top: "-60px", left: "-60px",
                }} />
                <div style={{
                  position: "absolute", width: "180px", height: "180px", borderRadius: "50%",
                  border: "25px solid rgba(249,115,22,0.10)",
                  bottom: "-40px", right: "-40px",
                }} />
                {/* Content */}
                <div style={{ textAlign: "center", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "18px",
                    background: "#1c1a17",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                  }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      {/* Desktop Monitor Frame */}
                      <rect x="2" y="3" width="20" height="13" rx="2" stroke="var(--olive)" strokeWidth="1.8" />
                      <path d="M9 20h6" stroke="var(--olive)" strokeWidth="1.8" />
                      <path d="M12 16v4" stroke="var(--olive)" strokeWidth="1.8" />
                      
                      {/* Bar chart graphics */}
                      <path d="M5 12V9" stroke="var(--olive)" strokeWidth="2" />
                      <path d="M8 12V6" stroke="var(--orange)" strokeWidth="2" />
                      <path d="M11 12V8" stroke="var(--olive)" strokeWidth="2" />
                      
                      {/* Rising trend line graph */}
                      <path d="M14 10l2.5-3 3 2.5" stroke="var(--orange)" strokeWidth="1.8" />
                      <circle cx="14" cy="10" r="1" fill="var(--orange)" />
                      <circle cx="16.5" cy="7" r="1" fill="var(--orange)" />
                      <circle cx="19.5" cy="9.5" r="1" fill="var(--orange)" />
                    </svg>
                  </div>
                  <div style={{
                    padding: "7px 18px", borderRadius: "4px",
                    background: "rgba(107,124,62,0.15)", border: "1px solid rgba(107,124,62,0.30)",
                    color: "#5a6933", fontWeight: "800", fontSize: "0.82rem",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    {project.highlight}
                  </div>
                </div>
              </div>

              {/* Content panel */}
              <div style={{
                padding: "36px", display: "flex", flexDirection: "column",
                justifyContent: "space-between", gap: "18px",
              }}>
                <div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "4px",
                      background: "rgba(107,124,62,0.14)", border: "1px solid rgba(107,124,62,0.28)",
                      color: "#5a6933", fontSize: "0.76rem", fontWeight: "800",
                      letterSpacing: "0.07em", textTransform: "uppercase",
                    }}>
                      {project.category}
                    </span>
                    <span style={{ color: "#6b6865", fontSize: "0.80rem" }}>{project.period}</span>
                  </div>
                  <h3 style={{
                    fontSize: "1.5rem", fontWeight: "900", color: "#1c1a17",
                    marginBottom: "12px", lineHeight: "1.25", letterSpacing: "-0.02em",
                    fontFamily: "var(--font-outfit)",
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ color: "#3d3b38", fontSize: "0.90rem", lineHeight: "1.75" }}>
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {project.github_url && (
                    <a
                      id="project-github-link"
                      href={project.github_url} target="_blank" rel="noreferrer"
                      style={{
                        padding: "10px 22px", borderRadius: "6px",
                        background: "var(--olive)", color: "#ffffff",
                        fontWeight: "700", fontSize: "0.83rem",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        boxShadow: "0 4px 14px rgba(107,124,62,0.32)",
                        transition: "all 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--olive-dark)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--olive)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div style={{
          marginTop: "40px", textAlign: "center", padding: "28px",
          borderRadius: "12px",
          background: "rgba(107,124,62,0.10)",
          border: "1.5px dashed rgba(107,124,62,0.35)",
        }}>
          <p style={{ color: "#6b7c3e", fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
            🚀 More projects coming soon — currently building and open sourcing more data engineering work.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          div[id^="project-card-"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
