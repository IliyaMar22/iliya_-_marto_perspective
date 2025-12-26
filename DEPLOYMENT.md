# 🚀 Deployment Guide

Quick deployment guide for **Perspective for Bulgaria**.

## 🎯 Supported Platforms

- ✅ **Railway** (Recommended)
- ✅ **Vercel**
- ✅ **Netlify**
- ✅ **Render**
- ✅ **Docker** (Any platform)

---

## 🚂 Railway (Recommended)

### One-Click Deploy

1. **Click this button:**
   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

2. **Or manually:**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Select this repository
   - Railway auto-detects and deploys!

**That's it!** Railway handles everything automatically.

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed guide.

---

## ▲ Vercel

### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy via Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Deploy!

---

## 🟢 Netlify

### Deploy via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy via Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Import GitHub repository
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
4. Deploy!

---

## 🐳 Docker

### Build Image

```bash
docker build -t perspective-bulgaria .
```

### Run Container

```bash
docker run -p 3000:3000 perspective-bulgaria
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] All tests passing
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables documented
- [ ] No hardcoded API URLs
- [ ] Production build tested locally

---

## 🔧 Environment Variables

**Optional (usually not needed):**

```env
NODE_ENV=production
CI=false
GENERATE_SOURCEMAP=false
```

**Note:** Railway/Vercel/Netlify set these automatically.

---

## 📚 Detailed Guides

- **Railway:** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- **General:** See [README.md](./README.md)

---

## 🆘 Need Help?

- Check platform-specific documentation
- Review deployment logs
- Check GitHub Issues

---

**Ready to deploy? Choose your platform above! 🚀**

