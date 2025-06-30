import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  filterConfig = {},
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLocalFilters(filters || {});
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

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...localFilters,
      [filterKey]: value
    };
    setLocalFilters(updatedFilters);
  };

  const handleMultiSelectChange = (filterKey, option, checked) => {
    const currentValues = localFilters[filterKey] || [];
    const updatedValues = checked
      ? [...currentValues, option]
      : currentValues.filter(item => item !== option);
    
    handleFilterChange(filterKey, updatedValues);
  };

  const handleApplyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange(localFilters);
    }
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    Object.keys(filterConfig).forEach(key => {
      if (filterConfig[key].type === 'multiselect') {
        clearedFilters[key] = [];
      } else {
        clearedFilters[key] = '';
      }
    });
    setLocalFilters(clearedFilters);
    setSearchTerm('');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getFilteredOptions = (options, searchTerm) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
        fixed top-0 left-0 h-full w-80 bg-surface border-r border-border shadow-elevation-3 z-300
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:w-64 md:shadow-none md:border-r
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search */}
            {filterConfig.search && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Search
                </label>
                <Input
                  type="search"
                  placeholder={filterConfig.search.placeholder || "Search..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            {/* Dynamic Filter Sections */}
            {Object.entries(filterConfig).map(([filterKey, config]) => {
              if (filterKey === 'search') return null;

              return (
                <div key={filterKey}>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    {config.label}
                  </label>

                  {/* Single Select */}
                  {config.type === 'select' && (
                    <div className="space-y-2">
                      {config.options.map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={filterKey}
                            value={option}
                            checked={localFilters[filterKey] === option}
                            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                            className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                          />
                          <span className="text-sm text-text-secondary">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Multi Select */}
                  {config.type === 'multiselect' && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {getFilteredOptions(config.options, searchTerm).map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(localFilters[filterKey] || []).includes(option)}
                            onChange={(e) => handleMultiSelectChange(filterKey, option, e.target.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                          />
                          <span className="text-sm text-text-secondary">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Range */}
                  {config.type === 'range' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localFilters[`${filterKey}_min`] || ''}
                          onChange={(e) => handleFilterChange(`${filterKey}_min`, e.target.value)}
                          className="flex-1"
                          min={config.min}
                          max={config.max}
                        />
                        <span className="text-text-muted">to</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localFilters[`${filterKey}_max`] || ''}
                          onChange={(e) => handleFilterChange(`${filterKey}_max`, e.target.value)}
                          className="flex-1"
                          min={config.min}
                          max={config.max}
                        />
                      </div>
                    </div>
                  )}

                  {/* Date Range */}
                  {config.type === 'daterange' && (
                    <div className="space-y-3">
                      <Input
                        type="date"
                        value={localFilters[`${filterKey}_start`] || ''}
                        onChange={(e) => handleFilterChange(`${filterKey}_start`, e.target.value)}
                        className="w-full"
                      />
                      <Input
                        type="date"
                        value={localFilters[`${filterKey}_end`] || ''}
                        onChange={(e) => handleFilterChange(`${filterKey}_end`, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Text Input */}
                  {config.type === 'text' && (
                    <Input
                      type="text"
                      placeholder={config.placeholder}
                      value={localFilters[filterKey] || ''}
                      onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                      className="w-full"
                    />
                  )}
                </div>
              );
            })}

            {/* Active Filters Summary */}
            {Object.keys(localFilters).some(key => {
              const value = localFilters[key];
              return Array.isArray(value) ? value.length > 0 : value;
            }) && (
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-text-primary mb-3">Active Filters</h3>
                <div className="space-y-2">
                  {Object.entries(localFilters).map(([key, value]) => {
                    if (!value || (Array.isArray(value) && value.length === 0)) return null;
                    
                    const config = filterConfig[key.replace('_min', '').replace('_max', '').replace('_start', '').replace('_end', '')];
                    if (!config) return null;

                    return (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary truncate">
                          {config.label}: {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleFilterChange(key, Array.isArray(value) ? [] : '')}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border bg-surface-secondary">
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
      </div>
    </>
  );
};

export default FilterSidebar;