import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import type { GetServerSideProps } from 'next';
import type { Property } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface HomeProps {
  properties: Property[];
  error?: string;
}

export default function Home({ properties, error }: HomeProps) {
  // Show first 6 properties for Hot Deals
  const hotDeals = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <Hero />

      <main className="flex-1 container mx-auto px-6 py-16">
        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error loading properties:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Hot Deals Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Hot Deals for sale in Pattaya
          </h2>

          {/* Property Grid */}
          {hotDeals.length > 0 ? (
            <>
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
            </>
          ) : (
            <p className="text-center text-text-muted">
              No properties available at the moment.
            </p>
          )}
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

/**
 * Fetch properties from API at request time
 */
export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  try {
    // Fetch properties for sale from API
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/properties?listingType=sale&limit=10`);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        properties: data.properties || [],
      },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);

    // Return empty array with error message if API fails
    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'en', ['common'])),
        properties: [],
        error: 'Unable to load properties. Please try again later.',
      },
    };
  }
};
