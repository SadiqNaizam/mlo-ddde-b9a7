import React from 'react';

// ShadCN UI Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Custom Components
import BookCover from '@/components/BookCover'; // Assuming this component exists and accepts a `book` prop

// Define the shape of a book object for props.
// This should align with what the BookCover component expects.
interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverArtUrl: string;
}

// Mock Data for demonstration purposes
const mockBooks: Book[] = [
  { id: '1', slug: 'the-great-gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', coverArtUrl: 'https://placehold.co/300x450/6e4c35/f8f4e3?text=The+Great\\nGatsby' },
  { id: '2', slug: 'to-kill-a-mockingbird', title: 'To Kill a Mockingbird', author: 'Harper Lee', coverArtUrl: 'https://placehold.co/300x450/4a4a4a/f8f4e3?text=To+Kill+A\\nMockingbird' },
  { id: '3', slug: '1984', title: '1984', author: 'George Orwell', coverArtUrl: 'https://placehold.co/300x450/c23b22/f8f4e3?text=1984' },
  { id: '4', slug: 'pride-and-prejudice', title: 'Pride and Prejudice', author: 'Jane Austen', coverArtUrl: 'https://placehold.co/300x450/7a5c8c/f8f4e3?text=Pride+\\&\\nPrejudice' },
  { id: '5', slug: 'the-catcher-in-the-rye', title: 'The Catcher in the Rye', author: 'J.D. Salinger', coverArtUrl: 'https://placehold.co/300x450/d9a400/1e1e1e?text=Catcher\\nin+the+Rye' },
  { id: '6', slug: 'moby-dick', title: 'Moby Dick', author: 'Herman Melville', coverArtUrl: 'https://placehold.co/300x450/2c5d7c/f8f4e3?text=Moby\\nDick' },
  { id: '7', slug: 'wuthering-heights', title: 'Wuthering Heights', author: 'Emily Brontë', coverArtUrl: 'https://placehold.co/300x450/5b3e5b/f8f4e3?text=Wuthering\\nHeights' },
  { id: '8', slug: 'jane-eyre', title: 'Jane Eyre', author: 'Charlotte Brontë', coverArtUrl: 'https://placehold.co/300x450/8a6e50/f8f4e3?text=Jane\\nEyre' },
];

interface BookshelfCarouselProps {
  title: string;
  books?: Book[]; // Make books optional, will use mock data if not provided
}

const BookshelfCarousel: React.FC<BookshelfCarouselProps> = ({ title, books = mockBooks }) => {
  console.log('BookshelfCarousel loaded');

  return (
    // The main container that mimics the bookshelf unit, using the primary theme color for a 'wood' look.
    <section 
      className="w-full bg-gradient-to-br from-primary via-primary/90 to-primary py-12 px-4 shadow-lg" 
      aria-labelledby="carousel-title"
    >
      <div className="container mx-auto">
        <h2 
          id="carousel-title" 
          className="text-4xl font-heading text-primary-foreground text-center mb-8"
        >
          {title}
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: books.length > 5, // Only loop if there are enough books to scroll
          }}
          className="w-full relative group"
        >
          {/* This div represents the physical shelf plank the books sit on */}
          <div className="absolute bottom-[1rem] left-0 right-0 h-3 bg-black/30 rounded-sm shadow-inner" />

          <CarouselContent className="-ml-4 pb-8">
            {books.map((book) => (
              <CarouselItem 
                key={book.id} 
                className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 basis-1/2 flex items-end justify-center"
              >
                {/* BookCover is assumed to have its own styling, like a 3D lift on hover */}
                <BookCover book={book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation buttons, styled to be subtle and match the theme */}
          <CarouselPrevious className="ml-[-1rem] md:ml-[-2rem] bg-background/80 hover:bg-background text-foreground border-2 border-primary/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="mr-[-1rem] md:mr-[-2rem] bg-background/80 hover:bg-background text-foreground border-2 border-primary/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>
      </div>
    </section>
  );
};

export default BookshelfCarousel;