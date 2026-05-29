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
            title="E-Commerce AI Agent",
            description="A conversational AI assistant designed to browse products, answer customer queries, and handle checkout logic using OpenAI GPT-4 and vector database retrieval (RAG). Built to showcase complex backend and AI systems.",
            category="AI",
            tags="Python,FastAPI,OpenAI API,ChromaDB,Docker",
            github_url="https://github.com/example/ecommerce-ai-agent",
            demo_url="https://demo.example.com/ai-agent",
            image_url="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Cosmic Analytics Dashboard",
            description="A premium real-time analytics web dashboard with rich visualizations, responsive grids, and interactive charts displaying database telemetry, usage tracking, and system performance metrics.",
            category="Frontend",
            tags="Next.js,TypeScript,React,Recharts,Vanilla CSS",
            github_url="https://github.com/example/cosmic-analytics",
            demo_url="https://demo.example.com/analytics",
            image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Distributed Task Queue Server",
            description="A highly-available, distributed asynchronous task queue and job scheduler built with Python, Redis, and Celery. Features backoff retry policies, rate-limiting, and an administration control panel.",
            category="Backend",
            tags="Python,FastAPI,Celery,Redis,PostgreSQL",
            github_url="https://github.com/example/distributed-queue",
            demo_url=None,
            image_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Glassmorphic Portfolio Template",
            description="A beautiful, interactive portfolio website for developers featuring a premium glassmorphic UI, custom animations, section scrolling, and a responsive validation contact form.",
            category="Frontend",
            tags="Next.js,React,TypeScript,CSS Variables,Framer Motion",
            github_url="https://github.com/example/glass-portfolio",
            demo_url="https://demo.example.com/portfolio",
            image_url="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
        ),
        models.Project(
            title="Real-Time Collaborative Doc Editor",
            description="A web-based document editor allowing multiple users to edit documents in real-time, leveraging WebSockets and Yjs Conflict-free Replicated Data Types (CRDTs) for seamless merging.",
            category="Backend",
            tags="TypeScript,Node.js,WebSockets,Yjs,React",
            github_url="https://github.com/example/collaborative-doc",
            demo_url="https://demo.example.com/editor",
            image_url="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop"
        )
    ]
    
    # 2. Skills
    skills = [
        # Languages
        models.Skill(name="Python", category="Languages", proficiency=95),
        models.Skill(name="JavaScript", category="Languages", proficiency=90),
        models.Skill(name="TypeScript", category="Languages", proficiency=85),
        models.Skill(name="SQL", category="Languages", proficiency=80),
        
        # Frontend
        models.Skill(name="React", category="Frontend", proficiency=90),
        models.Skill(name="Next.js", category="Frontend", proficiency=85),
        models.Skill(name="HTML5 & CSS3", category="Frontend", proficiency=95),
        models.Skill(name="CSS Variables & Animations", category="Frontend", proficiency=90),
        
        # Backend
        models.Skill(name="FastAPI", category="Backend", proficiency=90),
        models.Skill(name="Flask / Django", category="Backend", proficiency=80),
        models.Skill(name="RESTful APIs", category="Backend", proficiency=95),
        models.Skill(name="SQLAlchemy / ORMs", category="Backend", proficiency=85),
        
        # Tools & DevOps
        models.Skill(name="Git & GitHub", category="Tools", proficiency=90),
        models.Skill(name="Docker", category="Tools", proficiency=75),
        models.Skill(name="SQLite / PostgreSQL", category="Tools", proficiency=80),
        models.Skill(name="Linux / WSL", category="Tools", proficiency=85),
    ]
    
    # 3. Experiences
    experiences = [
        # Work
        models.Experience(
            title="Senior Fullstack Engineer",
            company="Quantum Software Solutions",
            period="2024 - Present",
            description="Lead a team of 4 developers building next-generation telemetry dashboards and backend data ingestion APIs. Refactored microservices to FastAPI, improving server response times by 35%. Designed responsive Next.js frontend interfaces leveraging robust CSS grid layouts.",
            category="work"
        ),
        models.Experience(
            title="Software Developer",
            company="Apex AI Research Lab",
            period="2022 - 2024",
            description="Designed and deployed internal tools for AI model annotation and metrics visualization. Integrated LLM workflows into business automation systems using Python, Redis queues, and React frontends.",
            category="work"
        ),
        # Education
        models.Experience(
            title="Master of Science in Computer Science",
            company="Tech Institute of Science",
            period="2020 - 2022",
            description="Specialized in Artificial Intelligence and Distributed Systems. Completed thesis on Conflict-free Replicated Data Types (CRDTs) in collaborative web text editors.",
            category="education"
        ),
        models.Experience(
            title="Bachelor of Science in Information Technology",
            company="State Tech University",
            period="2016 - 2020",
            description="Graduated with Honors. Developed core understanding of software engineering patterns, web architectures, algorithms, data structures, and relational databases.",
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
