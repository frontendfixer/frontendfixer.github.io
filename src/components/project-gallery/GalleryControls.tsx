import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { memo } from 'react';

import { cn } from '#lib/utils';

interface GalleryControlsProps {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  showControls: boolean;
}

const controlClassName =
  'flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white shadow-lg backdrop-blur-xl transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export const GalleryControls = memo(function GalleryControls({
  onClose,
  onPrevious,
  onNext,
  showControls,
}: GalleryControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={cn(
          controlClassName,
          'absolute top-4 right-4 z-30 sm:top-6 sm:right-6',
        )}
        aria-label="Close gallery"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      {showControls && (
        <div className="pointer-events-none absolute inset-x-3 top-1/2 z-20 hidden -translate-y-1/2 justify-between md:flex">
          <button
            type="button"
            onClick={onPrevious}
            className={cn(controlClassName, 'pointer-events-auto')}
            aria-label="Previous image"
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className={cn(controlClassName, 'pointer-events-auto')}
            aria-label="Next image"
          >
            <ChevronRight aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
});
