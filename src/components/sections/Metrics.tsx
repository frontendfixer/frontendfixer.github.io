import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

const metrics = [
  { value: '30+', label: 'Projects shipped' },
  { value: '4+', label: 'Years in production' },
  { value: '100%', label: 'On-time delivery' },
  { value: '0', label: 'Data-loss incidents' },
];
export function Metrics() {
  return (
    <div className="bg-surface/30 border-border border-y py-12 md:py-20">
      <Container>
        <div className="divide-border/0 md:divide-border grid grid-cols-2 gap-8 divide-x md:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal
              key={metric.label}
              delay={i * 0.1}
              className="px-4 text-center"
            >
              <div className="to-text-secondary font-display mb-2 bg-linear-to-br from-white bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                {metric.value}
              </div>
              <div className="text-text-muted text-sm font-medium tracking-wider uppercase">
                {metric.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
