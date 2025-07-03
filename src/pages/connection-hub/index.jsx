import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Footer from '../../components/ui/Footer';
import FilterSidebar from '../../components/ui/FilterSidebar';
import ProfileModal from '../../components/ui/ProfileModal';
import DirectoryTable from './components/DirectoryTable';
import DirectoryCards from './components/DirectoryCards';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import ViewToggle from './components/ViewToggle';
import ResultsHeader from './components/ResultsHeader';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConnectionHub = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('table');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    office: '',
    year: '',
    isFormerIntern: '',
    skills: []
  });

  const resultsPerPage = 20;

  // Mock data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      role: "Software Engineer",
      department: "Engineering",
      office: "San Francisco",
      email: "sarah.chen@company.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: true,
      joinDate: "2020-06-15",
      location: "San Francisco, CA",
      bio: "Passionate about building scalable web applications and mentoring junior developers. I love working with React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
      interests: ["Web Development", "Mentoring", "Open Source"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/sarahchen"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Product Manager",
      role: "Product Manager",
      department: "Product",
      office: "New York",
      email: "marcus.johnson@company.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2019-03-10",
      location: "New York, NY",
      bio: "Product manager with 5+ years of experience in B2B SaaS. I focus on user research, product strategy, and cross-functional collaboration.",
      skills: ["Product Strategy", "User Research", "Analytics", "Agile", "Roadmapping"],
      interests: ["Product Design", "Data Analysis", "Team Leadership"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/marcusjohnson"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer",
      role: "Designer",
      department: "Design",
      office: "Austin",
      email: "emily.rodriguez@company.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: true,
      joinDate: "2021-08-20",
      location: "Austin, TX",
      bio: "UX designer passionate about creating intuitive and accessible user experiences. Former intern turned full-time designer.",
      skills: ["Figma", "User Research", "Prototyping", "Accessibility", "Design Systems"],
      interests: ["Accessibility", "Design Systems", "User Psychology"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/emilyrodriguez"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Data Scientist",
      role: "Data Scientist",
      department: "Analytics",
      office: "Seattle",
      email: "david.kim@company.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2018-11-05",
      location: "Seattle, WA",
      bio: "Data scientist specializing in machine learning and predictive analytics. I enjoy solving complex business problems with data.",
      skills: ["Python", "Machine Learning", "SQL", "Tableau", "Statistics"],
      interests: ["AI/ML", "Data Visualization", "Statistics"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/davidkim"
    },
    {
      id: 5,
      name: "Jessica Taylor",
      title: "Marketing Manager",
      role: "Marketing Manager",
      department: "Marketing",
      office: "Los Angeles",
      email: "jessica.taylor@company.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: true,
      joinDate: "2020-01-15",
      location: "Los Angeles, CA",
      bio: "Marketing professional with expertise in digital marketing, content strategy, and brand management. Former intern who loves helping current interns.",
      skills: ["Digital Marketing", "Content Strategy", "SEO", "Analytics", "Brand Management"],
      interests: ["Content Creation", "Brand Strategy", "Social Media"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/jessicataylor"
    },
    {
      id: 6,
      name: "Alex Thompson",
      title: "Software Engineering Intern",
      role: "Intern",
      department: "Engineering",
      office: "San Francisco",
      email: "alex.thompson@company.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "San Francisco, CA",
      bio: "Computer Science student passionate about full-stack development. Currently interning and learning from amazing mentors.",
      skills: ["JavaScript", "React", "Python", "Git", "Problem Solving"],
      interests: ["Web Development", "Open Source", "Learning"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/alexthompson"
    },
    {
      id: 7,
      name: "Priya Patel",
      title: "Product Design Intern",
      role: "Intern",
      department: "Design",
      office: "New York",
      email: "priya.patel@company.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "New York, NY",
      bio: "Design student with a passion for user-centered design and accessibility. Excited to learn and contribute to meaningful projects.",
      skills: ["Figma", "Sketch", "User Research", "Wireframing", "Prototyping"],
      interests: ["UX Design", "Accessibility", "Design Thinking"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/priyapatel"
    },
    {
      id: 8,
      name: "Michael Brown",
      title: "Senior Engineering Manager",
      role: "Engineering Manager",
      department: "Engineering",
      office: "Austin",
      email: "michael.brown@company.com",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2017-09-12",
      location: "Austin, TX",
      bio: "Engineering manager with 8+ years of experience leading high-performing teams. I'm passionate about mentoring and developing talent.",
      skills: ["Team Leadership", "System Architecture", "Mentoring", "Agile", "Strategic Planning"],
      interests: ["Leadership", "Team Building", "Technology Strategy"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/michaelbrown"
    }
  ];

  // Filter configuration
  const filterConfig = {
    department: {
      label: 'Department',
      type: 'multiselect',
      options: ['Engineering', 'Product', 'Design', 'Marketing', 'Analytics', 'Sales', 'HR']
    },
    role: {
      label: 'Role',
      type: 'multiselect',
      options: ['Intern', 'Software Engineer', 'Product Manager', 'Designer', 'Data Scientist', 'Marketing Manager', 'Engineering Manager']
    },
    office: {
      label: 'Office',
      type: 'multiselect',
      options: ['San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles', 'Chicago', 'Boston']
    },
    isFormerIntern: {
      label: 'Former Intern',
      type: 'select',
      options: ['Yes', 'No']
    },
    skills: {
      label: 'Skills',
      type: 'multiselect',
      options: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Figma', 'AWS', 'Machine Learning', 'SQL', 'Analytics']
    }
  };

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set();
    mockUsers.forEach(user => {
      suggestions.add(user.name);
      suggestions.add(user.role);
      suggestions.add(user.department);
      suggestions.add(user.office);
      if (user.skills) {
        user.skills.forEach(skill => suggestions.add(skill));
      }
    });
    return Array.from(suggestions);
  }, []);

  // Recent searches (mock data)
  const recentSearches = ['Sarah Chen', 'Engineering', 'React', 'Former Intern', 'San Francisco'];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower) ||
        user.office.toLowerCase().includes(searchLower) ||
        (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchLower))) ||
        (user.title && user.title.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return;

      if (key === 'isFormerIntern') {
        const isFormerIntern = value === 'Yes';
        filtered = filtered.filter(user => user.isFormerIntern === isFormerIntern);
      } else if (Array.isArray(value)) {
        filtered = filtered.filter(user => {
          if (key === 'skills') {
            return user.skills && value.some(skill => user.skills.includes(skill));
          }
          return value.includes(user[key]);
        });
      } else {
        filtered = filtered.filter(user => user[key] === value);
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  // Sort logic
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    return sorted;
  }, [filteredUsers, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedUsers.length / resultsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return sortedUsers.slice(startIndex, startIndex + resultsPerPage);
  }, [sortedUsers, currentPage, resultsPerPage]);

  // Event handlers
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterKey) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[filterKey])) {
      newFilters[filterKey] = [];
    } else {
      newFilters[filterKey] = '';
    }
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {};
    Object.keys(filterConfig).forEach(key => {
      if (filterConfig[key].type === 'multiselect') {
        clearedFilters[key] = [];
      } else {
        clearedFilters[key] = '';
      }
    });
    setFilters(clearedFilters);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    setSortConfig(prevConfig => ({
      key: column,
      direction: prevConfig.key === column && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = () => {
    console.log('Exporting directory...');
    // Implement export functionality
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleConnect = (userId) => {
    console.log('Connect with user:', userId);
    // Implement connection logic
  };

  const handleMessage = (userId) => {
    console.log('Message user:', userId);
    // Implement messaging logic
  };

  const handleEmail = (userEmail, userName) => {
    if (userEmail) {
      const subject = encodeURIComponent(`OneDigital Intern Connect - Hello from the Directory`);
      const body = encodeURIComponent(`Hi ${userName},\n\nI found your profile in the OneDigital Intern Connect directory and would love to connect!\n\nBest regards`);
      window.location.href = `mailto:${userEmail}?subject=${subject}&body=${body}`;
    }
  };

  const handleViewProfile = (userId) => {
    console.log('View full profile:', userId);
    // Navigate to full profile page
  };

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-switch to cards view on mobile
  useEffect(() => {
    if (isMobile && currentView === 'table') {
      setCurrentView('cards');
    }
  }, [isMobile, currentView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      <TabNavigation />
      
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterConfig={filterConfig}
          className="hidden md:block md:relative md:translate-x-0"
        />

        {/* Main Content */}
        <main className="flex-1 p-6 pt-32 md:pt-36 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="onedigital-header rounded-2xl p-8 text-white shadow-onedigital-lg relative overflow-hidden mb-6">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">🌐 OneDigital Directory</h1>
                    <p className="text-white text-opacity-90 text-lg">
                      Connect with colleagues, mentors, and fellow interns across OneDigital
                    </p>
                  </div>
                  <div className="hidden md:block relative mt-4 sm:mt-0">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20 shadow-lg">
                      <Icon name="Users" size={36} color="white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Browse Directory</h2>
                <p className="text-sm text-gray-500">Find the perfect connections for your career journey</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  className="md:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                </Button>
                
                {!isMobile && (
                  <ViewToggle
                    currentView={currentView}
                    onViewChange={handleViewChange}
                  />
                )}
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
              suggestions={searchSuggestions}
              recentSearches={recentSearches}
              className="mb-4"
            />

            {/* Active Filters */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              filterConfig={filterConfig}
              className="mb-4"
            />
          </div>

          {/* Results Header */}
          <ResultsHeader
            totalResults={sortedUsers.length}
            currentPage={currentPage}
            totalPages={totalPages}
            resultsPerPage={resultsPerPage}
            onExport={handleExport}
            onRefresh={handleRefresh}
            isLoading={isLoading}
            className="mb-6"
          />

          {/* Directory Content */}
          <div className="mb-6">
            {currentView === 'table' && !isMobile ? (
              <DirectoryTable
                users={paginatedUsers}
                onUserClick={handleUserClick}
                onEmail={handleEmail}
                sortConfig={sortConfig}
                onSort={handleSort}
                searchTerm={searchTerm}
              />
            ) : (
              <DirectoryCards
                users={paginatedUsers}
                onUserClick={handleUserClick}
                onEmail={handleEmail}
                searchTerm={searchTerm}
              />
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}
        </main>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        user={selectedUser}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onConnect={handleConnect}
        onMessage={handleMessage}
        onEmail={handleEmail}
        onViewProfile={handleViewProfile}
      />

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        filterConfig={filterConfig}
        className="md:hidden"
      />
      
      <Footer />
    </div>
  );
};

export default ConnectionHub;