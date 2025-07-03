import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityFeedCard = ({ activity, onReaction, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [userReactions, setUserReactions] = useState(activity.userReactions || []);

  const reactions = [
    { emoji: '👍', label: 'Like', count: activity.reactions?.like || 0 },
    { emoji: '🎉', label: 'Celebrate', count: activity.reactions?.celebrate || 0 },
    { emoji: '👀', label: 'Insightful', count: activity.reactions?.insightful || 0 }
  ];

  const handleReaction = (reactionType) => {
    const hasReacted = userReactions.includes(reactionType);
    let newUserReactions;
    
    if (hasReacted) {
      newUserReactions = userReactions.filter(r => r !== reactionType);
    } else {
      newUserReactions = [...userReactions, reactionType];
    }
    
    setUserReactions(newUserReactions);
    
    if (onReaction) {
      onReaction(activity.id, reactionType, !hasReacted);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() && onComment) {
      onComment(activity.id, newComment.trim());
      setNewComment('');
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-gradient-card border border-border-light rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-primary-200 transition-all duration-300 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="flex-shrink-0">
          {activity.author.avatar ? (
            <Image
              src={activity.author.avatar}
              alt={`${activity.author.name}'s profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {activity.author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-text-primary truncate">
              {activity.author.name}
            </h4>
            <span className="text-xs text-text-muted">•</span>
            <span className="text-xs text-text-muted">
              {formatTimeAgo(activity.createdAt)}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            {activity.author.title} • {activity.author.department}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          {activity.type === 'milestone' && (
            <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={14} color="var(--color-success)" />
            </div>
          )}
          <Button variant="ghost" size="xs">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {activity.project && (
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Folder" size={14} color="var(--color-text-muted)" />
            <span className="text-sm font-medium text-primary">{activity.project}</span>
          </div>
        )}
        
        <p className="text-sm text-text-primary leading-relaxed mb-3">
          {activity.content}
        </p>

        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {activity.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded-button"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {activity.dateRange && (
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Icon name="Calendar" size={12} />
            <span>{activity.dateRange}</span>
          </div>
        )}
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between py-2 border-t border-border">
        <div className="flex items-center space-x-1">
          {reactions.map((reaction) => (
            <Button
              key={reaction.label}
              variant="ghost"
              size="xs"
              onClick={() => handleReaction(reaction.label.toLowerCase())}
              className={`
                flex items-center space-x-1 px-2 py-1 rounded-button transition-all duration-150
                ${userReactions.includes(reaction.label.toLowerCase()) 
                  ? 'bg-primary-100 text-primary' :'hover:bg-surface-secondary'
                }
              `}
            >
              <span className="text-sm">{reaction.emoji}</span>
              {reaction.count > 0 && (
                <span className="text-xs font-medium">{reaction.count}</span>
              )}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1"
        >
          <Icon name="MessageCircle" size={14} />
          <span className="text-xs">
            {activity.comments?.length || 0} comments
          </span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-border space-y-3">
          {/* Existing Comments */}
          {activity.comments && activity.comments.length > 0 && (
            <div className="space-y-2">
              {activity.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">
                      {comment.author.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-surface-secondary rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-text-primary">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary transition-all duration-200"
              />
              <Button
                variant="primary"
                size="xs"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                iconName="Send"
              >
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFeedCard;