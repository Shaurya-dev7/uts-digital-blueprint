export type ProductStatus = 
  | 'New' 
  | 'Featured' 
  | 'Popular' 
  | 'Best Seller' 
  | 'Made in India' 
  | 'Imported' 
  | 'In Stock' 
  | 'On Request' 
  | 'Discontinued' 
  | 'Coming Soon'
  | 'OEM';

export interface Document {
  id: string;
  title: string;
  type: 'Brochure' | 'Datasheet' | 'Manual' | 'Certificate' | 'Warranty' | 'Catalog' | 'Flyer' | 'Presentation';
  url: string;
  fileSize?: string;
  language?: string;
}

export interface Specification {
  name: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ImageAsset {
  url: string;
  alt: string;
  isHero?: boolean;
}

export interface Product {
  id: string; // SKU e.g. UTS-CH-001
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  
  // Relations
  brandSlug: string;
  categorySlugs: string[];
  subcategorySlugs?: string[];
  industrySlugs: string[];
  applicationSlugs: string[];
  
  // Status and Badges
  statuses?: ProductStatus[];
  
  // Assets & Specs
  images: ImageAsset[];
  videos?: Video[];
  specifications: Specification[];
  features?: string[];
  benefits?: string[];
  
  // Resources
  downloads?: Document[];
  certificates?: Certificate[];
  faqs?: FAQ[];
  
  // Internal linking mesh targets
  relatedProductSlugs?: string[];
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  heroImageUrl?: string;
  shortDescription: string;
  fullDescription: string;
  
  // Relations
  industries: string[];
  categories: string[];
  
  // Info
  country: string;
  established?: string;
  featured?: boolean;
  
  // Resources
  downloads?: Document[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentCategorySlug?: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface Application {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  parentCategorySlug: string;
  description?: string;
}

export interface Video {
  id: string;
  title: string;
  url: string; // YouTube/Vimeo link or direct mp4
  thumbnailUrl?: string;
  duration?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  validUntil?: string;
  url: string; // link to PDF or image
}
