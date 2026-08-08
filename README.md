# Portfolio Dashboard

這是一個前後端分離架構的個人作品集網站，前端使用 Next.js、TypeScript，後端使用 FastAPI、Python 建立，用來整理個人技術背景、專案經驗與展現數據工程 / 後端自動化與全端開發的能力。

網站除了呈現作品展示、職涯時間軸、技能整理與教育背景，也提供直接寄送 Email 的反饋建議功能，證明有將專案以極簡、易維護、易部署與重視隱私的規劃能力。

🔗 [**Live Demo**](https://17s-portfolio.vercel.app)

---

## 系統 Infography

| 面向 | 目前版本內容 |
| --- | --- |
| 前端技術 | Next.js 16、React 19、TypeScript、CSS Variables、Responsive Layout |
| 後端技術 | FastAPI、Pydantic、Python smtplib，純靜態結構化資料提供** |
| 作品展示 | Previous Projects、Developed Projects (包含 PSJJV、BI-RMP 等 9 個專案)、Developing / Planned Projects |
| 聯絡/反饋 | 後端直接寄送 Email 至作者信箱，保護訪客隱私 |
| 防 spam | Honeypot、IP 限流、Email 限流、重複訊息偵測、連結數限制、250 字留言上限 |
| 部署優勢 | 前端 Vercel，後端可無痛部署至任何 Serverless / Container 平台 (Cloud Run / Render) |

```mermaid
flowchart LR
    A["使用者瀏覽 Portfolio"] --> B["Next.js Frontend"]
    B --> C["職涯儀表板與專案卡片"]
    B --> D["Feedback / Contact Form"]
    D --> E["FastAPI Backend (100% Stateless)"]
    E --> F["Anti-Spam Checks\n(Honeypot, Rate Limit, Spam Filter)"]
    F --> G["Direct Email Dispatch\n(後端寄信至指定信箱 / 0 DB 留存)"]
    E --> H["In-Memory Portfolio Data\n(Projects, Skills, Experiences)"]
    H --> C
```

---

## 目前功能

- **職涯儀表板**：首頁以 dashboard 方式呈現工作年資、專案分類、核心技術與目前求職狀態。
- **中英文內容切換**：主要頁面支援英文與繁體中文雙語切換，包含職涯節點、專案描述、公司名稱與地點。
- **深淺色主題**：使用 CSS variables 管理主題色彩、毛玻璃光效與版面狀態。
- **生涯軌跡**：以工作與教育兩種色彩區分經歷，並提供中英文詳細內容。
- **直接郵件反饋 (Direct Email Feedback)**：訪客提交反饋後，後端透過郵件安全發送至作者信箱。
- **完整防 spam 機制**：結合 Honeypot 蜜罐陷阱、IP 頻率限制、Email 限流、重複訊息防範與連結數上限。

---

## 專案展示內容

| 分類 | 專案名稱 | 內容摘要與架構特色 |
| --- | --- | --- |
| Previous Projects | **Donor Analytics Pipeline** | 聚焦聖彼得大學近 20 年 SQL Server 捐款數據，進行預測建模、高額捐款特徵分析與 Power BI / Excel 報告。 |
| Developed Projects | **台灣地方治安統計分析平台 (PSJJV)** | 結合 Next.js 儀表板、Python 自動化 ETL 與 Turso 雲端分散式 SQLite。GitHub Actions 每月自動下載內政部犯罪資料 (代號 9603) 並執行完整性加總審計。 |
| Developed Projects | **BI-RMP 商業聲譽與輿情風險平台** | 整合 PTT (SearXNG + aiohttp)、Google Maps 與 Threads (Playwright) 輿情爬蟲，LINE/LIFF 服務入口，n8n 流程調度，FastAPI 任務去重與 Supabase PostgreSQL 持久化。 |
| Developed Projects | **個人 Portfolio Dashboard** | 職前訓練第二份作業。Next.js + TypeScript + FastAPI，具備直接 Email 寄送、零 DB 留言儲存、防 spam 與雙語切換。 |
| Developed Projects | **50 Startups 獲利預測與特徵分析** | CRISP-DM 決策平台，整合自製 OLS 多元線性迴歸、貝氏目標編碼與預測區間互動儀表板。 |
| Developed Projects | **產業機器學習互動體驗站** | 互動式機器學習導引，支援多模型指標與決策邊界比較，並串接 Gemini AI 助理提供情境解釋。 |
| Developed Projects | **Hugging Face AI 繪圖生成器** | Streamlit 串接 FLUX.1 Schnell 與 SDXL，支援多圖並行、雙語介面與本機 Demo 模式。 |
| Developed Projects | **線性迴歸與空污異常監測實作** | CRISP-DM 框架的線性迴歸與中部地區 AQI 空污異常偵測展示工具。 |
| Developed Projects | **AI 開發儀表板實踐** | 互動式前端網頁儀表板，具備毛玻璃擬態 UI、滑鼠折射光影特效與即時數位日曆時鐘。 |
| Developing / Planned Projects | **預約 App 與 LINE Bot 推播** | 候選構想：結合預約流程、LINE Bot 推播與 n8n 自動化。 |
| Developing / Planned Projects | **旅遊規劃建議配合爬蟲實踐** | 候選構想：搭配爬蟲蒐集旅遊資訊，練習資料整理、比較與行程規劃決策素材。 |

---

## 技術架構

```text
17s_portfolio/
├── frontend/
│   ├── src/app/                 # Next.js App Router
│   ├── src/components/          # Hero, Projects, Skills, Experience, Contact, LanguageContext
│   ├── src/config.ts            # Frontend API endpoint configuration
│   └── package.json
├── backend/
│   ├── main.py                  # Stateless FastAPI routes, anti-spam logic, direct email dispatch
│   ├── data.py                  # Structured portfolio data (0 DB, in-memory catalog)
│   ├── schemas.py               # Pydantic schemas (Project, Skill, Experience, ContactResponse)
│   └── requirements.txt         # Minimal lightweight dependencies (no DB ORM needed)
├── docs/
│   └── deployment_guide.md
├── run.bat
└── README.md
```

---

## 本機執行

### 方式一：Windows 一鍵啟動

在專案根目錄執行：

```bat
run.bat
```

此腳本會分別啟動：

- FastAPI backend: [http://localhost:8000](http://localhost:8000)
- Next.js frontend: [http://localhost:3000](http://localhost:3000)

### 方式二：手動啟動

啟動後端：

```powershell
cd backend
.venv\Scripts\Activate.ps1
python -m uvicorn main:app --port 8000 --reload
```

後端 API 文件：

```text
http://localhost:8000/docs
```

啟動前端：

```powershell
cd frontend
npm ci
npm run dev
```

前端頁面：

```text
http://localhost:3000
```

`npm ci` 會依照 `package-lock.json` 安裝固定版本，適合 fresh clone 後使用。若 Windows PowerShell 擋下 `npm`，可改用 Command Prompt，或執行 `npm.cmd ci` 與 `npm.cmd run dev`。

---
