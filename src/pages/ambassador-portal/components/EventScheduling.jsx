import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EventScheduling = ({ userRole = 'approved' }) => {
  const [selectedView, setSelectedView] = useState('upcoming');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    location: '',
    description: '',
    expectedAttendees: '',
    materials: []
  });

  const upcomingEvents = [
    {
      id: 1,
      title: 'CS Career Fair - Stanford',
      type: 'career-fair',
      date: '2024-02-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Stanford Memorial Auditorium',
      status: 'confirmed',
      attendees: 45,
      description: 'Annual computer science career fair with 200+ companies attending.',
      materials: ['Booth Setup Guide', 'Company Brochures', 'Swag Items'],
      contact: 'Sarah Chen - sarah.chen@stanford.edu'
    },
    {
      id: 2,
      title: 'Info Session - UC Berkeley',
      type: 'info-session',
      date: '2024-02-20',
      time: '6:00 PM - 7:30 PM',
      location: 'Soda Hall Room 306',
      status: 'pending',
      attendees: 25,
      description: 'Technical internship information session for engineering students.',
      materials: ['Presentation Slides', 'Program Brochures'],
      contact: 'Mike Rodriguez - m.rodriguez@berkeley.edu'
    },
    {
      id: 3,
      title: 'Workshop - UCLA',
      type: 'workshop',
      date: '2024-02-25',
      time: '2:00 PM - 4:00 PM',
      location: 'Engineering VI Room 289',
      status: 'confirmed',
      attendees: 30,
      description: 'Resume review and interview preparation workshop.',
      materials: ['Workshop Materials', 'Resume Templates'],
      contact: 'Lisa Wang - lisa.wang@ucla.edu'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Tech Talk - MIT',
      type: 'tech-talk',
      date: '2024-01-18',
      time: '7:00 PM - 8:30 PM',
      location: 'Stata Center Room 32-123',
      status: 'completed',
      attendees: 85,
      feedback: 4.8,
      description: 'AI and Machine Learning in Industry presentation.',
      materials: ['Presentation Slides', 'Demo Code'],
      contact: 'Alex Johnson - alex.j@mit.edu'
    },
    {
      id: 5,
      title: 'Networking Event - Harvard',
      type: 'networking',
      date: '2024-01-12',
      time: '5:00 PM - 7:00 PM',
      location: 'Harvard Science Center',
      status: 'completed',
      attendees: 60,
      feedback: 4.6,
      description: 'Alumni networking event with current interns and full-time employees.',
      materials: ['Name Tags', 'Company Swag'],
      contact: 'Emma Davis - emma.davis@harvard.edu'
    }
  ];

  const eventTypes = [
    { value: 'career-fair', label: 'Career Fair', icon: 'Users', color: 'text-primary' },
    { value: 'info-session', label: 'Info Session', icon: 'Presentation', color: 'text-secondary' },
    { value: 'workshop', label: 'Workshop', icon: 'BookOpen', color: 'text-accent' },
    { value: 'tech-talk', label: 'Tech Talk', icon: 'Mic', color: 'text-success' },
    { value: 'networking', label: 'Networking', icon: 'Coffee', color: 'text-warning' }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: 'text-success', bgColor: 'bg-success-50', label: 'Confirmed' };
      case 'pending':
        return { color: 'text-warning', bgColor: 'bg-warning-50', label: 'Pending' };
      case 'completed':
        return { color: 'text-text-muted', bgColor: 'bg-gray-50', label: 'Completed' };
      case 'cancelled':
        return { color: 'text-error', bgColor: 'bg-error-50', label: 'Cancelled' };
      default:
        return { color: 'text-text-muted', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const getEventTypeConfig = (type) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0];
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log('Creating event:', newEvent);
    setShowCreateForm(false);
    setNewEvent({
      title: '',
      type: '',
      date: '',
      time: '',
      location: '',
      description: '',
      expectedAttendees: '',
      materials: []
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const currentEvents = selectedView === 'upcoming' ? upcomingEvents : pastEvents;

  if (userRole !== 'approved') {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Event Scheduling
          </h3>
          <p className="text-text-secondary mb-4">
            Event scheduling tools will be available once your ambassador application is approved.
          </p>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-text-secondary">
              As an approved ambassador, you'll be able to schedule campus visits, information sessions, and other recruitment events.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Event Scheduling
          </h2>
          <p className="text-text-secondary">
            Manage your campus visits and recruitment events.
          </p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          iconName="Plus"
          iconPosition="left"
          className="mt-4 md:mt-0"
        >
          Schedule Event
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedView('upcoming')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedView === 'upcoming' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setSelectedView('past')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedView === 'past' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Past Events
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {currentEvents.map(event => {
          const statusConfig = getStatusConfig(event.status);
          const typeConfig = getEventTypeConfig(event.type);
          
          return (
            <div key={event.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-lg bg-gray-100 ${typeConfig.color}`}>
                    <Icon name={typeConfig.icon} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-text-primary">{event.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-button ${statusConfig.bgColor} ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-text-muted">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      {event.attendees} attendees
                    </div>
                    {event.feedback && (
                      <div className="flex items-center space-x-1 text-sm text-text-muted">
                        <Icon name="Star" size={12} className="text-warning" />
                        <span>{event.feedback}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                  >
                    View
                  </Button>
                </div>
              </div>
              
              {/* Materials and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Materials</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.materials.map((material, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded-button"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Contact</h4>
                  <p className="text-sm text-text-secondary">{event.contact}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-surface rounded-xl shadow-elevation-3 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Schedule New Event</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Title *
                  </label>
                  <Input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., CS Info Session - Stanford"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Type *
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Time *
                  </label>
                  <Input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="e.g., 2:00 PM - 4:00 PM"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location *
                </label>
                <Input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Engineering Building Room 101"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the event..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expected Attendees
                </label>
                <Input
                  type="number"
                  value={newEvent.expectedAttendees}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, expectedAttendees: e.target.value }))}
                  placeholder="Estimated number of attendees"
                  min="1"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventScheduling;