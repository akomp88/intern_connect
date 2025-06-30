import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChannelSelector = ({ channels, selectedChannel, onChannelChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChannelSelect = (channel) => {
    onChannelChange(channel);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={toggleDropdown}
        className="w-full justify-between"
        iconName="ChevronDown"
        iconPosition="right"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Hash" size={16} className="text-text-muted" />
          <span className="truncate">{selectedChannel.name}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-3 z-50 max-h-64 overflow-y-auto">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleChannelSelect(channel)}
              className={`w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                selectedChannel.id === channel.id ? 'bg-primary-50 text-primary' : 'text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Hash" size={16} className="text-text-muted" />
                  <div>
                    <p className="font-medium">{channel.name}</p>
                    <p className="text-xs text-text-muted">{channel.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-muted">{channel.questionCount} questions</span>
                  {channel.hasUnread && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelSelector;