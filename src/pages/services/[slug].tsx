/**
 * Service Detail Page
 * Displays detailed information about a specific service
 */

import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/Button';

const services = {
  'property-sales': {
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
  'rental-services': {
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
  'property-management': {
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
  'investment-consulting': {
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
  'legal-assistance': {
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
  'relocation-services': {
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
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');

  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Service Not Found</h1>
            <Button onClick={() => router.push('/services')}>
              Back to Services
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
        title={`${t(service.titleKey)} - PW Pattaya Real Estate`}
        description={t(service.descriptionKey)}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">{service.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t(service.titleKey)}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                {t(service.descriptionKey)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Features */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  {t('services.whatWeOffer')}
                </h2>
                <div className="space-y-4">
                  {service.featureKeys.map((featureKey, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-text-primary leading-relaxed">
                          {t(featureKey)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  {t('services.whyChooseUs')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{t('services.whyChooseUs1Title')}</h3>
                      <p className="text-text-muted text-sm">{t('services.whyChooseUs1Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{t('services.whyChooseUs2Title')}</h3>
                      <p className="text-text-muted text-sm">{t('services.whyChooseUs2Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{t('services.whyChooseUs3Title')}</h3>
                      <p className="text-text-muted text-sm">{t('services.whyChooseUs3Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{t('services.whyChooseUs4Title')}</h3>
                      <p className="text-text-muted text-sm">{t('services.whyChooseUs4Description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - CTA */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  {t('services.getStarted')}
                </h3>
                <p className="text-text-muted mb-6">
                  {t('services.getStartedDescription')}
                </p>

                <div className="space-y-4 mb-6">
                  <Link href="/contact">
                    <Button variant="primary" fullWidth>
                      {t('services.contactUs')}
                    </Button>
                  </Link>
                  <Link href="/buy">
                    <Button variant="secondary" fullWidth>
                      {t('services.browseProperties')}
                    </Button>
                  </Link>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-text-primary mb-3">{t('services.contactInfo')}</h4>
                  <div className="space-y-3">
                    <a href="tel:0969823602" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>0969823602</span>
                    </a>
                    <a href="mailto:info@pw-pattaya.com" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@pw-pattaya.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">{t('services.relatedServices')}</h4>
                <div className="space-y-2">
                  {Object.entries(services)
                    .filter(([key]) => key !== slug)
                    .slice(0, 3)
                    .map(([key, relatedService]) => (
                      <Link
                        key={key}
                        href={`/services/${key}`}
                        className="block text-blue-700 hover:text-blue-900 hover:underline text-sm"
                      >
                        {service.icon} {t(relatedService.titleKey)}
                      </Link>
                    ))}
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
  const paths = Object.keys(services).flatMap((slug) => [
    { params: { slug }, locale: 'en' },
    { params: { slug }, locale: 'de' },
    { params: { slug }, locale: 'th' },
    { params: { slug }, locale: 'ru' },
    { params: { slug }, locale: 'fr' },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
};
