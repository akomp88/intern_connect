import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KnowledgeHubIntro = ({ onViewMyQuestions, onViewMyResponses, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Description */}
      <div className="bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-2xl p-8 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Icon name="MessageCircleQuestion" size={32} color="white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Ask Questions, Get Results</h2>
          <p className="text-xl text-white text-opacity-90 mb-6 leading-relaxed">
            Your open space to ask questions about anything - from OneDigital's diverse business verticals to managing workplace stress, career development, or industry insights. 
            Connect with experts, share knowledge, and grow both personally and professionally.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white text-opacity-80">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Expert Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} />
              <span>Industry Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>Professional Growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Questions */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">My Questions</h3>
              <p className="text-sm text-text-secondary">Track questions you've asked</p>
            </div>
          </div>
          <p className="text-text-secondary mb-4">
            View all the questions you've submitted, track responses, and see which ones have been resolved.
          </p>
          <Button
            variant="outline"
            fullWidth
            onClick={onViewMyQuestions}
            iconName="ArrowRight"
            iconPosition="right"
            className="justify-between"
          >
            View My Questions
          </Button>
        </div>

        {/* My Responses */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">My Responses</h3>
              <p className="text-sm text-text-secondary">See questions you've answered</p>
            </div>
          </div>
          <p className="text-text-secondary mb-4">
            Review your contributions to the community and see how your expertise has helped others learn.
          </p>
          <Button
            variant="outline"
            fullWidth
            onClick={onViewMyResponses}
            iconName="ArrowRight"
            iconPosition="right"
            className="justify-between"
          >
            View My Responses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHubIntro;