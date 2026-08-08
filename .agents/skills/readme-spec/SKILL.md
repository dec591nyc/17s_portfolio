---
name: readme-spec
description: Specification and standard guidelines for writing clean, professional, and natural project READMEs across all software repositories. Enforces plain technical language, avoids awkward AI buzzwords and direct machine translations, and focuses on motivation, architecture, features, configuration, startup, deployment, and practical takeaways.
---

# 軟體專案 README 撰寫規範手冊 (Universal README Spec)

本規範提供所有軟體專案（全端應用、後端服務、前端專案、資料管道、CLI 工具等）通用的 README 結構標準與寫作指引。

---

## 🎯 核心原則

1. **自然務實的工程口吻（去 AI 味）**：
   - 使用軟體工程師日常溝通的清晰白話，不使用生硬直譯、浮誇的行銷名詞或過度包裝的學術詞彙。
   - 避免空洞套話，直截了當講清楚「系統解決什麼問題」、「技術如何運作」、「如何跑起來」。

2. **架構與可用性優先（Architecture & Usability First）**：
   - 讓任何人能在 3 分鐘內理解專案背景、架構設計、環境變數與啟動方式。
   - 若已有線上 Demo 或互動文件（如 Swagger），提供連結即可，避免在 README 堆砌重複且不易維護的型錄細節。

3. **泛用 7 大核心結構（Universal 7 Pillars）**：
   無論任何軟體專案，標準 README 應包含以下 7 個結構化章節：

---

## 📋 通用章節架構標準

### 1. 專案標題與一句話定位 (Header & Quick Links)
- **專案名稱與一句話摘要**：清楚說明這是一個什麼工具/系統。
- **即時連結**：Live Demo、API 文件或重要展示入口。

### 2. 開發動機與解決問題 (Motivation & Problem Statement)
- **為什麼做這個專案？**
- **解決了什麼具體痛點或應用情境？**
- **相比傳統或既有做法有什麼優勢？**（例如：更輕量、更高安全性、低維運成本、易於維護等）

### 3. 技術架構與資料流 (Technical Architecture)
- **技術選型清單**：前端、後端、資料庫/儲存層、型別系統、測試與部署工具。
- **系統流程圖 (Mermaid)**：繪製清晰簡潔的資料流向或模組呼叫關係。
- **專案目錄結構**：乾淨的樹狀結構圖，僅標註關鍵模組與目錄職責。

### 4. 核心功能 (Core Features)
- 以簡短條列方式，列出專案具備的主要功能、操作亮點或自動化能力。

### 5. 環境變數與配置說明 (Configuration & Environment Variables)
- **環境變數範例**：清楚列出 `.env.example` 支援的變數與型態。
- **配置參數說明表**：說明各設定項的用途、預設值與注意事項。
- **安全性與防護機制**：若有存取限制、頻率控管 (Rate Limit)、驗證機制或防灌水邏輯，以表格白話說明其規則。

### 6. 本機啟動與快速上手 (Getting Started & Run)
- **前置需求 (Prerequisites)**：所需語言版本（Node.js, Python, Go, Docker 等）。
- **一鍵啟動腳本**（若有 `run.bat`, `Makefile`, `docker-compose` 等）。
- **手動啟動指令**：提供乾淨、可直接複製貼上的終端機指令（包含套件安裝、環境設定與啟動）。
- **服務與文件入口**：列出本地端 port 與 API 測試路徑（如 `http://localhost:3000`, `/docs`）。

### 7. 部署步驟與開發收穫 (Deployment & Engineering Takeaways)
- **部署指引**：說明如何建置 Production Bundle、容器化 (Docker) 或部署至雲端平台（Vercel, Cloud Run, AWS, VPS 等）。
- **實務開發心得 (Takeaways)**：從軟體工程角度總結本專案在架構整合、效能優化、資安考量或維運簡化上的實質收穫。

---

## 🚫 撰寫禁忌 (Anti-Patterns)

- ❌ **避免過度描述個別業務細節**：README 不應成為瑣碎的專案型錄，保持架構與工程層次的聚焦。
- ❌ **避免指令不完整**：不可省略相依套件安裝與必要環境變數說明，確保他人 clone 後能順利執行。
- ❌ **避免生硬的機器翻譯字眼**：使用普遍通用的台灣技術術語（如：*資料庫儲存*而非*落地存儲*、*頻率限制*而非*滑動窗口頻率限制*）。
