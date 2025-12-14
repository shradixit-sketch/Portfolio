
import React from 'react';
import { ContentSection } from '../components/ContentSection';
import { PostCard } from '../components/PostCard';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';

export const BlogList: React.FC = () => {
  const { content } = useContent();
  const publishedPosts = content.blog.filter(post => post.published);

  return (
    <>
      <SEOHead pageSEO={{
        ...content.seo,
        title: 'Blog - Shradha Dixit | Insights on Analytics & AI Operations',
        description: 'Read articles and insights from Shradha Dixit on data analytics, AI operations, evaluation frameworks, and building trustworthy AI systems.',
        ogTitle: 'Blog - Shradha Dixit | Insights on Analytics & AI Operations',
        twitterTitle: 'Blog - Shradha Dixit | Insights on Analytics & AI Operations',
      }} />
      <ContentSection title="Latest Insights & Articles" description="Deep dives into data analytics, AI operations, and building trustworthy systems." className="pt-16 pb-8 md:pt-24 md:pb-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {publishedPosts.length > 0 ? (
            publishedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No blog posts published yet. Check back soon!
            </p>
          )}
        </div>
      </ContentSection>
    </>
  );
};
