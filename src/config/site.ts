import { SOCIALS_USERNAME } from '#/config/social.ts';

export interface OpenGraphConfig {
  type: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  siteName: string;
}

export interface TwitterConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site: string;
  creator: string;
  image: string;
}

export interface SiteConfig {
  siteName: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  language: string;
  author: string;
  email: string;
  github: string;
  linkedin: string;
  themeColor: string;
  backgroundColor: string;
  keywords: string[];
  twitter: TwitterConfig;
  openGraph: OpenGraphConfig;
  robots: string;
}

const DEFAULT_SITE_URL = 'https://frontendfixer.dev';

const siteUrl = import.meta.env.VITE_SITE_URL ?? DEFAULT_SITE_URL;

export const siteConfig: SiteConfig = {
  siteName: 'FrontendFixer',
  title: 'FrontendFixer | SaaS & Cloud-Native Full-Stack Engineer',
  description:
    'I build secure, scalable SaaS products with React, NestJS, TypeScript, AWS, and modern cloud architecture.',
  url: siteUrl,
  locale: 'en_US',
  language: 'en',
  author: 'Lakshmikanta Patra',
  email: SOCIALS_USERNAME.email,
  github: 'https://github.com/' + SOCIALS_USERNAME.GITHUB,
  linkedin: 'https://linkedin.com/in/' + SOCIALS_USERNAME.linkedin,
  themeColor: '#14b8a6',
  backgroundColor: '#09090B',
  keywords: [
    'full stack developer',
    'React',
    'TypeScript',
    'NestJS',
    'Node.js',
    'AWS',
    'Cloudflare',
    'Docker',
    'PostgreSQL',
    'Prisma',
    'SaaS',
    'MVP development',
    'cloud architecture',
    'backend engineer',
    'frontend developer',
    'freelance software engineer',
  ],
  twitter: {
    card: 'summary_large_image',
    site: '@' + SOCIALS_USERNAME.twitter,
    creator: '@' + SOCIALS_USERNAME.twitter,
    image: `${siteUrl}/twitter-image.webp`,
  },
  openGraph: {
    type: 'website',
    image: `${siteUrl}/og-image.webp`,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'FrontendFixer Portfolio',
    siteName: 'FrontendFixer',
  },
  robots: 'index, follow',
};
