import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Palette,
  Database,
  Cloud,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./Service/HeroSection";
import ServiceSection from "./Service/ServiceSection";
import StrategicExecution from "./Service/StrategicExecution ";
import { Helmet } from "react-helmet";

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: "web-development",
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance and user experience.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Friendly",
        "Progressive Web Apps",
        "API Integration",
        "Database Design",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "Next.js",
        "Express",
        "MongoDB",
      ],
      gradient: "from-blue-500 to-cyan-500",
      price: "Starting from $5,000",
      timeline: "4-12 weeks",
    },
    {
      id: "mobile-development",
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android.",
      features: [
        "Cross-platform Development",
        "Native Performance",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "Analytics Integration",
      ],
      technologies: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Firebase",
        "Redux",
      ],
      gradient: "from-purple-500 to-pink-500",
      price: "Starting from $8,000",
      timeline: "6-16 weeks",
    },
    {
      id: "ui-ux-design",
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive designs that engage users and drive conversions through thoughtful user experience.",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Usability Testing",
        "Brand Identity",
        "Responsive Design",
      ],
      technologies: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "Principle",
        "Framer",
      ],
      gradient: "from-orange-500 to-red-500",
      price: "Starting from $3,000",
      timeline: "2-8 weeks",
    },
    {
      id: "backend-development",
      icon: Database,
      title: "Backend Development",
      description:
        "Scalable backend solutions with robust APIs, secure authentication, and optimized database architecture.",
      features: [
        "RESTful APIs",
        "GraphQL Integration",
        "Database Optimization",
        "Authentication & Security",
        "Microservices Architecture",
        "Third-party Integrations",
      ],
      technologies: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
      ],
      gradient: "from-green-500 to-teal-500",
      price: "Starting from $6,000",
      timeline: "4-10 weeks",
    },
    {
      id: "cloud-solutions",
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Cloud infrastructure setup, migration, and optimization for enhanced performance and scalability.",
      features: [
        "Cloud Migration",
        "Infrastructure as Code",
        "Auto-scaling Solutions",
        "Monitoring & Logging",
        "Backup & Recovery",
        "Cost Optimization",
      ],
      technologies: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Kubernetes",
        "Terraform",
        "Jenkins",
      ],
      gradient: "from-indigo-500 to-purple-500",
      price: "Starting from $4,000",
      timeline: "3-8 weeks",
    },
    {
      id: "cybersecurity",
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your applications and sensitive data from threats.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance Assessment",
        "Vulnerability Management",
        "Security Training",
        "Incident Response",
      ],
      technologies: [
        "OWASP",
        "Nessus",
        "Metasploit",
        "Wireshark",
        "Burp Suite",
        "Splunk",
      ],
      gradient: "from-red-500 to-pink-500",
      price: "Starting from $2,500",
      timeline: "2-6 weeks",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We start by understanding your business goals, target audience, and project requirements.",
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description:
        "Our design team creates wireframes and prototypes to visualize the final product.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "We build your solution using best practices and conduct thorough testing.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "We deploy your project and provide ongoing support and maintenance.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services - SoSapient</title>
        <meta
          http-equiv="origin-trial"
          content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="
        />
        <meta name="description" content="Contact us for better experience" />
        <meta name="robots" content="Contact us for better experience" />

        <meta
          name="keywords"
          content="Custome Website Development, Website Development, Website Developer, Web Development, Web Development Training, App Development, website designing company in ujjain, website design company, website development company"
        />
        <meta
          name="keywords"
          content="Elevate your business with our top-tier software development services. As a premier web development company, we create customized solutions tailored to your needs. Contact us today!"
        />

        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Contact us for better experience"
        />
        <meta
          name="twitter:description"
          content="Web development services we offer custom designs with platforms with WordPress, Drupal, Magento, Shopify, Angular, React, PHP, .Net etc. With our custom Web design and development services create a lead generation platform our businesses"
        />
        <meta property="og:url" content="https://sosapient.in/services" />
        <meta property="og:site_name" content="SoSapient" />
        <meta
          property="article:modified_time"
          content="2023-10-25T12:22:24+00:00"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://sosapient.in/services" />

        {/* Google verification */}
        <meta
          name="google-site-verification"
          content="LdQ1ZP-JDJl6atTPL-wChsFTW8nj-mHhiyOHnLswCf4"
        />
        <meta
          name="google-site-verification"
          content="02oqLWZkwHhC_VBUsg6rW7aLNYaNADmJW6iIMyk0qJg"
        />

        {/* Google Tag Manager */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KRM9M9LV');`}
        </script>
        {/* End Google Tag Manager */}
      </Helmet>
      <div className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                We offer comprehensive software development services to help
                your business succeed in the digital landscape. From web
                applications to mobile apps, we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>50+ Projects Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>98% Client Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>25+ Expert Developers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <HeroSection />

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient} mr-4`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{service.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/contact")}
                    className={`w-full py-3 bg-gradient-to-r ${service.gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We follow a proven methodology to ensure your project is
                delivered on time, within budget, and exceeds your expectations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200 transform -translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
                Let's discuss your requirements and create a solution that
                drives your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  View Portfolio
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <ServiceSection />
        <StrategicExecution />
      </div>
    </>
  );
};

export default Services;
