import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  activeFilters, 
  onRemoveFilter, 
  onClearAll,
  filterConfig = {},
  className = '' 
}) => {
  const getFilterDisplayValue = (key, value) => {
    const config = filterConfig[key];
    if (!config) return value;

    // Handle array values (multiselect)
    if (Array.isArray(value)) {
      if (value.length === 0) return null;
      if (value.length === 1) return value[0];
      return `${value[0]} +${value.length - 1} more`;
    }

    // Handle range values
    if (key.includes('_min') || key.includes('_max')) {
      const baseKey = key.replace('_min', '').replace('_max', '');
      const baseConfig = filterConfig[baseKey];
      if (baseConfig && baseConfig.type === 'range') {
        const suffix = key.includes('_min') ? ' (min)' : ' (max)';
        return `${value}${suffix}`;
      }
    }

    // Handle date range values
    if (key.includes('_start') || key.includes('_end')) {
      const baseKey = key.replace('_start', '').replace('_end', '');
      const baseConfig = filterConfig[baseKey];
      if (baseConfig && baseConfig.type === 'daterange') {
        const suffix = key.includes('_start') ? ' (from)' : ' (to)';
        return `${new Date(value).toLocaleDateString()}${suffix}`;
      }
    }

    return value;
  };

  const getFilterLabel = (key) => {
    // Handle range and date range keys
    const baseKey = key.replace('_min', '').replace('_max', '').replace('_start', '').replace('_end', '');
    const config = filterConfig[baseKey] || filterConfig[key];
    return config ? config.label : key;
  };

  // Get all active filters with display values
  const activeFilterEntries = Object.entries(activeFilters)
    .map(([key, value]) => {
      const displayValue = getFilterDisplayValue(key, value);
      if (!displayValue) return null;
      
      return {
        key,
        label: getFilterLabel(key),
        displayValue,
        isArray: Array.isArray(value)
      };
    })
    .filter(Boolean);

  if (activeFilterEntries.length === 0) {
    return null;
  }

  const handleRemoveFilter = (key) => {
    onRemoveFilter(key);
  };

  const handleClearAll = () => {
    onClearAll();
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-text-primary">Active filters:</span>
      
      {activeFilterEntries.map(({ key, label, displayValue, isArray }) => (
        <div
          key={key}
          className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-button text-sm font-medium"
        >
          <span className="truncate max-w-32">
            <span className="font-semibold">{label}:</span> {displayValue}
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => handleRemoveFilter(key)}
            className="text-primary-600 hover:text-primary-800 hover:bg-primary-200 -mr-1"
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
      ))}

      {activeFilterEntries.length > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          className="text-text-secondary hover:text-text-primary border-border hover:border-primary"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;