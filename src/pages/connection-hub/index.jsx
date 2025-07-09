import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Footer from '../../components/ui/Footer';
import FilterSidebar from '../../components/ui/FilterSidebar';
import ProfileModal from '../../components/ui/ProfileModal';
import DirectoryCards from './components/DirectoryCards';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import ResultsHeader from './components/ResultsHeader';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConnectionHub = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('cards');
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

  // OneDigital Employee Directory
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      title: "Senior Benefits Consultant",
      role: "Benefits Consultant",
      department: "Employee Benefits",
      office: "OneDigital HQ",
      email: "sarah.mitchell@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: true,
      joinDate: "2020-06-15",
      location: "Atlanta, GA",
      bio: "Experienced benefits consultant specializing in helping mid-market companies design comprehensive employee benefit packages. Former JUMPSTART intern passionate about mentoring the next generation.",
      skills: ["Benefits Design", "ERISA Compliance", "Healthcare Analytics", "Client Consulting", "Retirement Planning"],
      interests: ["Employee Wellness", "Healthcare Innovation", "Mentoring"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/sarahmitchell"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "M&A Project Manager",
      role: "Project Manager",
      department: "Mergers & Acquisitions",
      office: "OneDigital HQ",
      email: "marcus.rodriguez@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2019-03-10",
      location: "Atlanta, GA",
      bio: "M&A project manager with 6+ years of experience leading complex acquisition integrations. I specialize in technology due diligence and post-merger integration planning.",
      skills: ["Due Diligence", "Integration Planning", "Financial Modeling", "Risk Assessment", "Project Management"],
      interests: ["Strategic Growth", "Technology Integration", "Team Leadership"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/marcusrodriguez"
    },
    {
      id: 3,
      name: "Emily Chen",
      title: "Financial Advisor",
      role: "Financial Advisor",
      department: "Financial Services",
      office: "OneDigital HQ",
      email: "emily.chen@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: true,
      joinDate: "2021-08-20",
      location: "Atlanta, GA",
      bio: "Financial advisor focused on helping clients achieve their retirement and investment goals. Former JUMPSTART intern who now helps current interns understand financial planning.",
      skills: ["Retirement Planning", "Investment Analysis", "Portfolio Management", "Financial Planning", "Client Relations"],
      interests: ["Investment Strategy", "Financial Education", "Client Development"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/emilychen"
    },
    {
      id: 4,
      name: "David Park",
      title: "Senior Project Manager",
      role: "Project Manager",
      department: "Project Management Office",
      office: "OneDigital HQ",
      email: "david.park@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2018-11-05",
      location: "Atlanta, GA",
      bio: "Senior project manager specializing in large-scale client implementations and technology rollouts. I lead cross-functional teams to deliver complex projects on time and within budget.",
      skills: ["PMP Certified", "Agile/Scrum", "Risk Management", "Resource Planning", "Stakeholder Management"],
      interests: ["Process Improvement", "Team Development", "Technology Innovation"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/davidpark"
    },
    {
      id: 5,
      name: "Jessica Williams",
      title: "VP of Employee Benefits",
      role: "VP Benefits",
      department: "Employee Benefits",
      office: "OneDigital HQ",
      email: "jessica.williams@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2016-01-15",
      location: "Atlanta, GA",
      bio: "VP of Employee Benefits with 12+ years of experience in benefits consulting and strategy. I lead our benefits practice and am passionate about developing talent through our internship program.",
      skills: ["Benefits Strategy", "Team Leadership", "P&L Management", "Client Development", "Regulatory Compliance"],
      interests: ["Benefits Innovation", "Leadership Development", "Industry Trends"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/jessicawilliams"
    },
    {
      id: 6,
      name: "Jordan Martinez",
      title: "Financial Analyst Intern",
      role: "Intern",
      department: "Financial Services",
      office: "OneDigital HQ",
      email: "jordan.martinez@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "Atlanta, GA",
      bio: "Finance major passionate about investment analysis and financial planning. Currently part of the JUMPSTART program learning about retirement planning and portfolio management.",
      skills: ["Financial Modeling", "Excel", "Investment Research", "Data Analysis", "Financial Planning"],
      interests: ["Investment Analysis", "Financial Markets", "Professional Development"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/jordanmartinez"
    },
    {
      id: 7,
      name: "Alex Thompson",
      title: "Project Management Intern",
      role: "Intern",
      department: "Project Management Office",
      office: "OneDigital HQ",
      email: "alex.thompson@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "Atlanta, GA",
      bio: "Business Administration student with a focus on project management. Excited to learn about managing complex client implementations and technology projects in the JUMPSTART program.",
      skills: ["Project Planning", "Microsoft Project", "Process Mapping", "Team Coordination", "Problem Solving"],
      interests: ["Project Management", "Process Improvement", "Technology"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/alexthompson"
    },
    {
      id: 8,
      name: "Michael Davis",
      title: "Director of M&A",
      role: "Director",
      department: "Mergers & Acquisitions",
      office: "OneDigital HQ",
      email: "michael.davis@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2015-09-12",
      location: "Atlanta, GA",
      bio: "Director of M&A with 10+ years of experience leading strategic acquisitions and integrations. I oversee our growth strategy and mentor junior team members in deal evaluation and execution.",
      skills: ["M&A Strategy", "Deal Structuring", "Financial Analysis", "Integration Management", "Team Leadership"],
      interests: ["Strategic Growth", "Market Analysis", "Leadership Development"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/michaeldavis"
    },
    {
      id: 9,
      name: "Rachel Kim",
      title: "Benefits Consultant Intern",
      role: "Intern",
      department: "Employee Benefits",
      office: "OneDigital HQ",
      email: "rachel.kim@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "Atlanta, GA",
      bio: "Human Resources major passionate about employee benefits and wellness programs. Learning about benefits design and ERISA compliance through the JUMPSTART program.",
      skills: ["Benefits Administration", "HRIS Systems", "Compliance Research", "Client Communication", "Data Analysis"],
      interests: ["Employee Wellness", "Benefits Design", "HR Technology"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/rachelkim"
    },
    {
      id: 10,
      name: "Carlos Hernandez",
      title: "Senior Financial Planner",
      role: "Financial Planner",
      department: "Financial Services",
      office: "OneDigital HQ",
      email: "carlos.hernandez@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: true,
      joinDate: "2019-02-18",
      location: "Atlanta, GA",
      bio: "Senior financial planner specializing in executive compensation and retirement planning. Former JUMPSTART intern who now mentors current interns in financial analysis and client relationship management.",
      skills: ["Executive Compensation", "Estate Planning", "Tax Strategy", "Wealth Management", "Client Advisory"],
      interests: ["Financial Education", "Wealth Strategies", "Mentoring"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/carloshernandez"
    },
    {
      id: 11,
      name: "Taylor Johnson",
      title: "M&A Analyst Intern",
      role: "Intern",
      department: "Mergers & Acquisitions",
      office: "OneDigital HQ",
      email: "taylor.johnson@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isFormerIntern: false,
      joinDate: "2024-06-01",
      location: "Atlanta, GA",
      bio: "Finance and Economics double major interested in corporate development and strategic acquisitions. Part of the JUMPSTART program learning about M&A analysis and deal evaluation.",
      skills: ["Financial Modeling", "Valuation Analysis", "Market Research", "Excel/PowerPoint", "Due Diligence"],
      interests: ["Corporate Finance", "Strategic Analysis", "Market Research"],
      connectionStatus: "not_connected",
      linkedinUrl: "https://linkedin.com/in/taylorjohnson"
    },
    {
      id: 12,
      name: "Lisa Anderson",
      title: "Chief Project Officer",
      role: "C-Level Executive",
      department: "Project Management Office",
      office: "OneDigital HQ",
      email: "lisa.anderson@onedigital.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isFormerIntern: false,
      joinDate: "2014-03-22",
      location: "Atlanta, GA",
      bio: "Chief Project Officer overseeing all enterprise initiatives and strategic projects. I champion our internship program and believe in developing the next generation of project management leaders.",
      skills: ["Strategic Planning", "Portfolio Management", "Executive Leadership", "Change Management", "Organizational Development"],
      interests: ["Leadership Development", "Strategic Innovation", "Talent Development"],
      connectionStatus: "connected",
      linkedinUrl: "https://linkedin.com/in/lisaanderson"
    }
  ];

  // Filter configuration
  const filterConfig = {
    department: {
      label: 'Department',
      type: 'multiselect',
      options: ['Employee Benefits', 'Financial Services', 'Mergers & Acquisitions', 'Project Management Office', 'Technology', 'Operations', 'HR']
    },
    role: {
      label: 'Role',
      type: 'multiselect',
      options: ['Intern', 'Benefits Consultant', 'Financial Advisor', 'Financial Planner', 'Project Manager', 'Director', 'VP Benefits', 'C-Level Executive']
    },
    office: {
      label: 'Office',
      type: 'multiselect',
      options: ['OneDigital HQ', 'Atlanta Office', 'Charlotte Office', 'Nashville Office', 'Birmingham Office', 'Remote']
    },
    isFormerIntern: {
      label: 'Former Intern',
      type: 'select',
      options: ['Yes', 'No']
    },
    skills: {
      label: 'Skills',
      type: 'multiselect',
      options: ['Benefits Design', 'ERISA Compliance', 'Financial Planning', 'Project Management', 'Due Diligence', 'Financial Modeling', 'Client Relations', 'M&A Strategy', 'Risk Management', 'Retirement Planning']
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
  const recentSearches = ['Jordan Martinez', 'Employee Benefits', 'Financial Planning', 'Former Intern', 'OneDigital HQ'];

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
            <DirectoryCards
              users={paginatedUsers}
              onUserClick={handleUserClick}
              onEmail={handleEmail}
              searchTerm={searchTerm}
            />
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