import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Features } from "./Features";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Features />
      <Footer />
    </div>
  );
}
