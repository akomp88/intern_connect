import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingTopics = ({ topics, onTopicClick, className = '' }) => {
  const handleTopicClick = (topic) => {
    if (onTopicClick) {
      onTopicClick(topic);
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg shadow-elevation-1 ${className}`}>
      <div className="p-4 border-b border-border-light">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={18} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Trending Topics</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <div
              key={topic.tag}
              className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg hover:bg-primary-50 transition-colors duration-150 cursor-pointer"
              onClick={() => handleTopicClick(topic.tag)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-text-primary">#{topic.tag}</p>
                  <p className="text-xs text-text-muted">
                    {topic.questionCount} questions this week
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span className="text-xs font-medium">+{topic.growth}%</span>
                </div>
                <Icon name="ChevronRight" size={14} className="text-text-muted" />
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          className="mt-4 text-primary hover:bg-primary-50"
        >
          View All Topics
        </Button>
      </div>
    </div>
  );
};

export default TrendingTopics;