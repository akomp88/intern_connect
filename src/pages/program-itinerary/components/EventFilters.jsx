import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EventFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const eventTypes = ['all', 'mandatory', 'optional'];
  const rsvpStatuses = ['all', 'attending', 'not_attending', 'pending'];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-elevation-1 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search events..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Event Type Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">Type:</span>
            <select
              value={filters.eventType || 'all'}
              onChange={(e) => handleFilterChange('eventType', e.target.value)}
              className="px-3 py-1.5 bg-surface border border-border rounded-button text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
            >
              <option value="all">All Events</option>
              <option value="mandatory">Required</option>
              <option value="optional">Optional</option>
            </select>
          </div>

          {/* RSVP Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">RSVP:</span>
            <select
              value={filters.rsvpStatus || 'all'}
              onChange={(e) => handleFilterChange('rsvpStatus', e.target.value)}
              className="px-3 py-1.5 bg-surface border border-border rounded-button text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="attending">Attending</option>
              <option value="not_attending">Not Attending</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">From:</span>
            <Input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-auto"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">To:</span>
            <Input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-auto"
            />
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.search || filters.eventType !== 'all' || filters.rsvpStatus !== 'all' || filters.startDate || filters.endDate) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-text-secondary">Active filters:</span>
            
            {filters.search && (
              <span className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button">
                Search: "{filters.search}"
              </span>
            )}
            
            {filters.eventType && filters.eventType !== 'all' && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary text-xs font-medium rounded-button">
                Type: {filters.eventType === 'mandatory' ? 'Required' : 'Optional'}
              </span>
            )}
            
            {filters.rsvpStatus && filters.rsvpStatus !== 'all' && (
              <span className="px-2 py-1 bg-accent-100 text-accent text-xs font-medium rounded-button">
                RSVP: {filters.rsvpStatus.replace('_', ' ')}
              </span>
            )}
            
            {(filters.startDate || filters.endDate) && (
              <span className="px-2 py-1 bg-success-100 text-success text-xs font-medium rounded-button">
                Date Range: {filters.startDate || 'Start'} - {filters.endDate || 'End'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters;