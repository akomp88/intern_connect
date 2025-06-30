import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DirectoryTable = ({ 
  users, 
  onUserClick, 
  sortConfig, 
  onSort, 
  searchTerm,
  className = '' 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent-200 text-accent-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatRole = (role, isFormerIntern) => {
    if (isFormerIntern) {
      return `${role} (Former Intern)`;
    }
    return role;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1 ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary border-b border-border">
            <tr>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 font-medium text-text-primary hover:text-primary"
                >
                  <span>Name</span>
                  {getSortIcon('name')}
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-2 font-medium text-text-primary hover:text-primary"
                >
                  <span>Role</span>
                  {getSortIcon('role')}
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('office')}
                  className="flex items-center space-x-2 font-medium text-text-primary hover:text-primary"
                >
                  <span>Office</span>
                  {getSortIcon('office')}
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 font-medium text-text-primary hover:text-primary"
                >
                  <span>Department</span>
                  {getSortIcon('department')}
                </Button>
              </th>
              <th className="text-left p-4">
                <span className="font-medium text-text-primary">Status</span>
              </th>
              <th className="text-right p-4">
                <span className="font-medium text-text-primary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user.id}
                className={`transition-colors duration-150 cursor-pointer ${
                  hoveredRow === user.id ? 'bg-primary-50' : 'hover:bg-surface-secondary'
                }`}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onUserClick(user)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={`${user.name}'s profile`}
                          className="w-10 h-10 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {user.isOnline && (
                        <div className="absolute w-3 h-3 bg-success border-2 border-surface rounded-full -mt-1 ml-7" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {highlightText(user.name, searchTerm)}
                      </p>
                      {user.title && (
                        <p className="text-xs text-text-secondary truncate">
                          {highlightText(user.title, searchTerm)}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-primary">
                      {highlightText(formatRole(user.role, user.isFormerIntern), searchTerm)}
                    </span>
                    {user.isFormerIntern && (
                      <span className="inline-flex items-center px-2 py-1 rounded-button text-xs font-medium bg-secondary-100 text-secondary-700">
                        Alumni
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-text-muted" />
                    <span className="text-sm text-text-secondary">
                      {highlightText(user.office, searchTerm)}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {highlightText(user.department, searchTerm)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.isOnline ? 'bg-success' : 'bg-text-muted'
                    }`} />
                    <span className={`text-xs font-medium ${
                      user.isOnline ? 'text-success' : 'text-text-muted'
                    }`}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUserClick(user);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Message user:', user.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <Icon name="MessageCircle" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
          <p className="text-text-secondary">
            Try adjusting your search criteria or filters to find more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default DirectoryTable;