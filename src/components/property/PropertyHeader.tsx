/**
 * Property Header Component
 * Displays property title, price, location, and quick facts
 */

import React from 'react';
import { useTranslation } from 'next-i18next';

interface PropertyHeaderProps {
  title: string;
  titleDE?: string | null;
  titleTH?: string | null;
  titleRU?: string | null;
  titleFR?: string | null;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  listingType: 'sale' | 'rent';
  status: string;
}

export function PropertyHeader({
  title,
  titleDE,
  titleTH,
  titleRU,
  titleFR,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  listingType,
  status,
}: PropertyHeaderProps) {
  const { t, i18n } = useTranslation('common');

  // Get translated title based on current language
  const getLocalizedTitle = () => {
    switch (i18n.language) {
      case 'de':
        return titleDE || title;
      case 'th':
        return titleTH || title;
      case 'ru':
        return titleRU || title;
      case 'fr':
        return titleFR || title;
      default:
        return title;
    }
  };

  // Format price with currency
  const formatPrice = () => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      {status && (
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status === 'active' && '✓ '}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            {propertyType} • {listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {getLocalizedTitle()}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-lg">{location}</span>
        </div>
      </div>

      {/* Price */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              {listingType === 'sale' ? 'Sale Price' : 'Rental Price'}
            </p>
            <p className="text-4xl font-bold text-primary">{formatPrice()}</p>
            {listingType === 'rent' && (
              <p className="text-sm text-gray-500 mt-1">per month</p>
            )}
          </div>

          {/* Quick Contact Button */}
          <a
            href="#contact"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Agent
          </a>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Bedrooms */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <p className="text-2xl font-bold text-gray-900">{bedrooms}</p>
          <p className="text-sm text-gray-600">Bedrooms</p>
        </div>

        {/* Bathrooms */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
          <p className="text-2xl font-bold text-gray-900">{bathrooms}</p>
          <p className="text-sm text-gray-600">Bathrooms</p>
        </div>

        {/* Area */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          <p className="text-2xl font-bold text-gray-900">{area}</p>
          <p className="text-sm text-gray-600">sqm</p>
        </div>

        {/* Property Type */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p className="text-2xl font-bold text-gray-900 capitalize">{propertyType}</p>
          <p className="text-sm text-gray-600">Type</p>
        </div>
      </div>
    </div>
  );
}
