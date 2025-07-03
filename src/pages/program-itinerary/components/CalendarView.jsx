import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CalendarView = ({ 
  events, 
  currentDate, 
  onDateChange, 
  onEventClick, 
  isAdmin = false,
  onEventDrop 
}) => {
  const [draggedEvent, setDraggedEvent] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toDateString();
    return events.filter(event => 
      new Date(event.date).toDateString() === dateStr
    );
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const handleDragStart = (e, event) => {
    if (!isAdmin) return;
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    if (!isAdmin || !draggedEvent) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDate) => {
    if (!isAdmin || !draggedEvent || !targetDate) return;
    e.preventDefault();
    
    if (onEventDrop) {
      onEventDrop(draggedEvent, targetDate);
    }
    setDraggedEvent(null);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    if (!date) return false;
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventColor = (event) => {
    switch (event.category) {
      case 'mentorship':
        return 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white';
      case 'client-meeting':
      case 'client-prep':
        return 'bg-gradient-to-r from-[rgb(226,110,56)] to-[rgb(246,198,69)] text-white';
      case 'standup':
      case 'tech-talk':
        return 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white';
      case 'orientation':
      case 'presentation':
        return event.type === 'mandatory' 
          ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white'
          : 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white';
      case 'networking':
      case 'leadership':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'workshop':
        return 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white';
      default:
        return event.type === 'mandatory' 
          ? 'bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white'
          : 'bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] text-white';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30 backdrop-blur-sm"
            >
              Today
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevMonth}
              iconName="ChevronLeft"
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              iconName="ChevronRight"
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            
            return (
              <div
                key={index}
                className={`
                  min-h-32 p-2 rounded-xl border-2 transition-all duration-200
                  ${date ? 'bg-gray-50 hover:bg-white hover:shadow-lg cursor-pointer border-gray-100' : 'bg-transparent border-transparent'}
                  ${isToday(date) ? 'ring-2 ring-[rgb(44,104,142)] bg-blue-50 border-[rgb(44,104,142)]' : ''}
                  ${!isCurrentMonth(date) ? 'opacity-40' : ''}
                `}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-bold mb-2 ${
                      isToday(date) ? 'text-[rgb(44,104,142)]' : 'text-gray-800'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          draggable={isAdmin}
                          onDragStart={(e) => handleDragStart(e, event)}
                          onClick={() => onEventClick(event)}
                          className={`
                            text-xs p-2 rounded-lg cursor-pointer truncate shadow-sm
                            ${getEventColor(event)}
                            ${isAdmin ? 'hover:shadow-md transform hover:scale-105' : 'hover:shadow-md hover:scale-102'}
                            transition-all duration-200 font-medium border border-white border-opacity-20
                          `}
                          title={`${event.title} - ${event.startTime} • Click to RSVP`}
                        >
                          <div className="flex items-center space-x-1">
                            {event.isVirtual && <span className="text-xs">💻</span>}
                            {event.category === 'mentorship' && <span className="text-xs">🤝</span>}
                            {event.category === 'client-meeting' && <span className="text-xs">👥</span>}
                            {event.category === 'standup' && <span className="text-xs">🔄</span>}
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div 
                          className="text-xs text-gray-500 p-1 bg-gray-100 rounded text-center font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                          onClick={() => {
                            const firstEvent = dayEvents[0];
                            if (firstEvent) onEventClick(firstEvent);
                          }}
                          title="Click to view more events"
                        >
                          +{dayEvents.length - 3} more events
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Event Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[rgb(44,104,142)] to-[rgb(108,178,202)] rounded"></div>
                <span className="text-xs text-gray-600">Mandatory</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[rgb(103,157,78)] to-[rgb(178,193,74)] rounded"></div>
                <span className="text-xs text-gray-600">Mentorship</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[rgb(226,110,56)] to-[rgb(246,198,69)] rounded"></div>
                <span className="text-xs text-gray-600">Client/Prep</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <span className="text-xs text-gray-600">Networking</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Icon name="MousePointer" size={14} className="text-gray-500" />
                <span>Click events to RSVP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-gray-500" />
                <span>View details & accept/decline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;