/**
 * Property Detail Page - Individual property view
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import type { Property } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PropertyDetailPageProps {
  property: Property | null;
  error?: string;
}

export default function PropertyDetailPage({ property, error }: PropertyDetailPageProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!property && !error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Property Not Found</h1>
          <p className="text-text-secondary mb-8">The property you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-6 py-16 text-center">
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded inline-block">
            <p className="font-bold">Error loading property:</p>
            <p>{error || 'Unknown error'}</p>
          </div>
          <div className="mt-8">
            <Button variant="primary" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(2)}M`;
    }
    return `฿${price.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Property Images Gallery */}
        <div className="bg-gray-100" data-testid="property-gallery">
          <div className="container mx-auto px-6 py-8">
            <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              {/* Title & Price */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  {property.title}
                </h1>
                <p
                  data-testid="property-detail-price"
                  className="text-4xl font-bold text-primary mb-4"
                >
                  {formatPrice(property.price)}
                </p>
                <div
                  data-testid="property-location"
                  className="flex items-center gap-2 text-secondary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>

              {/* Property Specs */}
              <div
                data-testid="property-detail-specs"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-background-secondary rounded-lg"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🛏️</div>
                  <div className="font-semibold text-text-primary">{property.bedrooms}</div>
                  <div className="text-sm text-text-muted">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚿</div>
                  <div className="font-semibold text-text-primary">{property.bathrooms}</div>
                  <div className="text-sm text-text-muted">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📐</div>
                  <div className="font-semibold text-text-primary">{property.area} m²</div>
                  <div className="text-sm text-text-muted">Living Area</div>
                </div>
                {property.floor && (
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏢</div>
                    <div className="font-semibold text-text-primary">Floor {property.floor}</div>
                    <div className="text-sm text-text-muted">Level</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8" data-testid="property-description">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Description</h2>
                <p className="text-text-secondary leading-relaxed">
                  This beautiful property offers an exceptional living experience in the heart of {property.location}.
                  With {property.bedrooms} spacious bedrooms and {property.bathrooms} modern bathrooms, this {property.area}m²
                  residence provides ample space for comfortable living. Perfect for those seeking a premium lifestyle
                  in Pattaya's most desirable location.
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">Air Conditioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">Swimming Pool</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">24/7 Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">Fitness Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-text-secondary">High-Speed Internet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Agent</h2>
                <form onSubmit={handleSubmit} data-testid="contact-form">
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      fullWidth
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      fullWidth
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+66 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      fullWidth
                    />
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        rows={4}
                        placeholder="I'm interested in this property..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Send Inquiry
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-text-muted text-center">
                    Or contact us directly:
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span>📞</span>
                      <a href="tel:+66123456789" className="hover:text-primary">
                        +66 12 345 6789
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span>📧</span>
                      <a href="mailto:info@pw-pattaya.com" className="hover:text-primary">
                        info@pw-pattaya.com
                      </a>
                    </div>
                  </div>
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

/**
 * Fetch property by ID from API at request time
 */
export const getServerSideProps: GetServerSideProps<PropertyDetailPageProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/properties/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          props: {
            ...(await serverSideTranslations(context.locale || 'en', ['common'])),
            property: null,
          },
        };
      }
      throw new Error(`API returned ${response.status}`);
    }

    const property = await response.json();

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        property,
      },
    };
  } catch (error) {
    console.error('Error fetching property:', error);

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        property: null,
        error: 'Unable to load property. Please try again later.',
      },
    };
  }
};
