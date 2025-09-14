import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ClipboardList, 
  Palette, 
  Code2, 
  TestTube2, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProcessSection: React.FC = () => {
  const processSteps = [
    {
      icon: Search,
      title: "Discover Workshop",
      image: "./home/process1.png",
      description: "We prioritize understanding and documenting our clients' inputs, design, and branding preferences with utmost importance. By clarifying all open-ended points, we ensure a precise and clear understanding of both the client's and the project's goals. Our collaborative approach involves key stakeholders to bring alignment and harmony to the business process.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ClipboardList,
      title: "Planning",
      image: "./home/process2.png",
      description: "Our services emphasize meticulous project planning, eliminating assumptions to prevent miscommunication. We outline our process in detail, define comprehensive technical specifications, and establish design and branding guidelines. We then seek client confirmation and approval on all documents and materials before proceeding",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Palette,
      title: "Design",
      image: "./home/process3.png",
      description: "We offer clients specialized UI designs for web, tablet, and mobile platforms, tailored to the approved wireframes and design guidelines. As a trusted partner, we deliver clickable prototypes via the Invision platform, along with source files in Photoshop or Sketch formats. Our goal at this stage is to ensure system UI designs are approved and confirmed by the client.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Code2,
      title: "Development",
      image: "./home/process4.png",
      description: "At this stage, we cater to requirements for frontend, backend, web services, and API development integration. Along with preparing a strategy for Agile Scrum methodology, we factor in aspects such as scalability, multi-tenancy, third-party integration, and crafting an optimized, clean code structure using cutting-edge technologies. We ensure that clients' feedback is involved and implemented in each sprint and milestone.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TestTube2,
      title: "Testing",
      image: "./home/process5.png",
      description: "We manually test each sprint, identify bugs, and add them to the product backlog. After fixing these bugs, we deliver a quality release and send the final sprint demo for client approval. We ensure thorough regression testing to guarantee the proper functioning of all previously approved milestones and sprints.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Settings,
      title: "Maintainance",
      image: "./home/process6.png",
      description: "Our commitment extends beyond development; we go the extra mile for our clients. Through an Agile approach, we ensure continuous product enhancement. We conduct regular security audits, weekly code backups, and constant system upgrades. Additionally, we test the entire system monthly to identify and fix any incompatibilities or errors. We also monitor traffic and server load, optimizing as needed to ensure peak performance.",
      color: "from-red-500 to-red-600"
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
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How We <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We partner on projects of all sizes with a diverse range of clients – from boutique brands to industry leaders.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left side - Image */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                    <div className="relative">
                      <img 
                        src={step.image} 
                        className="w-full rounded-2xl shadow-xl" 
                        alt={step.title} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Right side - Content */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${step.color} mr-4`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    {step.description}
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
                  >
                    Learn more about {step.title.toLowerCase()}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </div>
              </div>

              {/* Connector line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-24 bg-gradient-to-b from-blue-500 to-purple-600 -translate-x-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to start your project?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your ideas into reality with our proven process.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;