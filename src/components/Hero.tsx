/**
 * Hero Component - Homepage hero section with search form
 *
 * Features:
 * - Background image/gradient
 * - Main headline
 * - Subheadline
 * - Integrated search form (Location, Type, Price)
 * - CTA button
 *
 * @example
 * <Hero />
 */

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

export function Hero() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const propertyTypes = [
    { value: 'condo', label: 'Condo' },
    { value: 'house', label: 'House' },
    { value: 'land', label: 'Land' },
    { value: 'hotel', label: 'Hotel' },
  ];

  const priceRanges = [
    { value: '0-2m', label: '0 - 2M THB' },
    { value: '2-5m', label: '2 - 5M THB' },
    { value: '5-10m', label: '5 - 10M THB' },
    { value: '10m+', label: '10M+ THB' },
  ];

  const handleSearch = () => {
    console.log('Search:', { location, propertyType, priceRange });
    // Navigate to search results
  };

  return (
    <div
      className="relative min-h-[600px] flex items-center justify-center text-white"
      style={{
        background: 'linear-gradient(135deg, rgb(61, 90, 108) 0%, rgb(77, 116, 138) 50%, rgb(61, 90, 108) 100%)',
      }}
    >
      <div className="container mx-auto px-6 py-32 text-center">
        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          PW Pattaya Global Real Estate Co.,Ltd
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 opacity-90">
          Search for condo for lease, for long, rental or investment
        </p>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              type="text"
              placeholder="Location (e.g., Jomtien)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
            <Select
              options={propertyTypes}
              placeholder="Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              fullWidth
            />
            <Select
              options={priceRanges}
              placeholder="Price Range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              fullWidth
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleSearch}
            fullWidth
          >
            Search Properties
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-80">Properties Sold</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-80">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-sm opacity-80">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-80">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}
