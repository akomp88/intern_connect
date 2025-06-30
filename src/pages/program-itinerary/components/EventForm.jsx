import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EventForm = ({ 
  event = null, 
  isOpen, 
  onClose, 
  onSave, 
  isAdmin = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'optional',
    isVirtual: false,
    meetingLink: '',
    organizer: '',
    maxAttendees: '',
    tags: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        location: event.location || '',
        type: event.type || 'optional',
        isVirtual: event.isVirtual || false,
        meetingLink: event.meetingLink || '',
        organizer: event.organizer || '',
        maxAttendees: event.maxAttendees || '',
        tags: event.tags ? event.tags.join(', ') : ''
      });
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        type: 'optional',
        isVirtual: false,
        meetingLink: '',
        organizer: '',
        maxAttendees: '',
        tags: ''
      });
    }
    setErrors({});
  }, [event, isOpen]);

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

  if (!isOpen || !isAdmin) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (start >= end) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    if (formData.isVirtual && formData.meetingLink && !isValidUrl(formData.meetingLink)) {
      newErrors.meetingLink = 'Please enter a valid meeting link';
    }

    if (formData.maxAttendees && (isNaN(formData.maxAttendees) || parseInt(formData.maxAttendees) < 1)) {
      newErrors.maxAttendees = 'Max attendees must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const eventData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null
      };

      if (event) {
        eventData.id = event.id;
      }

      await onSave(eventData);
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({ submit: 'Failed to save event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-scale-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl max-h-[90vh] bg-surface rounded-xl shadow-elevation-3 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Event Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className={errors.title ? 'border-error' : ''}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-error">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter event description"
                  rows={4}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-button text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary resize-vertical"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Event Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-button text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                >
                  <option value="optional">Optional</option>
                  <option value="mandatory">Required</option>
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Date & Time</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={errors.date ? 'border-error' : ''}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-error">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Start Time *
                  </label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className={errors.startTime ? 'border-error' : ''}
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-sm text-error">{errors.startTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    End Time *
                  </label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className={errors.endTime ? 'border-error' : ''}
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-sm text-error">{errors.endTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Location</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="isVirtual"
                  checked={formData.isVirtual}
                  onChange={(e) => handleInputChange('isVirtual', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="isVirtual" className="text-sm font-medium text-text-primary">
                  Virtual Event
                </label>
              </div>

              {!formData.isVirtual && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Physical Location
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter event location"
                  />
                </div>
              )}

              {formData.isVirtual && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Meeting Link
                  </label>
                  <Input
                    type="url"
                    value={formData.meetingLink}
                    onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className={errors.meetingLink ? 'border-error' : ''}
                  />
                  {errors.meetingLink && (
                    <p className="mt-1 text-sm text-error">{errors.meetingLink}</p>
                  )}
                </div>
              )}
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Additional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Organizer
                  </label>
                  <Input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => handleInputChange('organizer', e.target.value)}
                    placeholder="Event organizer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Max Attendees
                  </label>
                  <Input
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className={errors.maxAttendees ? 'border-error' : ''}
                  />
                  {errors.maxAttendees && (
                    <p className="mt-1 text-sm text-error">{errors.maxAttendees}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tags
                </label>
                <Input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                <p className="mt-1 text-xs text-text-muted">
                  Separate multiple tags with commas (e.g., workshop, networking, training)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <p className="text-sm text-error">{errors.submit}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-surface-secondary">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                iconName="Save"
                iconPosition="left"
              >
                {event ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;