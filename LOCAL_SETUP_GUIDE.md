# EvacuAi System - Local Setup Guide

Complete step-by-step instructions to run EvacuAi on your own computer.

---

## PREREQUISITES - Install These First

### 1. Node.js (REQUIRED)
**Download:** https://nodejs.org/
- Choose **LTS (Long Term Support)** version (v20 or v22)
- Run the installer
- Complete the installation

**Verify it worked:**
```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
```

### 2. Git (Optional but Recommended)
**Download:** https://git-scm.com/
- Install with default settings

**Verify:**
```bash
git --version
```

### 3. Code Editor (Optional but Helpful)
**Download:** https://code.visualstudio.com/
- Helps you edit code and see file structure
- VS Code is free and popular

---

## DOWNLOAD THE PROJECT

### Option A: Download ZIP (Easiest)
1. Go to v0.app where you created this project
2. Click the three dots (...) in top right
3. Click "Download ZIP"
4. Extract the ZIP file to a folder
5. Remember the folder path

### Option B: Use Git (If you cloned it)
```bash
# If you have the GitHub link:
git clone https://github.com/your-username/evacuai.git
cd evacuai
```

### Option C: Manual Copy
Copy all files from the v0 project to a new folder on your computer.

---

## SETUP ON YOUR COMPUTER

### Step 1: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**Mac:**
- Press `Cmd + Space`
- Type `terminal`
- Press Enter

**Linux:**
- Open Terminal application

### Step 2: Navigate to Project Folder

```bash
# WINDOWS EXAMPLE (change path to your location)
cd C:\Users\YourName\Desktop\evacuai-system

# MAC EXAMPLE
cd ~/Desktop/evacuai-system

# LINUX EXAMPLE
cd ~/evacuai-system
```

**Verify you're in the right folder:**
```bash
# You should see these files when you list contents
ls              # Mac/Linux
dir             # Windows

# Output should show: src, public, vite.config.ts, package.json, etc.
```

### Step 3: Install All Dependencies

Run this command in the terminal (from project folder):

```bash
npm install
```

**What happens:**
- Downloads ~500 packages
- Creates `node_modules` folder
- Takes 2-5 minutes depending on internet
- You'll see lots of text (this is normal)
- Should end with: `added XXX packages`

**If you already have pnpm installed:**
```bash
pnpm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

**You should see:**
```
VITE v5.4.0 ready in 234 ms

➜ Local:   http://localhost:3000/
➜ press h to show help
```

**Keep this terminal window open!** This is your dev server running.

### Step 5: Open in Your Browser

Open a **new browser tab** and go to:
```
http://localhost:3000
```

**You should see the EvacuAi homepage!**

---

## WHAT YOU CAN DO NOW

- **Navigate** between Home, Map, and Dashboard
- **View 3D Map** with rotating Cebu visualization
- **Report Status** on evacuation centers
- **View Dashboard** with real-time statistics
- **All changes auto-refresh** thanks to Vite HMR

---

## STOPPING THE SERVER

When you want to stop:

1. Go to the terminal window where you ran `npm run dev`
2. Press `Ctrl + C` (or `Cmd + C` on Mac)
3. Type `y` and press Enter if asked

---

## STARTING AGAIN LATER

Next time you want to work on the project:

```bash
# Navigate to project folder
cd path/to/evacuai-system

# Start the server
npm run dev

# Open http://localhost:3000 in browser
```

That's it! No need to reinstall dependencies.

---

## PROJECT STRUCTURE

```
evacuai-system/
├── src/
│   ├── pages/               # 3 pages (home, map, dashboard)
│   ├── components/          # React components
│   ├── lib/                 # Data & utilities
│   ├── App.tsx              # Main app file
│   ├── main.tsx             # Entry point
│   └── globals.css          # Styling
├── public/                  # SEO files (robots.txt, sitemap.xml)
├── index.html               # HTML page
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies list
└── README.md                # Full documentation
```

---

## MAKING CHANGES

All code is in the `src/` folder:

**To edit pages:**
```
src/pages/home.tsx      # Homepage
src/pages/map.tsx       # 3D Map page
src/pages/dashboard.tsx # Dashboard
```

**To edit components:**
```
src/components/header.tsx              # Navigation
src/components/cebu-3d-map.tsx         # 3D Map
src/components/evacuation-center-card.tsx  # Center details
```

**Changes auto-reload** - just save the file and your browser updates!

---

## TECHNOLOGIES USED

- **React 19** - UI framework
- **Vite 5** - Ultra-fast build tool
- **React Router 6** - Page navigation
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

All automatically installed with `npm install`!

---

## ENVIRONMENT

Your local development environment includes:

✓ Hot Module Replacement (HMR) - Changes auto-reload  
✓ TypeScript compilation - Type checking  
✓ CSS processing - Tailwind CSS  
✓ SEO optimization - Meta tags & sitemaps  
✓ 3D rendering - Three.js  
✓ Smooth animations - Framer Motion  

---

## DEPLOY TO PRODUCTION

When ready to share publicly:

### Deploy to Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel deploy
```

### Deploy to GitHub Pages
1. Push to GitHub
2. Enable Pages in repo settings
3. GitHub auto-deploys

### Deploy to Any Server
```bash
npm run build
# Upload 'dist' folder to your server
```

---

## TROUBLESHOOTING

### Problem: "npm: command not found"
**Solution:** Node.js not installed or not in PATH
- Restart your computer after installing Node.js
- Or reinstall Node.js

### Problem: "Cannot find module"
**Solution:** Dependencies not installed
```bash
npm install
```

### Problem: Port 3000 already in use
**Solution:** Use different port
```bash
npm run dev -- --port 3001
# Then visit http://localhost:3001
```

### Problem: "EACCES: permission denied"
**Solution:** Use sudo (Mac/Linux)
```bash
sudo npm install
```

### Problem: Changes not showing
**Solution:** 
- Hard refresh browser: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
- Check that dev server is still running in terminal
- If needed, stop (`Ctrl + C`) and restart with `npm run dev`

---

## FILE SIZES

Expected after `npm install`:
- `node_modules/` folder: ~500 MB
- `src/` folder: ~200 KB
- `dist/` folder (after build): ~400 KB

---

## SYSTEM REQUIREMENTS

**Minimum:**
- RAM: 2 GB
- Storage: 1 GB free space
- Internet: For npm install

**Recommended:**
- RAM: 8 GB
- Storage: 5 GB free space
- Node.js v18+

---

## GETTING HELP

If something doesn't work:
1. Read error message in terminal carefully
2. Check this guide for troubleshooting
3. Check README.md for more info
4. Check QUICKSTART.md for quick reference

---

## NEXT STEPS AFTER SETUP

1. ✅ Run the project locally (you just did this!)
2. ✅ Explore all 3 pages and test features
3. ✅ Read README.md for full documentation
4. ✅ Check SEO_GUIDE.md for deployment instructions
5. ✅ Deploy to Vercel when ready (see QUICKSTART.md)
6. ✅ Submit sitemaps to Google Search Console

---

**You're all set! Enjoy building with EvacuAi.** 🚀
