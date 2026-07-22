import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowUpRight, Mail } from 'lucide-react';

import { Container } from '../ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface/30 border-t">
      <Container>
        <div className="flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-md">
            <a href="#hero" className="inline-flex items-center gap-3">
              <div className="bg-accent-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold text-black">
                LP
              </div>

              <div>
                <h3 className="text-lg font-semibold">Lakshmikanta Patra</h3>

                <p className="text-text-muted text-sm">Full Stack Engineer</p>
              </div>
            </a>

            <p className="text-text-secondary mt-6 leading-7">
              Building scalable SaaS applications with React, NestJS, TypeScript
              and AWS. Available for freelance projects worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 font-semibold">Navigation</h4>

            <nav className="flex flex-col gap-3 text-sm">
              <a
                href="#services"
                className="hover:text-accent-primary transition-colors"
              >
                Services
              </a>

              <a
                href="#about"
                className="hover:text-accent-primary transition-colors"
              >
                About
              </a>

              <a
                href="#contact"
                className="hover:text-accent-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-5 font-semibold">Connect</h4>

            <div className="space-y-4">
              <a
                href="mailto:frontendfixer@email.com"
                className="text-text-secondary hover:text-accent-primary flex items-center gap-3 transition-colors"
              >
                <Mail className="h-4 w-4" />
                frontendfixer@email.com
              </a>

              <a
                href="https://github.com/frontendfixer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary flex items-center gap-3 transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/frontendfixer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary flex items-center gap-3 transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-border flex flex-col items-center justify-between gap-5 border-t py-6 text-sm md:flex-row">
          <p className="text-text-muted">
            © {year} Lakshmikanta Patra. Built with React, TypeScript & Tailwind
            CSS.
          </p>

          <a
            href="#hero"
            className="text-accent-primary hover:text-accent-secondary inline-flex items-center gap-2 font-medium transition-colors"
          >
            Back to top
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
