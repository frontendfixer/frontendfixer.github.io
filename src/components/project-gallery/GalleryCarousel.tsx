import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef } from 'react';

import type { GalleryCarouselProps } from './gallery.types';
import { getGalleryLayoutId } from './gallery.utils';

export const GalleryCarousel = memo(function GalleryCarousel({
  selectedIndex,
  onSelect,
  onApiReady,
  loop,
  title,
  images,
}: GalleryCarouselProps) {
  const [viewportRef, api] = useEmblaCarousel({
    loop,
    align: 'center',
    duration: 28,
  });
  const wheelTimeout = useRef<number | undefined>(undefined);

  const syncSelectedIndex = useCallback(() => {
    if (api) onSelect(api.selectedScrollSnap());
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    onApiReady(api);
    api.on('select', syncSelectedIndex);
    api.on('reInit', syncSelectedIndex);
    syncSelectedIndex();

    return () => {
      api.off('select', syncSelectedIndex);
      api.off('reInit', syncSelectedIndex);
      onApiReady(undefined);
    };
  }, [api, onApiReady, syncSelectedIndex]);

  useEffect(() => {
    api?.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!api || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (wheelTimeout.current) window.clearTimeout(wheelTimeout.current);
      wheelTimeout.current = window.setTimeout(() => {
        if (event.deltaY > 0) api.scrollNext();
        else api.scrollPrev();
      }, 25);
    },
    [api],
  );

  return (
    <div
      ref={viewportRef}
      onWheel={handleWheel}
      className="h-full w-full touch-pan-y overflow-hidden"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
    >
      <div className="flex h-full items-center">
        {images.map((image, index) => (
          <div
            key={image.src}
            className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center px-3 py-16 sm:px-12 sm:py-20"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
            aria-hidden={index !== selectedIndex}
          >
            <motion.img
              layoutId={
                index === selectedIndex
                  ? getGalleryLayoutId(title, image.src)
                  : undefined
              }
              src={image.src}
              alt={image.alt || `${title} screenshot ${index + 1}`}
              loading={index === selectedIndex ? 'eager' : 'lazy'}
              draggable={false}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl shadow-black/60 select-none sm:rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
