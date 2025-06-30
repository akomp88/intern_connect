import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsHeader = ({ 
  totalResults, 
  currentPage, 
  totalPages, 
  resultsPerPage,
  onExport,
  onRefresh,
  isLoading = false,
  className = '' 
}) => {
  const startResult = ((currentPage - 1) * resultsPerPage) + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 ${className}`}>
      {/* Results Count */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-text-muted" />
          <span className="text-sm text-text-secondary">
            {totalResults > 0 ? (
              <>
                Showing <span className="font-medium text-text-primary">{startResult}-{endResult}</span> of{' '}
                <span className="font-medium text-text-primary">{totalResults}</span> results
              </>
            ) : (
              'No results found'
            )}
          </span>
        </div>

        {totalPages > 1 && (
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-text-muted">•</span>
            <span className="text-sm text-text-secondary">
              Page <span className="font-medium text-text-primary">{currentPage}</span> of{' '}
              <span className="font-medium text-text-primary">{totalPages}</span>
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="text-text-secondary hover:text-text-primary"
          title="Refresh results"
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            className={isLoading ? 'animate-spin' : ''}
          />
          <span className="hidden sm:inline ml-2">Refresh</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={totalResults === 0}
          className="text-text-secondary hover:text-text-primary"
          title="Export directory"
        >
          <Icon name="Download" size={16} />
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultsHeader;