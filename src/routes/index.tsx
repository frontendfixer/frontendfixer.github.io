import { createFileRoute } from '@tanstack/react-router';
import { seo } from '#/lib/seo.ts';
import { HeroSection } from '#/components/sections/HeroSection.tsx';
import { TrustStrip } from '#/components/sections/TrustStrip.tsx';
import { Metrics } from '#/components/sections/Metrics.tsx';
import { FeaturedProject } from '#/components/sections/FeaturedProject.tsx';
import { Services } from '#/components/sections/Services.tsx';
import { TechStack } from '#/components/sections/TechStack.tsx';
import { Process } from '#/components/sections/Process.tsx';
import { About } from '#/components/sections/About.tsx';
import { Testimonials } from '#/components/sections/Testimonials.tsx';
import { FAQ } from '#/components/sections/FAQ.tsx';
import { Contact } from '#/components/sections/Contact.tsx';
import { Footer } from '#/components/sections/Footer.tsx';

export const Route = createFileRoute('/')({
  head: () => {
    const { meta, links } = seo({ url: '/' });

    return { meta, links };
  },
  component: Home,
});

function Home() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <TrustStrip />
      <Metrics />
      <FeaturedProject />
      <Services />
      <TechStack />
      <Process />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
