
import React from 'react';
import { ContentSection } from '../components/ContentSection';
import { Card } from '../components/Card';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { renderHtml } from '../utils/htmlParser';

export const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <>
      <SEOHead pageSEO={content.seo} />
      <ContentSection title="About Shradha Dixit" className="pt-16 pb-8 md:pt-24 md:pb-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={renderHtml(about.summary)}></p>
        </div>
      </ContentSection>

      <ContentSection title="What I Do Best" className="py-8 md:py-12 bg-background dark:bg-backgroundDark">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card>
            <h3 className="text-2xl font-semibold text-primary mb-4">Analytics & Business Intelligence</h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={renderHtml(about.analyticsExpertise)}></div>
          </Card>
          <Card>
            <h3 className="text-2xl font-semibold text-secondary mb-4">AI Operations & Model Evaluation</h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={renderHtml(about.aiOpsMindset)}></div>
          </Card>
        </div>
      </ContentSection>

      <ContentSection title={about.philosophyTitle} className="py-8 md:py-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <Card className="!bg-primary/10 dark:!bg-primary/20 p-6 flex items-start space-x-4">
            <span className="text-2xl md:text-3xl text-primary">💡</span>
            <p className="flex-1 whitespace-pre-line leading-relaxed">{about.philosophyAnalytics}</p>
          </Card>
          <Card className="!bg-secondary/10 dark:!bg-secondary/20 p-6 flex items-start space-x-4">
            <span className="text-2xl md:text-3xl text-secondary">🤖</span>
            <p className="flex-1 whitespace-pre-line leading-relaxed">{about.philosophyAIOps}</p>
          </Card>
          <Card className="!bg-purple-100 dark:!bg-purple-900 p-6 flex items-start space-x-4">
            <span className="text-2xl md:text-3xl text-purple-600">➡️</span>
            <p className="flex-1 leading-relaxed">{about.philosophyCombined}</p>
          </Card>
        </div>
      </ContentSection>

      <ContentSection title="Tools & Skills" className="py-8 md:py-12 bg-background dark:bg-backgroundDark">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card>
            <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-4">Analytics</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {about.toolsSkills.analytics.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-4">AI Operations</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {about.toolsSkills.aiOperations.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </Card>
        </div>
      </ContentSection>
    </>
  );
};
