import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressMetrics = ({ metrics }) => {
  const defaultMetrics = {
    weeklyEntries: 3,
    totalEntries: 12,
    weeklyGoal: 4,
    streakDays: 7,
    mentorMeetings: 2,
    peerConnections: 15
  };

  const data = { ...defaultMetrics, ...metrics };
  const weeklyProgress = (data.weeklyEntries / data.weeklyGoal) * 100;
  const postsRemaining = Math.max(0, 3 - data.weeklyEntries);

  const metricCards = [
    {
      label: 'This Week',
      value: data.weeklyEntries,
      total: data.weeklyGoal,
      icon: 'Calendar',
      color: 'primary',
      progress: weeklyProgress
    },
    {
      label: 'Total Entries',
      value: data.totalEntries,
      icon: 'FileText',
      color: 'secondary'
    },
    {
      label: 'Current Streak',
      value: data.streakDays,
      suffix: 'days',
      icon: 'Flame',
      color: 'accent'
    },
    {
      label: 'Mentor Meetings',
      value: data.mentorMeetings,
      icon: 'Users',
      color: 'success'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-100',
          text: 'text-primary',
          icon: 'var(--color-primary)'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-100',
          text: 'text-secondary',
          icon: 'var(--color-secondary)'
        };
      case 'accent':
        return {
          bg: 'bg-accent-100',
          text: 'text-accent',
          icon: 'var(--color-accent)'
        };
      case 'success':
        return {
          bg: 'bg-success-100',
          text: 'text-success',
          icon: 'var(--color-success)'
        };
      default:
        return {
          bg: 'bg-primary-100',
          text: 'text-primary',
          icon: 'var(--color-primary)'
        };
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Progress Overview</h3>
          <p className="text-sm text-text-secondary">Your weekly activity summary</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metricCards.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          
          return (
            <div key={index} className="bg-surface-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon name={metric.icon} size={16} color={colors.icon} />
                </div>
                {metric.progress !== undefined && (
                  <div className="text-xs text-text-muted">
                    {Math.round(metric.progress)}%
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {metric.value}
                  </span>
                  {metric.total && (
                    <span className="text-sm text-text-muted">
                      / {metric.total}
                    </span>
                  )}
                  {metric.suffix && (
                    <span className="text-sm text-text-muted">
                      {metric.suffix}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-text-secondary font-medium">
                  {metric.label}
                </p>
                
                {metric.progress !== undefined && (
                  <div className="w-full bg-border rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        metric.color === 'primary' ? 'bg-primary' :
                        metric.color === 'secondary' ? 'bg-secondary' :
                        metric.color === 'accent'? 'bg-accent' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(100, metric.progress)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Posts Limit Indicator */}
      {postsRemaining >= 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-warning-800">
                Daily Post Limit
              </p>
              <p className="text-xs text-warning-700">
                {postsRemaining > 0 
                  ? `You can post ${postsRemaining} more time${postsRemaining > 1 ? 's' : ''} today`
                  : 'You\'ve reached your daily posting limit (3 posts)'
                }
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-warning">
                {3 - postsRemaining}/3
              </div>
            </div>
          </div>
          
          {/* Progress bar for posts */}
          <div className="w-full bg-warning-200 rounded-full h-2 mt-3">
            <div 
              className="h-2 bg-warning rounded-full transition-all duration-300"
              style={{ width: `${((3 - postsRemaining) / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">{data.peerConnections}</div>
            <div className="text-xs text-text-secondary">Connections</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {Math.round((data.weeklyEntries / data.weeklyGoal) * 100)}%
            </div>
            <div className="text-xs text-text-secondary">Weekly Goal</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {data.streakDays > 7 ? '7+' : data.streakDays}
            </div>
            <div className="text-xs text-text-secondary">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressMetrics;