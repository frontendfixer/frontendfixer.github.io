import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twJoin } from 'tailwind-merge';

const ToggleButton = ({
  isDarkMode,
  onClick,
}: {
  isDarkMode: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={twJoin(
        'relative flex h-[27px] w-[54px] cursor-pointer items-center justify-between rounded-full border-2 px-1 transition-colors duration-300 ease-linear',
        isDarkMode
          ? 'border-blue-700 bg-blue-300'
          : 'border-gray-400 bg-gray-200',
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faMoon} className="h-4 w-4 text-dark-900" />
      <span
        className={twJoin(
          `absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-blue-600 shadow-md transition-all duration-300 ease-linear`,
          !isDarkMode ? 'left-[3px]' : 'left-[28px]',
        )}
      />
      <FontAwesomeIcon icon={faSun} className="h-4 w-4 text-dark-900" />
    </div>
  );
};

export default ToggleButton;
