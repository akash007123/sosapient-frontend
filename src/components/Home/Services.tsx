import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Palette, 
  Database, 
  Cloud, 
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Node.js, and cloud services.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android with exceptional user experience.',
      features: ['React Native', 'Flutter', 'Native iOS/Android'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users and drive conversions for your business.',
      features: ['User Research', 'Prototyping', 'Design Systems'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Scalable backend solutions with robust APIs, database design, and server architecture.',
      features: ['API Development', 'Database Design', 'Microservices'],
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Cloud infrastructure setup, migration, and optimization for enhanced performance.',
      features: ['AWS/Azure/GCP', 'DevOps', 'Scalability'],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your applications and sensitive data.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance'],
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive software development services to help your business 
            succeed in the digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white dark:bg-primary-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-100 dark:border-primary-700"
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 mb-6">
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {/* <motion.div
                whileHover={{ x: 5 }}
                onClick={() => navigate('/services')}
                className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div> */}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
          >
            View All Services
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;