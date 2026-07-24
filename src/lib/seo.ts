import { siteConfig } from '#config/site';

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

type LinkTag = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
};

type ScriptTag = {
  type: string;
  children: string;
};

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

/**
 * Structured data (JSON-LD) rendered on every page through the root route so
 * crawlers always receive Person / WebSite / Organization schema.
 */
export function buildStructuredDataScripts(): ScriptTag[] {
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

  return [person, website, organization].map(data => ({
    type: 'application/ld+json',
    children: JSON.stringify(data),
  }));
}

/**
 * Builds the per-route document head (title, description, Open Graph, Twitter
 * card and canonical link) that TanStack Start renders on the server for full
 * SEO support.
 */
export function seo(options: SeoOptions = {}): {
  meta: MetaTag[];
  links: LinkTag[];
} {
  const { title, description, image, imageAlt, url, type, keywords } = options;

  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedUrl = resolveUrl(url ?? '/');
  const resolvedImage = resolveUrl(image ?? '/og-image.png');
  const resolvedTwitterImage = resolveUrl(image ?? '/twitter-image.png');
  const resolvedImageAlt = imageAlt ?? siteConfig.openGraph.imageAlt;
  const resolvedType = type ?? siteConfig.openGraph.type;
  const resolvedKeywords = (keywords ?? siteConfig.keywords).join(', ');

  const meta: MetaTag[] = [
    { title: resolvedTitle },
    { name: 'description', content: resolvedDescription },
    { name: 'keywords', content: resolvedKeywords },
    { name: 'author', content: siteConfig.author },
    { name: 'robots', content: siteConfig.robots },

    { property: 'og:title', content: resolvedTitle },
    { property: 'og:description', content: resolvedDescription },
    { property: 'og:type', content: resolvedType },
    { property: 'og:url', content: resolvedUrl },
    { property: 'og:site_name', content: siteConfig.openGraph.siteName },
    { property: 'og:locale', content: siteConfig.locale },
    { property: 'og:image', content: resolvedImage },
    { property: 'og:image:secure_url', content: resolvedImage },
    { property: 'og:image:type', content: siteConfig.openGraph.imageType },
    {
      property: 'og:image:width',
      content: String(siteConfig.openGraph.imageWidth),
    },
    {
      property: 'og:image:height',
      content: String(siteConfig.openGraph.imageHeight),
    },
    { property: 'og:image:alt', content: resolvedImageAlt },

    { name: 'twitter:card', content: siteConfig.twitter.card },
    { name: 'twitter:site', content: siteConfig.twitter.site },
    { name: 'twitter:creator', content: siteConfig.twitter.creator },
    { name: 'twitter:title', content: resolvedTitle },
    { name: 'twitter:description', content: resolvedDescription },
    { name: 'twitter:image', content: resolvedTwitterImage },
    { name: 'twitter:image:alt', content: resolvedImageAlt },
  ];

  const links: LinkTag[] = [{ rel: 'canonical', href: resolvedUrl }];

  return { meta, links };
}
