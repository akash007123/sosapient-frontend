import React from 'react';
import { Link } from 'react-router-dom';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/12 px-4"></div>

          <div className="w-full md:w-5/12 px-4 mb-8 md:mb-0">
            <div className="overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
              <img 
                src="./about/alt-services-pic1.jpg" 
                className="w-full h-auto" 
                alt="alt-services-pic1" 
              />
            </div>
          </div>

          <div className="w-full md:w-6/12 px-4">
            <h2 className="text-black font-bold text-3xl mb-4">
              Elevate Your Business with Exceptional Design & Development
            </h2>
            <p className="mt-2 font-semibold leading-relaxed">
              To bring your vision to life, we collaborate with talented designers, frontend developers, 
              backend developers, software architects, and experts in web and app development.
            </p>
            <p className="leading-relaxed mt-5 text-gray-500">
              At Sosapient, we take our role as a technical institution seriously, striving to help our 
              clients find the perfect technological solutions. Unlike traditional agencies, we work 
              directly with you every step of the way to ensure success.
            </p>

            <div className="mt-8">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-6/12 px-4 mb-4">
                  <p className="flex items-center">
                    <i className="bi bi-check-lg text-lg"></i>
                    <span className="ml-3 text-black text-lg font-bold">Business Support</span>
                  </p>
                </div>

                <div className="w-full md:w-6/12 px-4 mb-4">
                  <p className="flex items-center">
                    <i className="bi bi-check-lg text-lg"></i>
                    <span className="ml-3 text-black text-lg font-bold">Software Development</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-4 mt-4">
                <div className="w-full md:w-6/12 px-4 mb-4">
                  <p className="flex items-center">
                    <i className="bi bi-check-lg text-lg"></i>
                    <span className="ml-3 text-black text-lg font-bold">App Development</span>
                  </p>
                </div>

                <div className="w-full md:w-6/12 px-4 mb-4">
                  <p className="flex items-center">
                    <i className="bi bi-check-lg text-lg"></i>
                    <span className="ml-3 text-black text-lg font-bold">Web Development</span>
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <span>Explore More</span>
                  <i className="bi bi-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;