"use client";
import React, { useState } from "react";
import { BrandCard } from "@/components/cards/BrandCard";
import { mockBrands } from "@/lib/data/mockBrands";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BrandDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  // Extract unique industries for filter
  const allIndustries = Array.from(new Set(mockBrands.flatMap(b => b.industries))).sort();

  const filteredBrands = mockBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          brand.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = activeIndustry ? brand.industries.includes(activeIndustry) : true;
    return matchesSearch && matchesIndustry;
  });

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeIndustry === null ? "default" : "outline"} 
              onClick={() => setActiveIndustry(null)}
              className={activeIndustry === null ? "bg-slate-900 hover:bg-slate-800 text-white" : "text-slate-600 bg-white border-slate-200 hover:bg-slate-50"}
            >
              All Brands
            </Button>
            {allIndustries.slice(0, 4).map(industry => (
              <Button 
                key={industry}
                variant={activeIndustry === industry ? "default" : "outline"} 
                onClick={() => setActiveIndustry(industry)}
                className={activeIndustry === industry ? "bg-slate-900 hover:bg-slate-800 text-white" : "text-slate-600 bg-white border-slate-200 hover:bg-slate-50"}
              >
                {industry}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 focus-visible:ring-slate-900"
            />
          </div>
        </div>

        {/* Directory Grid */}
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No brands found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
            <Button 
              variant="link" 
              onClick={() => { setSearchQuery(""); setActiveIndustry(null); }}
              className="text-[#F97316] hover:text-[#ea580c] mt-4 font-semibold"
            >
              Clear all filters
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
