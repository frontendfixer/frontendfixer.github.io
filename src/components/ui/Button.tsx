import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'cta';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          'focus-visible:ring-border inline-flex cursor-pointer items-center justify-center rounded-xl text-sm font-semibold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-accent-primary hover:bg-accent-primary/90 text-black shadow-sm':
              variant === 'primary',
            'bg-secondary text-text-primary hover:bg-surface border-border border shadow-sm':
              variant === 'secondary',
            'border-border hover:bg-surface text-text-primary border bg-transparent':
              variant === 'outline',
            'hover:bg-surface text-text-primary': variant === 'ghost',
            'text-accent-primary underline-offset-4 hover:underline':
              variant === 'link',
            'bg-linear-to-r from-teal-400 to-cyan-500 text-black shadow-[0_10px_30px_rgba(6,182,212,0.28)] hover:-translate-y-0.5 hover:from-teal-300 hover:to-cyan-400 hover:shadow-[0_20px_50px_rgba(6,182,212,0.38)]':
              variant === 'cta',
            'h-9 px-4 py-2': size === 'md',
            'h-8 rounded-lg px-3 text-xs': size === 'sm',
            'h-11 rounded-xl px-8': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
