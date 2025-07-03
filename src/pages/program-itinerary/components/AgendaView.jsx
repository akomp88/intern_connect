import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgendaView = ({ 
  events, 
  onEventClick, 
  onRSVPToggle, 
  currentUser 
}) => {
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

  const getUserRSVPStatus = (event) => {
    const rsvp = event.rsvps?.find(r => r.userId === currentUser?.id);
    return rsvp?.status || 'pending';
  };

  const getRSVPCount = (event, status) => {
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

  const handleRSVP = (event, status) => {
    if (onRSVPToggle) {
      onRSVPToggle(event.id, status);
    }
  };

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const dateKey = new Date(event.date).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a) - new Date(b)
  );

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon name="Calendar" size={36} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No Events Found</h3>
        <p className="text-gray-600 text-lg">
          There are no events matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map(dateKey => {
        const dateEvents = groupedEvents[dateKey];
        const eventDate = new Date(dateKey);
        const isToday = eventDate.toDateString() === new Date().toDateString();
        const isPast = eventDate < new Date() && !isToday;

        return (
          <div key={dateKey} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Date Header */}
            <div className={`p-6 border-b border-gray-200 ${
              isToday ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${
                  isToday ? 'text-white' : 'text-gray-800'
                }`}>
                  {formatDate(dateKey)}
                  {isToday && (
                    <span className="ml-2 px-3 py-1 bg-white bg-opacity-20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      Today
                    </span>
                  )}
                </h3>
                <span className={`text-sm ${isToday ? 'text-white text-opacity-80' : 'text-gray-600'}`}>
                  {dateEvents.length} event{dateEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Events List */}
            <div className="divide-y divide-gray-100">
              {dateEvents.map((event) => {
                const userRSVP = getUserRSVPStatus(event);
                const attendingCount = getRSVPCount(event, 'attending');
                const notAttendingCount = getRSVPCount(event, 'not_attending');

                return (
                  <div
                    key={event.id}
                    className={`p-6 hover:bg-gray-50 transition-all duration-200 ${
                      isPast ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-4">
                          {/* Category Indicator */}
                          <div className={`w-1 h-16 bg-gradient-to-b ${getEventCategoryColor(event)} rounded-full flex-shrink-0`} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-xl">{getEventIcon(event)}</span>
                              <h4 
                                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-[rgb(44,104,142)] transition-colors duration-200 truncate"
                                onClick={() => onEventClick(event)}
                              >
                                {event.title}
                              </h4>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full text-white bg-gradient-to-r ${getEventCategoryColor(event)}`}>
                                {event.type === 'mandatory' ? 'Required' : 'Optional'}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-2">
                                <Icon name="Clock" size={16} />
                                <span className="font-medium">{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center space-x-2">
                                  <Icon name="MapPin" size={16} />
                                  <span className="truncate">{event.location}</span>
                                </div>
                              )}
                              
                              {event.isVirtual && (
                                <div className="flex items-center space-x-2">
                                  <Icon name="Video" size={16} />
                                  <span className="text-blue-600 font-medium">Virtual Meeting</span>
                                </div>
                              )}
                            </div>
                            
                            {event.description && (
                              <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                                {event.description}
                              </p>
                            )}
                            
                            {/* RSVP Stats */}
                            <div className="flex items-center space-x-6 text-xs">
                              <span className="flex items-center space-x-2 text-green-600">
                                <Icon name="UserCheck" size={14} />
                                <span className="font-medium">{attendingCount} attending</span>
                              </span>
                              <span className="flex items-center space-x-2 text-red-600">
                                <Icon name="UserX" size={14} />
                                <span className="font-medium">{notAttendingCount} not attending</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RSVP Actions */}
                      {!isPast && (
                        <div className="flex items-center space-x-3 md:ml-6">
                          <Button
                            variant={userRSVP === 'attending' ? 'success' : 'outline'}
                            size="sm"
                            onClick={() => handleRSVP(event, 'attending')}
                            iconName="Check"
                            iconPosition="left"
                            className={`flex-1 md:flex-none font-semibold ${
                              userRSVP === 'attending' 
                                ? 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white shadow-lg' 
                                : 'border-2 border-green-200 hover:border-green-400 hover:bg-green-50 text-green-700'
                            }`}
                          >
                            {userRSVP === 'attending' ? '✓ Attending' : 'Accept Invitation'}
                          </Button>
                          
                          <Button
                            variant={userRSVP === 'not_attending' ? 'danger' : 'outline'}
                            size="sm"
                            onClick={() => handleRSVP(event, 'not_attending')}
                            iconName="X"
                            iconPosition="left"
                            className={`flex-1 md:flex-none font-semibold ${
                              userRSVP === 'not_attending' 
                                ? 'bg-red-500 text-white shadow-lg' 
                                : 'border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700'
                            }`}
                          >
                            {userRSVP === 'not_attending' ? '✗ Declined' : 'Decline Invitation'}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEventClick(event)}
                            iconName="ExternalLink"
                            className="hidden md:flex hover:bg-blue-50 hover:text-[rgb(44,104,142)] p-2"
                            title="View event details"
                          />
                        </div>
                      )}

                      {/* Show RSVP status for past events */}
                      {isPast && userRSVP !== 'pending' && (
                        <div className="flex items-center space-x-2 md:ml-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            userRSVP === 'attending' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {userRSVP === 'attending' ? '✓ Attended' : '✗ Did not attend'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgendaView;