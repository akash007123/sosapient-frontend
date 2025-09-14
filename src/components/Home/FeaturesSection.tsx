import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Code, 
  Shield,
  Users,
  Zap,
  Globe,
  Server,
  Rocket,
  BarChart2,
  Smartphone
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end cybersecurity solutions to protect your business assets",
      color: "from-blue-500 to-blue-600",
      link: "/services/security"
    },
    {
      icon: Users,
      title: "Custom Solutions",
      description: "Tailored software designed specifically for your business needs",
      color: "from-purple-500 to-purple-600",
      link: "/services/custom-software"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites that drive conversions and engagement",
      color: "from-emerald-500 to-emerald-600",
      link: "/services/web-development"
    },
    {
      icon: Server,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure for growing businesses",
      color: "from-amber-500 to-amber-600",
      link: "/services/cloud"
    }
  ];

  const solutions = [
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "iOS and Android applications built with modern frameworks",
      link: "/solutions/mobile"
    },
    {
      icon: BarChart2,
      title: "Data Analytics",
      description: "Turn your data into actionable business insights",
      link: "/solutions/analytics"
    },
    {
      icon: Globe,
      title: "Global Deployment",
      description: "Worldwide infrastructure for international businesses",
      link: "/solutions/global"
    }
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-[0.03]">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Innovative Technology Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Business With Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expert Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver cutting-edge technology services designed to propel your business forward in the digital age.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
              <Link to={feature.link} className="relative h-full block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-10 mb-24 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to transform your business?</h3>
              <p className="text-blue-100 max-w-xl">Schedule a free consultation with our experts to discuss your project needs.</p>
            </div>
            <Link 
              to="/contact" 
              className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 shadow-sm transition-all"
            >
              Get Started
              <Rocket className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Solutions section */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img 
              src="./home/side7.png" 
              alt="Business solutions" 
              className="w-full rounded-xl border-4 border-white dark:border-gray-800"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Comprehensive <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital Solutions</span></h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our team of experts delivers end-to-end technology solutions designed to solve complex business challenges and drive growth.
            </p>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                    <solution.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <Link to={solution.link} className="block">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {solution.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link 
                to="/services" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View All Services
              </Link>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;