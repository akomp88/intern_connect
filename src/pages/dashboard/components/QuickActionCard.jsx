import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ title, description, icon, variant = 'primary', onClick, disabled = false }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        // Blue gradient: rgb(44, 104, 142) to rgb(108, 178, 202)
        return 'bg-gradient-to-br from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white hover:shadow-xl hover:shadow-blue-500/25';
      case 'secondary':
        return 'gradient-secondary text-white hover:shadow-xl hover:shadow-secondary/25';
      case 'accent':
        // Orange gradient: rgb(226, 110, 56) to rgb(246, 198, 69)
        return 'bg-gradient-to-br from-[rgb(226,110,56)] to-[rgb(246,198,69)] text-white hover:shadow-xl hover:shadow-orange-500/25';
      case 'success':
        // Green gradient: rgb(103, 157, 78) to rgb(178, 193, 74)
        return 'bg-gradient-to-br from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white hover:shadow-xl hover:shadow-green-500/25';
      default:
        return 'bg-gradient-card border border-border-light hover:shadow-lg hover:border-primary-200';
    }
  };

  return (
    <div 
      className={`
        relative p-6 rounded-2xl transition-all duration-300 cursor-pointer group backdrop-blur-sm
        ${getVariantClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-2 hover:scale-105'}
      `}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110
              ${variant === 'default' ? 'bg-primary-100' : 'bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-20'}
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