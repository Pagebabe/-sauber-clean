/**
 * Admin Settings Page
 * System configuration and preferences
 */

import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import toast from 'react-hot-toast';
import { authOptions } from '../api/auth/[...nextauth]';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Sauber Clean Real Estate',
    siteDescription: 'Premium Real Estate in Pattaya, Thailand',
    contactEmail: 'info@sauberclean.com',
    contactPhone: '+66 (0) 123 456 789',
    address: 'Pattaya, Thailand',
  });

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'Sauber Clean Real Estate | Properties in Pattaya',
    metaDescription: 'Find your dream property in Pattaya. Condos, villas, houses for sale and rent.',
    ogImage: '',
    googleAnalyticsId: '',
  });

  // Social Media Settings
  const [socialSettings, setSocialSettings] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      // In a real implementation, this would save to database
      // For now, just simulate a save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'email', label: 'Email', icon: '📧' },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        subtitle="Configure system preferences and integrations"
        actions={
          <Button
            variant="secondary"
            onClick={() => router.push('/admin/dashboard')}
          >
            ← Back to Dashboard
          </Button>
        }
      />

      <AdminPageContent>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Basic information about your website and business.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Optimize your website for search engines.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    maxLength={60}
                  />
                  <p className="mt-1 text-xs text-gray-500">{seoSettings.metaTitle.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs text-gray-500">{seoSettings.metaDescription.length}/160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Image URL
                  </label>
                  <input
                    type="url"
                    value={seoSettings.ogImage}
                    onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your social media profiles.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📘 Facebook URL
                  </label>
                  <input
                    type="url"
                    value={socialSettings.facebook}
                    onChange={(e) => setSocialSettings({ ...socialSettings, facebook: e.target.value })}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🐦 Twitter URL
                  </label>
                  <input
                    type="url"
                    value={socialSettings.twitter}
                    onChange={(e) => setSocialSettings({ ...socialSettings, twitter: e.target.value })}
                    placeholder="https://twitter.com/yourhandle"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📷 Instagram URL
                  </label>
                  <input
                    type="url"
                    value={socialSettings.instagram}
                    onChange={(e) => setSocialSettings({ ...socialSettings, instagram: e.target.value })}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💼 LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={socialSettings.linkedin}
                    onChange={(e) => setSocialSettings({ ...socialSettings, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/company/yourcompany"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ▶️ YouTube URL
                  </label>
                  <input
                    type="url"
                    value={socialSettings.youtube}
                    onChange={(e) => setSocialSettings({ ...socialSettings, youtube: e.target.value })}
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Configure email notifications and SMTP settings.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  📧 Email functionality will be implemented in a future update. Currently using default email settings.
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="secondary"
                onClick={() => router.push('/admin/dashboard')}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
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
