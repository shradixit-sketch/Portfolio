
import React, { useState } from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleThemeMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Content', path: '/admin/content' },
    { name: 'Appearance', path: '/admin/appearance' },
    { name: 'SEO', path: '/admin/seo' },
    { name: 'Media', path: '/admin/media' },
    { name: 'Blog Posts', path: '/admin/blog' },
  ];

  return (
    <div className="flex min-h-screen bg-background dark:bg-backgroundDark text-textLight dark:text-textDark">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle admin navigation"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-cardBackground dark:bg-cardBackgroundDark shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 border-b border-border dark:border-borderDark flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {adminNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-md text-textLight dark:text-textDark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200 ${
                  isActive ? 'bg-primary text-white hover:!bg-primary dark:text-white' : ''
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border dark:border-borderDark space-y-2">
          <Button variant="outline" className="w-full" onClick={toggleThemeMode}>
            {theme.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
          <Button variant="secondary" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};
