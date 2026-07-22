import { Menu, Terminal, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ContactButton } from '#components/sections/ContactButton.tsx';
import { Button } from '#components/ui/Button';
import { Container } from '#components/ui/Container';
import { cn } from '#lib/utils';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'About', href: '#about' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300',
          scrolled
            ? 'bg-background/80 border-border py-4 shadow-sm backdrop-blur-md'
            : 'bg-transparent py-6',
        )}
      >
        <Container>
          <nav className="flex items-center justify-between">
            <a
              href="#hero"
              className="group relative z-50 flex items-center gap-2"
            >
              <div className="bg-surface border-border group-hover:border-accent-primary/50 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                <Terminal className="text-accent-primary group-hover:text-accent-secondary h-5 w-5 transition-colors" />
              </div>
              <span className="hidden font-bold tracking-tight sm:block">
                FrontendFixer
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              <ul className="flex items-center gap-12">
                {navItems.map(item => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-text-secondary group relative py-2 font-medium transition-colors hover:text-white"
                    >
                      {item.name}
                      <span className="bg-accent-primary absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="bg-border h-6 w-px" />
              <ContactButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="text-text-secondary relative z-50 p-2 hover:text-white focus:outline-hidden md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </Container>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            'bg-background/95 fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden',
            isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          <ul className="flex flex-col items-center gap-8">
            {navItems.map(item => (
              <li key={item.name} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'hover:text-accent-primary block text-2xl font-bold transition-transform duration-500',
                    isOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0',
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              'mt-12 transition-all delay-300 duration-500',
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            )}
          >
            <Button asChild size="lg">
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Hire Me
              </a>
            </Button>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Navigation;
