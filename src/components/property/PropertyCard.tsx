/**
 * PropertyCard Component - Property listing card
 *
 * Features:
 * - Property image with hover scale effect
 * - Price display
 * - Location with icon
 * - Property title
 * - Specs (Bedrooms, Bathrooms, Area, Floor)
 * - Badges (Promotion, Installment)
 * - Gallery icon
 * - Click to detail page
 *
 * @example
 * <PropertyCard property={propertyData} />
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor?: number | null;
  images: string[];
  badges?: ('promotion' | 'installment')[];
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(2)}M`;
    }
    return `฿${price.toLocaleString()}`;
  };

  return (
    <Link
      href={`/property/${property.id}`}
      data-testid="property-card"
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={property.images[0] || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        {property.badges && property.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.badges.includes('promotion') && (
              <span className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold">
                PROMOTION
              </span>
            )}
            {property.badges.includes('installment') && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold">
                INSTALLMENT
              </span>
            )}
          </div>
        )}

        {/* Gallery Icon */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          onClick={(e) => {
            e.preventDefault();
            console.log('Open gallery');
          }}
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p
          data-testid="property-price"
          className="text-2xl font-bold text-primary mb-2"
        >
          {formatPrice(property.price)}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-secondary mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold mb-3 line-clamp-2 min-h-[3rem] text-text-primary">
          {property.title}
        </h3>

        {/* Specs */}
        <div
          data-testid="property-specs"
          className="grid grid-cols-4 gap-2 text-xs text-text-muted"
        >
          <div className="flex flex-col items-center">
            <span className="mb-1">🛏️</span>
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1">🚿</span>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1">📐</span>
            <span>{property.area} m²</span>
          </div>
          {property.floor && (
            <div className="flex flex-col items-center">
              <span className="mb-1">🏢</span>
              <span>Floor {property.floor}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
