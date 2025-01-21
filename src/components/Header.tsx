import { Mail } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full bg-white/50 backdrop-blur-sm border-b border-purple-100 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            SwiftMail
          </h1>
        </div>
        <p className="text-sm text-muted-foreground hidden sm:block">
          Secure Temporary Email Service
        </p>
      </div>
    </header>
  );
};