
import React from 'react';
import { ContentSection } from '../components/ContentSection';
import { Card } from '../components/Card';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';

export const Services: React.FC = () => {
  const { content } = useContent();
  const { services } = content;

  return (
    <>
      <SEOHead pageSEO={{
        ...content.seo,
        title: 'Services - Shradha Dixit | Data Analytics & AI Operations',
        description: 'Explore Shradha Dixit\'s professional services in data analytics, business intelligence, AI output evaluation, data quality, and human-in-the-loop systems.',
        ogTitle: 'Services - Shradha Dixit | Data Analytics & AI Operations',
        twitterTitle: 'Services - Shradha Dixit | Data Analytics & AI Operations',
      }} />
      <ContentSection title="My Expertise & Services" description="Offering specialized services at the intersection of data analytics, business intelligence, and advanced AI operations." className="pt-16 pb-8 md:pt-24 md:pb-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service) => (
            <Card key={service.id} className="p-6 text-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="How I Deliver Value" className="py-12 md:py-16 bg-background dark:bg-backgroundDark">
        <div className="max-w-4xl mx-auto text-center space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>
            My approach is rooted in clarity, analytical rigor, and a commitment to building trust.
            I work closely with clients to understand their unique challenges, translate complex requirements into actionable plans,
            and deliver solutions that are not only technically sound but also strategically aligned.
          </p>
          <p>
            Whether it's optimizing data pipelines for business intelligence or designing robust evaluation frameworks for cutting-edge AI models,
            my focus remains on enabling informed decisions and ensuring system reliability.
          </p>
        </div>
      </ContentSection>
    </>
  );
};
