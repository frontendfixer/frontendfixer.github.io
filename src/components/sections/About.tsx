import { ArrowUpRight, BriefcaseBusiness, Cloud, Code2 } from 'lucide-react';

import profilePlaceholder from '#/assets/images/portfolio/profile-placeholder.webp';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const strengths = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Modern React, TypeScript, NestJS and scalable APIs.',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description:
      'AWS, serverless workloads, storage and backend infrastructure.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Product Engineering',
    description: 'Building SaaS products from MVP to production.',
  },
];

export function About() {
  return (
    <Section
      id="about"
      className="border-border bg-surface/20 overflow-hidden border-y"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[420px_1fr]">
        {/* Image */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="glass-panel overflow-hidden rounded-3xl">
              <img
                src={profilePlaceholder}
                alt="Profile placeholder"
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="glass-panel absolute -right-5 -bottom-5 rounded-2xl px-5 py-4">
              <div className="text-accent-primary text-lg font-semibold">
                Available
              </div>

              <div className="text-text-muted text-sm">
                For Freelance Projects
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal>
            <div className="text-accent-primary mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
              About Me
            </div>

            <h2 className="max-w-3xl text-4xl leading-tight font-bold md:text-5xl">
              Building modern SaaS products with
              <span className="text-accent-primary">
                {' '}
                scalable architecture
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-text-secondary mt-8 max-w-3xl text-lg leading-8">
              I'm Lakshmikanta Patra, a Full Stack Engineer focused on building
              secure, scalable SaaS applications with React, NestJS, TypeScript,
              and AWS.
            </p>

            <p className="text-text-secondary mt-6 max-w-3xl text-lg leading-8">
              I enjoy solving backend architecture challenges, designing
              cloud-native systems, and creating clean user experiences that are
              fast, maintainable, and built for long-term growth.
            </p>
          </Reveal>

          {/* Strengths */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {strengths.map(item => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="border-border bg-surface rounded-2xl border p-6"
                  >
                    <Icon className="text-accent-primary mb-4 h-6 w-6" />

                    <h3 className="mb-2 font-semibold">{item.title}</h3>

                    <p className="text-text-secondary text-sm leading-6">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.2}>
            <a
              href="#contact"
              className="text-accent-primary mt-10 inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
            >
              Let's build something great together
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
