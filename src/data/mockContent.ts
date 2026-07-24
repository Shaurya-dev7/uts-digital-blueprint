import { Industry, Location, BlogPost, KnowledgeArticle, DownloadResource, Brand, FAQ } from '../types/cms';

const defaultSEO = {
  title: '',
  description: '',
  keywords: []
};

const defaultImage = {
  url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  alt: 'Industrial Image'
};

export const mockIndustries: Industry[] = [
  {
    id: 'ind-1',
    slug: 'steel-industry',
    name: 'Steel Industry',
    shortDescription: 'Comprehensive solutions for extreme environments in steel manufacturing.',
    longDescription: 'The steel industry demands equipment that can withstand extreme temperatures, abrasive materials, and high pressure. Our range of specialized valves, safety systems, and instrumentation ensures continuous operation and worker safety in steel plants.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      alt: 'Steel Plant'
    },
    challenges: [
      { title: 'Extreme Temperatures', description: 'Equipment must withstand heat up to 1600°C without failure.' },
      { title: 'Abrasive Slurry', description: 'Handling slag and scale requires high-wear resistance.' }
    ],
    applications: [
      { title: 'Blast Furnace', description: 'Cooling water control and gas regulation.' },
      { title: 'Continuous Casting', description: 'Precision spray water control.' }
    ],
    benefits: [
      { title: 'Reduced Downtime', description: 'Our robust valves reduce maintenance frequency by 40%.' },
      { title: 'Enhanced Safety', description: 'Certified safety relief systems protect personnel and assets.' }
    ],
    featuredProductSlugs: ['audco-butterfly-valve', 'leader-gate-valve'],
    featuredBrandSlugs: ['l-and-t-valves', 'leader-valves'],
    relatedIndustrySlugs: ['mining', 'power-plants'],
    faqs: [
      { question: 'What valves are best for blast furnaces?', answer: 'We recommend high-performance metal-seated butterfly valves.' }
    ],
    seo: { ...defaultSEO, title: 'Steel Industry Solutions | UTS' }
  },
  {
    id: 'ind-2',
    slug: 'mining',
    name: 'Mining & Mineral Processing',
    shortDescription: 'Rugged equipment for abrasive and demanding mining operations.',
    longDescription: 'Mining operations face unique challenges with highly abrasive slurries, corrosive environments, and remote locations. We provide heavy-duty valves and pumps designed specifically for mineral processing.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80',
      alt: 'Mining Operation'
    },
    challenges: [
      { title: 'Abrasive Wear', description: 'Slurry handles cause rapid wear on standard equipment.' },
      { title: 'Corrosion', description: 'Acidic water requires specialized alloys and linings.' }
    ],
    applications: [
      { title: 'Tailings Management', description: 'Heavy-duty knife gate valves for slurry isolation.' },
      { title: 'Dewatering', description: 'High-head pumps and check valves for mine dewatering.' }
    ],
    benefits: [
      { title: 'Extended Lifespan', description: 'Specialized linings increase equipment lifespan by 3x.' }
    ],
    featuredProductSlugs: ['audco-butterfly-valve'],
    featuredBrandSlugs: ['l-and-t-valves'],
    relatedIndustrySlugs: ['steel-industry', 'cement-plants'],
    faqs: [],
    seo: { ...defaultSEO, title: 'Mining Industry Solutions | UTS' }
  }
];

export const mockLocations: Location[] = [
  {
    id: 'loc-1',
    slug: 'jharkhand',
    name: 'Jharkhand',
    type: 'state',
    heroImage: defaultImage,
    aboutText: 'UTS has been a cornerstone of industrial supply in Jharkhand, supporting the heavy industries of the region.',
    industriesServed: ['Steel', 'Mining', 'Power'],
    faqs: [],
    seo: { ...defaultSEO, title: 'Jharkhand Industrial Solutions | UTS' }
  },
  {
    id: 'loc-2',
    slug: 'jamshedpur',
    name: 'Jamshedpur',
    type: 'city',
    stateSlug: 'jharkhand',
    heroImage: defaultImage,
    aboutText: 'Our Jamshedpur headquarters serves the Tata Steel ecosystem and surrounding industrial belt with rapid response times.',
    industriesServed: ['Steel', 'Automotive', 'Manufacturing'],
    address: '123 Industrial Area, Jamshedpur, Jharkhand 831001',
    phone: '+91 657 123 4567',
    email: 'jamshedpur@utscorp.in',
    businessHours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    faqs: [],
    seo: { ...defaultSEO, title: 'UTS Jamshedpur Office | Industrial Supplies' }
  }
];

export const mockBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'safety-relief-valve-guide',
    title: 'The Ultimate Guide to Safety Relief Valve Selection',
    excerpt: 'Learn how to properly size and select safety relief valves to ensure regulatory compliance and plant safety.',
    content: '## Introduction\n\nSafety relief valves (SRVs) are the last line of defense in pressurized systems. Selecting the correct valve is crucial for plant safety and compliance with ASME standards.\n\n## Key Factors\n\n1. Set Pressure\n2. Capacity (Flow Rate)\n3. Temperature\n4. Media properties\n\nAlways consult with an engineer for final sizing.',
    author: 'Engineering Team',
    publishedAt: '2023-10-15',
    updatedAt: '2023-10-15',
    readingTime: '5 min',
    category: 'Engineering Guides',
    tags: ['Valves', 'Safety', 'Engineering'],
    heroImage: defaultImage,
    relatedProductSlugs: ['leader-gate-valve'],
    relatedPostSlugs: [],
    seo: { ...defaultSEO, title: 'Safety Relief Valve Selection Guide' }
  }
];

export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'ka-1',
    slug: 'how-safety-relief-valves-work',
    title: 'How Safety Relief Valves Work',
    excerpt: 'A comprehensive guide to understanding pressure relief systems.',
    content: '## The Mechanics\n\nSafety relief valves open automatically when the system pressure exceeds the set limit. The spring holds the disc against the seat until the pressure force overcomes the spring force.',
    author: 'UTS Technical Team',
    updatedAt: '2023-11-20',
    readingTime: '8 min',
    category: 'Valves',
    tags: ['Maintenance', 'Safety'],
    heroImage: defaultImage,
    relatedProductSlugs: [],
    relatedDownloadIds: ['doc-1'],
    relatedArticleSlugs: [],
    faqs: [],
    seo: { ...defaultSEO, title: 'How Safety Relief Valves Work | Knowledge Center' }
  }
];

export const mockDownloads: DownloadResource[] = [
  {
    id: 'doc-1',
    title: 'L&T Valves General Catalogue',
    description: 'Comprehensive catalogue of all L&T industrial valves.',
    type: 'Brochure',
    category: 'Valves',
    url: '/downloads/lt-catalogue.pdf',
    fileSize: '4.2 MB',
    tags: ['L&T', 'Valves', 'Catalogue']
  },
  {
    id: 'doc-2',
    title: 'Leader Valves Installation Manual',
    description: 'Step-by-step installation instructions for Leader Gate and Globe valves.',
    type: 'Manual',
    category: 'Valves',
    url: '/downloads/leader-manual.pdf',
    fileSize: '1.5 MB',
    tags: ['Leader', 'Valves', 'Manual', 'Installation']
  }
];
