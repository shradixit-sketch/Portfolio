
import { ContentSections, ThemeSettings, NavItem, CmsSettings } from './types';

// --- Default Content ---
export const DEFAULT_CONTENT: ContentSections = {
  home: {
    hero: {
      headline: 'Shradha Dixit',
      subheadline: 'Analytics & AI Operations Architect: Building Trustworthy Decision Systems',
      ctaButtonText: 'View Portfolio',
      ctaButtonLink: '/portfolio',
      ctaSecondaryButtonText: 'Contact Me',
      ctaSecondaryButtonLink: '/contact',
      image: 'https://picsum.photos/800/600', // Placeholder image
    },
    intro: {
      title: 'Bridging Analytics with Trustworthy AI Operations',
      description: `I operate at the crucial intersection of data analytics, AI operations, and decision-quality systems. My expertise lies in transforming raw data into actionable insights, and critically, ensuring AI outputs are reliable, ethical, and aligned with business objectives. I am dedicated to building human-in-the-loop systems that foster confidence and drive impactful outcomes.`,
    },
    skills: [
      {
        title: 'Data Analytics & BI',
        description: 'Translating complex data into clear, defensible insights for strategic decisions.',
        icon: '📊',
      },
      {
        title: 'AI Operations & Evaluation',
        description: 'Assessing AI model outputs for accuracy, bias, and real-world applicability.',
        icon: '🤖',
      },
      {
        title: 'Human-in-the-Loop Systems',
        description: 'Designing workflows where human judgment refines and improves AI performance.',
        icon: '🤝',
      },
    ],
    portfolioHighlights: [
      {
        id: '1',
        title: 'Sales Performance Dashboard',
        description: 'Developed an interactive Power BI dashboard tracking key sales metrics and identifying regional trends.',
        image: 'https://picsum.photos/400/300?random=1',
        link: '/portfolio#sales-dashboard',
      },
      {
        id: '2',
        title: 'AI Content Moderation Framework',
        description: 'Designed an evaluation framework for AI-generated content, focusing on bias detection and contextual accuracy.',
        image: 'https://picsum.photos/400/300?random=2',
        link: '/portfolio#ai-moderation',
      },
    ],
  },
  about: {
    summary: `I work at the intersection of analytics, AI operations, and decision-quality systems. My profile combines two complementary strengths: Analytics — asking the right business questions, working with structured data, and generating insights. AI Operations — evaluating model outputs, ensuring data quality, and improving reliability through human judgment. I’m most effective in roles where data is not just analyzed, but trusted, reviewed, and operationalized.`,
    analyticsExpertise: `**Analytics & Business Intelligence**
    I translate complex business and operational problems into measurable questions. I analyze structured datasets using SQL and Excel, identifying trends, anomalies, and performance drivers. My goal is to support decisions with clear, defensible insights.`,
    aiOpsMindset: `**AI Operations & Model Evaluation**
    I review AI-generated outputs for accuracy, logic, and contextual alignment. This involves applying structured taxonomies for error classification (e.g., hallucination, drift, bias) and performing consistent annotation and quality checks within human-in-the-loop systems. I document evaluation rationale to support continuous model improvement.`,
    philosophyTitle: 'How I Think About Data & AI',
    philosophyAnalytics: `Analytics answers:\n• What is happening?\n• Why is it happening?`,
    philosophyAIOps: `AI Operations answers:\n• Can this output be trusted?\n• Where might it fail in the real world?`,
    philosophyCombined: `This combined lens enables movement from numbers → insights → reliable systems.`,
    toolsSkills: {
      analytics: [
        'SQL (joins, aggregations, subqueries)',
        'Excel (EDA, pivots, validation, reporting)',
        'Power BI (dashboards, KPIs, storytelling)',
      ],
      aiOperations: [
        'Data annotation & evaluation frameworks',
        'Error taxonomy and quality audits',
        'Human-in-the-loop review workflows',
        'Documentation & feedback loops',
      ],
    },
  },
  services: [
    {
      id: '1',
      title: 'Data Analytics & Business Intelligence',
      description: 'Transforming raw data into clear, actionable insights for strategic decision-making. Services include data exploration, reporting, and performance analysis.',
    },
    {
      id: '2',
      title: 'Dashboard & Reporting Solutions',
      description: 'Designing and implementing interactive dashboards and comprehensive reports using tools like Power BI to visualize key performance indicators and trends.',
    },
    {
      id: '3',
      title: 'AI Output Evaluation',
      description: 'Systematic review and assessment of AI model outputs for accuracy, relevance, and alignment with defined quality standards. Identifying and classifying model errors.',
    },
    {
      id: '4',
      title: 'Data Quality & Annotation',
      description: 'Developing and implementing processes for high-quality data annotation, ensuring accuracy and consistency for training and evaluating AI models.',
    },
    {
      id: '5',
      title: 'Human-in-the-Loop Systems Design',
      description: 'Architecting workflows where human judgment effectively enhances and corrects AI systems, improving overall reliability and trust.',
    },
    {
      id: '6',
      title: 'Consulting & Project Support',
      description: 'Providing expert guidance and project support for initiatives at the intersection of data analytics, AI development, and operational excellence.',
    },
  ],
  portfolio: [
    {
      id: '1',
      slug: 'customer-churn-analysis',
      title: 'Customer Churn Analysis & Prediction',
      category: 'Analytics',
      problem: 'A subscription service faced high customer churn rates, impacting revenue and growth. They needed to understand the underlying causes and identify at-risk customers proactively.',
      approach: 'Utilized SQL to extract customer behavioral data from the transactional database. Performed exploratory data analysis in Excel to identify key churn drivers such as usage patterns, support interactions, and subscription tenure. Developed a predictive model using historical data to score customers based on churn risk.',
      tools: ['SQL', 'Excel', 'Statistical Modeling (conceptual)'],
      outcome: 'Identified top 5 churn indicators, enabling the marketing team to target at-risk customers with retention campaigns. Achieved a 15% reduction in churn rate for targeted segments within three months.',
      image: 'https://picsum.photos/600/400?random=3',
    },
    {
      id: '2',
      slug: 'ai-response-hallucination-audit',
      title: 'AI Response Hallucination Audit for Chatbot',
      category: 'AI Ops',
      problem: 'An AI-powered customer service chatbot occasionally generated factually incorrect or nonsensical responses (hallucinations), leading to user frustration and support escalations.',
      approach: 'Developed a structured annotation guideline to identify and categorize different types of hallucinations (e.g., factual errors, nonsensical output, irrelevant information). Reviewed a dataset of 1,000 chatbot interactions using a human-in-the-loop system, annotating each problematic response according to the taxonomy. Provided detailed feedback and examples to the AI engineering team.',
      tools: ['Custom Annotation Platform', 'Error Taxonomy Design', 'Qualitative Analysis'],
      outcome: 'Identified core patterns leading to hallucinations, allowing engineers to refine training data and model parameters. Led to a 20% decrease in hallucination instances within subsequent model iterations and improved user satisfaction scores.',
      image: 'https://picsum.photos/600/400?random=4',
    },
    {
      id: '3',
      slug: 'supply-chain-optimization-dashboard',
      title: 'Supply Chain Optimization Dashboard',
      category: 'Analytics',
      problem: 'A retail company struggled with inefficient inventory management and unpredictable stockouts, leading to lost sales and increased holding costs.',
      approach: 'Integrated data from various sources (sales, inventory, logistics) into a centralized data model. Designed an interactive Power BI dashboard displaying real-time inventory levels, supplier lead times, demand forecasts, and order fulfillment rates. Implemented key performance indicators (KPIs) to monitor supply chain health.',
      tools: ['SQL', 'Power BI', 'Data Integration'],
      outcome: 'Enabled purchasing managers to make data-driven inventory decisions, reducing stockouts by 25% and optimizing warehouse space utilization. Improved order fulfillment accuracy by 10%.',
      image: 'https://picsum.photos/600/400?random=5',
    },
    {
      id: '4',
      slug: 'ai-bias-detection-framework',
      title: 'AI Bias Detection & Mitigation Framework',
      category: 'AI Ops',
      problem: 'A hiring recommendation AI system showed potential bias against certain demographic groups in candidate shortlisting, posing ethical and legal risks.',
      approach: 'Collaborated with data scientists to define sensitive attributes and fairness metrics. Developed a framework for auditing AI predictions against these metrics. Implemented a human-in-the-loop review process where expert evaluators assessed the fairness of AI recommendations on a sample set, documenting instances of bias and providing qualitative context.',
      tools: ['Fairness Metrics', 'Bias Taxonomy', 'Human-in-the-Loop Evaluation'],
      outcome: 'Identified specific biases within the AI model related to resume parsing and candidate scoring. Provided actionable recommendations for model re-training and feature engineering. Contributed to a revised model that demonstrated improved fairness scores across demographic groups.',
      image: 'https://picsum.photos/600/400?random=6',
    },
  ],
  blog: [
    {
      id: '1',
      slug: 'the-analytics-ai-ops-nexus',
      title: 'The Analytics & AI Ops Nexus: Why Data People Are Essential for Trustworthy AI',
      author: 'Shradha Dixit',
      date: '2024-07-20',
      category: 'AI Operations',
      tags: ['AI Ops', 'Analytics', 'Trustworthy AI'],
      excerpt: 'In an increasingly AI-driven world, the role of analytics professionals in ensuring AI reliability and ethical deployment is more critical than ever. This post explores how a data-centric mindset can bridge the gap between AI development and operational trust.',
      content: `
        <p>The rapid proliferation of AI systems across industries presents both immense opportunities and significant challenges. While AI models can automate tasks, generate insights, and enhance decision-making, their effectiveness is intrinsically tied to their reliability and trustworthiness.</p>
        <p>This is where the nexus of analytics and AI operations becomes indispensable. Analytics professionals, with their deep understanding of data quality, statistical rigor, and business context, are uniquely positioned to ensure that AI systems perform as intended in the real world.</p>
        <h2>From Data to Decisions: The Analytical Lens</h2>
        <p>At its core, analytics is about understanding "what" and "why." We delve into structured data, identify patterns, and extract insights that inform business strategy. This foundational skill set is crucial for:</p>
        <ul>
          <li>**Defining Success Metrics:** Translating vague business goals into quantifiable KPIs for AI performance.</li>
          <li>**Data Quality Assurance:** Ensuring that the data feeding and evaluating AI models is clean, unbiased, and representative.</li>
          <li>**Interpreting Model Outputs:** Applying a critical lens to AI-generated recommendations, just as one would to any complex data report.</li>
        </ul>
        <p>Without this analytical rigor, AI initiatives risk building impressive but ultimately untrustworthy systems that can lead to flawed decisions.</p>
        <h2>AI Operations: Ensuring Trust Beyond Deployment</h2>
        <p>AI operations, or AIOps, takes the analytical mindset a step further by focusing on the operational aspects of AI systems. It asks: "Can this output be trusted?" and "Where might it fail in the real world?" Key contributions include:</p>
        <ul>
          <li>**Model Evaluation Frameworks:** Designing robust methods to assess AI performance against various criteria, including accuracy, fairness, and robustness.</li>
          <li>**Error Taxonomy and Classification:** Developing structured ways to categorize and understand AI failures, from hallucinations to drift and bias.</li>
          <li>**Human-in-the-Loop (HITL) Systems:** Architecting processes where human experts review, refine, and provide feedback to AI, continuously improving its capabilities and preventing egregious errors.</li>
        </ul>
        <p>By combining these strengths, analytics and AI operations professionals collaboratively build systems that are not only intelligent but also reliable, accountable, and truly beneficial to organizations and their users.</p>
        <p><em>Shradha Dixit specializes in this critical intersection, crafting solutions that move from raw data to actionable insights and, ultimately, to trustworthy, operationalized AI.</em></p>
      `,
      image: 'https://picsum.photos/800/400?random=7',
      published: true,
      seo: {
        title: 'The Analytics & AI Ops Nexus: Essential for Trustworthy AI',
        description: 'Explore why analytics professionals are critical for ensuring AI reliability and ethical deployment in AI operations. A data-centric approach bridges AI development and trust.',
        keywords: 'AI Operations, Analytics, Trustworthy AI, Data Quality, Model Evaluation, Human-in-the-Loop Systems',
        ogTitle: 'The Analytics & AI Ops Nexus: Why Data People Are Essential for Trustworthy AI',
        ogDescription: 'In an increasingly AI-driven world, the role of analytics professionals in ensuring AI reliability and ethical deployment is more critical than ever. This post explores how a data-centric mindset can bridge the gap between AI development and operational trust.',
        ogImage: 'https://picsum.photos/800/400?random=7',
        twitterCard: 'summary_large_image',
        twitterTitle: 'The Analytics & AI Ops Nexus: Essential for Trustworthy AI',
        twitterDescription: 'In an increasingly AI-driven world, the role of analytics professionals in ensuring AI reliability and ethical deployment is more critical than ever. This post explores how a data-centric mindset can bridge the gap between AI development and operational trust.',
        twitterImage: 'https://picsum.photos/800/400?random=7',
      }
    },
    {
      id: '2',
      slug: 'evaluating-llms-beyond-metrics',
      title: 'Evaluating LLMs: Moving Beyond Metrics to Human-Centric Quality',
      author: 'Shradha Dixit',
      date: '2024-06-10',
      category: 'AI Evaluation',
      tags: ['LLMs', 'AI Evaluation', 'Human-in-the-Loop', 'Quality'],
      excerpt: 'Large Language Models (LLMs) are powerful, but traditional metrics often fall short in capturing their real-world utility and potential pitfalls. This article advocates for a human-centric approach to LLM evaluation, emphasizing contextual relevance and trust.',
      content: `
        <p>Large Language Models (LLMs) have revolutionized many aspects of content generation, summarization, and interaction. However, effectively evaluating their performance beyond superficial metrics presents a unique challenge. While quantitative scores like BLEU or ROUGE offer a baseline, they often fail to capture the nuanced aspects of human comprehension, contextual appropriateness, or potential biases.</p>
        <h2>The Limitations of Purely Quantitative Metrics</h2>
        <p>Consider an LLM designed for customer support. It might generate grammatically perfect and coherent responses, scoring high on linguistic metrics. Yet, if those responses are factually incorrect (hallucinations), empathetic but unhelpful, or subtly biased, the model is failing in its real-world application.</p>
        <p>This gap highlights the need for a more comprehensive evaluation strategy that integrates human judgment at critical points.</p>
        <h2>Embracing Human-Centric Quality Evaluation</h2>
        <p>A human-centric approach to LLM evaluation moves beyond mere correctness to focus on factors like:</p>
        <ul>
          <li>**Contextual Relevance:** Does the response truly address the user's intent and specific situation?</li>
          <li>**Accuracy & Factual Grounding:** Is the information provided verifiable and free from fabrication?</li>
          <li>**Bias & Fairness:** Does the model exhibit any unfair tendencies or propagate stereotypes?</li>
          <li>**Safety & Harmlessness:** Is the content free from harmful, offensive, or inappropriate language?</li>
          <li>**Utility & Actionability:** Is the response helpful and does it enable the user to achieve their goal?</li>
        </ul>
        <p>Implementing such an evaluation often involves designing sophisticated human-in-the-loop (HITL) systems. These systems empower expert annotators to provide qualitative feedback, identify edge cases, and flag subtle issues that automated metrics might miss. The feedback loops from HITL systems are invaluable for continuous model fine-tuning and improvement.</p>
        <p>By prioritizing human-centric quality, we can build LLMs that are not just technically proficient but also trustworthy, ethical, and truly valuable in their intended applications.</p>
        <p><em>Shradha Dixit's expertise includes designing and implementing these critical evaluation frameworks for AI systems, ensuring that models deliver reliable and high-quality outputs.</em></p>
      `,
      image: 'https://picsum.photos/800/400?random=8',
      published: true,
      seo: {
        title: 'Evaluating LLMs: Human-Centric Quality Beyond Metrics',
        description: 'Discover why human-centric evaluation is crucial for LLMs. Moving beyond traditional metrics to assess contextual relevance, accuracy, and bias for real-world utility.',
        keywords: 'LLM Evaluation, Human-Centric AI, AI Quality, Large Language Models, Human-in-the-Loop, AI Operations',
        ogTitle: 'Evaluating LLMs: Moving Beyond Metrics to Human-Centric Quality',
        ogDescription: 'Large Language Models (LLMs) are powerful, but traditional metrics often fall short in capturing their real-world utility and potential pitfalls. This article advocates for a human-centric approach to LLM evaluation, emphasizing contextual relevance and trust.',
        ogImage: 'https://picsum.photos/800/400?random=8',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Evaluating LLMs: Human-Centric Quality Beyond Metrics',
        twitterDescription: 'Large Language Models (LLMs) are powerful, but traditional metrics often fall short in capturing their real-world utility and potential pitfalls. This article advocates for a human-centric approach to LLM evaluation, emphasizing contextual relevance and trust.',
        twitterImage: 'https://picsum.photos/800/400?random=8',
      }
    },
  ],
  contact: {
    introText: 'I’m always open to discussing opportunities to build trustworthy data and AI systems. Feel free to connect via LinkedIn or send an email directly.',
    email: 'shradixit@gmail.com',
    linkedin: 'https://www.linkedin.com/in/shradha-dixit/',
    github: 'https://github.com/shradhadixit', // Placeholder, update if user provides
    medium: '', // Placeholder
    contactFormPlaceholder: 'Your message here...',
    contactFormButtonText: 'Send Message',
  },
  footer: {
    copyright: '© 2024 Shradha Dixit. All rights reserved.',
    quickLinksTitle: 'Quick Links',
    privacyPolicyText: 'Privacy Policy',
    privacyPolicyLink: '#/privacy',
    termsOfServiceText: 'Terms of Service',
    termsOfServiceLink: '#/terms',
  },
  navigation: [
    { id: 'home', name: 'Home', path: '/' },
    { id: 'about', name: 'About', path: '/about' },
    { id: 'services', name: 'Services', path: '/services' },
    { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
    { id: 'blog', name: 'Blog', path: '/blog' },
    { id: 'contact', name: 'Contact', path: '/contact' },
    { id: 'admin', name: 'Admin', path: '/admin', adminOnly: true },
  ],
  seo: { // Site-wide default SEO
    title: 'Shradha Dixit - Analytics & AI Operations Portfolio',
    description: 'Shradha Dixit\'s professional portfolio showcasing expertise in data analytics, business intelligence, AI operations, and building trustworthy human-in-the-loop systems.',
    keywords: 'Shradha Dixit, Analytics, AI Operations, Data Analyst, Business Intelligence, AI Evaluation, Trust & Safety, Human-in-the-Loop, Portfolio',
    ogTitle: 'Shradha Dixit - Analytics & AI Operations Portfolio',
    ogDescription: 'Shradha Dixit\'s professional portfolio showcasing expertise in data analytics, business intelligence, AI operations, and building trustworthy human-in-the-loop systems.',
    ogImage: 'https://picsum.photos/1200/630', // Default OG image
    twitterCard: 'summary_large_image',
    twitterTitle: 'Shradha Dixit - Analytics & AI Operations Portfolio',
    twitterDescription: 'Shradha Dixit\'s professional portfolio showcasing expertise in data analytics, business intelligence, AI operations, and building trustworthy human-in-the-loop systems.',
    twitterImage: 'https://picsum.photos/1200/675', // Default Twitter image
  }
};

// --- Default Theme Settings ---
export const DEFAULT_THEME: ThemeSettings = {
  mode: 'light',
  colors: {
    primary: '#4F46E5', // Indigo 600
    secondary: '#10B981', // Emerald 500
    background: '#F9FAFB', // Gray 50
    backgroundDark: '#1F2937', // Gray 800
    textLight: '#1F2937', // Gray 800
    textDark: '#F9FAFB', // Gray 50
    cardBackground: '#FFFFFF', // White
    cardBackgroundDark: '#374151', // Gray 700
    border: '#D1D5DB', // Gray 300
    borderDark: '#4B5563', // Gray 600
  },
  fonts: {
    primary: 'Inter',
    heading: 'Inter',
  },
};

// --- CMS Settings ---
export const DEFAULT_CMS_SETTINGS: CmsSettings = {
  googleAnalyticsId: '', // Placeholder for GA Tracking ID
  sitemapEnabled: true,
  robotsTxtContent: `User-agent: *
Allow: /
Sitemap: ${window.location.origin}/sitemap.xml`,
};


// --- Auth Constants ---
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'password123'; // In a real app, never hardcode this!

// --- LocalStorage Keys ---
export const LOCAL_STORAGE_THEME_KEY = 'shradha_portfolio_theme';
export const LOCAL_STORAGE_CONTENT_KEY = 'shradha_portfolio_content';
export const LOCAL_STORAGE_AUTH_KEY = 'shradha_portfolio_auth';
export const LOCAL_STORAGE_CMS_SETTINGS_KEY = 'shradha_portfolio_cms_settings';
