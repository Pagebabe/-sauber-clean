/**
 * Admin Projects Management Page
 * List, edit, and delete development projects with DataTable
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

interface Project {
  id: string;
  name: string;
  location: string;
  developer: string;
  completion: string;
  units: number;
  priceFrom: number;
  images?: string[];
  slug?: string;
  status?: string;
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const confirm = useConfirm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (project: Project) => {
    const confirmed = await confirm({
      title: 'Delete Project?',
      message: `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('Failed to delete project');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.length === 0) return;

    const confirmed = await confirm({
      title: 'Delete Multiple Projects?',
      message: `Are you sure you want to delete ${selectedProjects.length} project${
        selectedProjects.length === 1 ? '' : 's'
      }? This action cannot be undone.`,
      variant: 'danger',
      confirmText: `Delete ${selectedProjects.length}`,
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      await Promise.all(
        selectedProjects.map((project) =>
          fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
        )
      );

      toast.success(`${selectedProjects.length} project${selectedProjects.length === 1 ? '' : 's'} deleted`);
      setSelectedProjects([]);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting projects:', err);
      toast.error('Failed to delete some projects');
    }
  };

  const handleEdit = (project: Project) => {
    router.push(`/admin/projects/${project.id}`);
  };

  const handleView = (project: Project) => {
    if (project.slug) {
      window.open(`/projects/${project.slug}`, '_blank');
    }
  };

  // DataTable Columns
  const columns: DataTableColumn<Project>[] = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: (_, project) => {
        const imageUrl = project.images?.[0] || '/images/placeholder-project.jpg';
        return (
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={project.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        );
      },
    },
    {
      key: 'name',
      label: 'Project Name',
      sortable: true,
      render: (name, project) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{project.location}</div>
        </div>
      ),
    },
    {
      key: 'developer',
      label: 'Developer',
      sortable: true,
      render: (developer) => (
        <div className="text-sm text-gray-900">{developer}</div>
      ),
    },
    {
      key: 'completion',
      label: 'Completion',
      sortable: true,
      render: (completion) => (
        <div className="text-sm text-gray-600">{completion}</div>
      ),
    },
    {
      key: 'units',
      label: 'Units',
      sortable: true,
      align: 'center',
      render: (units) => (
        <div className="text-sm font-medium text-gray-900">
          {units.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'priceFrom',
      label: 'Price From',
      sortable: true,
      align: 'right',
      render: (price) => (
        <div className="text-sm font-semibold text-gray-900">
          ฿{price.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => {
        if (!status) return null;
        const statusColors: Record<string, string> = {
          planning: 'bg-gray-100 text-gray-800',
          'under construction': 'bg-yellow-100 text-yellow-800',
          completed: 'bg-green-100 text-green-800',
          'ready to move': 'bg-blue-100 text-blue-800',
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
  const actions: DataTableAction<Project>[] = [
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
      hidden: (project) => !project.slug,
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
        { label: 'Planning', value: 'planning' },
        { label: 'Under Construction', value: 'under construction' },
        { label: 'Completed', value: 'completed' },
        { label: 'Ready to Move', value: 'ready to move' },
      ],
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Development Projects"
        subtitle="Manage condo and villa projects"
        actions={
          <div className="flex items-center gap-3">
            {/* Bulk Delete Button */}
            {selectedProjects.length > 0 && (
              <Button variant="danger" onClick={handleBulkDelete}>
                🗑️ Delete {selectedProjects.length}
              </Button>
            )}
            <Button variant="primary" onClick={() => router.push('/admin/projects/new')}>
              + Add Project
            </Button>
          </div>
        }
      />

      <AdminPageContent>
        <DataTable
          data={projects}
          columns={columns}
          actions={actions}
          searchable
          searchKeys={['name', 'location', 'developer']}
          filterable
          filters={filters}
          selectable
          onSelectionChange={setSelectedProjects}
          onRowClick={handleEdit}
          loading={isLoading}
          emptyMessage="No projects found. Add your first development project to get started."
          pageSize={25}
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
