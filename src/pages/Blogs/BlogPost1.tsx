import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  Check,
  Bookmark,
  ThumbsUp,
  Eye,
  ChevronRight
} from 'lucide-react';

const BlogPost1: React.FC = () => {
  const { id } = useParams();
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(42);

  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: 2,
    title: "Building Scalable Mobile Apps: Best Practices and Strategies",
    excerpt: "Learn the essential strategies for building mobile applications that can scale with your growing user base and handle millions of users seamlessly.",
    content: `
      <h3>In today's digital-first world, building a mobile app is not just about developing something functional — it's about ensuring it can scale with increasing users, features, and data without compromising performance. Whether you're a startup aiming for rapid growth or an enterprise launching mission-critical apps, scalability is the key to long-term success.</h3>
      <br/>
      <p>This blog outlines essential best practices and strategies for building scalable mobile applications in 2025 and beyond.</p>
      <br/>
      <h2><b>1. Design for Scalability from Day One</b></h2>
      <p>Scalability isn't something you bolt on later — it's baked into the system from the start.</p>
      <br/>
      <h3><b>Key practices:</b></h3>
      <ul>
        <li><strong>Modular architecture:</strong> Break down app features into independent modules or services.</li>
        <li><strong>Cloud-native mindset:</strong> Use cloud platforms like AWS, Google Cloud, or Azure for scalable backends.</li>
        <li><strong>Microservices or serverless:</strong> Architect your backend using microservices or functions (e.g., AWS Lambda) to isolate and scale individual services.</li>
      </ul>
      <br/>
      <h2><b>2. Choose the Right Tech Stack</b></h2>
      <p>Selecting the appropriate technologies for frontend and backend plays a major role in how well your app scales.</p>
      <br/>
      <h3><b>Frontend (Mobile):</b></h3>
      <ul>
        <li><strong>Cross-platform frameworks:</strong> Flutter and React Native can reduce code duplication while ensuring performance.</li>
        <li><strong>Native development:</strong> For resource-intensive apps, choose Swift (iOS) or Kotlin (Android).</li>
      </ul>
      <br/>
      <h3><b>Backend:</b></h3>
      <ul>
        <li><strong>Node.js, Python, Go, or Java:</strong> These languages offer mature ecosystems for building APIs and background services.</li>
        <li><strong>Database choice:</strong> Use NoSQL (like MongoDB) for unstructured, scalable data; use SQL (like PostgreSQL) when strong relational data consistency is needed.</li>
      </ul>
      <br/>
      <h2><b>3. Use Scalable Data Storage Solutions</b></h2>
      <p>Data is central to any mobile app. Choosing how and where it's stored is vital.</p>
      <br/>
      <h3><b>Recommendations:</b></h3>
      <ul>
        <li><strong>Cloud databases:</strong> Use scalable DBaaS platforms (Firebase, AWS DynamoDB, etc.)</li>
        <li><strong>Caching layers:</strong> Use Redis or Memcached to reduce DB load for frequent queries.</li>
        <li><strong>Data partitioning:</strong> Shard large datasets across databases or regions to manage load efficiently.</li>
      </ul>
      <br/>
      <h2><b>4. Implement Efficient APIs and Networking</b></h2>
      <p>Your app's performance hinges on how efficiently it communicates with the backend.</p>
      <br/>
      <h3><b>Best practices:</b></h3>
      <ul>
        <li><strong>RESTful or GraphQL APIs:</strong> Choose based on your data needs.</li>
        <li><strong>Pagination and lazy loading:</strong> Never load all data at once.</li>
        <li><strong>Rate limiting and retries:</strong> Prevent API overload and handle failures gracefully.</li>
        <li><strong>Compression and batching:</strong> Optimize data payload sizes for faster delivery.</li>
      </ul>
      <br/>
      <h2><b>5. Prioritize Performance Optimization</b></h2>
      <p>Scalability is closely tied to app performance, especially under heavy usage.</p>
      <br/>
      <h3><b>Mobile-side tips:</b></h3>
      <ul>
        <li>Lazy loading of components and images</li>
        <li>Reduce app bundle size</li>
        <li>Optimize animations and UI rendering</li>
      </ul>
      <br/>
      <h3><b>Backend-side tips:</b></h3>
      <ul>
        <li>Optimize query performance</li>
        <li>Asynchronous processing of heavy tasks</li>
        <li>Monitor response times and latency</li>
      </ul>
      <br/>
      <h2><b>6. Cloud Infrastructure and DevOps</b></h2>
      <p>A scalable app needs an equally scalable infrastructure and deployment strategy.</p>
      <br/>
      <h3><b>Key strategies:</b></h3>
      <ul>
        <li><strong>Auto-scaling services:</strong> Use cloud auto-scaling groups to handle load spikes.</li>
        <li><strong>CI/CD pipelines:</strong> Automate testing and deployment (GitHub Actions, Jenkins, GitLab CI).</li>
        <li><strong>Containerization:</strong> Use Docker and Kubernetes to manage services and scale them independently.</li>
        <li><strong>Monitoring and logging:</strong> Use tools like Prometheus, Grafana, ELK Stack, or Firebase Crashlytics.</li>
      </ul>
      <br/>
      <h2><b>7. Focus on Security and Data Privacy</b></h2>
      <p>As your user base grows, so does the risk surface. Scalable apps must be secure.</p>
      <br/>
      <h3><b>Security checklist:</b></h3>
      <ul>
        <li>Use HTTPS for all data transmission</li>
        <li>JWT tokens for authentication</li>
        <li>Role-based access control (RBAC)</li>
        <li>Encrypt sensitive data (both at rest and in transit)</li>
        <li>Regular security audits and vulnerability scanning</li>
      </ul>
      <br/>
      <h2><b>8. Enable Offline Functionality and Sync</b></h2>
      <p>To improve scalability and UX, your app should gracefully handle poor/no internet.</p>
      <br/>
      <h3><b>Features to implement:</b></h3>
      <ul>
        <li>Local data caching with Room, Core Data, or SQLite</li>
        <li>Background sync services</li>
        <li>Conflict resolution strategies</li>
      </ul>
      <p>This reduces backend load and improves responsiveness.</p>
      <br/>
      <h2><b>9. Analytics and Real-Time Monitoring</b></h2>
      <p>You can't scale what you can't measure. Use real-time analytics and crash reporting.</p>
      <br/>
      <h3><b>Tools to use:</b></h3>
      <ul>
        <li>Firebase Analytics</li>
        <li>Mixpanel or Amplitude</li>
        <li>Sentry or Crashlytics for error reporting</li>
        <li>New Relic or Datadog for backend monitoring</li>
      </ul>
      <p>Insights from analytics help improve app performance, identify bottlenecks, and forecast infrastructure needs.</p>
      <br/>
      <h2><b>10. Test Extensively and Continuously</b></h2>
      <p>Testing is critical for ensuring your app performs well as it scales.</p>
      <br/>
      <h3><b>Types of testing to consider:</b></h3>
      <ul>
        <li>Unit and integration tests</li>
        <li>UI and end-to-end testing (with tools like Appium or Detox)</li>
        <li>Load and stress testing for backend APIs</li>
        <li>Regression testing before every deployment</li>
      </ul>
      <p>Automate as much as possible with CI/CD tools to ensure reliability.</p>
      <br/>
      <h2><b>11. Optimize for App Store Growth</b></h2>
      <p>Scaling also means being prepared for user acquisition and retention.</p>
      <br/>
      <h3><b>Key practices:</b></h3>
      <ul>
        <li>App Store Optimization (ASO)</li>
        <li>Scalable push notification infrastructure (Firebase Cloud Messaging, OneSignal)</li>
        <li>A/B testing of features and onboarding flows</li>
        <li>Use analytics to personalize user journeys</li>
      </ul>
      <br/>
      <h2><b>12. Embrace Feedback Loops and Iteration</b></h2>
      <p>Scalable apps don't just run well — they evolve based on user feedback and data.</p>
      <br/>
      <h3><b>Actionable tips:</b></h3>
      <ul>
        <li>Collect user reviews and ratings</li>
        <li>Conduct user surveys and interviews</li>
        <li>Use feature flags and A/B tests for safe rollouts</li>
        <li>Iterate fast based on data, not assumptions</li>
      </ul>
      <br/>
      <h2><b>Conclusion</b></h2>
      <p>Building a scalable mobile app is not a one-time task — it's a continuous process of planning, monitoring, optimizing, and iterating. By following these best practices and strategies, developers and businesses can ensure their apps are ready for growth without compromising quality or user experience.</p>
      <br/>
      <p>Scalability isn't just about handling traffic; it's about future-proofing your app for what comes next — new markets, new features, and millions of happy users.</p>
    `,
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Ritu Chouhan",
    authorImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    date: "2025-01-10",
    readTime: "7 min read",
    category: "Mobile Development",
    tags: ["React Native", "Flutter", "Mobile", "Scalability"],
    views: 1234
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Building Scalable Mobile Apps: Best Practices',
      image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      date: '2024-01-10',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles That Drive Engagement',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      date: '2024-01-05',
      readTime: '6 min read'
    }
  ];

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    const text = blogPost.excerpt;
    const hashtags = blogPost.tags.map(tag => tag.replace(/\s+/g, '')).join(',');

    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${hashtags}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
          break;
      }
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${text}\n\nRead more at: ${url}`,
          url,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <>
    <Helmet>
  <title>{blogPost.title} | Web Development Trends 2025</title>
  <meta name="description" content={blogPost.excerpt} />
  
  {/* Standard meta tags */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content={blogPost.author} />
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content={blogPost.tags.join(', ') + ', web development trends, future of web, 2025 technology'} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={blogPost.title} />
  <meta property="og:description" content={blogPost.excerpt} />
  <meta property="og:image" content={blogPost.image} />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:site_name" content="Your Blog Name" />
  <meta property="article:published_time" content={new Date(blogPost.date).toISOString()} />
  <meta property="article:author" content={blogPost.author} />
  <meta property="article:section" content={blogPost.category} />
  {blogPost.tags.map(tag => (
    <meta property="article:tag" content={tag} key={tag} />
  ))}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={blogPost.title} />
  <meta name="twitter:description" content={blogPost.excerpt} />
  <meta name="twitter:image" content={blogPost.image} />
  <meta name="twitter:creator" content="@yourtwitterhandle" />
  <link rel="canonical" href={window.location.href} />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.title,
      "description": blogPost.excerpt,
      "image": blogPost.image,
      "author": {
        "@type": "Person",
        "name": blogPost.author,
        "url": "https://yourwebsite.com/about" 
      },
      "datePublished": new Date(blogPost.date).toISOString(),
      "dateModified": new Date(blogPost.date).toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": "Your Blog Name",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yourwebsite.com/logo.png" 
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "wordCount": blogPost.content.split(' ').length,
      "timeRequired": blogPost.readTime
    })}
  </script>
</Helmet>
    
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] min-h-[500px] w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        </div>
        
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">
                {blogPost.category}
              </span>
              <span className="text-white/80 text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readTime}
              </span>
              <span className="text-white/80 text-sm flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {blogPost.views.toLocaleString()} views
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {blogPost.excerpt}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/blog"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare()}
                className={`p-2 rounded-lg transition-colors ${
                  shareSuccess
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {shareSuccess ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
        >
          <img
            src={blogPost.authorImage}
            alt={blogPost.author}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{blogPost.author}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blogPost.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {blogPost.readTime}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm flex items-center"
              >
                <Tag className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Share this article
          </h3>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('facebook')}
              className="p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('twitter')}
              className="p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('linkedin')}
              className="p-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Related Articles */}
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
            {/* Related Article Cards */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Related article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-primary-500 dark:text-primary-400">
                  Web Development
                </span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  The Rise of AI in Web Development
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  How artificial intelligence is transforming the way we build websites...
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Related article"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-primary-500 dark:text-primary-400">
                  Technology
                </span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                  WebAssembly: The Future of Web Performance
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Exploring how WebAssembly is revolutionizing web application performance...
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </article>
    </div>
    </>
  );
};

export default BlogPost1;