/**
 * Property Contact Component
 * Contact form for property inquiries
 */

import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/ui/Button';

interface PropertyContactProps {
  propertyId: string;
  propertyTitle: string;
  ownerName?: string | null;
  ownerPhone?: string | null;
  ownerEmail?: string | null;
  ownerLine?: string | null;
}

export function PropertyContact({
  propertyId,
  propertyTitle,
  ownerName,
  ownerPhone,
  ownerEmail,
  ownerLine,
}: PropertyContactProps) {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in: ${propertyTitle}`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
          source: 'website',
          subject: `Property Inquiry: ${propertyTitle}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us About This Property</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="+66 123 456 789"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Tell us about your requirements..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <p className="font-medium">Thank you for your inquiry!</p>
                <p className="text-sm mt-1">We'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-medium">Something went wrong</p>
                <p className="text-sm mt-1">Please try again or contact us directly.</p>
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Owner Information */}
          {ownerName && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Owner</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-gray-700">{ownerName}</span>
                </div>

                {ownerPhone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href={`tel:${ownerPhone}`} className="text-primary hover:text-primary-dark">
                      {ownerPhone}
                    </a>
                  </div>
                )}

                {ownerEmail && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href={`mailto:${ownerEmail}`} className="text-primary hover:text-primary-dark">
                      {ownerEmail}
                    </a>
                  </div>
                )}

                {ownerLine && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-gray-700">LINE: {ownerLine}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Contact Methods */}
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                📞 <span className="font-medium">Call us:</span> Available Mon-Sat, 9am-6pm
              </p>
              <p>
                ✉️ <span className="font-medium">Email:</span> We respond within 24 hours
              </p>
              <p>
                📱 <span className="font-medium">WhatsApp/LINE:</span> Instant messaging available
              </p>
              <p>
                🏢 <span className="font-medium">Office Visit:</span> Schedule an appointment
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-xs text-gray-600 mt-1">Verified Listings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24h</div>
                <div className="text-xs text-gray-600 mt-1">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-xs text-gray-600 mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-xs text-gray-600 mt-1">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
