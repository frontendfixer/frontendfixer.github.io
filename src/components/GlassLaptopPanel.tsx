import { cn } from '#lib/utils';

interface Props {
  image: string;
  alt: string;
}

export function GlassLaptopPanel({ image, alt }: Props) {
  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="bg-accent-primary/20 absolute inset-0 -z-10 scale-90 rounded-full blur-[120px]" />

      <div
        className={cn(
          'group',
          'border-border bg-surface/80 overflow-hidden rounded-3xl border',
          'shadow-[0_20px_80px_rgba(0,0,0,0.45)]',
          'transition-all duration-500 hover:-translate-y-1',
        )}
      >
        {/* Window Bar */}
        <div className="border-border flex h-11 items-center gap-2 border-b px-5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>

        <div className="aspect-16/10 overflow-hidden">
          <img
            src={image}
            alt={alt}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
      </div>
    </div>
  );
}
