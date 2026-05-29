# Portfolio Deployment Guide (Supabase + GCP Cloud Run + Vercel)

This guide walks you through setting up a free database on **Supabase**, pushing your code to **GitHub**, and deploying both the backend (to **Google Cloud Run**) and frontend (to **Vercel**).

---

## 1. Supabase Database Setup (Free PostgreSQL)

Supabase offers a generous free tier including 2 free PostgreSQL databases.

1. **Sign Up**: Go to [supabase.com](https://supabase.com) and sign up with your GitHub account.
2. **Create Project**: Click **New Project**, select an organization, and give your project a name (e.g., `portfolio-db`).
3. **Database Password**: Set a strong database password (save this password somewhere safe). Select the region closest to you.
4. **Get Connection String**:
   - Once the database is ready, go to **Project Settings** (gear icon) > **Database**.
   - Under **Connection string**, select **URI** and copy the URL.
   - It will look like this: `postgresql://postgres.[your-project-id]:[your-password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
   - **Important**: Replace `[your-password]` with the actual database password you created in step 3.

---

## 2. Push Code to GitHub

Since you want to host your project on GitHub and connect Vercel, push the code to a new repository:

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio with FastAPI backend & Next.js frontend"
   ```
2. **Publish to GitHub**:
   - Create a new public or private repository on [github.com](https://github.com) named `portfolio`.
   - Run the commands provided by GitHub to add the remote and push your code:
     ```bash
     git remote add origin https://github.com/your-username/portfolio.git
     git branch -M main
     git push -u origin main
     ```

---

## 3. Deploy Python Backend to Google Cloud Run

Google Cloud Run is a containerized serverless hosting platform. It has a generous free tier of 2 million requests per month.

### Step 3.1: Install Google Cloud CLI (GCLI)
If you haven't installed the Google Cloud CLI, download and install it from [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install).

### Step 3.2: Login and Configure GCP Project
Open your terminal and run:
```bash
# Login to your Google account
gcloud auth login

# Create a new project (replace portfolio-backend-12345 with a unique name)
gcloud projects create portfolio-backend-12345 --set-as-default

# Link your billing account (required to use Cloud Run, even though it fits in free tier)
gcloud beta billing projects link portfolio-backend-12345 --billing-account=YOUR_BILLING_ACCOUNT_ID
```

### Step 3.3: Deploy the Backend
We can deploy the backend directly from the `backend/` folder. Run this command from the root directory of your project:
```bash
gcloud run deploy portfolio-backend --source ./backend --region us-central1 --allow-unauthenticated --set-env-vars="DATABASE_URL=your_supabase_connection_string"
```
- Replace `your_supabase_connection_string` with the URI you copied from Supabase.
- Google Cloud Run will automatically compile the Docker container, upload it to Artifact Registry, and deploy the service.
- **Copy the Service URL** once the deployment succeeds (it will look like `https://portfolio-backend-xxxxxx.a.run.app`).

### Step 3.4: Seed the Supabase Database
To populate your new Supabase database with initial mock portfolio data:
1. In your local backend environment, set the environment variable:
   - On Windows PowerShell: `$env:DATABASE_URL="your_supabase_connection_string"`
2. Run the seed script:
   - `C:\Users\admin\Documents\17s_workplace\backend\.venv\Scripts\python.exe backend\seed.py`

---

## 4. Deploy Frontend to Vercel

Vercel is Next.js' native cloud platform and is free for personal projects.

1. **Sign Up**: Go to [vercel.com](https://vercel.com) and link your GitHub account.
2. **Import Project**: Click **Add New** > **Project** and select your `portfolio` GitHub repository.
3. **Configure Settings**:
   - **Root Directory**: Select `frontend`.
   - **Framework Preset**: Next.js.
   - **Environment Variables**:
     - Next.js automatically connects to the backend API.
     - (Optional) If you want to customize the API URL, add an environment variable:
       - Name: `NEXT_PUBLIC_API_URL`
       - Value: `https://portfolio-backend-xxxxxx.a.run.app` (the Cloud Run backend Service URL you copied in Step 3.3).
4. **Deploy**: Click **Deploy**. Vercel will automatically build and publish your Next.js frontend!
