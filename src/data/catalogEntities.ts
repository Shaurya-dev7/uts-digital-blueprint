import { Category, Subcategory, Industry, Application } from "@/types/catalog";

export const catalogCategories: Category[] = [
  { id: "cat-valves", slug: "valves", name: "Valves", description: "Industrial valves for flow control." },
  { id: "cat-pumps", slug: "pumps", name: "Pumps", description: "High-performance pumps for various applications." },
  { id: "cat-agriculture", slug: "agriculture-equipment", name: "Agriculture Equipment", description: "Machinery and equipment for agriculture." },
  { id: "cat-chemicals", slug: "construction-chemicals", name: "Construction Chemicals", description: "Specialty chemicals for building and construction." }
];

export const catalogSubcategories: Subcategory[] = [
  { id: "subcat-gate-valves", slug: "gate-valves", name: "Gate Valves", parentCategorySlug: "valves" },
  { id: "subcat-globe-valves", slug: "globe-valves", name: "Globe Valves", parentCategorySlug: "valves" },
  { id: "subcat-check-valves", slug: "check-valves", name: "Check Valves", parentCategorySlug: "valves" },
  { id: "subcat-butterfly-valves", slug: "butterfly-valves", name: "Butterfly Valves", parentCategorySlug: "valves" },
  
  { id: "subcat-centrifugal-pumps", slug: "centrifugal-pumps", name: "Centrifugal Pumps", parentCategorySlug: "pumps" },
  { id: "subcat-submersible-pumps", slug: "submersible-pumps", name: "Submersible Pumps", parentCategorySlug: "pumps" },
  { id: "subcat-dosing-pumps", slug: "dosing-pumps", name: "Dosing Pumps", parentCategorySlug: "pumps" },
  
  { id: "subcat-foggers", slug: "foggers", name: "Fogging Machines", parentCategorySlug: "agriculture-equipment" },
  { id: "subcat-sprayers", slug: "sprayers", name: "Sprayers", parentCategorySlug: "agriculture-equipment" },
  
  { id: "subcat-waterproofing", slug: "waterproofing", name: "Waterproofing", parentCategorySlug: "construction-chemicals" },
  { id: "subcat-admixtures", slug: "admixtures", name: "Concrete Admixtures", parentCategorySlug: "construction-chemicals" },
  { id: "subcat-grouts", slug: "grouts", name: "Grouts & Anchors", parentCategorySlug: "construction-chemicals" },
  { id: "subcat-repair", slug: "repair", name: "Concrete Repair", parentCategorySlug: "construction-chemicals" }
];

export const catalogIndustries: Industry[] = [
  { id: "ind-steel", slug: "steel", name: "Steel" },
  { id: "ind-construction", slug: "construction", name: "Construction" },
  { id: "ind-agriculture", slug: "agriculture", name: "Agriculture" },
  { id: "ind-chemical", slug: "chemical", name: "Chemical Processing" },
  { id: "ind-water", slug: "water-treatment", name: "Water Treatment" }
];

export const catalogApplications: Application[] = [
  { id: "app-water-supply", slug: "water-supply", name: "General Water Supply" },
  { id: "app-irrigation", slug: "irrigation", name: "Irrigation" },
  { id: "app-pest-control", slug: "pest-control", name: "Pest Control" },
  { id: "app-cleaning", slug: "high-pressure-cleaning", name: "High Pressure Cleaning" },
  { id: "app-structural", slug: "structural-repair", name: "Structural Repair" },
  { id: "app-flow-control", slug: "flow-control", name: "Flow Control" },
  { id: "app-steam", slug: "steam-systems", name: "Steam Systems" },
  { id: "app-slurry", slug: "slurry-handling", name: "Slurry Handling" }
];
