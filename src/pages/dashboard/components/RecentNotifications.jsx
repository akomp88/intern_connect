import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentNotifications = ({ notifications, onMarkAsRead, onViewAll }) => {
  const [localNotifications, setLocalNotifications] = useState(notifications || [
    {
      id: 1,
      type: 'mention',
      title: 'Sarah mentioned you in a post',
      message: 'Great insights on the API integration project!',
      time: new Date(Date.now() - 15 * 60 * 1000),
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 2,
      type: 'event',
      title: 'Event reminder',
      message: 'Tech Talk: AI in Modern Development starts in 2 hours',
      time: new Date(Date.now() - 45 * 60 * 1000),
      unread: true,
      avatar: null
    },
    {
      id: 3,
      type: 'connection',
      title: 'New connection request',
      message: 'Alex Johnson wants to connect with you',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Weekly goal completed!',
      message: 'You\'ve successfully logged 4 accomplishments this week',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unread: false,
      avatar: null
    },
    {
      id: 5,
      type: 'comment',
      title: 'New comment on your post',
      message: 'Mike Chen commented: "This is really helpful, thanks for sharing!"',
      time: new Date(Date.now() - 6 * 60 * 60 * 1000),
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'mention':
        return { name: 'AtSign', color: 'var(--color-primary)' };
      case 'event':
        return { name: 'Calendar', color: 'var(--color-accent)' };
      case 'connection':
        return { name: 'UserPlus', color: 'var(--color-secondary)' };
      case 'achievement':
        return { name: 'Trophy', color: 'var(--color-success)' };
      case 'comment':
        return { name: 'MessageCircle', color: 'var(--color-primary)' };
      default:
        return { name: 'Bell', color: 'var(--color-text-muted)' };
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleMarkAsRead = (notificationId) => {
    setLocalNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      )
    );
    
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }
  };

  const unreadCount = localNotifications.filter(n => n.unread).length;

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse-slow">
                {unreadCount}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            <p className="text-sm text-text-secondary">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>
        </div>
        
        <Button
          variant="text"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {localNotifications.slice(0, 4).map((notification) => {
          const iconConfig = getNotificationIcon(notification.type);
          
          return (
            <div 
              key={notification.id}
              className={`
                relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${notification.unread 
                  ? 'bg-primary-50 border-primary-200 hover:bg-primary-100' :'bg-surface-secondary border-border hover:bg-surface'
                }
              `}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar or Icon */}
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-8 h-8 bg-surface border border-border rounded-full flex items-center justify-center ${
                      notification.avatar ? 'hidden' : 'flex'
                    }`}
                  >
                    <Icon name={iconConfig.name} size={14} color={iconConfig.color} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary line-clamp-1">
                        {notification.title}
                      </p>
                      <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-text-muted mt-2">
                        {formatTimeAgo(notification.time)}
                      </p>
                    </div>
                    
                    {/* Unread indicator */}
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {localNotifications.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={24} color="var(--color-text-muted)" />
          </div>
          <p className="text-text-secondary">No notifications</p>
          <p className="text-sm text-text-muted">You're all caught up!</p>
        </div>
      )}

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => {
              setLocalNotifications(prev => 
                prev.map(notification => ({ ...notification, unread: false }))
              );
            }}
          >
            Mark all as read
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentNotifications;