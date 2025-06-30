import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className = '' 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: value
    };
    onFiltersChange(updatedFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', updatedTags);
  };

  const availableTags = [
    'React', 'JavaScript', 'Python', 'Career', 'Internship', 
    'Technical', 'Mentorship', 'Project', 'Learning', 'Tools'
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.sortBy && filters.sortBy !== 'recent') count++;
    if (filters.dateRange && filters.dateRange !== 'all') count++;
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-muted" />
        </div>
        <Input
          type="search"
          placeholder="Search questions, answers, or tags..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          iconName="Filter"
          iconPosition="left"
          className="relative"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-muted hover:text-error"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-surface-secondary border border-border rounded-lg p-4 space-y-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Questions' },
                { value: 'open', label: 'Open' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'unanswered', label: 'Unanswered' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.status === option.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('status', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'recent', label: 'Most Recent' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'votes', label: 'Most Votes' },
                { value: 'answers', label: 'Most Answers' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('sortBy', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date Range
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Time' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.dateRange === option.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('dateRange', option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  variant={(filters.tags || []).includes(tag) ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleTagToggle(tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;