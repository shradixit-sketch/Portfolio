
import React, { useState } from 'react';
import { ContentSection } from '../components/ContentSection';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useContent } from '../context/ContentContext';
import { SEOHead } from '../components/SEOHead';

export const Contact: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);

    // Simulate API call for sending email
    console.log('Sending message:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    // In a real application, you would send this data to a backend endpoint
    // and handle the actual email sending there.
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    // Simulate success/failure
    const success = Math.random() > 0.1; // 90% chance of success
    setSubmitSuccess(success);
    setIsSubmitting(false);

    if (success) {
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(null), 5000); // Clear message after 5 seconds
    }
  };

  return (
    <>
      <SEOHead pageSEO={{
        ...content.seo,
        title: 'Contact - Shradha Dixit | Get in Touch',
        description: 'Connect with Shradha Dixit for collaborations, inquiries, or to discuss opportunities in data analytics and AI operations. Send a message or reach out on LinkedIn.',
        ogTitle: 'Contact - Shradha Dixit | Get in Touch',
        twitterTitle: 'Contact - Shradha Dixit | Get in Touch',
      }} />
      <ContentSection title="Get in Touch" description={contact.introText} className="pt-16 pb-8 md:pt-24 md:pb-12 bg-cardBackground dark:bg-cardBackgroundDark">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-textLight dark:text-textDark mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="name"
                name="name"
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                id="email"
                name="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                id="message"
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                placeholder={contact.contactFormPlaceholder}
                required
              />
              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                {contact.contactFormButtonText}
              </Button>
              {submitSuccess !== null && (
                <p className={`text-center mt-4 ${submitSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {submitSuccess ? 'Message sent successfully! I will get back to you soon.' : 'Failed to send message. Please try again or contact directly.'}
                </p>
              )}
            </form>
          </Card>

          {/* Social Links & Direct Contact */}
          <Card className="p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-textLight dark:text-textDark mb-6">Connect Directly</h3>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <svg className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13h9a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Email: <a href={`mailto:${contact.email}`} className="ml-2 hover:text-primary transition-colors duration-200">{contact.email}</a>
                </p>
                {contact.linkedin && (
                  <p className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-primary transition-colors duration-200">Shradha Dixit</a>
                  </p>
                )}
                {contact.github && (
                  <p className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-primary" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.83 9.504.475.087.687-.206.687-.457 0-.227-.007-.75-.012-1.846-2.783.606-3.376-1.34-3.376-1.34-.454-1.159-1.109-1.47-1.109-1.47-.908-.62.069-.608.069-.608 1.004.072 1.531 1.032 1.531 1.704.89 1.528 2.336 1.088 2.905.829.091-.645.352-1.088.636-1.338-2.22-.253-4.555-1.116-4.555-4.949 0-1.092.39-1.988 1.029-2.68a3.774 3.774 0 01.099-.958s.836-.269 2.747 1.025c.799-.222 1.65-.333 2.503-.337.85.004 1.7.115 2.503.337 1.909-1.294 2.745-1.025 2.745-1.025.064.249.117.48.145.711.64.692 1.029 1.594 1.029 2.68 0 3.841-2.339 4.693-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .252.21.549.694.456C21.133 20.198 24 16.442 24 12.017 24 6.484 19.523 2 14 2h-2z" clipRule="evenodd"/></svg>
                    GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-primary transition-colors duration-200">shradhadixit</a>
                  </p>
                )}
                {contact.medium && (
                  <p className="flex items-center">
                    <svg className="h-6 w-6 mr-3 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M7.4 5.94a.5.5 0 0 0-.5.5v12.12a.5.5 0 0 0 .5.5h.36a.5.5 0 0 0 .35-.14l2.12-2.12a.5.5 0 0 1 .71 0l2.12 2.12a.5.5 0 0 0 .35.14h.36a.5.5 0 0 0 .5-.5V8.16a.5.5 0 0 0-.5-.5h-.36a.5.5 0 0 0-.35.14l-2.12 2.12a.5.5 0 0 1-.71 0L7.75 7.6a.5.5 0 0 0-.35-.14zm.8 1.63l2.06 2.06a.5.5 0 0 1 0 .71l-2.06 2.06V7.57zM16.6 5.94a.5.5 0 0 0-.5.5v12.12a.5.5 0 0 0 .5.5h.36a.5.5 0 0 0 .35-.14l2.12-2.12a.5.5 0 0 1 .71 0l2.12 2.12a.5.5 0 0 0 .35.14h.36a.5.5 0 0 0 .5-.5V8.16a.5.5 0 0 0-.5-.5h-.36a.5.5 0 0 0-.35.14l-2.12 2.12a.5.5 0 0 1-.71 0L16.95 7.6a.5.5 0 0 0-.35-.14zm.8 1.63l2.06 2.06a.5.5 0 0 1 0 .71l-2.06 2.06V7.57z"/></svg>
                    Medium: <a href={contact.medium} target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-primary transition-colors duration-200">Shradha's Blog</a>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8 text-center lg:text-left">
              <Button asChild to={contact.linkedin} variant="primary" size="lg">
                Connect on LinkedIn
              </Button>
            </div>
          </Card>
        </div>
      </ContentSection>
    </>
  );
};
