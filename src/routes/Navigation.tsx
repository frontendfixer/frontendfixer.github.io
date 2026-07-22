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

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Close menu when switching to desktop
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300',
          scrolled
            ? 'border-border bg-background/80 py-4 shadow-sm backdrop-blur-md'
            : 'bg-transparent py-6',
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between"
            aria-label="Primary navigation"
          >
            <a
              href="#hero"
              className="group relative z-50 flex items-center gap-2"
              onClick={closeMenu}
            >
              <div className="bg-surface border-border group-hover:border-accent-primary/50 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                <Terminal className="text-accent-primary group-hover:text-accent-secondary h-5 w-5 transition-colors" />
              </div>

              <span className="hidden font-bold tracking-tight sm:block">
                FrontendFixer
              </span>
            </a>

            {/* Desktop Navigation */}
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

            {/* Mobile Toggle */}
            <Button
              variant="outline"
              className="text-text-secondary relative z-50 rounded-md p-2 hover:text-white md:hidden"
              onClick={() => setIsOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </nav>
        </Container>
      </header>

      {/* Mobile Navigation */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={cn(
          'bg-background/80 fixed inset-0 z-40 flex h-screen w-full items-center justify-center backdrop-blur-md transition-all duration-300 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex flex-col items-center">
          <ul className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                style={{
                  transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                }}
              >
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'hover:text-accent-primary block text-2xl font-bold transition-all duration-500',
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
              'mt-12 transition-all duration-500',
              isOpen
                ? 'translate-y-0 opacity-100 delay-300'
                : 'translate-y-8 opacity-0',
            )}
          >
            <ContactButton onClick={closeMenu} />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
