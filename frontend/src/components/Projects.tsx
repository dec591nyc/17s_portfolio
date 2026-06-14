"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";

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
  section: "previous" | "developed" | "developing";
  tabGroup: "data" | "ai" | "future";
}

interface ApiProject {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  tags?: string | string[];
  github_url?: string | null;
  demo_url?: string | null;
  period?: string;
  highlight?: string;
}

export default function Projects() {
  const { t, locale } = useLanguage();
  const [dbProjects, setDbProjects] = useState<Project[] | null>(null);

  // Local fallback project list (highly localized)
  const localProjects: Project[] = [
    {
      id: 1,
      title: t("proj_donor_title"),
      description: t("proj_donor_desc"),
      category: t("skills_cat_de"),
      tags: ["Python", "SQL Server", "Power BI", "ETL", "Predictive Modeling", "Excel"],
      github_url: "https://github.com/dec591nyc/Donor-Analytics-Pipeline",
      demo_url: null,
      period: "Aug – Nov 2025",
      highlight: t("proj_donor_highlight"),
      section: "previous",
      tabGroup: "data",
    },
    {
      id: 2,
      title: t("proj_l2_title"),
      description: t("proj_l2_desc"),
      category: "Frontend Dev",
      tags: ["HTML5", "CSS3", "JavaScript", "CSS Variables", "Interactive UI"],
      github_url: "https://github.com/dec591nyc/First-AI-Dev-Practice",
      demo_url: "https://dec591nyc.github.io/First-AI-Dev-Practice/",
      period: "Jun 2026",
      highlight: t("proj_l2_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 3,
      title: t("proj_portfolio_title"),
      description: t("proj_portfolio_desc"),
      category: "Full-Stack Dev",
      tags: ["Next.js", "TypeScript", "FastAPI", "SQLite", "Contact API", "Anti-Spam"],
      github_url: "https://github.com/dec591nyc/17s_portfolio",
      demo_url: null,
      period: "Jun 2026",
      highlight: t("proj_portfolio_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 5,
      title: t("proj_l3_title"),
      description: t("proj_l3_desc"),
      category: "AI Dev",
      tags: ["Python", "Streamlit", "Hugging Face", "FLUX.1", "SDXL", "Image Generation"],
      github_url: "https://github.com/dec591nyc/HuggingFace-Practice",
      demo_url: "https://huggingface-practice-dec591nyc.streamlit.app/",
      period: "Jun 2026",
      highlight: t("proj_l3_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 6,
      title: t("proj_l8_title"),
      description: t("proj_l8_desc"),
      category: "AI & ML Dev",
      tags: ["Python", "Streamlit", "Scikit-Learn", "Linear Regression", "CRISP-DM", "Pandas"],
      github_url: "https://github.com/dec591nyc/Linear-Regression-Practice",
      demo_url: "https://linear-regression-practice-dec591nyc.streamlit.app/",
      period: "Jun 2026",
      highlight: t("proj_l8_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 9,
      title: t("proj_ml_study_title"),
      description: t("proj_ml_study_desc"),
      category: "AI & ML Dev",
      tags: ["Next.js", "FastAPI", "Scikit-Learn", "Gemini", "Model Selection", "Interactive Lab"],
      github_url: "https://github.com/dec591nyc/Machine-Learning-Study",
      demo_url: "https://machine-learning-study.vercel.app",
      period: "Jun 2026",
      highlight: t("proj_ml_study_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 10,
      title: t("proj_startups_title"),
      description: t("proj_startups_desc"),
      category: "ML & Statistics",
      tags: ["Python", "FastAPI", "OLS", "Beta Target Encoding", "Statistics", "Vanilla JS"],
      github_url: "https://github.com/dec591nyc/50-Startups-Profit-Prediction",
      demo_url: "https://dec591nyc.github.io/50-Startups-Profit-Prediction/frontend/index.html",
      period: "Jun 2026",
      highlight: t("proj_startups_highlight"),
      section: "developed",
      tabGroup: "ai",
    },
    {
      id: 4,
      title: t("proj_linebot_title"),
      description: t("proj_linebot_desc"),
      category: t("proj_idea_category"),
      tags: ["LINE Bot", "n8n", "Automation", "Booking App"],
      github_url: null,
      demo_url: null,
      period: t("proj_idea_period"),
      highlight: t("proj_linebot_highlight"),
      section: "developing",
      tabGroup: "future",
    },
    {
      id: 7,
      title: t("proj_legal_title"),
      description: t("proj_legal_desc"),
      category: t("proj_idea_category"),
      tags: ["Web Scraping", "Data Analysis", "Legal Data", "Dashboard"],
      github_url: null,
      demo_url: null,
      period: t("proj_idea_period"),
      highlight: t("proj_legal_highlight"),
      section: "developing",
      tabGroup: "future",
    },
    {
      id: 8,
      title: t("proj_travel_title"),
      description: t("proj_travel_desc"),
      category: t("proj_idea_category"),
      tags: ["Web Scraping", "Travel Planning", "Python", "Automation"],
      github_url: null,
      demo_url: null,
      period: t("proj_idea_period"),
      highlight: t("proj_travel_highlight"),
      section: "developing",
      tabGroup: "future",
    },
  ];

  // Try to load projects from backend API on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error("API responded with code " + res.status);
        const data = await res.json();
        
        // Map API objects to matching fields (ensuring correct section categories)
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Project[] = (data as ApiProject[]).map((item) => {
            // Determine section & tabGroup based on tags or category from DB
            let sec: "previous" | "developed" | "developing" = "developed";
            let tabGroup: "data" | "ai" | "future" = "ai";
            
            const titleLower = (item.title || "").toLowerCase();
            const categoryLower = (item.category || "").toLowerCase();
            
            if (titleLower.includes("donor") || titleLower.includes("analytics")) {
              sec = "previous";
              tabGroup = "data";
            } else if (
              categoryLower.includes("planned") ||
              categoryLower.includes("idea") ||
              titleLower.includes("line bot") ||
              titleLower.includes("judicial") ||
              titleLower.includes("penalty") ||
              titleLower.includes("travel") ||
              titleLower.includes("scraper")
            ) {
              sec = "developing";
              tabGroup = "future";
            }
            
            return {
              id: item.id,
              title: item.title || "",
              description: item.description || "",
              category: item.category || "Project",
              tags: typeof item.tags === "string" ? item.tags.split(",") : item.tags || [],
              github_url: item.github_url ?? null,
              demo_url: item.demo_url ?? null,
              period: item.period || "2025/2026",
              highlight: item.highlight || item.category || "",
              section: sec,
              tabGroup: tabGroup,
            };
          });
          setDbProjects(mapped);
        }
      } catch (e) {
        console.warn("FastAPI backend is offline. Using Next.js local static fallback data.", e);
      }
    };
    fetchProjects();
  }, []);

  const localProjectIds = new Set(localProjects.map((project) => project.id));
  const localProjectUrls = new Set(
    localProjects.map((project) => project.github_url).filter((url): url is string => Boolean(url))
  );
  const supplementalDbProjects = (dbProjects || []).filter(
    (project) =>
      !localProjectIds.has(project.id) &&
      (!project.github_url || !localProjectUrls.has(project.github_url))
  );
  const projectsToRender = [...localProjects, ...supplementalDbProjects];

  const renderProjectGrid = (projectsList: Project[]) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
      {projectsList.map((project) => (
        <div
          key={project.id}
          id={`project-card-${project.id}`}
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-card)",
            borderRadius: "16px",
            minHeight: "360px",
            border: "1px solid var(--card-border)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Card visual top banner */}
          <div style={{
            height: "8px",
            background: project.section === "developing"
              ? "linear-gradient(90deg, var(--fg-subtle) 0%, var(--card-border) 100%)"
              : "linear-gradient(90deg, var(--olive) 0%, var(--olive-light) 100%)",
          }} />

          <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, gap: "14px" }}>
            <div>
              {/* Category and Period */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{
                  padding: "4px 10px", borderRadius: "4px",
                  background: project.section === "developing" ? "var(--bg-card-inner)" : "var(--olive-tint)",
                  border: `1px solid ${project.section === "developing" ? "var(--card-border)" : "var(--olive-border)"}`,
                  color: project.section === "developing" ? "var(--fg-muted)" : "var(--olive)",
                  fontSize: "0.72rem", fontWeight: "800",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {project.category}
                </span>
                <span style={{ color: "var(--fg-subtle)", fontSize: "0.78rem", fontWeight: "500" }}>{project.period}</span>
              </div>

              {/* Title */}
              <h4 style={{
                fontSize: "1.25rem", fontWeight: "900", color: "var(--fg-color)",
                marginBottom: "8px", lineHeight: "1.3", letterSpacing: "-0.01em",
                fontFamily: "var(--font-outfit)",
              }}>
                {project.title}
              </h4>

              {/* Description */}
              <p style={{ color: "var(--fg-muted)", fontSize: "0.86rem", lineHeight: "1.65", marginBottom: "14px" }}>
                {project.description}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Highlight pill */}
              {project.highlight && (
                <div style={{
                  alignSelf: "flex-start",
                  padding: "3px 10px", borderRadius: "4px",
                  background: "var(--bg-card-inner)", border: "1px solid var(--card-border)",
                  fontSize: "0.74rem", fontWeight: "700", color: "var(--fg-muted)",
                }}>
                  ✨ {project.highlight}
                </div>
              )}

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag" style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px",
                borderTop: "1px solid var(--card-border)",
                paddingTop: "14px",
                marginTop: "4px",
              }}>
                {project.github_url && (
                  <a
                    href={project.github_url} target="_blank" rel="noreferrer"
                    style={{
                      padding: "8px 12px", borderRadius: "6px",
                      background: "var(--olive)", color: "#ffffff",
                      fontWeight: "700", fontSize: "0.78rem",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      transition: "all 0.25s",
                      flex: "0 0 auto",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--olive-dark)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--olive)";
                    }}
                  >
                    🐙 {t("proj_view_github")} &rarr;
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url} target="_blank" rel="noreferrer"
                    style={{
                      padding: "8px 12px", borderRadius: "6px",
                      background: "transparent", color: "var(--fg-color)",
                      border: "1px solid var(--card-border)",
                      fontWeight: "700", fontSize: "0.78rem",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      transition: "all 0.25s",
                      flex: "0 0 auto",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg-card-inner)";
                      e.currentTarget.style.borderColor = "var(--olive)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--card-border)";
                    }}
                  >
                    🌐 {t("proj_view_demo")} &rarr;
                  </a>
                )}
                {!project.github_url && !project.demo_url && (
                  <span style={{
                    padding: "8px 0",
                    color: "var(--fg-subtle)",
                    fontWeight: "700", fontSize: "0.78rem",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    display: "inline-flex", alignItems: "center", gap: "4px",
                  }}>
                    🔒 Private Repository
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="projects" style={{ padding: "48px 5%", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "42px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>{t("proj_badge")}</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
              fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em",
              color: "var(--fg-color)", lineHeight: 1.1,
            }}>
              {locale === "en" ? (
                <>Selected<br /><span style={{ color: "var(--orange)" }}>Projects</span></>
              ) : (
                <>個人專案<br /><span style={{ color: "var(--orange)" }}>實作展示</span></>
              )}
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", maxWidth: "420px", lineHeight: "1.80" }}>
              {t("proj_subtitle")}
            </p>
          </div>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        {/* Main Grid display */}
        <div style={{ minHeight: "380px" }}>
          {projectsToRender.length > 0 ? (
            renderProjectGrid(projectsToRender)
          ) : (
            <div style={{
              textAlign: "center", padding: "64px 32px",
              borderRadius: "12px", background: "var(--bg-card)",
              border: "1.5px dashed var(--card-border)",
              color: "var(--fg-subtle)", fontSize: "0.95rem"
            }}>
              No projects found.
            </div>
          )}
        </div>

        {/* Coming soon banner */}
        <div style={{
          marginTop: "8px", textAlign: "center", padding: "22px",
          borderRadius: "12px",
          background: "var(--olive-tint)",
          border: "1.5px dashed var(--olive-border)",
        }}>
          <p style={{ color: "var(--olive)", fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
            {t("proj_coming_soon")}
          </p>
        </div>
      </div>
    </section>
  );
}

