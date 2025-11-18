/**
 * Admin Dashboard
 * Main dashboard for authenticated admins
 */

import React from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { authOptions } from '../api/auth/[...nextauth]';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const { t } = useTranslation('common');
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <AdminPageHeader
        title={`${t('admin.welcomeBack')}, ${session?.user?.name}!`}
        subtitle={t('admin.dashboardDescription')}
      />

      <AdminPageContent>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Properties Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-muted text-sm font-medium">{t('admin.totalProperties')}</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">9</p>
            <p className="text-xs text-green-600 mt-2">6 {t('admin.forSale')}, 3 {t('admin.forRent')}</p>
          </div>

          {/* Projects Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-muted text-sm font-medium">{t('admin.activeProjects')}</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">3</p>
            <p className="text-xs text-purple-600 mt-2">{t('admin.developmentProjects')}</p>
          </div>

          {/* Leads Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-muted text-sm font-medium">{t('admin.newLeads')}</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">0</p>
            <p className="text-xs text-text-muted mt-2">{t('admin.noNewLeads')}</p>
          </div>

          {/* Users Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-muted text-sm font-medium">{t('admin.totalUsers')}</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary">1</p>
            <p className="text-xs text-text-muted mt-2">1 {t('admin.adminUser')}</p>
          </div>
        </div>

        {/* {t('admin.quickActions')} */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-text-primary mb-4">{t('admin.quickActions')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/properties"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left block"
            >
              <h4 className="font-semibold text-text-primary mb-1">{t('admin.manageProperties')}</h4>
              <p className="text-sm text-text-muted">{t('admin.managePropertiesDescription')}</p>
            </a>
            <a
              href="/admin/projects"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left block"
            >
              <h4 className="font-semibold text-text-primary mb-1">{t('admin.manageProjects')}</h4>
              <p className="text-sm text-text-muted">{t('admin.manageProjectsDescription')}</p>
            </a>
            <a
              href="/admin/leads"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left block"
            >
              <h4 className="font-semibold text-text-primary mb-1">{t('admin.manageLeads')}</h4>
              <p className="text-sm text-text-muted">{t('admin.manageLeadsDescription')}</p>
            </a>
          </div>
        </div>

        {/* Status Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-1">{t('admin.phaseComplete')}</h4>
              <p className="text-sm text-green-700">
                All admin features are now live: Property CRUD, Project CRUD, and Lead Management.
                The admin panel is production-ready!
              </p>
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
