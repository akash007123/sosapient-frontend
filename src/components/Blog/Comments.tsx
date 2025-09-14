import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ThumbsUp, 
  Reply, 
  Send, 
  MoreVertical,
  MessageCircle,
  Clock,
  User
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: number) => void;
  onLikeComment: (id: number) => void;
}

const CommentCard: React.FC<{
  comment: Comment;
  isReply?: boolean;
  onLike: (id: number) => void;
  onReply: (id: number) => void;
  onShowReplies: (id: number) => void;
  showReplies: boolean;
  replyCount: number;
}> = ({ 
  comment, 
  isReply = false, 
  onLike, 
  onReply, 
  onShowReplies,
  showReplies,
  replyCount
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow ${
      isReply ? 'ml-8 border-l-2 border-primary-500' : ''
    }`}
  >
    <div className="flex items-start space-x-4">
      <div className="relative">
        <img
          src={comment.authorImage}
          alt={comment.author}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500"
        />
        {!isReply && (
          <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <MessageCircle className="w-3 h-3" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(comment.date).toLocaleDateString()}
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{comment.content}</p>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLike(comment.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
              comment.isLiked
                ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes}</span>
          </motion.button>
          {!isReply && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReply(comment.id)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </motion.button>
          )}
          {!isReply && replyCount > 0 && (
            <button
              onClick={() => onShowReplies(comment.id)}
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
            >
              {showReplies ? 'Hide replies' : `Show ${replyCount} replies`}
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const Comments: React.FC<CommentsProps> = ({ comments, onAddComment, onLikeComment }) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});

  const handleSubmit = (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment, parentId);
      setNewComment('');
      setReplyTo(null);
    }
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id}>
      <CommentCard
        comment={comment}
        isReply={isReply}
        onLike={onLikeComment}
        onReply={setReplyTo}
        onShowReplies={toggleReplies}
        showReplies={showReplies[comment.id]}
        replyCount={comment.replies.length}
      />
      {replyTo === comment.id && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={(e) => handleSubmit(e, comment.id)}
          className="ml-8 mb-4"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.form>
      )}
      <AnimatePresence>
        {showReplies[comment.id] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            {comment.replies.map(reply => renderComment(reply, true))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <MessageCircle className="w-5 h-5" />
          <span>Join the discussion</span>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="mb-8">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              <User className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <span>Post Comment</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};

export default Comments; 