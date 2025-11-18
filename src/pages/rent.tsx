/**
 * Rent Page - Property listings for rent
 */

import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import type { Property } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface RentPageProps {
  properties: Property[];
  error?: string;
}

export default function RentPage({ properties, error }: RentPageProps) {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const locations = [
    { value: 'jomtien', label: 'Jomtien' },
    { value: 'naklua', label: 'Naklua' },
    { value: 'wongamat', label: 'Wongamat' },
    { value: 'central', label: 'Central Pattaya' },
    { value: 'east', label: 'East Pattaya' },
  ];

  const propertyTypes = [
    { value: 'condo', label: 'Condo' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
  ];

  const priceRanges = [
    { value: '0-10k', label: '0 - 10,000 THB/month' },
    { value: '10-20k', label: '10,000 - 20,000 THB/month' },
    { value: '20-50k', label: '20,000 - 50,000 THB/month' },
    { value: '50k+', label: '50,000+ THB/month' },
  ];

  const bedroomOptions = [
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4+', label: '4+ Bedrooms' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Rent Property in Pattaya</h1>
            <p className="text-lg opacity-90">
              Find your perfect rental home from our selection of properties for rent
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                options={locations}
                placeholder="Location"
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
              <Select
                options={bedroomOptions}
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                fullWidth
              />
            </div>
            {(location || propertyType || priceRange || bedrooms) && (
              <div className="mt-4 flex gap-2">
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => {
                    setLocation('');
                    setPropertyType('');
                    setPriceRange('');
                    setBedrooms('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-6 py-12">
          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error loading properties:</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <p className="text-text-secondary">
              Showing <span className="font-semibold text-text-primary">{properties.length}</span> properties
            </p>
            <Select
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'area', label: 'Area: Largest First' },
              ]}
              placeholder="Sort by"
              value=""
              onChange={() => {}}
            />
          </div>

          {/* Property Grid */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted py-12">
              No properties found. Try adjusting your filters.
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button variant="secondary" size="md" disabled>
              Previous
            </Button>
            <Button variant="primary" size="md">
              1
            </Button>
            <Button variant="secondary" size="md">
              2
            </Button>
            <Button variant="secondary" size="md">
              3
            </Button>
            <Button variant="secondary" size="md">
              Next
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Fetch properties for rent from API at request time
 */
export const getServerSideProps: GetServerSideProps<RentPageProps> = async (context) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/properties?listingType=rent`);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        properties: data.properties || [],
      },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        properties: [],
        error: 'Unable to load properties. Please try again later.',
      },
    };
  }
};
