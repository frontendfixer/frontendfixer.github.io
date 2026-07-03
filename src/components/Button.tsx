import { ReactNode } from 'react';

import { cn } from '#/lib/cn';

type ButtonType = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  buttonType?: 'secondary' | 'inverted' | undefined;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  buttonType,
  className,
}: ButtonType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `transition-color disabled:bg-dark-500 disabled:text-white-full flex items-center justify-center gap-4 rounded-lg px-5 py-2 font-medium duration-300`,
        fullWidth && 'w-full',
        buttonType === 'secondary' &&
          'bg-secondary hover:bg-secondary-500 text-white',
        buttonType === 'inverted' &&
          'border-primary text-dark hover:bg-primary border-2 hover:text-white',
        buttonType !== 'secondary' &&
          'bg-primary hover:bg-primary-600 dark:bg-primary-500 dark:text-dark-800 dark:hover:bg-primary-400 text-white',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
