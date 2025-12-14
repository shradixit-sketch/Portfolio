
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { SEOData, CmsSettings } from '../types';

export const AdminSEO: React.FC = () => {
  const { content, updateGlobalSEO, cmsSettings, updateCmsSettings, loading } = useContent();
  const [localSEO, setLocalSEO] = useState<SEOData>(content.seo);
  const [localCmsSettings, setLocalCmsSettings] = useState<CmsSettings>(cmsSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLocalSEO(content.seo);
      setLocalCmsSettings(cmsSettings);
    }
  }, [content.seo, cmsSettings, loading]);

  const handleSEOChange = (field: keyof SEOData, value: string) => {
    setLocalSEO((prev) => ({ ...prev, [field]: value }));
  };

  const handleCmsSettingsChange = (field: keyof CmsSettings, value: any) => {
    setLocalCmsSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    updateGlobalSEO(localSEO);
    updateCmsSettings(localCmsSettings);
    setIsSaving(false);
    alert('SEO settings saved successfully!');
  };

  if (loading) return <p>Loading SEO settings...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">SEO Management</h1>

      <Button onClick={handleSave} isLoading={isSaving} className="fixed bottom-4 right-4 z-50">
        {isSaving ? 'Saving...' : 'Save SEO Settings'}
      </Button>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Global SEO Metadata</h2>
        <p className="text-gray-700 dark:text-gray-300">
          These settings apply site-wide. Individual blog posts can override these.
        </p>
        <Input
          id="seo-title"
          label="Meta Title (max 60 chars)"
          value={localSEO.title}
          onChange={(e) => handleSEOChange('title', e.target.value)}
          maxLength={60}
        />
        <Textarea
          id="seo-description"
          label="Meta Description (max 160 chars)"
          value={localSEO.description}
          onChange={(e) => handleSEOChange('description', e.target.value)}
          maxLength={160}
          rows={3}
        />
        <Input
          id="seo-keywords"
          label="Keywords (comma-separated)"
          value={localSEO.keywords}
          onChange={(e) => handleSEOChange('keywords', e.target.value)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Open Graph (Social Sharing)</h2>
        <Input
          id="og-title"
          label="OG Title"
          value={localSEO.ogTitle}
          onChange={(e) => handleSEOChange('ogTitle', e.target.value)}
        />
        <Textarea
          id="og-description"
          label="OG Description"
          value={localSEO.ogDescription}
          onChange={(e) => handleSEOChange('ogDescription', e.target.value)}
          rows={3}
        />
        <Input
          id="og-image"
          label="OG Image URL (e.g., 1200x630px)"
          value={localSEO.ogImage}
          onChange={(e) => handleSEOChange('ogImage', e.target.value)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Twitter Cards</h2>
        <Input
          id="twitter-card"
          label="Twitter Card Type (e.g., summary, summary_large_image)"
          value={localSEO.twitterCard}
          onChange={(e) => handleSEOChange('twitterCard', e.target.value)}
        />
        <Input
          id="twitter-title"
          label="Twitter Title"
          value={localSEO.twitterTitle}
          onChange={(e) => handleSEOChange('twitterTitle', e.target.value)}
        />
        <Textarea
          id="twitter-description"
          label="Twitter Description"
          value={localSEO.twitterDescription}
          onChange={(e) => handleSEOChange('twitterDescription', e.target.value)}
          rows={3}
        />
        <Input
          id="twitter-image"
          label="Twitter Image URL"
          value={localSEO.twitterImage}
          onChange={(e) => handleSEOChange('twitterImage', e.target.value)}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">CMS & Integrations</h2>
        <Input
          id="google-analytics-id"
          label="Google Analytics Tracking ID (e.g., G-XXXXXXXXXX)"
          value={localCmsSettings.googleAnalyticsId}
          onChange={(e) => handleCmsSettingsChange('googleAnalyticsId', e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sitemap-enabled"
            checked={localCmsSettings.sitemapEnabled}
            onChange={(e) => handleCmsSettingsChange('sitemapEnabled', e.target.checked)}
            className="h-4 w-4 text-primary rounded focus:ring-primary dark:bg-cardBackgroundDark dark:border-borderDark"
          />
          <label htmlFor="sitemap-enabled" className="text-sm font-medium">Generate Sitemap (conceptual)</label>
        </div>
        <Textarea
          id="robots-txt"
          label="robots.txt Content"
          value={localCmsSettings.robotsTxtContent}
          onChange={(e) => handleCmsSettingsChange('robotsTxtContent', e.target.value)}
          rows={6}
          className="font-mono"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Note: Sitemap generation and robots.txt are conceptual for this frontend-only app.
          In a production environment, these would be generated server-side or during build.
        </p>
      </Card>
    </div>
  );
};
