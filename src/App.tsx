
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationDetail from "./pages/LocationDetail";

const queryClient = new QueryClient();

const App = () => {
  // Add keyboard focus styles for accessibility
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
      
      window.removeEventListener('mousedown', handleMouseDown);
      window.addEventListener('keydown', handleFirstTab);
    };
    
    window.addEventListener('keydown', handleFirstTab);
    
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
