import { ArrowRight } from 'lucide-react';

import { Button } from '#/components/ui/Button.tsx';

interface ContactButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export function ContactButton({
  text,
  onClick,
  className,
}: ContactButtonProps) {
  return (
    <Button asChild size="lg" variant="cta" className={className}>
      <a href="#contact" onClick={onClick}>
        <span className="flex items-center gap-2">
          {text ?? 'Start Your Project'}
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>
    </Button>
  );
}
