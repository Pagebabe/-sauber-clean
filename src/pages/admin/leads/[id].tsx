/**
 * Admin Lead Detail Page
 * View full details of a customer lead/inquiry
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authOptions } from '../../api/auth/[...nextauth]';
import { Button } from '@/components/ui/Button';

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
  updatedAt: string;
}

export default function AdminLeadDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/leads/${id}`);

      if (!response.ok) {
        throw new Error('Failed to load lead');
      }

      const data = await response.json();
      setLead(data);
      setError('');
    } catch (err) {
      console.error('Error fetching lead:', err);
      setError('Failed to load lead');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      // Refresh lead data
      fetchLead();
    } catch (err) {
      console.error('Error updating lead:', err);
      alert('Failed to update lead status');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'qualified':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'converted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'lost':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-text-muted">Loading lead details...</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Lead not found'}</p>
          <Button onClick={() => router.push('/admin/leads')}>Back to Leads</Button>
        </div>
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
                <p className="text-xs text-text-muted">Lead Details</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="text" onClick={() => router.push('/admin/dashboard')}>
                Dashboard
              </Button>
              <Button variant="text" onClick={() => router.push('/admin/leads')}>
                Leads
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Lead from {lead.name}</h2>
            <p className="text-text-muted">
              Received on {new Date(lead.createdAt).toLocaleDateString()} via {lead.source}
            </p>
          </div>
          <Button variant="secondary" onClick={() => router.push('/admin/leads')}>
            Back to Leads
          </Button>
        </div>

        {/* Lead Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Status Section */}
          <div>
            <h3 className="text-sm font-medium text-text-muted mb-3">Lead Status</h3>
            <div className="flex gap-2">
              {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={isSaving || lead.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    lead.status === status
                      ? getStatusColor(status)
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-text-muted mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-text-muted w-24 text-sm">Name:</span>
                <span className="text-text-primary font-medium">{lead.name}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-muted w-24 text-sm">Email:</span>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline"
                >
                  {lead.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-muted w-24 text-sm">Phone:</span>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-primary hover:underline"
                >
                  {lead.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-muted w-24 text-sm">Source:</span>
                <span className="text-text-primary">{lead.source}</span>
              </div>
            </div>
          </div>

          {/* Subject */}
          {lead.subject && (
            <div>
              <h3 className="text-sm font-medium text-text-muted mb-3">Subject</h3>
              <p className="text-text-primary">{lead.subject}</p>
            </div>
          )}

          {/* Message */}
          <div>
            <h3 className="text-sm font-medium text-text-muted mb-3">Message</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-text-primary whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>

          {/* Property Reference */}
          {lead.propertyId && (
            <div>
              <h3 className="text-sm font-medium text-text-muted mb-3">Related Property</h3>
              <p className="text-text-primary">
                Property ID: {lead.propertyId}
                <a
                  href={`/admin/properties/${lead.propertyId}`}
                  className="ml-2 text-primary hover:underline text-sm"
                >
                  View Property
                </a>
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Created:</span>
                <span className="ml-2 text-text-primary">
                  {new Date(lead.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-text-muted">Last Updated:</span>
                <span className="ml-2 text-text-primary">
                  {new Date(lead.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Quick Actions</h3>
          <div className="flex gap-3">
            <a
              href={`mailto:${lead.email}?subject=Re: ${lead.subject || 'Your inquiry'}`}
              className="px-4 py-2 bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Send Email
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="px-4 py-2 bg-white text-blue-900 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              Call Customer
            </a>
          </div>
        </div>
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
