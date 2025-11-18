/**
 * Projects Page - Property development projects
 */

import React from 'react';
import type { GetServerSideProps } from 'next';
import type { Project } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface ProjectsPageProps {
  projects: Project[];
  error?: string;
}

export default function ProjectsPage({ projects, error }: ProjectsPageProps) {
  const { t } = useTranslation('common');

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(1)}M`;
    }
    return `฿${price.toLocaleString()}`;
  };

  const formatCompletion = (date: Date | string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const quarter = Math.ceil((d.getMonth() + 1) / 3);
    return `${year} Q${quarter}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('projects.pageTitle')}</h1>
            <p className="text-lg opacity-90">
              {t('projects.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 py-12">
          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">{t('projects.errorLoading')}</p>
              <p>{error}</p>
            </div>
          )}

          <p className="text-text-secondary mb-8">
            {t('projects.showing')} <span className="font-semibold text-text-primary">{projects.length}</span> {t('projects.projectsCount')}
          </p>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                data-testid="project-card"
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={project.images[0] || '/placeholder.jpg'}
                    alt={project.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-secondary mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{project.location}</span>
                  </div>

                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-text-muted mb-1">{t('projects.developer')}</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {project.developer}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">{t('projects.completion')}</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {formatCompletion(project.completion)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">{t('projects.units')}</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {project.units}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">{t('projects.from')}</div>
                      <div className="text-sm font-semibold text-primary">
                        {formatPrice(project.priceFrom)}
                      </div>
                    </div>
                  </div>

                  <Button variant="text" size="sm" fullWidth>
                    {t('projects.viewDetails')}
                  </Button>
                </div>
              </Link>
            ))}
            </div>
          ) : (
            <p className="text-center text-text-muted py-12">
              {t('projects.noProjects')}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Fetch projects from API at request time
 */
export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (context) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/projects`);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        projects: data.projects || [],
      },
    };
  } catch (error) {
    console.error('Error fetching projects:', error);

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        projects: [],
        error: 'Unable to load projects. Please try again later.',
      },
    };
  }
};
