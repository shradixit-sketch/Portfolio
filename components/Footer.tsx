
import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const { footer, navigation, contact } = content;

  // Filter out admin-only links for the footer, and ensure they are valid public paths
  const publicNavLinks = navigation.filter(item => !item.adminOnly && item.path.startsWith('/'));

  return (
    <footer className="bg-cardBackground dark:bg-cardBackgroundDark text-textLight dark:text-textDark py-12 md:py-16 mt-12 border-t border-border dark:border-borderDark transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="col-span-1">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors duration-200 mb-4 block">
            Shradha Dixit
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">{footer.copyright}</p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-textLight dark:text-textDark">{footer.quickLinksTitle}</h4>
          <ul className="space-y-2">
            {publicNavLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.path} className="text-sm hover:text-primary transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to={footer.privacyPolicyLink} className="text-sm hover:text-primary transition-colors duration-200">
                {footer.privacyPolicyText}
              </Link>
            </li>
            <li>
              <Link to={footer.termsOfServiceLink} className="text-sm hover:text-primary transition-colors duration-200">
                {footer.termsOfServiceText}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-textLight dark:text-textDark">Connect</h4>
          <div className="flex space-x-4">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.83 9.504.475.087.687-.206.687-.457 0-.227-.007-.75-.012-1.846-2.783.606-3.376-1.34-3.376-1.34-.454-1.159-1.109-1.47-1.109-1.47-.908-.62.069-.608.069-.608 1.004.072 1.531 1.032 1.531 1.704.89 1.528 2.336 1.088 2.905.829.091-.645.352-1.088.636-1.338-2.22-.253-4.555-1.116-4.555-4.949 0-1.092.39-1.988 1.029-2.68a3.774 3.774 0 01.099-.958s.836-.269 2.747 1.025c.799-.222 1.65-.333 2.503-.337.85.004 1.7.115 2.503.337 1.909-1.294 2.745-1.025 2.745-1.025.064.249.117.48.145.711.64.692 1.029 1.594 1.029 2.68 0 3.841-2.339 4.693-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .252.21.549.694.456C21.133 20.198 24 16.442 24 12.017 24 6.484 19.523 2 14 2h-2z" clipRule="evenodd"/>
                </svg>
              </a>
            )}
            {contact.medium && (
              <a
                href={contact.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.4 5.94a.5.5 0 0 0-.5.5v12.12a.5.5 0 0 0 .5.5h.36a.5.5 0 0 0 .35-.14l2.12-2.12a.5.5 0 0 1 .71 0l2.12 2.12a.5.5 0 0 0 .35.14h.36a.5.5 0 0 0 .5-.5V8.16a.5.5 0 0 0-.5-.5h-.36a.5.5 0 0 0-.35.14l-2.12 2.12a.5.5 0 0 1-.71 0L7.75 7.6a.5.5 0 0 0-.35-.14zm.8 1.63l2.06 2.06a.5.5 0 0 1 0 .71l-2.06 2.06V7.57zM16.6 5.94a.5.5 0 0 0-.5.5v12.12a.5.5 0 0 0 .5.5h.36a.5.5 0 0 0 .35-.14l2.12-2.12a.5.5 0 0 1 .71 0l2.12 2.12a.5.5 0 0 0 .35.14h.36a.5.5 0 0 0 .5-.5V8.16a.5.5 0 0 0-.5-.5h-.36a.5.5 0 0 0-.35.14l-2.12 2.12a.5.5 0 0 1-.71 0L16.95 7.6a.5.5 0 0 0-.35-.14zm.8 1.63l2.06 2.06a.5.5 0 0 1 0 .71l-2.06 2.06V7.57z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Contact Email */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-textLight dark:text-textDark">Contact</h4>
          <p className="text-sm">
            Email: <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors duration-200">{contact.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
