# Continuous Deployment (CD) Setup Guide

This guide explains exactly how to connect your GitHub repository to Vercel so that both your Frontend and Backend automatically build and deploy every time you push a new commit.

---

## Step 1: Push your Code to GitHub
Ensure your code is pushed to a Git repository.
```bash
git add .
git commit -m "Monorepo restructure and Vercel Config"
git push origin main
```

---

## Step 2: Deploy the Database (Free Tier)
We need a remote PostgreSQL database first.
1. Go to your **Vercel Dashboard** > **Storage** tab.
2. Click **Create Database** and select **Neon**.
3. Name it (e.g. `nilswa-db`), pick your Region, and hit **Create**.
4. Go to the `.env.local` tab and copy the `DATABASE_URL`.
5. Go to the **Query** tab in Neon, paste the contents of `database/schema.sql`, and hit Run to build your tables.

---

## Step 3: Deploy the Backend (Python API) to Vercel
We will create a specific Vercel project just for the backend.

1. Go to [Vercel.com](https://vercel.com) and click **Add New Project**.
2. Connect your GitHub account and select your NILSWA repository.
3. **Configuration Details**:
   - **Project Name**: `nilswa-api`
   - **Root Directory**: Click "Edit" and select the `server` folder. *(Critically important!)*
   - **Framework Preset**: Other (Vercel will automatically detect `vercel.json` and use Python).
4. **Environment Variables**:
   - Open the Environment Variables dropdown.
   - **Name**: `DATABASE_URL`
   - **Value**: Paste the database connection string you got in Step 2.
5. Click **Deploy**. Vercel will build your Python API and give you a URL (e.g., `https://nilswa-api.vercel.app`).

---

## Step 4: Deploy the Frontend (Next.js) to Vercel
We will create a second Vercel project for the frontend.

1. Go to Vercel and click **Add New Project** again.
2. Select the exact same NILSWA repository.
3. **Configuration Details**:
   - **Project Name**: `nilswa-client`
   - **Root Directory**: Click "Edit" and select the `client` folder.
   - **Framework Preset**: Next.js.
4. **Environment Variables**:
   - Open the Environment Variables dropdown.
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Paste the URL of your Vercel Backend from Step 3 (e.g., `https://nilswa-api.vercel.app`).
5. Click **Deploy**. Vercel will now automatically build and host your Next.js application!

---

### You're Done! 🎉
Every time you push a commit to the `main` branch on GitHub:
- Your Vercel `nilswa-client` project will seamlessly redeploy the frontend.
- Your Vercel `nilswa-api` project will seamlessly redeploy the Python API. 
- You now have a robust, fully automated Serverless CI/CD pipeline!
