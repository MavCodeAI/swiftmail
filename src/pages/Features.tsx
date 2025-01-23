import { motion } from "framer-motion";
import { Shield, Clock, RefreshCw, Lock, Mail, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your temporary emails are encrypted and automatically deleted after 24 hours.",
  },
  {
    icon: Clock,
    title: "Instant Access",
    description: "No registration required. Get a temporary email address in seconds.",
  },
  {
    icon: RefreshCw,
    title: "Auto Refresh",
    description: "Inbox automatically refreshes to show new messages in real-time.",
  },
  {
    icon: Lock,
    title: "No Personal Info",
    description: "Protect your privacy by using disposable email addresses.",
  },
  {
    icon: Mail,
    title: "Multiple Addresses",
    description: "Create as many temporary email addresses as you need.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Receive emails instantly with our high-performance infrastructure.",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
          Features
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need for secure temporary email communication
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="glass p-6 rounded-lg h-full border border-purple-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
