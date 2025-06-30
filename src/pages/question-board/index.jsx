import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ChannelSelector from './components/ChannelSelector';
import QuestionCard from './components/QuestionCard';
import SearchAndFilter from './components/SearchAndFilter';
import NewQuestionModal from './components/NewQuestionModal';
import TrendingTopics from './components/TrendingTopics';
import QuickStats from './components/QuickStats';

const QuestionBoard = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'recent',
    dateRange: 'all',
    tags: []
  });
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  // Mock data
  const channels = [
    {
      id: 'general',
      name: 'General',
      description: 'General questions and discussions',
      questionCount: 156,
      hasUnread: true
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Programming and technical questions',
      questionCount: 89,
      hasUnread: false
    },
    {
      id: 'career',
      name: 'Career',
      description: 'Career advice and guidance',
      questionCount: 67,
      hasUnread: true
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Project-related discussions',
      questionCount: 43,
      hasUnread: false
    },
    {
      id: 'mentorship',
      name: 'Mentorship',
      description: 'Mentorship and learning',
      questionCount: 32,
      hasUnread: false
    }
  ];

  const mockQuestions = [
    {
      id: 1,
      title: "How do I optimize React component re-renders?",
      content: `I'm working on a dashboard with multiple components that seem to re-render unnecessarily. I've tried using React.memo but I'm still seeing performance issues.\n\nThe components are receiving props that change frequently, and I'm not sure how to prevent the cascade of re-renders. Any suggestions on best practices?`,
      author: {
        id: 'user1',
        name: 'Sarah Chen',
        role: 'Frontend Intern',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      channel: 'technical',
      tags: ['React', 'Performance', 'JavaScript'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      votes: 12,
      userVote: null,
      answerCount: 3,
      views: 45,
      isResolved: false,
      answers: [
        {
          id: 'a1',
          content: `Try using useMemo and useCallback hooks to memoize expensive calculations and functions. Also, consider using React.memo with a custom comparison function for more control over when components should re-render.`,
          author: {
            id: 'mentor1',
            name: 'Alex Rodriguez',
            role: 'Senior Developer',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
          },
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 8,
          isAccepted: true
        }
      ]
    },
    {
      id: 2,
      title: "Best practices for internship networking?",
      content: `I'm halfway through my internship and want to make the most of networking opportunities. What are some effective ways to connect with colleagues and build professional relationships?\n\nI'm a bit introverted, so any tips for someone who finds networking challenging would be really helpful.`,
      author: {
        id: 'user2',
        name: 'Michael Johnson',
        role: 'Marketing Intern',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
      },
      channel: 'career',
      tags: ['Networking', 'Career', 'Professional Development'],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      votes: 8,
      userVote: 'up',
      answerCount: 5,
      views: 67,
      isResolved: true,
      answers: [
        {
          id: 'a2',
          content: `Start with informal coffee chats! Most people are happy to share their experiences. Also, attend company events and don't be afraid to ask questions during meetings - it shows engagement.`,
          author: {
            id: 'mentor2',name: 'Jennifer Liu',role: 'Marketing Manager',avatar: 'https://randomuser.me/api/portraits/women/35.jpg'
          },
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          likes: 12,
          isAccepted: true
        }
      ]
    },
    {
      id: 3,
      title: "How to handle imposter syndrome during internship?",
      content: `I'm feeling overwhelmed and like I don't belong here. Everyone seems so much more knowledgeable than me, and I'm afraid to ask questions because I don't want to seem incompetent.\n\nHas anyone else experienced this? How did you overcome these feelings?`,
      author: {
        id: 'user3',name: 'Emily Davis',role: 'Data Science Intern',avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
      },
      channel: 'general',
      tags: ['Mental Health', 'Career', 'Support'],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      votes: 15,
      userVote: null,
      answerCount: 7,
      views: 89,
      isResolved: false,
      answers: []
    },
    {
      id: 4,
      title: "Git workflow best practices for team projects?",
      content: `Our team is working on a large project and we're having issues with merge conflicts and branch management. What's the best Git workflow for a team of 6 developers?\n\nWe're currently using feature branches but running into problems when multiple people work on related features.`,
      author: {
        id: 'user4',
        name: 'David Park',
        role: 'Backend Intern',
        avatar: 'https://randomuser.me/api/portraits/men/31.jpg'
      },
      channel: 'technical',
      tags: ['Git', 'Version Control', 'Team Collaboration'],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      votes: 6,
      userVote: null,
      answerCount: 2,
      views: 34,
      isResolved: false,
      answers: []
    },
    {
      id: 5,
      title: "How to prepare for final internship presentation?",
      content: `I need to present my project to senior leadership next week. This is my first time presenting to executives and I'm nervous about it.\n\nWhat should I focus on? How technical should I get? Any tips for handling Q&A sessions?`,
      author: {
        id: 'user5',name: 'Lisa Wang',role: 'Product Intern',avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
      },
      channel: 'career',
      tags: ['Presentation', 'Leadership', 'Communication'],
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      votes: 9,
      userVote: null,
      answerCount: 4,
      views: 56,
      isResolved: true,
      answers: []
    }
  ];

  const trendingTopics = [
    { tag: 'React', questionCount: 23, growth: 15 },
    { tag: 'Career', questionCount: 18, growth: 8 },
    { tag: 'JavaScript', questionCount: 16, growth: 12 },
    { tag: 'Networking', questionCount: 14, growth: 22 },
    { tag: 'Python', questionCount: 12, growth: 5 }
  ];

  const stats = {
    totalQuestions: 312,
    answeredToday: 18,
    activeUsers: 89,
    avgResponseTime: '2.4h'
  };

  useEffect(() => {
    // Set default channel
    if (channels.length > 0) {
      setSelectedChannel(channels[0]);
    }
    
    // Simulate loading
    setTimeout(() => {
      setQuestions(mockQuestions);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter questions based on search term, filters, and selected channel
    let filtered = questions;

    // Filter by channel
    if (selectedChannel) {
      filtered = filtered.filter(q => q.channel === selectedChannel.id);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchLower) ||
        q.content.toLowerCase().includes(searchLower) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        q.author.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      switch (filters.status) {
        case 'open':
          filtered = filtered.filter(q => !q.isResolved);
          break;
        case 'resolved':
          filtered = filtered.filter(q => q.isResolved);
          break;
        case 'unanswered':
          filtered = filtered.filter(q => q.answerCount === 0);
          break;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(q => 
        filters.tags.some(tag => q.tags.includes(tag))
      );
    }

    // Sort questions
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'votes':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'answers':
        filtered.sort((a, b) => b.answerCount - a.answerCount);
        break;
      default: // recent
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, filters, selectedChannel]);

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      sortBy: 'recent',
      dateRange: 'all',
      tags: []
    });
    setSearchTerm('');
  };

  const handleVote = (questionId, voteType) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        let newVotes = q.votes;
        let newUserVote = voteType;

        if (q.userVote === voteType) {
          // Remove vote
          newUserVote = null;
          newVotes = voteType === 'up' ? q.votes - 1 : q.votes + 1;
        } else if (q.userVote) {
          // Change vote
          newVotes = voteType === 'up' ? q.votes + 2 : q.votes - 2;
        } else {
          // Add new vote
          newVotes = voteType === 'up' ? q.votes + 1 : q.votes - 1;
        }

        return { ...q, votes: newVotes, userVote: newUserVote };
      }
      return q;
    }));
  };

  const handleAnswer = (questionId, content) => {
    const newAnswer = {
      id: `a${Date.now()}`,
      content,
      author: {
        id: 'current-user',
        name: 'John Doe',
        role: 'Software Engineering Intern',
        avatar: null
      },
      timestamp: new Date(),
      likes: 0,
      isAccepted: false
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...(q.answers || []), newAnswer],
          answerCount: q.answerCount + 1
        };
      }
      return q;
    }));
  };

  const handleSubmitQuestion = async (questionData) => {
    const newQuestion = {
      id: Date.now(),
      ...questionData,
      author: {
        id: 'current-user',
        name: 'John Doe',
        role: 'Software Engineering Intern',
        avatar: null
      },
      timestamp: new Date(),
      votes: 0,
      userVote: null,
      answerCount: 0,
      views: 1,
      isResolved: false,
      answers: []
    };

    setQuestions(prev => [newQuestion, ...prev]);
  };

  const handleTopicClick = (topic) => {
    setFilters(prev => ({
      ...prev,
      tags: [topic]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Question Board - Intern Connect</title>
          <meta name="description" content="Ask questions and get answers from peers and mentors" />
        </Helmet>
        <Header />
        <TabNavigation />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-muted">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Question Board - Intern Connect</title>
        <meta name="description" content="Ask questions and get answers from peers and mentors in your internship program" />
      </Helmet>
      
      <Header />
      <TabNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Question Board</h1>
              <p className="text-text-secondary mt-1">
                Ask questions, share knowledge, and learn from your peers
              </p>
            </div>
            
            <Button
              variant="primary"
              onClick={() => setIsNewQuestionModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              className="sm:w-auto w-full"
            >
              Ask Question
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={stats} className="mb-6" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Channel Selector */}
            <ChannelSelector
              channels={channels}
              selectedChannel={selectedChannel}
              onChannelChange={handleChannelChange}
            />

            {/* Search and Filters */}
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-text-primary">
                  {filteredQuestions.length} Questions
                </h2>
                {selectedChannel && (
                  <span className="text-sm text-text-muted">
                    in #{selectedChannel.name}
                  </span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden"
                iconName="SidebarOpen"
              >
                Topics
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onVote={handleVote}
                    onAnswer={handleAnswer}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircleQuestion" size={32} className="text-text-muted" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    No questions found
                  </h3>
                  <p className="text-text-muted mb-4">
                    {searchTerm || filters.tags.length > 0 || filters.status !== 'all' ?'Try adjusting your search or filters' :'Be the first to ask a question in this channel'
                    }
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setIsNewQuestionModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Ask Question
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={`lg:block ${showSidebar ? 'block' : 'hidden'} space-y-6`}>
            <TrendingTopics
              topics={trendingTopics}
              onTopicClick={handleTopicClick}
            />
            
            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg shadow-elevation-1 p-4">
              <h3 className="font-semibold text-text-primary mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => setSearchTerm('unanswered')}
                >
                  Find Unanswered
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Users"
                  iconPosition="left"
                  onClick={() => setFilters(prev => ({ ...prev, tags: ['Mentorship'] }))}
                >
                  Mentorship Questions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Code"
                  iconPosition="left"
                  onClick={() => setFilters(prev => ({ ...prev, tags: ['Technical'] }))}
                >
                  Technical Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Question Modal */}
      <NewQuestionModal
        isOpen={isNewQuestionModalOpen}
        onClose={() => setIsNewQuestionModalOpen(false)}
        onSubmit={handleSubmitQuestion}
        channels={channels}
      />

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="lg:hidden fixed inset-0 z-200 bg-black bg-opacity-50"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default QuestionBoard;