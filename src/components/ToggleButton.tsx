import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '#/lib/cn';

const ToggleButton = ({
  isDarkMode,
  onClick,
}: {
  isDarkMode: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        'border-primary relative flex h-[27px] w-[54px] cursor-pointer items-center justify-between rounded-full border-2 px-1 transition-colors duration-300 ease-linear',
        isDarkMode ? 'bg-primary-400' : 'bg-white',
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faMoon} className="text-dark-900 h-4 w-4" />
      <span
        className={cn(
          `bg-primary absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full shadow-md transition-all duration-300 ease-linear`,
          !isDarkMode ? 'left-[3px]' : 'left-[28px]',
        )}
      />
      <FontAwesomeIcon icon={faSun} className="text-dark-900 h-4 w-4" />
    </div>
  );
};

export default ToggleButton;
