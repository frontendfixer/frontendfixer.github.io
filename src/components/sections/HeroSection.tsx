import { Briefcase } from 'lucide-react';
import { ReactNode } from 'react';

import heroDashboard from '#assets/images/portfolio/hero-dashboard.webp';
import { GlassLaptopPanel } from '#components/GlassLaptopPanel';
import { ContactButton } from '#components/sections/ContactButton';

import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="from-accent-primary to-accent-secondary bg-linear-to-r bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function TrustItem({ children }: { children: ReactNode }) {
  return (
    <div className="text-text-secondary flex items-center gap-2 text-sm">
      <span className="bg-accent-primary h-2 w-2 rounded-full" />
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-20 md:pt-40 md:pb-32"
    >
      {/* Background Glow */}
      <div className="bg-accent-primary/10 pointer-events-none absolute top-0 left-1/2 h-130 w-full max-w-3xl -translate-x-1/2 rounded-full blur-[120px]" />

      <Container>
        <div className="grid items-center gap-8 md:gap-16 lg:grid-cols-[3fr_2fr]">
          <div>
            {/* Availability Badge */}
            <Reveal>
              <div className="border-border bg-surface/70 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur-md md:mb-6 md:py-2 md:text-sm">
                <Briefcase className="text-accent-primary size-3 md:size-4" />
                <span className="text-text-secondary">
                  Available for freelance projects
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.05}>
              <h1 className="max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
                I build production-ready <Accent>SaaS</Accent> platforms
                <br />
                from MVP to <Accent>enterprise-grade</Accent> infrastructure
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.1}>
              <p className="text-text-secondary mt-4 max-w-xl md:mt-8 md:text-xl md:leading-8">
                I help startups and growing businesses design, build, and scale
                secure cloud-native SaaS products using React, NestJS, AWS, and
                modern backend architecture.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-10">
                <ContactButton />

                {/*<a*/}
                {/*  href="#projects"*/}
                {/*  className="border-border hover:bg-surface inline-flex h-14 items-center justify-center rounded-2xl border px-8 text-base font-medium transition-all duration-300 hover:-translate-y-0.5"*/}
                {/*>*/}
                {/*  View Projects*/}
                {/*  <ArrowRight className="ml-2 h-4 w-4" />*/}
                {/*</a>*/}
              </div>
            </Reveal>

            {/* Trust Row */}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustItem>Available for freelance</TrustItem>
                <TrustItem>Remote worldwide</TrustItem>
                <TrustItem>Replies within 24 hours</TrustItem>
              </div>
            </Reveal>
          </div>

          {/* Hero Image */}
          <Reveal delay={0.25} className="lg:justify-self-end">
            <GlassLaptopPanel
              image={heroDashboard}
              alt="Premium SaaS analytics dashboard"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
