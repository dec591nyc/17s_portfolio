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
    db_welcome: "Welcome to Yichi's Career Dashboard",
    db_subtitle: "Here's Yichi's portfolio statistics overview",
    db_telemetry: "CAREER SNAPSHOT",
    db_stat_exp_val: "4+",
    db_stat_exp_lbl: "Years in Software",
    db_stat_proj_val: "3",
    db_stat_proj_lbl: "Project Groups",
    db_stat_skills_val: "16+",
    db_stat_skills_lbl: "Core Tech Skills",
    db_stat_status_val: "Active",
    db_stat_status_lbl: "Job Search Status",
    db_timeline_title: "Career Path Pulse",
    db_timeline_subtitle: "Visualizing journey across industries",
    db_profile_title: "Profile Summary",
    db_profile_desc: "A backend software engineer planning to invest more career effort in data engineering, ETL pipelines, SQL analytics, Power BI dashboards, and Python automation.",
    db_tech_stack: "Core Stack",
    db_quick_nav: "Quick Navigation",
    db_nav_bg_desc: "Explore details of past work history and master's degree.",
    db_nav_proj_desc: "Browse previous, developed, and ongoing projects.",
    db_nav_skills_desc: "Inspect proficiency across languages and engineering fields.",
    career_nchu_company: "NCHU",
    career_spc_company: "St Peter's College",
    career_unisa_company: "UniSA",
    career_fet_company: "FarEasTone",
    career_sci_company: "South China Insurance",
    career_nchu_role: "AI & Data Analysis Training (Taiwan)",
    career_spc_role: "Data Specialist (Adelaide)",
    career_unisa_role: "Master of IT (Adelaide)",
    career_fet_role: "Professional Software Engineer (Taiwan)",
    career_sci_role: "Software Programmer (Taiwan)",
    loc_taichung_tw: "Taichung, Taiwan",
    loc_adelaide_au: "Adelaide, SA, Australia",
    loc_new_taipei_tw: "New Taipei City, Taiwan",
    loc_taipei_tw: "Taipei City, Taiwan",

    // Background (Experience)
    bg_badge: "Career Timeline",
    bg_title: "My Journey",
    bg_tab_work: "Work",
    bg_tab_edu: "Education",
    bg_tab_all: "All",

    // Experience Items
    exp_spc_title: "Data Specialist",
    exp_spc_company: "St Peter's College",
    exp_spc_desc: "Developed a Python-based data pipeline to automate analytics tasks for the fundraising team at St Peter's College.",
    exp_spc_b1: "Focused on the latest ~20 years of SQL Server donation data for predictive modeling and donor behavior analysis.",
    exp_spc_b2: "Implemented predictive modeling to identify key factors influencing high-value donations.",
    exp_spc_b3: "Produced donor segmentation lists to support targeted engagement strategies.",
    exp_spc_b4: "Generated Excel reports and Power BI dashboards for fundraising stakeholders.",

    exp_fet_title: "Professional Software Engineer",
    exp_fet_company: "FarEasTone Telecom",
    exp_fet_desc: "Data analysis using GBDT, optimizing internal staff processes, and maintaining Insurance E-commerce portal at FarEasTone Telecom.",
    exp_fet_b1: "Built a LightGBM model to analyze customer data on telecom bill payment behavior.",
    exp_fet_b2: "Exploited RESTful APIs with multi-threading and Kubernetes to provide telecom services.",
    exp_fet_b3: "Established automated monthly report generation processes for internal staff.",
    exp_fet_b4: "Migrated large amounts of bank data to an insurance company per policy requirements.",
    exp_fet_b5: "Collaborated with subcontractors to build internal websites and database schemas.",

    exp_sci_title: "Software Programmer",
    exp_sci_company: "South China Insurance Co., Ltd.",
    exp_sci_desc: "Internal staff E-workplace platform, Insurance E-commerce portal and customer data analysis at South China Insurance Co., Ltd.",
    exp_sci_b1: "Expanded and maintained a B2C insurance E-commerce website for external customers.",
    exp_sci_b2: "Built and maintained internal websites and automated data exchange tasks.",
    exp_sci_b3: "Retrieved customer data to support seasonal promotions and analyzed results.",

    exp_nchu_title: "AI & Data Analysis Applications Training Course",
    exp_nchu_company: "National Chung Hsing University",
    exp_nchu_desc: "Pre-employment training at National Chung Hsing University focusing on artificial intelligence applications, data mining, and big data analysis workflows.",

    exp_uni_title: "Master's, Information Technology",
    exp_uni_company: "University of South Australia",
    exp_uni_desc: "Enterprise Management specialization at University of South Australia. Expanding data systems expertise in an international academic setting.",

    exp_shu_title: "Bachelor's, IT & Management",
    exp_shu_company: "Shih Hsin University",
    exp_shu_desc: "Studied software engineering, database systems, and IT management at Shih Hsin University.",

    // Projects
    proj_badge: "Showcase",
    proj_title: "Selected Projects",
    proj_subtitle: "Real-world work demonstrating data engineering, pipeline design, and analytical thinking.",
    proj_prev_sec: "Previous Projects",
    proj_prev_sec_desc: "Past analytical and pipeline projects with source code repositories.",
    proj_dev_sec: "Developed Projects (Pre-Employment Training)",
    proj_dev_sec_desc: "Completed assignments and solutions built during pre-employment training.",
    proj_ongoing_sec: "Developing / Planned Projects",
    proj_ongoing_sec_desc: "Candidate ideas selected by me for future practice. These are not finished project claims.",
    proj_view_github: "GitHub",
    proj_view_demo: "Live Demo",
    proj_coming_soon: "More projects coming soon — currently building and open sourcing more data engineering work.",

    // Specific Projects
    proj_donor_title: "Donor Analytics Pipeline",
    proj_donor_desc: "Using St Peter's College fundraising records as the data source, this Python pipeline focused on the latest ~20 years of SQL Server donation data for predictive modeling, high-value donor analysis, and Power BI / Excel reporting.",
    proj_donor_highlight: "Century-scale fundraising records",

    proj_portfolio_title: "Portfolio Dashboard",
    proj_portfolio_desc: "The second pre-employment training assignment: a career portfolio dashboard built with Next.js, TypeScript, and a FastAPI backend. It combines portfolio presentation, contact-message storage, basic anti-spam checks, and deployment-ready frontend/backend structure.",
    proj_portfolio_highlight: "Portfolio",

    proj_idea_category: "Planned Idea",
    proj_idea_period: "Idea Stage",
    proj_linebot_title: "Booking App & LINE Bot Notifications",
    proj_linebot_desc: "A possible future project combining a reservation workflow, LINE Bot push notifications, and n8n automation. This is a candidate idea, not a completed feature.",
    proj_linebot_highlight: "LINE Bot + n8n",
    proj_legal_title: "Judicial Penalty Case Scraper Analysis",
    proj_legal_desc: "A planned data-analysis practice around scraping public judicial or administrative penalty case data, then organizing it into searchable summaries and basic trend views.",
    proj_legal_highlight: "Legal data scraping",
    proj_travel_title: "Travel Planning Suggestions with Scraper Practice",
    proj_travel_desc: "A planned practice combining travel-planning suggestions with crawler-based information gathering, then turning scattered travel data into easier comparison material.",
    proj_travel_highlight: "Travel crawler",

    proj_l2_title: "AI Dev Dashboard Practice",
    proj_l2_desc: "The first pre-employment training assignment: an interactive front-end dashboard featuring a glassmorphic UI, mouse-responsive light effects, ambient gradients, and a real-time calendar clock.",
    proj_l2_highlight: "AI Dev Warm-Up",

    proj_l3_title: "Hugging Face AI Image Generator",
    proj_l3_desc: "The third pre-employment training assignment: a Streamlit AI image generator that calls Hugging Face inference endpoints for FLUX.1 Schnell and Stable Diffusion XL. It includes bilingual UI, light/dark themes, prompt controls, batch generation, token handling, and a local demo mode for safer testing.",
    proj_l3_highlight: "HF image generation",

    proj_l8_title: "Linear Regression Practice",
    proj_l8_desc: "The fourth pre-employment training assignment: an interactive linear regression simulator and air-quality anomaly detection prototype built under the CRISP-DM framework. It uses central Taiwan AQI records to fit regression models and rank pollution residual outliers for decision support.",
    proj_l8_highlight: "Regression & CRISP-DM",

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
    contact_avail_title: "Current Job Search Status",
    contact_avail_desc: "Full-time roles only",
    contact_name_lbl: "Leave Your Name",
    contact_name_ph: "Your name, alias, or professional calling card",
    contact_email_lbl: "Email Address",
    contact_email_ph: "your.email@example.com",
    contact_msg_lbl: "Feedback, Ideas, or Encouragement",
    contact_msg_ph: "Feel free to leave feedback, ideas, collaboration notes, or encouragement...",
    contact_btn_send: "Send Message",
    contact_btn_sending: "Sending...",
    contact_success_title: "Message Sent!",
    contact_success_desc: "The form request was submitted to the backend demo service. For time-sensitive contact, please use LinkedIn or GitHub.",
    contact_success_btn: "Send Another",
    contact_err_required: "Name field is required.",
    contact_err_email: "Please enter a valid email address.",
    contact_err_msg: "Message must be at least 10 characters long.",
    contact_err_msg_long: "Message is a bit too long. Please keep it under 250 characters.",
    contact_err_failed: "Network connection error. This message was not delivered. Please use LinkedIn or GitHub instead.",
    contact_err_rate_limited: "The inbox bouncer says: one message at a time. Please wait a moment and try again.",
    contact_err_rejected: "This message looked a little too bot-like. Please shorten it, reduce links, and try again.",
    contact_delivery_note: "Technical confession: this demo form saves the request, but the email courier is not wired up yet. For real contact, LinkedIn or GitHub is the safer route.",

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
    db_welcome: "歡迎瀏覽 Yichi 的個人職涯儀表板",
    db_subtitle: "此處為 Yichi (逸棋) 的個人專業指標概覽",
    db_telemetry: "職涯概覽",
    db_stat_exp_val: "4+ 年",
    db_stat_exp_lbl: "軟體開發經驗",
    db_stat_proj_val: "3 組",
    db_stat_proj_lbl: "專案展示分類",
    db_stat_skills_val: "16+",
    db_stat_skills_lbl: "核心技術工具",
    db_stat_status_val: "積極尋職",
    db_stat_status_lbl: "目前求職狀態",
    db_timeline_title: "職涯發展路徑",
    db_timeline_subtitle: "發展時間軸軌跡",
    db_profile_title: "專業簡介",
    db_profile_desc: "具後端軟體工程背景，未來職涯將更聚焦於資料工程、ETL 資料流水線、SQL 分析、Power BI 儀表板與 Python 自動化。",
    db_tech_stack: "核心技術棧",
    db_quick_nav: "快速導覽儀表板",
    db_nav_bg_desc: "探索過往工作歷史及資訊科技碩士之詳細學經歷。",
    db_nav_proj_desc: "瀏覽過往開發、職前訓所學以及開發中的各式專案。",
    db_nav_skills_desc: "檢視各語言、框架、工具與資料處理之精通熟練度。",
    career_nchu_company: "中興大學",
    career_spc_company: "聖彼得大學",
    career_unisa_company: "南澳大學",
    career_fet_company: "FarEasTone",
    career_sci_company: "華南產險",
    career_nchu_role: "AI 與資料分析職前訓練",
    career_spc_role: "數據專員",
    career_unisa_role: "資訊科技碩士 (Adelaide)",
    career_fet_role: "專業工程師",
    career_sci_role: "網頁軟體工程師",
    loc_taichung_tw: "台灣台中",
    loc_adelaide_au: "澳洲南澳 Adelaide",
    loc_new_taipei_tw: "台灣新北",
    loc_taipei_tw: "台灣台北",

    // Background (Experience)
    bg_badge: "學經歷時間軸",
    bg_title: "我的生涯軌跡",
    bg_tab_work: "工作經歷",
    bg_tab_edu: "教育背景",
    bg_tab_all: "全部歷程",

    // Experience Items
    exp_spc_title: "數據專員",
    exp_spc_company: "聖彼得大學",
    exp_spc_desc: "於聖彼得大學 (St Peter's College) 開發 Python 資料流水線以自動化募款團隊的數據分析工作。",
    exp_spc_b1: "聚焦 SQL Server 中近 20 年捐款資料，進行預測建模與捐款行為分析。",
    exp_spc_b2: "實作預測模型以識別影響高價值捐款的關鍵因子。",
    exp_spc_b3: "建立捐款者分群清單，以支援客製化的群眾接觸策略。",
    exp_spc_b4: "產出 Excel 深度報表與 Power BI 視覺化儀表板供團隊決策者使用。",

    exp_fet_title: "專業工程師",
    exp_fet_company: "FarEasTone",
    exp_fet_desc: "於遠傳電信 (FarEasTone Telecom) 運用 GBDT 模型進行數據分析、優化內部人員流程，並維護保險電商平台。",
    exp_fet_b1: "建立 LightGBM 模型分析客戶在電信帳單繳費行為上的特徵與預測。",
    exp_fet_b2: "利用多執行緒 RESTful API 與 Kubernetes 提供電信服務系統。",
    exp_fet_b3: "為內部人員開發自動化月報生成系統，省去手動彙整時間。",
    exp_fet_b4: "依照法規政策需求，將大量銀行資料安全移轉至保險公司資料庫。",
    exp_fet_b5: "與外包廠商協同開發內部網站系統與資料庫結構設計。",

    exp_sci_title: "網頁軟體工程師",
    exp_sci_company: "華南產險",
    exp_sci_desc: "於華南產物保險建構內部員工電子辦公平台、維護保險電子商務網站並進行客戶數據分析。",
    exp_sci_b1: "擴充並維護面向一般大眾的 B2C 保險電子商務網站，提供良好響應式體驗。",
    exp_sci_b2: "開發內部辦公系統並排程自動化資料串接與交換任務。",
    exp_sci_b3: "提取並整理客戶數據以支持季節性行銷推廣，並對其效益進行數據分析。",

    exp_nchu_title: "中興大學職前訓練 AI人工智慧與數據分析應用班",
    exp_nchu_company: "中興大學",
    exp_nchu_desc: "國立中興大學職前訓練課程，專注於人工智慧應用、資料探勘與大數據分析工作流之實踐。",

    exp_uni_title: "資訊科技碩士 (IT)",
    exp_uni_company: "南澳大學",
    exp_uni_desc: "南澳大學 (UniSA) 企業管理專精。在國際學術環境中擴展大型資料系統之架構與管理知能。",

    exp_shu_title: "資訊管理學士 (IM)",
    exp_shu_company: "世新大學",
    exp_shu_desc: "世新大學。研習軟體工程、資料庫管理系統、系統分析與資訊管理流程。",

    // Projects
    proj_badge: "實作展示",
    proj_title: "精選開發專案",
    proj_subtitle: "展示實踐資料工程、資料流水線設計及分析思維的實際案例。",
    proj_prev_sec: "過往分析與流水線專案 (Previous Projects)",
    proj_prev_sec_desc: "過去在企業實作之數據分析與自動化流水線專案，附 GitHub 連結。",
    proj_dev_sec: "職前訓開發完成專案 (Developed Projects)",
    proj_dev_sec_desc: "職前訓練過程中已完成的作業與系統實作。",
    proj_ongoing_sec: "開發中 / 構想中專案 (Developing Projects)",
    proj_ongoing_sec_desc: "以下是本人指定的候選開發方向，非已完成成果，也不是隨意生成的建議清單。",
    proj_view_github: "GitHub",
    proj_view_demo: "線上展示",
    proj_coming_soon: "更多專案持續開發中 ── 正努力打造並開源更多實用的資料工程專案。",

    // Specific Projects
    proj_donor_title: "募款行為數據分析流水線 (Donor Analytics Pipeline)",
    proj_donor_desc: "以聖彼得大學募款紀錄作為資料來源，開發 Python 資料工程流水線。專案重點是針對 SQL Server 中近 20 年捐款資料進行訓練建模，分析高額捐款特徵，並產出 Power BI 視覺化與 Excel 分析報告。",
    proj_donor_highlight: "近百年募款資料收集",

    proj_portfolio_title: "個人 Portfolio Dashboard",
    proj_portfolio_desc: "職前訓練第二份作業。以前端 Next.js、TypeScript 與後端 FastAPI 整合作為作品集展示，包含深淺色主題、聯絡表單儲存、基礎防 spam 機制與前後端部署結構。",
    proj_portfolio_highlight: "Portfolio",

    proj_idea_category: "構想規劃",
    proj_idea_period: "Idea Stage",
    proj_linebot_title: "預約 App 與 LINE Bot 推播",
    proj_linebot_desc: "可能開發的方向：結合預約流程、LINE Bot 推播與 n8n 自動化。此項目目前是候選構想，不是已完成作品。",
    proj_linebot_highlight: "LINE Bot + n8n",
    proj_legal_title: "司法機關裁罰案件爬蟲數據分析",
    proj_legal_desc: "預計以公開裁罰或司法相關資料為素材，練習資料爬取、清理、分類與趨勢分析，並整理成可搜尋或視覺化的資料分析流程。",
    proj_legal_highlight: "裁罰資料分析",
    proj_travel_title: "旅遊規劃建議配合爬蟲實踐",
    proj_travel_desc: "以旅遊規劃建議為主題，搭配爬蟲蒐集旅遊資訊，練習資料整理、比較與行程規劃流程，目標是把零散資訊轉成較容易判斷的旅遊決策素材。",
    proj_travel_highlight: "旅遊資料蒐集",

    proj_l2_title: "AI開發儀表板實踐",
    proj_l2_desc: "職前訓練第一份作業。以互動式前端網頁儀表板為主題，具備毛玻璃擬態 UI，並整合能隨滑鼠軌跡變化的折射光影特效、慢速飄移的背景漸變，以及自動偵測當地時區的即時數位日曆時鐘。",
    proj_l2_highlight: "AI開發實作熱身",

    proj_l3_title: "Hugging Face AI 繪圖生成器",
    proj_l3_desc: "職前訓練第三份作業。以 Streamlit 建立 AI 繪圖生成器，透過 Hugging Face Inference API 串接 FLUX.1 Schnell 與 Stable Diffusion XL，支援中英文介面、深淺色主題、提示詞/風格/比例控制、多圖並行生成、Token 設定與本機 Demo 模式。",
    proj_l3_highlight: "HF 繪圖生成實作",

    proj_l8_title: "線性迴歸與異常監測實作",
    proj_l8_desc: "職前訓練第四份作業。基於 CRISP-DM 框架的線性迴歸與空污異常觀測偵測展示工具，系統性整合公式模擬器與中部地區（台中、彰化、南投）實施 AQI 建模，利用殘差排序實踐污染監測決策支持原型。",
    proj_l8_highlight: "迴歸與 CRISP-DM 實踐",

    // Skills
    skills_badge: "技術能力專長",
    skills_title: "我所掌握的技能",
    skills_desc: "4 年以上後端開發、資料工程流水線設計、DevOps 自動化建構及機器學習數據分析的實踐經驗。",
    skills_cat_de: "資料工程 (Data Engineering)",
    skills_cat_be: "後端技術 (Backend)",
    skills_cat_devops: "運維與工具 (DevOps & Tools)",
    skills_cat_ml: "機器學習與分析 (ML & Analytics)",

    // Contact
    contact_badge: "與我聯繫",
    contact_title: "寫信給我",
    contact_avail_title: "目前求職狀態",
    contact_avail_desc: "僅接受全職工作機會",
    contact_name_lbl: "留下你的大名",
    contact_name_ph: "例如：王小明、未來合作夥伴，或任何你想被稱呼的名字",
    contact_email_lbl: "電子郵件",
    contact_email_ph: "your.email@example.com",
    contact_msg_lbl: "歡迎留下任何反饋、想法或你的鼓勵",
    contact_msg_ph: "想給建議、聊合作、提醒錯字，或單純留下一句鼓勵都可以...",
    contact_btn_send: "送出留言",
    contact_btn_sending: "傳送中...",
    contact_success_title: "訊息已成功送出！",
    contact_success_desc: "表單已送到後端展示服務。若是正式或即時聯繫，請優先使用 LinkedIn 或 GitHub。",
    contact_success_btn: "再次送出",
    contact_err_required: "姓名欄位為必填。",
    contact_err_email: "請輸入有效的電子郵件地址。",
    contact_err_msg: "留言內容長度必須至少 10 個字元。",
    contact_err_msg_long: "留言有點太熱情了，請控制在 250 字以內。",
    contact_err_failed: "網路連線異常，此訊息沒有成功送達。請改用 LinkedIn 或 GitHub 聯繫。",
    contact_err_rate_limited: "收件口的小門衛說：先喝口水，等一下再送。請稍後再試一次。",
    contact_err_rejected: "這則訊息看起來有點像機器人手滑。請縮短內容、減少連結後再試一次。",
    contact_delivery_note: "技術自白：此展示版表單會保存請求，但寄信郵差還沒接線。若要正式聯繫，LinkedIn 或 GitHub 會比較可靠。",

    // Footer
    footer_text: "版權所有。該網頁為個人運用自身 IT domain knowledge 展示資料分析、產業分析、數據工程、AI Application 的實踐",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "zh") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(savedLocale);
    } else {
      // Auto-detect browser locale
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes("zh")) {
        setLocaleState("zh");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const dict: Record<string, string> = translations[locale] || translations.en;
    const fallback: Record<string, string> = translations.en;
    return dict[key] || fallback[key] || key;
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
