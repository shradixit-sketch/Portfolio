
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import {
  HeroContent,
  IntroContent,
  SkillItem,
  PortfolioHighlight,
  AboutSectionContent,
  ServiceItem,
  ContactContent,
  FooterContent,
  NavItem,
} from '../types';
import { RichTextEditor } from '../components/RichTextEditor';

export const AdminContent: React.FC = () => {
  const { content, updateContent, loading } = useContent();
  const [localContent, setLocalContent] = useState<typeof content>(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLocalContent(content);
    }
  }, [content, loading]);

  // Handles updates for top-level properties or properties of objects that are directly children of sections (e.g., home.hero)
  const handleChange = (section: string, field: string, value: any, index?: number) => {
    setLocalContent((prev) => {
      // This path is for updating a property of an item within an array that is directly a child of `prev[section]`.
      // E.g., prev.services[index].title = value, prev.navigation[index].name = value
      if (typeof index === 'number') {
        const updatedArray = [...(prev as any)[section]]; // e.g., prev.services or prev.navigation
        updatedArray[index] = { ...(updatedArray[index] || {}), [field]: value };
        return { ...prev, [section]: updatedArray };
      }
      // This path is for updating a property of an object directly a child of `prev[section]`.
      // E.g., prev.home.intro.title = value OR prev.home.hero = newHeroObject
      return { ...prev, [section]: { ...(prev as any)[section], [field]: value } };
    });
  };

  // Handles updates for properties of items within nested arrays (e.g., home.skills)
  const handleNestedArrayItemChange = (
    parentSectionKey: 'home', // For properties like 'skills' and 'portfolioHighlights' under 'home'
    arrayKey: 'skills' | 'portfolioHighlights',
    itemIndex: number,
    propertyKey: string,
    value: any
  ) => {
    setLocalContent((prev) => {
      const updatedParent = { ...prev[parentSectionKey] };
      const updatedArray = [...(updatedParent as any)[arrayKey]];
      updatedArray[itemIndex] = { ...updatedArray[itemIndex], [propertyKey]: value };
      (updatedParent as any)[arrayKey] = updatedArray;
      return { ...prev, [parentSectionKey]: updatedParent };
    });
  };

  const handleArrayChange = (section: string, newArray: any[]) => {
    setLocalContent((prev) => ({
      ...prev,
      [section]: newArray,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call to save content
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateContent('home', localContent.home);
    updateContent('about', localContent.about);
    updateContent('services', localContent.services);
    updateContent('contact', localContent.contact);
    updateContent('footer', localContent.footer);
    updateContent('navigation', localContent.navigation);
    setIsSaving(false);
    alert('Content saved successfully!');
  };

  if (loading) return <p>Loading content editor...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">Content Management</h1>

      <Button onClick={handleSave} isLoading={isSaving} className="fixed bottom-4 right-4 z-50">
        {isSaving ? 'Saving...' : 'Save All Content'}
      </Button>

      {/* Home Page Content */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">Home Page</h2>
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-textLight dark:text-textDark">Hero Section</h3>
        <Input
          id="hero-headline"
          label="Headline"
          value={localContent.home.hero.headline}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, headline: e.target.value })}
        />
        <Textarea
          id="hero-subheadline"
          label="Sub-headline"
          value={localContent.home.hero.subheadline}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, subheadline: e.target.value })}
        />
        <Input
          id="hero-cta-text"
          label="CTA Button Text"
          value={localContent.home.hero.ctaButtonText}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, ctaButtonText: e.target.value })}
        />
        <Input
          id="hero-cta-link"
          label="CTA Button Link"
          value={localContent.home.hero.ctaButtonLink}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, ctaButtonLink: e.target.value })}
        />
        <Input
          id="hero-cta-secondary-text"
          label="Secondary CTA Button Text"
          value={localContent.home.hero.ctaSecondaryButtonText}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, ctaSecondaryButtonText: e.target.value })}
        />
        <Input
          id="hero-cta-secondary-link"
          label="Secondary CTA Button Link"
          value={localContent.home.hero.ctaSecondaryButtonLink}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, ctaSecondaryButtonLink: e.target.value })}
        />
        <Input
          id="hero-image"
          label="Hero Image URL"
          value={localContent.home.hero.image}
          onChange={(e) => handleChange('home', 'hero', { ...localContent.home.hero, image: e.target.value })}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-textLight dark:text-textDark">Intro Section</h3>
        <Input
          id="intro-title"
          label="Intro Title"
          value={localContent.home.intro.title}
          onChange={(e) => handleChange('home', 'intro', { ...localContent.home.intro, title: e.target.value })}
        />
        <Textarea
          id="intro-description"
          label="Intro Description"
          value={localContent.home.intro.description}
          onChange={(e) => handleChange('home', 'intro', { ...localContent.home.intro, description: e.target.value })}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-textLight dark:text-textDark">Skills Section</h3>
        {localContent.home.skills.map((skill, index) => (
          <div key={index} className="border border-border dark:border-borderDark p-4 rounded-md space-y-2">
            <h4 className="font-medium text-lg">Skill {index + 1}</h4>
            {/* Fix: Use handleNestedArrayItemChange for properties within home.skills array */}
            <Input
              id={`skill-${index}-title`}
              label="Title"
              value={skill.title}
              onChange={(e) => handleNestedArrayItemChange('home', 'skills', index, 'title', e.target.value)}
            />
            <Textarea
              id={`skill-${index}-description`}
              label="Description"
              value={skill.description}
              onChange={(e) => handleNestedArrayItemChange('home', 'skills', index, 'description', e.target.value)}
            />
            <Input
              id={`skill-${index}-icon`}
              label="Icon (Emoji)"
              value={skill.icon || ''}
              onChange={(e) => handleNestedArrayItemChange('home', 'skills', index, 'icon', e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() =>
                handleArrayChange(
                  'home', // The home object itself is being updated
                  {
                    ...localContent.home,
                    skills: localContent.home.skills.filter((_, i) => i !== index),
                  }
                )
              }
            >
              Remove Skill
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            handleArrayChange('home', {
              ...localContent.home,
              skills: [
                ...localContent.home.skills,
                { title: '', description: '', icon: '🌟' },
              ],
            })
          }
        >
          Add Skill
        </Button>
      </Card>

      {/* About Page Content */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">About Page</h2>
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-textLight dark:text-textDark">About Me Summary</h3>
        <RichTextEditor
          id="about-summary"
          label="Professional Summary"
          value={localContent.about.summary}
          onChange={(val) => handleChange('about', 'summary', val)}
          rows={8}
        />
        <RichTextEditor
          id="about-analytics"
          label="Analytics & BI Expertise"
          value={localContent.about.analyticsExpertise}
          onChange={(val) => handleChange('about', 'analyticsExpertise', val)}
          rows={8}
        />
        <RichTextEditor
          id="about-aiops"
          label="AI Operations & Model Evaluation Mindset"
          value={localContent.about.aiOpsMindset}
          onChange={(val) => handleChange('about', 'aiOpsMindset', val)}
          rows={8}
        />
        <Input
          id="about-philosophy-title"
          label="Philosophy Section Title"
          value={localContent.about.philosophyTitle}
          onChange={(e) => handleChange('about', 'philosophyTitle', e.target.value)}
        />
        <Textarea
          id="about-philosophy-analytics"
          label="Philosophy: Analytics Answers"
          value={localContent.about.philosophyAnalytics}
          onChange={(e) => handleChange('about', 'philosophyAnalytics', e.target.value)}
          rows={4}
        />
        <Textarea
          id="about-philosophy-aiops"
          label="Philosophy: AI Operations Answers"
          value={localContent.about.philosophyAIOps}
          onChange={(e) => handleChange('about', 'philosophyAIOps', e.target.value)}
          rows={4}
        />
        <Textarea
          id="about-philosophy-combined"
          label="Philosophy: Combined Lens"
          value={localContent.about.philosophyCombined}
          onChange={(e) => handleChange('about', 'philosophyCombined', e.target.value)}
          rows={4}
        />
        <h4 className="font-medium text-lg mt-6">Tools & Skills (Analytics)</h4>
        <Textarea
          id="about-skills-analytics"
          label="Analytics Skills (one per line)"
          value={localContent.about.toolsSkills.analytics.join('\n')}
          onChange={(e) =>
            handleChange('about', 'toolsSkills', {
              ...localContent.about.toolsSkills,
              analytics: e.target.value.split('\n'),
            })
          }
          rows={6}
        />
        <h4 className="font-medium text-lg mt-6">Tools & Skills (AI Operations)</h4>
        <Textarea
          id="about-skills-aiops"
          label="AI Operations Skills (one per line)"
          value={localContent.about.toolsSkills.aiOperations.join('\n')}
          onChange={(e) =>
            handleChange('about', 'toolsSkills', {
              ...localContent.about.toolsSkills,
              aiOperations: e.target.value.split('\n'),
            })
          }
          rows={6}
        />
      </Card>

      {/* Services Page Content */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">Services Page</h2>
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-textLight dark:text-textDark">Service Items</h3>
        {localContent.services.map((service, index) => (
          <div key={index} className="border border-border dark:border-borderDark p-4 rounded-md space-y-2">
            <h4 className="font-medium text-lg">Service {index + 1}</h4>
            {/* Fix: Corrected handleChange call for services array items */}
            <Input
              id={`service-${index}-title`}
              label="Title"
              value={service.title}
              onChange={(e) => handleChange('services', 'title', e.target.value, index)}
            />
            <Textarea
              id={`service-${index}-description`}
              label="Description"
              value={service.description}
              onChange={(e) => handleChange('services', 'description', e.target.value, index)}
            />
            <Button
              variant="outline"
              onClick={() =>
                handleArrayChange(
                  'services',
                  localContent.services.filter((_, i) => i !== index)
                )
              }
            >
              Remove Service
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            handleArrayChange('services', [
              ...localContent.services,
              { id: String(localContent.services.length + 1), title: '', description: '' },
            ])
          }
        >
          Add Service
        </Button>
      </Card>

      {/* Contact Page Content */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">Contact Page</h2>
      <Card className="p-6 space-y-4">
        <Input
          id="contact-intro"
          label="Intro Text"
          value={localContent.contact.introText}
          onChange={(e) => handleChange('contact', 'introText', e.target.value)}
        />
        <Input
          id="contact-email"
          label="Email"
          value={localContent.contact.email}
          onChange={(e) => handleChange('contact', 'email', e.target.value)}
        />
        <Input
          id="contact-linkedin"
          label="LinkedIn URL"
          value={localContent.contact.linkedin}
          onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
        />
        <Input
          id="contact-github"
          label="GitHub URL (Optional)"
          value={localContent.contact.github || ''}
          onChange={(e) => handleChange('contact', 'github', e.target.value)}
        />
        <Input
          id="contact-medium"
          label="Medium URL (Optional)"
          value={localContent.contact.medium || ''}
          onChange={(e) => handleChange('contact', 'medium', e.target.value)}
        />
        <Input
          id="contact-form-placeholder"
          label="Contact Form Placeholder Text"
          value={localContent.contact.contactFormPlaceholder}
          onChange={(e) => handleChange('contact', 'contactFormPlaceholder', e.target.value)}
        />
        <Input
          id="contact-form-button"
          label="Contact Form Button Text"
          value={localContent.contact.contactFormButtonText}
          onChange={(e) => handleChange('contact', 'contactFormButtonText', e.target.value)}
        />
      </Card>

      {/* Footer Content */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">Footer</h2>
      <Card className="p-6 space-y-4">
        <Input
          id="footer-copyright"
          label="Copyright Text"
          value={localContent.footer.copyright}
          onChange={(e) => handleChange('footer', 'copyright', e.target.value)}
        />
        <Input
          id="footer-quicklinks-title"
          label="Quick Links Title"
          value={localContent.footer.quickLinksTitle}
          onChange={(e) => handleChange('footer', 'quickLinksTitle', e.target.value)}
        />
        <Input
          id="footer-privacy-text"
          label="Privacy Policy Text"
          value={localContent.footer.privacyPolicyText}
          onChange={(e) => handleChange('footer', 'privacyPolicyText', e.target.value)}
        />
        <Input
          id="footer-privacy-link"
          label="Privacy Policy Link"
          value={localContent.footer.privacyPolicyLink}
          onChange={(e) => handleChange('footer', 'privacyPolicyLink', e.target.value)}
        />
        <Input
          id="footer-terms-text"
          label="Terms of Service Text"
          value={localContent.footer.termsOfServiceText}
          onChange={(e) => handleChange('footer', 'termsOfServiceText', e.target.value)}
        />
        <Input
          id="footer-terms-link"
          label="Terms of Service Link"
          value={localContent.footer.termsOfServiceLink}
          onChange={(e) => handleChange('footer', 'termsOfServiceLink', e.target.value)}
        />
      </Card>

      {/* Navigation Menu */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-textLight dark:text-textDark">Navigation Menu</h2>
      <Card className="p-6 space-y-4">
        {localContent.navigation.map((navItem, index) => (
          <div key={navItem.id} className="border border-border dark:border-borderDark p-4 rounded-md space-y-2">
            <h4 className="font-medium text-lg">Nav Item {index + 1}</h4>
            {/* Fix: Corrected handleChange call for navigation array items */}
            <Input
              id={`nav-${index}-id`}
              label="ID (Unique)"
              value={navItem.id}
              onChange={(e) => handleChange('navigation', 'id', e.target.value, index)}
              disabled={true} // ID should generally not be editable after creation
            />
            <Input
              id={`nav-${index}-name`}
              label="Display Name"
              value={navItem.name}
              onChange={(e) => handleChange('navigation', 'name', e.target.value, index)}
            />
            <Input
              id={`nav-${index}-path`}
              label="Path (e.g., /about, /admin)"
              value={navItem.path}
              onChange={(e) => handleChange('navigation', 'path', e.target.value, index)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`nav-${index}-adminOnly`}
                checked={navItem.adminOnly || false}
                onChange={(e) => handleChange('navigation', 'adminOnly', e.target.checked, index)}
                className="h-4 w-4 text-primary rounded focus:ring-primary dark:bg-cardBackgroundDark dark:border-borderDark"
              />
              <label htmlFor={`nav-${index}-adminOnly`} className="text-sm font-medium">Admin Only</label>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                handleArrayChange(
                  'navigation',
                  localContent.navigation.filter((_, i) => i !== index)
                )
              }
            >
              Remove Nav Item
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            handleArrayChange('navigation', [
              ...localContent.navigation,
              { id: `new-nav-${Date.now()}`, name: 'New Link', path: '/new-page', adminOnly: false },
            ])
          }
        >
          Add Nav Item
        </Button>
      </Card>
    </div>
  );
};
