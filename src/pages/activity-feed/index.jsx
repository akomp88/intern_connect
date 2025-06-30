import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import ActivityCard from './components/ActivityCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import PostLimitNotice from './components/PostLimitNotice';
import EmptyState from './components/EmptyState';

const ActivityFeed = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    team: '',
    project: '',
    office: 'My office',
    dateRange: 'last 7 days',
    author: '',
    tags: []
  });

  // Mock data for activities
  const mockActivities = [
    {
      id: 1,
      author: {
        id: 'user-1',
        name: 'Sarah Chen',
        role: 'Product Management Intern',
        team: 'Product Management',
        office: 'San Francisco',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      content: `Just completed my first user research session for the mobile app redesign project! 🎯\n\nKey insights from today's interviews:\n• Users want faster navigation between main features\n• The current onboarding flow is too lengthy\n• Push notifications need better customization options\n\nExcited to synthesize these findings and present to the team next week. Thanks to @MikeJohnson for mentoring me through the research methodology!`,
      projects: ['Mobile App Redesign', 'User Research'],
      tags: ['research', 'mobile', 'ux', 'interviews'],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      reactions: {
        like: 12,
        celebrate: 8,
        interested: 3
      },
      commentCount: 5,
      comments: [
        {
          id: 1,
          content: 'Great insights Sarah! The navigation feedback aligns with what we\'ve been hearing from support tickets.',
          author: {
            id: 'user-2',
            name: 'Mike Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            role: 'Senior Product Manager'
          },
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: {
        id: 'user-3',
        name: 'Alex Rodriguez',
        role: 'Software Engineering Intern',
        team: 'Engineering',
        office: 'Austin',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      content: `Deployed my first feature to production today! 🚀\n\nImplemented the new API endpoint for user preferences that will power the personalization features. The endpoint handles:\n• User preference storage and retrieval\n• Real-time updates via WebSocket\n• Proper error handling and validation\n\nLearned so much about production deployment processes and monitoring. Special thanks to the DevOps team for their patience with my questions!`,
      projects: ['API Integration', 'Personalization Engine'],
      tags: ['backend', 'api', 'deployment', 'websocket'],
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      reactions: {
        like: 18,
        celebrate: 15,
        interested: 2
      },
      commentCount: 8,
      comments: []
    },
    {
      id: 3,
      author: {
        id: 'user-4',
        name: 'Emma Thompson',
        role: 'Design Intern',
        team: 'Design',
        office: 'New York',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      content: `Finished the wireframes for the new dashboard layout! ✨\n\nFocused on improving information hierarchy and reducing cognitive load. Key changes:\n• Consolidated similar actions into grouped sections\n• Added progressive disclosure for advanced features\n• Improved mobile responsiveness with collapsible panels\n\nLooking forward to user testing these concepts next week. The iterative design process has been such a great learning experience!`,
      projects: ['Customer Dashboard', 'UI/UX Redesign'],
      tags: ['design', 'wireframes', 'dashboard', 'mobile'],
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      reactions: {
        like: 14,
        celebrate: 6,
        interested: 9
      },
      commentCount: 3,
      comments: []
    },
    {
      id: 4,
      author: {
        id: 'user-5',
        name: 'David Kim',
        role: 'Data Science Intern',
        team: 'Data Science',
        office: 'Seattle',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      },
      content: `Completed my analysis of user engagement patterns! 📊\n\nUsing Python and SQL, I analyzed 6 months of user interaction data to identify:\n• Peak usage times across different user segments\n• Feature adoption rates for new releases\n• Correlation between onboarding completion and long-term retention\n\nThe insights will help inform our product roadmap and marketing strategies. Data storytelling is becoming one of my favorite aspects of this role!`,
      projects: ['Analytics Platform', 'User Engagement Study'],
      tags: ['data', 'python', 'sql', 'analytics', 'insights'],
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      reactions: {
        like: 16,
        celebrate: 11,
        interested: 7
      },
      commentCount: 6,
      comments: []
    },
    {
      id: 5,
      author: {
        id: 'user-6',
        name: 'Jessica Park',
        role: 'Marketing Intern',
        team: 'Marketing',
        office: 'Chicago',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
      },
      content: `Launched my first email campaign today! 📧\n\nCreated a welcome series for new users that includes:\n• Personalized onboarding tips based on user role\n• Feature highlights with interactive demos\n• Success stories from existing customers\n\nInitial metrics look promising with 34% open rate and 8% click-through rate. Learning so much about email marketing automation and A/B testing!`,
      projects: ['Email Marketing', 'User Onboarding'],
      tags: ['marketing', 'email', 'automation', 'metrics'],
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      reactions: {
        like: 13,
        celebrate: 9,
        interested: 4
      },
      commentCount: 4,
      comments: []
    }
  ];

  // Simulate loading activities
  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActivities(mockActivities);
      setLoading(false);
    };

    loadActivities();
  }, []);

  // Filter activities based on current filters
  const filteredActivities = activities.filter(activity => {
    if (filters.team && activity.author.team !== filters.team) return false;
    if (filters.project && !activity.projects.some(p => p.includes(filters.project))) return false;
    if (filters.office !== 'My office' && activity.author.office !== filters.office) return false;
    if (filters.author && !activity.author.name.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => activity.tags.includes(tag))) return false;
    
    // Date range filtering (simplified)
    const now = new Date();
    const activityDate = new Date(activity.createdAt);
    const diffInDays = Math.floor((now - activityDate) / (1000 * 60 * 60 * 24));
    
    switch (filters.dateRange) {
      case 'Today':
        return diffInDays === 0;
      case 'Yesterday':
        return diffInDays === 1;
      case 'last 7 days':
        return diffInDays <= 7;
      case 'last 14 days':
        return diffInDays <= 14;
      case 'last 30 days':
        return diffInDays <= 30;
      default:
        return true;
    }
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger a new API call
  };

  const handleReaction = (activityId, reactionType, isAdding) => {
    setActivities(prevActivities =>
      prevActivities.map(activity => {
        if (activity.id === activityId) {
          const newReactions = { ...activity.reactions };
          if (isAdding) {
            newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          } else {
            newReactions[reactionType] = Math.max(0, (newReactions[reactionType] || 0) - 1);
          }
          return { ...activity, reactions: newReactions };
        }
        return activity;
      })
    );
  };

  const handleComment = (activityId, comment, parentCommentId = null) => {
    setActivities(prevActivities =>
      prevActivities.map(activity => {
        if (activity.id === activityId) {
          const newComments = [...(activity.comments || [])];
          
          if (parentCommentId) {
            // Add reply to existing comment
            const parentIndex = newComments.findIndex(c => c.id === parentCommentId);
            if (parentIndex !== -1) {
              newComments[parentIndex] = {
                ...newComments[parentIndex],
                replies: [...(newComments[parentIndex].replies || []), comment]
              };
            }
          } else {
            // Add new top-level comment
            newComments.push(comment);
          }
          
          return {
            ...activity,
            comments: newComments,
            commentCount: (activity.commentCount || 0) + 1
          };
        }
        return activity;
      })
    );
  };

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate loading more content
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
      // In a real app, you'd append new activities here
    }, 1000);
  }, [loading, hasMore]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.team) count++;
    if (filters.project) count++;
    if (filters.office !== 'My office') count++;
    if (filters.dateRange !== 'last 7 days') count++;
    if (filters.author) count++;
    if (filters.tags && filters.tags.length > 0) count++;
    return count;
  };

  const hasActiveFilters = getActiveFilterCount() > 0;

  return (
    <>
      <Helmet>
        <title>Activity Feed - Intern Connect</title>
        <meta name="description" content="Discover peer accomplishments, engage through reactions and comments, and stay connected with program activities." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-2xl mx-auto px-4 py-6">
              {/* Header Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-text-primary">Activity Feed</h1>
                  {hasActiveFilters && (
                    <span className="px-3 py-1 bg-primary-100 text-primary text-sm font-medium rounded-full">
                      {getActiveFilterCount()} {getActiveFilterCount() === 1 ? 'filter' : 'filters'} active
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterSidebarOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="md:hidden"
                  >
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </Button>

                  {/* Refresh Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.reload()}
                    iconName="RefreshCw"
                  >
                    <span className="hidden sm:inline ml-2">Refresh</span>
                  </Button>
                </div>
              </div>

              {/* Post Limit Notice */}
              <PostLimitNotice
                userPostCount={5}
                maxPosts={3}
                onShowMore={() => console.log('Show more posts')}
              />

              {/* Content */}
              {loading && activities.length === 0 ? (
                <LoadingSkeleton count={3} />
              ) : filteredActivities.length === 0 ? (
                <EmptyState
                  type={activities.length === 0 ? 'no-posts' : 'no-results'}
                  hasActiveFilters={hasActiveFilters}
                  onCreatePost={() => console.log('Create post')}
                  onClearFilters={() => setFilters({
                    team: '',
                    project: '',
                    office: 'My office',
                    dateRange: 'last 7 days',
                    author: '',
                    tags: []
                  })}
                />
              ) : (
                <>
                  {/* Activities List */}
                  <div className="space-y-4">
                    {filteredActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onReaction={handleReaction}
                        onComment={handleComment}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {loading && activities.length > 0 && (
                    <div className="mt-6">
                      <LoadingSkeleton count={2} />
                    </div>
                  )}

                  {!hasMore && filteredActivities.length > 0 && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center space-x-2 text-text-muted">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-sm">You've reached the end of the feed</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityFeed;