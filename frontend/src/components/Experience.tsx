"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

interface Experience {
  id: number;
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  category: "work" | "education";
  tags: string[];
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<string>("work");
  const { t, locale } = useLanguage();

  const experiences: Experience[] = [
    {
      id: 6,
      title: t("exp_nchu_title"),
      company: t("exp_nchu_company"),
      companyUrl: "https://www.nchu.edu.tw/",
      period: "Jun 2026 – Present",
      location: t("loc_taichung_tw"),
      description: t("exp_nchu_desc"),
      bullets: [],
      category: "education",
      tags: ["AI", "Data Analysis", "Python", "Machine Learning"],
    },
    {
      id: 1,
      title: t("exp_spc_title"),
      company: t("exp_spc_company"),
      companyUrl: "https://www.stpeters.sa.edu.au/",
      period: "Aug 2025 – Nov 2025",
      location: t("loc_adelaide_au"),
      description: t("exp_spc_desc"),
      bullets: [
        t("exp_spc_b1"),
        t("exp_spc_b2"),
        t("exp_spc_b3"),
        t("exp_spc_b4"),
      ],
      category: "work",
      tags: ["Python", "SQL Server", "Power BI", "ETL", "Predictive Modeling"],
    },
    {
      id: 4,
      title: t("exp_uni_title"),
      company: t("exp_uni_company"),
      companyUrl: "https://adelaide.edu.au/",
      period: "Feb 2024 – Nov 2025",
      location: t("loc_adelaide_au"),
      description: t("exp_uni_desc"),
      bullets: [],
      category: "education",
      tags: ["Enterprise Management", "IT"],
    },
    {
      id: 2,
      title: t("exp_fet_title"),
      company: t("exp_fet_company"),
      companyUrl: "https://www.fetnet.net/",
      period: "Mar 2020 – Apr 2022",
      location: t("loc_new_taipei_tw"),
      description: t("exp_fet_desc"),
      bullets: [
        t("exp_fet_b1"),
        t("exp_fet_b2"),
        t("exp_fet_b3"),
        t("exp_fet_b4"),
        t("exp_fet_b5"),
      ],
      category: "work",
      tags: ["Python", "LightGBM", "SpringBoot", "Java", "C#", "Oracle", "Kubernetes", "CI/CD"],
    },
    {
      id: 3,
      title: t("exp_sci_title"),
      company: t("exp_sci_company"),
      companyUrl: "https://www.ecover.com.tw/",
      period: "Dec 2017 – Feb 2020",
      location: t("loc_taipei_tw"),
      description: t("exp_sci_desc"),
      bullets: [
        t("exp_sci_b1"),
        t("exp_sci_b2"),
        t("exp_sci_b3"),
      ],
      category: "work",
      tags: [".Net MVC", "C#", "JavaScript", "SQL Server", "Bootstrap", "RWD"],
    },
    {
      id: 5,
      title: t("exp_shu_title"),
      company: t("exp_shu_company"),
      companyUrl: "https://www.shu.edu.tw/",
      period: "Sep 2010 – Jun 2014",
      location: t("loc_taipei_tw"),
      description: t("exp_shu_desc"),
      bullets: [],
      category: "education",
      tags: ["Information Technology", "Management"],
    },
  ];

  const filteredExperiences =
    activeTab === "all"
      ? experiences
      : experiences.filter((e) => e.category === activeTab);
  const getCategoryColor = (category: Experience["category"]) =>
    category === "work" ? "var(--work-accent)" : "var(--education-accent)";
  const getCategoryGlow = (category: Experience["category"]) =>
    category === "work" ? "var(--work-accent-glow)" : "var(--education-accent-glow)";

  return (
    <section id="experience" style={{ padding: "48px 5%", background: "var(--bg-color)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>{t("bg_badge")}</span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
            fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em", color: "var(--fg-color)", lineHeight: 1.1,
          }}>
            {locale === "en" ? (
              <>My<br /><span style={{ color: "var(--orange)" }}>Journey</span></>
            ) : (
              <>我的<br /><span style={{ color: "var(--orange)" }}>生涯軌跡</span></>
            )}
          </h2>
          <div style={{ width: "50px", height: "3px", background: "var(--olive)", borderRadius: "2px" }} />
        </div>

        {/* Tabs and legend */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "30px" }}>
          <div style={{
            display: "flex", gap: "2px",
            background: "var(--card-border)", borderRadius: "8px",
            padding: "4px", width: "fit-content",
          }}>
            {[
              { key: "work", label: t("bg_tab_work") },
              { key: "education", label: t("bg_tab_edu") },
              { key: "all", label: t("bg_tab_all") },
            ].map((tab) => (
              <button
                key={tab.key}
                id={`tab-btn-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "8px 22px", borderRadius: "6px",
                  fontSize: "0.80rem", fontWeight: "700",
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  background: activeTab === tab.key ? "var(--olive)" : "transparent",
                  color: activeTab === tab.key ? "#ffffff" : "var(--fg-muted)",
                  transition: "all 0.2s", border: "none",
                  boxShadow: activeTab === tab.key ? "0 2px 10px var(--olive-glow)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", color: "var(--fg-subtle)", fontSize: "0.75rem", fontWeight: "700" }}>
            {[
              { label: t("bg_tab_work"), color: getCategoryColor("work") },
              { label: t("bg_tab_edu"), color: getCategoryColor("education") },
            ].map((item) => (
              <span key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: item.color, display: "inline-block" }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          id="timeline-container"
          style={{
            position: "relative", paddingLeft: "32px",
            borderLeft: "2px solid var(--card-border)",
            display: "flex", flexDirection: "column", gap: "22px",
          }}
        >
          {filteredExperiences.map((exp) => (
            <div key={exp.id} id={`timeline-item-${exp.id}`} style={{ position: "relative" }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: "-41px", top: "22px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: getCategoryColor(exp.category),
                border: "3px solid var(--bg-color)",
                boxShadow: `0 0 0 3px ${getCategoryGlow(exp.category)}`,
                zIndex: 1,
              }} />

              {/* Card */}
              <div className="card" style={{ padding: "22px", borderRadius: "12px", background: "var(--bg-card)" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "12px",
                }}>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--fg-color)", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                      {exp.title}
                    </h3>
                    <a
                      href={exp.companyUrl} target="_blank" rel="noreferrer"
                      style={{
                        color: getCategoryColor(exp.category),
                        fontSize: "0.85rem", fontWeight: "700", transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      {exp.company} ↗
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                    <span style={{
                      padding: "4px 11px", borderRadius: "4px",
                      background: "var(--bg-card-inner)", border: "1px solid var(--card-border)",
                      fontSize: "0.76rem", fontWeight: "700", color: "var(--fg-muted)",
                      whiteSpace: "nowrap", letterSpacing: "0.02em",
                    }}>
                      {exp.period}
                    </span>
                    <span style={{ fontSize: "0.73rem", color: "var(--fg-subtle)" }}>{exp.location}</span>
                  </div>
                </div>

                <p style={{ color: "var(--fg-muted)", fontSize: "0.88rem", lineHeight: "1.72", marginBottom: exp.bullets.length > 0 ? "12px" : "0" }}>
                  {exp.description}
                </p>

                {exp.bullets.length > 0 && (
                  <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "5px", marginBottom: "14px" }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ color: "var(--fg-muted)", fontSize: "0.84rem", lineHeight: "1.6" }}>{b}</li>
                    ))}
                  </ul>
                )}

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tech-tag" style={{ background: "var(--bg-card-inner)", border: "1px solid var(--card-border)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
