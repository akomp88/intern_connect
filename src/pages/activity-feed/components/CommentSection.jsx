import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ activityId, comments, onComment }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: {
        id: 'current-user',
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Project Management Intern'
      },
      createdAt: new Date(),
      replies: []
    };

    if (onComment) {
      onComment(activityId, comment);
    }

    setNewComment('');
  };

  const handleSubmitReply = (e, parentCommentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      content: replyText,
      author: {
        id: 'current-user',
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Project Management Intern'
      },
      createdAt: new Date(),
      parentId: parentCommentId
    };

    if (onComment) {
      onComment(activityId, reply, parentCommentId);
    }

    setReplyText('');
    setReplyingTo(null);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-8 mt-3' : 'mb-4'}`}>
      <div className="flex items-start space-x-3">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          {comment.author.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={`${comment.author.name}'s profile`}
              className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} rounded-full object-cover border border-border`}
            />
          ) : (
            <div className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} bg-gradient-primary rounded-full flex items-center justify-center`}>
              <span className={`${isReply ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                {comment.author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-surface-secondary rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`${isReply ? 'text-xs' : 'text-sm'} font-semibold text-text-primary`}>
                {comment.author.name}
              </span>
              <span className="text-xs text-text-muted">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
            <p className={`${isReply ? 'text-xs' : 'text-sm'} text-text-primary leading-relaxed`}>
              {comment.content}
            </p>
          </div>

          {/* Comment Actions */}
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="ghost"
              size="xs"
              className="text-text-muted hover:text-primary"
            >
              <Icon name="ThumbsUp" size={12} className="mr-1" />
              Like
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setReplyingTo(comment.id)}
                className="text-text-muted hover:text-primary"
              >
                <Icon name="MessageCircle" size={12} className="mr-1" />
                Reply
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">JD</span>
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full text-sm"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="xs"
                      disabled={!replyText.trim()}
                    >
                      Reply
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="border-t border-border bg-surface-secondary">
      {/* Comments List */}
      {comments && comments.length > 0 && (
        <div className="p-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* New Comment Form */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmitComment}>
          <div className="flex items-start space-x-3">
            {/* Current User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">JD</span>
              </div>
            </div>

            {/* Comment Input */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-text-muted hover:text-primary"
                  >
                    <Icon name="Smile" size={14} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-text-muted hover:text-primary"
                  >
                    <Icon name="Paperclip" size={14} />
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;