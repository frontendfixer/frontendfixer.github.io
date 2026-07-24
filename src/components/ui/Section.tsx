import type { ReactNode } from 'react';
import React from 'react';

import { cn } from '#/lib/utils';

import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children: ReactNode;
  containerClass?: string;
  className?: string;
}

export function Section({
  id,
  className,
  children,
  containerClass,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-32', className)}>
      <Container className={containerClass}>{children}</Container>
    </section>
  );
}
