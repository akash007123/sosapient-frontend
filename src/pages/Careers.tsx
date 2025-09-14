import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Users, 
  Heart, 
  Coffee,
  Laptop,
  Award,
  ArrowRight,
  X,
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    position: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: ''
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '45,0000 - 65,0000',
      experience: '4+ years',
      description: 'We are looking for a Senior Full-Stack Developer to join our engineering team and help build scalable web applications.',
      requirements: [
        '4+ years of experience in full-stack development',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Strong understanding of database design and optimization',
        'Experience with CI/CD pipelines and DevOps practices'
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Mentor junior developers',
        'Participate in code reviews and technical discussions',
        'Contribute to architectural decisions'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Unlimited PTO'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '35,0000 - 40,0000',
      experience: '2+ years',
      description: 'Join our design team to create beautiful and intuitive user experiences for our clients\' applications.',
      requirements: [
        '2+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, or Adobe XD',
        'Strong portfolio showcasing design process',
        'Understanding of user-centered design principles',
        'Experience with design systems and component libraries'
      ],
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with developers and product managers',
        'Maintain and evolve design systems',
        'Present design concepts to stakeholders'
      ],
      benefits: [
        'Competitive salary and benefits',
        'Remote work flexibility',
        'Design conference attendance',
        'Latest design tools and software',
        'Creative freedom and autonomy'
      ]
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      salary: '60,0000 - 80,0000',
      experience: '4+ years',
      description: 'Help us build and maintain robust infrastructure and deployment pipelines for our applications.',
      requirements: [
        '4+ years of DevOps/Infrastructure experience',
        'Experience with containerization (Docker, Kubernetes)',
        'Proficiency in cloud platforms and services',
        'Knowledge of Infrastructure as Code (Terraform, CloudFormation)',
        'Experience with monitoring and logging tools'
      ],
      responsibilities: [
        'Design and maintain CI/CD pipelines',
        'Manage cloud infrastructure and services',
        'Implement monitoring and alerting systems',
        'Ensure security and compliance standards',
        'Optimize system performance and costs'
      ],
      benefits: [
        'Competitive compensation package',
        'Health and wellness benefits',
        'Professional certification support',
        'Flexible working hours',
        'Stock options'
      ]
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '65,0000 - 75,0000',
      experience: '3+ years',
      description: 'Develop high-quality mobile applications for iOS and Android platforms using modern frameworks.',
      requirements: [
        '3+ years of mobile app development experience',
        'Proficiency in React Native or Flutter',
        'Experience with native iOS/Android development',
        'Knowledge of mobile app deployment processes',
        'Understanding of mobile UI/UX best practices'
      ],
      responsibilities: [
        'Develop cross-platform mobile applications',
        'Optimize app performance and user experience',
        'Integrate with APIs and third-party services',
        'Collaborate with designers and backend developers',
        'Maintain and update existing applications'
      ],
      benefits: [
        'Competitive salary and bonuses',
        'Comprehensive health coverage',
        'Mobile device allowance',
        'Learning and development opportunities',
        'Team building activities'
      ]
    },
    {
      id: 5,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '50,0000 - 65,0000',
      experience: '3+ years',
      description: 'Lead product strategy and work with cross-functional teams to deliver exceptional user experiences.',
      requirements: [
        '3+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership skills',
        'Technical background preferred'
      ],
      responsibilities: [
        'Define product roadmap and strategy',
        'Gather and prioritize product requirements',
        'Work closely with engineering and design teams',
        'Analyze user feedback and market trends',
        'Drive product launches and go-to-market strategies'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive benefits package',
        'Professional development budget',
        'Flexible work environment',
        'Leadership training opportunities'
      ]
    },
    {
      id: 6,
      title: 'Junior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '40,0000 - 55,0000',
      experience: '1-2 years',
      description: 'Start your career with us as a Junior Frontend Developer and grow your skills in modern web development.',
      requirements: [
        '1-2 years of frontend development experience',
        'Proficiency in HTML, CSS, and JavaScript',
        'Basic knowledge of React or Vue.js',
        'Understanding of responsive design principles',
        'Eagerness to learn and grow'
      ],
      responsibilities: [
        'Develop user interfaces for web applications',
        'Collaborate with senior developers and designers',
        'Write clean, maintainable code',
        'Participate in code reviews and team meetings',
        'Learn new technologies and best practices'
      ],
      benefits: [
        'Competitive entry-level salary',
        'Mentorship program',
        'Health and dental insurance',
        'Remote work flexibility',
        'Career growth opportunities'
      ]
    },
    {
      id: 7,
      title: 'Frontend Developer Intern',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '18,0000 - 22,0000',
      experience: '0-1 years',
      description: 'Kickstart your development career with us as a Frontend Developer Intern. We’re looking for someone passionate about web development who wants to grow in a supportive and fast-paced environment. You will work alongside experienced engineers and designers, gaining hands-on experience in building responsive, modern web interfaces.',
      requirements: [
        '0-1 years of frontend development experience',
        'Proficiency in HTML, CSS, and JavaScript',
        'Basic knowledge of React or Angular',
        'Understanding of responsive design principles',
        'Eagerness to learn and grow'
      ],
      responsibilities: [
        'Build and maintain user-friendly interfaces for web applications',
        'Collaborate with senior developers and UI/UX designers',
        'Write clean, well-documented, and maintainable code',
        'Participate in regular team meetings, code reviews, and agile ceremonies',
        'Stay up-to-date with the latest web technologies and frameworks'
      ],
      benefits: [
        'Competitive entry-level salary',
        'Remote-first work culture',
        'Mentorship and training from experienced professionals',
        'Health and dental insurance',
        'Clear career path and professional growth opportunities'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance for you and your family.'
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, unlimited PTO, and remote work options.'
    },
    {
      icon: Laptop,
      title: 'Latest Technology',
      description: 'Top-of-the-line equipment and access to the latest development tools.'
    },
    {
      icon: Award,
      title: 'Growth Opportunities',
      description: 'Professional development budget, conference attendance, and career advancement.'
    }
  ];

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setApplicationData(prev => ({
      ...prev,
      position: job.title
    }));
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      // Validate required fields
      if (!applicationData.name || !applicationData.email || !applicationData.experience || !applicationData.resume) {
        throw new Error('Please fill in all required fields');
      }

      // Log the file details for debugging
      console.log('File details:', {
        name: applicationData.resume.name,
        type: applicationData.resume.type,
        size: applicationData.resume.size
      });

      const formData = new FormData();
      
      // Append all form fields
      Object.entries(applicationData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'resume' && value instanceof File) {
            formData.append('resume', value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setNotification({
        type: 'success',
        message: 'Application submitted successfully!'
      });

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setApplicationData({
          name: '',
          email: '',
          phone: '',
          resume: null,
          coverLetter: '',
          position: '',
          experience: '',
          currentCompany: '',
          expectedSalary: '',
          noticePeriod: ''
        });
        setNotification(null);
      }, 2000);

    } catch (error) {
      console.error('Application submission error:', error);
     
      
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit application'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career`);
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Handle edit
  const handleEdit = (application: any) => {
    setSelectedApplication(application);
    setApplicationData({
      name: application.name,
      email: application.email,
      phone: application.phone || '',
      resume: null,
      coverLetter: application.coverLetter || '',
      position: application.position,
      experience: application.experience,
      currentCompany: application.currentCompany || '',
      expectedSalary: application.expectedSalary || '',
      noticePeriod: application.noticePeriod || ''
    });
    // setIsEditModalOpen(true);
  };

  // Handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(applicationData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'resume' && value instanceof File) {
            formData.append('resume', value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career/${selectedApplication._id}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update application');
      }

      setNotification({
        type: 'success',
        message: 'Application updated successfully!'
      });

      // Update local state
      setApplications(applications.map(app => 
        app._id === selectedApplication._id ? { ...app, ...applicationData } : app
      ));

      // Close modal after 2 seconds
      setTimeout(() => {
        // setIsEditModalOpen(false);
        setNotification(null);
      }, 2000);

    } catch (error) {
      console.error('Application update error:', error);
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update application'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Helmet>
        <title>SoSapient - Career</title>
        <meta name="description" content="Gain an edge in the competitive world of web development with our comprehensive guide. Discover the secrets of successful web development and kickstart your career today" />
        <meta name="description" content="Looking to become a software engineer? Our expert advice and practical tips will empower you to achieve excellence. Don't miss out on this invaluable resource" />
        <meta name="description" content="Web Development Training: Unlocking Opportunities for Job Placement and Future Growth" />
        <meta name="description" content="Become a Web Development Pro: Valuable Tips for Aspiring Developers Web Development Training Made Easy: The Key to Landing Your Dream Job" />
        <meta name="description" content="Are you a web development trainee or intern? Our training program offers the perfect platform to hone your skills and secure job placement in this rapidly growing industry." />
        <meta name="description" content="Tired of searching for the perfect job? Our web development training program guarantees the skills and experience you need for job placement and long-term success." />
        
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Career" />
        <meta property="og:description" content="SoSapient is a cluster of the brightest stars working with cutting-edge technologies. Their purpose is anchored in a single truth – bringing real positive changes in an increasingly virtual world." />
        <meta property="og:url" content="https://sosapient.in/career" />
        <meta property="og:site_name" content="SoSapient" />
        
        <meta http-equiv="origin-trial" content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        <link rel="canonical" href="https://sosapient.in/career" />
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
              Join Our{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Be part of a dynamic team that's shaping the future of technology. 
              We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary-500" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-primary-500" />
                <span>Award-Winning Culture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
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
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in creating an environment where our team members can thrive, 
              grow, and make meaningful contributions to innovative projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
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
              Current Openings
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our current job opportunities and find the perfect role to advance your career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {job.department}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(job)}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Apply for {selectedJob?.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  notification.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                }`}
              >
                {notification.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <p className={
                  notification.type === 'success'
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }>
                  {notification.message}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                    placeholder="e.g., 5 years"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={applicationData.currentCompany}
                    onChange={(e) => setApplicationData({...applicationData, currentCompany: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    value={applicationData.expectedSalary}
                    onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
                    // placeholder="e.g., $100,000 - $120,000"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notice Period
                </label>
                <input
                  type="text"
                  value={applicationData.noticePeriod}
                  onChange={(e) => setApplicationData({...applicationData, noticePeriod: e.target.value})}
                  placeholder="e.g., 30 days"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApplicationData({...applicationData, resume: e.target.files?.[0] || null})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter
                </label>
                <textarea
                  rows={4}
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  placeholder="Tell us why you're interested in this position..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals. Send us your resume 
              and we'll keep you in mind for future opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Send Your Resume
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Careers;