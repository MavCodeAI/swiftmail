import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const blogPosts = [
  {
    slug: "why-you-need-temporary-email",
    title: "Why You Need a Temporary Email Service: A Complete Guide to Email Privacy",
    date: "January 23, 2025",
    description: "Discover how temporary email services can protect your privacy, prevent spam, and keep your main inbox clean. Learn about the benefits and best practices of using disposable email addresses.",
    readTime: "10 min read",
    image: "/blog/email-privacy.jpg",
    tags: ["email privacy", "temporary email", "spam prevention", "online security"]
  },
  {
    slug: "best-practices-online-privacy",
    title: "Best Practices for Online Privacy: A Comprehensive Guide to Digital Security",
    date: "January 23, 2025",
    description: "Learn essential strategies and tools to protect your privacy online. From secure browsing to data protection, discover how to stay safe in the digital world.",
    readTime: "12 min read",
    image: "/blog/online-privacy.jpg",
    tags: ["online privacy", "digital security", "cybersecurity", "data protection"]
  },
  {
    slug: "how-to-avoid-email-spam",
    title: "How to Avoid Email Spam: Ultimate Guide to Keep Your Inbox Clean",
    date: "January 23, 2025",
    description: "Master the art of spam prevention with our comprehensive guide. Learn effective strategies, tools, and best practices to keep your inbox spam-free and secure.",
    readTime: "11 min read",
    image: "/blog/avoid-spam.jpg",
    tags: ["email spam", "inbox management", "email security", "privacy protection"]
  }
];

export function Blog() {
  return (
    <>
      <Helmet>
        <title>SwiftMail Blog - Email Privacy & Security Tips</title>
        <meta name="description" content="Stay updated with the latest news, tips, and insights about email privacy, security, and best practices for managing your online presence." />
        <meta name="keywords" content="email privacy, temporary email, online security, spam prevention, digital privacy, cybersecurity tips" />
        <meta property="og:title" content="SwiftMail Blog - Email Privacy & Security Tips" />
        <meta property="og:description" content="Expert advice on email privacy, security, and digital well-being. Learn how to protect your online presence with SwiftMail's comprehensive guides." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swiftmail.vercel.app/blog" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://swiftmail.vercel.app/blog" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-center">SwiftMail Blog</h1>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Expert insights and guides on email privacy, security, and digital well-being. 
            Stay informed about the latest trends and best practices in online privacy protection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full no-underline">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {post.date} · {post.readTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
