"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const ProductModelDynamic = dynamic(
  () => import("@/components/3d/ProductModel").then((mod) => mod.ProductModel),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="w-8 h-8 text-[#F97316] animate-spin mb-4" />
      </div>
    )
  }
);

export const ProductModelWrapper = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only need to load it once
        }
      },
      { rootMargin: "200px" } // Load it a bit before it enters the viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full min-h-[300px] relative">
      {isInView ? <ProductModelDynamic /> : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent">
          <Loader2 className="w-8 h-8 text-[#F97316] animate-spin mb-4 opacity-50" />
        </div>
      )}
    </div>
  );
};
