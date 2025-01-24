import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function Terms() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 2025</p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing and using SwiftMail's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p className="text-muted-foreground mb-4">
            SwiftMail provides temporary email services that allow users to receive emails at disposable email addresses. These addresses are temporary and will expire after a set period.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
          <p className="text-muted-foreground mb-4">
            You agree not to use SwiftMail for:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Any illegal activities</li>
            <li>Spamming or harassment</li>
            <li>Distribution of malware or harmful content</li>
            <li>Attempting to damage or disrupt our service</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">4. Service Limitations</h2>
          <p className="text-muted-foreground mb-4">
            SwiftMail is provided "as is" and we make no guarantees about:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Email delivery or retention time</li>
            <li>Service availability or uptime</li>
            <li>Data persistence beyond the stated retention period</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to modify these terms at any time. Continued use of SwiftMail after changes constitutes acceptance of the new terms.
          </p>
        </Card>
      </div>
    </div>
  );
}
