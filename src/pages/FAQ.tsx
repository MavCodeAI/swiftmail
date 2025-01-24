import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "What is SwiftMail?",
    answer:
      "SwiftMail is a secure temporary email service that provides disposable email addresses. You can use these addresses to protect your privacy when signing up for services or receiving one-time emails.",
  },
  {
    question: "How long do temporary emails last?",
    answer:
      "Temporary email addresses and all associated messages are automatically deleted after 24 hours. This helps maintain privacy and keeps our service clean.",
  },
  {
    question: "Is SwiftMail free to use?",
    answer:
      "Yes, SwiftMail is completely free to use. There are no hidden charges or premium features - all functionality is available to everyone.",
  },
  {
    question: "Can I send emails from my temporary address?",
    answer:
      "No, SwiftMail is a receive-only service. This helps prevent abuse and maintains the integrity of our service.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All emails are encrypted, and we don't store any personal information. Messages are automatically deleted after 24 hours.",
  },
  {
    question: "Can I create multiple email addresses?",
    answer:
      "Yes, you can create as many temporary email addresses as you need. Each address is completely separate and has its own inbox.",
  },
  {
    question: "Do I need to register to use SwiftMail?",
    answer:
      "No registration is required. Simply visit our website and generate a temporary email address instantly.",
  },
  {
    question: "What if I don't receive an expected email?",
    answer:
      "First, check your spam folder. If you still don't see it, make sure the sender typed the address correctly. Some services may also block temporary email addresses.",
  },
];

export function FAQ() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about SwiftMail
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="glass border border-purple-100 dark:border-gray-700 rounded-lg">
                <AccordionTrigger className="px-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
