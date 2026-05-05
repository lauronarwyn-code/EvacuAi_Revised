export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  image?: string
  url: string
  type?: 'website' | 'article' | 'business.business'
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: 'EvacuAi - Real-Time Evacuation Site Mapping for Cebu City',
    description: 'EvacuAi provides real-time evacuation site mapping, capacity monitoring, and risk reporting for Cebu City, Philippines. Find safe evacuation centers with live updates and interactive 3D maps.',
    keywords: 'evacuation centers, Cebu City, Philippines, emergency response, disaster management, real-time mapping, safety',
    url: 'https://evacuai.vercel.app/',
    type: 'website'
  },
  map: {
    title: 'Interactive Evacuation Map - EvacuAi | Cebu City',
    description: 'Interactive 3D map of evacuation centers in Cebu City with real-time status, capacity information, and location details for emergency response.',
    keywords: 'Cebu evacuation map, emergency centers, real-time mapping, Cebu disaster response',
    url: 'https://evacuai.vercel.app/map',
    type: 'website'
  },
  dashboard: {
    title: 'Admin Dashboard - EvacuAi | Evacuation Center Management',
    description: 'Admin dashboard for managing evacuation centers in Cebu City. Monitor real-time capacity, risk levels, and system status.',
    keywords: 'evacuation management, Cebu admin, emergency coordination, real-time monitoring',
    url: 'https://evacuai.vercel.app/dashboard',
    type: 'website'
  }
}

export const generateJsonLd = (schema: any) => {
  return JSON.stringify(schema)
}

export const generateSitemapXml = (urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: number }>) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>
  `).join('')}
</urlset>`
  return xml
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EvacuAi",
  "url": "https://evacuai.vercel.app/",
  "description": "Real-time evacuation site mapping and reporting system for Cebu City, Philippines",
  "logo": "https://evacuai.vercel.app/logo.png",
  "sameAs": [
    "https://www.facebook.com/evacuai",
    "https://twitter.com/evacuai"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cebu City",
    "addressRegion": "Cebu",
    "addressCountry": "PH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+63-32-412-0000",
    "areaServed": "PH"
  }
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Evacuation Center Mapping Service",
  "provider": {
    "@type": "Organization",
    "name": "EvacuAi"
  },
  "serviceType": "Emergency Response",
  "areaServed": {
    "@type": "City",
    "name": "Cebu City"
  },
  "description": "Real-time mapping and status reporting for evacuation centers"
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EvacuAi",
  "description": "Emergency Response and Disaster Management System",
  "areaServed": {
    "@type": "City",
    "name": "Cebu City",
    "addressCountry": "PH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.3157",
    "longitude": "123.8854"
  }
}
