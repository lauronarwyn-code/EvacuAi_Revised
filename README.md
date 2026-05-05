# EvacuAi - Real-Time Evacuation System for Cebu City

EvacuAi is a modern, fully searchable web application that provides real-time evacuation site mapping, capacity monitoring, and risk reporting for Cebu City, Philippines. Built with React.js, Vite, and TypeScript with comprehensive SEO optimization.

## Features

- **Interactive 3D Map**: Explore evacuation centers with a rotating, animated 3D map using Three.js
- **Real-Time Status Monitoring**: View live capacity information and risk levels for all centers
- **Admin Dashboard**: Comprehensive management tools for emergency coordinators
- **Risk Reporting**: Report and update evacuation center status in real-time
- **Mobile Responsive**: Fully optimized for all devices and screen sizes
- **SEO Optimized**: Structured data, meta tags, sitemaps, and search engine optimization

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **SEO**: React Helmet Async with JSON-LD
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React

## SEO Features

### Meta Tags & Open Graph
- Dynamic meta tags for all pages
- Open Graph support for social media sharing
- Twitter Card integration
- Canonical URLs

### Structured Data
- Organization schema (JSON-LD)
- Service schema for evacuation services
- Local business schema with Cebu City coordinates
- Map schema with geographic information

### Sitemaps
- Main sitemap (`/public/sitemap.xml`)
- Evacuation centers sitemap (`/public/sitemap-centers.xml`)
- Robots.txt with crawl rules

### Additional SEO
- Robots.txt with proper directives
- .htaccess for Apache servers with security headers
- Geo-location tags for Cebu City (10.3157°N, 123.8854°E)
- Mobile-first responsive design
- Fast loading with Vite optimization

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/evacuai.git
cd evacuai

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── main.tsx              # React entry point
├── App.tsx               # Main app component with routing
├── pages/
│   ├── home.tsx         # Homepage with hero and features
│   ├── map.tsx          # Interactive 3D evacuation map
│   └── dashboard.tsx    # Admin dashboard
├── components/
│   ├── header.tsx       # Navigation header
│   ├── cebu-3d-map.tsx  # 3D map component
│   ├── evacuation-center-card.tsx
│   ├── report-status-modal.tsx
│   ├── occupancy-chart.tsx
│   └── meta-tags.tsx    # SEO meta tags component
├── lib/
│   ├── evacuation-data.ts    # Evacuation center data
│   ├── seo.ts           # SEO configuration
│   └── utils.ts
├── globals.css          # Global styles and animations
└── App.css
```

## Available Routes

- `/` - Homepage with system overview
- `/map` - Interactive 3D evacuation map with real-time data
- `/dashboard` - Admin dashboard for managing centers

## Evacuation Centers

The system includes 10 active evacuation centers in Cebu City:

1. Cebu Capitol (Safe) - Barangay Mabolo
2. Plaza Independencia (Moderate) - Barangay Punta Princesa
3. SM City North (High Risk) - Barangay Lahug
4. CIC Gymnasium (Safe) - Barangay Carbonero
5. North Reclamation Area (Moderate) - North Reclamation
6. South Reclamation Area (High Risk) - South Reclamation
7. Benches Complex (Safe) - Barangay San Fernando
8. Camp Dangwa (Flooded) - Barangay Pardo
9. RabGov Complex (Moderate) - Barangay Babag
10. Waterfront Cebu (Safe) - Barangay Basak

Each center includes:
- Real-time capacity monitoring
- Risk level assessment
- Contact information
- Facility amenities
- Location coordinates

## Search Engine Optimization

### Google Search Integration
- Fully indexed and searchable
- Structured data for rich snippets
- Mobile-friendly design
- Fast page load times

### Search Keywords
The system is optimized for:
- "evacuation centers Cebu"
- "emergency response Cebu City"
- "disaster management Philippines"
- "real-time evacuation mapping"
- "safe zones Cebu"

### Submission
To ensure maximum visibility:

1. **Google Search Console**: Submit sitemap at https://search.google.com/search-console
2. **Bing Webmaster Tools**: Submit at https://www.bing.com/webmasters
3. **Social Media**: Share on Facebook and Twitter

## Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel deploy
```

### Other Platforms
The application can be deployed to any static hosting:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Performance Optimization

- Vite for ultra-fast builds
- Code splitting and lazy loading
- Image optimization
- Gzip compression
- Caching headers
- Tree shaking for smaller bundles

## Environment Variables

Create a `.env` file (optional for development):
```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=EvacuAi
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Contact & Support

- Website: https://evacuai.vercel.app
- Emergency Hotline: 911
- Cebu City Disaster Management: +63 32 412 0000

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## Citation

If you use EvacuAi in research or publications, please cite:

```bibtex
@software{evacuai2024,
  author = {EvacuAi Team},
  title = {EvacuAi: Real-Time Evacuation System for Cebu City},
  year = {2024},
  url = {https://evacuai.vercel.app}
}
```

## Future Roadmap

- [ ] Mobile native apps (iOS/Android)
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Integration with emergency services APIs
- [ ] Offline mode support
- [ ] AR visualization

---

Built with ❤️ for the safety of Cebu City residents.
