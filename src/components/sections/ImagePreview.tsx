import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImagePreview({ src, alt, className }: ImagePreviewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <motion.img
        layoutId={src}
        src={src}
        alt={alt}
        draggable={false}
        onClick={() => setOpen(true)}
        className={className}
      />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
              <motion.img
                layoutId={src}
                src={src}
                alt={alt}
                draggable={false}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl border border-white/10 shadow-2xl"
              />

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.15 }}
                onClick={() => setOpen(false)}
                className="absolute top-8 right-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <X />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
