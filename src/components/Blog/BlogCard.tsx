import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

function formatPrettyDate(dateValue: any, fallback: string = "Unknown date"): string {
  if (!dateValue) return fallback;
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
    .format(dateObj)
    .replace(",", "");
}


const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 2,
        scale: 1.02
      }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform-gpu perspective-1000"
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        <div className="absolute top-4 left-4">
          <motion.span 
            className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {post.category}
          </motion.span>
        </div>
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {post.title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={`${tag}-${tagIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{post.author}</span>
            </motion.div>
            {/* <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div> */}
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatPrettyDate(post.date)}</span>
          </div>
        </div>

        {/* Read More */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
        >
          <span>Read More</span>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>

      {/* Floating elements for 3D effect */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          y: [0, 10, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.article>
  );
};

export default BlogCard;