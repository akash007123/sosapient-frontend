import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatWeDoSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "100+",
      label: "Happy Clients",
      color: "text-blue-600"
    },
    {
      icon: Target,
      value: "200+",
      label: "Projects Completed",
      color: "text-purple-600"
    },
    {
      icon: Award,
      value: "10+",
      label: "Years Experience",
      color: "text-pink-600"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-4">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transforming Ideas into <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital Reality</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We are a team of passionate developers, designers, and strategists working together to create exceptional digital experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="./about/Group-132998.png" 
                className="w-full rounded-2xl shadow-xl" 
                alt="organization" 
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 z-20"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="./about/mukka.gif" 
                width="150px" 
                alt="mukka" 
                className="rounded-full shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;