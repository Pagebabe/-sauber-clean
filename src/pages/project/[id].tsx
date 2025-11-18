/**
 * Project Detail Page
 * Displays full details of a development project
 */

import React, { useEffect, useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/Button';

interface Project {
  id: string;
  name: string;
  nameDE?: string | null;
  nameTH?: string | null;
  nameRU?: string | null;
  nameFR?: string | null;
  description: string;
  descriptionDE?: string | null;
  descriptionTH?: string | null;
  descriptionRU?: string | null;
  descriptionFR?: string | null;
  location: string;
  developer: string;
  completion: string;
  units: number;
  priceFrom: number;
  images: string[];
  amenities: string[];
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t, i18n } = useTranslation('common');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/${id}`);

      if (!response.ok) {
        throw new Error('Project not found');
      }

      const data = await response.json();
      setProject(data);
      setError('');
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedField = (field: 'name' | 'description') => {
    if (!project) return '';

    const locale = i18n.language;
    const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);

    if (locale === 'de' && project[`${field}DE` as keyof Project]) {
      return project[`${field}DE` as keyof Project] as string;
    }
    if (locale === 'th' && project[`${field}TH` as keyof Project]) {
      return project[`${field}TH` as keyof Project] as string;
    }
    if (locale === 'ru' && project[`${field}RU` as keyof Project]) {
      return project[`${field}RU` as keyof Project] as string;
    }
    if (locale === 'fr' && project[`${field}FR` as keyof Project]) {
      return project[`${field}FR` as keyof Project] as string;
    }

    return project[field];
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(2)}M`;
    }
    return `฿${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-text-muted">{t('common.loading')}</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Project Not Found</h1>
            <p className="text-text-muted mb-6">{error}</p>
            <Button onClick={() => router.push('/projects')}>
              Back to Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title={`${getLocalizedField('name')} - PW Pattaya Real Estate`}
        description={getLocalizedField('description')}
      />

      <Header />

      <main className="flex-1">
        {/* Project Images Gallery */}
        <div className="bg-gray-100" data-testid="project-gallery">
          <div className="container mx-auto px-6 py-8">
            <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={project.images[0] || '/placeholder.jpg'}
                alt={getLocalizedField('name')}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              {/* Project Name */}
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {getLocalizedField('name')}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-text-muted mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{project.location}</span>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-text-muted mb-1">Developer</p>
                  <p className="text-lg font-semibold text-text-primary">{project.developer}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-text-muted mb-1">Completion</p>
                  <p className="text-lg font-semibold text-text-primary">{project.completion}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-text-muted mb-1">Total Units</p>
                  <p className="text-lg font-semibold text-text-primary">{project.units}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-text-muted mb-1">Price From</p>
                  <p className="text-lg font-semibold text-primary">{formatPrice(project.priceFrom)}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">About This Project</h2>
                <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                  {getLocalizedField('description')}
                </p>
              </div>

              {/* Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-text-primary">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-text-primary mb-4">Interested in this project?</h3>
                <p className="text-text-muted mb-6">Contact us for more information and availability.</p>

                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button variant="primary" fullWidth>
                    Send Inquiry
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-text-muted mb-2">Or contact us directly:</p>
                  <a href="tel:0969823602" className="text-primary hover:underline block mb-2">
                    📞 0969823602
                  </a>
                  <a href="mailto:info@pw-pattaya.com" className="text-primary hover:underline block">
                    ✉️ info@pw-pattaya.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // For now, return empty paths and use fallback
  // In production, you'd fetch all project IDs here
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
