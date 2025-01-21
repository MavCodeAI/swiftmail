import { Github, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white/50 backdrop-blur-sm border-t border-purple-100 dark:border-gray-700 dark:bg-gray-900/50 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-muted-foreground">
              SwiftMail © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-600 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};