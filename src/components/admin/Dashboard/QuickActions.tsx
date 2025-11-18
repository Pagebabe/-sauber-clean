/**
 * Quick Actions Component
 * Provides one-click access to common admin tasks
 */

import React from 'react';
import { useRouter } from 'next/router';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
  {
    id: 'add-property',
    title: 'Add Property',
    description: 'List a new property for sale or rent',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    href: '/admin/properties/new',
    color: 'blue',
  },
  {
    id: 'add-project',
    title: 'Add Project',
    description: 'Create a new development project',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    href: '/admin/projects/new',
    color: 'purple',
  },
  {
    id: 'import-properties',
    title: 'Import Properties',
    description: 'Upload from Google Sheets CSV',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    href: '/admin/properties/import',
    color: 'green',
  },
  {
    id: 'view-leads',
    title: 'View New Leads',
    description: 'Check latest inquiries',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    href: '/admin/leads?filter=new',
    color: 'orange',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 hover:bg-blue-100',
    border: 'border-blue-200 hover:border-blue-300',
    icon: 'text-blue-600',
    title: 'text-blue-900',
  },
  green: {
    bg: 'bg-green-50 hover:bg-green-100',
    border: 'border-green-200 hover:border-green-300',
    icon: 'text-green-600',
    title: 'text-green-900',
  },
  purple: {
    bg: 'bg-purple-50 hover:bg-purple-100',
    border: 'border-purple-200 hover:border-purple-300',
    icon: 'text-purple-600',
    title: 'text-purple-900',
  },
  orange: {
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200 hover:border-orange-300',
    icon: 'text-orange-600',
    title: 'text-orange-900',
  },
};

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  const router = useRouter();

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const colors = colorClasses[action.color || 'blue'];

          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${colors.bg} ${colors.border}
                group relative overflow-hidden
              `}
            >
              {/* Icon */}
              <div className={`${colors.icon} mb-3 transition-transform group-hover:scale-110`}>
                {action.icon}
              </div>

              {/* Title */}
              <h4 className={`font-semibold text-sm mb-1 ${colors.title}`}>
                {action.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-gray-600">{action.description}</p>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
