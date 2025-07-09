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
      description: 'General OneDigital questions and discussions',
      questionCount: 156,
      hasUnread: true
    },
    {
      id: 'benefits',
      name: 'Employee Benefits',
      description: 'Benefits consulting and HR solutions',
      questionCount: 89,
      hasUnread: false
    },
    {
      id: 'insurance',
      name: 'Insurance',
      description: 'Insurance products and risk management',
      questionCount: 67,
      hasUnread: true
    },
    {
      id: 'projects',
      name: 'Project Management',
      description: 'Project planning and client delivery',
      questionCount: 43,
      hasUnread: false
    },
    {
      id: 'finance',
      name: 'Finance & Analytics',
      description: 'Financial planning and data analysis',
      questionCount: 32,
      hasUnread: false
    }
  ];

  const mockQuestions = [
    {
      id: 1,
      title: "How do I best explain complex benefit packages to clients?",
      content: `I'm working with a client who has a diverse workforce and they're struggling to understand the different benefit options available. How can I simplify the explanation while ensuring they understand the value?\n\nThey seem overwhelmed by all the healthcare plan options and retirement savings choices. Any tips for making this more digestible?`,
      author: {
        id: 'user1',
        name: 'Sarah Chen',
        role: 'Benefits Consultant Intern',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      channel: 'benefits',
      tags: ['Employee Benefits', 'Client Communication', 'Healthcare Plans'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      votes: 12,
      userVote: null,
      answerCount: 3,
      views: 45,
      isResolved: false,
      answers: [
        {
          id: 'a1',
          content: `Create visual comparison charts and use real-world examples. Focus on the value proposition first, then dive into details. Also consider creating different communication materials for different employee segments.`,
          author: {
            id: 'mentor1',
            name: 'Alex Rodriguez',
            role: 'Senior Benefits Consultant',
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
      title: "Best practices for client relationship management in insurance?",
      content: `I'm working with several insurance clients and want to make sure I'm building strong, lasting relationships. What are some effective ways to maintain regular communication and add value beyond just policy administration?\n\nI'm particularly interested in how to be proactive rather than just reactive to their needs.`,
      author: {
        id: 'user2',
        name: 'Michael Johnson',
        role: 'Insurance Solutions Intern',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
      },
      channel: 'insurance',
      tags: ['Client Relations', 'Insurance', 'Account Management'],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      votes: 8,
      userVote: 'up',
      answerCount: 5,
      views: 67,
      isResolved: true,
      answers: [
        {
          id: 'a2',
          content: `Schedule regular check-ins, send industry updates, and always come prepared with insights about their business. Anticipate their renewal periods and market changes that might affect them.`,
          author: {
            id: 'mentor2',
            name: 'Jennifer Liu',
            role: 'Insurance Account Manager',
            avatar: 'https://randomuser.me/api/portraits/women/35.jpg'
          },
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          likes: 12,
          isAccepted: true
        }
      ]
    },
    {
      id: 3,
      title: "How to effectively manage multiple client projects simultaneously?",
      content: `I'm currently handling 4 different client implementations and struggling to keep all the timelines and deliverables organized. What project management tools and techniques work best for our industry?\n\nI don't want to drop the ball on any client, but I'm feeling overwhelmed by all the moving parts.`,
      author: {
        id: 'user3',
        name: 'Emily Davis',
        role: 'Project Management Intern',
        avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
      },
      channel: 'projects',
      tags: ['Project Management', 'Client Delivery', 'Time Management'],
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
      title: "Understanding financial reporting requirements for employee benefits",
      content: `I'm working on a client's annual benefits report and need to understand the key financial metrics and compliance requirements. What are the most important KPIs to track?\n\nSpecifically looking for guidance on ERISA reporting and how to present cost trends to the C-suite.`,
      author: {
        id: 'user4',
        name: 'David Park',
        role: 'Finance & Analytics Intern',
        avatar: 'https://randomuser.me/api/portraits/men/31.jpg'
      },
      channel: 'finance',
      tags: ['Financial Analysis', 'ERISA Compliance', 'Benefits Reporting'],
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
      title: "How to present ROI of wellness programs to skeptical clients?",
      content: `I need to present the business case for implementing a comprehensive wellness program to a client who is very cost-conscious. They're questioning the ROI and want hard data.\n\nWhat metrics and case studies work best for demonstrating the value? How do I address their concerns about employee participation rates?`,
      author: {
        id: 'user5',
        name: 'Lisa Wang',
        role: 'Benefits Consultant Intern',
        avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
      },
      channel: 'benefits',
      tags: ['Wellness Programs', 'ROI Analysis', 'Client Presentations'],
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
    { tag: 'Employee Benefits', questionCount: 28, growth: 22 },
    { tag: 'Insurance Solutions', questionCount: 24, growth: 18 },
    { tag: 'Project Management', questionCount: 19, growth: 15 },
    { tag: 'Client Relations', questionCount: 16, growth: 12 },
    { tag: 'Finance & Analytics', questionCount: 14, growth: 8 }
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
        role: 'Project Management Intern',
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
        role: 'Project Management Intern',
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Helmet>
          <title>OneDigital Knowledge Hub - Intern Connect</title>
          <meta name="description" content="Ask questions about employee benefits, insurance solutions, and project management with OneDigital experts" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Helmet>
          <title>OneDigital Knowledge Hub - Intern Connect</title>
          <meta name="description" content="Ask questions about employee benefits, insurance solutions, and project management with OneDigital experts and interns" />
        </Helmet>
      
      <Header />
      <TabNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 md:pt-32">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">OneDigital Knowledge Hub</h1>
              <p className="text-text-secondary mt-1">
                Ask questions about benefits, insurance, and project management with OneDigital experts
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