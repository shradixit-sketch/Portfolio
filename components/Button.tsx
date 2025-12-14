
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean; // For rendering as a link
  to?: string; // For react-router-dom Link
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  asChild = false,
  to,
  isLoading = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-backgroundDark disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary',
    outline: 'border border-border dark:border-borderDark text-textLight dark:text-textDark hover:bg-background dark:hover:bg-cardBackgroundDark focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 dark:hover:bg-primary/20 focus:ring-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const content = (
    <>
      {isLoading && (
        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-textDark mr-2"></span>
      )}
      {children}
    </>
  );

  if (asChild && to) {
    // Fix: Correctly cast props for Link component by first casting to unknown
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
};
