import type { MetaDescriptor } from '@tanstack/react-router';

import { siteConfig } from '#config/site';

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

export function buildSeoHead({
  title,
  description,
  image,
  url,
  type,
  keywords,
}: SEOOptions = {}) {
  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedUrl = resolveUrl(url ?? '/');
  const resolvedImage = resolveUrl(image ?? siteConfig.openGraph.image);
  const resolvedTwitterImage = resolveUrl(image ?? siteConfig.twitter.image);
  const resolvedType = type ?? siteConfig.openGraph.type;
  const resolvedKeywords = (keywords ?? siteConfig.keywords).join(', ');
  const { person, website, organization } = buildStructuredData();

  const meta = [
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
    { 'script:ld+json': person },
    { 'script:ld+json': website },
    { 'script:ld+json': organization },
  ] satisfies MetaDescriptor[];

  return {
    meta,
    links: [{ rel: 'canonical', href: resolvedUrl }],
  };
}
