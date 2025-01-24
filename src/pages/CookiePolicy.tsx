export function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 mb-8">
          Cookie Policy
        </h1>
        
        <div className="prose prose-purple dark:prose-invert max-w-none">
          <p className="lead">
            This Cookie Policy explains how SwiftMail uses cookies and similar tracking technologies on our website.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They help make websites work more efficiently and provide information to website owners.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul>
            <li>Essential cookies: Required for the website to function properly</li>
            <li>Preference cookies: Remember your settings and preferences</li>
            <li>Analytics cookies: Help us understand how visitors use our website</li>
          </ul>

          <h2>Types of Cookies We Use</h2>
          <h3>Essential Cookies</h3>
          <ul>
            <li>Session management</li>
            <li>Security features</li>
            <li>Basic functionality</li>
          </ul>

          <h3>Preference Cookies</h3>
          <ul>
            <li>Theme preferences</li>
            <li>Language settings</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{" "}
            <a href="mailto:privacy@swiftmail.app">privacy@swiftmail.app</a>
          </p>

          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: January 24, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
