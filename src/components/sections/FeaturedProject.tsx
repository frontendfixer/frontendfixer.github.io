import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { CheckCircle2, Lock, Rocket, Server } from 'lucide-react';

import vaultDashboard1 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-0.webp';
import vaultDashboard2 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-1.webp';
import vaultDashboard5 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-2.webp';
import vaultDashboard3 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-4.webp';
import vaultDashboard4 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-5.webp';
import vaultDashboard6 from '#/assets/images/portfolio/featured-project/vaultdrive-dashboard-6.webp';
import { ProjectGallery } from '#/components/project-gallery';
import { LinkButton } from '#/components/ui/LinkButton';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const highlights = [
  {
    icon: Lock,
    title: 'Secure',
    value: 'RBAC & ABAC',
  },
  {
    icon: Rocket,
    title: 'Scalable',
    value: 'AWS Lambda + SQS',
  },
  {
    icon: Server,
    title: 'Cloud Native',
    value: 'AWS S3 + Cloudflare R2',
  },
];

const features = [
  'Multi Bucket Storage',
  'Frontend Presigned Uploads',
  'Background Workers',
  'Thumbnail Processing',
];

const technologies = [
  'TanStack Start',
  'NestJS',
  'AWS',
  'Lambda',
  'Cloudflare R2',
  'Prisma',
  'Docker',
  'PostgreSQL',
  'Redis',
];

export function FeaturedProject() {
  return (
    <Section id="featured-project">
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="text-accent-primary border-border bg-surface mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase">
            <span className="bg-accent-primary h-2 w-2 rounded-full" />
            Featured Project
          </div>

          <h2 className="text-4xl font-bold md:text-5xl">VaultDrive</h2>

          <p className="text-text-secondary mt-5 text-lg leading-8">
            Enterprise cloud storage platform built for secure file management,
            scalable uploads, and modern cloud infrastructure.
          </p>
        </div>
      </Reveal>

      <div className="grid items-center gap-16 lg:grid-cols-12">
        {/* Screenshot */}
        <Reveal className="lg:col-span-6">
          <ProjectGallery
            title="VaultDrive"
            images={[
              { src: vaultDashboard1, alt: 'VaultDrive dashboard' },
              {
                src: vaultDashboard2,
                alt: 'VaultDrive category wise dashboard',
              },
              { src: vaultDashboard3, alt: 'VaultDrive fils & folders' },
              { src: vaultDashboard4, alt: 'VaultDrive fils & folders' },
              {
                src: vaultDashboard5,
                alt: 'VaultDrive profile monthly activity',
              },
              { src: vaultDashboard6, alt: 'VaultDrive user cloud onboarding' },
            ]}
          />
        </Reveal>

        {/* Content */}
        <div className="space-y-8 lg:col-span-6">
          {/* Highlight Cards */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {highlights.map(item => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="border-border bg-surface rounded-2xl border p-5"
                  >
                    <Icon className="text-accent-primary mb-4 h-5 w-5" />

                    <h3 className="mb-1 font-semibold">{item.title}</h3>

                    <p className="text-text-secondary text-sm">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Feature List */}
          <Reveal delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent-primary h-5 w-5 shrink-0" />

                  <span className="text-text-secondary text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Technology */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => (
                <span
                  key={tech}
                  className="border-border bg-surface text-text-muted rounded-full border px-3 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.4}>
            <LinkButton
              variant="primary"
              href="https://drive.vaultdrive.app"
              icon={faExternalLink}
              label="Explore VaultDrive"
              className="gap-2"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
