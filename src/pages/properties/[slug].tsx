/**
 * Property Detail Page
 * Public-facing property profile with gallery and complete information
 */

import React from 'react';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { prisma } from '@/lib/prisma';
import { ImageGallery } from '@/components/property/ImageGallery';
import { PropertyHeader } from '@/components/property/PropertyHeader';
import { PropertyFeatures } from '@/components/property/PropertyFeatures';
import { PropertyContact } from '@/components/property/PropertyContact';

interface Property {
  id: string;
  slug: string;
  title: string;
  titleDE: string | null;
  titleTH: string | null;
  titleRU: string | null;
  titleFR: string | null;
  description: string;
  descriptionDE: string | null;
  descriptionTH: string | null;
  descriptionRU: string | null;
  descriptionFR: string | null;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number | null;
  propertyType: string;
  listingType: 'sale' | 'rent';
  status: string;
  images: string[];
  views: string[];
  privateFeatures: string[];
  roomsSpaces: string[];
  communalFacilities: string[];
  technicalEquipment: string[];
  security: string[];
  locationFeatures: string[];
  kitchenFeatures: string[];
  layoutFeatures: string[];
  furnishingStatus: string | null;
  maintenanceCharges: number | null;
  commonAreaFee: number | null;
  transferCosts: string | null;
  availableFrom: Date | null;
  specialRemarks: string | null;
  ownerName: string | null;
  ownerPhone: string | null;
  ownerEmail: string | null;
  ownerLine: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface PropertyDetailPageProps {
  property: Property;
}

export default function PropertyDetailPage({ property }: PropertyDetailPageProps) {
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{property.title} | Sauber Clean Real Estate</title>
        <meta name="description" content={property.description.substring(0, 160)} />

        {/* Open Graph */}
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description.substring(0, 160)} />
        <meta property="og:type" content="website" />
        {property.images[0] && <meta property="og:image" content={property.images[0]} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.title} />
        <meta name="twitter:description" content={property.description.substring(0, 160)} />
        {property.images[0] && <meta name="twitter:image" content={property.images[0]} />}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Gallery */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ImageGallery images={property.images} propertyTitle={property.title} />
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Header */}
              <PropertyHeader
                title={property.title}
                titleDE={property.titleDE}
                titleTH={property.titleTH}
                titleRU={property.titleRU}
                titleFR={property.titleFR}
                price={property.price}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                propertyType={property.propertyType}
                listingType={property.listingType}
                status={property.status}
              />

              {/* Property Features */}
              <PropertyFeatures
                description={property.description}
                descriptionDE={property.descriptionDE}
                descriptionTH={property.descriptionTH}
                descriptionRU={property.descriptionRU}
                descriptionFR={property.descriptionFR}
                views={property.views}
                privateFeatures={property.privateFeatures}
                roomsSpaces={property.roomsSpaces}
                communalFacilities={property.communalFacilities}
                technicalEquipment={property.technicalEquipment}
                security={property.security}
                locationFeatures={property.locationFeatures}
                kitchenFeatures={property.kitchenFeatures}
                layoutFeatures={property.layoutFeatures}
                furnishingStatus={property.furnishingStatus}
                floor={property.floor}
                maintenanceCharges={property.maintenanceCharges}
                commonAreaFee={property.commonAreaFee}
                transferCosts={property.transferCosts}
                availableFrom={property.availableFrom}
                specialRemarks={property.specialRemarks}
              />
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Map Section */}
                {property.latitude && property.longitude && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {/* Google Maps Embed */}
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${property.latitude},${property.longitude}&zoom=15`}
                        allowFullScreen
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{property.location}</p>
                  </div>
                )}

                {/* Quick Info Card */}
                <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property ID</h3>
                  <p className="text-sm text-gray-600 font-mono">{property.id}</p>

                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-sm text-gray-600 mb-2">Listed On:</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Property</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      📋 Copy Link
                    </button>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      📘
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(property.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                    >
                      🐦
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-8">
            <PropertyContact
              propertyId={property.id}
              propertyTitle={property.title}
              ownerName={property.ownerName}
              ownerPhone={property.ownerPhone}
              ownerEmail={property.ownerEmail}
              ownerLine={property.ownerLine}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const property = await prisma.property.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        titleDE: true,
        titleTH: true,
        titleRU: true,
        titleFR: true,
        description: true,
        descriptionDE: true,
        descriptionTH: true,
        descriptionRU: true,
        descriptionFR: true,
        price: true,
        location: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        floor: true,
        propertyType: true,
        listingType: true,
        status: true,
        images: true,
        views: true,
        privateFeatures: true,
        roomsSpaces: true,
        communalFacilities: true,
        technicalEquipment: true,
        security: true,
        locationFeatures: true,
        kitchenFeatures: true,
        layoutFeatures: true,
        furnishingStatus: true,
        maintenanceCharges: true,
        commonAreaFee: true,
        transferCosts: true,
        availableFrom: true,
        specialRemarks: true,
        ownerName: true,
        ownerPhone: true,
        ownerEmail: true,
        ownerLine: true,
        latitude: true,
        longitude: true,
      },
    });

    if (!property) {
      return {
        notFound: true,
      };
    }

    // Serialize dates
    const serializedProperty = {
      ...property,
      availableFrom: property.availableFrom ? property.availableFrom.toISOString() : null,
    };

    return {
      props: {
        property: serializedProperty,
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      },
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return {
      notFound: true,
    };
  }
};
