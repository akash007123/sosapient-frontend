import React, { useState, useEffect } from 'react';
import BlogHero from '../components/Blog/BlogHero';
import BlogSearch from '../components/Blog/BlogSearch';
import BlogGrid from '../components/Blog/BlogGrid';

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

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Fetch blogs whenever page, search, or category changes
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let url = `/api/blogs?page=${currentPage}&limit=6`;
      if (selectedCategory && selectedCategory !== 'All') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        const transformedPosts = data.data.map((post: any) => ({
          id: post._id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          image: post.image,
          author: post.author.name,
          authorImage: post.author.image,
          date: post.publishedAt || post.createdAt,
          readTime: post.readTime,
          category: post.category,
          tags: post.tags
        }));
        setBlogPosts(transformedPosts);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setError(data.error || 'Failed to fetch blogs.');
        setBlogPosts([]);
      }
    } catch (error) {
      setError('Error fetching blogs. Please try again later.');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const defaultCategories = ['All', 'Technology', 'Design', 'Mobile Development', 'Web Development', 'AI/ML', 'Cybersecurity', 'Business', 'Tutorial'];

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blogs/categories');
      const data = await response.json();
      if (data.success && data.data.length < 3) {
        setCategories(defaultCategories);
      } else if (data.success) {
        setCategories(['All', ...data.data]);
      }
    } catch (error) {
      setCategories(defaultCategories);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <BlogHero />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <BlogHero />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-600 dark:text-red-400 text-lg font-semibold">{error}</div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <BlogHero />
      <BlogSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <BlogGrid posts={blogPosts} />
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center my-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded ${currentPage === idx + 1 ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;