import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Legal Information</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
          Important legal documents and information about SwiftMail's services.
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="terms">
              <AccordionTrigger>Terms of Service</AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using SwiftMail's services, you agree to be bound by these Terms of Service.
                  </p>

                  <h3>2. Service Description</h3>
                  <p>
                    SwiftMail provides temporary email services for personal and business use.
                  </p>

                  <h3>3. User Responsibilities</h3>
                  <p>
                    Users must not use the service for illegal activities or spam distribution.
                  </p>

                  <h3>4. Service Limitations</h3>
                  <p>
                    Temporary emails are available for a limited time and may be deleted after expiration.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger>Privacy Policy</AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    For detailed information about our privacy practices, please visit our{" "}
                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    page.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies">
              <AccordionTrigger>Cookie Policy</AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    We use essential cookies to ensure the basic functionality of our website.
                    No personal data is collected through cookies.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="disclaimer">
              <AccordionTrigger>Disclaimer</AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    SwiftMail provides its services "as is" without any warranties.
                    We are not responsible for any damages arising from the use of our services.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Contact Legal Department</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                For legal inquiries, please contact us at:{" "}
                <a
                  href="mailto:legal@swiftmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  legal@swiftmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;
