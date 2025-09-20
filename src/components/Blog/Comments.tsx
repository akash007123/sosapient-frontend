import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Heart,
  MessageSquare,
  X,
} from "lucide-react";

interface Comment {
  _id?: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  avatar?: string;
  likeCount?: number;
  dislikeCount?: number;
  likedBy?: string[];
  userId?: string; // Add userId to track comment ownership
}

interface CommentsProps {
  blogId: string;
  slug: string;
  currentUserId: string;
  onNotification: (message: string, type: 'success' | 'error') => void;
}

// Relative time formatter (e.g., "2 minutes ago")
function formatTimeAgo(dateValue: string | number | Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const then = new Date(dateValue);
  if (isNaN(then.getTime())) return '';
  const diffMs = then.getTime() - now.getTime();
  const minutes = Math.round(diffMs / (60 * 1000));
  const hours = Math.round(diffMs / (60 * 60 * 1000));
  const days = Math.round(diffMs / (24 * 60 * 60 * 1000));

  // Show seconds for very recent comments (< 1 min)
  if (Math.abs(minutes) < 1) {
    const seconds = Math.round(diffMs / 1000);
    return rtf.format(seconds, 'second');
  }
  if (Math.abs(hours) < 1) return rtf.format(minutes, 'minute');
  if (Math.abs(days) < 1) return rtf.format(hours, 'hour');
  if (Math.abs(days) < 30) return rtf.format(days, 'day');
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  const years = Math.round(months / 12);
  return rtf.format(years, 'year');
}

// Generate initials from a full name for avatars
function getInitials(name?: string): string {
  const n = (name || '').trim();
  if (!n) return '?';
  const parts = n.split(/\s+/).slice(0, 2);
  return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
}

const Comments: React.FC<CommentsProps> = ({ 
  blogId, 
  slug, 
  currentUserId, 
  onNotification 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cText, setCText] = useState("");
  const [cSubmitting, setCSubmitting] = useState(false);
  const [cError, setCError] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [cAvatarFile, setCAvatarFile] = useState<File | null>(null);
  const [cAvatarPreview, setCAvatarPreview] = useState<string | null>(null);
  const [commentLikes, setCommentLikes] = useState<Record<string, { isLiked: boolean; likeCount: number }>>({});
  
  // Edit and Delete states
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Live tick to re-render relative time every minute
  useEffect(() => {
    const id = setInterval(() => {
      // Trigger re-render; no state change needed besides dummy set
      setComments((prev) => [...prev]);
    }, 60000);
    return () => clearInterval(id);
  }, []);

  // Initialize comment likes when comments are loaded
  useEffect(() => {
    if (comments.length > 0 && currentUserId) {
      const initialLikes: Record<string, { isLiked: boolean; likeCount: number }> = {};
      comments.forEach(comment => {
        if (comment._id) {
          const isLiked = Array.isArray(comment.likedBy) && comment.likedBy.includes(currentUserId);
          initialLikes[comment._id] = {
            isLiked,
            likeCount: comment.likeCount || 0
          };
        }
      });
      setCommentLikes(initialLikes);
    }
  }, [comments, currentUserId]);

  // Fetch comments for current blog by slug
  const fetchComments = async (postSlug: string) => {
    try {
      setCommentsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${postSlug}/comments`);
      const json = await res.json();
      if (json.success) {
        const normalizeUrl = (url: string) => url?.startsWith('/uploads') ? `${import.meta.env.VITE_BASE_URL}${url}` : url;
        const items = (json.data || []).map((c: any) => ({
          ...c,
          avatar: c?.avatar ? normalizeUrl(c.avatar) : c?.avatar,
          likeCount: typeof c?.likeCount === 'number' ? c.likeCount : 0,
          dislikeCount: typeof c?.dislikeCount === 'number' ? c.dislikeCount : 0,
          userId: c?.userId || null, // Ensure userId is preserved
        }));
        setComments(items);
      }
    } catch (e) {
      // ignore
    } finally {
      setCommentsLoading(false);
    }
  };

  // Load comments when component mounts
  useEffect(() => {
    if (slug) {
      fetchComments(slug);
    }
  }, [slug]);

  // Like/Unlike a comment
  const likeComment = async (comment: Comment) => {
    if (!blogId || !comment._id || !currentUserId) {
      console.error('Missing required data for liking comment');
      return;
    }
    
    const commentId = comment._id;
    const currentState = commentLikes[commentId] || { isLiked: false, likeCount: 0 };
    
    // Optimistic update
    const newIsLiked = !currentState.isLiked;
    const newLikeCount = newIsLiked ? currentState.likeCount + 1 : Math.max(0, currentState.likeCount - 1);
    
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: {
        isLiked: newIsLiked,
        likeCount: newLikeCount
      }
    }));

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUserId })
      });
      
      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        
        // Handle different HTTP status codes
        let userMessage = '';
        switch (response.status) {
          case 400:
            userMessage = errorData.message || 'Invalid request. Please refresh the page and try again.';
            break;
          case 404:
            userMessage = 'Comment not found. It may have been deleted.';
            break;
          case 500:
            userMessage = 'Server error. Please try again later.';
            break;
          default:
            userMessage = errorData.message || `Error: ${response.status}. Please try again.`;
        }
        
        console.error('API Error:', {
          status: response.status,
          message: errorData.message || 'Unknown error',
          commentId,
          blogId: blogId
        });
        
        // Revert optimistic update
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: currentState
        }));
        
        // Show user-friendly error message
        onNotification(userMessage, 'error');
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update with actual server response
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: {
            isLiked: data.data.isLiked,
            likeCount: data.data.likeCount
          }
        }));
        
        // Also update the comments array for consistency
        setComments(prev => prev.map(c => 
          c._id === commentId 
            ? { ...c, likeCount: data.data.likeCount, likedBy: data.data.likedBy }
            : c
        ));
        
        // Show success message
        onNotification(
          data.data.isLiked ? 'Comment liked!' : 'Like removed', 
          'success'
        );
      } else {
        console.error('API returned success: false:', data.message);
        
        // Revert optimistic update
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: currentState
        }));
        
        // Show user-friendly error message
        onNotification(data.message || 'Failed to update like. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Network error while liking comment:', error);
      
      // Revert optimistic update on network error
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: currentState
      }));
      
      // Show user-friendly error message for network issues
      onNotification('Network error. Please check your connection and try again.', 'error');
    }
  };

  // Submit a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogId) return;
    setCError(null);
    const emailOk = /.+@.+\..+/.test(cEmail.trim());
    if (!cName.trim() || !emailOk || !cText.trim()) {
      setCError('Please provide valid name, email and comment.');
      return;
    }
    try {
      setCSubmitting(true);
      const form = new FormData();
      form.append('name', cName.trim());
      form.append('email', cEmail.trim());
      form.append('comment', cText.trim());
      form.append('userId', currentUserId); // Add userId to track ownership
      if (cAvatarFile) form.append('avatar', cAvatarFile);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}/comments`, {
        method: 'POST',
        body: form
      });
      const json = await res.json();
      if (json.success) {
        // Optimistically prepend
        const createdAt = json.data?.createdAt || new Date().toISOString();
        const normalizeUrl = (url: string) => url?.startsWith('/uploads') ? `${import.meta.env.VITE_BASE_URL}${url}` : url;
        const avatar = json.data?.avatar ? normalizeUrl(json.data.avatar) : undefined;
        setComments(prev => [{ 
          name: json.data.name, 
          email: json.data.email, 
          comment: json.data.comment, 
          createdAt, 
          avatar, 
          likeCount: 0, 
          dislikeCount: 0, 
          _id: json.data?._id,
          userId: currentUserId // Set userId for newly created comments
        }, ...prev]);
        setCommentModalOpen(false);
        setCName("");
        setCEmail("");
        setCText("");
        setCAvatarFile(null);
        setCAvatarPreview(null);
        onNotification('Comment added successfully!', 'success');
      } else {
        setCError(json.message || 'Failed to add comment');
      }
    } catch (err) {
      setCError('Network error while adding comment');
    } finally {
      setCSubmitting(false);
    }
  };

  // Edit comment function
  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment._id || null);
    setEditCommentText(comment.comment);
  };

  // Save edited comment
  const saveEditedComment = async (commentId: string) => {
    if (!editCommentText.trim()) {
      onNotification('Comment cannot be empty', 'error');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          comment: editCommentText.trim(),
          userId: currentUserId 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the comment in the local state
        setComments(prev => prev.map(c => 
          c._id === commentId 
            ? { ...c, comment: editCommentText.trim() }
            : c
        ));
        setEditingCommentId(null);
        setEditCommentText("");
        onNotification('Comment updated successfully!', 'success');
      } else {
        onNotification(data.message || 'Failed to update comment', 'error');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      onNotification('Network error while updating comment', 'error');
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  // Delete comment function
  const handleDeleteComment = (commentId: string) => {
    setDeleteCommentId(commentId);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDeleteComment = async () => {
    if (!deleteCommentId) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}/comments/${deleteCommentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUserId })
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove comment from local state
        setComments(prev => prev.filter(c => c._id !== deleteCommentId));
        setShowDeleteModal(false);
        setDeleteCommentId(null);
        onNotification('Comment deleted successfully!', 'success');
      } else {
        onNotification(data.message || 'Failed to delete comment', 'error');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      onNotification('Network error while deleting comment', 'error');
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteCommentId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Comments{comments.length ? ` (${comments.length})` : ''}
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
          {(showAllComments ? comments : comments.slice(0, 3)).map((c, idx) => {
            if (!c._id) return null; // Skip comments without _id
            const commentState = commentLikes[c._id] || { isLiked: false, likeCount: c.likeCount || 0 };
            return (
            <li key={c._id || idx}>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: avatar + meta */}
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex-shrink-0">
                        {c.avatar ? (
                          <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover shadow-sm" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-sm">
                            {getInitials(c.name)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white truncate">@{(c.name || '').trim().replace(/\s+/g,'').toLowerCase() || 'reader'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400" title={new Date(c.createdAt).toLocaleString()}>{formatTimeAgo(c.createdAt)}</div>
                      </div>
                    </div>
            {/* Right: heart like pill */}
                    <button
                      type="button"
                      onClick={() => likeComment(c)}
                      disabled={!c._id} // Disable if no comment ID
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition ${
                        !c._id 
                          ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200'
                          : commentState.isLiked 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800' 
                            : 'bg-white text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      aria-pressed={commentState.isLiked}
                      title={!c._id ? 'Cannot like this comment' : commentState.isLiked ? 'Unlike comment' : 'Like comment'}
                    >
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        !c._id 
                          ? 'bg-gray-200 text-gray-400'
                          : commentState.isLiked 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                        <Heart className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-medium">{commentState.likeCount}</span>
                    </button>
                  </div>

                  {/* Comment body */}
                  {editingCommentId === c._id ? (
                    <div className="mt-4">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
                        placeholder="Edit your comment..."
                        maxLength={5000}
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{editCommentText.length}/5000 characters</span>
                        <span className={`${editCommentText.length > 4500 ? 'text-red-600' : editCommentText.length > 3500 ? 'text-amber-600' : 'text-green-600'}`}>
                          {editCommentText.length > 5000 ? 'Exceeds limit!' : 'Within limit'}
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEditedComment(c._id!)}
                          disabled={!editCommentText.trim() || editCommentText.length > 5000}
                          className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                      {c.comment}
                    </p>
                  )}

                  {/* Footer actions - only show for comment owner */}
                  {c.userId === currentUserId && editingCommentId !== c._id && (
                    <div className="mt-4 flex items-center justify-end gap-4 text-sm">
                      <button 
                        onClick={() => handleEditComment(c)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteComment(c._id!)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );})}
        </ul>
      )}

      {/* View all / View less toggle */}
      {!commentsLoading && comments.length > 3 && (
        <div className="mt-4">
          <button
            onClick={() => setShowAllComments(v => !v)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {showAllComments ? 'View less' : 'View all comments'}
          </button>
        </div>
      )}

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
            <form onSubmit={handleSubmitComment} className="space-y-3" encType="multipart/form-data">
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
                <textarea value={cText} onChange={e => setCText(e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Write your comment... (Up to 5000 characters)" maxLength={5000} />
                {/* Comment character count */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{cText.length}/5000 characters</span>
                  <span className={`${cText.length > 4500 ? 'text-red-600' : cText.length > 3500 ? 'text-amber-600' : 'text-green-600'}`}>
                    {cText.length > 5000 ? 'Exceeds limit!' : 'Within limit'}
                  </span>
                </div>
              </div>
              {/* Optional Avatar Upload */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Avatar (optional)</label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {cAvatarPreview ? (
                      <img src={cAvatarPreview} alt="avatar preview" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-500">No image</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setCAvatarFile(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => setCAvatarPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        } else {
                          setCAvatarPreview(null);
                        }
                      }}
                    />
                    {cAvatarFile && (
                      <button type="button" onClick={() => { setCAvatarFile(null); setCAvatarPreview(null); }} className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Remove</button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setCommentModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Cancel</button>
                <button type="submit" disabled={cSubmitting} className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60">{cSubmitting ? 'Submitting...' : 'Submit'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={cancelDelete}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-sm mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Comment</h4>
              <button onClick={cancelDelete} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteComment}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Comments;