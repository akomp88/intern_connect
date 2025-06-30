import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResourceLibrary = ({ userRole = 'applicant' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadingItems, setDownloadingItems] = useState(new Set());

  const resources = [
    {
      id: 1,
      title: 'Ambassador Welcome Kit',
      description: 'Complete guide to getting started as a campus ambassador, including program overview and expectations.',
      category: 'onboarding',
      type: 'pdf',
      size: '2.4 MB',
      downloadCount: 156,
      lastUpdated: '2024-01-15',
      tags: ['getting-started', 'overview', 'expectations'],
      requiredRole: 'approved'
    },
    {
      id: 2,
      title: 'Presentation Template - Program Overview',
      description: 'Professional slide deck template for presenting our internship program to students.',
      category: 'presentations',
      type: 'pptx',
      size: '8.7 MB',
      downloadCount: 89,
      lastUpdated: '2024-01-10',
      tags: ['presentation', 'template', 'overview'],
      requiredRole: 'approved'
    },
    {
      id: 3,
      title: 'Talking Points - Technical Roles',
      description: 'Key talking points and FAQs for discussing technical internship opportunities.',
      category: 'talking-points',
      type: 'pdf',
      size: '1.2 MB',
      downloadCount: 134,
      lastUpdated: '2024-01-08',
      tags: ['technical', 'faq', 'talking-points'],
      requiredRole: 'approved'
    },
    {
      id: 4,
      title: 'Event Planning Checklist',
      description: 'Step-by-step checklist for organizing campus recruitment events and information sessions.',
      category: 'events',
      type: 'pdf',
      size: '0.8 MB',
      downloadCount: 67,
      lastUpdated: '2024-01-05',
      tags: ['events', 'planning', 'checklist'],
      requiredRole: 'approved'
    },
    {
      id: 5,
      title: 'Brand Guidelines & Assets',
      description: 'Official brand guidelines, logos, and visual assets for ambassador materials.',
      category: 'branding',
      type: 'zip',
      size: '15.3 MB',
      downloadCount: 203,
      lastUpdated: '2023-12-20',
      tags: ['branding', 'logos', 'guidelines'],
      requiredRole: 'approved'
    },
    {
      id: 6,
      title: 'Application Guide',
      description: 'Helpful tips and best practices for completing your ambassador application.',
      category: 'onboarding',
      type: 'pdf',
      size: '1.5 MB',
      downloadCount: 445,
      lastUpdated: '2024-01-12',
      tags: ['application', 'tips', 'guide'],
      requiredRole: 'applicant'
    },
    {
      id: 7,
      title: 'Program FAQ',
      description: 'Frequently asked questions about the ambassador program and internship opportunities.',
      category: 'information',
      type: 'pdf',
      size: '0.9 MB',
      downloadCount: 312,
      lastUpdated: '2024-01-14',
      tags: ['faq', 'information', 'program'],
      requiredRole: 'applicant'
    },
    {
      id: 8,
      title: 'Social Media Templates',
      description: 'Ready-to-use social media post templates for promoting internship opportunities.',
      category: 'marketing',
      type: 'zip',
      size: '5.2 MB',
      downloadCount: 78,
      lastUpdated: '2024-01-03',
      tags: ['social-media', 'templates', 'marketing'],
      requiredRole: 'approved'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'presentations', label: 'Presentations' },
    { value: 'talking-points', label: 'Talking Points' },
    { value: 'events', label: 'Events' },
    { value: 'branding', label: 'Branding' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'information', label: 'Information' }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'pptx':
        return 'Presentation';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-error';
      case 'pptx':
        return 'text-warning';
      case 'zip':
        return 'text-secondary';
      default:
        return 'text-text-muted';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    const hasAccess = userRole === 'approved' || resource.requiredRole === 'applicant';
    
    return matchesSearch && matchesCategory && hasAccess;
  });

  const handleDownload = async (resourceId) => {
    setDownloadingItems(prev => new Set([...prev, resourceId]));
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(resourceId);
        return newSet;
      });
      
      // In a real app, this would trigger the actual download
      console.log(`Downloading resource ${resourceId}`);
    }, 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Resource Library
        </h2>
        <p className="text-text-secondary">
          {userRole === 'approved' ?'Access all ambassador resources, templates, and materials.' :'View available resources and guides for applicants.'
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No resources found</h3>
          <p className="text-text-secondary">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${getFileTypeColor(resource.type)}`}>
                  <Icon name={getFileIcon(resource.type)} size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary mb-1 line-clamp-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-100 text-primary text-xs font-medium rounded-button"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-xs text-text-muted">
                        +{resource.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                    <span>{resource.size}</span>
                    <span>{resource.downloadCount} downloads</span>
                    <span>Updated {formatDate(resource.lastUpdated)}</span>
                  </div>
                  
                  {/* Download Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleDownload(resource.id)}
                    loading={downloadingItems.has(resource.id)}
                    iconName="Download"
                    iconPosition="left"
                  >
                    {downloadingItems.has(resource.id) ? 'Downloading...' : 'Download'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Access Notice for Applicants */}
      {userRole !== 'approved' && (
        <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lock" size={20} className="text-accent mt-0.5" />
            <div>
              <h3 className="font-medium text-accent mb-1">
                Additional Resources Available
              </h3>
              <p className="text-sm text-text-secondary">
                More resources including presentation templates, brand assets, and detailed guides will be available once your application is approved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;