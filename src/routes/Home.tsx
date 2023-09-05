import BackToTop from '../components/BackToTop';
import Contact from '../components/Contact';
import Container from '../components/Container';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import LanguageAndTool from '../components/LanguageAndTool';
import RecentWork from '../components/RecentWork';

const Home = () => {
  return (
    <>
      <BackToTop />
      <main className="bg-gray-50 dark:bg-dark-900">
        <section
          id="hero"
          className="bg-[url('/src/assets/images/hero-pattern.svg')] bg-cover bg-no-repeat"
        >
          <Container>
            <HeroSection />
          </Container>
        </section>
        <section id="skills" className="pb-16">
          <div className="bg-blue-400 pb-40 pt-24">
            <h2 className="text-center font-serif text-4xl font-bold text-white drop-shadow-md lg:text-6xl">
              Skills
            </h2>
          </div>
          <Container>
            <LanguageAndTool />
          </Container>
        </section>
        <section className="pb-16 pt-24" id="projects">
          <Container>
            <h2 className="mb-16 text-center font-serif text-4xl font-bold capitalize text-dark-900 drop-shadow-md dark:text-gray-50 lg:text-6xl">
              My recent projects
            </h2>
            <RecentWork />
          </Container>
        </section>
        <section id="contact" className="bg-lime-400 pb-16 pt-24">
          <Container>
            <h2 className="mb-8 text-center font-serif text-4xl font-bold text-white drop-shadow-md lg:text-6xl">
              Get in touch with me
            </h2>
            <Contact />
          </Container>
        </section>
      </main>
      <footer className="bg-dark-900 pb-6 pt-24">
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};

export default Home;
