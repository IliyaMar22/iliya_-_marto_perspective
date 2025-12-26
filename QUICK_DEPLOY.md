# ⚡ Quick Deploy Guide

Deploy **Perspective for Bulgaria** to Railway in under 2 minutes!

## 🚀 One-Click Deploy

1. **Go to Railway**: https://railway.app
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `IliyaMar22/iliya_-_marto_perspective`
5. **Click "Deploy"**

**That's it!** Railway will:
- ✅ Auto-detect React app
- ✅ Install dependencies
- ✅ Build the app
- ✅ Deploy and generate URL

---

## 📋 What Happens Automatically

Railway uses these files (already configured):

- **`railway.json`** - Build and deploy commands
- **`Procfile`** - Process definition
- **`nixpacks.toml`** - Build configuration
- **`package.json`** - Scripts and dependencies

---

## ⚙️ Manual Configuration (If Needed)

If auto-detection fails:

### Build Command
```bash
npm ci && npm run build
```

### Start Command
```bash
npx serve -s build -l $PORT
```

### Root Directory
```
./
```
(Leave empty - root directory)

---

## 🌐 Get Your URL

After deployment:

1. Go to your Railway service
2. Click **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Your app is live! 🎉

---

## 🔧 Environment Variables

**Optional** (usually not needed):
- `NODE_ENV=production` (auto-set)
- `CI=false` (auto-set)
- `GENERATE_SOURCEMAP=false` (auto-set)

---

## ✅ Verify Deployment

1. Visit your Railway URL
2. Check browser console (F12) for errors
3. Test all features:
   - Navigation menu
   - Interactive map
   - Charts and visualizations
   - PDF viewer

---

## 🆘 Troubleshooting

**Build fails?**
- Check Railway logs
- Verify Node.js version (18+)
- Ensure all dependencies in package.json

**App doesn't load?**
- Check start command includes `-s` flag
- Verify PORT environment variable
- Check Railway logs

**Need help?**
- See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- Railway Docs: https://docs.railway.app

---

## 🎉 Success!

Your app is now live at:
```
https://your-app-name.up.railway.app
```

**Share it with the world! 🌍**

