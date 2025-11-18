/**
 * About Page - Company information
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">About PW Pattaya</h1>
            <p className="text-lg opacity-90">
              Your trusted partner in Pattaya real estate since 2010
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 py-16">
          {/* Company Overview */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Leading Real Estate Agency in Pattaya
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    PW Pattaya Global Real Estate Co., Ltd is one of the leading real estate agencies
                    in Pattaya, Thailand. With over 15 years of experience, we have helped thousands
                    of clients find their dream properties in this beautiful coastal city.
                  </p>
                  <p>
                    Our team of professional agents speaks multiple languages including English, German,
                    Thai, Russian, and French, ensuring seamless communication with our international
                    clientele.
                  </p>
                  <p>
                    Whether you're looking to buy, rent, or invest in Pattaya real estate, we provide
                    comprehensive services tailored to your specific needs.
                  </p>
                </div>
              </div>
              <div className="bg-background-secondary rounded-lg p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Why Choose Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">15+ Years Experience</div>
                      <div className="text-text-muted text-sm">Trusted expertise in Pattaya market</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">Multilingual Team</div>
                      <div className="text-text-muted text-sm">Service in 5+ languages</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">500+ Properties</div>
                      <div className="text-text-muted text-sm">Extensive property portfolio</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">Full Service</div>
                      <div className="text-text-muted text-sm">From search to after-sales support</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h3>
                <p className="text-text-secondary leading-relaxed">
                  To provide exceptional real estate services that exceed client expectations,
                  making property transactions in Pattaya transparent, efficient, and rewarding
                  for both buyers and sellers.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">Our Vision</h3>
                <p className="text-text-secondary leading-relaxed">
                  To be the most trusted and preferred real estate agency in Pattaya,
                  known for our integrity, professionalism, and commitment to helping
                  people find their perfect property in paradise.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Property Sales</h3>
                <p className="text-text-muted">
                  Comprehensive buying and selling services for condos, houses, and land
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Rental Services</h3>
                <p className="text-text-muted">
                  Long-term and short-term rental management and property matching
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Investment Consulting</h3>
                <p className="text-text-muted">
                  Expert advice on property investment opportunities and market trends
                </p>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Properties Listed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2,000+</div>
                <div className="text-sm opacity-90">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-90">Client Satisfaction</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
