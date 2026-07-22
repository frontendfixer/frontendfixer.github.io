import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

import { cn } from '#lib/utils';

interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

const VIEWPORT = { once: true, margin: '-50px' };

export function Reveal({
  children,
  width = '100%',
  delay = 0,
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ width }} className={cn('relative', className)}>
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: shouldReduceMotion ? 0 : delay,
          ease: 'easeOut',
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
