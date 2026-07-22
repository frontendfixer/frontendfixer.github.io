import type { EmblaCarouselType } from 'embla-carousel';

export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface ProjectGalleryProps {
  title: string;
  images: GalleryImage[];
  initialIndex?: number;
  showCounter?: boolean;
  showThumbnails?: boolean;
  showControls?: boolean;
  loop?: boolean;
  backdropClosable?: boolean;
  className?: string;
}

export interface GalleryContextValue extends Required<
  Omit<ProjectGalleryProps, 'className'>
> {
  activeIndex: number;
  isOpen: boolean;
  setActiveIndex: (index: number) => void;
  openAt: (index: number, trigger: HTMLElement) => void;
  close: () => void;
}

export interface GalleryCarouselProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  onApiReady: (api: EmblaCarouselType | undefined) => void;
  loop: boolean;
  title: string;
  images: GalleryImage[];
}
