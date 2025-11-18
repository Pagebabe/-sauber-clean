import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { mockProperties } from '@/lib/mockData';

export default function Home() {
  // Show first 6 properties for Hot Deals
  const hotDeals = mockProperties.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <Hero />

      <main className="flex-1 container mx-auto px-6 py-16">
        {/* Hot Deals Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Hot Deals for sale in Pattaya
          </h2>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {hotDeals.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center">
            <Button variant="secondary" size="lg">
              Show More
            </Button>
          </div>
        </section>

        {/* Popular Projects Section - Placeholder */}
        <section className="mb-16 p-8 bg-background-secondary rounded-lg text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Popular Projects
          </h2>
          <p className="text-text-muted">
            Project listings coming soon...
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
