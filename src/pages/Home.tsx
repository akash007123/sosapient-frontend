import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import About from '../components/Home/About';
import TechStack from '../components/Home/TechStack';
import Testimonials from '../components/Home/Testimonials';
import BlogPreview from '../components/Home/BlogPreview';
import CTA from '../components/Home/CTA';
import FeaturesSection from '../components/Home/FeaturesSection';
import ProcessSection from '../components/Home/ProcessSection';
import FaqSection from '../components/Home/FaqSection ';
// import GoogleReviews from '../components/Home/GoogleReviews';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <TechStack />
      <FeaturesSection/>
      <ProcessSection/>
      <FaqSection/>
      {/* <GoogleReviews/> */}
      <Testimonials />
      <BlogPreview />
      <CTA />
    </>
  );
};

export default Home;