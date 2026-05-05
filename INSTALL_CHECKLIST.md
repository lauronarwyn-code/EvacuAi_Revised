# Installation & Downloads Checklist

## Step 1: Download & Install Node.js (REQUIRED)

### What to download:
- **Node.js LTS (Long Term Support)**
- Current versions: v20.x or v22.x

### Download link:
https://nodejs.org/

### Installation steps:
1. Click "Download LTS" button
2. Choose your operating system (Windows/Mac/Linux)
3. Run the installer
4. Click "Next" through all screens
5. Click "Install" / "Finish"
6. Restart your computer (recommended)

### Verify installation worked:
Open Terminal/Command Prompt and type:
```bash
node --version
npm --version
```

You should see version numbers like:
- `v20.10.0` or higher
- `npm 10.2.0` or higher

If you get "command not found", Node.js didn't install correctly. Try reinstalling.

---

## Step 2: Optional Downloads

### Git (Optional - For cloning projects)
Download: https://git-scm.com/
- Install with default settings
- Verify: `git --version`

### Visual Studio Code (Optional - Code Editor)
Download: https://code.visualstudio.com/
- Free and popular
- Helps edit code files
- Shows file structure clearly

### GitHub Desktop (Optional - If using GitHub)
Download: https://desktop.github.com/
- User-friendly Git interface
- Alternative to Command Line

---

## Step 3: Get the EvacuAi Project Files

### Method A: Download ZIP (Easiest)
1. Open v0.app project
2. Click three dots (...) top right
3. Select "Download ZIP"
4. Extract ZIP file to a folder
5. Remember the folder location

### Method B: Clone from GitHub (If you have Git)
Open Terminal and run:
```bash
git clone https://github.com/your-username/evacuai.git
cd evacuai
```

### Method C: Manual Copy
Copy all files from v0 to a new folder on your computer

---

## Step 4: Install Project Dependencies

Navigate to your project folder in Terminal:

**Windows:**
```cmd
cd C:\Users\YourName\Desktop\evacuai-system
```

**Mac:**
```bash
cd ~/Desktop/evacuai-system
```

**Linux:**
```bash
cd ~/evacuai-system
```

Then run:
```bash
npm install
```

This downloads ~500 packages. Takes 2-5 minutes.

---

## Step 5: Run the Project

```bash
npm run dev
```

You'll see:
```
VITE v5.4.0 ready in 234 ms
➜ Local: http://localhost:3000/
```

Open browser to: **http://localhost:3000**

---

## What Gets Installed (Automatically)

When you run `npm install`, these packages are downloaded:

### Core Framework
- react (^19) - UI library
- react-dom (^19) - React for web
- react-router-dom (^6.28) - Page routing

### 3D & Animation
- three (^r128) - 3D graphics
- @react-three/fiber (^8.17) - React for Three.js
- @react-three/drei (^9.116) - 3D helpers
- framer-motion (^11.11) - Animations

### Styling
- tailwindcss (^4.2) - CSS framework
- lucide-react - Icons

### SEO & Meta
- react-helmet-async (^2.0.5) - Meta tags

### Development Tools
- vite (^5.4) - Build tool
- @vitejs/plugin-react (^4.3) - React plugin for Vite
- typescript - Type checking

**Total size:** ~500 MB in `node_modules/` folder

---

## Folder Structure After Setup

```
evacuai-system/
├── node_modules/          ← All dependencies (500 MB)
├── src/                   ← Source code you edit
│   ├── pages/
│   ├── components/
│   ├── lib/
│   └── ...
├── public/                ← SEO files
├── index.html             ← Main HTML
├── vite.config.ts         ← Configuration
├── package.json           ← Dependencies list
└── tsconfig.json          ← TypeScript config
```

---

## Common Issues & Fixes

### "npm: command not found"
→ Node.js not installed or computer not restarted
→ Restart computer and reinstall Node.js

### "Cannot find module"
→ Run: `npm install`

### Slow internet download
→ npm install might take 10+ minutes
→ Let it finish, don't interrupt

### Port 3000 in use
→ Use different port: `npm run dev -- --port 3001`

---

## Detailed Step-by-Step Summary

### ONCE PER COMPUTER:
1. Install Node.js from https://nodejs.org/
2. Verify: `node --version` shows v20+
3. Install Git (optional): https://git-scm.com/
4. Install VS Code (optional): https://code.visualstudio.com/

### ONCE PER PROJECT:
1. Download project files (ZIP or Git)
2. Open Terminal in project folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Visit: http://localhost:3000

### EVERY TIME YOU WORK:
1. Open Terminal in project folder
2. Run: `npm run dev`
3. Visit: http://localhost:3000
4. Make changes (auto-reload)
5. Stop with: `Ctrl + C`

---

## System Requirements

### Minimum
- RAM: 2 GB
- Storage: 1 GB free (plus node_modules)
- Node.js: v18 or higher
- Internet: For npm install

### Recommended
- RAM: 8 GB
- Storage: 5 GB free
- Node.js: v20 LTS
- SSD: Faster build times

---

## Download Sizes Reference

| Item | Size |
|------|------|
| Node.js installer | ~150 MB |
| node_modules after npm install | ~500 MB |
| Project source code (src/) | ~200 KB |
| Built project (dist/) | ~400 KB |
| **Total for new setup** | ~650 MB |

---

## Helpful Documentation in Your Project

After downloading the project, you'll have:

- **LOCAL_SETUP_GUIDE.md** - Detailed setup instructions
- **QUICKSTART.md** - 5-minute quick start
- **QUICK_REFERENCE.txt** - Command reference card
- **README.md** - Full documentation
- **SEO_GUIDE.md** - Deployment guide
- **MIGRATION_GUIDE.md** - Technical details

---

## You're Ready When:

✅ Node.js installed (`node --version` works)
✅ Project files downloaded
✅ Terminal can navigate to project folder
✅ `npm install` completed successfully
✅ `npm run dev` shows "ready in XXX ms"
✅ Browser shows http://localhost:3000

---

**Once you have all this set up, your EvacuAi system will run locally and you can make any changes you want!**
