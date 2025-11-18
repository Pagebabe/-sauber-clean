/**
 * Terms of Service Page
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Terms of Service - PW Pattaya Real Estate"
        description="Terms of Service for PW Pattaya Global Real Estate Co., Ltd."
      />

      <Header />

      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-text-muted mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-primary mb-4">
                By accessing and using the services of PW Pattaya Global Real Estate Co., Ltd. ("PW Pattaya," "we," "our," or "us"),
                you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Services Provided</h2>
              <p className="text-text-primary mb-4">
                PW Pattaya provides real estate services including:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Property buying and selling assistance</li>
                <li>Property rental services</li>
                <li>Property management</li>
                <li>Real estate consultation</li>
                <li>Development project information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Property Listings</h2>
              <p className="text-text-primary mb-4">
                All property listings on our website are provided for informational purposes. We strive to maintain accurate
                and up-to-date information, but we do not guarantee the accuracy, completeness, or availability of any property listed.
              </p>
              <p className="text-text-primary mb-4">
                Properties are subject to prior sale or rental, and prices may change without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. User Responsibilities</h2>
              <p className="text-text-primary mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not misrepresent your identity or affiliation</li>
                <li>Respect intellectual property rights</li>
                <li>Not interfere with the proper functioning of our website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Commission and Fees</h2>
              <p className="text-text-primary mb-4">
                Real estate transactions may involve commission fees. All fees and payment terms will be clearly communicated
                and agreed upon before any transaction is completed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Limitation of Liability</h2>
              <p className="text-text-primary mb-4">
                To the fullest extent permitted by law, PW Pattaya shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of our services or any property transaction.
              </p>
              <p className="text-text-primary mb-4">
                We are not responsible for disputes between buyers and sellers, landlords and tenants, or any third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Intellectual Property</h2>
              <p className="text-text-primary mb-4">
                All content on our website, including text, graphics, logos, images, and software, is the property of
                PW Pattaya or its licensors and is protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Third-Party Links</h2>
              <p className="text-text-primary mb-4">
                Our website may contain links to third-party websites. We are not responsible for the content, accuracy,
                or privacy practices of these external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Governing Law</h2>
              <p className="text-text-primary mb-4">
                These Terms of Service are governed by and construed in accordance with the laws of Thailand.
                Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Thailand.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">10. Changes to Terms</h2>
              <p className="text-text-primary mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">11. Contact Information</h2>
              <p className="text-text-primary mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-text-primary mb-2"><strong>PW Pattaya Global Real Estate Co., Ltd.</strong></p>
                <p className="text-text-primary mb-2">Unit no. 004S Park Beach Condominium, Pattaya, Thailand</p>
                <p className="text-text-primary mb-2">Email: info@pw-pattaya.com</p>
                <p className="text-text-primary">Phone: 0969823602</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
    },
  };
};
