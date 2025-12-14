
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../types';
import { Card } from './Card';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/portfolio#${project.slug}`} className="block">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {project.category}
        </span>
        <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {project.problem}
        </p>
      </Link>
    </Card>
  );
};
