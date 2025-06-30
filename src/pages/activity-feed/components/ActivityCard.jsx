import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import CommentSection from './CommentSection';

const ActivityCard = ({ activity, onReaction, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [userReaction, setUserReaction] = useState(null);

  const reactions = [
    { emoji: '👍', name: 'like', count: activity.reactions?.like || 0 },
    { emoji: '🎉', name: 'celebrate', count: activity.reactions?.celebrate || 0 },
    { emoji: '👀', name: 'interested', count: activity.reactions?.interested || 0 }
  ];

  const handleReaction = (reactionType) => {
    const newReaction = userReaction === reactionType ? null : reactionType;
    setUserReaction(newReaction);
    
    if (onReaction) {
      onReaction(activity.id, reactionType, newReaction !== null);
    }
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getTotalReactions = () => {
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 mb-4">
      {/* Card Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start space-x-3">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            {activity.author.avatar ? (
              <Image
                src={activity.author.avatar}
                alt={`${activity.author.name}'s profile`}
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {activity.author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {activity.author.name}
              </h3>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-muted">
                {formatTimeAgo(activity.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <span>{activity.author.role}</span>
              {activity.author.team && (
                <>
                  <span>•</span>
                  <span>{activity.author.team}</span>
                </>
              )}
              {activity.author.office && (
                <>
                  <span>•</span>
                  <span>{activity.author.office}</span>
                </>
              )}
            </div>
          </div>

          {/* More Options */}
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        {/* Project Tags */}
        {activity.projects && activity.projects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {activity.projects.map((project, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button"
              >
                {project}
              </span>
            ))}
          </div>
        )}

        {/* Accomplishment Text */}
        <div className="prose prose-sm max-w-none">
          <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
            {activity.content}
          </p>
        </div>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activity.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded-button"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Attachments */}
        {activity.attachments && activity.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {activity.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-surface-secondary rounded-lg border border-border">
                <Icon name="Paperclip" size={16} className="text-text-muted" />
                <span className="text-sm text-text-primary truncate">{attachment.name}</span>
                <Button variant="ghost" size="xs">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Bar */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          {/* Reaction Summary */}
          <div className="flex items-center space-x-2">
            {getTotalReactions() > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  {reactions.filter(r => r.count > 0).map((reaction) => (
                    <span key={reaction.name} className="text-sm">
                      {reaction.emoji}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  {getTotalReactions()}
                </span>
              </div>
            )}
          </div>

          {/* Comment Count */}
          {activity.commentCount > 0 && (
            <button
              onClick={handleCommentToggle}
              className="text-xs text-text-muted hover:text-primary transition-colors duration-200"
            >
              {activity.commentCount} {activity.commentCount === 1 ? 'comment' : 'comments'}
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          {/* Reaction Buttons */}
          <div className="flex items-center space-x-1">
            {reactions.map((reaction) => (
              <Button
                key={reaction.name}
                variant="ghost"
                size="sm"
                onClick={() => handleReaction(reaction.name)}
                className={`flex items-center space-x-1 transition-all duration-200 ${
                  userReaction === reaction.name
                    ? 'bg-primary-100 text-primary' :'hover:bg-surface-secondary'
                }`}
              >
                <span className="text-base">{reaction.emoji}</span>
                {reaction.count > 0 && (
                  <span className="text-xs font-medium">{reaction.count}</span>
                )}
              </Button>
            ))}
          </div>

          {/* Comment Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCommentToggle}
            className="flex items-center space-x-2"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm">Comment</span>
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection
          activityId={activity.id}
          comments={activity.comments || []}
          onComment={onComment}
        />
      )}
    </div>
  );
};

export default ActivityCard;