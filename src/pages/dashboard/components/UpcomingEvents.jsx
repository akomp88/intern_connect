import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEvents = ({ events, onViewAll, onRSVP }) => {
  // Helper function to get next weekday dates
  const getNextWeekdays = (count = 4) => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < count) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      // Only include weekdays (Monday=1 to Friday=5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        dates.push(new Date(currentDate));
      }
    }
    return dates;
  };

  const weekdays = getNextWeekdays(4);

  const mockEvents = [
    {
      id: 1,
      title: "JUMPSTART Book Club Meeting with Miranda",
      date: weekdays[0],
      time: "11:00 AM - 12:00 PM",
      location: "Conference Room B",
      type: "mandatory",
      attendees: 8,
      maxAttendees: 12,
      rsvpStatus: "going"
    },
    {
      id: 2,
      title: "Mentor Weekly Check-in",
      date: weekdays[1],
      time: "2:00 PM - 2:30 PM",
      location: "Virtual Meeting",
      type: "mandatory",
      attendees: 1,
      maxAttendees: 1,
      rsvpStatus: "going"
    },
    {
      id: 3,
      title: "JUMPSTART Session: Masterful Notetaking & Project Management",
      date: weekdays[2],
      time: "10:00 AM - 11:30 AM",
      location: "Training Room A",
      type: "mandatory",
      attendees: 15,
      maxAttendees: 20,
      rsvpStatus: "going"
    },
    {
      id: 4,
      title: "Intern Group Project Meeting",
      date: weekdays[3],
      time: "3:00 PM - 4:00 PM",
      location: "Collaboration Space",
      type: "mandatory",
      attendees: 6,
      maxAttendees: 8,
      rsvpStatus: "going"
    }
  ];

  const eventData = events || mockEvents;

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'mandatory':
        return {
          bg: 'bg-error-100',
          text: 'text-error',
          border: 'border-error-200'
        };
      case 'optional':
        return {
          bg: 'bg-success-100',
          text: 'text-success',
          border: 'border-success-200'
        };
      default:
        return {
          bg: 'bg-primary-100',
          text: 'text-primary',
          border: 'border-primary-200'
        };
    }
  };

  const getRSVPStatus = (status) => {
    switch (status) {
      case 'going':
        return {
          icon: 'Check',
          text: 'Going',
          color: 'text-success'
        };
      case 'maybe':
        return {
          icon: 'Clock',
          text: 'Maybe',
          color: 'text-warning'
        };
      case 'not-going':
        return {
          icon: 'X',
          text: 'Not Going',
          color: 'text-error'
        };
      default:
        return null;
    }
  };

  const handleRSVP = (eventId, status) => {
    if (onRSVP) {
      onRSVP(eventId, status);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Upcoming Events</h3>
            <p className="text-sm text-text-secondary">Your JUMPSTART program schedule</p>
          </div>
        </div>
        
        <Button
          variant="text"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {eventData.slice(0, 3).map((event) => {
          const typeColors = getEventTypeColor(event.type);
          const rsvpStatus = getRSVPStatus(event.rsvpStatus);
          const isFullyBooked = event.attendees >= event.maxAttendees;

          return (
            <div 
              key={event.id} 
              className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-text-primary line-clamp-1">
                      {event.title}
                    </h4>
                    <span className={`
                      px-2 py-0.5 text-xs font-medium rounded-button border
                      ${typeColors.bg} ${typeColors.text} ${typeColors.border}
                    `}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(event.date)}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="MapPin" size={12} />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Users" size={12} />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                      {isFullyBooked && (
                        <span className="text-error font-medium">(Full)</span>
                      )}
                    </div>
                  </div>
                </div>

                {rsvpStatus && (
                  <div className={`flex items-center space-x-1 ${rsvpStatus.color}`}>
                    <Icon name={rsvpStatus.icon} size={14} />
                    <span className="text-xs font-medium">{rsvpStatus.text}</span>
                  </div>
                )}
              </div>

              {/* RSVP Actions */}
              {!event.rsvpStatus && (
                <div className="flex items-center space-x-2 pt-3 border-t border-border">
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => handleRSVP(event.id, 'going')}
                    disabled={isFullyBooked}
                    className="flex-1"
                  >
                    {isFullyBooked ? 'Full' : 'Going'}
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleRSVP(event.id, 'maybe')}
                    className="flex-1"
                  >
                    Maybe
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRSVP(event.id, 'not-going')}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              )}

              {/* Attendance Progress */}
              <div className="mt-3">
                <div className="w-full bg-border rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isFullyBooked ? 'bg-error' : 'bg-primary'
                    }`}
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {eventData.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} color="var(--color-text-muted)" />
          </div>
          <p className="text-text-secondary">No upcoming events</p>
          <p className="text-sm text-text-muted">Check back later for new program activities</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;