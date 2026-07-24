import { LifeBuoy, PenTool, Rocket, Search, Terminal } from 'lucide-react';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const processSteps = [
  {
    icon: Search,
    title: 'Discover',
    description:
      'Understanding your business goals, users, and technical requirements to define a clear scope.',
  },
  {
    icon: PenTool,
    title: 'Plan',
    description:
      'Architecting the database schema, API design, and selecting the optimal technology stack.',
  },
  {
    icon: Terminal,
    title: 'Develop',
    description:
      'Writing clean, typed, and tested code using modern frameworks and best practices.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description:
      'Setting up CI/CD pipelines and deploying to cloud infrastructure with zero downtime.',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    description:
      'Monitoring performance, fixing edge-case bugs, and scaling architecture as needed.',
  },
];
export function Process() {
  return (
    <Section id="process" className="bg-background">
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Development Process
          </h2>
          <p className="text-text-secondary text-lg">
            A structured, transparent approach to delivering enterprise-grade
            software on time.
          </p>
        </div>
      </Reveal>
      <div className="relative mx-auto max-w-4xl">
        <div className="bg-border absolute top-0 bottom-0 left-6.75 w-px -translate-x-1/2 md:left-1/2" />
        <div className="flex flex-col gap-12 md:gap-24">
          {processSteps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={step.title} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-full pl-16 md:w-[calc(50%-3rem)] md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                  <div className="bg-background border-surface absolute left-0 z-10 flex h-14 w-14 translate-x-0 items-center justify-center rounded-full border-2 md:left-1/2 md:-translate-x-1/2">
                    <div className="bg-accent-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <step.icon className="text-accent-primary h-5 w-5" />
                    </div>
                  </div>
                  <div className="hidden w-[calc(50%-3rem)] md:block" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
