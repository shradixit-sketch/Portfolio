
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminContent } from './admin/AdminContent';
import { AdminAppearance } from './admin/AdminAppearance';
import { AdminSEO } from './admin/AdminSEO';
import { AdminMedia } from './admin/AdminMedia';
import { AdminBlogList } from './admin/AdminBlogList';
import { AdminBlogEdit } from './admin/AdminBlogEdit';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading initial data from localStorage
  useEffect(() => {
    // In a real app, this would involve fetching from a backend
    // and setting up initial state for content, theme, etc.
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-backgroundDark">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <ContentProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="appearance" element={<AdminAppearance />} />
                <Route path="seo" element={<AdminSEO />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="blog" element={<AdminBlogList />} />
                <Route path="blog/new" element={<AdminBlogEdit />} />
                <Route path="blog/edit/:slug" element={<AdminBlogEdit />} />
              </Route>

              {/* Public Website Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ContentProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
