import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Shield, 
  Star, 
  Lightbulb, 
  Heart, 
  Users, 
  Crown, 
  BookOpen 
} from 'lucide-react';

const CoreValues: React.FC = () => {
  const values = [
    {
      icon: Trophy,
      image: "./about/Achievement.gif",
      alt: "Achievement",
      title: "Customer Success",
      description: "We measure our success by the success of our clients",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      image: "./about/Product%20quality.gif",
      alt: "Product quality",
      title: "Integrity",
      description: "Honesty and transparency in all our dealings",
      color: "text-purple-600"
    },
    {
      icon: Star,
      image: "./about/Product.gif",
      alt: "Product",
      title: "Quality",
      description: "Excellence in everything we deliver",
      color: "text-pink-600"
    },
    {
      icon: Lightbulb,
      image: "./about/Design%20inspiration.gif",
      alt: "Design inspiration",
      title: "Inspire",
      description: "Fostering creativity and innovation",
      color: "text-yellow-600"
    },
    {
      icon: Heart,
      image: "./about/Designer%20girl%20(1).gif",
      alt: "Designer",
      title: "Responsibility",
      description: "Taking ownership of our actions and commitments",
      color: "text-red-600"
    },
    {
      icon: Users,
      image: "./about/Team%20work.gif",
      alt: "Team work",
      title: "Team Work",
      description: "Collaboration and mutual support",
      color: "text-green-600"
    },
    {
      icon: Crown,
      image: "./about/leadership.gif",
      alt: "leadership",
      title: "Leadership",
      description: "Guiding and empowering others",
      color: "text-indigo-600"
    },
    {
      icon: BookOpen,
      image: "./about/Lesson.gif",
      alt: "Lesson",
      title: "Continuous Learning",
      description: "Always growing and improving",
      color: "text-cyan-600"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-4">
            Our Principles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Core <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At SoSapient, we are driven by the principles we truly believe in. 
            Our values direct our growth & provide us with the discipline to do what's best for our clients consistently.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-center mb-4">
                  <div className={`inline-flex p-3 rounded-lg ${value.color}`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={value.image} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    alt={value.alt} 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;