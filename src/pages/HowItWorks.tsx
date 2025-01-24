import { motion } from "framer-motion";
import { Mail, Copy, Inbox, Trash } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Get Your Email",
    description: "Click 'Generate Email' to instantly create a new temporary email address.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: Copy,
    title: "Use Your Email",
    description: "Copy the email address and use it wherever you need a temporary email.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Inbox,
    title: "Receive Messages",
    description: "Messages appear instantly in your inbox. No refresh needed.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Trash,
    title: "Auto Cleanup",
    description: "After 24 hours, your temporary email and all messages are automatically deleted.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/20",
  },
];

export function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
          How It Works
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get started with SwiftMail in just a few simple steps
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative mb-12 last:mb-0"
          >
            {index < steps.length - 1 && (
              <div className="absolute left-10 top-20 w-0.5 h-24 bg-gradient-to-b from-purple-200 to-transparent dark:from-purple-800" />
            )}
            <div className="flex items-start space-x-6">
              <div className={`p-4 rounded-xl ${step.bgColor} shrink-0`}>
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>
              <div className="glass p-6 rounded-lg flex-grow border border-purple-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
