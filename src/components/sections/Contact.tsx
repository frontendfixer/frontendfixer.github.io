import emailjs from '@emailjs/browser';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowUpRight, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import validator from 'validator';

import workspaceImage from '#assets/images/portfolio/workspace-placeholder.png';
import { SOCIALS_USERNAME } from '#config/social.ts';

import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export function Contact() {
  const EMAILJS_CREDENTIALS = useMemo(() => {
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };
  }, []);

  const initial = { name: '', email: '', message: '' };
  const [inputs, setInputs] = useState(initial);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'completed' | 'rejected'
  >('idle');

  useEffect(() => {
    if (status === 'completed' || status === 'rejected') {
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  }, [status]);

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

  // @ts-ignore
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (invalid || !formRef.current) return;
    setStatus('loading');

    if (
      !EMAILJS_CREDENTIALS.serviceId ||
      !EMAILJS_CREDENTIALS.templateId ||
      !EMAILJS_CREDENTIALS.publicKey
    ) {
      return setStatus('rejected');
    }
    try {
      const res = await emailjs.sendForm(
        EMAILJS_CREDENTIALS.serviceId,
        EMAILJS_CREDENTIALS.templateId,
        formRef.current,
        EMAILJS_CREDENTIALS.publicKey,
      );
      if (res.status === 200) {
        setInputs(initial);
        setStatus('completed');
      } else setStatus('rejected');
    } catch (error) {
      console.error(error);
      setStatus('rejected');
    }
  };

  return (
    <Section id="contact">
      <div className="mx-auto mb-16 max-w-4xl text-center">
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
                  <span>{SOCIALS_USERNAME.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-accent-primary h-4 w-4" />
                  <span>India · Remote Worldwide</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`https://github.com/${SOCIALS_USERNAME.GITHUB}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={`https://linkedin.com/in/${SOCIALS_USERNAME.linkedin}`}
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
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="space-y-2.5 md:space-y-5"
          >
            <input
              type="hidden"
              name="submittedAt"
              value={new Date().toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            />
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
