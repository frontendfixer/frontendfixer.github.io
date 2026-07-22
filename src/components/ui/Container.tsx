import React, { ReactNode } from 'react';

import { cn } from '#lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-360 px-6 md:px-8', className)}>
      {children}
    </div>
  );
}
