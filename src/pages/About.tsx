export function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 mb-8">
          About SwiftMail
        </h1>
        
        <div className="prose prose-purple dark:prose-invert max-w-none">
          <p className="lead">
            SwiftMail is a secure, privacy-focused temporary email service designed to protect your inbox and personal information.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe in a world where privacy is a fundamental right, not a privilege. Our mission is to provide everyone with easy access to secure, disposable email addresses that protect their privacy online.
          </p>

          <h2>Why Choose SwiftMail?</h2>
          <ul>
            <li>Instant access with no registration required</li>
            <li>End-to-end encryption for maximum security</li>
            <li>Automatic message refresh and notifications</li>
            <li>Clean, modern interface that's easy to use</li>
            <li>No data collection or tracking</li>
          </ul>

          <h2>Our Commitment</h2>
          <p>
            At SwiftMail, we're committed to:
          </p>
          <ul>
            <li>Protecting your privacy</li>
            <li>Maintaining high security standards</li>
            <li>Providing reliable service</li>
            <li>Continuous improvement</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Contact our team at{" "}
            <a href="mailto:support@swiftmail.app">support@swiftmail.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
