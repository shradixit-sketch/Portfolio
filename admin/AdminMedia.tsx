
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// This is a simplified media manager using URLs.
// A real media manager would handle file uploads to a storage service (e.g., S3, Google Cloud Storage)
// and store references/URLs in a database.

interface MediaItem {
  id: string;
  url: string;
  altText: string;
}

export const AdminMedia: React.FC = () => {
  const { content, updateContent, loading } = useContent(); // Using updateContent to save to content.home.hero.image etc. for simplicity
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaAltText, setNewMediaAltText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Populate media library from existing images in content for demonstration
    const existingImages: MediaItem[] = [];
    const addUniqueImage = (url: string, alt: string) => {
      if (url && !existingImages.some(item => item.url === url)) {
        existingImages.push({ id: String(existingImages.length + 1), url, altText: alt });
      }
    };

    // Home
    addUniqueImage(content.home.hero.image, content.home.hero.headline);
    content.home.portfolioHighlights.forEach(h => addUniqueImage(h.image, h.title));
    // Blog
    content.blog.forEach(p => addUniqueImage(p.image, p.title));
    // Portfolio
    content.portfolio.forEach(p => addUniqueImage(p.image, p.title));
    // SEO
    addUniqueImage(content.seo.ogImage, content.seo.ogTitle);
    addUniqueImage(content.seo.twitterImage, content.seo.twitterTitle);

    setMediaLibrary(existingImages);
  }, [content, loading]);

  const handleAddMedia = async () => {
    if (!newMediaUrl.trim()) {
      alert('Media URL cannot be empty.');
      return;
    }
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate upload

    const newId = String(Date.now());
    const newItem: MediaItem = { id: newId, url: newMediaUrl, altText: newMediaAltText || `Image ${newId}` };

    setMediaLibrary((prev) => [...prev, newItem]);
    setNewMediaUrl('');
    setNewMediaAltText('');
    setIsAdding(false);
  };

  const handleDeleteMedia = (id: string) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      setMediaLibrary((prev) => prev.filter((item) => item.id !== id));
      alert('Media item deleted (simulated). Remember to update content if this image was in use.');
    }
  };

  if (loading) return <p>Loading media library...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">Media Library</h1>
      <p className="text-gray-700 dark:text-gray-300">
        This section allows you to manage image URLs used across your site.
        For a live site, this would integrate with a file storage service.
      </p>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Add New Media (URL)</h2>
        <Input
          id="new-media-url"
          label="Image URL"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={newMediaUrl}
          onChange={(e) => setNewMediaUrl(e.target.value)}
        />
        <Input
          id="new-media-alt"
          label="Alt Text (for accessibility)"
          type="text"
          placeholder="A descriptive alt text"
          value={newMediaAltText}
          onChange={(e) => setNewMediaAltText(e.target.value)}
        />
        <Button onClick={handleAddMedia} isLoading={isAdding} variant="primary">
          {isAdding ? 'Adding...' : 'Add Image to Library'}
        </Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Existing Media</h2>
        {mediaLibrary.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No media items in the library.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaLibrary.map((item) => (
              <div key={item.id} className="border border-border dark:border-borderDark rounded-lg overflow-hidden shadow-sm">
                <img src={item.url} alt={item.altText} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-sm font-medium text-textLight dark:text-textDark truncate mb-1" title={item.url}>
                    URL: <span className="text-gray-600 dark:text-gray-300">{item.url}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Alt: {item.altText}</p>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(item.url)} className="mr-2">
                    Copy URL
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleDeleteMedia(item.id)} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
