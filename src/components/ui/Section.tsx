import React, { ReactNode } from 'react';

import { cn } from '#lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children: ReactNode;
  containerClass?: string;
  className?: string;
}

import { Container } from './Container';

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
