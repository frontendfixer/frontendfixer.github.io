import { createFileRoute } from '@tanstack/react-router';

import { About } from '#components/sections/About';
import { Contact } from '#components/sections/Contact';
import { FAQ } from '#components/sections/FAQ';
import { FeaturedProject } from '#components/sections/FeaturedProject';
import { Footer } from '#components/sections/Footer';
import { HeroSection } from '#components/sections/HeroSection';
import { Metrics } from '#components/sections/Metrics';
import { Process } from '#components/sections/Process';
import { Services } from '#components/sections/Services';
import { TechStack } from '#components/sections/TechStack';
import { Testimonials } from '#components/sections/Testimonials';
import { TrustStrip } from '#components/sections/TrustStrip';
import { seo } from '#lib/seo';

export const Route = createFileRoute('/')({
  head: () => {
    const { meta, links } = seo({ url: '/' });

    return { meta, links };
  },
  component: HomePage,
});

function HomePage() {
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
