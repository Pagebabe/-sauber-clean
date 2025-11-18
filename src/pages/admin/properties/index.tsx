/**
 * Admin Properties Management Page
 * List, edit, and delete properties with DataTable
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { authOptions } from '../../api/auth/[...nextauth]';
import { Button } from '@/components/ui/Button';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { DataTable, DataTableColumn, DataTableAction } from '@/components/admin/DataTable/DataTable';
import { useConfirm } from '@/components/admin/ConfirmDialog';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  listingType: string;
  status: string;
  images?: string[];
  slug?: string;
}

export default function AdminPropertiesPage() {
  const router = useRouter();
  const confirm = useConfirm();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (property: Property) => {
    const confirmed = await confirm({
      title: 'Delete Property?',
      message: `Are you sure you want to delete "${property.title}"? This action cannot be undone.`,
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/properties/${property.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      toast.success('Property deleted successfully');
      fetchProperties();
    } catch (err) {
      console.error('Error deleting property:', err);
      toast.error('Failed to delete property');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) return;

    const confirmed = await confirm({
      title: 'Delete Multiple Properties?',
      message: `Are you sure you want to delete ${selectedProperties.length} propert${
        selectedProperties.length === 1 ? 'y' : 'ies'
      }? This action cannot be undone.`,
      variant: 'danger',
      confirmText: `Delete ${selectedProperties.length}`,
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      // Delete all selected properties
      await Promise.all(
        selectedProperties.map((property) =>
          fetch(`/api/properties/${property.id}`, { method: 'DELETE' })
        )
      );

      toast.success(`${selectedProperties.length} propert${selectedProperties.length === 1 ? 'y' : 'ies'} deleted`);
      setSelectedProperties([]);
      fetchProperties();
    } catch (err) {
      console.error('Error deleting properties:', err);
      toast.error('Failed to delete some properties');
    }
  };

  const handleEdit = (property: Property) => {
    router.push(`/admin/properties/${property.id}`);
  };

  const handleView = (property: Property) => {
    if (property.slug) {
      window.open(`/properties/${property.slug}`, '_blank');
    }
  };

  // DataTable Columns
  const columns: DataTableColumn<Property>[] = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: (_, property) => {
        const imageUrl = property.images?.[0] || '/images/placeholder-property.jpg';
        return (
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        );
      },
    },
    {
      key: 'title',
      label: 'Property',
      sortable: true,
      render: (title, property) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">{property.location}</div>
        </div>
      ),
    },
    {
      key: 'propertyType',
      label: 'Type',
      sortable: true,
      render: (type, property) => (
        <div className="text-sm text-gray-900">
          <div className="capitalize">{type}</div>
          <div className="text-xs text-gray-500 capitalize">{property.listingType}</div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      align: 'right',
      render: (price) => (
        <div className="text-sm font-semibold text-gray-900">
          ฿{price.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      render: (_, property) => (
        <div className="text-sm text-gray-600">
          {property.bedrooms} <span className="text-gray-400">BR</span> •{' '}
          {property.bathrooms} <span className="text-gray-400">BA</span> •{' '}
          {property.area.toLocaleString()} <span className="text-gray-400">m²</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => {
        const statusColors: Record<string, string> = {
          active: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          sold: 'bg-gray-100 text-gray-800',
          rented: 'bg-blue-100 text-blue-800',
          draft: 'bg-gray-100 text-gray-600',
        };
        return (
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  // DataTable Actions
  const actions: DataTableAction<Property>[] = [
    {
      label: 'Edit',
      onClick: handleEdit,
      variant: 'primary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      label: 'View',
      onClick: handleView,
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      hidden: (property) => !property.slug,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'danger',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
    },
  ];

  // Filters
  const filters = [
    {
      key: 'propertyType',
      label: 'Type',
      options: [
        { label: 'Condo', value: 'condo' },
        { label: 'Villa', value: 'villa' },
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Penthouse', value: 'penthouse' },
        { label: 'Townhouse', value: 'townhouse' },
      ],
    },
    {
      key: 'listingType',
      label: 'Listing Type',
      options: [
        { label: 'For Sale', value: 'sale' },
        { label: 'For Rent', value: 'rent' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Sold', value: 'sold' },
        { label: 'Rented', value: 'rented' },
        { label: 'Draft', value: 'draft' },
      ],
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Properties"
        subtitle="Manage your property listings"
        actions={
          <div className="flex items-center gap-3">
            {/* Bulk Delete Button (shown when properties are selected) */}
            {selectedProperties.length > 0 && (
              <Button variant="danger" onClick={handleBulkDelete}>
                🗑️ Delete {selectedProperties.length}
              </Button>
            )}
            <Button variant="secondary" onClick={() => router.push('/admin/properties/import')}>
              📥 Import from Sheets
            </Button>
            <Button variant="primary" onClick={() => router.push('/admin/properties/new')}>
              + Add Property
            </Button>
          </div>
        }
      />

      <AdminPageContent>
        <DataTable
          data={properties}
          columns={columns}
          actions={actions}
          searchable
          searchKeys={['title', 'location']}
          filterable
          filters={filters}
          selectable
          onSelectionChange={setSelectedProperties}
          onRowClick={handleEdit}
          loading={isLoading}
          emptyMessage="No properties found. Add your first property to get started."
          pageSize={25}
          rowClassName={(property) =>
            property.status === 'draft' ? 'bg-gray-50' : ''
          }
        />
      </AdminPageContent>
    </AdminLayout>
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
