import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

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

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-text-primary">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
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
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            iconName="ChevronRight"
          />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            
            return (
              <div
                key={index}
                className={`
                  min-h-24 p-1 border border-border-light rounded-lg
                  ${date ? 'bg-surface hover:bg-surface-secondary cursor-pointer' : 'bg-transparent'}
                  ${isToday(date) ? 'ring-2 ring-primary bg-primary-50' : ''}
                  ${!isCurrentMonth(date) ? 'opacity-40' : ''}
                  transition-colors duration-150
                `}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(date) ? 'text-primary' : 'text-text-primary'
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
                            text-xs p-1 rounded cursor-pointer truncate
                            ${event.type === 'mandatory' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
                            }
                            ${isAdmin ? 'hover:opacity-80' : ''}
                            transition-opacity duration-150
                          `}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-text-muted p-1">
                          +{dayEvents.length - 3} more
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

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 p-4 border-t border-border bg-surface-secondary">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-sm text-text-secondary">Mandatory</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded"></div>
          <span className="text-sm text-text-secondary">Optional</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;