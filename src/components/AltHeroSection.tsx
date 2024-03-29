import heroImage from '#assets/images/hero-alt.webp';
// import HeroIllustration from '#assets/images/hero-illustration.webp';

const AltHeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-16 flex flex-col items-center px-3 pb-6 sm:mb-20 sm:mt-20">
        <h1 className="animate-text mb-16 bg-gradient-to-r from-primary-600 via-rose-500 to-primary-600 bg-clip-text text-center text-5xl font-black text-transparent md:w-3/4 md:text-7xl  lg:text-9xl">
          FullStack Web Developer
        </h1>
        <p className="text-center text-xl text-dark-900 dark:text-white">
          Transforming Ideas into Immersive User Experiences with the Power of
          React and PHP
        </p>
      </div>
      <div>
        <img
          src={heroImage}
          alt=""
          aria-label=""
          className="mx-auto w-full md:w-2/3 lg:w-1/2"
        />
      </div>
    </div>
  );
};

export default AltHeroSection;
