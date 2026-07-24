"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/catalog";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/cards/ProductCard";

export function useRecentlyViewed(currentProductId?: string) {
  useEffect(() => {
    if (!currentProductId) return;

    try {
      const stored = localStorage.getItem("recentlyViewed");
      let viewedIds: string[] = stored ? JSON.parse(stored) : [];

      // Remove if exists to bring it to front
      viewedIds = viewedIds.filter((id) => id !== currentProductId);
      
      // Add to front
      viewedIds.unshift(currentProductId);

      // Keep only last 8
      if (viewedIds.length > 8) {
        viewedIds = viewedIds.slice(0, 8);
      }

      localStorage.setItem("recentlyViewed", JSON.stringify(viewedIds));
    } catch (e) {
      console.error("Failed to update recently viewed", e);
    }
  }, [currentProductId]);
}

export function RecentlyViewedTracker({ productId }: { productId: string }) {
  useRecentlyViewed(productId);
  return null;
}

export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentlyViewed");
      if (stored) {
        const viewedIds: string[] = JSON.parse(stored);
        // Exclude current product and map to full product objects
        const products = viewedIds
          .filter(id => id !== currentProductId)
          .map(id => mockProducts.find(p => p.id === id))
          .filter(Boolean) as Product[];
        
        setRecentProducts(products.slice(0, 4));
      }
    } catch (e) {
      console.error("Failed to load recently viewed", e);
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="py-16 bg-white border-t border-slate-100" id="recently-viewed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-navy mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentProducts.map(p => (
            <ProductCard
              key={p.id}
              name={p.name}
              category={p.categorySlugs[0] || 'Equipment'}
              description={p.shortDescription}
              imagePlaceholder={p.images[0]?.url || "/images/hero-bg.jpg"}
              slug={p.slug}
              brand={p.brandSlug}
              statuses={p.statuses}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
