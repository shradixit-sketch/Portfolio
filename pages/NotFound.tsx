
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SEOHead } from '../components/SEOHead';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead pageSEO={{
        title: '404 - Page Not Found | Shradha Dixit',
        description: 'The page you requested could not be found.',
        keywords: '404, Not Found, Error',
        ogTitle: '404 - Page Not Found',
        ogDescription: 'The page you requested could not be found.',
        ogImage: 'https://picsum.photos/1200/630',
        twitterCard: 'summary',
        twitterTitle: '404 - Page Not Found',
        twitterDescription: 'The page you requested could not be found.',
        twitterImage: 'https://picsum.photos/800/400',
      }} />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-background dark:bg-backgroundDark text-textLight dark:text-textDark p-4">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-4">404</h1>
          <p className="text-xl md:text-2xl font-semibold mb-6">Page Not Found</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild to="/" variant="primary" size="lg">
            Go to Homepage
          </Button>
        </div>
      </div>
    </>
  );
};
