import { motion } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

import { cn } from '#/lib/utils';

import type { GalleryImage } from './gallery.types';

interface GalleryThumbnailStripProps {
  images: GalleryImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  title: string;
}

export const GalleryThumbnailStrip = memo(function GalleryThumbnailStrip({
  images,
  selectedIndex,
  onSelect,
  title,
}: GalleryThumbnailStripProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [selectedIndex]);

  return (
    <div className="mx-auto flex w-full max-w-3xl [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-3 [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => {
        const isSelected = index === selectedIndex;

        return (
          <button
            key={image.src}
            ref={isSelected ? selectedRef : null}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'relative h-14 w-20 shrink-0 overflow-hidden rounded-lg opacity-55 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-16 sm:w-24',
              isSelected && 'opacity-100',
            )}
            aria-label={`View ${image.alt || `${title} image ${index + 1}`}`}
            aria-current={isSelected ? 'true' : undefined}
          >
            <img
              src={image.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {isSelected && (
              <motion.span
                layoutId={`project-gallery-thumbnail-indicator-${title}`}
                className="absolute inset-0 rounded-lg ring-2 ring-white ring-offset-2 ring-offset-black/60"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
});
