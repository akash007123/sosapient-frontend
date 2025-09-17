import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
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
  Mail,
  MessageSquare,
  X,
} from "lucide-react";

// Simple sanitizer to reduce XSS risk without external deps
function sanitizeHtml(unsafeHtml: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(unsafeHtml || '', 'text/html');

    // Remove script and style tags
    doc.querySelectorAll('script, style, iframe, object, embed').forEach(el => el.remove());

    // Remove event handler attributes and javascript: URLs
    doc.querySelectorAll('*').forEach((el: Element) => {
      // Remove on* attributes
      [...(el as HTMLElement).attributes].forEach(attr => {
        const name = attr.name.toLowerCase();
        const value = attr.value || '';
        if (name.startsWith('on')) {
          (el as HTMLElement).removeAttribute(attr.name);
        }
        if ((name === 'href' || name === 'src') && value.trim().toLowerCase().startsWith('javascript:')) {
          (el as HTMLElement).removeAttribute(attr.name);
        }
      });
    });

    return doc.body.innerHTML;
  } catch {
    return '';
  }
}

// Helper function to safely parse date
function getValidDateString(dateValue: any, fallback: string = "") {
  if (!dateValue) return fallback;
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return fallback;
  return dateObj.toISOString();
}
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


const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [comments, setComments] = useState<Array<{name: string; email: string; comment: string; createdAt: string}>>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cText, setCText] = useState("");
  const [cSubmitting, setCSubmitting] = useState(false);
  const [cError, setCError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Invalid blog post URL: missing slug.");
      setLoading(false);
      return;
    }
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${slug}`);
        const data = await response.json();
        if (data.success) {
          const normalizeUrl = (url: string) => url?.startsWith('/uploads') ? `${import.meta.env.VITE_BASE_URL}${url}` : url;
          const normalized = {
            ...data.data,
            image: normalizeUrl(data.data.image),
            author: {
              ...data.data.author,
              image: normalizeUrl(data.data.author?.image)
            },
            sections: Array.isArray(data.data.sections)
              ? data.data.sections.map((s: any) => ({
                  ...s,
                  image: s?.image ? normalizeUrl(s.image) : s?.image
                }))
              : data.data.sections
          };
          setBlogPost(normalized);
          setLikes(typeof data.data?.likes === 'number' ? data.data.likes : 0);
          setIsLiked(Boolean(localStorage.getItem(`liked:${data.data._id}`)));
          setError(null);
          // Fetch related blogs after getting the main blog
          fetchRelatedBlogs(data.data.category, data.data._id);
          // Fetch comments for this blog
          fetchComments(slug!);
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

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!shareOpen) return;
      const target = e.target as Node;
      if (shareMenuRef.current && !shareMenuRef.current.contains(target)) {
        setShareOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShareOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [shareOpen]);

  const fetchRelatedBlogs = async (category: string, currentBlogId: string) => {
    try {
      setRelatedLoading(true);
      const normalizeUrl = (url: string) => url?.startsWith('/uploads') ? `${import.meta.env.VITE_BASE_URL}${url}` : url;
      // Fetch blogs from the same category, excluding the current blog
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs?category=${encodeURIComponent(category)}&limit=4&status=published`);
      const data = await response.json();
      if (data.success) {
        // Filter out the current blog and limit to 2 related blogs
        const filtered = data.data
          .filter((blog: any) => blog._id !== currentBlogId)
          .map((b: any) => ({
            ...b,
            image: normalizeUrl(b.image)
          }))
          .slice(0, 2);
        setRelatedBlogs(filtered);
      }
    } catch (err) {
      console.error('Error fetching related blogs:', err);
      // Fallback: fetch any recent blogs if category-based fetch fails
      try {
        const normalizeUrl = (url: string) => url?.startsWith('/uploads') ? `${import.meta.env.VITE_BASE_URL}${url}` : url;
        const fallbackResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs?limit=3&status=published`);
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.success) {
          const filtered = fallbackData.data
            .filter((blog: any) => blog._id !== currentBlogId)
            .map((b: any) => ({
              ...b,
              image: normalizeUrl(b.image)
            }))
            .slice(0, 2);
          setRelatedBlogs(filtered);
        }
      } catch (fallbackErr) {
        console.error('Error fetching fallback blogs:', fallbackErr);
      }
    } finally {
      setRelatedLoading(false);
    }
  };

  // Fetch comments for current blog by slug
  const fetchComments = async (postSlug: string) => {
    try {
      setCommentsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${postSlug}/comments`);
      const json = await res.json();
      if (json.success) {
        setComments(json.data || []);
      }
    } catch (e) {
      // ignore
    } finally {
      setCommentsLoading(false);
    }
  };

  // Submit a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogPost?._id) return;
    setCError(null);
    const emailOk = /.+@.+\..+/.test(cEmail.trim());
    if (!cName.trim() || !emailOk || !cText.trim()) {
      setCError('Please provide valid name, email and comment.');
      return;
    }
    try {
      setCSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogPost._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cName.trim(), email: cEmail.trim(), comment: cText.trim() })
      });
      const json = await res.json();
      if (json.success) {
        // Optimistically prepend
        const createdAt = json.data?.createdAt || new Date().toISOString();
        setComments(prev => [{ name: json.data.name, email: json.data.email, comment: json.data.comment, createdAt }, ...prev]);
        setCommentModalOpen(false);
        setCName("");
        setCEmail("");
        setCText("");
      } else {
        setCError(json.message || 'Failed to add comment');
      }
    } catch (err) {
      setCError('Network error while adding comment');
    } finally {
      setCSubmitting(false);
    }
  };

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
          content={getValidDateString(blogPost.publishedAt || blogPost.createdAt)}
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
              url: "https://sosapient.in/about",
            },
            datePublished: getValidDateString(blogPost.date),
            dateModified: getValidDateString(blogPost.date),
            publisher: {
        "@type": "Organization",
              name: "Your Blog Name",
              logo: {
          "@type": "ImageObject",
                url: "https://ik.imagekit.io/sentyaztie/Dlogo.png?updatedAt=1749928182723",
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
                onClick={async () => {
                  if (isLiked) return;
                  try {
                    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogPost._id}/like`, { method: 'POST' });
                    const data = await res.json();
                    if (data.success) {
                      setLikes(data.data?.likes ?? (likes + 1));
                      setIsLiked(true);
                      localStorage.setItem(`liked:${blogPost._id}`, '1');
                    }
                  } catch (e) {
                    // noop
                  }
                }}
                className={`p-2 rounded-lg ${isLiked ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <div className="flex">
                <ThumbsUp className={`w-5 h-5 ${isLiked ? 'text-blue-600' : ''}`} />
                <span className="ml-1 text-sm">{likes}</span>
                </div>
              </motion.button>
              <div className="relative" ref={shareMenuRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShareOpen((v) => !v)}
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

              {shareOpen && (
                <>
                <div className="fixed inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-[1px] z-40"></div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -2 }}
                  className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/80 dark:border-gray-700/60 rounded-xl shadow-2xl p-3 z-50"
                >
                  <div className="absolute -top-2 right-4 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-t border-l border-gray-200 dark:border-gray-700"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => { handleShare("facebook"); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Facebook className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Facebook</span>
                    </button>
                    <button onClick={() => { handleShare("twitter"); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Twitter className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Twitter</span>
                    </button>
                    <button onClick={() => { handleShare("linkedin"); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Linkedin className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">LinkedIn</span>
                    </button>
                    <button onClick={() => { const msg = encodeURIComponent(`${document.title} - ${window.location.href}`); window.open(`https://wa.me/?text=${msg}`, '_blank', 'width=600,height=400'); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Share2 className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">WhatsApp</span>
                    </button>
                    <button onClick={() => { const tg = encodeURIComponent(`${document.title} - ${window.location.href}`); window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${tg}`, '_blank', 'width=600,height=400'); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#24A1DE] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Share2 className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Telegram</span>
                    </button>
                    <button onClick={() => { const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`; window.open(reddit, '_blank', 'width=900,height=700'); setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-[#FF4500] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Share2 className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Reddit</span>
                    </button>
                    <button onClick={() => { const subject = encodeURIComponent(document.title); const body = encodeURIComponent(`${document.title}\n\n${window.location.href}`); window.location.href = `mailto:?subject=${subject}&body=${body}`; setShareOpen(false); }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Mail className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Email</span>
                    </button>
                    <button onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setShareSuccess(true); setShareOpen(false); setTimeout(() => setShareSuccess(false), 2000);} catch {} }} className="group flex flex-col items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <span className="w-10 h-10 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition">
                        <Share2 className="w-5 h-5" />
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">Copy link</span>
                    </button>
                  </div>
                </motion.div>
                </>
              )}
              </div>
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
            src={blogPost.author?.image || blogPost.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
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
                {getValidLocaleDate(blogPost.publishedAt || blogPost.createdAt)}
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
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(blogPost.content) }}
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
                  <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
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

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Comments
            </h3>
            <button
              onClick={() => setCommentModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <MessageSquare className="w-4 h-4" />
              Leave a comment
            </button>
          </div>

          {commentsLoading ? (
            <div className="text-gray-500 dark:text-gray-400">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400">Be the first to comment.</div>
          ) : (
            <ul className="space-y-4">
              {comments.map((c, idx) => (
                <li key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 dark:text-white">{c.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c.email}</div>
                  <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">{c.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Comment Modal */}
        {commentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setCommentModalOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Leave a comment</h4>
                <button onClick={() => setCommentModalOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {cError && <div className="mb-3 text-sm text-red-600">{cError}</div>}
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input value={cName} onChange={e => setCName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Comment</label>
                  <textarea value={cText} onChange={e => setCText(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Write your comment..." />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setCommentModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Cancel</button>
                  <button type="submit" disabled={cSubmitting} className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60">{cSubmitting ? 'Submitting...' : 'Submit'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

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
      </article>
    </div>
    </>
  );
};

export default BlogPost;
