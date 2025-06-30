import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostLimitNotice = ({ userPostCount = 0, maxPosts = 3, onShowMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (userPostCount <= maxPosts) {
    return null;
  }

  const hiddenPostsCount = userPostCount - maxPosts;

  const handleShowMore = () => {
    setIsExpanded(true);
    if (onShowMore) {
      onShowMore();
    }
  };

  const handleShowLess = () => {
    setIsExpanded(false);
  };

  return (
    <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon name="Info" size={20} className="text-warning-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-warning-800">
                Daily Post Limit Reached
              </h3>
              <p className="text-sm text-warning-700 mt-1">
                You've reached the maximum of {maxPosts} posts per day. 
                {!isExpanded && hiddenPostsCount > 0 && (
                  <span className="ml-1">
                    {hiddenPostsCount} older {hiddenPostsCount === 1 ? 'post is' : 'posts are'} hidden.
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {!isExpanded && hiddenPostsCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowMore}
                  className="border-warning-300 text-warning-700 hover:bg-warning-100"
                >
                  <Icon name="ChevronDown" size={14} className="mr-1" />
                  Show More ({hiddenPostsCount})
                </Button>
              )}
              
              {isExpanded && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowLess}
                  className="border-warning-300 text-warning-700 hover:bg-warning-100"
                >
                  <Icon name="ChevronUp" size={14} className="mr-1" />
                  Show Less
                </Button>
              )}
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-3 p-3 bg-warning-100 rounded-lg">
            <div className="flex items-center space-x-2 text-xs text-warning-800">
              <Icon name="Clock" size={14} />
              <span>
                Post limit resets at midnight. You can post {maxPosts} more times tomorrow.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLimitNotice;