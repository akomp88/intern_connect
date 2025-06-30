import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventModal = ({ 
  event, 
  isOpen, 
  onClose, 
  onRSVPToggle, 
  currentUser,
  onEdit,
  onDelete,
  isAdmin = false 
}) => {
  const [userRSVP, setUserRSVP] = useState('pending');

  useEffect(() => {
    if (event && currentUser) {
      const rsvp = event.rsvps?.find(r => r.userId === currentUser.id);
      setUserRSVP(rsvp?.status || 'pending');
    }
  }, [event, currentUser]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRSVP = (status) => {
    setUserRSVP(status);
    if (onRSVPToggle) {
      onRSVPToggle(event.id, status);
    }
  };

  const generateGoogleCalendarUrl = () => {
    const startDate = new Date(`${event.date}T${event.startTime}`);
    const endDate = new Date(`${event.date}T${event.endTime}`);
    
    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
      details: event.description || '',
      location: event.location || ''
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateOutlookCalendarUrl = () => {
    const startDate = new Date(`${event.date}T${event.startTime}`);
    const endDate = new Date(`${event.date}T${event.endTime}`);
    
    const params = new URLSearchParams({
      subject: event.title,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: event.description || '',
      location: event.location || ''
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const getRSVPCount = (status) => {
    return event.rsvps?.filter(r => r.status === status).length || 0;
  };

  const isPastEvent = new Date(`${event.date}T${event.endTime}`) < new Date();

  return (
    <div 
      className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-scale-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl max-h-[90vh] bg-surface rounded-xl shadow-elevation-3 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${
              event.type === 'mandatory' ? 'bg-primary' : 'bg-secondary'
            }`} />
            <h2 className="text-xl font-semibold text-text-primary">{event.title}</h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-button ${
              event.type === 'mandatory' ?'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary'
            }`}>
              {event.type === 'mandatory' ? 'Required' : 'Optional'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit && onEdit(event)}
                  iconName="Edit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete && onDelete(event.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 text-text-secondary">
              <Icon name="Calendar" size={18} />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-text-secondary">
              <Icon name="Clock" size={18} />
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            
            {event.location && (
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="MapPin" size={18} />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.isVirtual && (
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="Video" size={18} />
                <span>Virtual Event</span>
                {event.meetingLink && (
                  <a 
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Join Meeting
                  </a>
                )}
              </div>
            )}
            
            {event.organizer && (
              <div className="flex items-center space-x-3 text-text-secondary">
                <Icon name="User" size={18} />
                <span>Organized by {event.organizer}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-text-primary mb-3">Description</h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* RSVP Statistics */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-3">Attendance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-success-50 rounded-lg">
                <div className="text-2xl font-bold text-success">{getRSVPCount('attending')}</div>
                <div className="text-sm text-success-700">Attending</div>
              </div>
              <div className="text-center p-3 bg-error-50 rounded-lg">
                <div className="text-2xl font-bold text-error">{getRSVPCount('not_attending')}</div>
                <div className="text-sm text-error-700">Not Attending</div>
              </div>
              <div className="text-center p-3 bg-warning-50 rounded-lg">
                <div className="text-2xl font-bold text-warning">{getRSVPCount('pending')}</div>
                <div className="text-sm text-warning-700">Pending</div>
              </div>
            </div>
          </div>

          {/* Calendar Integration */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-3">Add to Calendar</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
                iconName="Calendar"
                iconPosition="left"
              >
                Google Calendar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(generateOutlookCalendarUrl(), '_blank')}
                iconName="Calendar"
                iconPosition="left"
              >
                Outlook Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {!isPastEvent && (
          <div className="p-6 border-t border-border bg-surface-secondary">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant={userRSVP === 'attending' ? 'success' : 'outline'}
                fullWidth
                onClick={() => handleRSVP('attending')}
                iconName="Check"
                iconPosition="left"
              >
                {userRSVP === 'attending' ? 'Attending' : 'Mark as Attending'}
              </Button>
              
              <Button
                variant={userRSVP === 'not_attending' ? 'danger' : 'outline'}
                fullWidth
                onClick={() => handleRSVP('not_attending')}
                iconName="X"
                iconPosition="left"
              >
                {userRSVP === 'not_attending' ? 'Not Attending' : 'Mark as Not Attending'}
              </Button>
            </div>
            
            {userRSVP !== 'pending' && (
              <div className="mt-3 text-center">
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => handleRSVP('pending')}
                >
                  Reset RSVP
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;