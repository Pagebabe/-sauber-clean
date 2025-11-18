/**
 * Sidebar Component - Mobile navigation sidebar for PW Pattaya
 *
 * Features:
 * - Slide-in from left
 * - Overlay with blur
 * - Navigation links
 * - Language switcher buttons (5 languages)
 * - Close button + overlay click to close
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
 */

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        data-testid="sidebar-overlay"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        data-testid="sidebar"
        className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-slide-in"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PW</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary">PW PATTAYA</h2>
          </div>

          <button
            data-testid="sidebar-close"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <Link
            href="/buy"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            Buy
          </Link>
          <Link
            href="/rent"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            Rent
          </Link>
          <Link
            href="/projects"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            Projects
          </Link>
          <Link
            href="/services"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block py-3 px-4 text-text-primary hover:bg-gray-100 rounded-lg transition-colors border-b border-gray-100"
            onClick={onClose}
          >
            Contact
          </Link>
        </nav>

        {/* Language Switcher (Mobile) */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <p className="text-sm font-semibold text-text-muted mb-3">Language</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              data-lang="en"
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span>🇺🇸</span>
              <span className="text-sm font-medium">English</span>
            </button>
            <button
              data-lang="de"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>🇩🇪</span>
              <span className="text-sm font-medium">Deutsch</span>
            </button>
            <button
              data-lang="th"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>🇹🇭</span>
              <span className="text-sm font-medium">ไทย</span>
            </button>
            <button
              data-lang="ru"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>🇷🇺</span>
              <span className="text-sm font-medium">Русский</span>
            </button>
            <button
              data-lang="fr"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>🇫🇷</span>
              <span className="text-sm font-medium">Français</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
