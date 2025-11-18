import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/components/seo/SEO';
import type { GetServerSideProps } from 'next';
import type { Property } from '@prisma/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface HomeProps {
  properties: Property[];
  error?: string;
}

export default function Home({ properties, error }: HomeProps) {
  const { t } = useTranslation('common');
  // Show first 6 properties for Hot Deals
  const hotDeals = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="PW Pattaya Real Estate - Properties for Sale & Rent in Pattaya, Thailand"
        description="Find your dream property in Pattaya. Browse luxury condos, villas, and houses for sale or rent. Expert real estate services with 5-language support."
        canonical="/"
      />
      <Header />

      {/* Hero Section */}
      <Hero />

      <main className="flex-1 container mx-auto px-6 py-16">
        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">{t('home.errorLoading')}</p>
            <p>{error}</p>
          </div>
        )}

        {/* Hot Deals Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            {t('home.hotDeals')}
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
                  {t('common.showMore')}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-text-muted">
              {t('home.noProperties')}
            </p>
          )}
        </section>

        {/* Popular Projects Section - Placeholder */}
        <section className="mb-16 p-8 bg-background-secondary rounded-lg text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            {t('home.popularProjects')}
          </h2>
          <p className="text-text-muted">
            {t('home.projectsComingSoon')}
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
        error: context.locale === 'de' ? 'Immobilien konnten nicht geladen werden. Bitte versuchen Sie es später erneut.' : 'Unable to load properties. Please try again later.',
      },
    };
  }
};
