import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookCover from '@/components/BookCover';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Icons
import { ShoppingCart, BookOpen, Headphones, Star, StarHalf } from 'lucide-react';

// Mock data for a single book. In a real app, this would be fetched based on the ID from the URL.
const mockBook = {
  id: 'a-tale-of-two-cities',
  title: 'A Tale of Two Cities',
  author: 'Charles Dickens',
  coverArtUrl: 'https://placehold.co/400x600/6e4c35/f8f4e3?text=A+Tale+of%0ATwo+Cities',
  isPurchased: false,
  rating: 4.5,
  reviewsCount: 1887,
  synopsis: "A Tale of Two Cities is an 1859 historical novel by Charles Dickens, set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris, and his release to live in London with his daughter Lucie, whom he had never met.",
  details: {
    publisher: "Chapman & Hall",
    publicationDate: "November 21, 1859",
    pages: 448,
    isbn: "978-0141439600",
    genre: "Historical Fiction"
  },
  authorBio: "Charles John Huffam Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era. His works enjoyed unprecedented popularity during his lifetime and, by the 20th century, critics and scholars had recognised him as a literary genius.",
  reviews: [
    { id: 1, user: "Jane D.", rating: 5, comment: "An absolute masterpiece. The characters are unforgettable, and the story is timeless. A must-read!" },
    { id: 2, user: "John S.", rating: 4, comment: "A bit of a slow start, but the payoff is immense. The final chapters are some of the most powerful I've ever read." },
    { id: 3, user: "Emily R.", rating: 5, comment: "Dickens' prose is beautiful. I was completely engrossed from start to finish." }
  ]
};

const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-5 h-5 text-yellow-500 fill-current" />)}
        {halfStar && <StarHalf className="w-5 h-5 text-yellow-500 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-300" />)}
      </div>
      <span className="text-muted-foreground font-body text-sm">({count} reviews)</span>
    </div>
  );
};


const BookDetailPage = () => {
  console.log('BookDetailPage loaded');
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('id');

  // In a real app, you'd use the `bookId` to fetch data.
  // For this example, we'll just use the mock data regardless of the ID.
  const book = mockBook;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="font-body">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/library" className="font-body">Library</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-heading font-semibold">{book.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            <aside className="md:col-span-1 lg:col-span-1">
              <BookCover
                bookId={book.id}
                title={book.title}
                author={book.author}
                imageUrl={book.coverArtUrl}
                isPurchased={book.isPurchased}
              />
            </aside>

            <div className="md:col-span-2 lg:col-span-3">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold">{book.title}</h1>
              <p className="font-body text-xl text-muted-foreground mt-2">by {book.author}</p>
              
              <div className="my-4">
                <StarRating rating={book.rating} count={book.reviewsCount} />
              </div>

              <p className="font-body text-base lg:text-lg leading-relaxed mt-4 max-w-prose">
                {book.synopsis}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {book.isPurchased ? (
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to={`/digital-reader?id=${book.id}`}>
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Online
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Purchase for $12.99
                  </Button>
                )}
                 <Button size="lg" variant="secondary">
                    <Headphones className="mr-2 h-5 w-5" />
                    Listen to a Sample
                  </Button>
              </div>

              <Accordion type="single" collapsible className="w-full mt-8 max-w-prose">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-heading text-lg">Book Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 font-body text-muted-foreground">
                      <li className="flex justify-between"><span>Publisher:</span> <span>{book.details.publisher}</span></li>
                      <li className="flex justify-between"><span>Publication Date:</span> <span>{book.details.publicationDate}</span></li>
                      <li className="flex justify-between"><span>Pages:</span> <span>{book.details.pages}</span></li>
                      <li className="flex justify-between"><span>Genre:</span> <span>{book.details.genre}</span></li>
                      <li className="flex justify-between"><span>ISBN:</span> <span>{book.details.isbn}</span></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <Separator className="my-12" />

          <Tabs defaultValue="author" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="author" className="font-heading">About the Author</TabsTrigger>
              <TabsTrigger value="reviews" className="font-heading">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="author" className="mt-6">
               <Card className="bg-card">
                <CardContent className="pt-6">
                  <p className="font-body text-base leading-relaxed">{book.authorBio}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="font-heading">Reader Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {book.reviews.map(review => (
                     <div key={review.id}>
                        <div className="flex items-center gap-4">
                            <div className="font-semibold font-body">{review.user}</div>
                            <StarRating rating={review.rating} count={0} />
                        </div>
                        <p className="font-body text-muted-foreground mt-2">"{review.comment}"</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetailPage;