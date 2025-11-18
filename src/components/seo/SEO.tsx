/**
 * SEO Component
 * Manages meta tags for better search engine optimization
 */

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export function SEO({
  title = 'PW Pattaya Real Estate - Properties for Sale & Rent in Pattaya',
  description = 'Find your dream property in Pattaya, Thailand. Browse luxury condos, villas, houses, and land for sale or rent. Expert real estate services with multilingual support.',
  keywords = 'Pattaya real estate, property for sale Pattaya, condo Pattaya, villa Pattaya, house for rent Pattaya, Thailand property, Jomtien property, Wongamat real estate',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
}: SEOProps) {
  const siteName = 'PW Pattaya Real Estate';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pw-pattaya.com';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PW Pattaya Real Estate" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical ? `${siteUrl}${canonical}` : siteUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:locale:alternate" content="th_TH" />
      <meta property="og:locale:alternate" content="ru_RU" />
      <meta property="og:locale:alternate" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${canonical || ''}`} />
      <link rel="alternate" hrefLang="de" href={`${siteUrl}/de${canonical || ''}`} />
      <link rel="alternate" hrefLang="th" href={`${siteUrl}/th${canonical || ''}`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${canonical || ''}`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${canonical || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${canonical || ''}`} />

      {/* Geo Tags */}
      <meta name="geo.region" content="TH-20" />
      <meta name="geo.placename" content="Pattaya" />
      <meta name="geo.position" content="12.9236;100.8825" />
      <meta name="ICBM" content="12.9236, 100.8825" />

      {/* Additional SEO */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  );
}
