/**
 * Privacy Policy Page
 */

import React from 'react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/seo/SEO';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Privacy Policy - PW Pattaya Real Estate"
        description="Privacy Policy and Data Protection information for PW Pattaya Global Real Estate Co., Ltd."
      />

      <Header />

      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-text-muted mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
              <p className="text-text-primary mb-4">
                PW Pattaya Global Real Estate Co., Ltd. ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
              <p className="text-text-primary mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Property preferences and search criteria</li>
                <li>Messages and inquiries you send us</li>
                <li>Account information if you register on our website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-text-primary mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you property listings and updates</li>
                <li>Communicate with you about our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Information Sharing</h2>
              <p className="text-text-primary mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Property owners or developers when you inquire about specific properties</li>
                <li>Service providers who assist us in operating our website</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Data Security</h2>
              <p className="text-text-primary mb-4">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Your Rights</h2>
              <p className="text-text-primary mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Cookies</h2>
              <p className="text-text-primary mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic.
                You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Changes to This Policy</h2>
              <p className="text-text-primary mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Contact Us</h2>
              <p className="text-text-primary mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
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
