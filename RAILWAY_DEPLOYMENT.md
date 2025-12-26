# 🚀 Railway Deployment Guide

Complete guide for deploying **Perspective for Bulgaria** to Railway.

## 📋 Prerequisites

- Railway account ([sign up here](https://railway.app))
- GitHub repository with your code
- Node.js 18+ (handled automatically by Railway)

## 🚀 Quick Deploy (Recommended)

### Step 1: Deploy from GitHub

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Authorize Railway (if first time)
   - Select your repository: `IliyaMar22/iliya_-_marto_perspective`

3. **Railway Auto-Detection**
   - Railway will automatically detect this is a Node.js/React app
   - It will use the `railway.json` configuration
   - Build command: `npm ci && npm run build`
   - Start command: `npx serve -s build -l $PORT`

4. **Wait for Deployment**
   - Railway will install dependencies (~2-3 minutes)
   - Build the React app (~3-5 minutes)
   - Start the server
   - **Total time: ~5-8 minutes**

5. **Get Your URL**
   - Railway will generate a URL automatically
   - Example: `https://perspective-for-bulgaria-production.up.railway.app`
   - Click **"Generate Domain"** in Settings for a custom domain

---

## ⚙️ Manual Configuration (If Needed)

If Railway doesn't auto-detect correctly, configure manually:

### Build Settings

**Root Directory:** `.` (leave empty or `/`)

**Build Command:**
```bash
npm ci && npm run build
```

**Start Command:**
```bash
npx serve -s build -l $PORT
```

### Environment Variables

**Optional Environment Variables:**

```env
# Build optimization
CI=false
GENERATE_SOURCEMAP=false

# Node environment
NODE_ENV=production

# Port (automatically set by Railway)
PORT=3000
```

**Note:** Railway sets `PORT` automatically. Don't override it unless needed.

---

## 🔧 Configuration Files

This project includes the following deployment files:

### `railway.json`
Railway-specific configuration for build and deploy commands.

### `Procfile`
Defines the web process for Railway to run.

### `nixpacks.toml`
Nixpacks configuration for custom build process (if needed).

### `.railwayignore`
Files to exclude from deployment (similar to `.gitignore`).

---

## 📦 Build Process

Railway will:

1. **Install Dependencies**
   ```bash
   npm ci
   ```
   - Uses `package-lock.json` for reproducible builds
   - Faster than `npm install`

2. **Build React App**
   ```bash
   npm run build
   ```
   - Creates optimized production build
   - Outputs to `build/` directory
   - Disables source maps for smaller bundle size

3. **Serve Static Files**
   ```bash
   npx serve -s build -l $PORT
   ```
   - Serves the `build/` directory
   - Single-page app routing support (`-s` flag)
   - Listens on Railway's `$PORT` environment variable

---

## 🌐 Custom Domain Setup

1. **Generate Railway Domain**
   - Go to your service → **Settings** → **Networking**
   - Click **"Generate Domain"**
   - Railway creates: `your-app-name.up.railway.app`

2. **Add Custom Domain (Optional)**
   - In **Settings** → **Networking**
   - Click **"Custom Domain"**
   - Add your domain (e.g., `perspective-bulgaria.com`)
   - Follow DNS configuration instructions

---

## 🔍 Troubleshooting

### Build Fails

**Error: `npm ci` fails**
- Check `package-lock.json` exists
- Ensure Node.js version is 18+
- Try: `npm install` instead of `npm ci`

**Error: Build timeout**
- Increase build timeout in Railway settings
- Check for large dependencies
- Optimize build process

### App Doesn't Load

**Error: Cannot GET /**
- Ensure `serve` command includes `-s` flag (SPA routing)
- Check `build/` directory exists
- Verify start command: `npx serve -s build -l $PORT`

**Error: Port already in use**
- Railway sets `$PORT` automatically
- Don't hardcode port numbers
- Use `$PORT` environment variable

### Environment Variables Not Working

**React env vars not loading**
- React env vars must start with `REACT_APP_`
- Rebuild after adding env vars
- Check Railway Variables tab

---

## 📊 Monitoring & Logs

### View Logs

1. Go to your Railway service
2. Click **"Deployments"** tab
3. Click on latest deployment
4. View **"Logs"** tab

### Monitor Performance

- Railway dashboard shows:
  - CPU usage
  - Memory usage
  - Network traffic
  - Request metrics

---

## 🔄 Continuous Deployment

Railway automatically deploys when you push to GitHub:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Railway Detects Changes**
   - Automatically triggers new deployment
   - Builds and deploys latest code

3. **Zero-Downtime Deployment**
   - Railway uses rolling deployments
   - No service interruption

---

## 💰 Railway Pricing

**Free Tier Includes:**
- $5/month credit (free)
- 500 hours of usage
- Perfect for small projects

**Hobby Plan ($5/month):**
- $5 credit + $5 payment
- More resources
- Better performance

---

## 🚀 Alternative Platforms

This app can also be deployed to:

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Render
- Similar to Railway
- Connect GitHub repo
- Auto-deploy on push

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Project created on Railway
- [ ] GitHub repo connected
- [ ] Build successful
- [ ] App accessible via Railway URL
- [ ] Custom domain configured (optional)
- [ ] Environment variables set (if needed)
- [ ] Monitoring enabled

---

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: Create an issue in your repo

---

## 🎉 Success!

Once deployed, your app will be available at:
```
https://your-app-name.up.railway.app
```

**Congratulations! Your app is live! 🚀**

