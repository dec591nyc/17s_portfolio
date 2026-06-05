"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "zh";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_background: "Background",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    nav_hire_me: "Hire Me",

    // Common / Dashboard
    status_open: "Open to Opportunities",
    status_busy: "Currently Employed",
    location_label: "Changhua County, Taiwan",
    years_exp: "Years Exp.",
    companies: "Companies",
    countries: "Countries",
    view_work: "View Work",
    contact_me: "Contact Me",

    // Dashboard widgets
    db_welcome: "Welcome, Visitor",
    db_subtitle: "Here's Yichi's portfolio statistics overview",
    db_telemetry: "SYSTEM TELEMETRY",
    db_stat_exp_val: "4+",
    db_stat_exp_lbl: "Years in Software",
    db_stat_proj_val: "3",
    db_stat_proj_lbl: "Project Groups",
    db_stat_skills_val: "16+",
    db_stat_skills_lbl: "Core Tech Skills",
    db_stat_status_val: "Active",
    db_stat_status_lbl: "Availability",
    db_timeline_title: "Career Path Pulse",
    db_timeline_subtitle: "Visualizing journey across industries",
    db_profile_title: "Profile Summary",
    db_profile_desc: "A backend software engineer transitioning into data engineering. Specializing in ETL pipelines, SQL databases, Power BI, Python, and Docker.",
    db_tech_stack: "Core Stack",
    db_quick_nav: "Quick Navigation",
    db_nav_bg_desc: "Explore details of past work history and master's degree.",
    db_nav_proj_desc: "Browse previous, developed, and ongoing projects.",
    db_nav_skills_desc: "Inspect proficiency across languages and engineering fields.",

    // Background (Experience)
    bg_badge: "Career Timeline",
    bg_title: "My Journey",
    bg_tab_work: "Work",
    bg_tab_edu: "Education",
    bg_tab_all: "All",

    // Experience Items
    exp_spc_title: "Data Specialist",
    exp_spc_desc: "Developed a Python-based data pipeline to automate analytics tasks for the fundraising team at St Peter's College.",
    exp_spc_b1: "Extracted ~20 years of donation data from SQL Server for advanced donor behavior analysis.",
    exp_spc_b2: "Implemented predictive modeling to identify key factors influencing high-value donations.",
    exp_spc_b3: "Produced donor segmentation lists to support targeted engagement strategies.",
    exp_spc_b4: "Generated Excel reports and Power BI dashboards for fundraising stakeholders.",

    exp_fet_title: "Advanced Software Engineer",
    exp_fet_desc: "Data analysis using GBDT, optimizing internal staff processes, and maintaining Insurance E-commerce portal at FarEasTone Telecom.",
    exp_fet_b1: "Built a LightGBM model to analyze customer data on telecom bill payment behavior.",
    exp_fet_b2: "Exploited RESTful APIs with multi-threading and Kubernetes to provide telecom services.",
    exp_fet_b3: "Established automated monthly report generation processes for internal staff.",
    exp_fet_b4: "Migrated large amounts of bank data to an insurance company per policy requirements.",
    exp_fet_b5: "Collaborated with subcontractors to build internal websites and database schemas.",

    exp_sci_title: "Software Programmer",
    exp_sci_desc: "Internal staff E-workplace platform, Insurance E-commerce portal and customer data analysis at South China Insurance Co., Ltd.",
    exp_sci_b1: "Expanded and maintained a B2C insurance E-commerce website for external customers.",
    exp_sci_b2: "Built and maintained internal websites and automated data exchange tasks.",
    exp_sci_b3: "Retrieved customer data to support seasonal promotions and analyzed results.",

    exp_nchu_title: "AI & Data Analysis Applications Training Course",
    exp_nchu_desc: "Pre-employment training at National Chung Hsing University focusing on artificial intelligence applications, data mining, and big data analysis workflows.",

    exp_uni_title: "Master's, Information Technology",
    exp_uni_desc: "Enterprise Management specialization at University of South Australia. Expanding data systems expertise in an international academic setting.",

    exp_shu_title: "Bachelor's, IT & Management",
    exp_shu_desc: "Studied software engineering, database systems, and IT management at Shih Hsin University.",

    // Projects
    proj_badge: "Showcase",
    proj_title: "Selected Projects",
    proj_subtitle: "Real-world work demonstrating data engineering, pipeline design, and analytical thinking.",
    proj_prev_sec: "Previous Projects",
    proj_prev_sec_desc: "Past analytical and pipeline projects with source code repositories.",
    proj_dev_sec: "Developed Projects (Industrial Training)",
    proj_dev_sec_desc: "Completed assignments and solutions built during this training session.",
    proj_ongoing_sec: "Developing Projects",
    proj_ongoing_sec_desc: "Current experiments and upcoming platforms under active development.",
    proj_view_github: "View on GitHub",
    proj_view_demo: "Live Demo",
    proj_coming_soon: "More projects coming soon — currently building and open sourcing more data engineering work.",

    // Specific Projects
    proj_donor_title: "Donor Analytics Pipeline",
    proj_donor_desc: "A Python-based data pipeline built for St Peter's College to automate fundraising analytics. Extracted ~20 years of donation data from SQL Server, implemented predictive modeling to identify high-value donors, and delivered Power BI dashboards and Excel reports to fundraising coordinators.",
    proj_donor_highlight: "~20 years of data",

    proj_portfolio_title: "Full-Stack Portfolio System",
    proj_portfolio_desc: "This portfolio website. Built using Next.js (App Router, TypeScript) and styled with raw CSS variables. Integrates a Python FastAPI backend with SQLite database for dynamic skills telemetry and secure message capture.",
    proj_portfolio_highlight: "Next.js & FastAPI",

    proj_api_title: "FastAPI Database Server",
    proj_api_desc: "Containerized backend REST API featuring SQLAlchemy ORM integration. Auto-migrates database schemas, feeds structured data payloads to frontend telemetry, and securely stores contact submissions.",
    proj_api_highlight: "FastAPI & SQLite",

    proj_stream_title: "Real-Time Telemetry Streaming Platform",
    proj_stream_desc: "An ongoing development of a streaming ETL pipeline designed to ingest, process, and store live telemetry data. Targets high throughput with Kafka message queues and structured streaming databases.",
    proj_stream_highlight: "Kafka & Stream ETL",

    proj_l2_title: "AI Dev Practice Dashboard",
    proj_l2_desc: "An interactive front-end dashboard featuring a premium glassmorphic UI. Integrates dynamic light refraction tracking mouse movement, slow-floating ambient gradients, and a real-time ticking calendar clock.",
    proj_l2_highlight: "AI Dev Practice Clock",

    proj_l3_title: "Hugging Face AI Practice",
    proj_l3_desc: "The third industrial training assignment showcasing AI model integration with Hugging Face transformers. Implements text processing, sentiment classification, and interactive AI tasks in Python.",
    proj_l3_highlight: "Hugging Face & NLP",

    // Skills
    skills_badge: "Technical Skills",
    skills_title: "What I Bring",
    skills_desc: "4+ years of hands-on experience across backend development, data engineering, DevOps pipelines, and applied machine learning.",
    skills_cat_de: "Data Engineering",
    skills_cat_be: "Backend",
    skills_cat_devops: "DevOps & Tools",
    skills_cat_ml: "ML & Analytics",

    // Contact
    contact_badge: "Get in Touch",
    contact_title: "Let's Connect",
    contact_avail_title: "Available for Opportunities",
    contact_avail_desc: "Open to full-time / contract roles",
    contact_name_lbl: "Name",
    contact_name_ph: "Your Name",
    contact_email_lbl: "Email Address",
    contact_email_ph: "your.email@example.com",
    contact_msg_lbl: "Message",
    contact_msg_ph: "Tell me about your project, opportunity, or idea...",
    contact_btn_send: "Send Message",
    contact_btn_sending: "Sending...",
    contact_success_title: "Message Sent!",
    contact_success_desc: "Thank you for reaching out. I'll get back to you as soon as possible.",
    contact_success_btn: "Send Another",
    contact_err_required: "Name field is required.",
    contact_err_email: "Please enter a valid email address.",
    contact_err_msg: "Message must be at least 10 characters long.",
    contact_err_failed: "Network connection error. Message saved locally.",

    // Footer
    footer_text: "All rights reserved. This website is a personal practice of applying IT domain knowledge to data analysis, industry analysis, data engineering, and AI applications.",
  },
  zh: {
    // Navbar
    nav_home: "首頁",
    nav_background: "學經歷背景",
    nav_projects: "專案展示",
    nav_skills: "技術能力",
    nav_contact: "聯絡我",
    nav_hire_me: "與我合作",

    // Common / Dashboard
    status_open: "開放合作機會",
    status_busy: "在職中",
    location_label: "台灣彰化 (Changhua, Taiwan)",
    years_exp: "年工作經歷",
    companies: "服務公司",
    countries: "足跡國家",
    view_work: "瀏覽作品",
    contact_me: "聯絡方式",

    // Dashboard widgets
    db_welcome: "歡迎參訪 逸棋 的個人儀表板",
    db_subtitle: "此處為 Yichi (逸棋) 的個人專業指標概覽",
    db_telemetry: "核心指標表現",
    db_stat_exp_val: "4+ 年",
    db_stat_exp_lbl: "軟體開發經驗",
    db_stat_proj_val: "3 組",
    db_stat_proj_lbl: "專案展示分類",
    db_stat_skills_val: "16+",
    db_stat_skills_lbl: "核心技術工具",
    db_stat_status_val: "積極尋職",
    db_stat_status_lbl: "目前職缺狀態",
    db_timeline_title: "職涯發展路徑",
    db_timeline_subtitle: "發展時間軸軌跡",
    db_profile_title: "專業簡介",
    db_profile_desc: "資深後端軟體工程師，目前專注轉型於資料工程 (Data Engineering) 領域。擅長建構 ETL 資料管道、SQL 資料庫設計、Power BI 數據視覺化、Python 以及 Docker 容器化技術。",
    db_tech_stack: "核心技術棧",
    db_quick_nav: "快速導覽儀表板",
    db_nav_bg_desc: "探索過往工作歷史及資訊科技碩士之詳細學經歷。",
    db_nav_proj_desc: "瀏覽過往開發、職前訓所學以及開發中的各式專案。",
    db_nav_skills_desc: "檢視各語言、框架、工具與資料處理之精通熟練度。",

    // Background (Experience)
    bg_badge: "學經歷時間軸",
    bg_title: "我的生涯軌跡",
    bg_tab_work: "工作經歷",
    bg_tab_edu: "教育背景",
    bg_tab_all: "全部歷程",

    // Experience Items
    exp_spc_title: "數據專案人員 / 資料專員",
    exp_spc_desc: "於聖彼得學院 (St Peter's College) 開發 Python 資料管道以自動化募款團隊的數據分析工作。",
    exp_spc_b1: "自 SQL Server 抽取約 20 年的歷史捐贈資料，進行高階捐款行為分析。",
    exp_spc_b2: "實作預測模型以識別影響高價值捐款的關鍵因子。",
    exp_spc_b3: "建立捐款者分群清單，以支援客製化的群眾接觸策略。",
    exp_spc_b4: "產出 Excel 深度報表與 Power BI 視覺化儀表板供團隊決策者使用。",

    exp_fet_title: "進階軟體工程師",
    exp_fet_desc: "於遠傳電信 (FarEasTone Telecom) 運用 GBDT 模型進行數據分析、優化內部人員流程，並維護保險電商平台。",
    exp_fet_b1: "建立 LightGBM 模型分析客戶在電信帳單繳費行為上的特徵與預測。",
    exp_fet_b2: "利用多執行緒 RESTful API 與 Kubernetes 提供電信服務系統。",
    exp_fet_b3: "為內部人員開發自動化月報生成系統，省去手動彙整時間。",
    exp_fet_b4: "依照法規政策需求，將大量銀行資料安全移轉至保險公司資料庫。",
    exp_fet_b5: "與外包廠商協同開發內部網站系統與資料庫結構設計。",

    exp_sci_title: "網頁軟體工程師",
    exp_sci_desc: "於華南產物保險建構內部員工電子辦公平台、維護保險電子商務網站並進行客戶數據分析。",
    exp_sci_b1: "擴充並維護面向一般大眾的 B2C 保險電子商務網站，提供良好響應式體驗。",
    exp_sci_b2: "開發內部辦公系統並排程自動化資料串接與交換任務。",
    exp_sci_b3: "提取並整理客戶數據以支持季節性行銷推廣，並對其效益進行數據分析。",

    exp_nchu_title: "中興大學職前訓練 AI人工智慧與數據分析應用班",
    exp_nchu_desc: "國立中興大學職前訓練課程，專注於人工智慧應用、資料探勘與大數據分析工作流之實踐。",

    exp_uni_title: "資訊科技碩士 (IT)",
    exp_uni_desc: "南澳大學 (UniSA) 企業管理專精。在國際學術環境中擴展大型資料系統之架構與管理知能。",

    exp_shu_title: "資訊管理學士 (IM)",
    exp_shu_desc: "世新大學。研習軟體工程、資料庫管理系統、系統分析與資訊管理流程。",

    // Projects
    proj_badge: "實作展示",
    proj_title: "精選開發專案",
    proj_subtitle: "展示實踐資料工程、資料管道設計及分析思維的實際案例。",
    proj_prev_sec: "過往分析與管道專案 (Previous Projects)",
    proj_prev_sec_desc: "過去在企業實作之數據分析與自動化管道專案，附 GitHub 原始碼。",
    proj_dev_sec: "職前訓開發完成專案 (Developed Projects)",
    proj_dev_sec_desc: "本次職前訓練過程中所建構與完成的各項作業及系統解決方案。",
    proj_ongoing_sec: "開發中專案 (Developing Projects)",
    proj_ongoing_sec_desc: "目前正積極規劃、撰寫與進行的資料工程及架構實驗專案。",
    proj_view_github: "GitHub 原始碼",
    proj_view_demo: "線上展示",
    proj_coming_soon: "更多專案持續開發中 ── 正努力打造並開源更多實用的資料工程專案。",

    // Specific Projects
    proj_donor_title: "募款行為數據分析管道 (Donor Analytics Pipeline)",
    proj_donor_desc: "專為聖彼得學院設計的 Python 資料工程管道。從 SQL Server 提取近 20 年的捐款數據，進行預測建模以分析高額捐款特徵，並產出 Power BI 視覺化與 Excel 分析報告。",
    proj_donor_highlight: "20年歷史數據抽取",

    proj_portfolio_title: "個人雙語 Dashboard 作品集系統",
    proj_portfolio_desc: "即本個人網頁作品集。前端基於 Next.js (App Router, TypeScript) 搭配 CSS 變數設計；後端使用 Python FastAPI 與 SQLite 提供技能熟練度等 JSON API 以及安全聯絡留言板功能。",
    proj_portfolio_highlight: "Next.js & FastAPI 整合",

    proj_api_title: "FastAPI 容器化資料服務 API",
    proj_api_desc: "支援資料庫自動遷移 (Migration) 的 SQLAlchemy ORM 後端系統。提供結構化 JSON payload，並透過 SQLite 儲存使用者的留言資訊，支援 Docker 容器化部署。",
    proj_api_highlight: "FastAPI & SQLite 開發",

    proj_stream_title: "即時遙測數據流處理平台",
    proj_stream_desc: "目前正在進行的串流 ETL 管道開發。預計使用 Kafka 訊息佇列進行實時資料吞吐，並寫入時序資料庫以進行實時看板監控。",
    proj_stream_highlight: "Kafka & 實時串流 ETL",

    proj_l2_title: "AI開發實作儀表板",
    proj_l2_desc: "極具美感的互動式前端網頁儀表板。具備毛玻璃擬態 UI，並整合了能隨滑鼠軌跡變化的折射光影特效、慢速飄移的背景漸變，以及自動偵測當地時區的即時數位日曆時鐘。",
    proj_l2_highlight: "AI開發實作首發",

    proj_l3_title: "Hugging Face AI 實作專案",
    proj_l3_desc: "產業訓練第三份作業。基於 Hugging Face Transformers 與 PyTorch 的 AI 模型應用實作，涵蓋自然語言處理 (NLP)、文本情緒分類以及互動式 AI 任務實踐。",
    proj_l3_highlight: "Hugging Face & NLP 實踐",

    // Skills
    skills_badge: "技術能力專長",
    skills_title: "我所掌握的技能",
    skills_desc: "4 年以上後端開發、資料工程管道設計、DevOps 自動化建構及機器學習數據分析的實踐經驗。",
    skills_cat_de: "資料工程 (Data Engineering)",
    skills_cat_be: "後端技術 (Backend)",
    skills_cat_devops: "運維與工具 (DevOps & Tools)",
    skills_cat_ml: "機器學習與分析 (ML & Analytics)",

    // Contact
    contact_badge: "與我聯繫",
    contact_title: "寫信給我",
    contact_avail_title: "目前職缺狀態",
    contact_avail_desc: "開放接受全職、兼職與合約制機會",
    contact_name_lbl: "姓名",
    contact_name_ph: "請輸入您的姓名",
    contact_email_lbl: "電子郵件",
    contact_email_ph: "your.email@example.com",
    contact_msg_lbl: "留言訊息",
    contact_msg_ph: "請填寫您想討論的專案合作、工作機會或看法...",
    contact_btn_send: "送出留言",
    contact_btn_sending: "傳送中...",
    contact_success_title: "訊息已成功送出！",
    contact_success_desc: "感謝您的來信。我會盡快回覆您的訊息！",
    contact_success_btn: "再次送出",
    contact_err_required: "姓名欄位為必填。",
    contact_err_email: "請輸入有效的電子郵件地址。",
    contact_err_msg: "留言內容長度必須至少 10 個字元。",
    contact_err_failed: "網路連線異常，訊息已暫存於本地端。",

    // Footer
    footer_text: "版權所有。該網頁為個人運用自身 IT domain knowledge 展示資料分析、產業分析、數據工程、AI Application 的實踐",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "zh") {
      setLocaleState(savedLocale);
    } else {
      // Auto-detect browser locale
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes("zh")) {
        setLocaleState("zh");
      }
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const dict = translations[locale] || translations["en"];
    return (dict as any)[key] || (translations["en"] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
