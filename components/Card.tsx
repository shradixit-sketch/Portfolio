
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-cardBackground dark:bg-cardBackgroundDark p-6 rounded-lg shadow-sm border border-border dark:border-borderDark transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};
