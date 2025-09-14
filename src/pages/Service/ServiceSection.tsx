import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h6 className="text-white font-bold">Look No Further</h6>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Experience UnbeatableInnivation With Our India-Based IT
                    Solutions
                  </h3>

                  <p className="text-lg text-blue-100">
                    At SoSapient, we offer a wide range of IT services tailored
                    to meet the unique needs of your business. With the
                    ever-evolving landscape of technology, staying ahead is not
                    just an advantage – it's a necessity. Let's work together to
                    create innovative solutions that drive your business
                    forward. Our team of experts is ready to help you achieve
                    your goals.
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
                <div className="relative">
                  <div className="relative z-10">
                    <img
                      src="./service/car3.png"
                      className="w-full rounded-2xl shadow-xl"
                      alt="Car illustration"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 z-20">
                    <img
                      src="./service/car22.png"
                      className="w-64 rounded-2xl shadow-xl"
                      alt="Additional illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
