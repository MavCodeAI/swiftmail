import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { HoverLink } from "@/components/ui/hover-link";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoverLink to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Mail className="h-6 w-6 text-primary" />
              <motion.div
                className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="hidden font-bold sm:inline-block">
              SwiftMail
            </span>
          </HoverLink>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <div className="hidden gap-2 md:flex">
            {[
              { path: '/features', label: 'Features' },
              { path: '/how-it-works', label: 'How It Works' },
              { path: '/faq', label: 'FAQ' }
            ].map((item) => (
              <HoverLink key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="relative h-8 w-full rounded-full px-4 text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Button>
              </HoverLink>
            ))}
          </div>
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
};