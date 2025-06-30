import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      key: 'totalQuestions',
      label: 'Total Questions',
      icon: 'MessageCircleQuestion',
      color: 'text-primary',
      bgColor: 'bg-primary-50'
    },
    {
      key: 'answeredToday',
      label: 'Answered Today',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success-50'
    },
    {
      key: 'activeUsers',
      label: 'Active Users',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary-50'
    },
    {
      key: 'avgResponseTime',
      label: 'Avg Response',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning-50'
    }
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {statItems.map((item) => (
        <div
          key={item.key}
          className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {stats[item.key] || 0}
              </p>
              <p className="text-sm text-text-muted">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;