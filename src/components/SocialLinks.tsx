import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '#/lib/cn';
import { SocialLink, socialLinks } from '#data/Social';

const SocialLinks = ({ inverted }: { inverted?: boolean }) => {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link: SocialLink) => (
        <a href={link.url} key={link.id} target="_blank">
          <FontAwesomeIcon
            icon={link.icon}
            className={cn(
              'h-8 w-8',
              inverted ? 'text-white-full' : 'text-dark',
              'hover:text-primary dark:hover:text-primary-400 shadow-xs transition-transform duration-300 ease-linear hover:-translate-y-1 dark:text-white',
            )}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
