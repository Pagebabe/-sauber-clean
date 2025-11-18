/**
 * Projects Page - Property development projects
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface Project {
  id: string;
  name: string;
  location: string;
  developer: string;
  completion: string;
  units: number;
  priceFrom: number;
  image: string;
  description: string;
}

const mockProjects: Project[] = [
  {
    id: 'PROJ-001',
    name: 'The Riviera Wongamat',
    location: 'Wongamat Beach',
    developer: 'Riviera Group',
    completion: '2025 Q2',
    units: 484,
    priceFrom: 3500000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    description: 'Luxury beachfront development with world-class amenities',
  },
  {
    id: 'PROJ-002',
    name: 'Reflection Jomtien',
    location: 'Jomtien',
    developer: 'Nova Group',
    completion: '2025 Q4',
    units: 928,
    priceFrom: 2200000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    description: 'Modern high-rise condominium with sea views',
  },
  {
    id: 'PROJ-003',
    name: 'The Base Central Pattaya',
    location: 'Central Pattaya',
    developer: 'Sansiri',
    completion: '2024 Q4',
    units: 1112,
    priceFrom: 1800000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    description: 'Urban lifestyle condominium in the heart of Pattaya',
  },
  {
    id: 'PROJ-004',
    name: 'Aeras Condo',
    location: 'Jomtien',
    developer: 'Raimon Land',
    completion: '2026 Q1',
    units: 648,
    priceFrom: 2900000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    description: 'Premium beachfront living with panoramic views',
  },
  {
    id: 'PROJ-005',
    name: 'Grand Solaire',
    location: 'Naklua',
    developer: 'Grand Unity',
    completion: '2025 Q3',
    units: 756,
    priceFrom: 4200000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    description: 'Sophisticated waterfront residence with resort facilities',
  },
  {
    id: 'PROJ-006',
    name: 'The Palm',
    location: 'Wongamat',
    developer: 'Wongamat Beach',
    completion: '2024 Q3',
    units: 525,
    priceFrom: 5600000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    description: 'Exclusive beachfront condominium with private beach access',
  },
];

export default function ProjectsPage() {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(1)}M`;
    }
    return `฿${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Property Development Projects</h1>
            <p className="text-lg opacity-90">
              Explore the latest real estate development projects in Pattaya
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 py-12">
          <p className="text-text-secondary mb-8">
            Showing <span className="font-semibold text-text-primary">{mockProjects.length}</span> projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProjects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                data-testid="project-card"
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
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
                      <div className="text-xs text-text-muted mb-1">Developer</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {project.developer}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Completion</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {project.completion}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Units</div>
                      <div className="text-sm font-semibold text-text-primary">
                        {project.units}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">From</div>
                      <div className="text-sm font-semibold text-primary">
                        {formatPrice(project.priceFrom)}
                      </div>
                    </div>
                  </div>

                  <Button variant="text" size="sm" fullWidth>
                    View Project Details →
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
