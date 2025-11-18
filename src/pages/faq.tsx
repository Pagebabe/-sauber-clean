/**
 * FAQ Page - Frequently Asked Questions
 */

import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface FAQItem {
  id: string;
  categoryKey: string;
  questionKey: string;
  answerKey: string;
}

export default function FAQPage() {
  const { t } = useTranslation('common');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqs: FAQItem[] = [
    {
      id: 'buying-1',
      categoryKey: 'faq.categoryBuying',
      questionKey: 'faq.buying1Question',
      answerKey: 'faq.buying1Answer',
    },
    {
      id: 'buying-2',
      categoryKey: 'faq.categoryBuying',
      questionKey: 'faq.buying2Question',
      answerKey: 'faq.buying2Answer',
    },
    {
      id: 'buying-3',
      categoryKey: 'faq.categoryBuying',
      questionKey: 'faq.buying3Question',
      answerKey: 'faq.buying3Answer',
    },
    {
      id: 'renting-1',
      categoryKey: 'faq.categoryRenting',
      questionKey: 'faq.renting1Question',
      answerKey: 'faq.renting1Answer',
    },
    {
      id: 'renting-2',
      categoryKey: 'faq.categoryRenting',
      questionKey: 'faq.renting2Question',
      answerKey: 'faq.renting2Answer',
    },
    {
      id: 'legal-1',
      categoryKey: 'faq.categoryLegal',
      questionKey: 'faq.legal1Question',
      answerKey: 'faq.legal1Answer',
    },
    {
      id: 'legal-2',
      categoryKey: 'faq.categoryLegal',
      questionKey: 'faq.legal2Question',
      answerKey: 'faq.legal2Answer',
    },
    {
      id: 'investment-1',
      categoryKey: 'faq.categoryInvestment',
      questionKey: 'faq.investment1Question',
      answerKey: 'faq.investment1Answer',
    },
    {
      id: 'investment-2',
      categoryKey: 'faq.categoryInvestment',
      questionKey: 'faq.investment2Question',
      answerKey: 'faq.investment2Answer',
    },
    {
      id: 'general-1',
      categoryKey: 'faq.categoryGeneral',
      questionKey: 'faq.general1Question',
      answerKey: 'faq.general1Answer',
    },
    {
      id: 'general-2',
      categoryKey: 'faq.categoryGeneral',
      questionKey: 'faq.general2Question',
      answerKey: 'faq.general2Answer',
    },
    {
      id: 'general-3',
      categoryKey: 'faq.categoryGeneral',
      questionKey: 'faq.general3Question',
      answerKey: 'faq.general3Answer',
    },
  ];

  // Get unique categories
  const categoryKeys = Array.from(new Set(faqs.map(faq => faq.categoryKey)));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{t('faq.pageTitle')}</h1>
            <p className="text-lg opacity-90">
              {t('faq.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container mx-auto px-6 py-16">
          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categoryKeys.map((categoryKey) => (
              <button
                key={categoryKey}
                className="px-6 py-2 rounded-full bg-background-secondary hover:bg-primary hover:text-white transition-colors text-sm font-medium text-text-primary"
              >
                {t(categoryKey)}
              </button>
            ))}
          </div>

          {/* FAQ Items by Category */}
          {categoryKeys.map((categoryKey) => (
            <div key={categoryKey} className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                {t(categoryKey)}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.categoryKey === categoryKey)
                  .map((faq) => (
                    <div
                      key={faq.id}
                      data-testid="faq-item"
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-text-primary pr-8">
                          {t(faq.questionKey)}
                        </h3>
                        <svg
                          className={`w-6 h-6 text-primary transition-transform flex-shrink-0 ${
                            openItems.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 pb-2 border-t border-gray-200">
                            <p className="text-text-secondary leading-relaxed">
                              {t(faq.answerKey)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Still Have Questions CTA */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-12 text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">{t('faq.ctaHeading')}</h2>
            <p className="text-lg mb-8 opacity-90">
              {t('faq.ctaText')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t('faq.ctaContactButton')}
              </a>
              <a
                href="tel:+66123456789"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                {t('faq.ctaCallButton')}
              </a>
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
