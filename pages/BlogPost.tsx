
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { renderHtml } from '../utils/htmlParser';
import { Button } from '../components/Button';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useContent();
  const [post, setPost] = useState(content.blog.find(p => p.slug === slug && p.published));

  // If the post is not found or not published, navigate to 404
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Effect to ensure `post` state is up-to-date if content changes
  useEffect(() => {
    const foundPost = content.blog.find(p => p.slug === slug && p.published);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [content.blog, slug]);

  const postSEO = post.seo || content.seo; // Use post-specific SEO if available, otherwise global

  return (
    <>
      <SEOHead pageSEO={postSEO} />
      <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-textLight dark:text-textDark mb-4">
            {post.title}
          </h1>
          <div className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            By <span className="font-semibold">{post.author}</span> on {post.date}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
            {post.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg shadow-md mb-12"
          />
        )}

        <div
          className="prose dark:prose-invert prose-lg max-w-none text-textLight dark:text-textDark leading-relaxed"
          dangerouslySetInnerHTML={renderHtml(post.content)}
        ></div>

        <div className="mt-12 pt-8 border-t border-border dark:border-borderDark text-center">
          <Button asChild to="/blog" variant="outline">
            ← Back to Blog
          </Button>
        </div>
      </article>
    </>
  );
};
