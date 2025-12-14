
// --- General Types ---
export type ValueOf<T> = T[keyof T];

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

// --- Theme Types ---
export type ThemeMode = 'light' | 'dark';

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  backgroundDark: string;
  textLight: string;
  textDark: string;
  cardBackground: string;
  cardBackgroundDark: string;
  border: string;
  borderDark: string;
}

export interface FontSettings {
  primary: string; // Google Font name, e.g., 'Inter'
  heading: string; // Google Font name
}

export interface ThemeSettings {
  mode: ThemeMode;
  colors: ColorPalette;
  fonts: FontSettings;
}

// --- Navigation Types ---
export interface NavItem {
  id: string;
  name: string;
  path: string;
  adminOnly?: boolean;
}

// --- Content Types ---
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaSecondaryButtonText: string;
  ctaSecondaryButtonLink: string;
  image: string;
}

export interface IntroContent {
  title: string;
  description: string;
}

export interface SkillItem {
  title: string;
  description: string;
  icon?: string; // e.g., 'analytics', 'ai'
}

export interface PortfolioHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface AboutSectionContent {
  summary: string;
  analyticsExpertise: string;
  aiOpsMindset: string;
  philosophyTitle: string;
  philosophyAnalytics: string;
  philosophyAIOps: string;
  philosophyCombined: string;
  toolsSkills: {
    analytics: string[];
    aiOperations: string[];
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export type ProjectCategory = 'Analytics' | 'AI Ops';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  problem: string;
  approach: string;
  tools: string[];
  outcome: string;
  image: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string; // HTML string
  image: string;
  published: boolean;
  seo?: SEOData;
}

export interface ContactContent {
  introText: string;
  email: string;
  linkedin: string;
  github?: string;
  medium?: string;
  contactFormPlaceholder: string;
  contactFormButtonText: string;
}

export interface FooterContent {
  copyright: string;
  quickLinksTitle: string;
  privacyPolicyText: string;
  privacyPolicyLink: string;
  termsOfServiceText: string;
  termsOfServiceLink: string;
}

export interface ContentSections {
  home: {
    hero: HeroContent;
    intro: IntroContent;
    skills: SkillItem[];
    portfolioHighlights: PortfolioHighlight[];
  };
  about: AboutSectionContent;
  services: ServiceItem[];
  portfolio: ProjectItem[];
  blog: BlogPost[]; // Array of blog posts
  contact: ContactContent;
  footer: FooterContent;
  navigation: NavItem[];
  seo: SEOData; // Site-wide SEO
}

// --- Auth Types ---
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
}

// --- CMS Settings ---
export interface CmsSettings {
  googleAnalyticsId: string;
  sitemapEnabled: boolean;
  robotsTxtContent: string;
}

// --- Theme Context ---
export interface ThemeContextType {
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  toggleThemeMode: () => void;
  updateColor: (key: keyof ColorPalette, value: string) => void;
  updateFont: (key: keyof FontSettings, value: string) => void;
  applyCssVariables: (colors: ColorPalette, fonts: FontSettings) => void;
}

// --- Auth Context ---
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// --- Content Context ---
export interface ContentContextType {
  content: ContentSections;
  updateContent: (section: string, data: any) => void;
  updateBlog: (newBlogPosts: BlogPost[]) => void;
  addOrUpdateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (slug: string) => void;
  updateGlobalSEO: (seoData: SEOData) => void;
  cmsSettings: CmsSettings;
  updateCmsSettings: (settings: CmsSettings) => void;
  loading: boolean;
}
