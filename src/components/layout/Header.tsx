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
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Sidebar } from './Sidebar';

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLang = languages.find(lang => lang.code === router.locale) || languages[0];

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setLangMenuOpen(false);
  };

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
              {t('nav.buy')}
            </Link>
            <Link href="/rent" className="hover:text-primary-light transition-colors">
              {t('nav.rent')}
            </Link>
            <Link href="/projects" className="hover:text-primary-light transition-colors">
              {t('nav.projects')}
            </Link>
            <Link href="/services" className="hover:text-primary-light transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/about" className="hover:text-primary-light transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="hover:text-primary-light transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>
        </div>

        {/* Right: Language Switcher */}
        <div className="flex items-center relative">
          <button
            data-testid="language-switcher"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2"
            aria-label="Switch language"
          >
            <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Language Dropdown */}
          {langMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                    lang.code === router.locale ? 'bg-primary/10 text-primary' : 'text-gray-700'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
