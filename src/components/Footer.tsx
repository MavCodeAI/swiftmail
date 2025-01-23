import { Mail, Shield, Globe, Heart, Twitter, Github } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Privacy", href: "/privacy" },
    { name: "FAQ", href: "/faq" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      to={href}
      className="group relative inline-block text-sm text-muted-foreground transition-colors hover:text-purple-600"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-gradient-to-r from-purple-600 to-purple-600 opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full glass border-t border-purple-100 dark:border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                SwiftMail
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Secure, instant temporary email service. 
              Protect your privacy with disposable email addresses.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="button-hover rounded-full" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="button-hover rounded-full" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="button-hover rounded-full" aria-label="Website">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Product</h2>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Resources</h2>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Legal</h2>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>
                    {link.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} SwiftMail. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for privacy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};