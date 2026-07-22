import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Button } from '#components/ui/Button.tsx';

interface LinkButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  href: string;
  label: string;
  icon: IconProp;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function LinkButton({
  href,
  label,
  icon,
  variant = 'secondary',
  className,
}: LinkButtonProps) {
  return (
    <Button variant={variant} className={className} asChild>
      <a target="_blank" href={href}>
        {label}
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </a>
    </Button>
  );
}
