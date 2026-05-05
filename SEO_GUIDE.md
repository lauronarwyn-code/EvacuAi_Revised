# SEO Implementation Guide for EvacuAi

This document outlines the comprehensive SEO strategy implemented in EvacuAi to ensure maximum visibility in search engines and social media platforms.

## Table of Contents
1. [Technical SEO](#technical-seo)
2. [On-Page SEO](#on-page-seo)
3. [Structured Data](#structured-data)
4. [Search Engine Submission](#search-engine-submission)
5. [Performance & Core Web Vitals](#performance--core-web-vitals)
6. [Monitoring & Analytics](#monitoring--analytics)

## Technical SEO

### 1. Site Architecture
- Clean, hierarchical URL structure
- Semantic HTML5 markup
- Proper heading hierarchy (H1, H2, H3)
- Mobile-first responsive design
- Fast page load times (< 3 seconds)

### 2. Meta Tags Implementation
All pages include:
- **Title Tags**: Unique, keyword-rich, 50-60 characters
- **Meta Descriptions**: Compelling, 150-160 characters
- **Canonical URLs**: Prevent duplicate content issues
- **Viewport Meta Tag**: Mobile optimization
- **Language Meta Tag**: Content language specification

### 3. Robots & Crawling
- `/public/robots.txt`: Search engine directives
  - Allows all pages for indexing
  - Blocks private admin areas
  - Sitemap references
  - Crawl delay specifications

- `.htaccess`: Apache server configuration
  - URL rewriting for clean URLs
  - Caching headers for assets
  - GZIP compression
  - Security headers

### 4. Sitemaps
Two sitemaps for comprehensive coverage:

**Main Sitemap** (`/public/sitemap.xml`)
- Homepage
- Interactive Map page
- Admin Dashboard

**Centers Sitemap** (`/public/sitemap-centers.xml`)
- 10 evacuation center pages
- Weekly update frequency
- Dynamic URLs

## On-Page SEO

### 1. Page Titles & Meta Descriptions

**Homepage**
- Title: "EvacuAi - Real-Time Evacuation Site Mapping for Cebu City"
- Description: Includes key benefits and location

**Map Page**
- Title: "Interactive Evacuation Map - EvacuAi | Cebu City"
- Description: Highlights 3D mapping and real-time features

**Dashboard Page**
- Title: "Admin Dashboard - EvacuAi | Evacuation Center Management"
- Description: Emphasizes management tools

### 2. Heading Structure
```html
<h1>Real-time Evacuation Response System</h1>  <!-- One per page -->
<h2>System Overview</h2>
<h2>Key Features</h2>
<h3>3D Interactive Map</h3>
<h3>Risk Monitoring</h3>
```

### 3. Content Optimization
- Keyword-rich content (3-5% density)
- Natural language and readability
- Short paragraphs (2-3 sentences)
- Bulleted lists for scannability
- Internal linking strategy
- Image alt text for all images

### 4. Keywords
**Primary Keywords**:
- evacuation centers Cebu
- emergency response system
- disaster management
- real-time mapping

**Long-tail Keywords**:
- "evacuation centers in Cebu City"
- "emergency response Cebu Philippines"
- "disaster management system"
- "real-time evacuation mapping"

## Structured Data

### 1. JSON-LD Schema
Implemented schemas for enhanced search results:

**Organization Schema** (`/src/lib/seo.ts`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EvacuAi",
  "description": "Real-time evacuation system",
  "address": {
    "addressLocality": "Cebu City",
    "addressCountry": "PH"
  }
}
```

**Service Schema**
```json
{
  "@type": "Service",
  "name": "Evacuation Center Mapping",
  "serviceType": "Emergency Response",
  "areaServed": "Cebu City"
}
```

**LocalBusiness Schema**
- Includes geographical coordinates
- Service area information
- Contact details

### 2. Microdata Implementation
- Breadcrumb navigation (for future implementation)
- Review ratings (for future implementation)
- Event schema (for emergency alerts)

### 3. Meta Tags for Social Sharing
**Open Graph Tags**:
- og:type, og:url, og:title, og:description
- og:image (1200x630px), og:site_name

**Twitter Card Tags**:
- twitter:card, twitter:title, twitter:description
- twitter:image, twitter:url

**Geo Tags**:
- geo.region: PH-CE
- geo.placename: Cebu City
- ICBM coordinates: 10.3157, 123.8854

## Search Engine Submission

### 1. Google Search Console
**Steps**:
1. Go to https://search.google.com/search-console
2. Add property: https://evacuai.vercel.app
3. Verify ownership (DNS, HTML tag, or Google Analytics)
4. Submit sitemap: `/sitemap.xml`
5. Monitor Performance, Coverage, Enhancements

**Monitoring**:
- Track search impressions and clicks
- Check crawl errors
- Monitor Core Web Vitals
- Review rich results eligibility

### 2. Bing Webmaster Tools
1. https://www.bing.com/webmasters
2. Add and verify site
3. Submit sitemap
4. Monitor search traffic

### 3. Other Search Engines
- **Yandex**: https://webmaster.yandex.com
- **Baidu**: https://zhanzhang.baidu.com (for Chinese users)

### 4. Directory Submission
- Google My Business (local business listing)
- Apple Maps
- Waze
- Local Philippine business directories

## Performance & Core Web Vitals

### 1. Page Speed Optimization

**Vite Optimizations**:
- Code splitting
- Lazy loading
- Tree shaking
- Minification
- Asset optimization

**Runtime Optimization**:
- React.lazy() for route splitting
- Image optimization
- Caching strategies
- CDN usage (Vercel)

### 2. Core Web Vitals

**Largest Contentful Paint (LCP)**
- Target: < 2.5 seconds
- Optimize: Images, critical CSS, JavaScript

**First Input Delay (FID)**
- Target: < 100ms
- Optimize: JavaScript execution, main thread blocking

**Cumulative Layout Shift (CLS)**
- Target: < 0.1
- Avoid: Unsized images, fonts, layout shifts

### 3. Performance Testing Tools
- Google PageSpeed Insights
- GTmetrix
- Lighthouse
- WebPageTest

## Monitoring & Analytics

### 1. Google Analytics 4 Setup
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Conversion Tracking
- Emergency report submissions
- Map interactions
- Dashboard access
- Feature usage

### 3. Monthly SEO Audit Checklist

- [ ] Search Console: Check coverage and indexing
- [ ] PageSpeed Insights: Verify Core Web Vitals
- [ ] Backlinks: Monitor new links
- [ ] Rankings: Track keyword positions
- [ ] Traffic: Review analytics trends
- [ ] Crawlability: Check for robots.txt issues
- [ ] Mobile: Test responsive design
- [ ] Schema: Validate structured data

### 4. Key Metrics to Monitor

**Traffic Metrics**:
- Organic sessions
- Bounce rate
- Average session duration
- Pages per session

**Search Metrics**:
- Impressions
- Clicks
- Click-through rate (CTR)
- Average position

**Technical Metrics**:
- Core Web Vitals scores
- Mobile usability issues
- Crawl statistics
- Security issues

## Maintenance Schedule

### Weekly
- Monitor Google Search Console alerts
- Check for crawl errors
- Review analytics trends

### Monthly
- Full SEO audit
- Competitor analysis
- Keyword performance review
- Backlink analysis

### Quarterly
- Technical SEO review
- Content refresh planning
- Schema validation
- Performance benchmarking

## Competitor Analysis

### Comparable Systems
- PhilHealth Emergency Response System
- NDRRMC (National Disaster Risk Reduction Management Council)
- Local Government Unit Information Systems
- Emergency Alert Systems

### Keywords to Target
- Emergency response + location
- Disaster management + technology
- Real-time + evacuation
- Safety + mapping

## Link Building Strategy

### Internal Links
- Link to map from homepage
- Link to dashboard from features
- Link evacuation centers from map
- Cross-reference emergency contacts

### External Links
- Government websites
- News organizations
- Emergency management agencies
- Non-profit organizations

## Content Marketing

### Blog Topics (Future)
- Evacuation preparedness guide
- Disaster management best practices
- Technology in emergency response
- Cebu City emergency history

### Press Releases
- System launch announcement
- New features
- Success stories
- Emergency alerts

## Local SEO

### Google My Business
- Business name, address, phone
- Category: Emergency Services
- Opening hours: 24/7
- Photos and videos
- Regular posts

### Local Citations
- Cebu Chamber of Commerce
- Local business directories
- Gov.ph websites
- Regional listings

## Accessibility & Compliance

### WCAG 2.1 AA Compliance
- Color contrast ratios
- Keyboard navigation
- Screen reader support
- Alt text for images
- Semantic HTML

### GDPR/Privacy
- Privacy policy
- Terms of service
- Cookie consent
- Data protection

## Troubleshooting Common Issues

### Pages Not Indexed
- Check robots.txt
- Verify in GSC
- Submit sitemap
- Check for noindex tags

### Low CTR in Search Results
- Improve title tags
- Enhance meta descriptions
- Add schema markup
- Create compelling copy

### High Bounce Rate
- Improve page speed
- Better content quality
- Clear call-to-action
- Mobile optimization

## Resources

- Google SEO Starter Guide
- Schema.org Documentation
- Moz SEO Learning Center
- Search Engine Journal
- Neil Patel SEO Blog

## Support & Contact

For SEO-related questions or issues, contact the development team or file an issue on GitHub.

---

Last Updated: April 24, 2024
Version: 1.0
