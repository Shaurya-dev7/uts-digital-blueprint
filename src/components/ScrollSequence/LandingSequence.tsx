'use client';

/**
 * LandingSequence — Cinematic scroll-driven image sequence landing experience
 * 
 * Full-screen Canvas-based scroll animation that plays through an image sequence
 * like a real video, pinned to the viewport. After the sequence completes,
 * it dissolves cinematically into the existing hero section.
 * 
 * All rendering happens via refs and direct DOM/Canvas API — zero React state
 * updates in the hot render path for 60fps performance.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { Mouse } from 'lucide-react';
import { FrameLoader } from './FrameLoader';
import { CanvasRenderer } from './CanvasRenderer';
import { ScrollController } from './ScrollController';
import { HeroTransition } from './HeroTransition';

export function LandingSequence() {
  // DOM refs — no state for performance
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Controller refs — survive re-renders without triggering them
  const loaderRef = useRef<FrameLoader | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const scrollControllerRef = useRef<ScrollController | null>(null);
  const transitionRef = useRef<HeroTransition | null>(null);
  const initializedRef = useRef(false);

  /**
   * Initialize the entire system.
   * Only runs once on mount.
   */
  const initialize = useCallback(async () => {
    if (initializedRef.current) return;
    if (!containerRef.current || !canvasRef.current || !canvasWrapperRef.current ||
        !logoOverlayRef.current || !heroContentRef.current) return;

    initializedRef.current = true;

    // 1. Create frame loader and detect frames
    const loader = new FrameLoader('/landing/sequence/', 'jpg');
    loaderRef.current = loader;

    // Show progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.opacity = '1';
    }

    // Set up progress callback for loading indicator
    loader.onProgress((loaded, total) => {
      if (progressFillRef.current) {
        const pct = (loaded / total) * 100;
        progressFillRef.current.style.width = `${pct}%`;
      }

      // Hide progress bar when fully loaded
      if (loaded === total && progressBarRef.current) {
        setTimeout(() => {
          if (progressBarRef.current) {
            progressBarRef.current.style.opacity = '0';
          }
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = '1';
            scrollIndicatorRef.current.style.pointerEvents = 'auto';
          }
        }, 500);
      }
    });

    // 2. Start loading (auto-detects frame count)
    const loadPromise = loader.startLoading();

    // 3. Wait for first frame to be ready
    const firstFrame = await loader.firstFrameReady;

    // 4. Initialize Canvas renderer and paint first frame immediately
    const renderer = new CanvasRenderer(canvasRef.current);
    rendererRef.current = renderer;
    renderer.drawFrame(firstFrame);

    // 5. Wait for enough frames to enable scrolling (at least wave 1)
    await loadPromise;

    const totalFrames = loader.getTotalFrames();
    if (totalFrames === 0) return;

    // 6. Initialize the hero transition
    const transition = new HeroTransition({
      canvasContainer: canvasWrapperRef.current,
      logoOverlay: logoOverlayRef.current,
      heroContent: heroContentRef.current,
    });
    transitionRef.current = transition;

    // 7. Initialize scroll controller
    const scrollController = new ScrollController(
      containerRef.current,
      renderer,
      loader,
      totalFrames
    );
    scrollControllerRef.current = scrollController;

    // Connect scroll progress to transition
    scrollController.onProgress((progress) => {
      transition.update(progress);
      
      if (scrollIndicatorRef.current) {
        if (progress > 0.01) {
          scrollIndicatorRef.current.style.opacity = '0';
          scrollIndicatorRef.current.style.pointerEvents = 'none';
        } else if (loaderRef.current && loaderRef.current.getLoadedCount() === loaderRef.current.getTotalFrames()) {
          scrollIndicatorRef.current.style.opacity = '1';
          scrollIndicatorRef.current.style.pointerEvents = 'auto';
        }
      }
    });

    scrollController.init();
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is fully painted
    const timer = setTimeout(initialize, 100);

    return () => {
      clearTimeout(timer);

      // Destroy in reverse order
      scrollControllerRef.current?.destroy();
      transitionRef.current?.destroy();
      rendererRef.current?.destroy();
      loaderRef.current?.destroy();

      initializedRef.current = false;
    };
  }, [initialize]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: '100vh' }}
      aria-label="Cinematic product showcase"
    >
      {/* Canvas Wrapper — receives dissolve transforms */}
      <div
        ref={canvasWrapperRef}
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'opacity, transform, filter',
          transformOrigin: 'center center',
        }}
      >
        {/* Full-screen Canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* UTS Logo Overlay — revealed during transition */}
      <div
        ref={logoOverlayRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-white"
        style={{
          opacity: 0,
          willChange: 'opacity',
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Logo Icon */}
          <div className="relative w-20 h-20 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/20 to-transparent" />
            <span className="text-4xl font-extrabold text-white tracking-tighter relative z-10">
              UTS
            </span>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col items-center">
            <span className="text-slate-900 font-bold text-2xl tracking-widest uppercase leading-tight">
              Universal
            </span>
            <span className="text-[#F97316] font-bold text-2xl tracking-widest uppercase leading-tight">
              Techno Services
            </span>
          </div>

          {/* Tagline */}
          <p className="text-slate-500 font-medium text-sm tracking-[0.3em] uppercase mt-2">
            Engineering Industrial Excellence
          </p>
        </div>
      </div>

      {/* Hero Content Reveal — shown at the end of transition */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 z-5"
        style={{
          opacity: 0,
          willChange: 'opacity',
        }}
      />

      {/* Loading Progress Bar — subtle, at the bottom */}
      <div
        ref={progressBarRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500"
        style={{ opacity: 0 }}
      >
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressFillRef}
            className="h-full bg-[#F97316]/70 rounded-full transition-all duration-200 ease-out"
            style={{ width: '0%' }}
          />
        </div>
      </div>

      {/* Scroll Indicator Box */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-2xl">
          <Mouse className="w-5 h-5 animate-bounce" />
          <span className="text-sm font-semibold tracking-wider uppercase">Scroll for Animation</span>
        </div>
      </div>
    </section>
  );
}
