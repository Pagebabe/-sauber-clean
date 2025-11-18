/**
 * Buy Page - Property listings for sale
 */

import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import type { Property } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface BuyPageProps {
  properties: Property[];
  error?: string;
}

export default function BuyPage({ properties, error }: BuyPageProps) {
  const { t } = useTranslation('common');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const locations = [
    { value: 'jomtien', label: t('buy.locations.jomtien') },
    { value: 'naklua', label: t('buy.locations.naklua') },
    { value: 'wongamat', label: t('buy.locations.wongamat') },
    { value: 'central', label: t('buy.locations.central') },
    { value: 'east', label: t('buy.locations.east') },
  ];

  const propertyTypes = [
    { value: 'condo', label: t('buy.propertyTypes.condo') },
    { value: 'house', label: t('buy.propertyTypes.house') },
    { value: 'land', label: t('buy.propertyTypes.land') },
    { value: 'villa', label: t('buy.propertyTypes.villa') },
  ];

  const priceRanges = [
    { value: '0-2m', label: t('buy.priceRanges.range1') },
    { value: '2-5m', label: t('buy.priceRanges.range2') },
    { value: '5-10m', label: t('buy.priceRanges.range3') },
    { value: '10m+', label: t('buy.priceRanges.range4') },
  ];

  const bedroomOptions = [
    { value: '1', label: t('buy.bedroomOptions.1') },
    { value: '2', label: t('buy.bedroomOptions.2') },
    { value: '3', label: t('buy.bedroomOptions.3') },
    { value: '4+', label: t('buy.bedroomOptions.4plus') },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('buy.pageTitle')}</h1>
            <p className="text-lg opacity-90">
              {t('buy.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                options={locations}
                placeholder={t('buy.filterLocation')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
              <Select
                options={propertyTypes}
                placeholder={t('buy.filterPropertyType')}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                fullWidth
              />
              <Select
                options={priceRanges}
                placeholder={t('buy.filterPriceRange')}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                fullWidth
              />
              <Select
                options={bedroomOptions}
                placeholder={t('buy.filterBedrooms')}
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
                  {t('common.clearFilters')}
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
              <p className="font-bold">{t('home.errorLoading')}</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <p className="text-text-secondary">
              {t('buy.showing')} <span className="font-semibold text-text-primary">{properties.length}</span> {t('buy.properties')}
            </p>
            <Select
              options={[
                { value: 'newest', label: t('buy.sortNewest') },
                { value: 'price-low', label: t('buy.sortPriceLow') },
                { value: 'price-high', label: t('buy.sortPriceHigh') },
                { value: 'area', label: t('buy.sortArea') },
              ]}
              placeholder={t('common.sortBy')}
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
              {t('buy.noPropertiesFound')}
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button variant="secondary" size="md" disabled>
              {t('common.previous')}
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
              {t('common.next')}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Fetch properties for sale from API at request time
 */
export const getServerSideProps: GetServerSideProps<BuyPageProps> = async (context) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/properties?listingType=sale`);

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
