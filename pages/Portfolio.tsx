
import React, { useState, useEffect } from 'react';
import { ContentSection } from '../components/ContentSection';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectCategory } from '../types';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/Button';

export const Portfolio: React.FC = () => {
  const { content } = useContent();
  const { portfolio } = content;
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = portfolio.filter(
    (project) => filter === 'All' || project.category === filter
  );

  // Scroll to project if hash exists on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setSelectedProject(hash); // Highlight or open details if needed
        }
      }, 100); // Small delay to ensure content is rendered
    }
  }, []);

  return (
    <>
      <SEOHead pageSEO={{
        ...content.seo,
        title: 'Portfolio - Shradha Dixit | Analytics & AI Operations Projects',
        description: 'View Shradha Dixit\'s portfolio of projects in data analytics, business intelligence, AI operations, and AI evaluation frameworks.',
        ogTitle: 'Portfolio - Shradha Dixit | Analytics & AI Operations Projects',
        twitterTitle: 'Portfolio - Shradha Dixit | Analytics & AI Operations Projects',
      }} />
      <ContentSection title="My Work & Projects" description="Showcasing a selection of projects highlighting expertise in data analytics and AI operations." className="pt-16 pb-8 md:pt-24 md:pb-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="flex justify-center mb-8 space-x-4">
          <Button
            variant={filter === 'All' ? 'primary' : 'outline'}
            onClick={() => setFilter('All')}
          >
            All
          </Button>
          <Button
            variant={filter === 'Analytics' ? 'primary' : 'outline'}
            onClick={() => setFilter('Analytics')}
          >
            Analytics & BI
          </Button>
          <Button
            variant={filter === 'AI Ops' ? 'primary' : 'outline'}
            onClick={() => setFilter('AI Ops')}
          >
            AI Operations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} id={project.slug}>
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No projects found for this category.
            </p>
          )}
        </div>

        {/* Placeholder for project detail view (if selectedProject) - could be a Modal or a dedicated section */}
        {selectedProject && (
          <div className="mt-12 p-8 bg-cardBackground dark:bg-cardBackgroundDark rounded-lg shadow-md border border-border dark:border-borderDark">
            <h3 className="text-2xl font-bold mb-4 text-textLight dark:text-textDark">Project Details: {selectedProject}</h3>
            {/* Render full details of the selected project here */}
            <p className="text-gray-600 dark:text-gray-300">
              In a full implementation, clicking a project card would open a modal or navigate to a detail page with
              the full problem, approach, tools, and outcome. For this example, we simply scroll to the project card.
            </p>
          </div>
        )}
      </ContentSection>
    </>
  );
};
