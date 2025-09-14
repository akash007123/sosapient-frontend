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

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    console.log('Fetching blogs');
    try {
      setLoading(true);
      const response = await fetch('/api/blogs?limit=50');
      const data = await response.json();
      
      if (data.success) {
        // Transform the data to match the expected format
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
        // Warn if any post is missing a slug
        const missingSlugs = transformedPosts.filter((post: any) => !post.slug);
        if (missingSlugs.length > 0) {
          console.warn('Some blog posts are missing a slug:', missingSlugs);
        }
      } else {
        setError(data.error || 'Failed to fetch blogs.'); // Set error if API fails
        setBlogPosts([
          {
            id: '1',
            slug: 'the-future-of-web-development-trends-to-watch-in-2025',
            title: 'The Future of Web Development: Trends to Watch in 2025',
            excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to new frameworks...',
            image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            author: 'Akash Raikwar',
            authorImage: './blog/akash.jpg',
            date: '2025-06-13',
            readTime: '5 min read',
            category: 'Technology',
            tags: ['React', 'JavaScript', 'Web Development', 'Trends']
          },
          {
            id: '2',
            slug: 'building-scalable-mobile-apps-best-practices-and-strategies',
            title: 'Building Scalable Mobile Apps: Best Practices and Strategies',
            excerpt: 'Learn the essential strategies for building mobile applications that can scale with your growing user base...',
            image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            author: 'Ritu Chouhan',
            authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            date: '2025-01-10',
            readTime: '7 min read',
            category: 'Mobile Development',
            tags: ['React Native', 'Flutter', 'Mobile', 'Scalability']
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs. Please try again later.'); // Set error
      setBlogPosts([
        {
          id: '1',
          slug: 'the-future-of-web-development-trends-to-watch-in-2025',
          title: 'The Future of Web Development: Trends to Watch in 2025',
          excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to new frameworks...',
          image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
          author: 'Akash Raikwar',
          authorImage: './blog/akash.jpg',
          date: '2025-06-13',
          readTime: '5 min read',
          category: 'Technology',
          tags: ['React', 'JavaScript', 'Web Development', 'Trends']
        },
        {
          id: '2',
          slug: 'building-scalable-mobile-apps-best-practices-and-strategies',
          title: 'Building Scalable Mobile Apps: Best Practices and Strategies',
          excerpt: 'Learn the essential strategies for building mobile applications that can scale with your growing user base...',
          image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
          author: 'Ritu Chouhan',
          authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          date: '2025-01-10',
          readTime: '7 min read',
          category: 'Mobile Development',
          tags: ['React Native', 'Flutter', 'Mobile', 'Scalability']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blogs/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(['All', ...data.data]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories
      setCategories(['All', 'Technology', 'Design', 'Mobile Development', 'Web Development', 'AI/ML', 'Cybersecurity',]);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      <BlogGrid
        posts={filteredPosts}
      />
    </div>
  );
};

export default Blog;