import { FOCUSABLE_SELECTOR } from './gallery.constants';

export function clampIndex(index: number, length: number) {
  if (length === 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}

export function getGalleryLayoutId(title: string, src: string) {
  return `project-gallery-${title}-${src}`;
}

export function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(element => !element.hasAttribute('disabled'));
}

export function lockBodyScroll() {
  const previousOverflow = document.body.style.overflow;
  const previousPaddingRight = document.body.style.paddingRight;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  };
}
