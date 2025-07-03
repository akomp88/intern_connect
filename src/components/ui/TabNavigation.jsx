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

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 onedigital-nav border-b border-white border-opacity-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.tooltip}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 group whitespace-nowrap ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white border border-white border-opacity-30'
                      : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;