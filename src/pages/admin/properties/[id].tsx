/**
 * Admin Add/Edit Property Page
 * Enhanced form with tabs for all Google Sheets fields
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from '../../api/auth/[...nextauth]';
import { PropertyFormTabs } from '@/components/admin/PropertyFormTabs';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';

export default function AdminPropertyFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Extended Form Data with all Google Sheets fields
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    titleDE: '',
    titleTH: '',
    titleRU: '',
    titleFR: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floor: '',
    propertyType: 'condo',
    listingType: 'sale',
    status: 'active',

    // Owner Info
    ownerName: '',
    ownerLine: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerType: '',

    // Listing Details
    commission: '3',
    shortTermLet: false,
    quota: '',
    landSize: '',

    // Features (arrays)
    views: [] as string[],
    privateFeatures: [] as string[],
    roomsSpaces: [] as string[],
    communalFacilities: [] as string[],
    technicalEquipment: [] as string[],
    security: [] as string[],
    locationFeatures: [] as string[],

    // Kitchen & Layout
    furnishingStatus: '',
    kitchenFeatures: [] as string[],
    layoutFeatures: [] as string[],

    // Financial
    maintenanceCharges: '',
    commonAreaFee: '',
    transferCosts: '',

    // Availability
    availableFrom: '',
    specialRemarks: '',

    // Images & Description
    images: '',
    description: '',
    descriptionDE: '',
    descriptionTH: '',
    descriptionRU: '',
    descriptionFR: '',

    // Coordinates
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchProperty();
    }
  }, [id, isNew]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/properties/${id}`);

      if (!response.ok) {
        throw new Error('Failed to load property');
      }

      const property = await response.json();

      setFormData({
        // Basic Info
        title: property.title || '',
        titleDE: property.titleDE || '',
        titleTH: property.titleTH || '',
        titleRU: property.titleRU || '',
        titleFR: property.titleFR || '',
        price: property.price?.toString() || '',
        location: property.location || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        area: property.area?.toString() || '',
        floor: property.floor?.toString() || '',
        propertyType: property.propertyType || 'condo',
        listingType: property.listingType || 'sale',
        status: property.status || 'active',

        // Owner Info
        ownerName: property.ownerName || '',
        ownerLine: property.ownerLine || '',
        ownerPhone: property.ownerPhone || '',
        ownerEmail: property.ownerEmail || '',
        ownerType: property.ownerType || '',

        // Listing Details
        commission: property.commission?.toString() || '3',
        shortTermLet: property.shortTermLet || false,
        quota: property.quota || '',
        landSize: property.landSize || '',

        // Features
        views: property.views || [],
        privateFeatures: property.privateFeatures || [],
        roomsSpaces: property.roomsSpaces || [],
        communalFacilities: property.communalFacilities || [],
        technicalEquipment: property.technicalEquipment || [],
        security: property.security || [],
        locationFeatures: property.locationFeatures || [],

        // Kitchen & Layout
        furnishingStatus: property.furnishingStatus || '',
        kitchenFeatures: property.kitchenFeatures || [],
        layoutFeatures: property.layoutFeatures || [],

        // Financial
        maintenanceCharges: property.maintenanceCharges?.toString() || '',
        commonAreaFee: property.commonAreaFee?.toString() || '',
        transferCosts: property.transferCosts || '',

        // Availability
        availableFrom: property.availableFrom ? new Date(property.availableFrom).toISOString().split('T')[0] : '',
        specialRemarks: property.specialRemarks || '',

        // Images & Description
        images: property.images?.join(', ') || '',
        description: property.description || '',
        descriptionDE: property.descriptionDE || '',
        descriptionTH: property.descriptionTH || '',
        descriptionRU: property.descriptionRU || '',
        descriptionFR: property.descriptionFR || '',

        // Coordinates
        latitude: property.latitude?.toString() || '',
        longitude: property.longitude?.toString() || '',
      });

      setError('');
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('Failed to load property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const payload = {
        // Basic Info
        title: formData.title,
        titleDE: formData.titleDE || null,
        titleTH: formData.titleTH || null,
        titleRU: formData.titleRU || null,
        titleFR: formData.titleFR || null,
        description: formData.description,
        descriptionDE: formData.descriptionDE || null,
        descriptionTH: formData.descriptionTH || null,
        descriptionRU: formData.descriptionRU || null,
        descriptionFR: formData.descriptionFR || null,
        price: parseInt(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        floor: formData.floor ? parseInt(formData.floor) : null,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        status: formData.status,

        // Owner Info
        ownerName: formData.ownerName || null,
        ownerLine: formData.ownerLine || null,
        ownerPhone: formData.ownerPhone || null,
        ownerEmail: formData.ownerEmail || null,
        ownerType: formData.ownerType || null,

        // Listing Details
        commission: formData.commission ? parseFloat(formData.commission) : 3.0,
        shortTermLet: formData.shortTermLet,
        quota: formData.quota || null,
        landSize: formData.landSize || null,

        // Features (arrays)
        views: formData.views,
        privateFeatures: formData.privateFeatures,
        roomsSpaces: formData.roomsSpaces,
        communalFacilities: formData.communalFacilities,
        technicalEquipment: formData.technicalEquipment,
        security: formData.security,
        locationFeatures: formData.locationFeatures,

        // Kitchen & Layout
        furnishingStatus: formData.furnishingStatus || null,
        kitchenFeatures: formData.kitchenFeatures,
        layoutFeatures: formData.layoutFeatures,

        // Financial
        maintenanceCharges: formData.maintenanceCharges ? parseInt(formData.maintenanceCharges) : null,
        commonAreaFee: formData.commonAreaFee ? parseFloat(formData.commonAreaFee) : null,
        transferCosts: formData.transferCosts || null,

        // Availability
        availableFrom: formData.availableFrom ? new Date(formData.availableFrom).toISOString() : null,
        specialRemarks: formData.specialRemarks || null,

        // Images (split by comma)
        images: formData.images
          .split(',')
          .map(url => url.trim())
          .filter(url => url.length > 0),

        // Old features field (keep for compatibility)
        features: [
          ...formData.views,
          ...formData.privateFeatures,
          ...formData.roomsSpaces,
        ],

        // Coordinates
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,

        // Import tracking
        importSource: 'manual',
      };

      const url = isNew ? '/api/properties' : `/api/properties/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save property');
      }

      const savedProperty = await response.json();
      alert(`Property ${isNew ? 'created' : 'updated'} successfully!`);
      router.push('/admin/properties');
    } catch (err: any) {
      console.error('Error saving property:', err);
      setError(err.message || 'Failed to save property. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title={isNew ? 'Add New Property' : 'Edit Property'}
        subtitle={isNew ? 'Create a new property listing' : `Editing property ${id}`}
        actions={
          <Button
            variant="secondary"
            onClick={() => router.push('/admin/properties')}
          >
            ← Back to Properties
          </Button>
        }
      />

      <AdminPageContent maxWidth="full">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <PropertyFormTabs
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          isNew={isNew}
        />
      </AdminPageContent>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
};
