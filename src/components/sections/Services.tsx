import { Code2, Cpu, Database } from 'lucide-react';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const services = [
  {
    icon: Code2,
    title: 'SaaS & MVP Development',
    description:
      'End-to-end product builds — from architecture to launch, with REST/GraphQL APIs built on NestJS.',
  },
  {
    icon: Database,
    title: 'Backend & Cloud Architecture',
    description:
      'Resilient database schemas, microservices, and AWS/Docker/Cloudflare deployments tailored for scale.',
  },
  {
    icon: Cpu,
    title: 'Performance & Technical Consulting',
    description:
      'Auditing and accelerating slow Next.js/Node.js apps, plus strategic guidance for early-stage teams.',
  },
];
export function Services() {
  return (
    <Section id="services" className="bg-background relative">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />

      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="font-display mb-6 text-3xl font-bold md:text-5xl">
            Expertise & Services
          </h2>
          <p className="text-text-secondary text-lg">
            I specialize in the technical foundation required to launch and
            scale successful software products.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.1} className="h-full">
            <div className="group glass-panel hover:bg-surface h-full rounded-3xl p-8 transition-colors duration-300">
              <div className="bg-accent-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <service.icon className="text-accent-primary h-6 w-6" />
              </div>
              <h3 className="font-display mb-4 text-xl font-bold">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
