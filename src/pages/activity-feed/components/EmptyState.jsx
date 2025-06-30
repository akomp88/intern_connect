import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-posts', 
  onCreatePost, 
  onClearFilters,
  hasActiveFilters = false 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-posts':
        return {
          icon: 'MessageSquare',
          title: 'No posts yet',
          description: 'Be the first to share your accomplishments and connect with your peers!',
          actionText: 'Create Your First Post',
          action: onCreatePost
        };
      
      case 'no-results':
        return {
          icon: 'Search',
          title: 'No posts found',
          description: hasActiveFilters 
            ? 'Try adjusting your filters or search terms to find more content.' :'No posts match your current search criteria.',
          actionText: hasActiveFilters ? 'Clear Filters' : 'View All Posts',
          action: hasActiveFilters ? onClearFilters : onCreatePost
        };
      
      case 'loading-error':
        return {
          icon: 'AlertCircle',
          title: 'Unable to load posts',
          description: 'There was an issue loading the activity feed. Please try again.',
          actionText: 'Retry',
          action: () => window.location.reload()
        };
      
      default:
        return {
          icon: 'MessageSquare',
          title: 'Nothing to show',
          description: 'Check back later for new content.',
          actionText: null,
          action: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mb-6">
        <Icon 
          name={content.icon} 
          size={32} 
          className="text-text-muted"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {content.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary max-w-md mb-8 leading-relaxed">
        {content.description}
      </p>

      {/* Action Button */}
      {content.actionText && content.action && (
        <Button
          variant="primary"
          onClick={content.action}
          iconName={type === 'no-posts' ? 'Plus' : type === 'no-results' && hasActiveFilters ? 'X' : 'RefreshCw'}
          iconPosition="left"
        >
          {content.actionText}
        </Button>
      )}

      {/* Additional Actions for No Results */}
      {type === 'no-results' && (
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              size="sm"
            >
              Clear All Filters
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onCreatePost}
            iconName="Plus"
            iconPosition="left"
            size="sm"
          >
            Create New Post
          </Button>
        </div>
      )}

      {/* Help Text */}
      {type === 'no-posts' && (
        <div className="mt-8 p-4 bg-primary-50 rounded-lg max-w-md">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-primary mb-1">
                Getting Started Tips
              </h4>
              <ul className="text-xs text-primary-700 space-y-1">
                <li>• Share your weekly accomplishments</li>
                <li>• Tag teammates and projects</li>
                <li>• React to and comment on peer posts</li>
                <li>• Use filters to discover relevant content</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;