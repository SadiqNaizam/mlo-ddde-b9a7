import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AccountPage from "./pages/AccountPage";
import BookDetailPage from "./pages/BookDetailPage";
import DigitalReaderPage from "./pages/DigitalReaderPage";
import Homepage from "./pages/Homepage";
import LibraryPage from "./pages/LibraryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/book-detail" element={<BookDetailPage />} />
          <Route path="/digital-reader" element={<DigitalReaderPage />} />
          <Route path="/library" element={<LibraryPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
