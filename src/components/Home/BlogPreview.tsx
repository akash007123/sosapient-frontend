import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApiBlogPost {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
  createdAt: string;
  readTime?: string;
  category: string;
  slug: string;
}

interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs?limit=3`);
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || 'Failed to load blogs');
        }
        const transformed: BlogItem[] = (data.data || []).map((post: ApiBlogPost) => ({
          id: post._id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.image,
          author: post?.author?.name || 'Unknown Author',
          date: post.publishedAt || post.createdAt,
          readTime: post.readTime || '5 min read',
          category: post.category,
          slug: post.slug,
        }));
        setPosts(transformed);
      } catch (e: unknown) {
        const error = e as Error;
        setError(error?.message || 'Unable to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-black/80">
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
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with our latest thoughts on technology, design, and 
            industry trends from our expert team.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 mb-12">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 mb-12">No posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
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
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
            >
              View All Posts
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview; 