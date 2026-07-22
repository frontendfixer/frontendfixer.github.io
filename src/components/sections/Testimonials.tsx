import { Quote } from 'lucide-react';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const testimonials = [
  {
    quote:
      "An exceptional engineer who doesn't just write code, but solves complex business problems. Delivered our entire cloud infrastructure ahead of schedule.",
    author: 'Sarah J.',
    role: 'CTO, TechStartup',
  },
  {
    quote:
      'Transformed our legacy monolith into a performant, scalable Next.js and Node.js architecture. The performance gains were immediate.',
    author: 'Michael T.',
    role: 'Engineering Manager',
  },
  {
    quote:
      'Clean code, excellent communication, and a deep understanding of modern SaaS architecture. Highly recommended for any serious technical project.',
    author: 'Elena R.',
    role: 'Founder',
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-background relative">
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Client Feedback
          </h2>
          <p className="text-text-secondary text-lg">
            What engineering leaders and founders say about my work.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delay={i * 0.1}>
            <div className="glass-panel relative flex h-full flex-col rounded-3xl p-8">
              <Quote className="text-accent-primary/20 absolute top-6 right-6 h-10 w-10" />
              <p className="text-text-secondary relative z-10 mb-8 flex-1 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="bg-surface border-border text-text-muted flex h-12 w-12 items-center justify-center rounded-full border font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-text-muted text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
