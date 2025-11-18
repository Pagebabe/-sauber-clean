/**
 * 500 Error Page - Internal Server Error
 */

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          {/* 500 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-red-500/20">500</div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Internal Server Error
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Something went wrong on our end. We're working to fix the issue. Please try again later.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button variant="primary" size="lg">
                Go to Homepage
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </div>

          {/* Contact Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-text-muted mb-4">
              If the problem persists, please contact us:
            </p>
            <div className="flex gap-6 justify-center text-sm">
              <a
                href="tel:+66123456789"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <span>📞</span>
                <span>+66 12 345 6789</span>
              </a>
              <a
                href="mailto:info@pw-pattaya.com"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <span>📧</span>
                <span>info@pw-pattaya.com</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
