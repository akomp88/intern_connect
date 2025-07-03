import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import AgendaView from './components/AgendaView';
import EventModal from './components/EventModal';
import EventFilters from './components/EventFilters';
import EventForm from './components/EventForm';

const ProgramItinerary = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    eventType: 'all',
    rsvpStatus: 'all',
    startDate: '',
    endDate: ''
  });

  // Mock current user data
  const currentUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'intern',
    isAdmin: false
  };

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Intern Orientation',
      description: `Welcome to our comprehensive intern orientation program! This session will cover:\n\n• Company culture and values\n• Organizational structure and key contacts\n• IT setup and security protocols\n• Benefits and HR policies\n• Q&A session with leadership\n\nPlease bring a valid ID and be prepared to take notes. Light refreshments will be provided.`,
      date: '2024-12-20',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Conference Room A, Building 1',
      type: 'mandatory',
      category: 'orientation',
      isVirtual: false,
      organizer: 'HR Team',
      maxAttendees: 50,
      tags: ['orientation', 'mandatory', 'hr'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-15T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-15T11:00:00Z' },
        { userId: 'user-3', status: 'not_attending', timestamp: '2024-12-15T12:00:00Z' },
        { userId: 'user-4', status: 'pending', timestamp: null }
      ]
    },
    {
      id: 'event-2',
      title: 'One-on-One Mentor Meeting',
      description: `Weekly mentorship session to discuss your progress, challenges, and career development.\n\nAgenda:\n• Review weekly accomplishments\n• Discuss current challenges\n• Set goals for next week\n• Career guidance and advice\n• Technical skill development\n\nCome prepared with questions and specific topics you'd like to discuss.`,
      date: '2024-12-21',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Sarah\'s Office - Building 2, Floor 3',
      type: 'optional',
      category: 'mentorship',
      isVirtual: false,
      organizer: 'Sarah Chen - Senior Engineer',
      maxAttendees: 1,
      tags: ['mentorship', '1:1', 'career-development'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-16T09:00:00Z' }
      ]
    },
    {
      id: 'event-3',
      title: 'Client Demo Preparation - Zoom Meeting',
      description: `Virtual meeting to prepare for the upcoming client demonstration.\n\nMeeting objectives:\n• Review demo script and flow\n• Test technical setup and screen sharing\n• Practice Q&A scenarios\n• Assign roles and responsibilities\n• Technical rehearsal\n\nPlease test your audio/video setup before joining.`,
      date: '2024-12-22',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Virtual Event',
      type: 'mandatory',
      category: 'client-prep',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/123456789',
      organizer: 'Product Team',
      maxAttendees: 8,
      tags: ['client', 'demo', 'preparation', 'zoom'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-16T09:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-16T10:00:00Z' },
        { userId: 'user-5', status: 'attending', timestamp: '2024-12-16T11:00:00Z' }
      ]
    },
    {
      id: 'event-4',
      title: 'Tech Talk: AI in Modern Development',
      description: `Join us for an exciting tech talk exploring the latest trends in AI and machine learning in software development.\n\nTopics covered:\n• Introduction to Large Language Models\n• AI-powered code generation tools\n• Best practices for AI integration\n• Future of AI in development workflows\n\nThis session is perfect for interns interested in cutting-edge technology and its practical applications.`,
      date: '2024-12-22',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Virtual Event',
      type: 'optional',
      category: 'tech-talk',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/987654321',
      organizer: 'Engineering Team',
      maxAttendees: 100,
      tags: ['tech-talk', 'ai', 'development'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-16T09:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-16T10:00:00Z' },
        { userId: 'user-5', status: 'attending', timestamp: '2024-12-16T11:00:00Z' }
      ]
    },
    {
      id: 'event-5',
      title: 'Client Meeting: Health Solutions Corp',
      description: `Important client meeting with Health Solutions Corp to present our latest platform features and discuss their specific requirements.\n\nMeeting goals:\n• Present new dashboard analytics\n• Demonstrate mobile app integration\n• Discuss custom feature requests\n• Review implementation timeline\n• Establish next steps\n\nProfessional attire required. Please review the client brief before attending.`,
      date: '2024-12-23',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Client Conference Room, Downtown Office',
      type: 'mandatory',
      category: 'client-meeting',
      isVirtual: false,
      organizer: 'Sales & Product Teams',
      maxAttendees: 6,
      tags: ['client', 'presentation', 'healthcare', 'sales'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-17T14:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-17T15:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2024-12-17T15:00:00Z' }
      ]
    },
    {
      id: 'event-6',
      title: 'Networking Lunch',
      description: `Casual networking lunch for all interns to connect with peers and full-time employees.\n\nThis is a great opportunity to:\n• Meet interns from other departments\n• Connect with potential mentors\n• Share experiences and learn from others\n• Build lasting professional relationships\n\nLunch will be provided. Please RSVP so we can get an accurate headcount for catering.`,
      date: '2024-12-23',
      startTime: '12:00',
      endTime: '13:30',
      location: 'Cafeteria, Building 2',
      type: 'optional',
      category: 'networking',
      isVirtual: false,
      organizer: 'Intern Program Team',
      tags: ['networking', 'social', 'lunch'],
      rsvps: [
        { userId: 'user-1', status: 'pending', timestamp: null },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-17T14:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2024-12-17T15:00:00Z' }
      ]
    },
    {
      id: 'event-7',
      title: 'Team Standup - Daily Sync',
      description: `Daily team standup meeting to sync on progress and blockers.\n\nStandup format:\n• What did you accomplish yesterday?\n• What are you working on today?\n• Any blockers or challenges?\n• Quick wins and celebrations\n\nKeep updates concise (2-3 minutes max per person).`,
      date: '2024-12-24',
      startTime: '09:30',
      endTime: '10:00',
      location: 'Team Room 3B or Zoom',
      type: 'mandatory',
      category: 'standup',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/555777999',
      organizer: 'Development Team',
      maxAttendees: 12,
      tags: ['standup', 'daily', 'team-sync'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-18T08:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2024-12-18T09:00:00Z' }
      ]
    },
    {
      id: 'event-8',
      title: 'Group Mentorship Session',
      description: `Monthly group mentorship session with senior engineers and product managers.\n\nSession topics:\n• Career path discussions\n• Industry trends and insights\n• Technical skill development\n• Work-life balance strategies\n• Networking and professional growth\n\nBring your questions and be ready to learn from experienced professionals!`,
      date: '2024-12-26',
      startTime: '15:00',
      endTime: '16:30',
      location: 'Innovation Lab, Building 1',
      type: 'optional',
      category: 'mentorship',
      isVirtual: false,
      organizer: 'Senior Leadership Team',
      maxAttendees: 15,
      tags: ['mentorship', 'group', 'career-development', 'leadership'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-18T08:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2024-12-18T09:00:00Z' }
      ]
    },
    {
      id: 'event-9',
      title: 'Project Presentation Workshop',
      description: `Learn essential presentation skills for your final intern project presentations.\n\nWorkshop agenda:\n• Structuring your presentation\n• Creating compelling slides\n• Public speaking tips and techniques\n• Handling Q&A sessions\n• Practice sessions with feedback\n\nThis workshop is highly recommended for all interns as it will directly help with your final presentations.`,
      date: '2024-12-27',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Training Room B, Building 3',
      type: 'optional',
      category: 'workshop',
      isVirtual: false,
      organizer: 'Learning & Development',
      maxAttendees: 30,
      tags: ['workshop', 'presentation', 'skills'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-18T08:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2024-12-18T09:00:00Z' }
      ]
    },
    {
      id: 'event-10',
      title: 'Coffee Chat with Leadership',
      description: `Informal coffee chat session with company leadership. This is a unique opportunity to ask questions, share feedback, and learn about career paths within the organization.\n\nAttending executives:\n• CEO - Sarah Johnson\n• CTO - Michael Chen\n• VP of Engineering - Lisa Rodriguez\n• Head of HR - David Kim\n\nCome prepared with thoughtful questions about the company, industry trends, or career advice.`,
      date: '2024-12-30',
      startTime: '15:00',
      endTime: '16:00',
      location: 'Executive Lounge, Building 1',
      type: 'optional',
      category: 'leadership',
      isVirtual: false,
      organizer: 'Executive Team',
      maxAttendees: 20,
      tags: ['leadership', 'coffee-chat', 'networking'],
      rsvps: [
        { userId: 'user-1', status: 'pending', timestamp: null },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-20T16:00:00Z' }
      ]
    },
    {
      id: 'event-11',
      title: 'Final Project Presentations',
      description: `Present your intern project to leadership and peers. This is your opportunity to showcase the work you've accomplished during your internship.\n\nPresentation format:\n• 10 minutes presentation\n• 5 minutes Q&A\n• Feedback from panel\n• Networking reception afterward\n\nAll interns are required to present their projects. Family and friends are welcome to attend the reception.`,
      date: '2025-01-15',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Main Auditorium, Building 1',
      type: 'mandatory',
      category: 'presentation',
      isVirtual: false,
      organizer: 'Intern Program Team',
      tags: ['presentation', 'final-project', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2024-12-19T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2024-12-19T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2024-12-19T12:00:00Z' }
      ]
    }
  ]);

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!event.title.toLowerCase().includes(searchTerm) && 
          !event.description.toLowerCase().includes(searchTerm) &&
          !event.location.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // Event type filter
    if (filters.eventType !== 'all' && event.type !== filters.eventType) {
      return false;
    }

    // RSVP status filter
    if (filters.rsvpStatus !== 'all') {
      const userRSVP = event.rsvps?.find(r => r.userId === currentUser.id);
      const userStatus = userRSVP?.status || 'pending';
      if (userStatus !== filters.rsvpStatus) {
        return false;
      }
    }

    // Date range filter
    const eventDate = new Date(event.date);
    if (filters.startDate && eventDate < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && eventDate > new Date(filters.endDate)) {
      return false;
    }

    return true;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleRSVPToggle = (eventId, status) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          const existingRSVPIndex = event.rsvps?.findIndex(r => r.userId === currentUser.id) ?? -1;
          const newRSVPs = [...(event.rsvps || [])];
          
          if (existingRSVPIndex >= 0) {
            newRSVPs[existingRSVPIndex] = {
              userId: currentUser.id,
              status,
              timestamp: new Date().toISOString()
            };
          } else {
            newRSVPs.push({
              userId: currentUser.id,
              status,
              timestamp: new Date().toISOString()
            });
          }
          
          return { ...event, rsvps: newRSVPs };
        }
        return event;
      })
    );
  };

  const handleEventDrop = (event, targetDate) => {
    if (!currentUser.isAdmin) return;
    
    const newDate = targetDate.toISOString().split('T')[0];
    setEvents(prevEvents =>
      prevEvents.map(e => 
        e.id === event.id ? { ...e, date: newDate } : e
      )
    );
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEventFormOpen(true);
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
      setIsEventModalOpen(false);
    }
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prevEvents =>
        prevEvents.map(e => 
          e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e
        )
      );
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: `event-${Date.now()}`,
        rsvps: []
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
    setIsEventFormOpen(false);
    setEditingEvent(null);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      eventType: 'all',
      rsvpStatus: 'all',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      <TabNavigation />
      
      <main className="pt-24 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Page Header */}
          <div className="bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">📅</span>
                    <h1 className="text-3xl font-bold">Program Itinerary</h1>
                  </div>
                  <p className="text-white text-opacity-90 text-lg mb-4">
                    View upcoming events, manage RSVPs, and stay connected with program activities
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-white text-opacity-80">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[rgb(103,157,78)] rounded-full"></div>
                      <span>Mentor meetings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[rgb(226,110,56)] rounded-full"></div>
                      <span>Client interactions</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block relative mt-6 sm:mt-0">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20 shadow-lg">
                    <Icon name="Calendar" size={40} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                  className={viewMode === 'calendar' ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white' : ''}
                >
                  Calendar
                </Button>
                <Button
                  variant={viewMode === 'agenda' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('agenda')}
                  iconName="List"
                  iconPosition="left"
                  className={viewMode === 'agenda' ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white' : ''}
                >
                  Agenda
                </Button>
              </div>
            </div>
            
            {/* Admin Create Button */}
            {currentUser.isAdmin && (
              <Button
                variant="primary"
                onClick={handleCreateEvent}
                iconName="Plus"
                iconPosition="left"
                className="bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] hover:shadow-lg transition-all duration-300"
              >
                Create Event
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="mb-6">
            <EventFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Event Count */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[rgb(44,104,142)]">{filteredEvents.length}</span> of <span className="font-semibold">{events.length}</span> events
              </p>
              
              {/* Event Type Legend */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded-full"></div>
                  <span className="text-gray-600">Mandatory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] rounded-full"></div>
                  <span className="text-gray-600">Optional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-[rgb(226,110,56)] to-[rgb(246,198,69)] rounded-full"></div>
                  <span className="text-gray-600">Client/Mentor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {viewMode === 'calendar' ? (
            <CalendarView
              events={filteredEvents}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onEventClick={handleEventClick}
              isAdmin={currentUser.isAdmin}
              onEventDrop={handleEventDrop}
            />
          ) : (
            <AgendaView
              events={filteredEvents}
              onEventClick={handleEventClick}
              onRSVPToggle={handleRSVPToggle}
              currentUser={currentUser}
            />
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Calendar" size={64} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Events Found</h3>
              <p className="text-text-secondary mb-4">
                {filters.search || filters.eventType !== 'all' || filters.rsvpStatus !== 'all' || filters.startDate || filters.endDate ?'Try adjusting your filters to see more events.' :'There are no events scheduled at this time.'
                }
              </p>
              {(filters.search || filters.eventType !== 'all' || filters.rsvpStatus !== 'all' || filters.startDate || filters.endDate) && (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="X"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Event Detail Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(null);
        }}
        onRSVPToggle={handleRSVPToggle}
        currentUser={currentUser}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        isAdmin={currentUser.isAdmin}
      />

      {/* Event Form Modal */}
      <EventForm
        event={editingEvent}
        isOpen={isEventFormOpen}
        onClose={() => {
          setIsEventFormOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        isAdmin={currentUser.isAdmin}
      />
    </div>
  );
};

export default ProgramItinerary;