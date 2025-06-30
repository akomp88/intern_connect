import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  variant = 'default', 
  size = 'md',
  showZero = false,
  maxCount = 99,
  className = '',
  children 
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = showZero || count > 0;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'accent':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-error text-error-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 text-xs min-w-4';
      case 'lg':
        return 'w-7 h-7 text-sm min-w-7';
      default:
        return 'w-5 h-5 text-xs min-w-5';
    }
  };

  const getPulseAnimation = () => {
    if (count > 0 && variant === 'error') {
      return 'animate-pulse-slow';
    }
    return '';
  };

  if (!shouldShow && !children) {
    return null;
  }

  // If children are provided, render as a wrapper with badge
  if (children) {
    return (
      <div className={`relative inline-block ${className}`}>
        {children}
        {shouldShow && (
          <span className={`
            absolute -top-1 -right-1 flex items-center justify-center
            rounded-full font-medium leading-none
            ${getVariantClasses()}
            ${getSizeClasses()}
            ${getPulseAnimation()}
            transform transition-all duration-200 ease-out
            ${count > 0 ? 'scale-100' : 'scale-0'}
          `}>
            {displayCount}
          </span>
        )}
      </div>
    );
  }

  // Standalone badge
  return shouldShow ? (
    <span className={`
      inline-flex items-center justify-center
      rounded-full font-medium leading-none
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${getPulseAnimation()}
      ${className}
    `}>
      {displayCount}
    </span>
  ) : null;
};

export default NotificationBadge;