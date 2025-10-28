import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ClipboardList,
  Palette,
  Code2,
  TestTube2,
  Rocket,
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
      color: "from-blue-500 to-blue-600",
      contentBlocks: [
        {
          content: "Our discovery workshop begins with comprehensive stakeholder interviews and requirement gathering sessions. We employ proven methodologies to uncover business objectives, user needs, and technical constraints through collaborative workshops and interactive sessions.",
          borderColor: "border-blue-500"
        },
        {
          content: "We conduct competitive analysis and market research to identify industry trends and opportunities. This includes user persona development, journey mapping, and defining key performance indicators that align with your business goals and target audience needs.",
          borderColor: "border-green-500"
        },
        {
          content: "The final discovery deliverable includes a detailed project roadmap, scope document, and success metrics. We establish clear communication channels and project governance to ensure seamless collaboration throughout the development lifecycle.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: ClipboardList,
      title: "Planning",
      image: "./home/process2.png",
      description: "Our services emphasize meticulous project planning, eliminating assumptions to prevent miscommunication. We outline our process in detail, define comprehensive technical specifications, and establish design and branding guidelines. We then seek client confirmation and approval on all documents and materials before proceeding.",
      color: "from-purple-500 to-purple-600",
      contentBlocks: [
        {
          content: "We develop comprehensive project plans including timelines, resource allocation, and risk mitigation strategies. Our planning phase incorporates agile methodologies with clearly defined sprints, milestones, and deliverables to ensure project transparency and predictability.",
          borderColor: "border-blue-500"
        },
        {
          content: "Technical architecture planning involves selecting appropriate technologies, defining system architecture, and establishing development standards. We create detailed technical specifications, API documentation, and database design plans to guide the development team.",
          borderColor: "border-green-500"
        },
        {
          content: "Quality assurance planning includes test strategy development, test case creation, and performance benchmarking. We establish continuous integration and deployment pipelines to ensure code quality and rapid iteration throughout the project.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: Palette,
      title: "Design",
      image: "./home/process3.png",
      description: "We offer clients specialized UI designs for web, tablet, and mobile platforms, tailored to the approved wireframes and design guidelines. As a trusted partner, we deliver clickable prototypes via the Invision platform, along with source files in Photoshop or Sketch formats. Our goal at this stage is to ensure system UI designs are approved and confirmed by the client.",
      color: "from-pink-500 to-pink-600",
      contentBlocks: [
        {
          content: "Our design process begins with wireframing and information architecture development. We create low-fidelity mockups to establish layout, navigation, and user flow before progressing to high-fidelity visual designs that incorporate your brand identity.",
          borderColor: "border-blue-500"
        },
        {
          content: "We develop interactive prototypes that simulate the final user experience. These prototypes allow for user testing and validation before development begins, ensuring the design meets both business requirements and user expectations.",
          borderColor: "border-green-500"
        },
        {
          content: "Design system creation includes component libraries, style guides, and design documentation. We establish reusable design patterns and UI components to maintain consistency across all platforms and future iterations.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: Code2,
      title: "Development",
      image: "./home/process4.png",
      description: "At this stage, we cater to requirements for frontend, backend, web services, and API development integration. Along with preparing a strategy for Agile Scrum methodology, we factor in aspects such as scalability, multi-tenancy, third-party integration, and crafting an optimized, clean code structure using cutting-edge technologies. We ensure that clients' feedback is involved and implemented in each sprint and milestone.",
      color: "from-green-500 to-green-600",
      contentBlocks: [
        {
          content: "Our development follows agile methodologies with two-week sprints and regular demo sessions. We implement continuous integration and deployment practices to ensure code quality and rapid iteration. Each sprint delivers working, testable features with comprehensive documentation.",
          borderColor: "border-blue-500"
        },
        {
          content: "Backend development focuses on scalable architecture, secure APIs, and efficient database design. We implement robust authentication, authorization systems, and integrate with third-party services as required by the project specifications.",
          borderColor: "border-green-500"
        },
        {
          content: "Frontend development emphasizes responsive design, performance optimization, and accessibility standards. We build reusable components and ensure cross-browser compatibility while maintaining the design system established in previous phases.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: TestTube2,
      title: "Testing",
      image: "./home/process5.png",
      description: "We manually test each sprint, identify bugs, and add them to the product backlog. After fixing these bugs, we deliver a quality release and send the final sprint demo for client approval. We ensure thorough regression testing to guarantee the proper functioning of all previously approved milestones and sprints.",
      color: "from-yellow-500 to-yellow-600",
      contentBlocks: [
        {
          content: "Comprehensive testing strategy includes unit testing, integration testing, and end-to-end testing. We maintain high code coverage and implement automated testing pipelines to catch regressions early in the development cycle.",
          borderColor: "border-blue-500"
        },
        {
          content: "User acceptance testing involves stakeholders and end-users validating features against business requirements. We conduct usability testing sessions and gather feedback to ensure the product meets user expectations and business objectives.",
          borderColor: "border-green-500"
        },
        {
          content: "Performance and security testing ensure the application meets scalability requirements and security standards. We conduct load testing, security vulnerability assessments, and penetration testing to identify and address potential issues.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: Rocket,
      title: "Deployment",
      image: "./home/process6.png",
      description: "We handle the complete deployment process, ensuring smooth transition from development to production. This includes setting up production environments, configuring servers, implementing CI/CD pipelines, and performing final validation before launch. We ensure zero-downtime deployments and provide post-launch monitoring and support.",
      color: "from-indigo-500 to-indigo-600",
      contentBlocks: [
        {
          content: "Production environment setup includes server configuration, database setup, and deployment pipeline implementation. We establish monitoring, logging, and alerting systems to ensure application health and performance in production.",
          borderColor: "border-blue-500"
        },
        {
          content: "We implement blue-green deployment strategies to ensure zero-downtime releases. This includes database migration planning, feature flag implementation, and rollback procedures to minimize risk during deployment.",
          borderColor: "border-green-500"
        },
        {
          content: "Post-deployment validation includes smoke testing, performance benchmarking, and security scanning. We conduct final user acceptance testing in the production environment to ensure all features work as expected.",
          borderColor: "border-purple-500"
        }
      ]
    },
    {
      icon: Settings,
      title: "Maintenance",
      image: "./home/process6.png",
      description: "Our commitment extends beyond development; we go the extra mile for our clients. Through an Agile approach, we ensure continuous product enhancement. We conduct regular security audits, weekly code backups, and constant system upgrades. Additionally, we test the entire system monthly to identify and fix any incompatibilities or errors. We also monitor traffic and server load, optimizing as needed to ensure peak performance.",
      color: "from-red-500 to-red-600",
      contentBlocks: [
        {
          content: "Proactive monitoring and maintenance include 24/7 system monitoring, performance optimization, and regular security updates. We provide detailed monthly reports on system performance, usage metrics, and improvement recommendations.",
          borderColor: "border-blue-500"
        },
        {
          content: "Continuous improvement involves regular feature updates, bug fixes, and performance enhancements based on user feedback and analytics. We conduct quarterly reviews to identify opportunities for optimization and new feature development.",
          borderColor: "border-green-500"
        },
        {
          content: "Comprehensive support services include help desk support, emergency response, and regular system health checks. We maintain detailed documentation and provide training to ensure your team can effectively use and manage the system.",
          borderColor: "border-purple-500"
        }
      ]
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

        {/* Process steps - Redesigned to match the reference */}
        <div className="space-y-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left side - Step number and header */}
                <div className="lg:col-span-4">
                  <div className="flex items-center mb-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold mr-4`}>
                      {index + 1}
                    </div>
                    <div className="flex items-center">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${step.color} mr-4`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Image for mobile */}
                  <div className="lg:hidden mb-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                      <div className="relative">
                        <img 
                          src={step.image} 
                          className="w-full rounded-2xl shadow-lg" 
                          alt={step.title} 
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content blocks matching the reference style */}
                  <div className="space-y-4">
                    {step.contentBlocks.map((block, blockIndex) => (
                      <div 
                        key={blockIndex}
                        className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 transition-all duration-300 hover:shadow-md"
                        style={{ borderLeftColor: block.borderColor.replace('border-', '').split('-')[0] }}
                      >
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {block.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Image and description */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="hidden lg:block">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                        <div className="relative">
                          <img 
                            src={step.image} 
                            className="w-full rounded-2xl shadow-lg" 
                            alt={step.title} 
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Description */}
                    <div className="lg:col-span-1">
                      <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Process Overview
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {step.description}
                        </p>
                        {/* <motion.div
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium cursor-pointer"
                        >
                          Learn more about {step.title.toLowerCase()}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 bottom-0 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 -translate-x-1/2 translate-y-full"></div>
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