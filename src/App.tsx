import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { TempMail } from "@/components/TempMail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Features from "@/pages/Features";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import { Analytics } from "@/components/Analytics";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Legal from "@/pages/Legal";
import Support from "@/pages/Support";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Analytics />
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
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/support" element={<Support />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
