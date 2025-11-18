/**
 * Header Component - Main navigation header for PW Pattaya
 *
 * Features:
 * - Desktop: Logo + Navigation links + Language switcher
 * - Mobile: Logo + Hamburger menu
 * - Gradient background (from website analysis)
 * - Responsive design (hidden nav on mobile)
 *
 * @example
 * <Header />
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from './Sidebar';

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="h-20 bg-gradient-to-r from-secondary to-secondary-light text-white border-b border-white/10 shadow-xl">
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          {/* Left: Hamburger (Mobile) + Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Hamburger Menu (Mobile only) */}
            <button
              data-testid="hamburger-menu"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">PW</span>
            </div>
            <span className="text-xl font-bold">PW PATTAYA</span>
          </Link>

          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="desktop-nav hidden lg:flex gap-4">
            <Link href="/buy" className="hover:text-primary-light transition-colors">
              Buy
            </Link>
            <Link href="/rent" className="hover:text-primary-light transition-colors">
              Rent
            </Link>
            <Link href="/projects" className="hover:text-primary-light transition-colors">
              Projects
            </Link>
            <Link href="/service" className="hover:text-primary-light transition-colors">
              Service
            </Link>
            <Link href="/about" className="hover:text-primary-light transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary-light transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right: Language Switcher */}
        <div className="flex items-center">
          <button
            data-testid="language-switcher"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2"
            aria-label="Switch language"
          >
            <span>🇺🇸 EN</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
