/**
 * Command Palette Component
 * Global search and navigation (Cmd+K / Ctrl+K)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/router';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      label: 'Dashboard',
      description: 'Go to dashboard',
      icon: '📊',
      action: () => router.push('/admin/dashboard'),
      keywords: ['home', 'overview'],
    },
    {
      id: 'nav-properties',
      label: 'Properties',
      description: 'Manage properties',
      icon: '🏠',
      action: () => router.push('/admin/properties'),
      keywords: ['listings', 'real estate'],
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      description: 'Manage projects',
      icon: '🏗️',
      action: () => router.push('/admin/projects'),
      keywords: ['developments'],
    },
    {
      id: 'nav-leads',
      label: 'Leads',
      description: 'Manage leads',
      icon: '👥',
      action: () => router.push('/admin/leads'),
      keywords: ['inquiries', 'contacts', 'customers'],
    },
    {
      id: 'nav-settings',
      label: 'Settings',
      description: 'App settings',
      icon: '⚙️',
      action: () => router.push('/admin/settings'),
      keywords: ['preferences', 'config'],
    },

    // Actions
    {
      id: 'action-add-property',
      label: 'Add Property',
      description: 'Create new property listing',
      icon: '➕',
      action: () => router.push('/admin/properties/new'),
      keywords: ['create', 'new', 'listing'],
    },
    {
      id: 'action-import',
      label: 'Import Properties',
      description: 'Upload from Google Sheets',
      icon: '📥',
      action: () => router.push('/admin/properties/import'),
      keywords: ['upload', 'csv', 'excel', 'sheets'],
    },
    {
      id: 'action-add-project',
      label: 'Add Project',
      description: 'Create new development project',
      icon: '🏗️',
      action: () => router.push('/admin/projects/new'),
      keywords: ['create', 'new', 'development'],
    },
  ];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-0 left-0 right-0 bottom-0 z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />

      {/* Command Palette */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Search Input */}
          <Command.Input
            placeholder="Type a command or search..."
            className="w-full px-6 py-4 text-base border-b border-gray-200 outline-none"
          />

          {/* Results */}
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            {/* Navigation Section */}
            <Command.Group
              heading="Navigation"
              className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase"
            >
              {commands
                .filter((cmd) => cmd.id.startsWith('nav-'))
                .map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    onSelect={() => {
                      cmd.action();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900"
                  >
                    <span className="text-xl">{cmd.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{cmd.label}</div>
                      {cmd.description && (
                        <div className="text-xs text-gray-500">{cmd.description}</div>
                      )}
                    </div>
                    <kbd className="hidden md:inline-block px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200">
                      →
                    </kbd>
                  </Command.Item>
                ))}
            </Command.Group>

            {/* Actions Section */}
            <Command.Group
              heading="Actions"
              className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase mt-2"
            >
              {commands
                .filter((cmd) => cmd.id.startsWith('action-'))
                .map((cmd) => (
                  <Command.Item
                    key={cmd.id}
                    onSelect={() => {
                      cmd.action();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900"
                  >
                    <span className="text-xl">{cmd.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{cmd.label}</div>
                      {cmd.description && (
                        <div className="text-xs text-gray-500">{cmd.description}</div>
                      )}
                    </div>
                  </Command.Item>
                ))}
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}
