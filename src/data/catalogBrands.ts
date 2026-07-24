import { Brand } from '../types/catalog';

export const catalogBrands: Brand[] = [
  {
    id: "uts-ch-brand",
    slug: "chembond",
    name: "Chembond",
    logoUrl: "https://placehold.co/400x200/ffffff/0f172a.png?text=Chembond",
    heroImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    shortDescription: "Leading manufacturer of construction chemicals and industrial sealants.",
    fullDescription: "Chembond Chemicals Limited is a known name in India, manufacturing a diverse range of specialty chemicals. With over 4 decades of experience, they provide high-performance solutions for construction, water treatment, and industrial applications.",
    industries: ["construction", "infrastructure"],
    categories: ["construction-chemicals", "sealers", "waterproofing", "coatings"],
    country: "India",
    featured: true
  },
  {
    id: "uts-dm-brand",
    slug: "darling-muesco",
    name: "Darling Muesco",
    logoUrl: "https://placehold.co/400x200/ffffff/0f172a.png?text=Darling+Muesco",
    heroImageUrl: "https://images.unsplash.com/photo-1541888087425-ce81dfc46928?auto=format&fit=crop&q=80",
    shortDescription: "Precision control valves and pressure reducing stations.",
    fullDescription: "Darling Muesco (India) Pvt. Ltd. provides specialized pressure control, safety relief mechanisms, and automated valves designed for extreme industrial environments and power generation.",
    industries: ["power-generation", "manufacturing", "oil-and-gas", "chemical"],
    categories: ["valves", "pressure-control", "safety", "control-valves", "actuators", "isolation-valves", "systems", "equipment", "temperature-control"],
    country: "India",
    featured: true
  },
  {
    id: "uts-ig-brand",
    slug: "igeba",
    name: "IGEBA",
    logoUrl: "https://placehold.co/400x200/ffffff/0f172a.png?text=IGEBA",
    heroImageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80",
    shortDescription: "Global leaders in thermal fogging technology.",
    fullDescription: "IGEBA Geratebau GmbH is renowned worldwide for their high-quality thermal fog generators. Used extensively in agriculture, public health, and vector control, their equipment is built for reliability in the harshest conditions.",
    industries: ["agriculture", "public-health", "food-beverage"],
    categories: ["pest-control", "equipment"],
    country: "Germany",
    featured: true
  },
  {
    id: "uts-st-brand",
    slug: "steam-con",
    name: "Steam-Con",
    logoUrl: "https://placehold.co/400x200/ffffff/0f172a.png?text=Steam-Con",
    heroImageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
    shortDescription: "Advanced steam pressure safety and control systems.",
    fullDescription: "Steam-Con specializes in highly accurate, self-actuating mechanical pressure reducing valves for steam, air, and industrial gas applications. Their pilot and piston operated series offer dead tight shut-off and high performance.",
    industries: ["power-generation", "chemical"],
    categories: ["valves", "pressure-control", "control-valves", "actuators"],
    country: "India",
    featured: true
  }
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return catalogBrands.find(brand => brand.slug === slug);
}
