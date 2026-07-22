import { Helmet } from 'react-helmet-async';

import { siteConfig } from '#/config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

function resolveUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const base = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}

function buildTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return siteConfig.title;
  }

  if (pageTitle === siteConfig.siteName || pageTitle === siteConfig.title) {
    return siteConfig.title;
  }

  return `${pageTitle} | ${siteConfig.siteName}`;
}

function buildStructuredData() {
  const logoUrl = resolveUrl('/android-chrome-512x512.png');
  const sameAs = [siteConfig.github, siteConfig.linkedin];

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: 'Full Stack Engineer',
    sameAs,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.url,
    logo: logoUrl,
    email: siteConfig.email,
    sameAs,
  };

  return { person, website, organization };
}

export function SEO({
  title,
  description,
  image,
  url,
  type,
  keywords,
}: SEOProps = {}) {
  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedUrl = resolveUrl(url ?? '/');
  const resolvedImage = resolveUrl(image ?? '/og-image.png');
  const resolvedTwitterImage = resolveUrl(image ?? '/twitter-image.png');
  const resolvedType = type ?? siteConfig.openGraph.type;
  const resolvedKeywords = (keywords ?? siteConfig.keywords).join(', ');
  const { person, website, organization } = buildStructuredData();

  return (
    <Helmet>
      <html lang={siteConfig.language} />

      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
      <meta name="author" content={siteConfig.author} />
      <meta name="theme-color" content={siteConfig.themeColor} />
      <meta name="robots" content={siteConfig.robots} />

      <link rel="canonical" href={resolvedUrl} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={resolvedType} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:site_name" content={siteConfig.openGraph.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:image" content={resolvedImage} />
      <meta
        property="og:image:width"
        content={String(siteConfig.openGraph.imageWidth)}
      />
      <meta
        property="og:image:height"
        content={String(siteConfig.openGraph.imageHeight)}
      />

      <meta name="twitter:card" content={siteConfig.twitter.card} />
      <meta name="twitter:site" content={siteConfig.twitter.site} />
      <meta name="twitter:creator" content={siteConfig.twitter.creator} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedTwitterImage} />

      <script type="application/ld+json">{JSON.stringify(person)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
    </Helmet>
  );
}
