from database import SessionLocal, engine
import models

def seed_db():
    db = SessionLocal()
    
    # Clean database
    print("Recreating database tables...")
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)
    
    print("Seeding database...")
    
    # 1. Projects
    projects = [
        models.Project(
            title="Donor Analytics Pipeline",
            description="Using St Peter's College fundraising records as the data source, this Python pipeline focused on the latest ~20 years of SQL Server donation data for predictive modeling, high-value donor analysis, and Power BI / Excel reporting.",
            category="Data Engineering",
            tags="Python,SQL Server,Power BI,ETL,Predictive Modeling,Excel",
            github_url="https://github.com/dec591nyc/Donor-Analytics-Pipeline",
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="AI Dev Dashboard Practice",
            description="The first pre-employment training assignment: an interactive front-end dashboard featuring a glassmorphic UI, mouse-responsive light effects, ambient gradients, and a real-time calendar clock.",
            category="Frontend Dev",
            tags="HTML5,CSS3,JavaScript,CSS Variables,Glassmorphism",
            github_url="https://github.com/dec591nyc/First-AI-Dev-Practice",
            demo_url="https://dec591nyc.github.io/First-AI-Dev-Practice/",
            image_url="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Portfolio Dashboard",
            description="The second pre-employment training assignment: a career portfolio dashboard built with Next.js, TypeScript, and a FastAPI backend. It combines portfolio presentation, contact-message storage, basic anti-spam checks, and deployment-ready frontend/backend structure.",
            category="Full-Stack Dev",
            tags="Next.js,TypeScript,FastAPI,SQLite,Contact API,Anti-Spam",
            github_url="https://github.com/dec591nyc/17s_portfolio",
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Booking App & LINE Bot Notifications",
            description="A possible future project combining a reservation workflow, LINE Bot push notifications, and n8n automation. This is a candidate idea, not a completed feature.",
            category="Planned Idea",
            tags="LINE Bot,n8n,Automation,Booking App",
            github_url=None,
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Hugging Face AI Practice",
            description="The third pre-employment training assignment showcasing AI model integration with Hugging Face transformers. Implements text processing, sentiment classification, and interactive AI tasks in Python.",
            category="AI & ML Dev",
            tags="Python,Hugging Face,Transformers,PyTorch,NLP,Jupyter",
            github_url="https://github.com/dec591nyc/HuggingFace-Practice",
            demo_url="https://huggingface-practice-dec591nyc.streamlit.app/",
            image_url="https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Multiple Linear Regression Practice",
            description="The fourth pre-employment training assignment focusing on Multiple Linear Regression analysis on the Kaggle 50 Startups dataset. Includes exploratory data analysis (EDA), dummy variable encoding, model training, coefficient evaluation, and real-time profit prediction.",
            category="AI & ML Dev",
            tags="Python,Streamlit,Scikit-Learn,Regression,EDA,Pandas",
            github_url="https://github.com/dec591nyc/Multiple-Linear-Regression-Practice",
            demo_url="https://multiple-linear-regression-practice-dec591nyc.streamlit.app/",
            image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Judicial Penalty Case Scraper Analysis",
            description="A planned data-analysis practice around scraping public judicial or administrative penalty case data, then organizing it into searchable summaries and basic trend views.",
            category="Planned Idea",
            tags="Web Scraping,Data Analysis,Legal Data,Dashboard",
            github_url=None,
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Travel Planning Suggestions with Scraper Practice",
            description="A planned practice combining travel-planning suggestions with crawler-based information gathering, then turning scattered travel data into easier comparison material.",
            category="Planned Idea",
            tags="Web Scraping,Travel Planning,Python,Automation",
            github_url=None,
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
        )
    ]
    
    # 2. Skills
    skills = [
        models.Skill(name="ETL Pipeline Design", category="Data Engineering", proficiency=88),
        models.Skill(name="SQL / PostgreSQL / MySQL", category="Data Engineering", proficiency=90),
        models.Skill(name="Power BI", category="Data Engineering", proficiency=82),
        models.Skill(name="Tableau", category="Data Engineering", proficiency=78),
        
        models.Skill(name="Python (FastAPI / Flask)", category="Backend", proficiency=88),
        models.Skill(name="C# (.Net MVC / WebForm)", category="Backend", proficiency=82),
        models.Skill(name="Java (SpringBoot)", category="Backend", proficiency=75),
        models.Skill(name="RESTful API", category="Backend", proficiency=90),
        
        models.Skill(name="Docker", category="Tools", proficiency=82),
        models.Skill(name="Kubernetes", category="Tools", proficiency=72),
        models.Skill(name="GitLab CI/CD", category="Tools", proficiency=80),
        models.Skill(name="Jenkins", category="Tools", proficiency=70),
        
        models.Skill(name="LightGBM / GBDT", category="ML & Analytics", proficiency=72),
        models.Skill(name="Data Analysis", category="ML & Analytics", proficiency=85),
        models.Skill(name="Predictive Modeling", category="ML & Analytics", proficiency=70),
        models.Skill(name="Excel / Reporting", category="ML & Analytics", proficiency=88)
    ]
    
    # 3. Experiences
    experiences = [
        models.Experience(
            title="AI & Data Analysis Applications Training Course",
            company="National Chung Hsing University",
            period="Jun 2026 – Present",
            description="Pre-employment training focusing on artificial intelligence applications, data mining, and big data analysis workflows.",
            category="education"
        ),
        models.Experience(
            title="Data Specialist",
            company="St Peter's College",
            period="Aug 2025 – Nov 2025",
            description="Developed a Python-based data pipeline to automate analytics tasks for the fundraising team.",
            category="work"
        ),
        models.Experience(
            title="Master's, Information Technology",
            company="University of South Australia",
            period="Feb 2024 – Nov 2025",
            description="Enterprise Management specialization. Expanding data systems expertise in an international academic setting.",
            category="education"
        ),
        models.Experience(
            title="Professional Software Engineer",
            company="FarEasTone Telecom",
            period="Mar 2020 – Apr 2022",
            description="Data analysis using GBDT, optimizing internal staff processes, and maintaining Insurance E-commerce portal.",
            category="work"
        ),
        models.Experience(
            title="Software Programmer",
            company="South China Insurance Co., Ltd.",
            period="Dec 2017 – Feb 2020",
            description="Internal staff E-workplace platform, Insurance E-commerce portal and customer data analysis.",
            category="work"
        ),
        models.Experience(
            title="Bachelor's, IT & Management",
            company="Shih Hsin University",
            period="Sep 2010 – Jun 2014",
            description="Studied software engineering, database systems, and IT management.",
            category="education"
        )
    ]
    
    # Add to DB
    for p in projects:
        db.add(p)
    for s in skills:
        db.add(s)
    for e in experiences:
        db.add(e)
        
    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_db()
