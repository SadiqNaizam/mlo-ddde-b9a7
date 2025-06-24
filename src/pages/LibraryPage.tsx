import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import BookCover from '@/components/BookCover';

// ShadCN UI Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Define the shape of a book in the user's library
interface LibraryBook {
  id: string;
  title: string;
  author: string;
  coverArtUrl: string;
  isAudiobook: boolean;
  progress: number; // Percentage from 0 to 100
}

// Mock data for the user's library. In a real app, this would come from an API.
const userLibrary: LibraryBook[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', coverArtUrl: 'https://placehold.co/300x450/6e4c35/f8f4e3?text=The+Great\\nGatsby', isAudiobook: true, progress: 75 },
  { id: '3', title: '1984', author: 'George Orwell', coverArtUrl: 'https://placehold.co/300x450/c23b22/f8f4e3?text=1984', isAudiobook: false, progress: 20 },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', coverArtUrl: 'https://placehold.co/300x450/7a5c8c/f8f4e3?text=Pride+\\&\\nPrejudice', isAudiobook: false, progress: 100 },
  { id: '6', title: 'Moby Dick', author: 'Herman Melville', coverArtUrl: 'https://placehold.co/300x450/2c5d7c/f8f4e3?text=Moby\\nDick', isAudiobook: true, progress: 10 },
  { id: '8', title: 'Jane Eyre', author: 'Charlotte Brontë', coverArtUrl: 'https://placehold.co/300x450/8a6e50/f8f4e3?text=Jane\\nEyre', isAudiobook: false, progress: 55 },
  { id: '9', title: 'The Hobbit', author: 'J.R.R. Tolkien', coverArtUrl: 'https://placehold.co/300x450/2a5a2a/f8f4e3?text=The\\nHobbit', isAudiobook: true, progress: 90 },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');

  const audiobooks = userLibrary.filter(book => book.isAudiobook);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-heading text-foreground mb-4">My Library</h1>
          <p className="text-muted-foreground mb-8">All your purchased books and audiobooks in one place.</p>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="all">All Titles</TabsTrigger>
              <TabsTrigger value="audiobooks">Audiobooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                {userLibrary.map((book) => (
                  <div key={book.id} className="flex flex-col gap-3">
                    <BookCover
                      bookId={book.id}
                      title={book.title}
                      author={book.author}
                      imageUrl={book.coverArtUrl}
                      isPurchased={true}
                    />
                    <div className="flex flex-col gap-1.5">
                       <span className="text-xs font-body text-muted-foreground">{book.progress}% complete</span>
                       <Progress value={book.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="audiobooks" className="mt-8">
               {audiobooks.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                    {audiobooks.map((book) => (
                      <div key={book.id} className="flex flex-col gap-3">
                        <BookCover
                          bookId={book.id}
                          title={book.title}
                          author={book.author}
                          imageUrl={book.coverArtUrl}
                          isPurchased={true}
                        />
                         <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-body text-muted-foreground">{book.progress}% complete</span>
                            <Progress value={book.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
               ) : (
                <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground font-body">You don't have any audiobooks yet.</p>
                </div>
               )}
            </TabsContent>
          </Tabs>

        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default LibraryPage;