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

  // OneDigital JUMPSTART Program Events
  const [events, setEvents] = useState([
    {
      id: 'event-july-1-book-club',
      title: 'JUMPSTART Book Club / Crucial Conversations',
      description: `Join us for an engaging book club discussion focusing on "Crucial Conversations" - essential skills for effective communication in the workplace.\n\nToday's session will cover:\n• Tools for talking when stakes are high\n• How to create safety in dialogue\n• Mastering your stories and emotions\n• STATE method for sharing tough messages\n• GROUP discussion and real-world applications\n\nCome prepared to discuss chapters 4-6 and bring examples from your own experiences.`,
      date: '2025-07-01',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Conference Room B, OneDigital HQ',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: false,
      organizer: 'Miranda - JUMPSTART Program Director',
      maxAttendees: 30,
      tags: ['jumpstart', 'book-club', 'communication', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2025-06-25T13:00:00Z' }
      ]
    },
    {
      id: 'event-july-1-project',
      title: 'Intern Group Project',
      description: `Collaborative project session where intern teams work together on real-world challenges and present solutions.\n\nToday's agenda:\n• Project status updates from each team\n• Problem-solving workshop\n• Peer feedback and collaboration\n• Resource allocation and planning\n• Next milestone planning\n\nBring your laptops and current project materials. Teams will present 5-minute progress updates.`,
      date: '2025-07-01',
      startTime: '15:00',
      endTime: '16:00',
      location: 'Collaboration Space, OneDigital HQ',
      type: 'mandatory',
      category: 'project',
      isVirtual: false,
      organizer: 'JUMPSTART Program Team',
      maxAttendees: 5,
      tags: ['project', 'collaboration', 'intern-teams', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2025-06-25T13:00:00Z' }
      ]
    },
    {
      id: 'event-july-3-stress',
      title: 'Rethinking Stress (JUMPSTART Session)',
      description: `Transform your relationship with stress in this comprehensive JUMPSTART wellness session.\n\nSession highlights:\n• Understanding stress vs. pressure\n• Identifying personal stress triggers\n• Evidence-based stress management techniques\n• Building resilience and mental flexibility\n• Practical tools for workplace wellness\n• Group discussion and peer support\n\nThis session will provide actionable strategies to help you thrive in challenging situations and maintain well-being throughout your internship.`,
      date: '2025-07-03',
      startTime: '12:00',
      endTime: '13:30',
      location: 'Training Room A, OneDigital HQ',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: false,
      organizer: 'JUMPSTART Wellness Team',
      maxAttendees: 30,
      tags: ['jumpstart', 'wellness', 'stress-management', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    {
      id: 'event-july-7-notetaking',
      title: 'Masterful Notetaking & Project Management (JUMPSTART SESSION)',
      description: `Master the art of effective notetaking and project management in this hands-on JUMPSTART skills session.\n\nKey learning outcomes:\n• Digital and analog notetaking strategies\n• Meeting documentation best practices\n• Project planning and task prioritization\n• Tools and apps for productivity\n• Information organization systems\n• Action item tracking and follow-up\n\nBring your laptop and notebook - we'll be practicing various techniques and setting up systems you can use immediately.`,
      date: '2025-07-07',
      startTime: '14:30',
      endTime: '16:00',
      location: 'Training Room B, OneDigital HQ',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: false,
      organizer: 'JUMPSTART Skills Development Team',
      maxAttendees: 30,
      tags: ['jumpstart', 'productivity', 'project-management', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    {
      id: 'event-july-8-project',
      title: 'Intern JUMPSTART Project Meeting',
      description: `Weekly project collaboration session for JUMPSTART intern teams to advance their capstone projects.\n\nSession focus:\n• Project milestone reviews\n• Cross-team collaboration opportunities\n• Resource sharing and problem-solving\n• Mentor guidance and feedback\n• Presentation preparation strategies\n• Timeline adjustments and planning\n\nEach team will present their progress and receive feedback from peers and mentors. Come prepared with your current challenges and questions.`,
      date: '2025-07-08',
      startTime: '14:30',
      endTime: '15:30',
      location: 'Innovation Lab, OneDigital HQ',
      type: 'mandatory',
      category: 'project',
      isVirtual: false,
      organizer: 'JUMPSTART Project Mentors',
      maxAttendees: 5,
      tags: ['jumpstart', 'project', 'collaboration', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    {
      id: 'event-july-9-checkin',
      title: 'Group 2 Weekly Check-in',
      description: `Weekly group check-in session for cohort 2 JUMPSTART interns to sync on progress and support each other.\n\nAgenda includes:\n• Individual progress updates\n• Challenge sharing and problem-solving\n• Peer support and networking\n• Program feedback and suggestions\n• Goal setting for the upcoming week\n• Group Q&A session\n\nThis is a safe space to share your experiences, ask questions, and learn from your peers. Come prepared to share your wins and challenges.`,
      date: '2025-07-09',
      startTime: '14:30',
      endTime: '15:30',
      location: 'Conference Room C, OneDigital HQ',
      type: 'mandatory',
      category: 'mentorship',
      isVirtual: false,
      organizer: 'JUMPSTART Program Coordinators',
      maxAttendees: 15,
      tags: ['jumpstart', 'check-in', 'peer-support', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    {
      id: 'event-july-9-mentor',
      title: 'Weekly Mentor Mentee Meeting',
      description: `One-on-one mentorship session with your assigned JUMPSTART mentor for personalized career guidance and skill development.\n\nSession structure:\n• Review weekly accomplishments and challenges\n• Discuss career goals and development areas\n• Receive guidance on current projects\n• Explore industry insights and trends\n• Plan learning objectives for the next week\n• Q&A and professional advice\n\nCome prepared with specific questions about your career path, current projects, or any challenges you're facing. This is your dedicated time for personalized mentorship.`,
      date: '2025-07-09',
      startTime: '16:00',
      endTime: '17:00',
      location: 'Mentor Office / Virtual Meeting',
      type: 'mandatory',
      category: 'mentorship',
      isVirtual: false,
      organizer: 'JUMPSTART Mentor Program',
      maxAttendees: 1,
      tags: ['mentorship', '1:1', 'career-development', 'weekly'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' }
      ]
    },
    {
      id: 'event-july-10-bookclub',
      title: 'JUMPSTART Book Club / Crucial Conversations',
      description: `Continue our deep dive into "Crucial Conversations" with this engaging follow-up book club session.\n\nToday's discussion topics:\n• Learning to Look - recognizing conversation patterns\n• Making it Safe - creating the right conditions for dialogue\n• Sharing your path of action\n• Exploring others' paths and perspectives\n• Real-world application stories from participants\n\nCome prepared to discuss chapters 7-9 and share how you've applied the concepts from our last session in your daily interactions.`,
      date: '2025-07-10',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Conference Room B, OneDigital HQ',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: false,
      organizer: 'Miranda - JUMPSTART Program Director',
      maxAttendees: 30,
      tags: ['jumpstart', 'book-club', 'communication', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2025-06-25T13:00:00Z' }
      ]
    },
    {
      id: 'event-july-10-deepdive',
      title: 'Bi-Weekly Project Plan Deep Dive',
      description: `Intensive project planning and strategy session held every two weeks to ensure all JUMPSTART capstone projects stay on track.\n\nDeep dive focus areas:\n• Detailed project timeline review\n• Resource allocation and requirements\n• Risk assessment and mitigation strategies\n• Stakeholder alignment and expectations\n• Technical architecture decisions\n• Success metrics and evaluation criteria\n\nThis session provides dedicated time for thorough project planning, team alignment, and strategic decision-making. Bring your project plans, timelines, and any blocking issues.`,
      date: '2025-07-10',
      startTime: '15:30',
      endTime: '17:00',
      location: 'Strategy Room, OneDigital HQ',
      type: 'mandatory',
      category: 'project',
      isVirtual: false,
      organizer: 'JUMPSTART Project Leadership',
      maxAttendees: 5,
      tags: ['jumpstart', 'project-planning', 'strategy', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
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