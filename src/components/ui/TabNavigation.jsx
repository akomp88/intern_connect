import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      tooltip: 'Personal productivity hub and accomplishment tracking'
    },
    {
      label: 'Activity',
      path: '/activity-feed',
      icon: 'Activity',
      tooltip: 'Community engagement and peer discovery'
    },
    {
      label: 'Questions',
      path: '/question-board',
      icon: 'MessageCircleQuestion',
      tooltip: 'Peer learning and knowledge sharing platform'
    },
    {
      label: 'Directory',
      path: '/connection-hub',
      icon: 'Users',
      tooltip: 'Professional networking and mentor connections'
    },
    {
      label: 'Events',
      path: '/program-itinerary',
      icon: 'Calendar',
      tooltip: 'Program participation and calendar management'
    },
    {
      label: 'Ambassador',
      path: '/ambassador-portal',
      icon: 'Star',
      tooltip: 'Campus representation applications and resources'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-20 left-0 right-0 z-100 bg-surface border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.tooltip}
                className={`relative flex items-center space-x-2 px-4 py-4 text-sm font-medium transition-all duration-200 border-b-2 hover:text-primary group ${
                  isActive(item.path)
                    ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:border-primary-200'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={`transition-colors duration-200 ${
                    isActive(item.path) ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                  }`}
                />
                <span className="whitespace-nowrap">{item.label}</span>
                
                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border shadow-elevation-2">
        <div className="grid grid-cols-6 h-16">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary bg-primary-50' :'text-text-muted hover:text-primary hover:bg-surface-secondary'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className="transition-colors duration-200"
                />
                {/* Active indicator dot */}
                {isActive(item.path) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
                )}
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${
                isActive(item.path) ? 'text-primary' : 'text-text-muted'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="hidden md:block h-16" />
      <div className="md:hidden h-16" />
    </>
  );
};

export default TabNavigation;