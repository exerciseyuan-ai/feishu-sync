# Feishu Sync Dashboard - Cloud Deployment

## Quick Deploy to Railway

1. Create a GitHub repository with these files
2. Go to https://railway.app and sign in with GitHub
3. Click "New Project" > "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js and runs `npm start`
6. Your app will be live at a railway.app URL

## OR Deploy to Render

1. Push these files to a GitHub repo
2. Go to https://render.com
3. Click "New +" > "Web Service"
4. Connect your GitHub repo
5. Set:
   - Build Command: (empty)
   - Start Command: `node server.js`
6. Deploy

## Environment Variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port (Railway/Render set this automatically) |

## Local Development

```bash
cd cloud-app
node server.js
open http://localhost:3000
```

## Structure

```
cloud-app/
  server.js        - Web server + Feishu API proxy
  package.json     - Project config
  public/
    3.0.0.html     - Main dashboard (PWA enabled)
    manifest.json   - PWA manifest
    sw.js          - Service Worker
    icon.svg        - App icon
```