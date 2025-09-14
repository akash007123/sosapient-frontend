import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Shashank Bhargawa',
      position: 'Dermatologist',
      company: 'Bhargawa Skins Care',
      avatar: './home/Doctor.png',
      content: 'Sosapient did an outstanding job developing my clinic website! It professional, user-friendly, and highly responsive. The appointment booking system works seamlessly,improving patient engagement. Highly recommend their services!',
      rating: 5,
      project: 'Clinic Website'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO at DataFlow',
      company: 'DataFlow Analytics',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Working with Sosapient was a game-changer for our startup. They built a scalable platform that grew with our business. Their technical expertise and collaborative approach made the entire process smooth.',
      rating: 5,
      project: 'Analytics Dashboard'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Product Manager at GreenTech',
      company: 'GreenTech Innovations',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'The mobile app Sosapient developed for us exceeded all expectations. User engagement increased by 300% within the first month. Their UI/UX team really understands how to create intuitive experiences.',
      rating: 5,
      project: 'Mobile Application'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Founder at FinanceFlow',
      company: 'FinanceFlow Ltd',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Security and performance were our top priorities, and Sosapient delivered on both fronts. Their fintech solution handles thousands of transactions daily without any issues. Truly impressive work.',
      rating: 5,
      project: 'Fintech Platform'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900">
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about 
            working with Sosapient and the results we've delivered.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].position}
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>

              {/* Project Badge */}
              <div className="text-center mt-4">
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                  Project: {testimonials[currentIndex].project}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;