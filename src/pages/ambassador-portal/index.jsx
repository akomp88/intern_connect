import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ApplicationForm from './components/ApplicationForm';
import ApplicationStatus from './components/ApplicationStatus';
import ResourceLibrary from './components/ResourceLibrary';
import EventScheduling from './components/EventScheduling';
import AdminDashboard from './components/AdminDashboard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AmbassadorPortal = () => {
  const [userRole, setUserRole] = useState('applicant'); // applicant, approved, admin
  const [hasApplication, setHasApplication] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user application data
  const mockApplication = {
    id: 1,
    status: 'under_review', // submitted, under_review, interview_scheduled, approved, rejected
    submittedDate: '2024-01-20',
    reviewStartDate: '2024-01-22',
    interviewDate: '2024-01-28',
    interviewTime: '2:00 PM - 2:30 PM',
    interviewFormat: 'Video Call',
    interviewLink: 'https://meet.google.com/abc-defg-hij',
    decisionDate: null,
    campus: 'Stanford University',
    role: 'Campus Representative',
    pitch: `I'm passionate about connecting students with amazing internship opportunities. As CS Club President, I've organized multiple tech talks and have strong relationships with faculty and students.`,
    experience: 'President of Computer Science Club, organized 3 tech talks',
    availability: ['monday', 'wednesday', 'friday'],
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'john.doe@stanford.edu',
      linkedIn: 'https://linkedin.com/in/johndoe'
    }
  };

  useEffect(() => {
    // Simulate checking user role and application status
    const checkUserStatus = () => {
      // Mock logic - in real app, this would come from API
      const roles = ['applicant', 'approved', 'admin'];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      setUserRole('applicant'); // Set to applicant for demo
      
      // Check if user has existing application
      if (randomRole === 'applicant') {
        setHasApplication(Math.random() > 0.5); // 50% chance of having application
      } else {
        setHasApplication(true);
      }
    };

    checkUserStatus();
  }, []);

  const handleApplicationSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Application submitted:', formData);
      setHasApplication(true);
      setSelectedTab('status');
      
      // Show success message
      alert('Application submitted successfully! You will receive updates via email.');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = () => {
    console.log('Viewing application details');
  };

  const handleWithdrawApplication = () => {
    if (confirm('Are you sure you want to withdraw your application? This action cannot be undone.')) {
      setHasApplication(false);
      setSelectedTab('overview');
      alert('Application withdrawn successfully.');
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-primary text-white rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <Icon name="Star" size={32} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Ambassador Portal</h1>
                  <p className="text-blue-100">
                    {userRole === 'admin' ?'Manage ambassador applications and program oversight.'
                      : userRole === 'approved' ?'Welcome to the ambassador program! Access your resources and manage events.' :'Join our campus ambassador program and represent our internship opportunities at your university.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRole === 'admin' ? (
                <>
                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Icon name="Users" size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Manage Applications</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Review and process ambassador applications from students.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedTab('admin')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View Dashboard
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-secondary-100 rounded-lg">
                        <Icon name="BarChart" size={24} className="text-secondary" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Program Analytics</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      View program performance and ambassador activity metrics.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View Analytics
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-accent-100 rounded-lg">
                        <Icon name="Settings" size={24} className="text-accent" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Program Settings</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Configure program requirements and application settings.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Manage Settings
                    </Button>
                  </div>
                </>
              ) : userRole === 'approved' ? (
                <>
                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-success-100 rounded-lg">
                        <Icon name="Calendar" size={24} className="text-success" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Schedule Events</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Plan and manage your campus visits and recruitment events.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedTab('events')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Manage Events
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-secondary-100 rounded-lg">
                        <Icon name="BookOpen" size={24} className="text-secondary" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Resource Library</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Access presentation templates, talking points, and materials.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedTab('resources')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Browse Resources
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-accent-100 rounded-lg">
                        <Icon name="TrendingUp" size={24} className="text-accent" />
                      </div>
                      <h3 className="font-semibold text-text-primary">My Performance</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Track your ambassador activities and impact metrics.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View Stats
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Icon name="FileText" size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-text-primary">
                        {hasApplication ? 'Application Status' : 'Apply Now'}
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      {hasApplication 
                        ? 'Check the status of your ambassador application.'
                        : 'Submit your application to become a campus ambassador.'
                      }
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedTab(hasApplication ? 'status' : 'apply')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      {hasApplication ? 'View Status' : 'Start Application'}
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-secondary-100 rounded-lg">
                        <Icon name="BookOpen" size={24} className="text-secondary" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Program Information</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Learn about the ambassador program and available resources.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedTab('resources')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Learn More
                    </Button>
                  </div>

                  <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-accent-100 rounded-lg">
                        <Icon name="HelpCircle" size={24} className="text-accent" />
                      </div>
                      <h3 className="font-semibold text-text-primary">Get Help</h3>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">
                      Have questions about the application process or program?
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Contact Support
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Program Benefits */}
            {userRole === 'applicant' && (
              <div className="bg-surface border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Why Become an Ambassador?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-success-100 rounded-lg">
                      <Icon name="Award" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Professional Development</h3>
                      <p className="text-sm text-text-secondary">
                        Gain valuable experience in recruitment, event planning, and professional networking.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Network Building</h3>
                      <p className="text-sm text-text-secondary">
                        Connect with industry professionals and fellow ambassadors across universities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-secondary-100 rounded-lg">
                      <Icon name="Briefcase" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Career Opportunities</h3>
                      <p className="text-sm text-text-secondary">
                        Get priority consideration for internships and full-time positions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-accent-100 rounded-lg">
                      <Icon name="Heart" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">Make an Impact</h3>
                      <p className="text-sm text-text-secondary">
                        Help fellow students discover amazing internship opportunities and career paths.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'apply':
        return (
          <ApplicationForm 
            onSubmit={handleApplicationSubmit}
            isSubmitting={isSubmitting}
          />
        );

      case 'status':
        return (
          <ApplicationStatus
            application={mockApplication}
            onViewDetails={handleViewDetails}
            onWithdraw={handleWithdrawApplication}
          />
        );

      case 'resources':
        return <ResourceLibrary userRole={userRole} />;

      case 'events':
        return <EventScheduling userRole={userRole} />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return null;
    }
  };

  const getTabItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: 'Home' }
    ];

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { id: 'admin', label: 'Applications', icon: 'Users' },
        { id: 'resources', label: 'Resources', icon: 'BookOpen' }
      ];
    } else if (userRole === 'approved') {
      return [
        ...baseItems,
        { id: 'events', label: 'Events', icon: 'Calendar' },
        { id: 'resources', label: 'Resources', icon: 'BookOpen' },
        { id: 'status', label: 'My Application', icon: 'FileText' }
      ];
    } else {
      const items = [
        ...baseItems,
        { id: 'resources', label: 'Information', icon: 'BookOpen' }
      ];

      if (hasApplication) {
        items.push({ id: 'status', label: 'My Application', icon: 'FileText' });
      } else {
        items.push({ id: 'apply', label: 'Apply', icon: 'Plus' });
      }

      return items;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
            {getTabItems().map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                  selectedTab === item.id
                    ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-primary hover:border-primary-200'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AmbassadorPortal;