import { TempMail } from "@/components/TempMail";
import { Layout } from "@/components/Layout";
import { Analytics } from "@/components/Analytics";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SEO } from "@/components/SEO";

// Pages
import { Home } from "@/pages/Home";
import { Features } from "@/pages/Features";
import { HowItWorks } from "@/pages/HowItWorks";
import { FAQ } from "@/pages/FAQ";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { CookiePolicy } from "@/pages/CookiePolicy";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Blog } from "@/pages/Blog";
import { Support } from "@/pages/Support";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="swiftmail-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HashRouter>
            <SEO />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </Layout>
            <Analytics />
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                className: 'dark:bg-gray-800/90 dark:text-white',
              }}
            />
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
