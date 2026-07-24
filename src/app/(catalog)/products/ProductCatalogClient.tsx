"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/catalog";
import { ProductCard } from "@/components/cards/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { getBrandBySlug } from "@/lib/data/mockBrands";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface ProductCatalogClientProps {
  initialProducts: Product[];
  allCategories?: string[];
  allBrands?: string[];
  allIndustries?: string[];
  allApplications?: string[];
  activeCategories?: string[];
  activeBrands?: string[];
  activeIndustries?: string[];
  activeApplications?: string[];
  activeStatuses?: string[];
  activeAvailability?: string[];
  hasDownloads?: boolean;
  currentSort?: string;
}

const AVAILABLE_STATUSES = ["Featured", "Popular", "New", "Best Seller"];
const AVAILABLE_AVAILABILITY = ["In Stock", "On Request", "Made in India", "Imported"];

export function ProductCatalogClient({
  initialProducts,
  allCategories = [],
  allBrands = [],
  allIndustries = [],
  allApplications = [],
  activeCategories = [],
  activeBrands = [],
  activeIndustries = [],
  activeApplications = [],
  activeStatuses = [],
  activeAvailability = [],
  hasDownloads = false,
  currentSort = "newest",
}: ProductCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const toggleBooleanFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === "true") {
      params.delete(key);
    } else {
      params.set(key, "true");
    }
    router.push(`/products?${params.toString()}`);
  };

  const updateSort = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-navy text-xl">Filters</h2>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red h-8 px-2 text-xs" onClick={() => router.push('/products')}>
              Clear All
            </Button>
          </div>

          <Accordion defaultValue={["category", "brand", "availability", "status", "industry", "application"]} className="w-full">
            
            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-800">Downloads Available</span>
              <Switch 
                checked={hasDownloads}
                onCheckedChange={() => toggleBooleanFilter("downloads")}
                className="data-[state=checked]:bg-[#F97316]"
              />
            </div>

            <AccordionItem value="availability" className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Availability</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {AVAILABLE_AVAILABILITY.map((avail) => (
                    <div key={avail} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`avail-${avail}`} 
                        checked={activeAvailability.includes(avail)}
                        onCheckedChange={() => updateFilters("availability", avail)}
                        className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                      />
                      <label htmlFor={`avail-${avail}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors">
                        {avail}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="status" className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Product Status</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {AVAILABLE_STATUSES.map((status) => (
                    <div key={status} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={activeStatuses.includes(status)}
                        onCheckedChange={() => updateFilters("status", status)}
                        className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                      />
                      <label htmlFor={`status-${status}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category" className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {allCategories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`cat-${cat}`} 
                        checked={activeCategories.includes(cat)}
                        onCheckedChange={() => updateFilters("category", cat)}
                        className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                      />
                      <label htmlFor={`cat-${cat}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors capitalize">
                        {cat.replace(/-/g, ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand" className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Brands</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {allBrands.map((brandSlug) => {
                    const brand = getBrandBySlug(brandSlug);
                    return (
                      <div key={brandSlug} className="flex items-center space-x-3 group">
                        <Checkbox 
                          id={`brand-${brandSlug}`} 
                          checked={activeBrands.includes(brandSlug)}
                          onCheckedChange={() => updateFilters("brand", brandSlug)}
                          className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                        />
                        <label htmlFor={`brand-${brandSlug}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors capitalize">
                          {brand?.name || brandSlug.replace(/-/g, ' ')}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="industry" className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Industries</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {allIndustries.map((ind) => (
                    <div key={ind} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`ind-${ind}`} 
                        checked={activeIndustries.includes(ind)}
                        onCheckedChange={() => updateFilters("industry", ind)}
                        className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                      />
                      <label htmlFor={`ind-${ind}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors capitalize">
                        {ind.replace(/-/g, ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="application" className="border-none">
              <AccordionTrigger className="text-sm font-bold text-slate-800 hover:no-underline hover:text-[#F97316] uppercase tracking-wider text-xs">Applications</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {allApplications.map((app) => (
                    <div key={app} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`app-${app}`} 
                        checked={activeApplications.includes(app)}
                        onCheckedChange={() => updateFilters("application", app)}
                        className="data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                      />
                      <label htmlFor={`app-${app}`} className="text-sm font-semibold text-slate-600 cursor-pointer group-hover:text-navy transition-colors capitalize">
                        {app.replace(/-/g, ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-navy font-extrabold">{initialProducts.length}</span> products
          </p>

          <div className="flex items-center gap-4">
            <Select value={currentSort} onValueChange={updateSort}>
              <SelectTrigger className="w-[180px] bg-slate-50 border-slate-200 font-semibold text-navy rounded-xl">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                <SelectItem value="newest" className="font-medium cursor-pointer">Newest Arrivals</SelectItem>
                <SelectItem value="a-z" className="font-medium cursor-pointer">Name (A-Z)</SelectItem>
                <SelectItem value="z-a" className="font-medium cursor-pointer">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-9 w-9 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm text-navy' : 'text-slate-400 hover:text-navy'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-9 w-9 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm text-navy' : 'text-slate-400 hover:text-navy'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {initialProducts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 border-dashed">
            <h3 className="text-2xl font-extrabold text-slate-300 mb-2">No products found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
            {initialProducts.map((product) => (
              <div key={product.id} className={viewMode === 'list' ? 'h-64' : ''}>
                <ProductCard
                  name={product.name}
                  category={product.categorySlugs[0] || 'Equipment'}
                  description={product.shortDescription}
                  imagePlaceholder={product.images.find(img => img.isHero)?.url || product.images[0]?.url || "/images/hero-bg.jpg"}
                  slug={product.slug}
                  brand={product.brandSlug}
                  statuses={product.statuses}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
