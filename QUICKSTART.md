# EvacuAi - Quick Start Guide

Get EvacuAi running in minutes!

## 🚀 5-Minute Setup

### 1. Prerequisites
```bash
# Check Node.js version (needs 18+)
node --version

# Install pnpm if not already installed
npm install -g pnpm
```

### 2. Install & Run
```bash
# Navigate to project directory
cd evacuai

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

**That's it!** 🎉

The app will open automatically at `http://localhost:3000`

---

## 🗺️ What You'll See

### Homepage (`/`)
- Hero section with call-to-action buttons
- System overview with statistics
- Key features showcase
- Emergency contact information

### Map Page (`/map`)
- **3D Interactive Map**: Rotating visualization of Cebu City
- **Evacuation Centers**: 10 marked locations with color-coded risk levels
- **Center Details**: Click any center to see capacity, contact info, amenities
- **Status Reporting**: Report center status with risk level

### Dashboard (`/dashboard`)
- **Real-time Statistics**: Total centers, occupancy, high-risk areas
- **Centers Table**: Filterable list of all evacuation centers
- **Risk Distribution**: Visual breakdown by risk level
- **System Status**: API status and uptime information

---

## 🎨 Color Palette

The app uses this beautiful color scheme:

- **Primary Green**: `#5B7E3C` - Safe areas, primary actions
- **Secondary Green**: `#A2CB8B` - Moderate risk, secondary buttons
- **Light Green**: `#E8F5BD` - Highlights, backgrounds
- **Red**: `#C44545` - High risk, alerts
- **Dark**: `#080616` - Text, dark elements

---

## 🔧 Key Files to Know

```
src/
├── pages/
│   ├── home.tsx          ← Homepage
│   ├── map.tsx           ← 3D Map page
│   └── dashboard.tsx     ← Admin dashboard
├── components/
│   ├── header.tsx        ← Navigation
│   ├── cebu-3d-map.tsx   ← 3D map component
│   └── meta-tags.tsx     ← SEO management
├── lib/
│   ├── evacuation-data.ts ← Center data
│   └── seo.ts            ← SEO config
└── globals.css           ← Styling
```

---

## 📱 Features Overview

### 3D Interactive Map
- Rotate, zoom, pan around Cebu City
- 10 evacuation centers with live status
- Color-coded risk indicators
- Tap/click to view center details

### Real-Time Monitoring
- Live capacity percentages
- Risk level indicators
- Current occupancy count
- System status

### Reporting System
- Report center status (Safe, Moderate, High Risk, Flooded)
- Add notes with each report
- Instant feedback
- Save to system

### Admin Dashboard
- Filterable centers table
- Real-time statistics
- Risk distribution chart
- Quick action buttons

---

## 🌐 SEO Features Built-In

The app is fully optimized for search engines:

✅ **Meta Tags**: Unique titles and descriptions on all pages  
✅ **Sitemaps**: Auto-generated for all content  
✅ **Structured Data**: JSON-LD schemas for Google  
✅ **Mobile Ready**: Responsive design for all devices  
✅ **Fast Loading**: Optimized Vite build  
✅ **Robots.txt**: Search engine crawl instructions  

---

## 🚢 Deployment

### Deploy to Vercel (1 minute)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Build for Production
```bash
# Create optimized build
pnpm build

# Test production build
pnpm preview
```

Output will be in the `dist/` folder.

---

## 📚 Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run linter (if configured)

# Help
pnpm --help           # See all available commands
```

---

## 🔍 Data You Can Edit

### Evacuation Centers
Edit locations, capacity, contact info in:
```typescript
src/lib/evacuation-data.ts
```

**Center Object**:
```typescript
{
  id: "cebu-capitol",
  name: "Cebu Capitol",
  barangay: "Mabolo",
  coordinates: { lat: 10.3158, lng: 123.8854 },
  capacity: 5000,
  currentOccupancy: 2500,
  riskLevel: "safe",
  contact: "+63 32 412 0000",
  amenities: ["Water", "Food", "Medical", "Shelter"],
  type: "government-building"
}
```

### Styling
Edit colors and animations in:
```css
src/globals.css
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
pnpm dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Can't Find Component
Make sure import path uses `@/` alias:
```typescript
// ✅ Correct
import Header from '@/components/header'

// ❌ Wrong
import Header from './components/header'
```

---

## 📖 Documentation

- **README.md** - Full project documentation
- **SEO_GUIDE.md** - SEO implementation details
- **MIGRATION_GUIDE.md** - React.js migration info
- **IMPLEMENTATION_SUMMARY.md** - Complete overview

---

## 🔗 Quick Links

- **Live App**: https://evacuai.vercel.app
- **GitHub**: https://github.com/yourusername/evacuai
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com

---

## 💡 Tips & Tricks

### Hot Reload
Changes to files automatically reload in the browser - no manual refresh needed!

### DevTools
- Press `F12` to open Chrome DevTools
- Use React DevTools to inspect components
- Check Console for any errors

### 3D Map Controls
- **Scroll** to zoom in/out
- **Click & drag** to rotate
- **Right-click & drag** (or two-finger on trackpad) to pan

### Responsive Testing
Press `F12` → Click device icon → Select mobile device to test responsiveness

---

## 🎯 What's Next?

After setup, try:

1. **Explore the Map**
   - View all 10 evacuation centers
   - Click on markers to see details
   - Try the reporting feature

2. **Check the Dashboard**
   - Filter centers by risk level
   - Review statistics and occupancy
   - Try the quick action buttons

3. **Review SEO**
   - Right-click page → "View Page Source"
   - Search for meta tags and structured data
   - Check robots.txt and sitemaps in `/public`

4. **Customize**
   - Change colors in `globals.css`
   - Update center data in `evacuation-data.ts`
   - Modify text in page components

---

## ❓ FAQ

**Q: Can I run this offline?**
A: Yes, after `pnpm build`, you can serve the `dist/` folder locally with any static server.

**Q: How do I add more evacuation centers?**
A: Edit the `EVACUATION_CENTERS` array in `src/lib/evacuation-data.ts`

**Q: Can I use different colors?**
A: Yes! Update the Tailwind color palette in `src/globals.css`

**Q: Is the 3D map performance good?**
A: Yes! Optimized Three.js rendering with 60 FPS on modern devices.

**Q: How do I deploy to production?**
A: Run `pnpm build` and deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 📞 Support

For issues or questions:
1. Check the main `README.md`
2. Review the `SEO_GUIDE.md` for SEO topics
3. Read `MIGRATION_GUIDE.md` for React/Vite questions
4. Check the documentation files for detailed info

---

## ✨ You're All Set!

Your EvacuAi evacuation system is ready to use! 

Visit `http://localhost:3000` and start exploring! 🚀

---

**Happy coding!** 💚
