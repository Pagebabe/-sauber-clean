/**
 * Admin Layout with Navigation Sidebar
 * Provides consistent navigation across all admin pages
 */

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const navItems: NavItem[] = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/properties', label: 'Properties', icon: '🏠' },
    { href: '/admin/properties/import', label: 'Import Properties', icon: '📥' },
    { href: '/admin/templates', label: 'Templates', icon: '📋' },
    { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
    { href: '/admin/leads', label: 'Leads', icon: '👥' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Sauber Clean</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {(session?.user as any)?.role || 'Admin'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

/**
 * Admin Page Header Component
 * Consistent header for all admin pages
 */
interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ title, subtitle, actions }: AdminPageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Admin Page Content Component
 * Consistent content wrapper for all admin pages
 */
interface AdminPageContentProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

export function AdminPageContent({ children, maxWidth = '7xl' }: AdminPageContentProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }[maxWidth];

  return (
    <div className={`${maxWidthClass} mx-auto px-6 py-8`}>
      {children}
    </div>
  );
}
