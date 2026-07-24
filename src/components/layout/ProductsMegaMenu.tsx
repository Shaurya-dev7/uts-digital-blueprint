"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Box, Layers, Factory, GitCompare, ChevronRight } from "lucide-react";

interface ProductsMegaMenuProps {
  isVisible: boolean;
}

export function ProductsMegaMenu({ isVisible }: ProductsMegaMenuProps) {
  const categories = [
    { name: "Valves", slug: "valves" },
    { name: "Construction Chemicals", slug: "construction-chemicals" },
    { name: "Agriculture Equipment", slug: "agriculture-equipment" },
    { name: "Pumps", slug: "pumps" }
  ];

  const brands = [
    { name: "Chembond", slug: "chembond" },
    { name: "IGEBA", slug: "igeba" },
    { name: "Darling Muesco", slug: "darling-muesco" }
  ];

  const industries = [
    { name: "Steel", slug: "steel" },
    { name: "Mining", slug: "mining" },
    { name: "Construction", slug: "construction" }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-max pointer-events-auto z-50 hidden md:block"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-[800px] flex text-left cursor-default">
            
            {/* Main Links Section */}
            <div className="w-2/3 p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-extrabold text-navy flex items-center gap-2">
                  <Box className="text-[#F97316] w-6 h-6" /> Product Catalog
                </h3>
                <Link href="/products" className="text-sm font-bold text-navy hover:text-[#F97316] flex items-center transition-colors">
                  View All Products <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Browse by Category
                  </h4>
                  <ul className="space-y-3">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/products?category=${c.slug}`} className="text-slate-600 hover:text-navy hover:font-semibold transition-all flex items-center group">
                          {c.name}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:ml-1 text-[#F97316] transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industries */}
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Factory className="w-4 h-4" /> Browse by Industry
                  </h4>
                  <ul className="space-y-3">
                    {industries.map((ind) => (
                      <li key={ind.slug}>
                        <Link href={`/products?industry=${ind.slug}`} className="text-slate-600 hover:text-navy hover:font-semibold transition-all flex items-center group">
                          {ind.name}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:ml-1 text-[#F97316] transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Highlight Section (Right Panel) */}
            <div className="w-1/3 bg-slate-50 p-8 border-l border-slate-100 flex flex-col">
              <div className="mb-auto">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Featured Brands
                </h4>
                <ul className="space-y-3">
                  {brands.map((b) => (
                    <li key={b.slug}>
                      <Link href={`/brands/${b.slug}`} className="block px-4 py-3 bg-white border border-slate-200 rounded-xl text-navy font-bold hover:border-[#F97316] hover:shadow-md transition-all">
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Link href="/products/compare" className="group flex flex-col items-center justify-center p-6 bg-navy rounded-2xl text-white hover:bg-[#F97316] transition-colors text-center shadow-lg">
                  <GitCompare className="w-8 h-8 mb-3 opacity-80 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Compare Products</span>
                  <span className="text-xs text-white/70 mt-1">Side-by-side specs</span>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
