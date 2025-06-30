import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const notifications = [
    {
      id: 1,
      type: 'mention',
      title: 'Sarah mentioned you in a post',
      message: 'Great work on the project presentation!',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'event',
      title: 'Upcoming event reminder',
      message: 'Tech Talk: AI in Modern Development starts in 1 hour',
      time: '45 minutes ago',
      unread: true,
    },
    {
      id: 3,
      type: 'connection',
      title: 'New connection request',
      message: 'Alex Johnson wants to connect with you',
      time: '1 hour ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    console.log('Notification clicked:', notificationId);
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout logic
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center transition-spring group-hover:scale-105">
              <Icon name="Users" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-text-primary tracking-tight">
                Intern Connect
              </span>
              <span className="text-xs text-text-secondary font-medium">
                Professional Development
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} color="var(--color-text-muted)" />
            </div>
            <input
              type="text"
              placeholder="Search people, posts, events..."
              className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border rounded-button text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => console.log('Mobile search')}
          >
            <Icon name="Search" size={18} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotificationsToggle}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse-slow">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevation-3 z-200 animate-scale-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary">Notifications</h3>
                    <Button
                      variant="text"
                      size="xs"
                      onClick={() => console.log('Mark all as read')}
                    >
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 border-b border-border-light cursor-pointer hover:bg-surface-secondary transition-colors duration-150 ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary' : 'bg-transparent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button
                    variant="text"
                    size="sm"
                    fullWidth
                    onClick={() => console.log('View all notifications')}
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileMenuToggle}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">JD</span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevation-3 z-200 animate-scale-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">John Doe</p>
                      <p className="text-sm text-text-secondary">Software Engineering Intern</p>
                      <p className="text-xs text-text-muted">john.doe@company.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-150"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-150"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-150"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </Link>
                </div>
                
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-150 w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} color="var(--color-text-muted)" />
          </div>
          <input
            type="text"
            placeholder="Search people, posts, events..."
            className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border rounded-button text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary transition-all duration-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;