import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <Hero />

      <main className="flex-1 container mx-auto px-6 py-16">
        {/* Hot Deals Section - Coming next */}
        <div className="mt-8 p-8 bg-background-secondary rounded-lg text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Hot Deals for sale in Pattaya
          </h2>
          <p className="text-text-muted">
            Property listings coming soon...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
