import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ 
  currentView, 
  onViewChange, 
  className = '' 
}) => {
  const views = [
    {
      key: 'table',
      label: 'Table View',
      icon: 'Table',
      description: 'Detailed table with sortable columns'
    },
    {
      key: 'cards',
      label: 'Card View',
      icon: 'Grid3X3',
      description: 'Visual cards with key information'
    }
  ];

  return (
    <div className={`flex items-center space-x-1 bg-surface-secondary rounded-lg p-1 ${className}`}>
      {views.map((view) => (
        <Button
          key={view.key}
          variant={currentView === view.key ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view.key)}
          className={`flex items-center space-x-2 transition-all duration-200 ${
            currentView === view.key 
              ? 'shadow-sm' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
          title={view.description}
        >
          <Icon 
            name={view.icon} 
            size={16} 
            className={currentView === view.key ? 'text-white' : 'text-current'}
          />
          <span className="hidden sm:inline font-medium">
            {view.label}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;