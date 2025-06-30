import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  const SkeletonCard = () => (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1 mb-4 animate-pulse">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start space-x-3">
          {/* Profile Photo Skeleton */}
          <div className="w-10 h-10 bg-border rounded-full flex-shrink-0"></div>
          
          {/* Author Info Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <div className="h-4 bg-border rounded w-24"></div>
              <div className="h-3 bg-border rounded w-12"></div>
            </div>
            <div className="h-3 bg-border rounded w-32"></div>
          </div>
          
          {/* More Options Skeleton */}
          <div className="w-6 h-6 bg-border rounded"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        {/* Project Tags Skeleton */}
        <div className="flex space-x-2 mb-3">
          <div className="h-6 bg-border rounded-full w-20"></div>
          <div className="h-6 bg-border rounded-full w-24"></div>
        </div>

        {/* Content Text Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-border rounded w-full"></div>
          <div className="h-4 bg-border rounded w-4/5"></div>
          <div className="h-4 bg-border rounded w-3/5"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="h-5 bg-border rounded-full w-16"></div>
          <div className="h-5 bg-border rounded-full w-20"></div>
          <div className="h-5 bg-border rounded-full w-14"></div>
        </div>
      </div>

      {/* Engagement Bar Skeleton */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-border rounded w-12"></div>
          </div>
          <div className="h-4 bg-border rounded w-16"></div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="h-8 bg-border rounded w-12"></div>
            <div className="h-8 bg-border rounded w-12"></div>
            <div className="h-8 bg-border rounded w-12"></div>
          </div>
          <div className="h-8 bg-border rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;