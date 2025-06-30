import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatus = ({ application, onViewDetails, onWithdraw }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'submitted':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning-50',
          borderColor: 'border-warning-200',
          icon: 'Clock',
          title: 'Application Submitted',
          description: 'Your application is under review. We\'ll notify you of any updates.'
        };
      case 'under_review':
        return {
          color: 'text-secondary',
          bgColor: 'bg-secondary-50',
          borderColor: 'border-secondary-200',
          icon: 'Eye',
          title: 'Under Review',
          description: 'Our team is currently reviewing your application and qualifications.'
        };
      case 'interview_scheduled':
        return {
          color: 'text-accent',
          bgColor: 'bg-accent-50',
          borderColor: 'border-accent-200',
          icon: 'Calendar',
          title: 'Interview Scheduled',
          description: 'Congratulations! Your interview has been scheduled.'
        };
      case 'approved':
        return {
          color: 'text-success',
          bgColor: 'bg-success-50',
          borderColor: 'border-success-200',
          icon: 'CheckCircle',
          title: 'Application Approved',
          description: 'Welcome to the ambassador program! Access your resources below.'
        };
      case 'rejected':
        return {
          color: 'text-error',
          bgColor: 'bg-error-50',
          borderColor: 'border-error-200',
          icon: 'XCircle',
          title: 'Application Not Selected',
          description: 'Thank you for your interest. You may reapply next semester.'
        };
      default:
        return {
          color: 'text-text-muted',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: 'FileText',
          title: 'Draft',
          description: 'Complete your application to submit for review.'
        };
    }
  };

  const statusConfig = getStatusConfig(application.status);

  const timeline = [
    {
      step: 'Application Submitted',
      date: application.submittedDate,
      completed: ['submitted', 'under_review', 'interview_scheduled', 'approved', 'rejected'].includes(application.status),
      current: application.status === 'submitted'
    },
    {
      step: 'Under Review',
      date: application.reviewStartDate,
      completed: ['under_review', 'interview_scheduled', 'approved', 'rejected'].includes(application.status),
      current: application.status === 'under_review'
    },
    {
      step: 'Interview Process',
      date: application.interviewDate,
      completed: ['interview_scheduled', 'approved'].includes(application.status),
      current: application.status === 'interview_scheduled'
    },
    {
      step: 'Final Decision',
      date: application.decisionDate,
      completed: ['approved', 'rejected'].includes(application.status),
      current: ['approved', 'rejected'].includes(application.status)
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return null;
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
          Application Status
        </h2>
        <p className="text-text-secondary">
          Track the progress of your ambassador application.
        </p>
      </div>

      {/* Current Status Card */}
      <div className={`rounded-lg border-2 ${statusConfig.borderColor} ${statusConfig.bgColor} p-4 mb-6`}>
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-full bg-white ${statusConfig.color}`}>
            <Icon name={statusConfig.icon} size={24} />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${statusConfig.color} mb-1`}>
              {statusConfig.title}
            </h3>
            <p className="text-text-secondary text-sm mb-3">
              {statusConfig.description}
            </p>
            
            {application.status === 'interview_scheduled' && application.interviewDate && (
              <div className="bg-white rounded-lg p-3 border border-accent-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-accent" />
                  <span className="font-medium text-text-primary">Interview Details</span>
                </div>
                <p className="text-sm text-text-secondary">
                  <strong>Date:</strong> {formatDate(application.interviewDate)}
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>Time:</strong> {application.interviewTime || '2:00 PM - 2:30 PM'}
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>Format:</strong> {application.interviewFormat || 'Video Call'}
                </p>
                {application.interviewLink && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-2"
                    onClick={() => window.open(application.interviewLink, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    Join Interview
                  </Button>
                )}
              </div>
            )}

            {application.status === 'approved' && (
              <div className="bg-white rounded-lg p-3 border border-success-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={16} className="text-success" />
                  <span className="font-medium text-text-primary">Next Steps</span>
                </div>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Access your ambassador resources below</li>
                  <li>• Complete onboarding training</li>
                  <li>• Schedule your first campus visit</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h3 className="font-medium text-text-primary mb-4">Application Timeline</h3>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.completed 
                    ? 'bg-primary text-white' 
                    : item.current 
                      ? 'bg-warning text-white animate-pulse-slow' :'bg-gray-200 text-gray-400'
                }`}>
                  {item.completed ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                {index < timeline.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 ${
                    item.completed ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h4 className={`font-medium ${
                  item.current ? 'text-primary' : 'text-text-primary'
                }`}>
                  {item.step}
                </h4>
                {item.date && (
                  <p className="text-sm text-text-muted">
                    {formatDate(item.date)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onViewDetails}
          iconName="Eye"
          iconPosition="left"
          fullWidth
        >
          View Application
        </Button>
        
        {['submitted', 'under_review'].includes(application.status) && (
          <Button
            variant="danger"
            onClick={onWithdraw}
            iconName="Trash2"
            iconPosition="left"
            fullWidth
          >
            Withdraw Application
          </Button>
        )}

        {application.status === 'rejected' && (
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
          >
            Apply Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;