import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LatestBlog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage?: string;
  slug: string;
}

const storageKey = "latest_blog_popup_dismissed_at";
const sessionKey = "latest_blog_popup_shown_session";

const normalizeUrl = (url: string) => {
  if (!url) return url;
  return url.startsWith("/uploads")
    ? `${import.meta.env.VITE_BASE_URL}${url}`
    : url;
};

const LatestBlogPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<LatestBlog | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location &&
      window.location.pathname !== "/"
    ) {
      setLoading(false);
      return;
    }

    if (sessionStorage.getItem(sessionKey)) {
      setLoading(false);
      return;
    }

    const dismissedAt = localStorage.getItem(storageKey);
    if (dismissedAt) {
      const last = Number(dismissedAt);
      const hoursSince = (Date.now() - last) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setLoading(false);
        return;
      }
    }

    const fetchLatest = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/blogs?limit=1`
        );
        const data = await res.json();
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const post = data.data[0];
          const transformed: LatestBlog = {
            id: post._id,
            title: post.title,
            excerpt: post.excerpt,
            image: normalizeUrl(post.image),
            author: post?.author?.name || "Unknown Author",
            authorImage: normalizeUrl(post?.author?.image),
            slug: post.slug,
          };
          setBlog(transformed);
          setOpen(true);
          sessionStorage.setItem(sessionKey, "1");
        }
      } catch (_) {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  const dismiss = () => {
    localStorage.setItem(storageKey, String(Date.now()));
    setOpen(false);
  };

  if (loading || !open || !blog) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-primary-900 dark:to-primary-800"
          >
            {/* Close Button */}
            <button
              aria-label="Close"
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-2 bg-white/90 dark:bg-primary-700/70 hover:scale-110 transition shadow"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <a href={`/blog/${blog.slug}`} className="block group relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 md:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              </a>

              {/* Blog Info */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-700/50 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
                    ✨ New on our Blog
                  </span>
                  <a href={`/blog/${blog.slug}`} className="block mt-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug hover:text-primary-600 dark:hover:text-primary-400 transition">
                      {blog.title}
                    </h3>
                  </a>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-4">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3">
                  {blog.authorImage && (
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-500"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {blog.author}
                    </p>
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                    >
                      Read now →
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-5 py-2 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    Open Article
                  </a>
                  <button
                    onClick={dismiss}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LatestBlogPopup;
