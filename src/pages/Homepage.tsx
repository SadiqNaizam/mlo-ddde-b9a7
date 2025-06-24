import React from 'react';

// Custom Layout and Component Imports
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookshelfCarousel from '@/components/BookshelfCarousel';

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto text-center py-16 sm:py-24 px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Welcome to Your Digital Athenaeum
          </h1>
          <p className="mt-4 max-w-2xl mx-auto font-body text-lg text-muted-foreground">
            Discover new worlds, listen to stories brought to life, and build your personal library in a space designed for readers.
          </p>
        </section>

        {/* Bookshelf Carousel Section */}
        <div className="space-y-12 md:space-y-20 pb-16 md:pb-24">
          <BookshelfCarousel title="Featured New Arrivals" />
          <BookshelfCarousel title="Timeless Classics" />
          <BookshelfCarousel title="Current Bestsellers" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;