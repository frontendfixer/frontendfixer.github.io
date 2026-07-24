import { siteConfig } from '#/config/site';

export interface SEOOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

export function resolveUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const base = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${normalizedPath}`;
}

export function buildTitle(pageTitle?: string): string {
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

export function buildSeoHead(options: SEOOptions = {}) {
  const resolvedTitle = buildTitle(options.title);
  const resolvedDescription = options.description ?? siteConfig.description;
  const resolvedUrl = resolveUrl(options.url ?? '/');
  const resolvedImage = resolveUrl(options.image ?? '/og-image.png');
  const resolvedTwitterImage = resolveUrl(
    options.image ?? '/twitter-image.png',
  );
  const resolvedType = options.type ?? siteConfig.openGraph.type;
  const resolvedKeywords = (options.keywords ?? siteConfig.keywords).join(', ');
  const { person, website, organization } = buildStructuredData();

  return {
    meta: [
      { title: resolvedTitle },
      { name: 'description', content: resolvedDescription },
      { name: 'keywords', content: resolvedKeywords },
      { name: 'author', content: siteConfig.author },
      { name: 'theme-color', content: siteConfig.themeColor },
      { name: 'robots', content: siteConfig.robots },
      { property: 'og:title', content: resolvedTitle },
      { property: 'og:description', content: resolvedDescription },
      { property: 'og:type', content: resolvedType },
      { property: 'og:url', content: resolvedUrl },
      { property: 'og:site_name', content: siteConfig.openGraph.siteName },
      { property: 'og:locale', content: siteConfig.locale },
      { property: 'og:image', content: resolvedImage },
      {
        property: 'og:image:width',
        content: String(siteConfig.openGraph.imageWidth),
      },
      {
        property: 'og:image:height',
        content: String(siteConfig.openGraph.imageHeight),
      },
      { name: 'twitter:card', content: siteConfig.twitter.card },
      { name: 'twitter:site', content: siteConfig.twitter.site },
      { name: 'twitter:creator', content: siteConfig.twitter.creator },
      { name: 'twitter:title', content: resolvedTitle },
      { name: 'twitter:description', content: resolvedDescription },
      { name: 'twitter:image', content: resolvedTwitterImage },
    ],
    links: [{ rel: 'canonical', href: resolvedUrl }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(person),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(website),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(organization),
      },
    ],
  };
}
