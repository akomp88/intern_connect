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

  // Helper function to generate recurring events
  const generateRecurringEvents = () => {
    const recurringEvents = [];
    
    // Generate Group 2 Weekly Check-ins (every Wednesday 2:30pm until July 30th)
    const checkInDates = ['2025-07-17', '2025-07-24', '2025-07-31'];
    checkInDates.forEach((date, index) => {
      recurringEvents.push({
        id: `event-group2-checkin-${index + 2}`,
        title: 'Group 2 Weekly Check-in',
        description: `Weekly group check-in session for cohort 2 JUMPSTART interns to sync on progress and support each other.\n\nAgenda includes:\n• Individual progress updates\n• Challenge sharing and problem-solving\n• Peer support and networking\n• Program feedback and suggestions\n• Goal setting for the upcoming week\n• Group Q&A session\n\nThis is a safe space to share your experiences, ask questions, and learn from your peers.`,
        date: date,
        startTime: '14:30',
        endTime: '15:30',
        location: 'Virtual Meeting - Zoom',
        type: 'mandatory',
        category: 'mentorship',
        isVirtual: true,
        meetingLink: 'https://zoom.us/j/group2-checkin',
        organizer: 'JUMPSTART Program Coordinators',
        maxAttendees: 15,
        tags: ['jumpstart', 'check-in', 'peer-support', 'weekly'],
        rsvps: [
          { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
          { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
          { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
        ]
      });
    });

    // Generate Weekly Mentor Meetings (every Wednesday 4:00pm until July 30th)
    const mentorDates = ['2025-07-17', '2025-07-24', '2025-07-31'];
    mentorDates.forEach((date, index) => {
      recurringEvents.push({
        id: `event-mentor-meeting-${index + 2}`,
        title: 'Weekly Mentor Mentee Meeting',
        description: `One-on-one mentorship session with your assigned JUMPSTART mentor for personalized career guidance and skill development.\n\nSession structure:\n• Review weekly accomplishments and challenges\n• Discuss career goals and development areas\n• Receive guidance on current projects\n• Explore industry insights and trends\n• Plan learning objectives for the next week\n• Q&A and professional advice\n\nCome prepared with specific questions about your career path, current projects, or any challenges you're facing.`,
        date: date,
        startTime: '16:00',
        endTime: '17:00',
        location: 'Virtual Meeting - Zoom',
        type: 'mandatory',
        category: 'mentorship',
        isVirtual: true,
        meetingLink: 'https://zoom.us/j/mentor-meetings',
        organizer: 'JUMPSTART Mentor Program',
        maxAttendees: 1,
        tags: ['mentorship', '1:1', 'career-development', 'weekly'],
        rsvps: [
          { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' }
        ]
      });
    });

    // Generate Weekly Specialized Department Meetings (Tuesdays 12:00pm from July 1 - July 29, some canceled)
    const deptDates = [
      '2025-07-01', '2025-07-08', '2025-07-15', 
      // '2025-07-22' - canceled for example
      '2025-07-29'
    ];
    deptDates.forEach((date, index) => {
      recurringEvents.push({
        id: `event-dept-meeting-${index + 1}`,
        title: 'Weekly Specialized Department Meeting',
        description: `Department-specific meeting focusing on your area of specialization within OneDigital.\n\nMeeting focus:\n• Department-specific project updates\n• Specialized skill development\n• Industry trends in your field\n• Collaboration opportunities\n• Department goals and objectives\n• Professional development within your specialty\n\nConnect with your department team and dive deep into your area of expertise.`,
        date: date,
        startTime: '12:00',
        endTime: '13:00',
        location: 'Virtual Meeting - Zoom',
        type: 'mandatory',
        category: 'department',
        isVirtual: true,
        meetingLink: 'https://zoom.us/j/dept-specialized',
        organizer: 'Department Leadership',
        maxAttendees: 10,
        tags: ['department', 'specialized', 'weekly', 'professional-development'],
        rsvps: [
          { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
          { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' }
        ]
      });
    });

    return recurringEvents;
  };

  // OneDigital JUMPSTART Program Events
  const [events, setEvents] = useState([
    {
      id: 'event-july-2-book-club',
      title: 'JUMPSTART Book Club / Crucial Conversations',
      description: `Join us for an engaging book club discussion focusing on "Crucial Conversations" - essential skills for effective communication in the workplace.\n\nToday's session will cover:\n• Tools for talking when stakes are high\n• How to create safety in dialogue\n• Mastering your stories and emotions\n• STATE method for sharing tough messages\n• GROUP discussion and real-world applications\n\nCome prepared to discuss chapters 4-6 and bring examples from your own experiences.`,
      date: '2025-07-02',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-bookclub',
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
      id: 'event-july-2-project',
      title: 'Intern Group Project',
      description: `Collaborative project session where intern teams work together on real-world challenges and present solutions.\n\nToday's agenda:\n• Project status updates from each team\n• Problem-solving workshop\n• Peer feedback and collaboration\n• Resource allocation and planning\n• Next milestone planning\n\nBring your laptops and current project materials. Teams will present 5-minute progress updates.`,
      date: '2025-07-02',
      startTime: '15:00',
      endTime: '16:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'project',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/intern-project',
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
      id: 'event-july-4-stress',
      title: 'Rethinking Stress (JUMPSTART Session)',
      description: `Transform your relationship with stress in this comprehensive JUMPSTART wellness session.\n\nSession highlights:\n• Understanding stress vs. pressure\n• Identifying personal stress triggers\n• Evidence-based stress management techniques\n• Building resilience and mental flexibility\n• Practical tools for workplace wellness\n• Group discussion and peer support\n\nThis session will provide actionable strategies to help you thrive in challenging situations and maintain well-being throughout your internship.`,
      date: '2025-07-04',
      startTime: '12:00',
      endTime: '13:30',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-stress',
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
      id: 'event-july-8-notetaking',
      title: 'Masterful Notetaking & Project Management (JUMPSTART SESSION)',
      description: `Master the art of effective notetaking and project management in this hands-on JUMPSTART skills session.\n\nKey learning outcomes:\n• Digital and analog notetaking strategies\n• Meeting documentation best practices\n• Project planning and task prioritization\n• Tools and apps for productivity\n• Information organization systems\n• Action item tracking and follow-up\n\nBring your laptop and notebook - we'll be practicing various techniques and setting up systems you can use immediately.`,
      date: '2025-07-08',
      startTime: '14:30',
      endTime: '16:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-notetaking',
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
      id: 'event-july-9-project',
      title: 'Intern JUMPSTART Project Meeting',
      description: `Weekly project collaboration session for JUMPSTART intern teams to advance their capstone projects.\n\nSession focus:\n• Project milestone reviews\n• Cross-team collaboration opportunities\n• Resource sharing and problem-solving\n• Mentor guidance and feedback\n• Presentation preparation strategies\n• Timeline adjustments and planning\n\nEach team will present their progress and receive feedback from peers and mentors. Come prepared with your current challenges and questions.`,
      date: '2025-07-09',
      startTime: '14:30',
      endTime: '15:30',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'project',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-project',
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
      id: 'event-july-10-checkin',
      title: 'Group 2 Weekly Check-in',
      description: `Weekly group check-in session for cohort 2 JUMPSTART interns to sync on progress and support each other.\n\nAgenda includes:\n• Individual progress updates\n• Challenge sharing and problem-solving\n• Peer support and networking\n• Program feedback and suggestions\n• Goal setting for the upcoming week\n• Group Q&A session\n\nThis is a safe space to share your experiences, ask questions, and learn from your peers. Come prepared to share your wins and challenges.`,
      date: '2025-07-10',
      startTime: '14:30',
      endTime: '15:30',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'mentorship',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/group2-checkin',
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
      id: 'event-july-10-mentor',
      title: 'Weekly Mentor Mentee Meeting',
      description: `One-on-one mentorship session with your assigned JUMPSTART mentor for personalized career guidance and skill development.\n\nSession structure:\n• Review weekly accomplishments and challenges\n• Discuss career goals and development areas\n• Receive guidance on current projects\n• Explore industry insights and trends\n• Plan learning objectives for the next week\n• Q&A and professional advice\n\nCome prepared with specific questions about your career path, current projects, or any challenges you're facing. This is your dedicated time for personalized mentorship.`,
      date: '2025-07-10',
      startTime: '16:00',
      endTime: '17:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'mentorship',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/mentor-meetings',
      organizer: 'JUMPSTART Mentor Program',
      maxAttendees: 1,
      tags: ['mentorship', '1:1', 'career-development', 'weekly'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' }
      ]
    },
    {
      id: 'event-july-11-bookclub',
      title: 'JUMPSTART Book Club / Crucial Conversations',
      description: `Continue our deep dive into "Crucial Conversations" with this engaging follow-up book club session.\n\nToday's discussion topics:\n• Learning to Look - recognizing conversation patterns\n• Making it Safe - creating the right conditions for dialogue\n• Sharing your path of action\n• Exploring others' paths and perspectives\n• Real-world application stories from participants\n\nCome prepared to discuss chapters 7-9 and share how you've applied the concepts from our last session in your daily interactions.`,
      date: '2025-07-11',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-bookclub',
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
      id: 'event-july-11-deepdive',
      title: 'Bi-Weekly Project Plan Deep Dive',
      description: `Intensive project planning and strategy session held every two weeks to ensure all JUMPSTART capstone projects stay on track.\n\nDeep dive focus areas:\n• Detailed project timeline review\n• Resource allocation and requirements\n• Risk assessment and mitigation strategies\n• Stakeholder alignment and expectations\n• Technical architecture decisions\n• Success metrics and evaluation criteria\n\nThis session provides dedicated time for thorough project planning, team alignment, and strategic decision-making. Bring your project plans, timelines, and any blocking issues.`,
      date: '2025-07-11',
      startTime: '15:30',
      endTime: '17:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'project',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/project-deepdive',
      organizer: 'JUMPSTART Project Leadership',
      maxAttendees: 5,
      tags: ['jumpstart', 'project-planning', 'strategy', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    // Additional July Events
    {
      id: 'event-july-15-networking',
      title: 'The Importance of Relationship Building/Networking (JUMPSTART Session)',
      description: `Discover the power of professional networking and relationship building in this essential JUMPSTART career development session.\n\nKey topics covered:\n• Building authentic professional relationships\n• Networking strategies for introverts and extroverts\n• Leveraging LinkedIn and digital platforms\n• Maintaining long-term professional connections\n• Industry networking events and opportunities\n• The art of meaningful conversation\n\nLearn how to build a strong professional network that will support your career growth throughout your journey at OneDigital and beyond.`,
      date: '2025-07-15',
      startTime: '12:00',
      endTime: '13:30',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-networking',
      organizer: 'JUMPSTART Career Development Team',
      maxAttendees: 30,
      tags: ['jumpstart', 'networking', 'career-development', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' },
        { userId: 'user-4', status: 'attending', timestamp: '2025-06-25T13:00:00Z' }
      ]
    },
    {
      id: 'event-july-17-hangout',
      title: 'Intern Virtual Hangout - Travel Details',
      description: `Join your fellow JUMPSTART interns for a fun virtual hangout session to discuss travel plans and share experiences.\n\nSession highlights:\n• Share your travel stories and plans\n• Tips for work-life balance during busy times\n• Virtual team building activities\n• Casual Q&A and peer connections\n• Travel safety and planning tips\n• Open discussion and networking\n\nThis is a relaxed, informal session designed to build connections and have fun with your intern cohort while sharing travel experiences.`,
      date: '2025-07-17',
      startTime: '14:00',
      endTime: '15:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'social',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/intern-hangout',
      organizer: 'JUMPSTART Social Committee',
      maxAttendees: 30,
      tags: ['social', 'travel', 'networking', 'virtual'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    {
      id: 'event-july-19-bookclub',
      title: 'JUMPSTART Book Club / Crucial Conversations',
      description: `Continue our journey through "Crucial Conversations" in this third book club session with Miranda.\n\nToday's focus:\n• Advanced dialogue techniques\n• Handling strong emotions in conversations\n• Moving to action and follow-through\n• Real-world case studies and applications\n• Group reflection on personal growth\n• Implementation strategies for workplace scenarios\n\nBring examples of how you've used the tools from previous sessions and be ready to discuss chapters 10-12.`,
      date: '2025-07-19',
      startTime: '12:00',
      endTime: '13:00',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-bookclub',
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
      id: 'event-july-23-finance',
      title: 'How does Finance Work (JUMPSTART Session)',
      description: `Demystify the world of finance in this comprehensive JUMPSTART educational session designed to give you essential business knowledge.\n\nSession breakdown:\n• Fundamentals of business finance\n• Understanding financial statements\n• Budgeting and forecasting basics\n• How finance impacts daily business decisions\n• Career opportunities in finance\n• OneDigital's financial structure and goals\n\nThis session will provide valuable business acumen that will benefit you regardless of your department or career path.`,
      date: '2025-07-23',
      startTime: '13:00',
      endTime: '14:30',
      location: 'Virtual Meeting - Zoom',
      type: 'mandatory',
      category: 'jumpstart',
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/jumpstart-finance',
      organizer: 'JUMPSTART Finance Education Team',
      maxAttendees: 30,
      tags: ['jumpstart', 'finance', 'business-education', 'mandatory'],
      rsvps: [
        { userId: 'user-1', status: 'attending', timestamp: '2025-06-25T10:00:00Z' },
        { userId: 'user-2', status: 'attending', timestamp: '2025-06-25T11:00:00Z' },
        { userId: 'user-3', status: 'attending', timestamp: '2025-06-25T12:00:00Z' }
      ]
    },
    // Add recurring events
    ...generateRecurringEvents()
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
          <div className="bg-gradient-to-br from-[rgb(44,104,142)] via-[rgb(76,138,172)] to-[rgb(108,178,202)] rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8 relative overflow-hidden">
            {/* Enhanced Background decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-15 rounded-full -translate-y-20 translate-x-20 blur-sm"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16 blur-sm"></div>
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white bg-opacity-5 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white bg-opacity-8 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                      <span className="text-2xl">📅</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Program Itinerary
                    </h1>
                  </div>
                  <p className="text-white text-opacity-95 text-xl mb-6 leading-relaxed">
                    Your complete JUMPSTART journey schedule - view upcoming events, manage RSVPs, and stay connected with all program activities
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-white text-opacity-90">
                    <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
                      <div className="w-3 h-3 bg-[rgb(103,157,78)] rounded-full shadow-lg"></div>
                      <span className="font-medium">Mentorship Sessions</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
                      <div className="w-3 h-3 bg-[rgb(226,110,56)] rounded-full shadow-lg"></div>
                      <span className="font-medium">Learning Sessions</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm">
                      <div className="w-3 h-3 bg-[rgb(155,89,182)] rounded-full shadow-lg"></div>
                      <span className="font-medium">Project Meetings</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block relative mt-8 lg:mt-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-white from-opacity-25 to-white to-opacity-10 rounded-3xl flex items-center justify-center backdrop-blur-lg border-2 border-white border-opacity-30 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Icon name="Calendar" size={48} color="white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-gray-800">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Controls Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                {/* Enhanced View Toggle */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 shadow-inner">
                  <Button
                    variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('calendar')}
                    iconName="Calendar"
                    iconPosition="left"
                    className={viewMode === 'calendar' 
                      ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white shadow-lg transform scale-105' 
                      : 'hover:bg-white hover:shadow-sm transition-all duration-200'}
                  >
                    Calendar View
                  </Button>
                  <Button
                    variant={viewMode === 'agenda' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('agenda')}
                    iconName="List"
                    iconPosition="left"
                    className={viewMode === 'agenda' 
                      ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white shadow-lg transform scale-105' 
                      : 'hover:bg-white hover:shadow-sm transition-all duration-200'}
                  >
                    Agenda View
                  </Button>
                </div>
                
                {/* Quick Stats */}
                <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{filteredEvents.length} Events</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">
                      {filteredEvents.filter(e => e.rsvps?.some(r => r.userId === currentUser.id && r.status === 'attending')).length} Attending
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-3">
                {currentUser.isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateEvent}
                    iconName="Plus"
                    iconPosition="left"
                    className="border-[rgb(44,104,142)] text-[rgb(44,104,142)] hover:bg-[rgb(44,104,142)] hover:text-white transition-all duration-200"
                  >
                    Add Event
                  </Button>
                )}
                <Button
                  variant="text"
                  size="sm"
                  onClick={handleClearFilters}
                  iconName="Filter"
                  iconPosition="left"
                  className="text-gray-600 hover:text-[rgb(44,104,142)] transition-colors duration-200"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
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