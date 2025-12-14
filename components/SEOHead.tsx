
import React, { useEffect } from 'react';
import { SEOData } from '../types';
import { useContent } from '../context/ContentContext';

interface SEOHeadProps {
  pageSEO?: SEOData;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ pageSEO }) => {
  const { content } = useContent();
  const globalSEO = content.seo;

  const currentSEO = pageSEO || globalSEO;

  useEffect(() => {
    // Set document title
    document.title = currentSEO.title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      let element = document.head.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', currentSEO.description);
    updateMetaTag('keywords', currentSEO.keywords);

    // Open Graph
    updateMetaTag('og:title', currentSEO.ogTitle, true);
    updateMetaTag('og:description', currentSEO.ogDescription, true);
    updateMetaTag('og:image', currentSEO.ogImage, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Cards
    updateMetaTag('twitter:card', currentSEO.twitterCard);
    updateMetaTag('twitter:title', currentSEO.twitterTitle);
    updateMetaTag('twitter:description', currentSEO.twitterDescription);
    updateMetaTag('twitter:image', currentSEO.twitterImage);

  }, [currentSEO]);

  return null; // This component doesn't render anything visible
};
