import { SOCIALS_USERNAME } from '#config/social.ts';

export interface OpenGraphConfig {
  type: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
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

const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://frontendfixer.dev';

export const siteConfig: SiteConfig = {
  siteName: 'FrontendFixer',
  title: 'FrontendFixer | Full-Stack Developer for SaaS & MVPs',
  description:
    'I help startups and growing businesses design, build, and scale secure cloud-native SaaS products using React, NestJS, AWS, and modern backend architecture.',
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
    'SaaS developer',
    'MVP development',
    'React developer',
    'NestJS',
    'TypeScript',
    'AWS',
    'freelance developer',
    'cloud-native applications',
    'FrontendFixer',
  ],
  twitter: {
    card: 'summary_large_image',
    site: '@' + SOCIALS_USERNAME.twitter,
    creator: '@' + SOCIALS_USERNAME.twitter,
    image: '/twitter-image.png',
  },
  openGraph: {
    type: 'website',
    image: '/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    siteName: 'FrontendFixer',
  },
  robots: 'index, follow',
};
