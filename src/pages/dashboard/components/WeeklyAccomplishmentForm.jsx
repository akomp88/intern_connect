import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WeeklyAccomplishmentForm = ({ onSave, onSubmit, onExport, isLoading = false }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    project: '',
    meetings: '',
    keyTakeaways: '',
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const textareaRef = useRef(null);

  // Mock data for autocomplete suggestions
  const projectSuggestions = [
    "Mobile App Redesign",
    "Data Analytics Dashboard",
    "Customer Portal Enhancement",
    "API Integration Project",
    "Marketing Automation Tool"
  ];

  const meetingSuggestions = [
    "Daily Standup",
    "Sprint Planning",
    "Code Review Session",
    "Client Presentation",
    "Team Retrospective",
    "Mentor 1:1",
    "Architecture Discussion"
  ];

  const tagSuggestions = [
    "React", "JavaScript", "Python", "Design", "Testing",
    "Sarah Johnson", "Mike Chen", "Alex Rodriguez", "Emma Davis",
    "Frontend Team", "Backend Team", "UX Team", "QA Team"
  ];

  useEffect(() => {
    // Auto-save functionality
    const timer = setTimeout(() => {
      if (Object.values(formData).some(value => 
        Array.isArray(value) ? value.length > 0 : value.trim() !== ''
      )) {
        setIsDraft(true);
        // Auto-save logic would go here
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

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

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleTagAdd(tagInput.trim());
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.project) newErrors.project = 'Project is required';
    if (!formData.keyTakeaways.trim()) newErrors.keyTakeaways = 'Key takeaways are required';
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start > end) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...formData, isDraft: true });
      setIsDraft(true);
    }
  };

  const handleSubmit = () => {
    if (validateForm() && onSubmit) {
      onSubmit({ ...formData, isDraft: false });
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(formData);
    }
  };

  const filteredTagSuggestions = tagSuggestions.filter(tag =>
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !formData.tags.includes(tag)
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="PenTool" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Weekly Accomplishments</h2>
            <p className="text-sm text-text-secondary">Document your progress and key learnings</p>
          </div>
        </div>
        {isDraft && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Save" size={16} />
            <span>Draft saved</span>
          </div>
        )}
      </div>

      <form className="space-y-6">
        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Start Date *
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className={errors.startDate ? 'border-error' : ''}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-error">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              End Date *
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className={errors.endDate ? 'border-error' : ''}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-error">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Project Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project *
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Select or type project name..."
              value={formData.project}
              onChange={(e) => handleInputChange('project', e.target.value)}
              className={errors.project ? 'border-error' : ''}
            />
            {formData.project && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-2 z-10 max-h-40 overflow-y-auto">
                {projectSuggestions
                  .filter(project => 
                    project.toLowerCase().includes(formData.project.toLowerCase()) &&
                    project !== formData.project
                  )
                  .map((project, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors duration-150"
                      onClick={() => handleInputChange('project', project)}
                    >
                      {project}
                    </button>
                  ))
                }
              </div>
            )}
          </div>
          {errors.project && (
            <p className="mt-1 text-sm text-error">{errors.project}</p>
          )}
        </div>

        {/* Meetings Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Meetings Attended
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Select or type meeting names..."
              value={formData.meetings}
              onChange={(e) => handleInputChange('meetings', e.target.value)}
            />
            {formData.meetings && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-2 z-10 max-h-40 overflow-y-auto">
                {meetingSuggestions
                  .filter(meeting => 
                    meeting.toLowerCase().includes(formData.meetings.toLowerCase()) &&
                    !formData.meetings.includes(meeting)
                  )
                  .map((meeting, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors duration-150"
                      onClick={() => handleInputChange('meetings', 
                        formData.meetings ? `${formData.meetings}, ${meeting}` : meeting
                      )}
                    >
                      {meeting}
                    </button>
                  ))
                }
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaways */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Key Takeaways *
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              placeholder="Describe your key learnings, achievements, and insights from this week..."
              value={formData.keyTakeaways}
              onChange={(e) => handleInputChange('keyTakeaways', e.target.value)}
              className={`
                w-full min-h-32 p-3 border rounded-lg resize-none
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary
                transition-all duration-200
                ${errors.keyTakeaways ? 'border-error' : 'border-border'}
              `}
              rows={4}
            />
            <div className="absolute bottom-3 right-3 text-xs text-text-muted">
              {formData.keyTakeaways.length}/1000
            </div>
          </div>
          {errors.keyTakeaways && (
            <p className="mt-1 text-sm text-error">{errors.keyTakeaways}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tags (Teammates, Mentors, Projects)
          </label>
          <div className="space-y-3">
            {/* Tag Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Type to add tags..."
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setShowTagSuggestions(e.target.value.length > 0);
                }}
                onKeyPress={handleTagInputKeyPress}
                onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
              />
              
              {/* Tag Suggestions */}
              {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-2 z-10 max-h-40 overflow-y-auto">
                  {filteredTagSuggestions.slice(0, 8).map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors duration-150"
                      onClick={() => handleTagAdd(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary text-sm font-medium rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="text-primary hover:text-primary-700 transition-colors duration-150"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isLoading}
            iconName="Save"
            iconPosition="left"
            className="sm:w-auto"
          >
            Save Draft
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
            iconName="Send"
            iconPosition="left"
            className="sm:w-auto"
          >
            Submit Entry
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={isLoading || !formData.keyTakeaways}
            iconName="Download"
            iconPosition="left"
            className="sm:w-auto"
          >
            Export PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WeeklyAccomplishmentForm;