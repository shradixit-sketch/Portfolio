
import React from 'react';
import { HeroContent } from '../types';
import { Button } from './Button';

interface HeroSectionProps {
  content: HeroContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-background dark:bg-backgroundDark transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-textLight dark:text-textDark animate-fade-in-up">
            {content.headline}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in-up delay-100">
            {content.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fade-in-up delay-200">
            <Button asChild to={content.ctaButtonLink} size="lg" variant="primary">
              {content.ctaButtonText}
            </Button>
            <Button asChild to={content.ctaSecondaryButtonLink} size="lg" variant="outline">
              {content.ctaSecondaryButtonText}
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end z-10 animate-fade-in-right delay-300">
          <img
            src={content.image}
            alt="Hero illustration"
            className="w-full max-w-md lg:max-w-lg rounded-lg shadow-2xl object-cover h-auto"
          />
        </div>
      </div>
    </section>
  );
};
