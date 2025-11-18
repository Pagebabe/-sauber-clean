/**
 * Recent Activity Component
 * Displays timeline of recent actions in the admin panel
 */

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export interface Activity {
  id: string;
  type: 'property' | 'project' | 'lead' | 'user';
  action: 'created' | 'updated' | 'deleted' | 'contacted';
  title: string;
  description?: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
  maxItems?: number;
}

const getActivityIcon = (type: Activity['type'], action: Activity['action']) => {
  if (action === 'created') {
    return (
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    );
  }

  if (action === 'updated') {
    return (
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
    );
  }

  if (action === 'deleted') {
    return (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    );
  }

  if (action === 'contacted') {
    return (
      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  // Default icon based on type
  switch (type) {
    case 'property':
      return (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm">🏠</span>
        </div>
      );
    case 'project':
      return (
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-sm">🏗️</span>
        </div>
      );
    case 'lead':
      return (
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-sm">👥</span>
        </div>
      );
    case 'user':
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-sm">📝</span>
        </div>
      );
  }
};

const getActionText = (action: Activity['action']) => {
  switch (action) {
    case 'created':
      return 'created';
    case 'updated':
      return 'updated';
    case 'deleted':
      return 'deleted';
    case 'contacted':
      return 'contacted';
    default:
      return 'modified';
  }
};

export function RecentActivity({
  activities,
  loading = false,
  maxItems = 10,
}: RecentActivityProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-sm">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        {activities.length > maxItems && (
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 group">
            {/* Icon */}
            <div className="flex-shrink-0 relative">
              {getActivityIcon(activity.type, activity.action)}
              {index < displayActivities.length - 1 && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.title}</span>{' '}
                    <span className="text-gray-500">{getActionText(activity.action)}</span>
                  </p>
                  {activity.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  )}
                  {activity.user && (
                    <p className="text-xs text-gray-400 mt-1">by {activity.user.name}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
