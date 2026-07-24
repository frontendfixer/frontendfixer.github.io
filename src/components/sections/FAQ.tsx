import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '#/lib/utils';

import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const faqs = [
  {
    question: 'How do we get started?',
    answer:
      "We'll begin with a discovery call to discuss your project goals, technical requirements, timeline, and budget. After that, I'll provide a clear proposal with milestones and estimated delivery.",
  },
  {
    question: 'What kinds of projects do you work on?',
    answer:
      'I build modern SaaS applications, custom web platforms, REST APIs, cloud-native backend systems, and scalable frontend applications using React, Next.js, NestJS, TypeScript, and AWS.',
  },
  {
    question: 'Can you improve or maintain an existing application?',
    answer:
      'Absolutely. I can optimize performance, refactor legacy code, implement new features, migrate applications to modern architectures, and provide ongoing maintenance and technical support.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. I offer post-launch maintenance, bug fixes, feature enhancements, infrastructure improvements, and long-term technical support to keep your application reliable and scalable.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="bg-surface/20 border-border border-y">
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Common Questions
          </h2>
          <p className="text-text-secondary text-lg">
            Details about my process, availability, and how we can work
            together.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="glass-panel overflow-hidden rounded-2xl">
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-hidden"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'text-text-muted h-5 w-5 transition-transform duration-300',
                    openIndex === i && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  openIndex === i
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div className="text-text-secondary px-6 pb-5 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
