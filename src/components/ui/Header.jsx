import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import oneDigitalLogo from '/OneDigital_Logo_4color_2022-removebg-preview.png';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
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
      title: 'Upcoming event: Tech Talk',
      message: 'Join us for a discussion on AI trends',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'system',
      title: 'Weekly report submitted',
      message: 'Your accomplishment report has been received',
      time: '2 hours ago',
      unread: false,
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notificationId) => {
    console.log('Notification clicked:', notificationId);
    // Mark notification as read
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
    console.log('Logging out...');
    // Implement logout logic
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* OneDigital Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img 
              src={oneDigitalLogo} 
              alt="OneDigital Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                console.error('Logo failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div className="hidden sm:block">
              <span className="text-gray-900 text-sm font-medium">Intern Connect</span>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search people, skills, departments..."
                value={globalSearchTerm}
                onChange={(e) => setGlobalSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <button className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
              <Icon name="Search" className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationsToggle}
                className="relative p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                <Icon name="Bell" className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button
                        onClick={() => console.log('Mark all as read')}
                        className="text-white text-opacity-80 hover:text-opacity-100 text-sm transition-all"
                      >
                        Mark all read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-blue-600' : 'bg-transparent'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button
                      onClick={() => console.log('View all notifications')}
                      className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={handleProfileMenuToggle}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">J</span>
                </div>
                <Icon name="ChevronDown" className="h-4 w-4" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-t-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-white">J</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">John Doe</p>
                        <p className="text-sm text-white text-opacity-80">Project Management Intern</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon name="User" size={16} />
                      <span>View Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
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
      </div>
    </header>
  );
};

export default Header;