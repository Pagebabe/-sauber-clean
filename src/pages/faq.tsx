/**
 * FAQ Page - Frequently Asked Questions
 */

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'buying-1',
    category: 'Buying Property',
    question: 'Can foreigners buy property in Thailand?',
    answer: 'Yes, foreigners can buy condominiums in Thailand with full freehold ownership, as long as the foreign ownership quota in the building does not exceed 49%. Foreigners cannot directly own land, but can lease it for up to 30 years (renewable) or set up a Thai company to purchase land.',
  },
  {
    id: 'buying-2',
    category: 'Buying Property',
    question: 'What are the costs involved in buying property?',
    answer: 'Transfer fees are typically 2% of the property value (often split 50/50 between buyer and seller). Additional costs may include stamp duty (0.5%), withholding tax, specific business tax, and legal fees. Budget approximately 3-5% of the purchase price for all fees.',
  },
  {
    id: 'buying-3',
    category: 'Buying Property',
    question: 'How long does it take to complete a property purchase?',
    answer: 'The process typically takes 4-8 weeks from offer acceptance to completion. This includes contract preparation, due diligence, mortgage approval (if applicable), and transfer at the Land Office.',
  },
  {
    id: 'renting-1',
    category: 'Renting Property',
    question: 'What documents do I need to rent a property?',
    answer: 'You typically need a valid passport, visa (if applicable), proof of income or employment, and a deposit. Some landlords may also request references or a guarantor.',
  },
  {
    id: 'renting-2',
    category: 'Renting Property',
    question: 'How much deposit is required for renting?',
    answer: 'The standard deposit is usually 2 months rent, plus 1 month advance rent. This may vary depending on the property and landlord. Deposits are refundable at the end of the lease, minus any damages or unpaid bills.',
  },
  {
    id: 'legal-1',
    category: 'Legal & Visas',
    question: 'What is a usufruct and how does it work?',
    answer: 'A usufruct is a legal right that allows a foreigner to use and benefit from a property (including land) for up to 30 years, renewable. It can be registered at the Land Office and provides strong legal protection.',
  },
  {
    id: 'legal-2',
    category: 'Legal & Visas',
    question: 'Can I get a visa based on property ownership?',
    answer: 'No, property ownership alone does not grant a visa. However, property owners can apply for other visa categories like retirement visa, business visa, or Thai Elite visa. Consult with immigration authorities for specific requirements.',
  },
  {
    id: 'investment-1',
    category: 'Investment',
    question: 'What is the average ROI for rental properties in Pattaya?',
    answer: 'Rental yields in Pattaya typically range from 5-8% per year, depending on location, property type, and management. Popular tourist areas near the beach tend to offer higher yields.',
  },
  {
    id: 'investment-2',
    category: 'Investment',
    question: 'Are property prices increasing in Pattaya?',
    answer: 'Pattaya property prices have shown steady growth over the past decade, averaging 3-5% per year. Prime beachfront locations and new developments tend to appreciate faster. Market conditions vary by area and property type.',
  },
  {
    id: 'general-1',
    category: 'General',
    question: 'What are the best areas to live in Pattaya?',
    answer: 'Popular areas include Wongamat Beach (quiet, upscale), Jomtien (family-friendly), Na Jomtien (peaceful), Pratumnak Hill (sea views), and Central Pattaya (convenient). The best area depends on your lifestyle preferences and budget.',
  },
  {
    id: 'general-2',
    category: 'General',
    question: 'What utilities and maintenance costs should I expect?',
    answer: 'Monthly costs typically include: electricity (฿1,500-3,000), water (฿150-300), internet (฿500-1,000), and condominium fees (฿30-80 per sqm). Costs vary based on usage and property size.',
  },
  {
    id: 'general-3',
    category: 'General',
    question: 'Is it safe to invest in Thai real estate?',
    answer: 'Yes, with proper due diligence and legal advice. Always use a reputable lawyer, verify ownership documents, check for encumbrances, and ensure the property has all necessary permits and approvals.',
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light text-white py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg opacity-90">
              Find answers to common questions about buying, renting, and investing in Pattaya real estate
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container mx-auto px-6 py-16">
          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-background-secondary hover:bg-primary hover:text-white transition-colors text-sm font-medium text-text-primary"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items by Category */}
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
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
                          {faq.question}
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
                              {faq.answer}
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
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our team is here to help. Contact us for personalized assistance with your real estate needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+66123456789"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
