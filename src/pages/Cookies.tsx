import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Cookies() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2025</p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand user behavior (via Umami)</li>
            <li>Preference cookies to remember your settings</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Essential Cookies</h3>
              <p className="text-muted-foreground">
                Required for basic website functionality. These cannot be disabled.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Analytics Cookies (Umami)</h3>
              <p className="text-muted-foreground">
                Help us understand how visitors interact with our website. These are privacy-focused and don't collect personal data.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact the functionality of our service.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Privacy Consideration</h2>
          <p className="text-muted-foreground mb-4">
            We respect your privacy and only use essential cookies and privacy-focused analytics. We do not use cookies for advertising or tracking across other websites.
          </p>
        </Card>
      </div>
    </div>
  );
}
