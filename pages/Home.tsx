
import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ContentSection } from '../components/ContentSection';
import { Card } from '../components/Card';
import { ProjectCard } from '../components/ProjectCard';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';
// Fix: Add missing import for Button component
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const { content } = useContent();
  const { hero, intro, skills, portfolioHighlights } = content.home;

  return (
    <>
      <SEOHead /> {/* Uses default site-wide SEO */}
      <HeroSection content={hero} />

      <ContentSection title={intro.title} description={intro.description} className="bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {skills.map((skill, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-4 text-primary dark:text-secondary">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="Portfolio Highlights" description="A glimpse into projects spanning analytics and AI operations." className="bg-background dark:bg-backgroundDark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {portfolioHighlights.map((highlight) => {
            // Find the full project details from content.portfolio
            const project = content.portfolio.find(p => p.id === highlight.id);
            if (!project) return null; // Skip if project not found
            return (
              <ProjectCard key={project.id} project={project} />
            );
          })}
        </div>
      </ContentSection>

      <ContentSection title="Ready to Build Trustworthy Systems?" className="bg-primary text-white py-16">
        <div className="text-center">
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how data-driven insights and robust AI operations can elevate your projects.
          </p>
          <Button asChild to="/contact" size="lg" variant="secondary" className="mx-2">
            Get in Touch
          </Button>
          <Button asChild to="/portfolio" size="lg" variant="outline" className="mx-2 bg-transparent border-white text-white hover:bg-white hover:text-primary">
            View All Work
          </Button>
        </div>
      </ContentSection>
    </>
  );
};
