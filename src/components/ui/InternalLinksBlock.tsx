import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { catalogProducts } from '@/data/catalogProducts';
import { catalogBrands } from '@/data/catalogBrands';

interface InternalLinksBlockProps {
  currentProductSlug?: string;
  currentBrandSlug?: string;
  currentCategorySlug?: string;
}

export function InternalLinksBlock({ 
  currentProductSlug, 
  currentBrandSlug, 
  currentCategorySlug 
}: InternalLinksBlockProps) {
  
  // Logic to get some related links based on what we are viewing
  const otherBrands = catalogBrands.filter(b => b.slug !== currentBrandSlug).slice(0, 4);
  const otherProducts = catalogProducts.filter(p => p.slug !== currentProductSlug).slice(0, 6);
  
  return (
    <div className="border-t border-slate-200 bg-slate-50 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold text-navy mb-8">Explore More from UTS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Top Brands */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Top Brands</h4>
            <ul className="space-y-3">
              {otherBrands.map(brand => (
                <li key={brand.slug}>
                  <Link href={`/brands/${brand.slug}`} className="text-slate-600 hover:text-[#F97316] font-medium transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#F97316]" />
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-slate-600 hover:text-[#F97316] font-medium transition-colors">
                  View All Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Categories</h4>
            <ul className="space-y-3">
              {['valves', 'construction-chemicals', 'pest-control', 'pumps'].map(cat => (
                <li key={cat}>
                  <Link href={`/products/category/${cat}`} className="text-slate-600 hover:text-[#F97316] font-medium transition-colors flex items-center group capitalize">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#F97316]" />
                    {cat.replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Products */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Featured Products</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherProducts.map(product => (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="text-slate-600 hover:text-[#F97316] font-medium transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#F97316]" />
                    <span className="truncate">{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
