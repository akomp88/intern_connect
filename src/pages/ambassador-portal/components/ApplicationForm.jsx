import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationForm = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    campus: '',
    role: '',
    pitch: '',
    experience: '',
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    timeSlots: [],
    contactInfo: {
      phone: '',
      linkedIn: '',
      email: ''
    },
    documents: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const totalSteps = 4;

  const campusOptions = [
    "Stanford University",
    "UC Berkeley",
    "UCLA",
    "USC",
    "MIT",
    "Harvard University",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Pennsylvania"
  ];

  const roleOptions = [
    "Campus Representative",
    "Event Coordinator",
    "Recruitment Ambassador",
    "Student Mentor",
    "Program Advocate"
  ];

  const timeSlotOptions = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
    "Evening (7:00 PM+)"
  ];

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

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleAvailabilityChange = (day, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked
      }
    }));
  };

  const handleTimeSlotChange = (slot, checked) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: checked 
        ? [...prev.timeSlots, slot]
        : prev.timeSlots.filter(s => s !== slot)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.campus) newErrors.campus = 'Campus selection is required';
        if (!formData.role) newErrors.role = 'Role selection is required';
        break;
      case 2:
        if (!formData.pitch || formData.pitch.length < 50) {
          newErrors.pitch = 'Pitch must be at least 50 characters';
        }
        if (!formData.experience || formData.experience.length < 30) {
          newErrors.experience = 'Experience description must be at least 30 characters';
        }
        break;
      case 3:
        const hasAvailability = Object.values(formData.availability).some(day => day);
        if (!hasAvailability) {
          newErrors.availability = 'Please select at least one day of availability';
        }
        if (formData.timeSlots.length === 0) {
          newErrors.timeSlots = 'Please select at least one time slot';
        }
        break;
      case 4:
        if (!formData.contactInfo.phone) newErrors.phone = 'Phone number is required';
        if (!formData.contactInfo.email) newErrors.email = 'Email is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            index + 1 <= currentStep 
              ? 'bg-primary text-white' :'bg-gray-200 text-gray-500'
          }`}>
            {index + 1 <= currentStep ? (
              index + 1 === currentStep ? (
                index + 1
              ) : (
                <Icon name="Check" size={16} />
              )
            ) : (
              index + 1
            )}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-12 h-0.5 mx-2 transition-all duration-200 ${
              index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Target Campus *
        </label>
        <select
          value={formData.campus}
          onChange={(e) => handleInputChange('campus', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select your campus</option>
          {campusOptions.map(campus => (
            <option key={campus} value={campus}>{campus}</option>
          ))}
        </select>
        {errors.campus && (
          <p className="text-error text-sm mt-1">{errors.campus}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Ambassador Role *
        </label>
        <select
          value={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select your preferred role</option>
          {roleOptions.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors.role && (
          <p className="text-error text-sm mt-1">{errors.role}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Role Pitch *
        </label>
        <textarea
          value={formData.pitch}
          onChange={(e) => handleInputChange('pitch', e.target.value)}
          placeholder="Tell us why you'd be a great ambassador for our program. What unique perspective and skills would you bring?"
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary h-32 resize-none"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          <span className={`text-sm ${formData.pitch.length < 50 ? 'text-error' : 'text-text-muted'}`}>
            {formData.pitch.length < 50 ? `${50 - formData.pitch.length} more characters needed` : 'Good length'}
          </span>
          <span className="text-sm text-text-muted">{formData.pitch.length}/500</span>
        </div>
        {errors.pitch && (
          <p className="text-error text-sm mt-1">{errors.pitch}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Relevant Experience *
        </label>
        <textarea
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="Describe your relevant experience in leadership, event planning, student organizations, or similar roles."
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary h-32 resize-none"
          maxLength={400}
        />
        <div className="flex justify-between items-center mt-1">
          <span className={`text-sm ${formData.experience.length < 30 ? 'text-error' : 'text-text-muted'}`}>
            {formData.experience.length < 30 ? `${30 - formData.experience.length} more characters needed` : 'Good length'}
          </span>
          <span className="text-sm text-text-muted">{formData.experience.length}/400</span>
        </div>
        {errors.experience && (
          <p className="text-error text-sm mt-1">{errors.experience}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Weekly Availability *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(formData.availability).map(([day, checked]) => (
            <label key={day} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary capitalize">{day}</span>
            </label>
          ))}
        </div>
        {errors.availability && (
          <p className="text-error text-sm mt-1">{errors.availability}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Preferred Time Slots *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timeSlotOptions.map(slot => (
            <label key={slot} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.timeSlots.includes(slot)}
                onChange={(e) => handleTimeSlotChange(slot, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{slot}</span>
            </label>
          ))}
        </div>
        {errors.timeSlots && (
          <p className="text-error text-sm mt-1">{errors.timeSlots}</p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Phone Number *
        </label>
        <Input
          type="tel"
          value={formData.contactInfo.phone}
          onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
          placeholder="(555) 123-4567"
          className="w-full"
        />
        {errors.phone && (
          <p className="text-error text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <Input
          type="email"
          value={formData.contactInfo.email}
          onChange={(e) => handleNestedInputChange('contactInfo', 'email', e.target.value)}
          placeholder="your.email@university.edu"
          className="w-full"
        />
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          LinkedIn Profile (Optional)
        </label>
        <Input
          type="url"
          value={formData.contactInfo.linkedIn}
          onChange={(e) => handleNestedInputChange('contactInfo', 'linkedIn', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Ambassador Application
        </h2>
        <p className="text-text-secondary">
          Join our campus ambassador program and represent our internship opportunities at your university.
        </p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <span className="text-sm text-text-muted">
            Step {currentStep} of {totalSteps}
          </span>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;