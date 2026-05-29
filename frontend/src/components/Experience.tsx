"use client";

import { useState } from "react";

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

const experiences: Experience[] = [
  {
    id: 1,
    title: "Data Specialist",
    company: "St Peter's College",
    companyUrl: "https://www.stpeters.sa.edu.au/",
    period: "Aug 2025 – Nov 2025",
    location: "Adelaide, SA, Australia",
    description: "Developed a Python-based data pipeline to automate analytics tasks for the fundraising team.",
    bullets: [
      "Extracted ~20 years of donation data from SQL Server for advanced donor behavior analysis.",
      "Implemented predictive modeling to identify key factors influencing high-value donations.",
      "Produced donor segmentation lists to support targeted engagement strategies.",
      "Generated Excel reports and Power BI dashboards for fundraising stakeholders.",
    ],
    category: "work",
    tags: ["Python", "SQL Server", "Power BI", "ETL", "Predictive Modeling"],
  },
  {
    id: 2,
    title: "Advanced Software Engineer",
    company: "FarEasTone Telecom",
    companyUrl: "https://www.fetnet.net/",
    period: "Mar 2020 – Apr 2022",
    location: "New Taipei City, Taiwan",
    description: "Data analysis using GBDT, optimizing internal staff processes, and maintaining Insurance E-commerce portal.",
    bullets: [
      "Built a LightGBM model to analyze customer data on telecom bill payment behavior.",
      "Exploited RESTful APIs with multi-threading and Kubernetes to provide telecom services.",
      "Established automated monthly report generation processes for internal staff.",
      "Migrated large amounts of bank data to an insurance company per policy requirements.",
      "Collaborated with subcontractors to build internal websites and database schemas.",
    ],
    category: "work",
    tags: ["Python", "LightGBM", "SpringBoot", "Java", "C#", "Oracle", "Kubernetes", "CI/CD"],
  },
  {
    id: 3,
    title: "Software Programmer",
    company: "South China Insurance Co., Ltd.",
    companyUrl: "https://www.ecover.com.tw/",
    period: "Dec 2017 – Feb 2020",
    location: "Taipei City, Taiwan",
    description: "Internal staff E-workplace platform, Insurance E-commerce portal and customer data analysis.",
    bullets: [
      "Expanded and maintained a B2C insurance E-commerce website for external customers.",
      "Built and maintained internal websites and automated data exchange tasks.",
      "Retrieved customer data to support seasonal promotions and analyzed results.",
    ],
    category: "work",
    tags: [".Net MVC", "C#", "JavaScript", "SQL Server", "Bootstrap", "RWD"],
  },
  {
    id: 4,
    title: "Master's, Information Technology",
    company: "University of South Australia",
    companyUrl: "https://www.unisa.edu.au/",
    period: "Feb 2024 – Nov 2025",
    location: "Adelaide, SA, Australia",
    description: "Enterprise Management specialization. Expanding data systems expertise in an international academic setting.",
    bullets: [],
    category: "education",
    tags: ["Enterprise Management", "IT"],
  },
  {
    id: 5,
    title: "Bachelor's, IT & Management",
    company: "Shih Hsin University",
    companyUrl: "https://www.shu.edu.tw/",
    period: "Sep 2010 – Jun 2014",
    location: "Taipei City, Taiwan",
    description: "Studied software engineering, database systems, and IT management.",
    bullets: [],
    category: "education",
    tags: ["Information Technology", "Management"],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<string>("work");

  const filteredExperiences =
    activeTab === "all"
      ? experiences
      : experiences.filter((e) => e.category === activeTab);

  return (
    <section id="experience" style={{ padding: "100px 5%", background: "var(--bg-color)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "52px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <span className="section-badge" style={{ alignSelf: "flex-start" }}>Career Timeline</span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900",
            fontFamily: "var(--font-outfit)", letterSpacing: "-0.04em", color: "#1c1a17", lineHeight: 1.1,
          }}>
            My<br /><span style={{ color: "#f97316" }}>Journey</span>
          </h2>
          <div style={{ width: "50px", height: "3px", background: "#6b7c3e", borderRadius: "2px" }} />
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "2px", marginBottom: "44px",
          background: "rgba(100,97,93,0.20)", borderRadius: "8px",
          padding: "4px", width: "fit-content",
        }}>
          {[
            { key: "work", label: "Work" },
            { key: "education", label: "Education" },
            { key: "all", label: "All" },
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
                color: activeTab === tab.key ? "#ffffff" : "#6b6865",
                transition: "all 0.2s", border: "none",
                boxShadow: activeTab === tab.key ? "0 2px 10px rgba(107,124,62,0.32)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div
          id="timeline-container"
          style={{
            position: "relative", paddingLeft: "32px",
            borderLeft: "2px solid rgba(100,97,93,0.30)",
            display: "flex", flexDirection: "column", gap: "28px",
          }}
        >
          {filteredExperiences.map((exp) => (
            <div key={exp.id} id={`timeline-item-${exp.id}`} style={{ position: "relative" }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: "-41px", top: "22px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: exp.category === "work" ? "var(--orange)" : "var(--olive)",
                border: "3px solid var(--bg-color)",
                boxShadow: exp.category === "work"
                  ? "0 0 0 3px var(--orange-glow)"
                  : "0 0 0 3px var(--olive-glow)",
                zIndex: 1,
              }} />

              {/* Card */}
              <div className="card" style={{ padding: "26px", borderRadius: "12px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "12px",
                }}>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#1c1a17", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                      {exp.title}
                    </h3>
                    <a
                      href={exp.companyUrl} target="_blank" rel="noreferrer"
                      style={{
                        color: exp.category === "work" ? "var(--orange)" : "var(--olive)",
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
                      background: "rgba(100,97,93,0.18)", border: "1px solid rgba(100,97,93,0.22)",
                      fontSize: "0.76rem", fontWeight: "700", color: "#3d3b38",
                      whiteSpace: "nowrap", letterSpacing: "0.02em",
                    }}>
                      {exp.period}
                    </span>
                    <span style={{ fontSize: "0.73rem", color: "#6b6865" }}>{exp.location}</span>
                  </div>
                </div>

                <p style={{ color: "#3d3b38", fontSize: "0.88rem", lineHeight: "1.72", marginBottom: exp.bullets.length > 0 ? "12px" : "0" }}>
                  {exp.description}
                </p>

                {exp.bullets.length > 0 && (
                  <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "5px", marginBottom: "14px" }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ color: "#3d3b38", fontSize: "0.84rem", lineHeight: "1.6" }}>{b}</li>
                    ))}
                  </ul>
                )}

                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
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
