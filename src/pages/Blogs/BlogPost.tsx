import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
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
  ChevronRight,
} from "lucide-react";

// Helper function to safely parse date
function getValidDateString(dateValue: any, fallback: string = "") {
  if (!dateValue) return fallback;
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return fallback;
  return dateObj.toISOString();
}
function getValidLocaleDate(dateValue: any, fallback: string = "Unknown date") {
  if (!dateValue) return fallback;
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return fallback;
  return dateObj.toLocaleDateString();
}

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!slug) {
      setError("Invalid blog post URL: missing slug.");
      setLoading(false);
      return;
    }
    const fetchBlog = async () => {
      console.log("Fetching blog post:", slug);
      setLoading(true);
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        console.log("Fetching blog post:", data.data);
        if (data.success) {
          setBlogPost(data.data);
          setError(null);
        } else {
          setError(data.message || "Blog post not found.");
        }
      } catch (err) {
        setError("Error fetching blog post.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }
  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Blog post not found."}
      </div>
    );
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Building Scalable Mobile Apps: Best Practices",
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
      date: "2024-01-10",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "UI/UX Design Principles That Drive Engagement",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
      date: "2024-01-05",
      readTime: "6 min read",
    },
  ];

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    const text = blogPost.excerpt;
    const hashtags = blogPost.tags
      .map((tag: string) => tag.replace(/\s+/g, ""))
      .join(",");
    if (platform) {
      let shareUrl = "";
      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(text)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}&hashtags=${hashtags}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            text
          )}`;
          break;
      }
      window.open(shareUrl, "_blank", "width=600,height=400");
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
        console.error("Error sharing:", error);
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
  <meta name="author" content={blogPost.author?.name || "Unknown Author"} />
  <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={
            blogPost.tags.join(", ") +
            ", web development trends, future of web, 2025 technology"
          }
        />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={blogPost.title} />
  <meta property="og:description" content={blogPost.excerpt} />
  <meta property="og:image" content={blogPost.image} />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:site_name" content="Your Blog Name" />
        <meta
          property="article:published_time"
          content={getValidDateString(blogPost.date)}
        />
  <meta property="article:author" content={blogPost.author?.name || "Unknown Author"} />
  <meta property="article:section" content={blogPost.category} />
        {blogPost.tags.map((tag: string) => (
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
            headline: blogPost.title,
            description: blogPost.excerpt,
            image: blogPost.image,
            author: {
        "@type": "Person",
              name: blogPost.author?.name || "Unknown Author",
              url: "https://yourwebsite.com/about",
            },
            datePublished: getValidDateString(blogPost.date),
            dateModified: getValidDateString(blogPost.date),
            publisher: {
        "@type": "Organization",
              name: "Your Blog Name",
              logo: {
          "@type": "ImageObject",
                url: "https://yourwebsite.com/logo.png",
              },
      },
            mainEntityOfPage: {
        "@type": "WebPage",
              "@id": window.location.href,
      },
            wordCount: blogPost.content.split(" ").length,
            timeRequired: blogPost.readTime,
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
                      ? "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {shareSuccess ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Share2 className="w-5 h-5" />
                  )}
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
            src={blogPost.author?.image || blogPost.authorImage || "https://via.placeholder.com/150"}
            alt={blogPost.author?.name || "Author"}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500"
          />
          <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {blogPost.author?.name || "Unknown Author"}
              </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {getValidLocaleDate(blogPost.date)}
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

        {/* Blog Sections */}
        {Array.isArray(blogPost.sections) && blogPost.sections.length > 0 && (
          <div className="mt-10 space-y-10">
            {blogPost.sections.map((section: any, idx: number) => (
              <div key={idx} className="border-t pt-8">
                {section.heading && (
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                )}
                {section.image && (
                  <img src={section.image} alt={section.heading || "Section image"} className="w-full max-h-96 object-cover rounded mb-4" />
                )}
                {section.content && (
                  <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag: string) => (
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
                onClick={() => handleShare("facebook")}
              className="p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("twitter")}
              className="p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                onClick={() => handleShare("linkedin")}
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
                    How artificial intelligence is transforming the way we build
                    websites...
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
                    Exploring how WebAssembly is revolutionizing web application
                    performance...
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

export default BlogPost;
