import emailjs from '@emailjs/browser';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowUpRight, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import validator from 'validator';

import workspaceImage from '#assets/images/portfolio/workspace-placeholder.png';

import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export function Contact() {
  const initial = { name: '', email: '', message: '' };
  const [inputs, setInputs] = useState(initial);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'completed' | 'rejected'
  >('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const errors = useMemo(
    () => ({
      name: inputs.name.trim().length < 2,
      email: !validator.isEmail(inputs.email),
      message: inputs.message.trim().length < 20,
    }),
    [inputs],
  );

  const invalid = errors.name || errors.email || errors.message;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setInputs(v => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invalid || !formRef.current) return;
    setStatus('loading');
    try {
      const res = await emailjs.sendForm(
        'service_qdjdol9',
        'template_lobv7nq',
        formRef.current,
        'G0MWsjYi9pbxnAwfJ',
      );
      if (res.status === 200) {
        setInputs(initial);
        setStatus('completed');
      } else setStatus('rejected');
    } catch {
      setStatus('rejected');
    }
  };

  return (
    <Section id="contact">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <Reveal>
          <p className="text-accent-primary mb-3 text-sm font-semibold tracking-[0.2em] uppercase">
            Contact
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Let's build your next SaaS product.
          </h2>
          <p className="text-text-secondary mt-5 text-lg">
            Have an idea or an existing application that needs improvement?
            Let's discuss it.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="glass-panel overflow-hidden rounded-3xl">
            <img
              src={workspaceImage}
              alt="Workspace"
              className="aspect-video w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Available for Freelance
                </h3>
                <p className="text-text-secondary mt-2">
                  I usually respond within 24 hours.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="text-accent-primary h-4 w-4" />
                  <span>frontendfixer@email.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-accent-primary h-4 w-4" />
                  <span>India · Remote Worldwide</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com/frontendfixer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://linkedin.com/mr.lakshmikanta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
            <input
              className="bg-surface border-border w-full rounded-xl border px-4 py-3"
              name="name"
              placeholder="Your Name"
              value={inputs.name}
              onChange={onChange}
            />
            <input
              className="bg-surface border-border w-full rounded-xl border px-4 py-3"
              name="email"
              type="email"
              placeholder="Email Address"
              value={inputs.email}
              onChange={onChange}
            />
            <textarea
              className="bg-surface border-border min-h-40 w-full rounded-xl border px-4 py-3"
              name="message"
              placeholder="Tell me about your project..."
              value={inputs.message}
              onChange={onChange}
            />

            {status == 'completed' && (
              <p className="text-sm text-green-400">
                Thanks! I'll get back to you shortly.
              </p>
            )}

            {status == 'rejected' && (
              <p className="text-sm text-red-400">
                Failed to send. Please try again.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status == 'loading' || invalid}
              className="w-full gap-2"
            >
              {status == 'loading' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </Button>

            <a
              href="#hero"
              className="text-accent-primary inline-flex items-center gap-2 text-sm"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
