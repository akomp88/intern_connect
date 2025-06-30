import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import QuickActionCard from './components/QuickActionCard';
import WeeklyAccomplishmentForm from './components/WeeklyAccomplishmentForm';
import ActivityFeedCard from './components/ActivityFeedCard';
import ProgressMetrics from './components/ProgressMetrics';
import UpcomingEvents from './components/UpcomingEvents';
import RecentNotifications from './components/RecentNotifications';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);

  // Mock data for recent activities
  const mockActivities = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        title: 'Frontend Developer Intern',
        department: 'Engineering',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      project: 'Mobile App Redesign',
      content: `Completed the user authentication flow redesign this week. Key learnings include implementing secure token storage and improving the overall user experience with smoother transitions.\n\nThe new design reduces login time by 40% and has received positive feedback from the UX team.`,
      tags: ['React Native', 'UX Design', 'Authentication'],
      dateRange: 'Nov 18 - Nov 22, 2024',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'accomplishment',
      reactions: { like: 8, celebrate: 3, insightful: 2 },
      userReactions: [],
      comments: [
        {
          id: 1,
          author: { name: 'Mike Chen' },
          content: 'Great work on the authentication flow! The performance improvement is impressive.',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'Alex Rodriguez',
        title: 'Data Science Intern',
        department: 'Analytics',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      project: 'Customer Analytics Dashboard',
      content: `Built my first machine learning model to predict customer churn! The model achieved 85% accuracy using Random Forest algorithm.\n\nLearned a lot about feature engineering and data preprocessing. Next week I'll be working on model optimization.`,
      tags: ['Python', 'Machine Learning', 'Data Analysis'],
      dateRange: 'Nov 18 - Nov 22, 2024',createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),type: 'milestone',
      reactions: { like: 12, celebrate: 7, insightful: 4 },
      userReactions: ['like'],
      comments: []
    },
    {
      id: 3,
      author: {
        name: 'Emma Davis',title: 'Marketing Intern',department: 'Marketing',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      project: 'Social Media Campaign',
      content: `Launched our Q4 social media campaign this week! We saw a 25% increase in engagement compared to last quarter.\n\nKey strategies that worked: user-generated content, interactive polls, and behind-the-scenes content. The team collaboration was amazing!`,
      tags: ['Social Media', 'Campaign Management', 'Analytics'],
      dateRange: 'Nov 18 - Nov 22, 2024',createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),type: 'accomplishment',
      reactions: { like: 6, celebrate: 9, insightful: 1 },
      userReactions: [],
      comments: [
        {
          id: 1,
          author: { name: 'Lisa Park' },
          content: 'The engagement numbers are fantastic! What was your most successful post type?',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ]
    }
  ];

  useEffect(() => {
    setRecentActivities(mockActivities);
  }, []);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'log-week':
        setShowForm(true);
        break;
      case 'view-archive': navigate('/dashboard/archive');
        break;
      case 'mentor-meetings': navigate('/dashboard/mentors');
        break;
      default:
        break;
    }
  };

  const handleFormSave = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Saving draft:', formData);
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  const handleFormSubmit = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting entry:', formData);
      setIsLoading(false);
      setShowForm(false);
      // Add to recent activities
      const newActivity = {
        id: Date.now(),
        author: {
          name: 'John Doe',
          title: 'Software Engineering Intern',
          department: 'Engineering',
          avatar: null
        },
        project: formData.project,
        content: formData.keyTakeaways,
        tags: formData.tags,
        dateRange: `${formData.startDate} - ${formData.endDate}`,
        createdAt: new Date(),
        type: 'accomplishment',
        reactions: { like: 0, celebrate: 0, insightful: 0 },
        userReactions: [],
        comments: []
      };
      setRecentActivities(prev => [newActivity, ...prev]);
    }, 1500);
  };

  const handleExportPDF = (formData) => {
    console.log('Exporting PDF:', formData);
    // Simulate PDF generation
    alert('PDF export functionality would be implemented here');
  };

  const handleActivityReaction = (activityId, reactionType, isAdding) => {
    setRecentActivities(prev => 
      prev.map(activity => {
        if (activity.id === activityId) {
          const newReactions = { ...activity.reactions };
          const newUserReactions = [...activity.userReactions];
          
          if (isAdding) {
            newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
            if (!newUserReactions.includes(reactionType)) {
              newUserReactions.push(reactionType);
            }
          } else {
            newReactions[reactionType] = Math.max(0, (newReactions[reactionType] || 0) - 1);
            const index = newUserReactions.indexOf(reactionType);
            if (index > -1) {
              newUserReactions.splice(index, 1);
            }
          }
          
          return {
            ...activity,
            reactions: newReactions,
            userReactions: newUserReactions
          };
        }
        return activity;
      })
    );
  };

  const handleActivityComment = (activityId, comment) => {
    setRecentActivities(prev => 
      prev.map(activity => {
        if (activity.id === activityId) {
          const newComment = {
            id: Date.now(),
            author: { name: 'John Doe' },
            content: comment,
            createdAt: new Date()
          };
          return {
            ...activity,
            comments: [...(activity.comments || []), newComment]
          };
        }
        return activity;
      })
    );
  };

  const handleEventRSVP = (eventId, status) => {
    console.log('RSVP:', eventId, status);
    // Handle RSVP logic
  };

  const handleNotificationRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // Handle notification read logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-primary rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
                  <p className="text-white text-opacity-90">
                    Ready to log your weekly accomplishments and connect with your peers?
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={32} color="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {!showForm && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickActionCard
                  title="Log This Week"
                  description="Document your weekly accomplishments and key learnings"
                  icon="PenTool"
                  variant="primary"
                  onClick={() => handleQuickAction('log-week')}
                />
                <QuickActionCard
                  title="View My PDF Archive"
                  description="Access and download your previous weekly reports"
                  icon="FileText"
                  variant="secondary"
                  onClick={() => handleQuickAction('view-archive')}
                />
                <QuickActionCard
                  title="Mentor Meetings"
                  description="Schedule and manage your mentorship sessions"
                  icon="Users"
                  variant="accent"
                  onClick={() => handleQuickAction('mentor-meetings')}
                />
              </div>
            )}

            {/* Weekly Accomplishment Form */}
            {showForm && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-primary">Log Weekly Accomplishments</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    iconName="X"
                  >
                    Close
                  </Button>
                </div>
                <WeeklyAccomplishmentForm
                  onSave={handleFormSave}
                  onSubmit={handleFormSubmit}
                  onExport={handleExportPDF}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Recent Activity Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={20} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
                    <p className="text-sm text-text-secondary">See what your peers have been working on</p>
                  </div>
                </div>
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => navigate('/activity-feed')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivities.slice(0, 3).map((activity) => (
                  <ActivityFeedCard
                    key={activity.id}
                    activity={activity}
                    onReaction={handleActivityReaction}
                    onComment={handleActivityComment}
                  />
                ))}
              </div>

              {recentActivities.length === 0 && (
                <div className="text-center py-12 bg-surface border border-border rounded-xl">
                  <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Activity" size={24} color="var(--color-text-muted)" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No recent activity</h3>
                  <p className="text-text-secondary mb-4">Be the first to share your weekly accomplishments!</p>
                  <Button
                    variant="primary"
                    onClick={() => setShowForm(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Log This Week
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Metrics */}
            <ProgressMetrics />

            {/* Upcoming Events */}
            <UpcomingEvents
              onViewAll={() => navigate('/program-itinerary')}
              onRSVP={handleEventRSVP}
            />

            {/* Recent Notifications */}
            <RecentNotifications
              onMarkAsRead={handleNotificationRead}
              onViewAll={() => console.log('View all notifications')}
            />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Spacing */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Dashboard;