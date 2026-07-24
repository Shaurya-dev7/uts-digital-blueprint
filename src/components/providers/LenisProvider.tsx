'use client';

/**
 * LenisProvider — Centralized smooth scroll engine
 * 
 * Always mounts ReactLenis. Uses autoRaf={false} so we drive the RAF 
 * loop through GSAP's ticker for perfect synchronization.
 * 
 * Listens for lenis:stop / lenis:start events from ScrollController
 * to pause/resume smooth scrolling during the LandingSequence.
 * 
 * IMPORTANT: Children are always mounted — no conditional rendering
 * to avoid React re-mount loops.
 */

import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useCallback } from 'react';

// Register ScrollTrigger globally once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  // Helper to safely get the Lenis instance
  const getLenis = useCallback(() => lenisRef.current?.lenis, []);

  // GSAP ticker synchronization
  useEffect(() => {
    function update(time: number) {
      getLenis()?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [getLenis]);

  // Lenis stop/start event listeners
  useEffect(() => {
    const handleStop = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
      }
    };

    const handleStart = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
      }
    };

    window.addEventListener('lenis:stop', handleStop);
    window.addEventListener('lenis:start', handleStart);

    return () => {
      window.removeEventListener('lenis:stop', handleStop);
      window.removeEventListener('lenis:start', handleStart);
    };
  }, [getLenis]);

  // Hash link global interceptor
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        if (anchor.hash === '#') return;

        e.preventDefault();
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(anchor.hash, { offset: -100, duration: 1.2 });
        } else {
          const el = document.querySelector(anchor.hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', anchor.hash);
      }
    };

    document.addEventListener('click', handleHashClick);
    return () => document.removeEventListener('click', handleHashClick);
  }, [getLenis]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
