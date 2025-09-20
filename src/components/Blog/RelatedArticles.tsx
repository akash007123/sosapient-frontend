import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar } from 'lucide-react';

// Helper function to safely parse date
function getValidLocaleDate(dateValue: any, fallback: string = "Unknown date"): string {
  if (!dateValue) return fallback;
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(dateObj);
}

interface RelatedBlog {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  publishedAt?: string;
  createdAt: string;
}

interface RelatedArticlesProps {
  relatedBlogs: RelatedBlog[];
  relatedLoading: boolean;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedBlogs, relatedLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Related Articles
        </h3>
        <Link
          to="/blog"
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedLoading ? (
          // Loading skeleton for related blogs
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mt-1"></div>
              </div>
            </div>
          ))
        ) : relatedBlogs.length > 0 ? (
          // Dynamic related blog cards
          relatedBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/blog/${blog.slug}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <span className="text-sm text-primary-500 dark:text-primary-400">
                    {blog.category}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {getValidLocaleDate(blog.publishedAt || blog.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          // No related blogs found
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No related articles found. 
              <Link to="/blog" className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 ml-1">
                Explore all articles →
              </Link>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RelatedArticles;