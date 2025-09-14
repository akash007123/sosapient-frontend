import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const GoogleReviews: React.FC = () => {
  const reviews = [
    { id: 1, image: './google/11.png' },
    { id: 2, image: './google/22.png' },
    { id: 3, image: './google/33.png' },
    { id: 4, image: './google/44.png' },
    { id: 5, image: './google/55.png' },
    { id: 6, image: './google/11.png' },
    { id: 7, image: './google/22.png' },
  ];

  // Group reviews into pairs
  const reviewPairs = [];
  for (let i = 0; i < reviews.length; i += 2) {
    reviewPairs.push(reviews.slice(i, i + 2));
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewPairs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviewPairs.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewPairs.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewPairs.length) % reviewPairs.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-[0.03]">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl dark:mix-blend-screen"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Google Reviews Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                <Star className="w-3.5 h-3.5 mr-1.5" />
                Customer Reviews
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                See What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients Say</span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Don't just take our word for it - check out what our satisfied customers have to say.
              </p>
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                <div className="relative">
                  <img 
                    src="https://exportcomments.com/resources/content/images/2022/05/google-reviews-1-.png" 
                    className="w-full rounded-xl " 
                    alt="Google-Reviews" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Reviews Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 -translate-x-1/2"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 translate-x-1/2"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Carousel */}
              <div className="relative h-[280px] overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {reviewPairs[currentIndex].map((review, index) => (
                        <div key={review.id} className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200 from-blue-500 to-purple-600"></div>
                          <div className="relative h-full">
                            <img 
                              src={review.image} 
                              className="w-full h-full object-contain rounded-xl shadow-lg bg-white" 
                              alt={`Review ${review.id}`} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center mt-4 space-x-1.5">
                {reviewPairs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-600 w-3' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;