import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          PW Pattaya Global Real Estate Co.,Ltd
        </h1>
        <p className="text-lg text-text-secondary">
          Search for condo for lease, for long, rental or investment
        </p>

        {/* Homepage content will be built next */}
        <div className="mt-8 p-8 bg-background-secondary rounded-lg">
          <p className="text-text-muted">
            Homepage Hero Section & Property Listings coming soon...
          </p>
        </div>
      </main>
    </div>
  );
}
