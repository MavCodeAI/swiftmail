import { Mail, Shield, Clock, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full glass border-b border-purple-100 dark:border-gray-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400 animate-float" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 animate-gradient">
                  SwiftMail
                </h1>
                <p className="text-sm text-muted-foreground">
                  Secure Temporary Email Service
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <RefreshCcw className="h-4 w-4 text-purple-500" />
              <span>Auto Refresh</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/features">
              <Button variant="ghost" className="text-sm button-hover">
                Features
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="ghost" className="text-sm button-hover">
                How It Works
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="ghost" className="text-sm button-hover">
                FAQ
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};