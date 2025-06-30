import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = '' 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = showPageNumbers ? getVisiblePages() : [];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Mobile: Simple Previous/Next */}
      <div className="flex sm:hidden items-center space-x-2 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex-1"
        >
          <Icon name="ChevronLeft" size={16} />
          <span className="ml-1">Previous</span>
        </Button>
        
        <div className="flex items-center space-x-2 px-4">
          <span className="text-sm text-text-secondary">
            {currentPage} of {totalPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex-1"
        >
          <span className="mr-1">Next</span>
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center space-x-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center space-x-1"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Previous</span>
        </Button>

        {/* Page numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {visiblePages.map((page, index) => {
              if (typeof page === 'string' && page.startsWith('ellipsis')) {
                return (
                  <span key={page} className="px-2 py-1 text-text-muted">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handlePageClick(page)}
                  className={`min-w-10 ${
                    currentPage === page 
                      ? 'shadow-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  {page}
                </Button>
              );
            })}
          </div>
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1"
        >
          <span>Next</span>
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>

      {/* Results info */}
      <div className="hidden sm:block text-sm text-text-secondary">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;