import { CheckCircle2 } from 'lucide-react';

import { Container } from '../ui/Container';

const expertise = [
  'Full Stack Engineer',
  'Next.js',
  'NestJS',
  'AWS',
  'Cloud Architecture',
  'TypeScript',
];

const trustSignals = [
  'Available for Freelance',
  'Replies within 24 Hours',
  'Remote Worldwide',
];

export function TrustStrip() {
  return (
    <section className="border-border bg-surface/40 border-y backdrop-blur-sm">
      <Container>
        <div className="flex flex-col gap-6 py-6">
          {/* Expertise */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {expertise.map(item => (
              <div
                key={item}
                className="text-text-muted flex items-center gap-2 text-sm font-medium tracking-[0.14em] uppercase"
              >
                <span className="bg-border h-1.5 w-1.5 rounded-full" />
                {item}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="bg-border h-px w-full" />

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustSignals.map(item => (
              <div
                key={item}
                className="text-text-secondary flex items-center gap-2 text-sm"
              >
                <CheckCircle2 className="text-accent-primary h-4 w-4" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
