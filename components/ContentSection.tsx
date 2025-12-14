
import React from 'react';

interface ContentSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, description, children, className = '', id }) => {
  return (
    <section id={id} className={`py-12 md:py-16 bg-background dark:bg-backgroundDark transition-colors duration-300 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
