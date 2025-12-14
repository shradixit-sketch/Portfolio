
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  ContentSections,
  BlogPost,
  SEOData,
  CmsSettings,
  ContentContextType,
} from '../types';
import {
  DEFAULT_CONTENT,
  DEFAULT_CMS_SETTINGS,
  LOCAL_STORAGE_CONTENT_KEY,
  LOCAL_STORAGE_CMS_SETTINGS_KEY,
} from '../constants';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [content, setContent] = useState<ContentSections>(() => {
    try {
      const storedContent = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
      return storedContent ? JSON.parse(storedContent) : DEFAULT_CONTENT;
    } catch (error) {
      console.error("Failed to parse content from localStorage, using default.", error);
      return DEFAULT_CONTENT;
    }
  });

  const [cmsSettings, setCmsSettings] = useState<CmsSettings>(() => {
    try {
      const storedSettings = localStorage.getItem(LOCAL_STORAGE_CMS_SETTINGS_KEY);
      return storedSettings ? JSON.parse(storedSettings) : DEFAULT_CMS_SETTINGS;
    } catch (error) {
      console.error("Failed to parse CMS settings from localStorage, using default.", error);
      return DEFAULT_CMS_SETTINGS;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load from localStorage (or a backend in a real app)
    // This allows the initial state to be set up before rendering children
    // If we rely purely on useState's lazy initializer, it runs only once.
    // This effect ensures we could potentially re-sync if data changes elsewhere.
    try {
      const storedContent = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(DEFAULT_CONTENT));
        setContent(DEFAULT_CONTENT);
      }

      const storedSettings = localStorage.getItem(LOCAL_STORAGE_CMS_SETTINGS_KEY);
      if (storedSettings) {
        setCmsSettings(JSON.parse(storedSettings));
      } else {
        localStorage.setItem(LOCAL_STORAGE_CMS_SETTINGS_KEY, JSON.stringify(DEFAULT_CMS_SETTINGS));
        setCmsSettings(DEFAULT_CMS_SETTINGS);
      }
    } catch (error) {
      console.error("Error loading initial data from localStorage:", error);
      // Fallback to defaults if parsing fails
      setContent(DEFAULT_CONTENT);
      setCmsSettings(DEFAULT_CMS_SETTINGS);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Persist content to localStorage whenever it changes
    if (!loading) { // Prevent saving defaults immediately on mount
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(content));
    }
  }, [content, loading]);

  useEffect(() => {
    // Persist CMS settings to localStorage whenever it changes
    if (!loading) { // Prevent saving defaults immediately on mount
      localStorage.setItem(LOCAL_STORAGE_CMS_SETTINGS_KEY, JSON.stringify(cmsSettings));
    }
  }, [cmsSettings, loading]);

  const updateContent = useCallback((section: string, data: any) => {
    setContent((prevContent) => ({
      ...prevContent,
      [section]: data,
    }));
  }, []);

  const updateBlog = useCallback((newBlogPosts: BlogPost[]) => {
    setContent((prevContent) => ({
      ...prevContent,
      blog: newBlogPosts,
    }));
  }, []);

  const addOrUpdateBlogPost = useCallback((newPost: BlogPost) => {
    setContent((prevContent) => {
      const existingIndex = prevContent.blog.findIndex((post) => post.slug === newPost.slug);
      if (existingIndex !== -1) {
        // Update existing post
        const updatedBlog = [...prevContent.blog];
        updatedBlog[existingIndex] = newPost;
        return { ...prevContent, blog: updatedBlog };
      } else {
        // Add new post
        return { ...prevContent, blog: [...prevContent.blog, newPost] };
      }
    });
  }, []);

  const deleteBlogPost = useCallback((slug: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      blog: prevContent.blog.filter((post) => post.slug !== slug),
    }));
  }, []);

  const updateGlobalSEO = useCallback((seoData: SEOData) => {
    setContent((prevContent) => ({
      ...prevContent,
      seo: seoData,
    }));
  }, []);

  const updateCmsSettings = useCallback((settings: CmsSettings) => {
    setCmsSettings(settings);
  }, []);

  const contextValue = React.useMemo(() => ({
    content,
    updateContent,
    updateBlog,
    addOrUpdateBlogPost,
    deleteBlogPost,
    updateGlobalSEO,
    cmsSettings,
    updateCmsSettings,
    loading,
  }), [
    content,
    updateContent,
    updateBlog,
    addOrUpdateBlogPost,
    deleteBlogPost,
    updateGlobalSEO,
    cmsSettings,
    updateCmsSettings,
    loading,
  ]);

  return (
    <ContentContext.Provider value={contextValue}>
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-backgroundDark">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      )}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
