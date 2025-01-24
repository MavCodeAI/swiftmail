import { Shield, Zap, RefreshCcw } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20" />
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient-x pb-2">
            SwiftMail
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Secure, instant temporary email service. Protect your privacy with disposable email addresses.
          </p>
        </div>
      </div>
    </div>
  );
}
