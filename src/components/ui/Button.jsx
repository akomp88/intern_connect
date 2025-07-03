import React from 'react';
import Icon from 'components/AppIcon';

const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    fullWidth = false,
    disabled = false,
    loading = false,
    icon = null,
    iconName = null,
    iconPosition = 'left',
    type = 'button',
    iconSize = null,
    iconColor = null,
    className = '',
    onClick,
    ...rest
}, ref) => {
    // Base classes
    const baseClasses = 'inline-flex items-center justify-center transition-all duration-200 font-medium focus:ring-2 focus:outline-none shadow-sm hover:shadow-md';

    // Size classes
    const sizeClasses = {
        '2xs': 'text-xs py-0.5 px-1.5',
        xs: 'text-xs py-1 px-2',
        sm: 'text-sm py-1.5 px-3',
        md: 'text-base py-2 px-4',
        lg: 'text-lg py-2.5 px-5',
        xl: 'text-xl py-3 px-6',
        '2xl': 'text-2xl py-4 px-8',
    };

    // Shape classes
    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
        circle: 'rounded-full aspect-square',
    };

    // Variant classes
    const variantClasses = {
        primary: 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white hover:shadow-lg hover:shadow-[rgb(44,104,142)]/25 hover:-translate-y-0.5',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
        success: 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white hover:shadow-lg hover:shadow-[rgb(103,157,78)]/25 hover:-translate-y-0.5',
        accent: 'bg-gradient-to-r from-[rgb(226,110,56)] to-[rgb(246,198,69)] text-white hover:shadow-lg hover:shadow-[rgb(226,110,56)]/25 hover:-translate-y-0.5',
        info: 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white hover:shadow-lg hover:shadow-[rgb(44,104,142)]/25 hover:-translate-y-0.5',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5',
        warning: 'gradient-accent text-white hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5',
        outline: 'border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        text: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
    };


    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Disabled classes
    const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';

    // Loading state
    const loadingContent = loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    ) : null;

    // Icon rendering
    const renderIcon = () => {
        if (iconName) {
            // Use AppIcon component when iconName is provided
            const iconSizeMap = {
                '2xs': 12,
                xs: 14,
                sm: 16,
                md: 18,
                lg: 20,
                xl: 22,
                '2xl': 24,
            };

            const calculatedSize = iconSize || iconSizeMap[size] || 18;

            return (
                <span style={{ color: iconColor || 'currentColor' }}>
                    <Icon
                        name={iconName}
                        size={calculatedSize}
                        className={`${children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}`}
                    />
                </span>

            );
        }

        if (!icon) return null;

        return React.cloneElement(icon, {
            className: `${children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''} h-5 w-5`
        });
    };

    // Combine all classes
    const classes = `
                    ${baseClasses}
                    ${sizeClasses[size] || sizeClasses.md}
                    ${shapeClasses[shape] || shapeClasses.rounded}
                    ${variantClasses[variant] || variantClasses.primary}
                    ${widthClasses}
                    ${disabledClasses}
                    ${className}
                    `;

    return (
        <button
            ref={ref}
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
            {...rest}
        >
            {loading && loadingContent}
            {(icon || iconName) && iconPosition === 'left' && renderIcon()}
            {children}
            {(icon || iconName) && iconPosition === 'right' && renderIcon()}
        </button>
    );
});

export default Button;