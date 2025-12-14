
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { BlogPost, SEOData } from '../types';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { RichTextEditor } from '../components/RichTextEditor';
import { slugify } from '../utils/slugify';

export const AdminBlogEdit: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { content, addOrUpdateBlogPost, loading } = useContent();

  const isEditing = !!slug;
  const existingPost = content.blog.find((p) => p.slug === slug);

  const [post, setPost] = useState<BlogPost>(
    existingPost || {
      id: '',
      slug: '',
      title: '',
      author: 'Shradha Dixit',
      date: new Date().toISOString().slice(0, 10),
      category: 'General',
      tags: [],
      excerpt: '',
      content: '',
      image: 'https://picsum.photos/800/400?random=blog',
      published: false,
      seo: {
        title: '',
        description: '',
        keywords: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterCard: 'summary_large_image',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
      },
    }
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && !existingPost && !loading) {
      // If editing and post not found, navigate back
      alert('Blog post not found!');
      navigate('/admin/blog');
    }
    if (isEditing && existingPost) {
      setPost(existingPost);
    }
  }, [slug, isEditing, existingPost, loading, navigate]);

  const handleChange = (field: keyof BlogPost, value: any) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleSEOChange = (field: keyof SEOData, value: string) => {
    setPost((prev) => ({
      ...prev,
      seo: { ...(prev.seo || content.seo), [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    const finalPost: BlogPost = {
      ...post,
      id: post.id || String(Date.now()),
      slug: post.slug || slugify(post.title), // Generate slug if not already set
      tags: typeof post.tags === 'string' ? (post.tags as string).split(',').map(tag => tag.trim()) : post.tags,
      seo: {
        ...content.seo, // Inherit global SEO defaults
        ...(post.seo || {}),
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        ogTitle: post.seo?.ogTitle || post.title,
        ogDescription: post.seo?.ogDescription || post.excerpt,
        ogImage: post.seo?.ogImage || post.image,
        twitterTitle: post.seo?.twitterTitle || post.title,
        twitterDescription: post.seo?.twitterDescription || post.excerpt,
        twitterImage: post.seo?.twitterImage || post.image,
      }
    };

    addOrUpdateBlogPost(finalPost);
    setIsSaving(false);
    alert('Blog post saved successfully!');
    navigate('/admin/blog'); // Navigate back to list after saving
  };

  if (loading) return <p>Loading blog post editor...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">
        {isEditing ? `Edit Post: "${post.title}"` : 'Create New Blog Post'}
      </h1>

      <Button onClick={handleSubmit} isLoading={isSaving} className="fixed bottom-4 right-4 z-50">
        {isSaving ? 'Saving...' : 'Save Post'}
      </Button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Post Details</h2>
          <Input
            id="post-title"
            label="Title"
            value={post.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
          <Input
            id="post-slug"
            label="Slug (URL Friendly)"
            value={post.slug}
            onChange={(e) => handleChange('slug', slugify(e.target.value))}
            placeholder={slugify(post.title || 'new-post')}
            disabled={isEditing} // Prevent slug changes for existing posts
            title={isEditing ? "Slug cannot be changed for existing posts." : ""}
          />
          <Input
            id="post-author"
            label="Author"
            value={post.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
          <Input
            id="post-date"
            label="Date (YYYY-MM-DD)"
            type="date"
            value={post.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
          <Input
            id="post-category"
            label="Category"
            value={post.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
          <Input
            id="post-tags"
            label="Tags (comma-separated)"
            value={Array.isArray(post.tags) ? post.tags.join(', ') : post.tags}
            onChange={(e) => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
          />
          <Textarea
            id="post-excerpt"
            label="Excerpt (Short summary for listing)"
            value={post.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            rows={4}
          />
          <Input
            id="post-image"
            label="Feature Image URL"
            type="url"
            value={post.image}
            onChange={(e) => handleChange('image', e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="post-published"
              checked={post.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="h-4 w-4 text-primary rounded focus:ring-primary dark:bg-cardBackgroundDark dark:border-borderDark"
            />
            <label htmlFor="post-published" className="text-sm font-medium">Published</label>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Post Content</h2>
          <RichTextEditor
            id="post-content"
            label="Content (Markdown/HTML)"
            value={post.content}
            onChange={(val) => handleChange('content', val)}
            rows={20}
          />
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">SEO for this Post</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Override global SEO settings for this specific blog post.
          </p>
          <Input
            id="post-seo-title"
            label="Meta Title (max 60 chars)"
            value={post.seo?.title || ''}
            onChange={(e) => handleSEOChange('title', e.target.value)}
            maxLength={60}
          />
          <Textarea
            id="post-seo-description"
            label="Meta Description (max 160 chars)"
            value={post.seo?.description || ''}
            onChange={(e) => handleSEOChange('description', e.target.value)}
            maxLength={160}
            rows={3}
          />
          <Input
            id="post-seo-keywords"
            label="Keywords (comma-separated)"
            value={post.seo?.keywords || ''}
            onChange={(e) => handleSEOChange('keywords', e.target.value)}
          />
          <Input
            id="post-og-image"
            label="OG Image URL (1200x630px recommended)"
            value={post.seo?.ogImage || ''}
            onChange={(e) => handleSEOChange('ogImage', e.target.value)}
          />
        </Card>
      </form>
    </div>
  );
};
