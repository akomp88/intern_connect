import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DirectoryCards = ({ 
  users, 
  onUserClick, 
  onEmail,
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

  const departmentStyles = {
    'Engineering': {
      icon: 'Code',
      bg: 'bg-gradient-to-br from-[rgb(44,104,142)] to-[rgb(108,178,202)]',
      lightBg: 'bg-gradient-to-r from-[rgba(44,104,142,0.1)] to-[rgba(108,178,202,0.1)] text-[rgb(44,104,142)] border-[rgb(108,178,202)]'
    },
    'Marketing': {
      icon: 'TrendingUp',
      bg: 'bg-gradient-to-br from-[rgb(103,157,78)] to-[rgb(178,193,74)]',
      lightBg: 'bg-gradient-to-r from-[rgba(103,157,78,0.1)] to-[rgba(178,193,74,0.1)] text-[rgb(103,157,78)] border-[rgb(178,193,74)]'
    },
    'Sales': {
      icon: 'DollarSign',
      bg: 'bg-gradient-to-br from-[rgb(226,110,56)] to-[rgb(246,198,69)]',
      lightBg: 'bg-gradient-to-r from-[rgba(226,110,56,0.1)] to-[rgba(246,198,69,0.1)] text-[rgb(226,110,56)] border-[rgb(246,198,69)]'
    },
    'default': {
      icon: 'Briefcase',
      bg: 'bg-gradient-to-br from-[rgb(44,104,142)] to-[rgb(108,178,202)]',
      lightBg: 'bg-gradient-to-r from-[rgba(44,104,142,0.1)] to-[rgba(108,178,202,0.1)] text-[rgb(44,104,142)] border-[rgb(108,178,202)]'
    }
  };

  const getDepartmentColors = (department) => {
    switch (department.toLowerCase()) {
      case 'engineering':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
          badge: 'bg-blue-100 text-blue-700 border-blue-200'
        };
      case 'design':
        return {
          bg: 'bg-gradient-to-br from-purple-500 to-pink-600',
          badge: 'bg-purple-100 text-purple-700 border-purple-200'
        };
      case 'product':
        return {
          bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
          badge: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        };
      case 'marketing':
        return {
          bg: 'bg-gradient-to-br from-orange-500 to-red-600',
          badge: 'bg-orange-100 text-orange-700 border-orange-200'
        };
      case 'analytics':
        return {
          bg: 'bg-gradient-to-br from-yellow-500 to-amber-600',
          badge: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'sales':
        return {
          bg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
          badge: 'bg-teal-100 text-teal-700 border-teal-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-500 to-gray-600',
          badge: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
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

  const handleEmailClick = (e, user) => {
    e.stopPropagation();
    if (onEmail && user.email) {
      onEmail(user.email, user.name);
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => handleCardClick(user)}
          className="bg-gradient-card border border-border-light rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary-300 backdrop-blur-sm"
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
                <div className={`w-12 h-12 ${getDepartmentColors(user.department).bg} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white ring-opacity-60`}>
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
              <div className="flex items-center space-x-2">
                {user.isFormerIntern && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200 shadow-sm">
                    ⭐ Alumni
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border shadow-sm ${getDepartmentColors(user.department).badge}`}>
                  {user.department}
                </span>
              </div>
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
                {user.skills.slice(0, 3).map((skill, index) => {
                  const colorVariants = [
                    'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300',
                    'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border-emerald-300',
                    'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300',
                    'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300',
                    'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300'
                  ];
                  return (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full border shadow-sm ${colorVariants[index % colorVariants.length]}`}
                    >
                      {skill}
                    </span>
                  );
                })}
                {user.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-medium rounded-full border border-slate-300 shadow-sm">
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
            
            {user.email ? (
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={(e) => handleEmailClick(e, user)}
                iconName="Mail"
                iconPosition="left"
                className="hover:bg-gradient-to-r hover:from-[rgb(103,157,78)] hover:to-[rgb(178,193,74)] hover:text-white transition-all duration-300"
                title="Send email"
              >
                Email
              </Button>
            ) : (
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
            )}
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