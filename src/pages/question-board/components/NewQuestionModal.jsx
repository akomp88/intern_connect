import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewQuestionModal = ({ isOpen, onClose, onSubmit, channels }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    channel: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Set default channel if available
      if (channels && channels.length > 0 && !formData.channel) {
        setFormData(prev => ({ ...prev, channel: channels[0].id }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, channels, formData.channel]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      channel: channels && channels.length > 0 ? channels[0].id : '',
      tags: []
    });
    setTagInput('');
    setIsSubmitting(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      handleClose();
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.channel;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-400 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl max-h-[90vh] bg-surface rounded-xl shadow-elevation-3 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Ask a Question</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-text-muted hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Channel Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Channel <span className="text-error">*</span>
              </label>
              <select
                value={formData.channel}
                onChange={(e) => handleInputChange('channel', e.target.value)}
                className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
                required
              >
                <option value="">Select a channel</option>
                {channels?.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    #{channel.name} - {channel.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Question Title <span className="text-error">*</span>
              </label>
              <Input
                type="text"
                placeholder="What's your question? Be specific and clear..."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
                maxLength={200}
                required
              />
              <p className="text-xs text-text-muted mt-1">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Question Details <span className="text-error">*</span>
              </label>
              <textarea
                placeholder={`Provide more context about your question:\n\n• What have you tried so far?\n• What specific help do you need?\n• Include any relevant code or examples\n• Mention any error messages you're seeing`}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full p-3 border border-border rounded-lg text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary resize-none"
                rows={8}
                maxLength={2000}
                required
              />
              <p className="text-xs text-text-muted mt-1">
                {formData.content.length}/2000 characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags (Optional)
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  placeholder="Add a tag (e.g., React, JavaScript, Career)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className="flex-1"
                  maxLength={20}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 5}
                >
                  Add
                </Button>
              </div>
              
              {/* Tag Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary text-sm rounded-button"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-primary hover:text-primary-700"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-text-muted">
                Add up to 5 tags to help others find your question. {formData.tags.length}/5 tags used.
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">Question Guidelines</h4>
                  <ul className="text-xs text-primary space-y-1">
                    <li>• Be specific and clear in your question title</li>
                    <li>• Provide context and what you've already tried</li>
                    <li>• Use relevant tags to help others find your question</li>
                    <li>• Be respectful and professional in your language</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-surface-secondary">
            <div className="flex items-center justify-between">
              <div className="text-xs text-text-muted">
                Your question will be visible to all members of the selected channel
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isFormValid || isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Question'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuestionModal;