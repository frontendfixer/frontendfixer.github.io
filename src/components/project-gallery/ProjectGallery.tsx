import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import type { GalleryContextValue, ProjectGalleryProps } from './gallery.types';
import { clampIndex } from './gallery.utils';
import { GalleryContext } from './GalleryContext';
import { GalleryModal } from './GalleryModal';
import { GalleryStack } from './GalleryStack';

export const ProjectGallery = memo(function ProjectGallery({
  title,
  images,
  initialIndex = 0,
  showCounter = true,
  showThumbnails = true,
  showControls = true,
  loop = true,
  backdropClosable = true,
  className,
}: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, images.length),
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  const openAt = useCallback(
    (index: number, trigger: HTMLElement) => {
      triggerRef.current = trigger;
      setActiveIndex(clampIndex(index, images.length));
      setIsOpen(true);
    },
    [images.length],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 220);
  }, []);

  const contextValue = useMemo<GalleryContextValue>(
    () => ({
      title,
      images,
      initialIndex,
      showCounter,
      showThumbnails,
      showControls,
      loop,
      backdropClosable,
      activeIndex,
      isOpen,
      setActiveIndex,
      openAt,
      close,
    }),
    [
      activeIndex,
      backdropClosable,
      close,
      images,
      initialIndex,
      isOpen,
      loop,
      openAt,
      showControls,
      showCounter,
      showThumbnails,
      title,
    ],
  );

  if (images.length === 0) return null;

  return (
    <GalleryContext.Provider value={contextValue}>
      <LayoutGroup id={`project-gallery-${title}`}>
        <GalleryStack className={className} />
        <AnimatePresence>{isOpen && <GalleryModal />}</AnimatePresence>
      </LayoutGroup>
    </GalleryContext.Provider>
  );
});
