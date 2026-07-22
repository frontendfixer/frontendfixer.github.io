import { motion } from 'framer-motion';
import { memo, useState } from 'react';

import { cn } from '#lib/utils';

import { cardOffsets, gallerySpring } from './gallery.constants';
import { getGalleryLayoutId } from './gallery.utils';
import { useProjectGallery } from './GalleryContext';

interface GalleryStackProps {
  className?: string;
}

export const GalleryStack = memo(function GalleryStack({
  className,
}: GalleryStackProps) {
  const { images, title, isOpen, openAt, activeIndex } = useProjectGallery();
  const [isHovered, setIsHovered] = useState(false);

  if (images.length === 0) return null;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered && !isOpen ? -4 : 0,
        scale: isHovered && !isOpen ? 1.01 : 1,
      }}
      transition={gallerySpring}
      className={cn(
        'group relative mx-auto w-full max-w-2xl pb-7 pl-5 sm:pb-10 sm:pl-8',
        className,
      )}
    >
      <div className="relative aspect-16/10 w-full">
        {images.map((image, index) => {
          const stackIndex = images.length - 1 - index;
          const offset = cardOffsets[stackIndex % cardOffsets.length];
          const isTopCard = index === 0;
          const spreadMultiplier = stackIndex - (images.length - 1) / 2;

          return (
            <motion.button
              key={image.src}
              type="button"
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 1,
                x: offset.x + (isHovered && !isOpen ? spreadMultiplier * 2 : 0),
                y:
                  offset.y -
                  (isHovered && !isOpen
                    ? 3 + Math.abs(spreadMultiplier) * 1.5
                    : 0),
                rotate:
                  offset.rotate +
                  (isHovered && !isOpen ? spreadMultiplier * 0.5 : 0),
                scale: offset.scale,
                boxShadow:
                  isHovered && !isOpen
                    ? '0 25px 35px -15px rgba(0, 0, 0, 0.5)'
                    : '0 15px 20px -5px rgba(0, 0, 0, 0.3)',
                pointerEvents: isOpen ? 'none' : 'auto',
              }}
              whileTap={{ scale: offset.scale * 0.98 }}
              transition={gallerySpring}
              onClick={event => openAt(index, event.currentTarget)}
              className="bg-surface ring-offset-background focus-visible:ring-accent-primary absolute inset-0 origin-bottom-left cursor-zoom-in overflow-hidden rounded-2xl text-left shadow-xl shadow-black/30 ring-offset-4 outline-none focus-visible:ring-2 sm:rounded-3xl"
              style={{ zIndex: stackIndex + 1 }}
              aria-label={`Open ${image.alt || `${title} screenshot ${index + 1}`}`}
              tabIndex={isTopCard && !isOpen ? 0 : -1}
            >
              <motion.img
                layoutId={
                  !isOpen || index === activeIndex
                    ? getGalleryLayoutId(title, image.src)
                    : undefined
                }
                src={image.src}
                alt={image.alt || `${title} screenshot ${index + 1}`}
                loading={isTopCard ? 'eager' : 'lazy'}
                draggable={false}
                animate={{
                  filter:
                    isHovered && !isOpen && !isTopCard
                      ? 'brightness(1.05)'
                      : isHovered && !isOpen && isTopCard
                        ? 'brightness(1)'
                        : 'brightness(0.9)',
                }}
                transition={gallerySpring}
                className="h-full w-full object-cover select-none"
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 sm:rounded-3xl" />
            </motion.button>
          );
        })}
      </div>
      <span className="text-text-muted mt-4 block text-center text-xs font-medium tracking-wide">
        {images.length} {images.length === 1 ? 'screenshot' : 'screenshots'} ·
        Click to explore
      </span>
    </motion.div>
  );
});
