import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const techGroups = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Query'],
  },
  {
    category: 'Backend',
    items: ['NestJS', 'Node.js', 'REST APIs', 'GraphQL', 'Prisma ORM'],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'AWS',
      'Lambda',
      'S3',
      'Cloudflare',
      'Docker',
      'GitHub Actions',
      'CI/CD',
    ],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'Redis'],
  },
];

export function TechStack() {
  return (
    <Section id="tech-stack" className="border-border bg-surface/20 border-y">
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Technical Arsenal
          </h2>
          <p className="text-text-secondary text-lg">
            I build with modern, battle-tested technologies optimized for
            developer experience and application performance.
          </p>
        </div>
      </Reveal>

      <div className="sxl:gap-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {techGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.1}>
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="bg-border h-px flex-1" />
                <h3 className="text-text-muted text-sm font-medium tracking-widest uppercase">
                  {group.category}
                </h3>
                <div className="bg-border h-px flex-1" />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {group.items.map(tech => (
                  <div
                    key={tech}
                    className="bg-surface border-border hover:border-accent-primary/50 hover:bg-accent-primary/5 cursor-default rounded-xl border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
