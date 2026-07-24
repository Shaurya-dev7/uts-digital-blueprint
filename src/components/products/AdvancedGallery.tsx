"use client";
import React, { useState } from 'react';
import { ImageAsset } from '@/types/catalog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Maximize2, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedGalleryProps {
  images: ImageAsset[];
}

export function AdvancedGallery({ images }: AdvancedGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
        No images available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <Dialog>
        <div className="relative aspect-square bg-white border border-slate-200 rounded-2xl overflow-hidden group">
          <img 
            src={activeImage.url} 
            alt={activeImage.alt} 
            className="w-full h-full object-contain p-4"
          />
          <DialogTrigger render={<button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur shadow-sm border border-slate-200 text-slate-700 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white" />}>
            <Maximize2 className="w-5 h-5" />
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-5xl w-full p-1 bg-transparent border-none shadow-none">
          <div className="relative w-full h-[80vh] bg-white rounded-xl overflow-hidden flex items-center justify-center">
            <img 
              src={activeImage.url} 
              alt={activeImage.alt} 
              className="max-w-full max-h-full object-contain p-4"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                activeIndex === i ? "border-[#F97316]" : "border-transparent hover:border-slate-300 bg-white"
              )}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
