/**
 * Modern Admin Dashboard
 * Live stats, charts, recent activity, and quick actions
 */

import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { authOptions } from '../api/auth/[...nextauth]';
import { AdminLayout, AdminPageHeader, AdminPageContent } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/Dashboard/StatsCard';
import { ChartWidget } from '@/components/admin/Dashboard/ChartWidget';
import { RecentActivity, type Activity } from '@/components/admin/Dashboard/RecentActivity';
import { QuickActions } from '@/components/admin/Dashboard/QuickActions';
import { CommandPalette } from '@/components/admin/CommandPalette';
import { prisma } from '@/lib/prisma';

interface DashboardStats {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
  totalProjects: number;
  newLeads: number;
  totalLeads: number;
  totalUsers: number;
}

interface DashboardProps {
  stats: DashboardStats;
  propertiesByMonth: Array<{ name: string; properties: number }>;
  propertiesByType: Array<{ name: string; value: number }>;
}

export default function AdminDashboard({ stats, propertiesByMonth, propertiesByType }: DashboardProps) {
  const { t } = useTranslation('common');
  const { data: session } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);

  // Mock activities - In production, fetch from database
  useEffect(() => {
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'property',
        action: 'created',
        title: 'Beach Condo',
        description: 'New property listing in Pattaya Beach',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
        user: { name: session?.user?.name || 'Admin' },
      },
      {
        id: '2',
        type: 'lead',
        action: 'contacted',
        title: 'John Doe',
        description: 'Interested in Sea View Villa',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        user: { name: session?.user?.name || 'Admin' },
      },
      {
        id: '3',
        type: 'project',
        action: 'updated',
        title: 'Luxury Villa Complex',
        description: 'Updated completion date',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        user: { name: session?.user?.name || 'Admin' },
      },
    ];
    setActivities(mockActivities);
  }, [session]);

  return (
    <>
      <CommandPalette />
      <AdminLayout>
        <AdminPageHeader
          title={`Welcome back, ${session?.user?.name}!`}
          subtitle="Here's what's happening with your properties today"
          actions={
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                📄 Export Report
              </button>
              <button className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                + Add Property
              </button>
            </div>
          }
        />

        <AdminPageContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Properties"
              value={stats.totalProperties}
              subtitle={`${stats.propertiesForSale} for sale, ${stats.propertiesForRent} for rent`}
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              }
              iconBgColor="bg-blue-100"
              trend={{
                value: 12,
                label: 'vs last month',
                isPositive: true,
              }}
            />

            <StatsCard
              title="Active Projects"
              value={stats.totalProjects}
              subtitle="Development projects"
              icon={
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              iconBgColor="bg-purple-100"
            />

            <StatsCard
              title="Total Leads"
              value={stats.totalLeads}
              subtitle={`${stats.newLeads} new this week`}
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              iconBgColor="bg-orange-100"
              trend={{
                value: 8,
                label: 'vs last week',
                isPositive: true,
              }}
            />

            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              subtitle="Admin users"
              icon={
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              iconBgColor="bg-green-100"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartWidget
              title="Properties Added (Last 6 Months)"
              type="area"
              data={propertiesByMonth}
              dataKeys={{ x: 'name', y: 'properties' }}
              colors={['#3B82F6']}
              height={300}
            />

            <ChartWidget
              title="Properties by Type"
              type="donut"
              data={propertiesByType}
              dataKeys={{ name: 'name', value: 'value' }}
              colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444']}
              height={300}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <RecentActivity activities={activities} maxItems={5} />
          </div>

          {/* Help Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Press <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Cmd+K</kbd> to open the command
                  palette and quickly navigate anywhere.
                </p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  View Documentation
                </button>
              </div>
              <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </AdminPageContent>
      </AdminLayout>
    </>
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

  // Fetch live statistics from database
  const [
    totalProperties,
    propertiesForSale,
    propertiesForRent,
    totalProjects,
    totalLeads,
    newLeads,
    totalUsers,
    recentProperties,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { listingType: 'sale' } }),
    prisma.property.count({ where: { listingType: 'rent' } }),
    prisma.project.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.user.count(),
    prisma.property.groupBy({
      by: ['createdAt'],
      _count: true,
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ]);

  // Aggregate properties by type
  const propertiesByTypeRaw = await prisma.property.groupBy({
    by: ['propertyType'],
    _count: true,
  });

  const propertiesByType = propertiesByTypeRaw.map((item) => ({
    name: item.propertyType.charAt(0).toUpperCase() + item.propertyType.slice(1),
    value: item._count,
  }));

  // Mock monthly data (in production, calculate from createdAt)
  const propertiesByMonth = [
    { name: 'Jun', properties: 4 },
    { name: 'Jul', properties: 7 },
    { name: 'Aug', properties: 5 },
    { name: 'Sep', properties: 8 },
    { name: 'Oct', properties: 12 },
    { name: 'Nov', properties: totalProperties },
  ];

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      session: session ? JSON.parse(JSON.stringify(session)) : null,
      stats: {
        totalProperties,
        propertiesForSale,
        propertiesForRent,
        totalProjects,
        totalLeads,
        newLeads,
        totalUsers,
      },
      propertiesByMonth,
      propertiesByType,
    },
  };
};
