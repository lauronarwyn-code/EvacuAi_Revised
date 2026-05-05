import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title: string
  description: string
  keywords?: string
  imageUrl?: string
  url: string
  type?: 'website' | 'article' | 'business.business'
  author?: string
  jsonLd?: any
}

export const MetaTags = ({
  title,
  description,
  keywords,
  imageUrl,
  url,
  type = 'website',
  author,
  jsonLd
}: MetaTagsProps) => {
  const fullImageUrl = imageUrl || 'https://evacuai.vercel.app/og-image.png'

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="EvacuAi" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />

      {/* Geo Tags */}
      <meta name="geo.region" content="PH-CE" />
      <meta name="geo.placename" content="Cebu City" />
      <meta name="ICBM" content="10.3157, 123.8854" />

      {/* Mobile */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#5B7E3C" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
