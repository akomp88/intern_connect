import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ title, description, icon, variant = 'primary', onClick, disabled = false }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-primary text-white hover:shadow-lg';
      case 'secondary':
        return 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white hover:shadow-lg';
      case 'accent':
        return 'bg-gradient-accent text-white hover:shadow-lg';
      default:
        return 'bg-surface border border-border hover:shadow-md';
    }
  };

  return (
    <div 
      className={`
        relative p-6 rounded-xl transition-all duration-200 cursor-pointer group
        ${getVariantClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${variant === 'default' ? 'bg-primary-100' : 'bg-white bg-opacity-20'}
            `}>
              <Icon 
                name={icon} 
                size={20} 
                color={variant === 'default' ? 'var(--color-primary)' : 'white'} 
              />
            </div>
            <h3 className={`
              text-lg font-semibold
              ${variant === 'default' ? 'text-text-primary' : 'text-white'}
            `}>
              {title}
            </h3>
          </div>
          <p className={`
            text-sm leading-relaxed
            ${variant === 'default' ? 'text-text-secondary' : 'text-white text-opacity-90'}
          `}>
            {description}
          </p>
        </div>
        
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200
          ${variant === 'default' ? 'bg-primary-100' : 'bg-white bg-opacity-20'}
          ${!disabled ? 'group-hover:scale-110' : ''}
        `}>
          <Icon 
            name="ArrowRight" 
            size={16} 
            color={variant === 'default' ? 'var(--color-primary)' : 'white'} 
          />
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;