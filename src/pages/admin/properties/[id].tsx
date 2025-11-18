/**
 * Admin Add/Edit Property Page
 * Form for creating and updating properties
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from '../../api/auth/[...nextauth]';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminPropertyFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    titleDE: '',
    titleTH: '',
    titleRU: '',
    titleFR: '',
    description: '',
    descriptionDE: '',
    descriptionTH: '',
    descriptionRU: '',
    descriptionFR: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floor: '',
    propertyType: 'condo',
    listingType: 'sale',
    status: 'active',
    images: '',
    features: '',
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
        title: property.title || '',
        titleDE: property.titleDE || '',
        titleTH: property.titleTH || '',
        titleRU: property.titleRU || '',
        titleFR: property.titleFR || '',
        description: property.description || '',
        descriptionDE: property.descriptionDE || '',
        descriptionTH: property.descriptionTH || '',
        descriptionRU: property.descriptionRU || '',
        descriptionFR: property.descriptionFR || '',
        price: property.price?.toString() || '',
        location: property.location || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        area: property.area?.toString() || '',
        floor: property.floor?.toString() || '',
        propertyType: property.propertyType || 'condo',
        listingType: property.listingType || 'sale',
        status: property.status || 'active',
        images: property.images?.join(', ') || '',
        features: property.features?.join(', ') || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const payload = {
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
        price: formData.price,
        location: formData.location,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        floor: formData.floor || null,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        status: formData.status,
        images: formData.images.split(',').map((img) => img.trim()).filter(Boolean),
        features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
        latitude: formData.latitude || null,
        longitude: formData.longitude || null,
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
        throw new Error(`Failed to ${isNew ? 'create' : 'update'} property`);
      }

      // Redirect to properties list
      router.push('/admin/properties');
    } catch (err) {
      console.error('Error saving property:', err);
      setError(`Failed to ${isNew ? 'create' : 'update'} property`);
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-text-muted">Loading property...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PW</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">PW Pattaya Admin</h1>
                <p className="text-xs text-text-muted">
                  {isNew ? 'Add Property' : 'Edit Property'}
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="text" onClick={() => router.push('/admin/dashboard')}>
                Dashboard
              </Button>
              <Button variant="text" onClick={() => router.push('/admin/properties')}>
                Properties
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{session?.user?.name}</p>
                <p className="text-xs text-text-muted">{(session?.user as any)?.role}</p>
              </div>
              <Button variant="text" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {isNew ? 'Add New Property' : 'Edit Property'}
          </h2>
          <p className="text-text-muted">
            {isNew ? 'Create a new property listing' : 'Update property details'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Property Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h3>
            <div className="space-y-4">
              <Input
                label="Title (English)"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title (German)"
                  name="titleDE"
                  value={formData.titleDE}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Title (Thai)"
                  name="titleTH"
                  value={formData.titleTH}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title (Russian)"
                  name="titleRU"
                  value={formData.titleRU}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Title (French)"
                  name="titleFR"
                  value={formData.titleFR}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description (English) *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price (THB)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Area (m²)"
                name="area"
                type="number"
                step="0.01"
                value={formData.area}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Floor (optional)"
                name="floor"
                type="number"
                value={formData.floor}
                onChange={handleChange}
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="condo">Condo</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Listing Type *
                </label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold/Rented</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Information</h3>
            <div className="space-y-4">
              <Input
                label="Images (comma-separated URLs)"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                fullWidth
              />
              <Input
                label="Features (comma-separated)"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Pool, Gym, Parking, Security 24/7"
                fullWidth
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Latitude (optional)"
                  name="latitude"
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Longitude (optional)"
                  name="longitude"
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/properties')}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : isNew ? 'Create Property' : 'Update Property'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Redirect if not authenticated
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
      session,
    },
  };
};
