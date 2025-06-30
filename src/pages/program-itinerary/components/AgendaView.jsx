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
      <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-8 text-center">
        <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Events Found</h3>
        <p className="text-text-secondary">
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
          <div key={dateKey} className="bg-surface rounded-lg border border-border shadow-elevation-1">
            {/* Date Header */}
            <div className={`p-4 border-b border-border ${
              isToday ? 'bg-primary-50 border-primary-200' : 'bg-surface-secondary'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${
                  isToday ? 'text-primary' : 'text-text-primary'
                }`}>
                  {formatDate(dateKey)}
                  {isToday && (
                    <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-button">
                      Today
                    </span>
                  )}
                </h3>
                <span className="text-sm text-text-secondary">
                  {dateEvents.length} event{dateEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Events List */}
            <div className="divide-y divide-border-light">
              {dateEvents.map((event) => {
                const userRSVP = getUserRSVPStatus(event);
                const attendingCount = getRSVPCount(event, 'attending');
                const notAttendingCount = getRSVPCount(event, 'not_attending');

                return (
                  <div
                    key={event.id}
                    className={`p-4 hover:bg-surface-secondary transition-colors duration-150 ${
                      isPast ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                            event.type === 'mandatory' ? 'bg-primary' : 'bg-secondary'
                          }`} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 
                                className="text-base font-medium text-text-primary cursor-pointer hover:text-primary transition-colors duration-150 truncate"
                                onClick={() => onEventClick(event)}
                              >
                                {event.title}
                              </h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-button ${
                                event.type === 'mandatory' ?'bg-primary-100 text-primary' :'bg-secondary-100 text-secondary'
                              }`}>
                                {event.type === 'mandatory' ? 'Required' : 'Optional'}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-2">
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={14} />
                                <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center space-x-1">
                                  <Icon name="MapPin" size={14} />
                                  <span className="truncate">{event.location}</span>
                                </div>
                              )}
                              
                              {event.isVirtual && (
                                <div className="flex items-center space-x-1">
                                  <Icon name="Video" size={14} />
                                  <span>Virtual</span>
                                </div>
                              )}
                            </div>
                            
                            {event.description && (
                              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                                {event.description}
                              </p>
                            )}
                            
                            {/* RSVP Stats */}
                            <div className="flex items-center space-x-4 text-xs text-text-muted">
                              <span className="flex items-center space-x-1">
                                <Icon name="UserCheck" size={12} />
                                <span>{attendingCount} attending</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Icon name="UserX" size={12} />
                                <span>{notAttendingCount} not attending</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RSVP Actions */}
                      {!isPast && (
                        <div className="flex items-center space-x-2 md:ml-4">
                          <Button
                            variant={userRSVP === 'attending' ? 'success' : 'outline'}
                            size="sm"
                            onClick={() => handleRSVP(event, 'attending')}
                            iconName="Check"
                            iconPosition="left"
                            className="flex-1 md:flex-none"
                          >
                            {userRSVP === 'attending' ? 'Attending' : 'Attend'}
                          </Button>
                          
                          <Button
                            variant={userRSVP === 'not_attending' ? 'danger' : 'outline'}
                            size="sm"
                            onClick={() => handleRSVP(event, 'not_attending')}
                            iconName="X"
                            iconPosition="left"
                            className="flex-1 md:flex-none"
                          >
                            {userRSVP === 'not_attending' ? 'Not Going' : 'Decline'}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEventClick(event)}
                            iconName="ExternalLink"
                            className="hidden md:flex"
                          />
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