/**
 * Admin Leads Management Page
 * View and manage customer inquiries/leads with DataTable
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import toast from 'react-hot-toast';
import { authOptions } from '../../api/auth/[...nextauth]';
import { Button } from '@/components/ui/Button';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { DataTable, DataTableColumn, DataTableAction } from '@/components/admin/DataTable/DataTable';
import { useConfirm } from '@/components/admin/ConfirmDialog';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  propertyId: string | null;
  source: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const router = useRouter();
  const confirm = useConfirm();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (lead: Lead, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      toast.success(`Status updated to ${newStatus}`);
      fetchLeads();
    } catch (err) {
      console.error('Error updating lead:', err);
      toast.error('Failed to update lead status');
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedLeads.length === 0) return;

    const confirmed = await confirm({
      title: 'Update Multiple Leads?',
      message: `Are you sure you want to update ${selectedLeads.length} lead${
        selectedLeads.length === 1 ? '' : 's'
      } to ${newStatus}?`,
      variant: 'info',
      confirmText: 'Update',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      await Promise.all(
        selectedLeads.map((lead) =>
          fetch(`/api/leads/${lead.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
          })
        )
      );

      toast.success(`${selectedLeads.length} lead${selectedLeads.length === 1 ? '' : 's'} updated`);
      setSelectedLeads([]);
      fetchLeads();
    } catch (err) {
      console.error('Error updating leads:', err);
      toast.error('Failed to update some leads');
    }
  };

  const handleDelete = async (lead: Lead) => {
    const confirmed = await confirm({
      title: 'Delete Lead?',
      message: `Are you sure you want to delete the lead from "${lead.name}"? This action cannot be undone.`,
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      toast.success('Lead deleted successfully');
      fetchLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
      toast.error('Failed to delete lead');
    }
  };

  const handleView = (lead: Lead) => {
    router.push(`/admin/leads/${lead.id}`);
  };

  const handleContact = (lead: Lead) => {
    // Open email client
    window.location.href = `mailto:${lead.email}?subject=Re: ${lead.subject || 'Your Inquiry'}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website':
        return '🌐';
      case 'phone':
        return '📞';
      case 'email':
        return '📧';
      case 'social':
        return '📱';
      default:
        return '📝';
    }
  };

  // DataTable Columns
  const columns: DataTableColumn<Lead>[] = [
    {
      key: 'name',
      label: 'Contact',
      sortable: true,
      render: (name, lead) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{lead.email}</div>
          <div className="text-xs text-gray-500">{lead.phone}</div>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (subject, lead) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{subject || '(No subject)'}</div>
          <div className="text-xs text-gray-500 line-clamp-2 max-w-xs">{lead.message}</div>
        </div>
      ),
    },
    {
      key: 'source',
      label: 'Source',
      sortable: true,
      render: (source) => (
        <div className="text-sm text-gray-600">
          {getSourceIcon(source)} <span className="capitalize">{source}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status, lead) => (
        <select
          value={status}
          onChange={(e) => {
            e.stopPropagation();
            handleStatusChange(lead, e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full cursor-pointer border-2 border-transparent hover:border-gray-300 transition-colors ${getStatusColor(
            status
          )}`}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (date) => (
        <div className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      ),
    },
  ];

  // DataTable Actions
  const actions: DataTableAction<Lead>[] = [
    {
      label: 'View',
      onClick: handleView,
      variant: 'primary',
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
    },
    {
      label: 'Email',
      onClick: handleContact,
      variant: 'secondary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
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
      key: 'status',
      label: 'Status',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      key: 'source',
      label: 'Source',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Phone', value: 'phone' },
        { label: 'Email', value: 'email' },
        { label: 'Social', value: 'social' },
      ],
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Customer Leads"
        subtitle="Manage inquiries from website contact forms"
        actions={
          <div className="flex items-center gap-3">
            {/* Bulk Status Update Dropdown (shown when leads are selected) */}
            {selectedLeads.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedLeads.length} selected:
                </span>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkStatusChange(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Update Status...</option>
                  <option value="contacted">Mark as Contacted</option>
                  <option value="qualified">Mark as Qualified</option>
                  <option value="converted">Mark as Converted</option>
                  <option value="lost">Mark as Lost</option>
                </select>
              </div>
            )}
          </div>
        }
      />

      <AdminPageContent>
        <DataTable
          data={leads}
          columns={columns}
          actions={actions}
          searchable
          searchKeys={['name', 'email', 'phone', 'subject', 'message']}
          filterable
          filters={filters}
          selectable
          onSelectionChange={setSelectedLeads}
          onRowClick={handleView}
          loading={isLoading}
          emptyMessage="No leads found. Leads will appear here when customers submit the contact form."
          pageSize={25}
          rowClassName={(lead) => (lead.status === 'new' ? 'bg-blue-50' : '')}
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
