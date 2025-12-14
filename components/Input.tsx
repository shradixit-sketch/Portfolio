
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textLight dark:text-textDark">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-3 py-2 border border-border dark:border-borderDark rounded-md bg-cardBackground dark:bg-cardBackgroundDark text-textLight dark:text-textDark placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};
