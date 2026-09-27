# 工作筆記設定

專案：`yichi-portfolio-prod`，組織 `zifuera17N9`，新加坡。

[Supabase 控制台](https://supabase.com/dashboard/project/nodyzecztapwzpxxupvd)

## 已完成

- `schema.sql` 已套用至遠端資料庫。
- 後續已套用 `remove_notes_summary`：移除筆記摘要欄位及其內容；目前 schema 與前端均不再包含摘要。
- 訪客只能讀取已發布、未刪除的筆記；草稿與垃圾桶僅管理員可讀。
- `site_admins` 名單決定管理權限，前端不能自行新增或修改名單。
- 新增與修改由資料庫再次檢查身分及擁有者；刪除採可復原的垃圾桶。
- `test-permissions.sql` 已驗證權限，測試資料由交易回滾，沒有保留測試帳號。
- 已關閉公開註冊與匿名登入，Email 登入啟用。
- Site URL 與允許返回網址設為 `https://17s-portfolio.vercel.app/auth/reset`，讓邀請及重設密碼進入設定頁。

## 管理員帳號

使用者親自在 Authentication → Users → Add user → Create new user 建立 `zifuera@outlook.com`，設定密碼並保留 Auto confirm user。
不要把密碼寫入檔案或對話。Supabase 控制台帳號與網站管理員帳號是兩個不同用途的帳號。

建立後，由受信任的控制台 SQL Editor 或管理工具執行以下語句授權；如果帳號不存在，不會新增任何權限：

```sql
insert into public.site_admins (user_id)
select id from auth.users
where lower(email) = 'zifuera@outlook.com'
  and email_confirmed_at is not null
on conflict (user_id) do nothing;
```

再確認管理員人數為 1，並實際登入測試新增草稿、發布、修改、刪除與復原。
管理員帳號已建立並完成授權，已確認名單中只有這一個帳號。實際帳號登入與操作仍待驗證，不能把 SQL 權限測試視為實際帳號登入測試。

## 部署

本機 `frontend/.env.local` 已加入公開連線設定。部署平台需加入相同的兩個變數，再重新部署：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

變數名稱可參照 `frontend/.env.example`。僅使用 publishable key，不要使用 service role 或 secret key。
這些 NEXT_PUBLIC 變數在建置時讀取；只更改平台變數而不重新部署不會生效。

密碼重設頁上線前不要寄送正式邀請，避免郵件連結進入尚未部署的頁面。
忘記密碼郵件仍需實際驗證送達；若 Supabase 預設寄信限制收件人，需設定專用 SMTP，憑證由使用者在安全設定頁輸入。

## 操作方式

工作筆記位於首頁後、專案展示前。點右上角「後台操作」登入後，原頁面會顯示新增、編輯與刪除控制。
筆記支援純文字、分類、標籤、搜尋、草稿與發布。儲存為手動操作；離開有未儲存修改的頁面會提醒。
「在此裝置保持登入」保存登入階段，不保存密碼；密碼可交由瀏覽器密碼管理員處理。

求職狀態集中於 `frontend/src/data/siteSettings.ts`：`employed` 為目前在職／鐵灰，`open` 為開放求職中／藍色。
