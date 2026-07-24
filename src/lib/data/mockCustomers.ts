export interface Customer {
  id: string;
  name: string;
  logoUrl: string;
  imageUrl?: string;
  industry: string;
  relationshipLength: string;
  location: string;
  productsSupplied: string[];
}

export const mockCustomers: Customer[] = [
  {
    id: "tata-steel",
    name: "Tata Steel",
    logoUrl: "/images/company logos/tata steel.png",
    imageUrl: "/images/company logos/bg tata steel.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "20+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Industrial Valves", "Safety Valves", "Pumps", "Construction Chemicals"]
  },
  {
    id: "tata-steel-uisl",
    name: "Tata Steel UISL",
    logoUrl: "/images/company logos/Tata Steel UISL.jpg",
    imageUrl: "/images/company logos/company pic.jpg",
    industry: "Infrastructure & Utility",
    relationshipLength: "15+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Water Pumps", "Valves", "Maintenance Equipment"]
  },
  {
    id: "tata-bluescope",
    name: "Tata BlueScope Steel",
    logoUrl: "/images/company logos/tata BlueScope Steel.jpg",
    imageUrl: "/images/company logos/tata BlueScope Steel office.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "10+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Industrial Enclosures", "Safety Relief Valves"]
  },
  {
    id: "tata-steel-wire",
    name: "Tata Steel Wire Division",
    logoUrl: "/images/company logos/tata steel.png",
    imageUrl: "/images/company logos/Tata Steel Wire Division office.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "12+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Industrial Sealants", "Pumps"]
  },
  {
    id: "tata-steel-tinplate",
    name: "Tata Steel Tinplate",
    logoUrl: "/images/company logos/Tata Steel Tinplate.jpg",
    imageUrl: "/images/company logos/Tata Steel Tinplate office.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "15+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Control Valves", "Actuators"]
  },
  {
    id: "tata-steel-downstream",
    name: "Tata Steel Downstream Products",
    logoUrl: "/images/company logos/Tata Steel Downstream Products.png",
    imageUrl: "/images/company logos/Tata Steel Downstream Products office.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "10+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Pumps", "Valves", "Safety Equipment"]
  },
  {
    id: "indian-railways",
    name: "Indian Railways (SER)",
    logoUrl: "/images/company logos/Indian Railways.jpg",
    imageUrl: "/images/company logos/valve fitted.jpg",
    industry: "Transportation",
    relationshipLength: "25+ Years",
    location: "South Eastern Region",
    productsSupplied: ["High-pressure Valves", "Water Pumps", "Construction Chemicals"]
  },
  {
    id: "rungta-mines",
    name: "Rungta Mines",
    logoUrl: "/images/company logos/Rungta Mines.jpg",
    imageUrl: "/images/company logos/Rungta Mines company.jpg",
    industry: "Mining",
    relationshipLength: "15+ Years",
    location: "Jharkhand",
    productsSupplied: ["Heavy Duty Pumps", "Earth Augers", "Valves"]
  },
  {
    id: "jindal-steel",
    name: "Jindal Steel & Power",
    logoUrl: "/images/company logos/Jindal Steel.png",
    imageUrl: "/images/company logos/Jindal Steel office.jpg",
    industry: "Steel Manufacturing",
    relationshipLength: "8+ Years",
    location: "Odisha",
    productsSupplied: ["Valves", "Heavy Equipment"]
  },
  {
    id: "larsen-toubro",
    name: "Larsen & Toubro",
    logoUrl: "/images/company logos/Larsen & Toubro.jpg",
    imageUrl: "/images/company logos/larsen office.jpg",
    industry: "Construction",
    relationshipLength: "12+ Years",
    location: "Pan India",
    productsSupplied: ["Construction Chemicals", "Industrial Pumps"]
  },
  {
    id: "jamna-auto",
    name: "Jamna Auto Industries",
    logoUrl: "/images/company logos/Jamna Auto.png",
    imageUrl: "/images/company logos/company oic.jpg",
    industry: "Automotive Parts",
    relationshipLength: "10+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Pneumatic Valves", "Industrial Enclosures"]
  },
  {
    id: "hindustan-rubber",
    name: "Hindustan Rubber Products",
    logoUrl: "/images/company logos/Hindustan Rubber.jpg",
    imageUrl: "/images/company logos/company pic1.jpg",
    industry: "Manufacturing",
    relationshipLength: "8+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Industrial Valves", "Process Pumps"]
  },
  {
    id: "shaha-sponge",
    name: "Shaha Sponge & Power",
    logoUrl: "/images/company logos/Shaha Sponge.jpg",
    imageUrl: "/images/company logos/company pic.jpg",
    industry: "Power Generation",
    relationshipLength: "12+ Years",
    location: "Jharkhand",
    productsSupplied: ["Boiler Feed Pumps", "Safety Valves"]
  },
  {
    id: "nippon-industries",
    name: "Nippon Industries",
    logoUrl: "/images/company logos/Nippon Industries.jpg",
    imageUrl: "/images/company logos/Nippon Industries office.jpg",
    industry: "Manufacturing",
    relationshipLength: "5+ Years",
    location: "Jamshedpur",
    productsSupplied: ["Control Valves", "Electrical Controls"]
  }
];
