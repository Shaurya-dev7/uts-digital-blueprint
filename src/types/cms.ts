export interface CMSImage {
  url: string;
  alt: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  heroImage: CMSImage;
  challenges: { title: string; description: string }[];
  applications: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  featuredProductSlugs: string[];
  featuredBrandSlugs: string[];
  relatedIndustrySlugs: string[];
  faqs: FAQ[];
  seo: SEOData;
}

export interface Location {
  id: string;
  slug: string;
  name: string; // e.g. "Jharkhand" or "Jamshedpur"
  type: 'state' | 'city';
  stateSlug?: string; // If it's a city, what state it belongs to
  heroImage: CMSImage;
  aboutText: string;
  industriesServed: string[];
  address?: string;
  phone?: string;
  email?: string;
  businessHours?: string;
  googleMapsUrl?: string;
  faqs: FAQ[];
  seo: SEOData;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or MDX
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  heroImage: CMSImage;
  relatedProductSlugs: string[];
  relatedPostSlugs: string[];
  seo: SEOData;
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or MDX
  author: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  heroImage: CMSImage;
  relatedProductSlugs: string[];
  relatedDownloadIds: string[];
  relatedArticleSlugs: string[];
  faqs: FAQ[];
  seo: SEOData;
}

export interface DownloadResource {
  id: string;
  title: string;
  description: string;
  type: 'Brochure' | 'Datasheet' | 'Manual' | 'Certificate' | 'Guide';
  category: string;
  url: string;
  fileSize: string;
  thumbnail?: CMSImage;
  relatedProductSlugs?: string[];
  tags: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: CMSImage;
  website?: string;
  categories: string[];
}
