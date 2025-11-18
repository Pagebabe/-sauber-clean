/**
 * Services Page - Real estate services overview
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  featureKeys: string[];
}

export default function ServicesPage() {
  const { t } = useTranslation('common');

  const services: Service[] = [
    {
      id: 'property-sales',
      icon: '🏠',
      titleKey: 'services.propertySales.title',
      descriptionKey: 'services.propertySales.description',
      featureKeys: [
        'services.propertySales.feature1',
        'services.propertySales.feature2',
        'services.propertySales.feature3',
        'services.propertySales.feature4',
        'services.propertySales.feature5',
        'services.propertySales.feature6',
      ],
    },
    {
      id: 'rental-services',
      icon: '🔑',
      titleKey: 'services.rentalServices.title',
      descriptionKey: 'services.rentalServices.description',
      featureKeys: [
        'services.rentalServices.feature1',
        'services.rentalServices.feature2',
        'services.rentalServices.feature3',
        'services.rentalServices.feature4',
        'services.rentalServices.feature5',
        'services.rentalServices.feature6',
      ],
    },
    {
      id: 'property-management',
      icon: '🏢',
      titleKey: 'services.propertyManagement.title',
      descriptionKey: 'services.propertyManagement.description',
      featureKeys: [
        'services.propertyManagement.feature1',
        'services.propertyManagement.feature2',
        'services.propertyManagement.feature3',
        'services.propertyManagement.feature4',
        'services.propertyManagement.feature5',
        'services.propertyManagement.feature6',
      ],
    },
    {
      id: 'investment-consulting',
      icon: '💼',
      titleKey: 'services.investmentConsulting.title',
      descriptionKey: 'services.investmentConsulting.description',
      featureKeys: [
        'services.investmentConsulting.feature1',
        'services.investmentConsulting.feature2',
        'services.investmentConsulting.feature3',
        'services.investmentConsulting.feature4',
        'services.investmentConsulting.feature5',
        'services.investmentConsulting.feature6',
      ],
    },
    {
      id: 'legal-assistance',
      icon: '⚖️',
      titleKey: 'services.legalAssistance.title',
      descriptionKey: 'services.legalAssistance.description',
      featureKeys: [
        'services.legalAssistance.feature1',
        'services.legalAssistance.feature2',
        'services.legalAssistance.feature3',
        'services.legalAssistance.feature4',
        'services.legalAssistance.feature5',
        'services.legalAssistance.feature6',
      ],
    },
    {
      id: 'relocation-services',
      icon: '✈️',
      titleKey: 'services.relocationServices.title',
      descriptionKey: 'services.relocationServices.description',
      featureKeys: [
        'services.relocationServices.feature1',
        'services.relocationServices.feature2',
        'services.relocationServices.feature3',
        'services.relocationServices.feature4',
        'services.relocationServices.feature5',
        'services.relocationServices.feature6',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('services.pageTitle')}</h1>
            <p className="text-lg opacity-90">
              {t('services.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8"
                data-testid="service-card"
              >
                {/* Icon */}
                <div className="text-6xl mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.featureKeys.map((featureKey, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <Button variant="text" size="sm" fullWidth>
                  {t('services.learnMore')}
                </Button>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('services.ctaHeading')}</h2>
            <p className="text-lg mb-8 opacity-90">
              {t('services.ctaText')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg">
                {t('services.ctaButton1')}
              </Button>
              <Button variant="text" size="lg">
                {t('services.ctaButton2')}
              </Button>
            </div>
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-background-secondary py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
              {t('services.whyChooseTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{t('services.benefit1Title')}</h3>
                <p className="text-text-muted">
                  {t('services.benefit1Description')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{t('services.benefit2Title')}</h3>
                <p className="text-text-muted">
                  {t('services.benefit2Description')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{t('services.benefit3Title')}</h3>
                <p className="text-text-muted">
                  {t('services.benefit3Description')}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💯</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{t('services.benefit4Title')}</h3>
                <p className="text-text-muted">
                  {t('services.benefit4Description')}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
