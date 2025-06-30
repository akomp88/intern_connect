import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const ProfileModal = ({ user, isOpen, onClose, onConnect, onMessage, onViewProfile }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConnect = () => {
    if (onConnect) {
      onConnect(user.id);
    }
    onClose();
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(user.id);
    }
    onClose();
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(user.id);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-scale-in"
      onClick={handleBackdropClick}
    >
      {/* Mobile: Full screen modal */}
      <div className="w-full h-full md:w-auto md:h-auto md:max-w-lg bg-surface rounded-none md:rounded-xl shadow-elevation-3 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-8rem)] md:max-h-96">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s profile`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              
              {/* Online status indicator */}
              {user.isOnline && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-success border-2 border-surface rounded-full" />
              )}
            </div>

            <h3 className="text-xl font-semibold text-text-primary mb-1">
              {user.name}
            </h3>
            
            {user.title && (
              <p className="text-text-secondary mb-2">{user.title}</p>
            )}
            
            {user.department && (
              <p className="text-sm text-text-muted mb-3">{user.department}</p>
            )}

            {/* Connection status */}
            {user.connectionStatus && (
              <div className="flex items-center space-x-2 mb-4">
                <Icon 
                  name={user.connectionStatus === 'connected' ? 'UserCheck' : 'UserPlus'} 
                  size={16} 
                  className={user.connectionStatus === 'connected' ? 'text-success' : 'text-text-muted'}
                />
                <span className={`text-sm ${
                  user.connectionStatus === 'connected' ? 'text-success' : 'text-text-muted'
                }`}>
                  {user.connectionStatus === 'connected' ? 'Connected' : 'Not connected'}
                </span>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-4 mb-6">
            {user.bio && (
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">About</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{user.bio}</p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user.interests && user.interests.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded-button"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-2">
              {user.email && (
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{user.email}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">{user.location}</span>
                </div>
              )}
              
              {user.joinDate && (
                <div className="flex items-center space-x-3">
                  <Icon name="Calendar" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-secondary">
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 md:p-6 border-t border-border bg-surface-secondary">
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={handleViewProfile}
              iconName="User"
              iconPosition="left"
            >
              View Full Profile
            </Button>
            
            <div className="flex gap-3">
              {user.connectionStatus !== 'connected' && (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleConnect}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Connect
                </Button>
              )}
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleMessage}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;