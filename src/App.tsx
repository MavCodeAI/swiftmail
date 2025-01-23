import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TempMail } from "@/components/TempMail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Features from "@/pages/Features";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import { Analytics } from "@/components/Analytics";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Analytics />
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Header />
            <main className="flex-grow">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<TempMail />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
