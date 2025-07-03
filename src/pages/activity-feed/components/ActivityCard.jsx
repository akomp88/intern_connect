import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import CommentSection from './CommentSection';

const ActivityCard = ({ activity, onReaction, onComment, onDirectMessage }) => {
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

  const handleDirectMessage = () => {
    if (onDirectMessage) {
      onDirectMessage(activity.author.id, activity.author.name);
    }
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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            {activity.author.avatar ? (
              <Image
                src={activity.author.avatar}
                alt={`${activity.author.name}'s profile`}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg font-semibold text-white">
                  {activity.author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {activity.author.name}
              </h3>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {formatTimeAgo(activity.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">{activity.author.role}</span>
              {activity.author.team && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gradient-to-r from-[rgb(103,157,78)]/10 to-[rgb(178,193,74)]/10 text-[rgb(103,157,78)] rounded-full text-xs font-medium">
                    {activity.author.team}
                  </span>
                </>
              )}
              {activity.author.office && (
                <>
                  <span>•</span>
                  <span className="text-gray-500">{activity.author.office}</span>
                </>
              )}
            </div>
          </div>

          {/* Direct Message Button */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleDirectMessage}
              className="hover:bg-gradient-to-r hover:from-[rgb(44,104,142)] hover:to-[rgb(108,178,202)] hover:text-white transition-all duration-300 rounded-full"
              title="Send direct message"
            >
              <Icon name="MessageCircle" size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {/* Project Tags */}
        {activity.projects && activity.projects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.projects.map((project, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white text-sm font-medium rounded-full shadow-sm"
              >
                {project}
              </span>
            ))}
          </div>
        )}

        {/* Accomplishment Text */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
            {activity.content}
          </p>
        </div>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activity.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-[rgb(226,110,56)]/10 to-[rgb(246,198,69)]/10 text-[rgb(226,110,56)] text-sm font-medium rounded-full border border-[rgb(226,110,56)]/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Attachments */}
        {activity.attachments && activity.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {activity.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-[rgb(44,104,142)] transition-colors">
                <Icon name="Paperclip" size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700 truncate flex-1">{attachment.name}</span>
                <Button variant="ghost" size="xs" className="hover:bg-[rgb(44,104,142)] hover:text-white transition-colors rounded-lg">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Bar */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Reaction Summary */}
          <div className="flex items-center space-x-3">
            {getTotalReactions() > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {reactions.filter(r => r.count > 0).map((reaction) => (
                    <span key={reaction.name} className="text-lg">
                      {reaction.emoji}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {getTotalReactions()}
                </span>
              </div>
            )}
          </div>

          {/* Comment Count */}
          {activity.commentCount > 0 && (
            <button
              onClick={handleCommentToggle}
              className="text-sm text-gray-500 hover:text-[rgb(44,104,142)] transition-colors duration-200 font-medium"
            >
              {activity.commentCount} {activity.commentCount === 1 ? 'comment' : 'comments'}
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          {/* Reaction Buttons */}
          <div className="flex items-center space-x-2">
            {reactions.map((reaction) => (
              <Button
                key={reaction.name}
                variant="ghost"
                size="sm"
                onClick={() => handleReaction(reaction.name)}
                className={`flex items-center space-x-2 transition-all duration-200 rounded-full px-4 py-2 ${
                  userReaction === reaction.name
                    ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white shadow-lg' 
                    : 'hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200'
                }`}
              >
                <span className="text-lg">{reaction.emoji}</span>
                {reaction.count > 0 && (
                  <span className="text-sm font-medium">{reaction.count}</span>
                )}
              </Button>
            ))}
          </div>

          {/* Comment and Message Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDirectMessage}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-[rgb(103,157,78)] hover:to-[rgb(178,193,74)] hover:text-white transition-all duration-300 rounded-full px-4 py-2"
            >
              <Icon name="Send" size={16} />
              <span className="text-sm font-medium">Message</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCommentToggle}
              className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-[rgb(226,110,56)] hover:to-[rgb(246,198,69)] hover:text-white transition-all duration-300 rounded-full px-4 py-2"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm font-medium">Comment</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection
            activityId={activity.id}
            comments={activity.comments || []}
            onComment={onComment}
          />
        </div>
      )}
    </div>
  );
};

export default ActivityCard;