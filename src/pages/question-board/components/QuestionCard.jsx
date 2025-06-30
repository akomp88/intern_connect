import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuestionCard = ({ question, onVote, onAnswer, onToggleComments, className = '' }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleVote = (type) => {
    if (onVote) {
      onVote(question.id, type);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (onToggleComments) {
      onToggleComments(question.id, !showComments);
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim() && onAnswer) {
      onAnswer(question.id, newComment);
      setNewComment('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 ${className}`}>
      {/* Question Header */}
      <div className="p-4 border-b border-border-light">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {question.author.avatar ? (
              <Image
                src={question.author.avatar}
                alt={`${question.author.name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {question.author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-text-primary">{question.author.name}</h3>
              <span className="text-sm text-text-muted">{question.author.role}</span>
              <span className="text-sm text-text-muted">•</span>
              <span className="text-sm text-text-muted">{formatTimeAgo(question.timestamp)}</span>
            </div>
            
            <h2 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
              {question.title}
            </h2>
            
            <p className="text-text-secondary text-sm line-clamp-3 mb-3">
              {question.content}
            </p>
            
            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {question.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Status Badge */}
          <div className="flex-shrink-0">
            {question.isResolved ? (
              <div className="flex items-center space-x-1 px-2 py-1 bg-success-100 text-success rounded-button">
                <Icon name="CheckCircle" size={14} />
                <span className="text-xs font-medium">Resolved</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 px-2 py-1 bg-warning-100 text-warning rounded-button">
                <Icon name="Clock" size={14} />
                <span className="text-xs font-medium">Open</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="px-4 py-3 bg-surface-secondary border-b border-border-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Voting */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                className={`p-1 ${question.userVote === 'up' ? 'text-success bg-success-50' : 'text-text-muted hover:text-success'}`}
              >
                <Icon name="ChevronUp" size={18} />
              </Button>
              <span className="text-sm font-medium text-text-primary min-w-[2rem] text-center">
                {question.votes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                className={`p-1 ${question.userVote === 'down' ? 'text-error bg-error-50' : 'text-text-muted hover:text-error'}`}
              >
                <Icon name="ChevronDown" size={18} />
              </Button>
            </div>

            {/* Answer Count */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleComments}
              className="flex items-center space-x-2 text-text-muted hover:text-primary"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">{question.answerCount} answers</span>
            </Button>

            {/* Views */}
            <div className="flex items-center space-x-2 text-text-muted">
              <Icon name="Eye" size={16} />
              <span className="text-sm">{question.views} views</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-primary"
            >
              <Icon name="Share" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-primary"
            >
              <Icon name="Bookmark" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4">
          {/* Existing Answers */}
          {question.answers && question.answers.length > 0 && (
            <div className="space-y-4 mb-4">
              {question.answers.map((answer) => (
                <div key={answer.id} className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
                  <div className="flex-shrink-0">
                    {answer.author.avatar ? (
                      <Image
                        src={answer.author.avatar}
                        alt={`${answer.author.name}'s avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {answer.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-text-primary text-sm">{answer.author.name}</span>
                      <span className="text-xs text-text-muted">{formatTimeAgo(answer.timestamp)}</span>
                      {answer.isAccepted && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={12} />
                          <span className="text-xs font-medium">Accepted</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{answer.content}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Button variant="ghost" size="xs" className="text-text-muted hover:text-success">
                        <Icon name="ThumbsUp" size={12} />
                        <span className="ml-1">{answer.likes}</span>
                      </Button>
                      <Button variant="ghost" size="xs" className="text-text-muted hover:text-primary">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Answer */}
          <div className="border-t border-border-light pt-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">JD</span>
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your answer..."
                  className="w-full p-3 border border-border rounded-lg text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 text-xs text-text-muted">
                    <Icon name="Info" size={12} />
                    <span>Be helpful and respectful</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                  >
                    Post Answer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;