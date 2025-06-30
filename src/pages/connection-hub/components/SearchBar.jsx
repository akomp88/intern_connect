import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch,
  suggestions = [],
  recentSearches = [],
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length > 0 || recentSearches.length > 0);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(searchTerm.length > 0 || recentSearches.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClearClick = () => {
    onClearSearch();
    setShowSuggestions(false);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
      if (searchRef.current) {
        searchRef.current.blur();
      }
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()) &&
    suggestion.toLowerCase() !== searchTerm.toLowerCase()
  );

  const displayRecentSearches = recentSearches.filter(search =>
    !searchTerm || search.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon 
            name="Search" 
            size={18} 
            className={`transition-colors duration-200 ${
              isFocused ? 'text-primary' : 'text-text-muted'
            }`}
          />
        </div>
        
        <Input
          type="search"
          placeholder="Search by name, role, department, or skills..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className={`pl-10 pr-10 transition-all duration-200 ${
            isFocused ? 'ring-2 ring-primary ring-opacity-20 border-primary' : ''
          }`}
        />
        
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearClick}
              className="text-text-muted hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (filteredSuggestions.length > 0 || displayRecentSearches.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-3 z-200 max-h-64 overflow-y-auto animate-scale-in"
        >
          {/* Recent Searches */}
          {displayRecentSearches.length > 0 && !searchTerm && (
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-1 mb-2">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Recent Searches
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => console.log('Clear recent searches')}
                  className="text-text-muted hover:text-text-primary"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
              {displayRecentSearches.slice(0, 5).map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface-secondary rounded-button transition-colors duration-150"
                >
                  <Icon name="Clock" size={14} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              {displayRecentSearches.length > 0 && !searchTerm && (
                <div className="border-t border-border my-2" />
              )}
              <div className="px-2 py-1 mb-2">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Suggestions
                </span>
              </div>
              {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface-secondary rounded-button transition-colors duration-150"
                >
                  <Icon name="Search" size={14} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;