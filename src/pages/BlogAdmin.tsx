import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Save, X, Upload, Tag, User, Calendar, BarChart3 } from 'lucide-react';

interface BlogSection {
  heading: string;
  content: string;
  image: string;
}

interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    email: string;
    image: string;
  };
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  views?: number;
  likes?: number;
  publishedAt?: string;
  createdAt?: string;
  sections: BlogSection[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

const BlogAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalBlogs: 0, totalViews: 0, categoryStats: [] });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const categories = ['Technology', 'Design', 'Mobile Development', 'Web Development', 'AI/ML', 'Cybersecurity', 'Business', 'Tutorial'];

  const initialBlogState: BlogPost = {
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: {
      name: 'Admin User',
      email: 'admin@sosapient.com',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    category: 'Technology',
    tags: [],
    status: 'draft',
    featured: false,
    sections: [
      { heading: '', content: '', image: '' }
    ],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs?limit=50`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSave = async () => {
    if (!editingBlog) return;

    try {
      setLoading(true);
      const formData = new FormData();
      
      console.log('=== FRONTEND SAVE DEBUG ===');
      console.log('editingBlog.tags:', editingBlog.tags);
      console.log('editingBlog.seo:', editingBlog.seo);
      console.log('editingBlog.seo.keywords:', editingBlog.seo?.keywords);
      console.log('Tags type:', typeof editingBlog.tags, 'Length:', editingBlog.tags?.length);
      console.log('Keywords type:', typeof editingBlog.seo?.keywords, 'Length:', editingBlog.seo?.keywords?.length);
      
      // Always append tags and seo fields, even if empty
      const tagsToSend = editingBlog.tags || [];
      const seoToSend = editingBlog.seo || { metaTitle: '', metaDescription: '', keywords: [] };
      
      formData.append('tags', JSON.stringify(tagsToSend));
      formData.append('seo', JSON.stringify(seoToSend));
      
      console.log('Force appending tags:', JSON.stringify(tagsToSend));
      console.log('Force appending seo:', JSON.stringify(seoToSend));

      // Only append other fields that have values and are not internal MongoDB fields
      Object.keys(editingBlog).forEach(key => {
        const value = editingBlog[key as keyof BlogPost];
        
        // Skip internal MongoDB fields, undefined/null values, and tags/seo (already handled above)
        if (key.startsWith('_') || key === '__v' || value === undefined || value === null || key === 'tags' || key === 'seo') {
          return;
        }
        
        if (key === 'author' || key === 'sections') {
          if (typeof value === 'object' && value !== null) {
            const stringifiedValue = JSON.stringify(value);
            console.log(`Appending ${key}:`, stringifiedValue);
            formData.append(key, stringifiedValue);
          } else if (typeof value === 'string' && value !== '') {
            formData.append(key, value);
          }
        } else if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else if (value !== '' && typeof value === 'string') {
          formData.append(key, value);
        }
      });

      const url = editingBlog._id ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
      const method = editingBlog._id ? 'PUT' : 'POST';
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(url, {
        method,
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchBlogs();
        await fetchStats();
        setIsEditing(false);
        setEditingBlog(null);
      } else {
        console.error('Server error:', data);
        alert(`Error: ${data.message || 'Failed to save blog post'}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Network error occurred while saving the blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (blog: BlogPost) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete?._id) return;

    try {
      setDeleting(true);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogToDelete._id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        // Update state immediately without refetching
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogToDelete._id));
        setStats(prevStats => ({
          ...prevStats,
          totalBlogs: prevStats.totalBlogs - 1
        }));
        setShowDeleteModal(false);
        setBlogToDelete(null);
      } else {
        console.error('Server error:', data);
        alert(`Error: ${data.message || 'Failed to delete blog post'}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Network error occurred while deleting the blog post');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog({ 
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      seo: blog.seo || {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingBlog({ 
      ...initialBlogState,
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBlog(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingBlog) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditingBlog({
          ...editingBlog,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tag: string) => {
    if (editingBlog && tag.trim()) {
      const currentTags = editingBlog.tags || [];
      if (!currentTags.includes(tag.trim())) {
        setEditingBlog({
          ...editingBlog,
          tags: [...currentTags, tag.trim()]
        });
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (editingBlog) {
      const currentTags = editingBlog.tags || [];
      setEditingBlog({
        ...editingBlog,
        tags: currentTags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  if (isEditing && editingBlog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingBlog._id ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter blog title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of the blog post..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* Sections */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sections
                  </label>
                  {editingBlog.sections.map((section, idx) => (
                    <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Heading</label>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={e => {
                            const newSections = [...editingBlog.sections];
                            newSections[idx].heading = e.target.value;
                            setEditingBlog({ ...editingBlog, sections: newSections });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded"
                          placeholder="Section heading..."
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Content</label>
                        <textarea
                          value={section.content}
                          onChange={e => {
                            const newSections = [...editingBlog.sections];
                            newSections[idx].content = e.target.value;
                            setEditingBlog({ ...editingBlog, sections: newSections });
                          }}
                          rows={4}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded"
                          placeholder="Section content..."
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={section.image}
                          onChange={e => {
                            const newSections = [...editingBlog.sections];
                            newSections[idx].image = e.target.value;
                            setEditingBlog({ ...editingBlog, sections: newSections });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded"
                          placeholder="Section image URL..."
                        />
                        {section.image && (
                          <img src={section.image} alt="Section" className="mt-2 w-full h-32 object-cover rounded" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newSections = editingBlog.sections.filter((_, i) => i !== idx);
                          setEditingBlog({ ...editingBlog, sections: newSections });
                        }}
                        className="text-xs text-red-600 hover:underline mt-2"
                        disabled={editingBlog.sections.length === 1}
                      >
                        Remove Section
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog({
                        ...editingBlog,
                        sections: [...editingBlog.sections, { heading: '', content: '', image: '' }]
                      });
                    }}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 text-xs"
                  >
                    + Add Section
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    {editingBlog.image ? (
                      <div className="relative">
                        <img
                          src={editingBlog.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setEditingBlog({ ...editingBlog, image: '' })}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer text-primary-600 hover:text-primary-700"
                        >
                          Upload Image
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Author Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={editingBlog.author?.name || ''}
                    onChange={e => setEditingBlog({
                      ...editingBlog,
                      author: {
                        ...editingBlog.author,
                        name: e.target.value,
                        email: editingBlog.author?.email || 'admin@sosapient.com'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author Profile Image URL
                  </label>
                  <input
                    type="text"
                    value={editingBlog.author?.image || ''}
                    onChange={e => setEditingBlog({
                      ...editingBlog,
                      author: {
                        ...editingBlog.author,
                        image: e.target.value,
                        name: editingBlog.author?.name || 'Admin User',
                        email: editingBlog.author?.email || 'admin@sosapient.com'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter author profile image URL"
                  />
                  {editingBlog.author?.image && (
                    <div className="mt-2">
                      <img
                        src={editingBlog.author.image}
                        alt="Author Preview"
                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingBlog.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-primary-600 hover:text-primary-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tag and press Enter"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editingBlog.status}
                    onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value as 'draft' | 'published' | 'archived' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingBlog.featured}
                      onChange={(e) => setEditingBlog({ ...editingBlog, featured: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Post
                    </span>
                  </label>
                </div>

                {/* SEO Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">SEO Settings</h4>
                  
                  {/* Meta Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={editingBlog.seo?.metaTitle || ''}
                      onChange={(e) => setEditingBlog({ 
                        ...editingBlog, 
                        seo: { 
                          ...editingBlog.seo, 
                          metaTitle: e.target.value 
                        } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="SEO optimized title..."
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {editingBlog.seo?.metaTitle?.length || 0}/60 characters
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={editingBlog.seo?.metaDescription || ''}
                      onChange={(e) => setEditingBlog({ 
                        ...editingBlog, 
                        seo: { 
                          ...editingBlog.seo, 
                          metaDescription: e.target.value 
                        } 
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="SEO meta description..."
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {editingBlog.seo?.metaDescription?.length || 0}/160 characters
                    </p>
                  </div>

                  {/* SEO Keywords */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      SEO Keywords
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(editingBlog.seo?.keywords || []).map(keyword => (
                        <span
                          key={keyword}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {keyword}
                          <button
                            onClick={() => {
                              const newKeywords = (editingBlog.seo?.keywords || []).filter(k => k !== keyword);
                              setEditingBlog({
                                ...editingBlog,
                                seo: {
                                  ...editingBlog.seo,
                                  keywords: newKeywords
                                }
                              });
                            }}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add SEO keyword and press Enter"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const keyword = e.currentTarget.value.trim();
                          if (keyword && !(editingBlog.seo?.keywords || []).includes(keyword)) {
                            setEditingBlog({
                              ...editingBlog,
                              seo: {
                                ...editingBlog.seo,
                                keywords: [...(editingBlog.seo?.keywords || []), keyword]
                              }
                            });
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your blog posts and content</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBlogs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.categoryStats.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Posts</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No blog posts found. Create your first post!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {blog.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {blog.author?.image && (
                            <img
                              src={blog.author.image}
                              alt={blog.author.name || 'Author'}
                              className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {blog.author?.name || 'Unknown Author'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {blog.author?.email || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : blog.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 
                            ? blog.tags.slice(0, 3).join(', ') + (blog.tags.length > 3 ? '...' : '')
                            : 'No tags'
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div>{blog.views || 0} views</div>
                        <div>{blog.likes || 0} likes</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Not published'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(blog)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {blogToDelete && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={blogToDelete.image}
                    alt={blogToDelete.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                      {blogToDelete.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {blogToDelete.category} • {blogToDelete.status}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this blog post? This will permanently remove the post and all associated data.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
