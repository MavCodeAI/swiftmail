import { motion } from "framer-motion";
import { Shield, Lock, Trash, Eye } from "lucide-react";

const sections = [
  {
    icon: Shield,
    title: "Data Protection",
    content: [
      "We take your privacy seriously and implement strong security measures to protect your data.",
      "All emails are encrypted both in transit and at rest.",
      "We use industry-standard security protocols to prevent unauthorized access.",
    ],
  },
  {
    icon: Lock,
    title: "No Personal Information",
    content: [
      "We don't collect or store any personal information.",
      "No registration or personal details are required to use our service.",
      "We don't track users across websites or sell any data.",
    ],
  },
  {
    icon: Trash,
    title: "Automatic Deletion",
    content: [
      "All emails are automatically deleted after 24 hours.",
      "No backups or archives are kept after deletion.",
      "Once deleted, data cannot be recovered.",
    ],
  },
  {
    icon: Eye,
    title: "Transparency",
    content: [
      "We're transparent about our data handling practices.",
      "We don't share any information with third parties.",
      "Our service is designed with privacy as the top priority.",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your privacy is our top priority. Learn how we protect your data.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="glass p-6 rounded-lg h-full border border-purple-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <section.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground flex items-start">
                    <span className="mr-2 mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 text-center text-sm text-muted-foreground"
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mt-2">
          For any privacy-related questions, please contact us at privacy@swiftmail.com
        </p>
      </motion.div>
    </div>
  );
}
