import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DirectoryCards = ({ 
  users, 
  onUserClick, 
  searchTerm,
  className = '' 
}) => {
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent-200 text-accent-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatRole = (role, isFormerIntern) => {
    if (isFormerIntern) {
      return `${role} (Former Intern)`;
    }
    return role;
  };

  const handleCardClick = (user) => {
    onUserClick(user);
  };

  const handleMessageClick = (e, userId) => {
    e.stopPropagation();
    console.log('Message user:', userId);
  };

  const handleConnectClick = (e, userId) => {
    e.stopPropagation();
    console.log('Connect with user:', userId);
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => handleCardClick(user)}
          className="bg-surface border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 hover:border-primary-200 card-hover"
        >
          {/* Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="relative flex-shrink-0">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              {user.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-surface rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {highlightText(user.name, searchTerm)}
              </h3>
              {user.title && (
                <p className="text-xs text-text-secondary truncate mt-1">
                  {highlightText(user.title, searchTerm)}
                </p>
              )}
              <div className="flex items-center space-x-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  user.isOnline ? 'bg-success' : 'bg-text-muted'
                }`} />
                <span className={`text-xs ${
                  user.isOnline ? 'text-success' : 'text-text-muted'
                }`}>
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Role and Status */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-primary">
                {highlightText(formatRole(user.role, user.isFormerIntern), searchTerm)}
              </span>
              {user.isFormerIntern && (
                <span className="inline-flex items-center px-2 py-1 rounded-button text-xs font-medium bg-secondary-100 text-secondary-700">
                  Alumni
                </span>
              )}
            </div>
          </div>

          {/* Location and Department */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} className="text-text-muted flex-shrink-0" />
              <span className="text-sm text-text-secondary truncate">
                {highlightText(user.office, searchTerm)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={14} className="text-text-muted flex-shrink-0" />
              <span className="text-sm text-text-secondary truncate">
                {highlightText(user.department, searchTerm)}
              </span>
            </div>
          </div>

          {/* Skills Preview */}
          {user.skills && user.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button"
                  >
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="px-2 py-1 bg-surface-secondary text-text-muted text-xs font-medium rounded-button">
                    +{user.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={(e) => handleMessageClick(e, user.id)}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Message
            </Button>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={(e) => handleConnectClick(e, user.id)}
              iconName="UserPlus"
              iconPosition="left"
            >
              Connect
            </Button>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Users" size={64} className="text-text-muted mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
          <p className="text-text-secondary max-w-md">
            Try adjusting your search criteria or filters to find more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default DirectoryCards;