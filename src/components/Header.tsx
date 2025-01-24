import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                SwiftMail
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              Features
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              How It Works
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
              FAQ
            </Link>
            <ModeToggle />
          </nav>

          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              onClick={() => {
                // Toggle mobile menu
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}