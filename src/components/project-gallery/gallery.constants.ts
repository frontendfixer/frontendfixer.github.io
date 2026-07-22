export const gallerySpring = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 30,
  mass: 0.8,
};

export const cardOffsets = [
  { rotate: -4, x: -10, y: -10, scale: 0.94 },
  { rotate: 2, x: -5, y: 8, scale: 0.96 },
  { rotate: -2, x: -3, y: -11, scale: 0.98 },
  { rotate: 4, x: 5, y: -8, scale: 1 },
  { rotate: -2, x: 10, y: 10, scale: 0.94 },
] as const;

export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');
