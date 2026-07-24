"use client";

import { useState } from "react";
import { ImageAsset } from "@/types/catalog";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ImageAsset[] }) {
  const [activeImage, setActiveImage] = useState(images.find(img => img.isHero) || images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 font-medium">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[600px] md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0">
        {images.map((img, i) => (
          <button
            key={i}
            className={cn(
              "relative aspect-square w-20 md:w-full rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
              activeImage.url === img.url ? "border-red ring-2 ring-red/20" : "border-transparent hover:border-gray-300"
            )}
            onClick={() => setActiveImage(img)}
          >
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat bg-white mix-blend-multiply" 
              style={{ backgroundImage: `url(${img.url})` }} 
            />
          </button>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div 
        className="flex-1 relative aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-200 ease-out bg-no-repeat mix-blend-multiply",
            isZoomed ? "scale-150" : "bg-center bg-contain"
          )} 
          style={{ 
            backgroundImage: `url(${activeImage.url})`,
            transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : 'center center'
          }} 
        />
        
        {/* Subtle hint when not hovering */}
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            Hover to Zoom
          </div>
        )}
      </div>
    </div>
  );
}
