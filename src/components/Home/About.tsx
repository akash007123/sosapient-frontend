import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Target, 
  Zap,
  Building2,
  ClipboardList,
  Command,
  TrendingUp
} from 'lucide-react';


const About: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team of 25+ skilled developers and designers brings years of experience to every project.'
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Over 50 successful projects delivered for clients ranging from startups to Fortune 500 companies.'
    },
    {
      icon: Target,
      title: 'Client-Focused',
      description: 'We prioritize understanding your business goals to deliver solutions that drive real results.'
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Tech',
      description: 'We stay ahead of technology trends to build future-proof solutions for your business.'
    }
  ];

  return (
    <>
      <section className='py-24 bg-gradient-to-b from-white to-gray-50 dark:from-primary-900 dark:to-primary-950'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  About Us
                </h3>
                <h4 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
                  SoSapient is an offshore development centre located in Ujjain, Madhya Pradesh, India
                </h4>
                <div className="space-y-4 mt-6 text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">
                    At SoSapient, we are driven by innovation and committed to delivering cutting-edge technology solutions. 
                    With a passion for technology and a mission to empower businesses through digital transformation, we have 
                    established ourselves as a trusted partner in the IT industry.
                  </p>
                  <p className="leading-relaxed">
                    We're a dedicated team of creative designers and professional web developers. At SoSapient, 
                    we understand that the key to a successful digital presence is a seamless blend of design, quality, 
                    and user experience. Our solutions are specifically tailored to enhance your digital footprint, attract 
                    a larger customer base, and position your local business among industry leaders.
                  </p>
                </div>
                <Link 
                  to="/about"
                  className="inline-flex items-center mt-6 text-primary-600 hover:text-primary-700 font-medium group"
                >
                  <span>Read More</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Building2,
                    title: 'Innovation',
                    description: 'Innovation is the process of creating and implementing new ideas, products, services, or processes that bring about positive change or improvement.'
                  },
                  {
                    icon: ClipboardList,
                    title: 'Development',
                    description: 'Development is a broad and multifaceted term that can refer to several different contexts, including economic, social, personal, and organizational.'
                  },
                  {
                    icon: Command,
                    title: 'Creator',
                    description: 'Creator is a term commonly used to refer to individuals or entities that produce or bring something into existence.'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Success Formula',
                    description: 'Success in IT demands continuous learning, staying at the forefront of technology trends, and adapting to change.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="inline-flex p-3 bg-primary-100 dark:bg-primary-700 rounded-xl mb-4">
                      <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-center lg:text-left bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Why Choose Us
                </h2>
                <p className="text-xl font-semibold text-center lg:text-left text-gray-700 dark:text-gray-300">
                  At SoSapient, we stand out in the IT landscape for several reasons
                </p>
                <div className="space-y-4">
                  {[
                    'Industry Expertise: Trusted by businesses in hospitality, healthcare, retail, agriculture, education, real estate, e-commerce, finance, logistics, legal services, government sectors, automotive, manufacturing, and IT infrastructure.',
                    'Innovative Solutions: Stay ahead with the latest tech trends and innovative strategies',
                    'Customer-Centric Approach: Your success is our priority.',
                    'Affordable & Scalable: Solutions that grow with your business.',
                    'End-to-End IT Solutions: From development to marketing, we cover it all.',
                    'Cutting-Edge Technologies: Expertise in AI, cloud computing, IoT, and blockchain.'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                  <img 
                    src="./home/about.png" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                    alt="Why Choose Us"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;