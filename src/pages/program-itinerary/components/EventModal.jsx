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

  const getEventCategoryColor = (event) => {
    switch (event.category) {
      case 'mentorship':
        return 'from-[rgb(103,157,78)] to-[rgb(178,193,74)]';
      case 'client-meeting':
      case 'client-prep':
        return 'from-[rgb(226,110,56)] to-[rgb(246,198,69)]';
      case 'standup':
      case 'tech-talk':
        return 'from-[rgb(44,104,142)] to-[rgb(108,178,202)]';
      case 'networking':
      case 'leadership':
        return 'from-purple-500 to-pink-500';
      case 'workshop':
        return 'from-indigo-500 to-blue-500';
      default:
        return event.type === 'mandatory' 
          ? 'from-[rgb(44,104,142)] to-[rgb(108,178,202)]'
          : 'from-[rgb(103,157,78)] to-[rgb(178,193,74)]';
    }
  };

  const getEventIcon = (event) => {
    switch (event.category) {
      case 'mentorship':
        return '🤝';
      case 'client-meeting':
      case 'client-prep':
        return '👥';
      case 'standup':
        return '🔄';
      case 'tech-talk':
        return '💻';
      case 'networking':
        return '🤝';
      case 'leadership':
        return '👔';
      case 'workshop':
        return '🎯';
      case 'orientation':
        return '🎓';
      case 'presentation':
        return '📊';
      default:
        return '📅';
    }
  };

  const isPastEvent = new Date(`${event.date}T${event.endTime}`) < new Date();

  return (
    <div 
      className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-scale-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Enhanced Header */}
        <div className={`bg-gradient-to-r ${getEventCategoryColor(event)} text-white p-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{getEventIcon(event)}</span>
              <div>
                <h2 className="text-2xl font-bold mb-1">{event.title}</h2>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                    {event.type === 'mandatory' ? 'Required' : 'Optional'}
                  </span>
                  {event.isVirtual && (
                    <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                      💻 Virtual
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit && onEdit(event)}
                    iconName="Edit"
                    className="text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete && onDelete(event.id)}
                    iconName="Trash2"
                    className="text-white hover:bg-red-500 hover:bg-opacity-30"
                  />
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
                className="text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-semibold">{formatDate(event.date)}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="font-semibold">{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {event.location && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-semibold">{event.location}</div>
                  </div>
                </div>
              )}
              
              {event.organizer && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Organizer</div>
                    <div className="font-semibold">{event.organizer}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meeting Link */}
          {event.isVirtual && event.meetingLink && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Video" size={20} className="text-blue-600" />
                  <span className="font-medium text-blue-800">Join Virtual Meeting</span>
                </div>
                <a 
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Join Now
                </a>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {/* RSVP Statistics */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">{getRSVPCount('attending')}</div>
                <div className="text-sm font-medium text-green-700">Attending</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-1">{getRSVPCount('not_attending')}</div>
                <div className="text-sm font-medium text-red-700">Not Attending</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600 mb-1">{getRSVPCount('pending')}</div>
                <div className="text-sm font-medium text-yellow-700">Pending</div>
              </div>
            </div>
          </div>

          {/* Calendar Integration */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add to Calendar</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
                iconName="Calendar"
                iconPosition="left"
                className="bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 p-4 h-auto flex-col items-center"
              >
                <div className="font-semibold">Google Calendar</div>
                <div className="text-xs text-gray-500 mt-1">Add to Google</div>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(generateOutlookCalendarUrl(), '_blank')}
                iconName="Calendar"
                iconPosition="left"
                className="bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 p-4 h-auto flex-col items-center"
              >
                <div className="font-semibold">Outlook Calendar</div>
                <div className="text-xs text-gray-500 mt-1">Add to Outlook</div>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Actions */}
        {!isPastEvent && (
          <div className="p-8 border-t border-gray-200 bg-gray-50">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meeting Participation</h3>
              <p className="text-gray-600 text-sm">Will you be attending this event?</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={userRSVP === 'attending' ? 'success' : 'outline'}
                fullWidth
                onClick={() => handleRSVP('attending')}
                iconName="Check"
                iconPosition="left"
                className={`h-14 font-semibold transition-all duration-200 ${
                  userRSVP === 'attending' 
                    ? 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white shadow-lg transform scale-105' 
                    : 'border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700 hover:scale-105'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{userRSVP === 'attending' ? '✓ I\'m Attending' : 'Accept Invitation'}</span>
                  <span className="text-xs opacity-75">Yes, I'll be there</span>
                </div>
              </Button>
              
              <Button
                variant={userRSVP === 'not_attending' ? 'danger' : 'outline'}
                fullWidth
                onClick={() => handleRSVP('not_attending')}
                iconName="X"
                iconPosition="left"
                className={`h-14 font-semibold transition-all duration-200 ${
                  userRSVP === 'not_attending' 
                    ? 'bg-red-500 text-white shadow-lg transform scale-105' 
                    : 'border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700 hover:scale-105'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{userRSVP === 'not_attending' ? '✗ I\'m Not Attending' : 'Decline Invitation'}</span>
                  <span className="text-xs opacity-75">Sorry, can't make it</span>
                </div>
              </Button>
            </div>
            
            {userRSVP !== 'pending' && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Changed your mind? You can update your response anytime.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRSVP('pending')}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Reset RSVP Status
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Past Event Status */}
        {isPastEvent && (
          <div className="p-8 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Completed</h3>
              {userRSVP !== 'pending' ? (
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  userRSVP === 'attending' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <span className="text-lg">
                    {userRSVP === 'attending' ? '✓' : '✗'}
                  </span>
                  <span className="font-medium">
                    {userRSVP === 'attending' ? 'You attended this event' : 'You did not attend this event'}
                  </span>
                </div>
              ) : (
                <p className="text-gray-600">This event has already concluded.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;