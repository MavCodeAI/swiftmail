import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from 'next-mdx-remote';
import { serializeMDX } from "@/lib/mdx";
import "highlight.js/styles/github-dark.css";

interface BlogPost {
  content: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
  };
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 ml-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 ml-4" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  a: (props: any) => (
    <a className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto" {...props} />
  ),
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        
        // Import the MDX file dynamically
        const postModule = await import(`../content/blog/${slug}.mdx`);
        
        // Extract frontmatter and content
        const { default: content, metadata } = postModule;
        
        // Serialize the MDX content
        const mdxSource = await serializeMDX(content);
        
        setPost({
          content: content,
          metadata: {
            title: metadata.title,
            description: metadata.description,
            date: metadata.date,
            author: metadata.author,
            image: metadata.image,
            tags: metadata.tags,
          },
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error("Error loading blog post:", error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!post || !mdxSource) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{post.metadata.title} - SwiftMail Blog</title>
        <meta name="description" content={post.metadata.description} />
        <meta name="keywords" content={post.metadata.tags.join(", ")} />
        <meta property="og:title" content={`${post.metadata.title} - SwiftMail Blog`} />
        <meta property="og:description" content={post.metadata.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.metadata.image} />
        <meta property="article:published_time" content={post.metadata.date} />
        <meta property="article:author" content={post.metadata.author} />
        {post.metadata.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-transparent"
            onClick={() => navigate("/blog")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-12">
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{post.metadata.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{post.metadata.date}</span>
                  <span>•</span>
                  <span>{post.metadata.author}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <div className="mdx-content prose dark:prose-invert max-w-none">
              <MDXProvider components={components}>
                <MDXRemote {...mdxSource} components={components} />
              </MDXProvider>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
