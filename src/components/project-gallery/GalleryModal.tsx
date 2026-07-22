import type { EmblaCarouselType } from 'embla-carousel';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { gallerySpring } from './gallery.constants';
import { getFocusableElements, lockBodyScroll } from './gallery.utils';
import { GalleryCarousel } from './GalleryCarousel';
import { useProjectGallery } from './GalleryContext';
import { GalleryControls } from './GalleryControls';
import { GalleryThumbnailStrip } from './GalleryThumbnailStrip';

export function GalleryModal() {
  const {
    activeIndex,
    backdropClosable,
    close,
    images,
    loop,
    setActiveIndex,
    showControls,
    showCounter,
    showThumbnails,
    title,
  } = useProjectGallery();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<EmblaCarouselType>();

  const previous = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    const unlockBodyScroll = lockBodyScroll();
    const dialog = dialogRef.current;
    const focusable = dialog ? getFocusableElements(dialog) : [];
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
      if (event.key === 'Tab' && dialog) {
        const elements = getFocusableElements(dialog);
        if (elements.length === 0) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockBodyScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, next, previous]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-100 bg-black/55 backdrop-blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={gallerySpring}
      onMouseDown={event => {
        if (backdropClosable && event.target === event.currentTarget) close();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} image gallery`}
        tabIndex={-1}
        className="relative flex h-full w-full flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={gallerySpring}
      >
        <div className="bg-accent-primary/20 pointer-events-none absolute top-[25%] left-1/2 h-[45%] w-[55%] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="absolute inset-x-2 top-2 bottom-2 overflow-hidden rounded-[2rem] bg-white/[0.035] shadow-2xl shadow-black/60">
          <GalleryCarousel
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}
            onApiReady={setApi}
            loop={loop}
            title={title}
            images={images}
          />
        </div>

        <GalleryControls
          onClose={close}
          onPrevious={previous}
          onNext={next}
          showControls={showControls}
        />

        <div className="relative z-30 mt-auto flex min-h-24 flex-col justify-end pb-3">
          {showCounter && (
            <p className="mb-2 text-center text-xs font-medium tracking-widest text-white/65">
              {activeIndex + 1} / {images.length}
            </p>
          )}
          {showThumbnails && (
            <GalleryThumbnailStrip
              images={images}
              selectedIndex={activeIndex}
              onSelect={index => {
                setActiveIndex(index);
                api?.scrollTo(index);
              }}
              title={title}
            />
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
