import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState(new Set());

  const applications = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@stanford.edu',
      campus: 'Stanford University',
      role: 'Campus Representative',
      status: 'submitted',
      submittedDate: '2024-01-20',
      gpa: 3.8,
      experience: 'President of Computer Science Club, organized 3 tech talks',
      availability: ['monday', 'wednesday', 'friday'],
      pitch: `I'm passionate about connecting students with amazing internship opportunities. As CS Club President, I've organized multiple tech talks and have strong relationships with faculty and students. I believe I can effectively represent your program and help students understand the value of these internships.`,
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@berkeley.edu',
      campus: 'UC Berkeley',
      role: 'Event Coordinator',
      status: 'under_review',
      submittedDate: '2024-01-18',
      gpa: 3.9,
      experience: 'Event coordinator for Engineering Student Council, managed career fair',
      availability: ['tuesday', 'thursday', 'saturday'],
      pitch: `With my experience coordinating large-scale events including our annual career fair with 150+ companies, I have the organizational skills and network to successfully promote your internship program. I'm excited to bring my event management expertise to help students discover these opportunities.`,avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      name: 'Emily Wang',email: 'emily.wang@ucla.edu',campus: 'UCLA',role: 'Student Mentor',status: 'interview_scheduled',submittedDate: '2024-01-15',interviewDate: '2024-01-25',gpa: 3.7,experience: 'Peer tutor, mentored 20+ students in programming courses',
      availability: ['monday', 'tuesday', 'wednesday'],
      pitch: `As a peer tutor who has mentored over 20 students in programming courses, I understand the challenges students face when looking for internships. I want to help bridge that gap by sharing information about your program and supporting students through the application process.`,
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
      id: 4,
      name: 'David Kim',email: 'david.kim@mit.edu',campus: 'MIT',role: 'Recruitment Ambassador',status: 'approved',submittedDate: '2024-01-10',approvedDate: '2024-01-22',gpa: 3.9,experience: 'Former intern at tech startup, active in hackathons and coding competitions',
      availability: ['wednesday', 'friday', 'sunday'],
      pitch: `Having completed internships at both startups and large companies, I understand what students are looking for in internship opportunities. My experience in hackathons and coding competitions has given me a broad network of technically-minded students who would benefit from your program.`,
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
      id: 5,
      name: 'Lisa Thompson',email: 'lisa.t@harvard.edu',campus: 'Harvard University',role: 'Program Advocate',status: 'rejected',submittedDate: '2024-01-12',decisionDate: '2024-01-23',gpa: 3.6,experience: 'Social media coordinator for student government',
      availability: ['thursday', 'friday', 'saturday'],
      pitch: `I'm passionate about helping fellow students find great opportunities. Through my role in student government, I've developed strong communication skills and understand how to reach diverse student populations effectively.`,avatar: 'https://randomuser.me/api/portraits/women/41.jpg'
    }
  ];

  const stats = {
    totalApplications: applications.length,
    pendingReview: applications.filter(app => app.status === 'submitted' || app.status === 'under_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    interviewsScheduled: applications.filter(app => app.status === 'interview_scheduled').length
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'submitted':
        return { color: 'text-warning', bgColor: 'bg-warning-50', label: 'Submitted' };
      case 'under_review':
        return { color: 'text-secondary', bgColor: 'bg-secondary-50', label: 'Under Review' };
      case 'interview_scheduled':
        return { color: 'text-accent', bgColor: 'bg-accent-50', label: 'Interview Scheduled' };
      case 'approved':
        return { color: 'text-success', bgColor: 'bg-success-50', label: 'Approved' };
      case 'rejected':
        return { color: 'text-error', bgColor: 'bg-error-50', label: 'Rejected' };
      default:
        return { color: 'text-text-muted', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.campus.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectApplication = (appId, checked) => {
    setSelectedApplications(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(appId);
      } else {
        newSet.delete(appId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(new Set(filteredApplications.map(app => app.id)));
    } else {
      setSelectedApplications(new Set());
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for applications:`, Array.from(selectedApplications));
    setSelectedApplications(new Set());
  };

  const handleStatusChange = (appId, newStatus) => {
    console.log(`Changing status of application ${appId} to ${newStatus}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Admin Dashboard
        </h2>
        <p className="text-text-secondary">
          Manage ambassador applications and program oversight.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-text-secondary">Total Applications</p>
              <p className="text-xl font-semibold text-primary">{stats.totalApplications}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-warning" />
            <div>
              <p className="text-sm text-text-secondary">Pending Review</p>
              <p className="text-xl font-semibold text-warning">{stats.pendingReview}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-accent" />
            <div>
              <p className="text-sm text-text-secondary">Interviews</p>
              <p className="text-xl font-semibold text-accent">{stats.interviewsScheduled}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="text-sm text-text-secondary">Approved</p>
              <p className="text-xl font-semibold text-success">{stats.approved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedApplications.size > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {selectedApplications.size} application(s) selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('approve')}
                iconName="Check"
                iconPosition="left"
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('schedule_interview')}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('reject')}
                iconName="X"
                iconPosition="left"
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <input
                  type="checkbox"
                  checked={selectedApplications.size === filteredApplications.length && filteredApplications.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Applicant</th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Campus</th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Role</th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Status</th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Submitted</th>
              <th className="text-left py-3 px-4 font-medium text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => {
              const statusConfig = getStatusConfig(app.status);
              
              return (
                <tr key={app.id} className="border-b border-border hover:bg-surface-secondary">
                  <td className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedApplications.has(app.id)}
                      onChange={(e) => handleSelectApplication(app.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={app.avatar}
                        alt={app.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{app.name}</p>
                        <p className="text-sm text-text-muted">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {app.campus}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {app.role}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-button ${statusConfig.bgColor} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-muted">
                    {formatDate(app.submittedDate)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => console.log('View application', app.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => console.log('Edit application', app.id)}
                      />
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="text-xs border border-border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="interview_scheduled">Interview Scheduled</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No applications found</h3>
          <p className="text-text-secondary">
            Try adjusting your search terms or status filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;