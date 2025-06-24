import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BookOpen, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  bookId: string;
  title: string;
  author: string;
  imageUrl: string;
  isPurchased?: boolean;
  className?: string;
}

const BookCover: React.FC<BookCoverProps> = ({
  bookId,
  title,
  author,
  imageUrl,
  isPurchased = false,
  className,
}) => {
  console.log('BookCover loaded for:', title);

  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if the button is inside a Link
    e.stopPropagation();
    // In a real app, this would trigger a purchase flow (e.g., add to cart)
    console.log(`Purchase initiated for book ID: ${bookId}`);
    // You could use sonner/toast here to give feedback
  };

  return (
    <div style={{ perspective: '1000px' }} className={cn('group relative w-full', className)}>
      <motion.div
        className="relative w-full rounded-md shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{
          scale: 1.05,
          rotateY: -8,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        <Link to={`/book-detail?id=${bookId}`} aria-label={`View details for ${title}`}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x600'}
            alt={`Cover of ${title}`}
            className="w-full h-auto aspect-[2/3] object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
        </Link>
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-2 w-full max-w-[80%]">
              {isPurchased ? (
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                  <Link to={`/digital-reader?id=${bookId}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Online
                  </Link>
                </Button>
              ) : (
                <Button onClick={handlePurchase} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Purchase
                </Button>
              )}
               <Button asChild variant="secondary" className="shadow-md">
                  <Link to={`/book-detail?id=${bookId}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                  </Link>
              </Button>
            </div>
            <div className="mt-4 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                <h3 className="font-heading text-lg font-semibold leading-tight line-clamp-2">{title}</h3>
                <p className="font-body text-sm text-primary-foreground/80">{author}</p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookCover;