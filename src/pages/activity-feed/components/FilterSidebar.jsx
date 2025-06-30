import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState({
    team: '',
    project: '',
    office: 'My office',
    dateRange: 'last 7 days',
    author: '',
    tags: []
  });

  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
    }
  }, [filters]);

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

  const teams = [
    "Engineering",
    "Product Management",
    "Design",
    "Marketing",
    "Sales",
    "Data Science",
    "Operations",
    "Finance",
    "HR"
  ];

  const projects = [
    "Mobile App Redesign",
    "API Integration",
    "Customer Dashboard",
    "Analytics Platform",
    "Marketing Campaign",
    "User Research",
    "Database Migration",
    "Security Audit",
    "Performance Optimization"
  ];

  const offices = [
    "My office",
    "San Francisco",
    "New York",
    "Austin",
    "Seattle",
    "Chicago",
    "Boston",
    "Remote"
  ];

  const dateRanges = [
    "Today",
    "Yesterday",
    "last 7 days",
    "last 14 days",
    "last 30 days",
    "This week",
    "This month",
    "Custom range"
  ];

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...localFilters,
      [filterKey]: value
    };
    setLocalFilters(updatedFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = localFilters.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', updatedTags);
  };

  const handleApplyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange(localFilters);
    }
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      team: '',
      project: '',
      office: 'My office',
      dateRange: 'last 7 days',
      author: '',
      tags: []
    };
    setLocalFilters(clearedFilters);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.team) count++;
    if (localFilters.project) count++;
    if (localFilters.office !== 'My office') count++;
    if (localFilters.dateRange !== 'last 7 days') count++;
    if (localFilters.author) count++;
    if (localFilters.tags && localFilters.tags.length > 0) count++;
    return count;
  };

  const popularTags = [
    "frontend", "backend", "design", "research", "testing", "deployment",
    "meeting", "presentation", "learning", "collaboration", "debugging",
    "optimization", "documentation", "review", "planning"
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="md:hidden fixed inset-0 z-200 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Sidebar */}
      <div className={`
        fixed top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-surface border-r border-border shadow-elevation-3 z-300
        transform transition-transform duration-300 ease-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:w-64 md:shadow-none md:border-r md:h-[calc(100vh-10rem)]
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Team Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Team
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="team"
                  value=""
                  checked={localFilters.team === ''}
                  onChange={(e) => handleFilterChange('team', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-secondary">All Teams</span>
              </label>
              {teams.map((team) => (
                <label key={team} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="team"
                    value={team}
                    checked={localFilters.team === team}
                    onChange={(e) => handleFilterChange('team', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{team}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Project Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Project
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="project"
                  value=""
                  checked={localFilters.project === ''}
                  onChange={(e) => handleFilterChange('project', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-text-secondary">All Projects</span>
              </label>
              {projects.map((project) => (
                <label key={project} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="project"
                    value={project}
                    checked={localFilters.project === project}
                    onChange={(e) => handleFilterChange('project', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{project}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Office Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Office
            </label>
            <div className="space-y-2">
              {offices.map((office) => (
                <label key={office} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="office"
                    value={office}
                    checked={localFilters.office === office}
                    onChange={(e) => handleFilterChange('office', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{office}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Date Range
            </label>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <label key={range} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range}
                    checked={localFilters.dateRange === range}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">{range}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Author Search */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Author
            </label>
            <Input
              type="search"
              placeholder="Search by author name..."
              value={localFilters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ${
                    (localFilters.tags || []).includes(tag)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-text-primary mb-3">Active Filters</h3>
              <div className="space-y-2">
                {localFilters.team && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Team: {localFilters.team}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('team', '')}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {localFilters.project && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Project: {localFilters.project}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('project', '')}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {localFilters.office !== 'My office' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Office: {localFilters.office}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('office', 'My office')}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {localFilters.dateRange !== 'last 7 days' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Date: {localFilters.dateRange}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('dateRange', 'last 7 days')}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {localFilters.author && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Author: {localFilters.author}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('author', '')}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
                {localFilters.tags && localFilters.tags.length > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Tags: {localFilters.tags.join(', ')}</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleFilterChange('tags', [])}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-4">
          <div className="flex flex-col space-y-2">
            <Button
              variant="primary"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;