/**
 * Services Page - Real estate services overview
 */

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'property-sales',
    icon: '🏠',
    title: 'Property Sales',
    description: 'Comprehensive buying and selling services for all types of properties in Pattaya.',
    features: [
      'Property valuation and market analysis',
      'Professional photography and marketing',
      'Buyer screening and qualification',
      'Negotiation and contract management',
      'Legal support and documentation',
      'After-sales support and assistance',
    ],
  },
  {
    id: 'rental-services',
    icon: '🔑',
    title: 'Rental Services',
    description: 'Long-term and short-term rental management for property owners and tenants.',
    features: [
      'Tenant screening and background checks',
      'Rental price recommendations',
      'Property maintenance coordination',
      'Lease agreement preparation',
      'Rent collection and payment processing',
      '24/7 tenant support',
    ],
  },
  {
    id: 'property-management',
    icon: '🏢',
    title: 'Property Management',
    description: 'Full-service property management for residential and commercial properties.',
    features: [
      'Regular property inspections',
      'Maintenance and repair coordination',
      'Financial reporting and accounting',
      'Utility management and payments',
      'Emergency response service',
      'Rental income optimization',
    ],
  },
  {
    id: 'investment-consulting',
    icon: '💼',
    title: 'Investment Consulting',
    description: 'Expert advice on property investment opportunities and portfolio management.',
    features: [
      'Market research and trend analysis',
      'ROI calculations and projections',
      'Investment strategy development',
      'Portfolio diversification advice',
      'Risk assessment and mitigation',
      'Exit strategy planning',
    ],
  },
  {
    id: 'legal-assistance',
    icon: '⚖️',
    title: 'Legal Assistance',
    description: 'Professional legal support for all property transactions and documentation.',
    features: [
      'Contract review and drafting',
      'Title deed verification',
      'Foreign ownership guidance',
      'Company formation support',
      'Tax planning and advice',
      'Dispute resolution assistance',
    ],
  },
  {
    id: 'relocation-services',
    icon: '✈️',
    title: 'Relocation Services',
    description: 'Complete relocation support for international clients moving to Pattaya.',
    features: [
      'Area orientation tours',
      'School and hospital information',
      'Utility connection assistance',
      'Visa and permit guidance',
      'Banking and financial setup',
      'Cultural adaptation support',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg opacity-90">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <div
                key={service.id}
                data-testid="service-card"
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8"
              >
                {/* Icon */}
                <div className="text-6xl mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <Button variant="text" size="sm" fullWidth>
                  Learn More →
                </Button>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing a Service?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our team of experts is here to guide you through your real estate journey.
              Contact us today for a free consultation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
              <Button variant="text" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-background-secondary py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              Why Choose Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Expert Team</h3>
                <p className="text-text-muted">
                  15+ years of experience in Pattaya real estate market
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Multilingual</h3>
                <p className="text-text-muted">
                  Service in English, German, Thai, Russian, and French
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Personalized</h3>
                <p className="text-text-muted">
                  Tailored solutions for your unique needs and goals
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💯</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Full Support</h3>
                <p className="text-text-muted">
                  End-to-end assistance from search to after-sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
