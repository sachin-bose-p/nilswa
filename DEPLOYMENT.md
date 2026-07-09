# Continuous Deployment (CD) Setup Guide

This guide explains exactly how to connect your GitHub repository to Vercel (Frontend) and Render (Backend) so that your application automatically builds and deploys every time you push a new commit.

---

## Step 1: Push your Code to GitHub
Ensure your code is pushed to a Git repository.
```bash
git add .
git commit -m "Monorepo restructure"
git push origin main
```

---

## Step 2: Deploy the Database (Free Tier)
We need a remote PostgreSQL database first, so we have a URL to give to the backend.
1. Go to [Supabase](https://supabase.com/) or [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres).
2. Create a new Database project.
3. Copy the **Connection String** (it will look like `postgresql://user:password@host:port/dbname`).
4. Go to the SQL Editor in their dashboard, paste the contents of `database/schema.sql`, and hit Run to build your tables.

---

## Step 3: Deploy the Backend to Render
Render is the ideal free platform for continuous deployment of Python APIs.

1. Go to [Render.com](https://render.com) and create an account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your NILSWA repository.
4. **Configuration Details**:
   - **Name**: `nilswa-api`
   - **Root Directory**: `server` *(Critically important!)*
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**:
   - Click Advanced and add a variable named `DATABASE_URL`. Paste the database connection string you got in Step 2.
6. Click **Create Web Service**. Render will now automatically deploy your API every time you push to GitHub!
7. **Copy your Render URL** (e.g., `https://nilswa-api.onrender.com`).

---

## Step 4: Deploy the Frontend to Vercel
Vercel is the ultimate hosting platform for Next.js apps.

1. Go to [Vercel.com](https://vercel.com) and click **Add New Project**.
2. Connect your GitHub account and import the NILSWA repository.
3. **Configuration Details**:
   - **Root Directory**: Click "Edit" and select the `client` folder.
   - **Framework Preset**: Next.js (should auto-detect).
4. **Environment Variables**:
   - Open the Environment Variables dropdown.
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Paste the URL of your Render API from Step 3 (e.g., `https://nilswa-api.onrender.com`).
5. Click **Deploy**. Vercel will now automatically build and host your Next.js application!

---

### You're Done! 🎉
Every time you push a commit to the `main` branch on GitHub:
- Vercel will detect changes in the `client/` folder and seamlessly redeploy the frontend.
- Render will detect changes in the `server/` folder and automatically reboot the Python API. 
- You now have a robust, fully automated CI/CD pipeline!
