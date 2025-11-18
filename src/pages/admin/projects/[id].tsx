/**
 * Admin Add/Edit Project Page
 * Form for creating and updating development projects
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

export default function AdminProjectFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    nameDE: '',
    nameTH: '',
    nameRU: '',
    nameFR: '',
    description: '',
    descriptionDE: '',
    descriptionTH: '',
    descriptionRU: '',
    descriptionFR: '',
    location: '',
    developer: '',
    completion: '',
    units: '',
    priceFrom: '',
    images: '',
    amenities: '',
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchProject();
    }
  }, [id, isNew]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/${id}`);

      if (!response.ok) {
        throw new Error('Failed to load project');
      }

      const project = await response.json();

      setFormData({
        name: project.name || '',
        nameDE: project.nameDE || '',
        nameTH: project.nameTH || '',
        nameRU: project.nameRU || '',
        nameFR: project.nameFR || '',
        description: project.description || '',
        descriptionDE: project.descriptionDE || '',
        descriptionTH: project.descriptionTH || '',
        descriptionRU: project.descriptionRU || '',
        descriptionFR: project.descriptionFR || '',
        location: project.location || '',
        developer: project.developer || '',
        completion: project.completion || '',
        units: project.units?.toString() || '',
        priceFrom: project.priceFrom?.toString() || '',
        images: project.images?.join(', ') || '',
        amenities: project.amenities?.join(', ') || '',
      });

      setError('');
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        nameDE: formData.nameDE || null,
        nameTH: formData.nameTH || null,
        nameRU: formData.nameRU || null,
        nameFR: formData.nameFR || null,
        description: formData.description,
        descriptionDE: formData.descriptionDE || null,
        descriptionTH: formData.descriptionTH || null,
        descriptionRU: formData.descriptionRU || null,
        descriptionFR: formData.descriptionFR || null,
        location: formData.location,
        developer: formData.developer,
        completion: formData.completion,
        units: formData.units,
        priceFrom: formData.priceFrom,
        images: formData.images.split(',').map((img) => img.trim()).filter(Boolean),
        amenities: formData.amenities.split(',').map((a) => a.trim()).filter(Boolean),
      };

      const url = isNew ? '/api/projects' : `/api/projects/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? 'create' : 'update'} project`);
      }

      // Redirect to projects list
      router.push('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      setError(`Failed to ${isNew ? 'create' : 'update'} project`);
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-text-muted">Loading project...</p>
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
                  {isNew ? 'Add Project' : 'Edit Project'}
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="text" onClick={() => router.push('/admin/dashboard')}>
                Dashboard
              </Button>
              <Button variant="text" onClick={() => router.push('/admin/projects')}>
                Projects
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
            {isNew ? 'Add New Project' : 'Edit Project'}
          </h2>
          <p className="text-text-muted">
            {isNew ? 'Create a new development project' : 'Update project details'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Project Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h3>
            <div className="space-y-4">
              <Input
                label="Project Name (English)"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name (German)"
                  name="nameDE"
                  value={formData.nameDE}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Name (Thai)"
                  name="nameTH"
                  value={formData.nameTH}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name (Russian)"
                  name="nameRU"
                  value={formData.nameRU}
                  onChange={handleChange}
                  fullWidth
                />
                <Input
                  label="Name (French)"
                  name="nameFR"
                  value={formData.nameFR}
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

          {/* Project Details */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Developer"
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Completion Date"
                name="completion"
                value={formData.completion}
                onChange={handleChange}
                placeholder="2025 Q2"
                required
                fullWidth
              />
              <Input
                label="Total Units"
                name="units"
                type="number"
                value={formData.units}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Price From (THB)"
                name="priceFrom"
                type="number"
                value={formData.priceFrom}
                onChange={handleChange}
                required
                fullWidth
              />
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
                label="Amenities (comma-separated)"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Infinity Pool, Gym, Sky Lounge, Beach Access"
                fullWidth
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/projects')}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : isNew ? 'Create Project' : 'Update Project'}
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
