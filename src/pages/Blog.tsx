import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    title: "Why You Need a Temporary Email Service",
    date: "January 2025",
    description: "Learn about the benefits of using temporary email addresses for online privacy and spam prevention.",
    readTime: "5 min read"
  },
  {
    title: "Best Practices for Online Privacy",
    date: "January 2025",
    description: "Discover essential tips and tricks to protect your privacy while browsing the internet.",
    readTime: "7 min read"
  },
  {
    title: "How to Avoid Email Spam",
    date: "January 2025",
    description: "Practical strategies to keep your inbox clean and protect yourself from unwanted emails.",
    readTime: "6 min read"
  }
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">SwiftMail Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
          Stay updated with the latest news, tips, and insights about email privacy and security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {post.date} · {post.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
                  <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                    Read more →
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
