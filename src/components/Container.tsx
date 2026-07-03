import { ReactNode } from 'react';

import { cn } from '#/lib/cn';

const Container = ({
  children,
  fullWidth,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className={cn(
        `max-w-360`,
        fullWidth && 'w-full',
        !fullWidth && 'w-[96%]',
        `mx-auto`,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
