"""
In-memory structured data repository for portfolio showcase (0 Database required).
Provides static, typed, and structured data for projects, skills, and experiences.
"""

PROJECTS = [
    {
        "id": 1,
        "title": "Donor Analytics Pipeline",
        "description": "Using St Peter's College fundraising records as the data source, this Python pipeline focused on the latest ~20 years of SQL Server donation data for predictive modeling, high-value donor analysis, and Power BI / Excel reporting.",
        "category": "Data Engineering",
        "tags": "Python,SQL Server,Power BI,ETL,Predictive Modeling,Excel",
        "github_url": "https://github.com/dec591nyc/Donor-Analytics-Pipeline",
        "demo_url": None,
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 2,
        "title": "AI Dev Dashboard Practice",
        "description": "The first pre-employment training assignment: an interactive front-end dashboard featuring a glassmorphic UI, mouse-responsive light effects, ambient gradients, and a real-time calendar clock.",
        "category": "Frontend Dev",
        "tags": "HTML5,CSS3,JavaScript,CSS Variables,Interactive UI",
        "github_url": "https://github.com/dec591nyc/First-AI-Dev-Practice",
        "demo_url": "https://dec591nyc.github.io/First-AI-Dev-Practice/",
        "image_url": "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 3,
        "title": "Portfolio Dashboard",
        "description": "The second pre-employment training assignment: a career portfolio dashboard built with Next.js, TypeScript, and a FastAPI backend. It features direct server-side email dispatch with zero database persistence, anti-spam protections, and deployment-ready stateless architecture.",
        "category": "Full-Stack Dev",
        "tags": "Next.js,TypeScript,FastAPI,Stateless API,Email Dispatch,Anti-Spam",
        "github_url": "https://github.com/dec591nyc/17s_portfolio",
        "demo_url": None,
        "image_url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 4,
        "title": "Booking App & LINE Bot Notifications",
        "description": "A possible future project combining a reservation workflow, LINE Bot push notifications, and n8n automation. This is a candidate idea, not a completed feature.",
        "category": "Planned Idea",
        "tags": "LINE Bot,n8n,Automation,Booking App",
        "github_url": None,
        "demo_url": None,
        "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 5,
        "title": "Hugging Face AI Image Generator",
        "description": "The third pre-employment training assignment: a Streamlit AI image generator that calls Hugging Face inference endpoints for FLUX.1 Schnell and Stable Diffusion XL. It includes bilingual UI, light/dark themes, prompt controls, batch generation, token handling, and a local demo mode for safer testing.",
        "category": "AI Dev",
        "tags": "Python,Streamlit,Hugging Face,FLUX.1,SDXL,Image Generation",
        "github_url": "https://github.com/dec591nyc/HuggingFace-Practice",
        "demo_url": "https://huggingface-practice-dec591nyc.streamlit.app/",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 6,
        "title": "Linear Regression Practice",
        "description": "The fourth pre-employment training assignment: an interactive linear regression simulator and air-quality anomaly detection prototype built under the CRISP-DM framework. It uses central Taiwan AQI records to fit regression models and rank pollution residual outliers for decision support.",
        "category": "AI & ML Dev",
        "tags": "Python,Streamlit,Scikit-Learn,Linear Regression,CRISP-DM,Pandas",
        "github_url": "https://github.com/dec591nyc/Linear-Regression-Practice",
        "demo_url": "https://linear-regression-practice-dec591nyc.streamlit.app/",
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 7,
        "title": "Taiwan Local Public Safety Statistics & Data Integrity Audit Platform",
        "description": "A data analytics platform combining a Next.js dashboard, Python automated ETL pipelines, and Turso distributed Cloud SQLite. Integrates GitHub Actions to automatically fetch MOI crime open datasets (code 9603) monthly, performing checksum reconciliation and audit integrity while analyzing monthly trends, six metropolitan areas, and YoY variations.",
        "category": "Data Engineering",
        "tags": "Next.js,React,Python,Turso,SQLite,GitHub Actions,Data Pipeline,Data Integrity",
        "github_url": "https://github.com/dec591nyc/PSJJV",
        "demo_url": "https://public-safety-integrity-analytics.vercel.app/",
        "image_url": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 11,
        "title": "BI-RMP: Business Reputation & Sentiment Risk Platform",
        "description": "An automated multi-platform reputation and sentiment risk monitoring platform integrating PTT, Google Maps, and Threads. Features LINE / LIFF service entry, n8n workflow routing, FastAPI crawler orchestration (SearXNG + Playwright), merchant identity contract matching, rolling delta incremental deduplication, and Supabase PostgreSQL persistence with audit logs.",
        "category": "Data Engineering",
        "tags": "FastAPI,Python,Supabase,PostgreSQL,n8n,Playwright,SearXNG,PTT,Threads,Google Maps",
        "github_url": "https://github.com/dec591nyc/BI-RMP",
        "demo_url": None,
        "image_url": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
    },
    {
        "id": 8,
        "title": "Travel Planning Suggestions with Scraper Practice",
        "description": "A planned practice combining travel-planning suggestions with crawler-based information gathering, then turning scattered travel data into easier comparison material.",
        "category": "Planned Idea",
        "tags": "Web Scraping,Travel Planning,Python,Automation",
        "github_url": None,
        "demo_url": None,
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
    }
]

SKILLS = [
    {"id": 1, "name": "ETL Pipeline Design", "category": "Data Engineering", "proficiency": 88},
    {"id": 2, "name": "SQL / PostgreSQL / MySQL / SQLite", "category": "Data Engineering", "proficiency": 90},
    {"id": 3, "name": "Power BI", "category": "Data Engineering", "proficiency": 82},
    {"id": 4, "name": "Tableau", "category": "Data Engineering", "proficiency": 78},
    {"id": 5, "name": "Python (FastAPI / Flask)", "category": "Backend", "proficiency": 88},
    {"id": 6, "name": "C# (.Net MVC / WebForm)", "category": "Backend", "proficiency": 82},
    {"id": 7, "name": "Java (SpringBoot)", "category": "Backend", "proficiency": 75},
    {"id": 8, "name": "RESTful API", "category": "Backend", "proficiency": 90},
    {"id": 9, "name": "Docker", "category": "Tools", "proficiency": 82},
    {"id": 10, "name": "Kubernetes", "category": "Tools", "proficiency": 72},
    {"id": 11, "name": "GitLab CI/CD & GitHub Actions", "category": "Tools", "proficiency": 80},
    {"id": 12, "name": "Jenkins", "category": "Tools", "proficiency": 70},
    {"id": 13, "name": "LightGBM / GBDT", "category": "ML & Analytics", "proficiency": 72},
    {"id": 14, "name": "Data Analysis", "category": "ML & Analytics", "proficiency": 85},
    {"id": 15, "name": "Predictive Modeling", "category": "ML & Analytics", "proficiency": 70},
    {"id": 16, "name": "Excel / Reporting", "category": "ML & Analytics", "proficiency": 88}
]

EXPERIENCES = [
    {
        "id": 1,
        "title": "AI & Data Analysis Applications Training Course",
        "company": "National Chung Hsing University",
        "period": "Jun 2026 – Present",
        "description": "Pre-employment training focusing on artificial intelligence applications, data mining, and big data analysis workflows.",
        "category": "education"
    },
    {
        "id": 2,
        "title": "Data Specialist",
        "company": "St Peter's College",
        "period": "Aug 2025 – Nov 2025",
        "description": "Developed a Python-based data pipeline to automate analytics tasks for the fundraising team.",
        "category": "work"
    },
    {
        "id": 3,
        "title": "Master's, Information Technology",
        "company": "Adelaide University",
        "period": "Feb 2024 – Nov 2025",
        "description": "Business Analytics specialization. Focused on large-scale database design, architectural planning, and database management.",
        "category": "education"
    },
    {
        "id": 4,
        "title": "Professional Software Engineer",
        "company": "FarEasTone Telecom",
        "period": "Mar 2020 – Apr 2022",
        "description": "Data analysis using GBDT, optimizing internal staff processes, and maintaining Insurance E-commerce portal.",
        "category": "work"
    },
    {
        "id": 5,
        "title": "Software Programmer",
        "company": "South China Insurance Co., Ltd.",
        "period": "Dec 2017 – Feb 2020",
        "description": "Internal staff E-workplace platform, Insurance E-commerce portal and customer data analysis.",
        "category": "work"
    },
    {
        "id": 6,
        "title": "Bachelor's, IT & Management",
        "company": "Shih Hsin University",
        "period": "Sep 2010 – Jun 2014",
        "description": "Studied software engineering, database systems, and IT management.",
        "category": "education"
    }
]
