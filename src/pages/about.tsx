/**
 * About Page - Company information
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('about.pageTitle')}</h1>
            <p className="text-lg opacity-90">
              {t('about.pageSubtitle')}
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
                  {t('about.leadingAgency')}
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>{t('about.paragraph1')}</p>
                  <p>{t('about.paragraph2')}</p>
                  <p>{t('about.paragraph3')}</p>
                </div>
              </div>
              <div className="bg-background-secondary rounded-lg p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-6">{t('about.whyChooseUs')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">{t('about.feature1Title')}</div>
                      <div className="text-text-muted text-sm">{t('about.feature1Description')}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">{t('about.feature2Title')}</div>
                      <div className="text-text-muted text-sm">{t('about.feature2Description')}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">{t('about.feature3Title')}</div>
                      <div className="text-text-muted text-sm">{t('about.feature3Description')}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <div>
                      <div className="font-semibold text-text-primary">{t('about.feature4Title')}</div>
                      <div className="text-text-muted text-sm">{t('about.feature4Description')}</div>
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
                <h3 className="text-2xl font-bold text-text-primary mb-4">{t('about.ourMission')}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{t('about.ourVision')}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {t('about.visionText')}
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              {t('about.ourServices')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{t('about.service1Title')}</h3>
                <p className="text-text-muted">
                  {t('about.service1Description')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🔑</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{t('about.service2Title')}</h3>
                <p className="text-text-muted">
                  {t('about.service2Description')}
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{t('about.service3Title')}</h3>
                <p className="text-text-muted">
                  {t('about.service3Description')}
                </p>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.ourAchievements')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">{t('about.stat1')}</div>
                <div className="text-sm opacity-90">{t('about.stat1Label')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{t('about.stat2')}</div>
                <div className="text-sm opacity-90">{t('about.stat2Label')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{t('about.stat3')}</div>
                <div className="text-sm opacity-90">{t('about.stat3Label')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{t('about.stat4')}</div>
                <div className="text-sm opacity-90">{t('about.stat4Label')}</div>
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
