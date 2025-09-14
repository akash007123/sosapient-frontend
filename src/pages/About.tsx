import React from 'react';
import { motion } from 'framer-motion';
import '../index.css';
import { 
  Users, 
  Target, 
  Award, 
  Zap,
  Calendar,
  Heart
} from 'lucide-react';
import CoreValues from './About/CoreValues';
import ServicesSection from './About/ServicesSection';
import WhatWeDoSection from './About/WhatWeDoSection';
import { Helmet } from 'react-helmet';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Akash Raikwar',
      position: 'CEO & Founder',
      image: 'https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg',
      bio: 'Visionary leader with 5+ years in tech industry'
    },
    {
      name: 'Ritu Chouhan',
      position: 'CTO & Head of Operations',
      image: 'https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg',
      bio: 'Technical expert specializing in scalable architectures'
    },
    {
      name: 'Prakash Bankhede',
      position: 'Head of Marketing & Design',
      image: 'https://static.vecteezy.com/system/resources/previews/043/361/860/non_2x/hand-drawnman-avatar-profile-icon-for-social-networks-forums-and-dating-sites-user-avatar-profile-placeholder-anonymous-user-male-no-photo-web-template-default-user-picture-profile-male-symbol-free-vector.jpg',
      bio: 'Creative designer focused on user-centered solutions'
    },
  ];

  const milestones = [
    { year: '2022', event: 'Company Founded', description: 'Started as a small team with big dreams' },
    { year: '2023', event: 'First Major Client', description: 'Landed our first Fortune 500 company' },
    { year: '2024', event: 'Team Expansion', description: 'Grew to 25 talented professionals' },
    { year: '2024', event: 'Global Recognition', description: 'Won "Best Software Company" award' },
    { year: '2025', event: '50+ Projects', description: 'Crossed milestone of 50 successful projects' },
    { year: '2025', event: 'Innovation Hub', description: 'Opened our state-of-the-art innovation center' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every project we undertake'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our interactions'
    }
  ];

  return (
    <>

<Helmet>
        <title>SoSapient - About</title>
        <meta 
          name="description" 
          content="SoSapient is a leading IT software development company dedicated to transforming ideas into cutting-edge 
          solutions. With a passion for innovation and a commitment to excellence, we specialize in crafting bespoke software 
          applications that drive business growth and success." 
        />
        <meta 
          name="keywords" 
          content="Custome Website Development, Website Development, Website Developer, Web Development,
          Web Development Training, App Development, website designing company in ujjain, website design company, website development company" 
        />
        <meta 
          name="keywords" 
          content=". Boost your skills in software engineering and web development with our expert training programs. Join our software company for internships and hands-on experience that sets you apart in the tech industry!" 
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="About Us" />
        <meta 
          property="og:description" 
          content="SoSapient is a leading IT software development company dedicated to transforming ideas into cutting-edge 
          solutions. With a passion for innovation and a commitment to excellence, we specialize in crafting bespoke software 
          applications that drive business growth and success." 
        />
        <meta 
          http-equiv="origin-trial" 
          content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=" 
        />
        <meta 
          name="robots" 
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" 
        />
        <meta property="og:url" content="https://sosapient.in/about" />
        <meta property="og:site_name" content="SoSapient" />
        <link rel="canonical" href="https://sosapient.in/about" />
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
              About{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Sosapient
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just a software company – we're your partners in digital transformation, 
              committed to turning your vision into reality through innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg opacity-90">
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and success in the digital age. We believe technology should be 
                accessible, powerful, and transformative.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 Our-Vision"
            >
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 mr-3 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To be the world's most trusted technology partner, known for delivering 
                exceptional solutions that shape the future of how businesses operate 
                and connect with their customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    <CoreValues/>
    <ServicesSection/>

      {/* Timeline */}
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
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, here's how we've grown 
              over the years to become a trusted technology partner.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 hidden lg:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className="lg:w-5/12 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-primary-500 mr-2" />
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Timeline Dot */}
                  <div className="lg:w-2/12 flex justify-center my-4 lg:my-0">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="lg:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our experienced leadership team combines technical expertise with 
              strategic vision to guide Sosapient's mission.
            </p>
          </motion.div>

          <WhatWeDoSection/>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we interact 
              with our clients, partners, and each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Numbers that showcase our commitment to excellence and client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '20+', label: 'Happy Clients' },
              { value: '25+', label: 'Team Members' },
              { value: '98%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;