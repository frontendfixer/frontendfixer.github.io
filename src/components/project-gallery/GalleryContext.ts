import { createContext, useContext } from 'react';

import type { GalleryContextValue } from './gallery.types';

export const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useProjectGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useProjectGallery must be used within ProjectGallery');
  }
  return context;
}
