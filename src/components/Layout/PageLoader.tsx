import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const PageLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
          className="inline-block p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4"
        >
          <Code className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg font-medium text-gray-700 dark:text-gray-300"
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;