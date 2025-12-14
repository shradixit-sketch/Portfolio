
import React from 'react';
import { useContent } from '../context/ContentContext';
import { Card } from '../components/Card';

export const AdminDashboard: React.FC = () => {
  const { content } = useContent();

  const totalProjects = content.portfolio.length;
  const totalBlogPosts = content.blog.length;
  const publishedBlogPosts = content.blog.filter(p => p.published).length;
  const draftBlogPosts = totalBlogPosts - publishedBlogPosts;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-3">Total Projects</h3>
          <p className="text-4xl font-bold text-textLight dark:text-textDark">{totalProjects}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-secondary mb-3">Total Blog Posts</h3>
          <p className="text-4xl font-bold text-textLight dark:text-textDark">{totalBlogPosts}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-blue-500 mb-3">Published Posts</h3>
          <p className="text-4xl font-bold text-textLight dark:text-textDark">{publishedBlogPosts}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-yellow-500 mb-3">Draft Posts</h3>
          <p className="text-4xl font-bold text-textLight dark:text-textDark">{draftBlogPosts}</p>
        </Card>
        {/* Add more metrics as needed */}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-textLight dark:text-textDark mb-6">Quick Overview</h2>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Latest Activity (Simulated)</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><span className="font-medium text-primary">5 minutes ago:</span> Updated 'About Me' section.</li>
            <li><span className="font-medium text-primary">1 hour ago:</span> New blog post 'Evaluating LLMs' published.</li>
            <li><span className="font-medium text-primary">Yesterday:</span> Edited 'Customer Churn Analysis' project details.</li>
            <li><span className="font-medium text-primary">3 days ago:</span> Changed primary theme color.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
