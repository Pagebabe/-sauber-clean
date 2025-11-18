/**
 * 404 Error Page - Page Not Found
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-primary/20">404</div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            {t('error404.title')}
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            {t('error404.message')}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button variant="primary" size="lg">
                {t('error404.goHome')}
              </Button>
            </Link>
            <Link href="/buy">
              <Button variant="secondary" size="lg">
                {t('error404.browseProperties')}
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-text-muted mb-4">
              {t('error404.popularPages')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap text-sm">
              <Link href="/rent" className="text-primary hover:underline">
                {t('error404.rentProperties')}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/projects" className="text-primary hover:underline">
                {t('error404.projects')}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/about" className="text-primary hover:underline">
                {t('error404.aboutUs')}
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-primary hover:underline">
                {t('error404.contact')}
              </Link>
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
