"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt?: string;
  speed?: number; // Parallax speed factor (0 to 1)
  className?: string;
}

export function ParallaxImage({ src, alt = "", speed = 0.5, className = "" }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !imageRef.current) return;

    // The image should be taller than the container to allow for parallax scrolling
    // We scale it up by (1 + speed) so we have room to move it up/down
    gsap.set(imageRef.current, { scale: 1 + speed });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // when the top of the container hits the bottom of the viewport
        end: "bottom top", // when the bottom of the container hits the top of the viewport
        scrub: true,
      },
    });

    // Move the image down as we scroll down
    tl.fromTo(
      imageRef.current,
      { yPercent: - (speed * 50) },
      { yPercent: (speed * 50), ease: "none" }
    );

    return () => {
      if (tl) tl.kill();
    };
  }, [speed, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover origin-center"
      />
    </div>
  );
}
