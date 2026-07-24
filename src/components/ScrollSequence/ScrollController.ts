/**
 * ScrollController — Scroll-lock + wheel-driven image sequence
 * 
 * Locks page scrolling while the image sequence is active.
 * Captures wheel/touch events directly to scrub through frames.
 * Once the full sequence completes, unlocks page scrolling.
 * If user scrolls back to the top, re-locks for reverse scrubbing.
 * 
 * Uses requestAnimationFrame with lerp for 60fps smooth frame scrubbing.
 */

import { CanvasRenderer } from './CanvasRenderer';
import { FrameLoader } from './FrameLoader';

export type TransitionCallback = (progress: number) => void;

export class ScrollController {
  private renderer: CanvasRenderer;
  private loader: FrameLoader;
  private container: HTMLElement;
  private totalFrames: number;

  // Animation state
  private currentFrame: number = 0;
  private targetFrame: number = 0;
  private rafId: number | null = null;
  private destroyed: boolean = false;
  private transitionCallback: TransitionCallback | null = null;
  private lockChangeCallback: ((isLocked: boolean) => void) | null = null;
  private scrollProgress: number = 0;

  // Scroll lock state
  private isLocked: boolean = false;
  private inLogoPhase: boolean = false;
  private sequenceComplete: boolean = false;
  private accumulatedDelta: number = 0;
  private logoPhaseTimeout: ReturnType<typeof setTimeout> | null = null;

  // How many pixels of wheel delta = 1 full sequence
  private readonly TOTAL_WHEEL_DISTANCE: number;

  // Lerp factor — lower = smoother (more interpolation frames), higher = snappier
  private readonly LERP_FACTOR = 0.15;

  // Bound event handlers (for cleanup)
  private boundWheel: (e: WheelEvent) => void;
  private boundTouchStart: (e: TouchEvent) => void;
  private boundTouchMove: (e: TouchEvent) => void;
  private boundScroll: () => void;
  private boundKeyDown: (e: KeyboardEvent) => void;

  // Touch tracking
  private lastTouchY: number = 0;

  // Original body styles (for restore on destroy)
  private originalOverflow: string = '';
  private originalHtmlOverflow: string = '';
  private originalHeight: string = '';
  private originalPosition: string = '';

  constructor(
    container: HTMLElement,
    renderer: CanvasRenderer,
    loader: FrameLoader,
    totalFrames: number
  ) {
    this.container = container;
    this.renderer = renderer;
    this.loader = loader;
    this.totalFrames = totalFrames;

    // Each frame requires ~40px of wheel delta to scrub through
    this.TOTAL_WHEEL_DISTANCE = totalFrames * 40;

    // Bind handlers
    this.boundWheel = this.handleWheel.bind(this);
    this.boundTouchStart = this.handleTouchStart.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.boundScroll = this.handlePageScroll.bind(this);
    this.boundKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Initialize scroll locking and event listeners.
   */
  init(): void {
    this.lockScroll();
    this.attachEvents();
    this.startRenderLoop();
  }

  /**
   * Lock page scrolling by setting overflow: hidden on body + html.
   */
  private lockScroll(): void {
    if (this.isLocked) return;
    this.isLocked = true;

    // Stop lenis globally — dispatch immediately and with retries
    // to catch late-initializing Lenis
    window.dispatchEvent(new Event('lenis:stop'));
    setTimeout(() => window.dispatchEvent(new Event('lenis:stop')), 50);
    setTimeout(() => window.dispatchEvent(new Event('lenis:stop')), 200);

    // Save originals
    this.originalOverflow = document.body.style.overflow;
    this.originalHtmlOverflow = document.documentElement.style.overflow;
    this.originalHeight = document.body.style.height;
    this.originalPosition = document.body.style.position;

    // Lock
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';

    // Reset page scroll to top
    window.scrollTo(0, 0);

    // Notify listener
    this.lockChangeCallback?.(true);
  }

  /**
   * Unlock page scrolling — restores original body styles.
   */
  private unlockScroll(): void {
    if (!this.isLocked) return;
    this.isLocked = false;

    // Restore
    document.body.style.overflow = this.originalOverflow;
    document.documentElement.style.overflow = this.originalHtmlOverflow;
    document.body.style.height = this.originalHeight;
    document.body.style.position = this.originalPosition;
    document.body.style.width = '';
    document.body.style.top = '';

    // Start lenis globally
    window.dispatchEvent(new Event('lenis:start'));

    // Notify listener
    this.lockChangeCallback?.(false);
  }

  /**
   * Attach wheel, touch, scroll, and keyboard event listeners.
   * Uses CAPTURE phase so we intercept wheel events BEFORE Lenis processes them.
   */
  private attachEvents(): void {
    window.addEventListener('wheel', this.boundWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', this.boundTouchStart, { passive: true });
    window.addEventListener('touchmove', this.boundTouchMove, { passive: false, capture: true });
    window.addEventListener('scroll', this.boundScroll, { passive: true });
    window.addEventListener('keydown', this.boundKeyDown, { passive: false });
  }

  /**
   * Handle wheel events — drive frame sequence when locked.
   */
  private handleWheel(e: WheelEvent): void {
    if (this.destroyed) return;

    if (this.isLocked) {
      // Prevent page scroll
      e.preventDefault();

      const delta = this.normalizeDelta(e.deltaY);

      if (this.inLogoPhase) {
        if (delta > 0) {
          // Scroll down from logo phase -> start main site
          this.completeSequence();
          return;
        }
      }

      // Accumulate delta (normalize for different browsers/devices)
      this.accumulatedDelta = Math.max(0, Math.min(
        this.accumulatedDelta + delta,
        this.TOTAL_WHEEL_DISTANCE
      ));

      // Calculate progress and target frame
      this.scrollProgress = this.accumulatedDelta / this.TOTAL_WHEEL_DISTANCE;
      this.targetFrame = Math.round(this.scrollProgress * (this.totalFrames - 1));

      // Fire transition callback
      if (this.transitionCallback) {
        this.transitionCallback(this.scrollProgress);
      }

      // Enter or exit logo phase based on progress
      if (this.scrollProgress >= 1 && !this.inLogoPhase && !this.sequenceComplete) {
        this.enterLogoPhase();
      } else if (this.scrollProgress < 1 && this.inLogoPhase) {
        this.exitLogoPhase();
      }

      // If scrolling up at the very start, do nothing (already at start)
    } else if (!this.isLocked && this.sequenceComplete) {
      // Page is unlocked — check if we should re-lock
      // (handled by scroll event listener)
    }
  }

  /**
   * Handle touch start — record initial touch position.
   */
  private handleTouchStart(e: TouchEvent): void {
    if (this.destroyed) return;
    if (e.touches.length > 0) {
      this.lastTouchY = e.touches[0].clientY;
    }
  }

  /**
   * Handle touch move — drive frame sequence when locked.
   */
  private handleTouchMove(e: TouchEvent): void {
    if (this.destroyed) return;
    if (!this.isLocked) return;
    if (e.touches.length === 0) return;

    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const delta = this.lastTouchY - currentY; // Positive = swipe up = scroll down
    this.lastTouchY = currentY;

    if (this.inLogoPhase) {
      if (delta > 0) {
        this.completeSequence();
        return;
      }
    }

    // Scale touch delta to feel natural
    const scaledDelta = delta * 2;

    this.accumulatedDelta = Math.max(0, Math.min(
      this.accumulatedDelta + scaledDelta,
      this.TOTAL_WHEEL_DISTANCE
    ));

    this.scrollProgress = this.accumulatedDelta / this.TOTAL_WHEEL_DISTANCE;
    this.targetFrame = Math.round(this.scrollProgress * (this.totalFrames - 1));

    if (this.transitionCallback) {
      this.transitionCallback(this.scrollProgress);
    }

    if (this.scrollProgress >= 1 && !this.inLogoPhase && !this.sequenceComplete) {
      this.enterLogoPhase();
    } else if (this.scrollProgress < 1 && this.inLogoPhase) {
      this.exitLogoPhase();
    }
  }

  /**
   * Handle keyboard navigation (arrow keys, page up/down, space).
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (this.destroyed || !this.isLocked) return;

    const scrollKeys: Record<string, number> = {
      'ArrowDown': 80,
      'ArrowUp': -80,
      'PageDown': 300,
      'PageUp': -300,
      ' ': 300,           // Space
      'End': this.TOTAL_WHEEL_DISTANCE, // Jump to end
      'Home': -this.TOTAL_WHEEL_DISTANCE, // Jump to start
    };

    const delta = scrollKeys[e.key];
    if (delta === undefined) return;

    e.preventDefault();

    if (this.inLogoPhase) {
      if (delta > 0) {
        this.completeSequence();
        return;
      }
    }

    this.accumulatedDelta = Math.max(0, Math.min(
      this.accumulatedDelta + delta,
      this.TOTAL_WHEEL_DISTANCE
    ));

    this.scrollProgress = this.accumulatedDelta / this.TOTAL_WHEEL_DISTANCE;
    this.targetFrame = Math.round(this.scrollProgress * (this.totalFrames - 1));

    if (this.transitionCallback) {
      this.transitionCallback(this.scrollProgress);
    }

    if (this.scrollProgress >= 1 && !this.inLogoPhase && !this.sequenceComplete) {
      this.enterLogoPhase();
    } else if (this.scrollProgress < 1 && this.inLogoPhase) {
      this.exitLogoPhase();
    }
  }

  /**
   * Handle page scroll — re-lock if user scrolls back to the very top.
   */
  private handlePageScroll(): void {
    if (this.destroyed || this.isLocked) return;

    // If user has scrolled back to the top and sequence was complete,
    // re-lock to allow reverse scrubbing through the sequence
    if (window.scrollY <= 0 && this.sequenceComplete) {
      this.sequenceComplete = false;
      this.inLogoPhase = false;
      // Set accumulated delta just before the end so they scrub back naturally
      this.accumulatedDelta = this.TOTAL_WHEEL_DISTANCE - 1;
      this.scrollProgress = this.accumulatedDelta / this.TOTAL_WHEEL_DISTANCE;
      this.targetFrame = this.totalFrames - 1;
      this.lockScroll();
    }
  }

  /**
   * Enter the logo phase (white screen, paused).
   */
  private enterLogoPhase(): void {
    if (this.inLogoPhase || this.sequenceComplete) return;
    this.inLogoPhase = true;
    this.logoPhaseTimeout = setTimeout(() => {
      if (this.inLogoPhase && !this.sequenceComplete) {
        this.completeSequence();
      }
    }, 3000);
  }

  /**
   * Exit the logo phase (user scrubbed backwards).
   */
  private exitLogoPhase(): void {
    if (!this.inLogoPhase) return;
    this.inLogoPhase = false;
    if (this.logoPhaseTimeout) {
      clearTimeout(this.logoPhaseTimeout);
      this.logoPhaseTimeout = null;
    }
  }

  /**
   * Complete the sequence, fade out, and unlock the page.
   */
  private completeSequence(): void {
    this.exitLogoPhase();
    this.sequenceComplete = true;
    this.unlockScroll();
  }

  /**
   * Normalize wheel delta across browsers.
   * Different browsers report deltaY in different units.
   */
  private normalizeDelta(deltaY: number): number {
    // Most browsers: deltaY in pixels (typically 100-150 per notch)
    // Firefox: deltaY in lines (typically 3 per notch) when deltaMode is 1
    // Clamp to prevent huge jumps from trackpad momentum
    return Math.max(-150, Math.min(150, deltaY));
  }

  /**
   * Start the requestAnimationFrame render loop.
   * Lerp interpolates between current and target frame for smooth motion.
   */
  private startRenderLoop(): void {
    const tick = () => {
      if (this.destroyed) return;

      // Lerp toward target frame
      const diff = this.targetFrame - this.currentFrame;

      if (Math.abs(diff) > 0.1) {
        this.currentFrame += diff * this.LERP_FACTOR;
      } else {
        this.currentFrame = this.targetFrame;
      }

      // Sub-frame cross-fade blending for cinema-smooth transitions
      const floor = Math.floor(this.currentFrame);
      const ceil = Math.ceil(this.currentFrame);
      const blend = this.currentFrame - floor;

      if (blend > 0.01 && floor !== ceil) {
        // Between two frames — cross-fade blend them
        const imgA = this.loader.getNearestFrame(floor);
        const imgB = this.loader.getNearestFrame(ceil);

        if (imgA && imgB && imgA !== imgB) {
          this.renderer.drawBlendedFrame(imgA, imgB, blend);
        } else {
          const fallback = imgA || imgB;
          if (fallback) this.renderer.drawFrame(fallback);
        }
      } else {
        // Exactly on a frame — draw it directly (with skip optimization)
        const image = this.loader.getNearestFrame(Math.round(this.currentFrame));
        if (image) this.renderer.drawFrame(image);
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  /**
   * Register a callback for scroll progress updates.
   * Used by HeroTransition to trigger the dissolve effect.
   */
  onProgress(callback: TransitionCallback): void {
    this.transitionCallback = callback;
  }

  /**
   * Register a callback for scroll lock state changes.
   * Called with true when scroll is locked, false when unlocked.
   */
  onLockChange(callback: (isLocked: boolean) => void): void {
    this.lockChangeCallback = callback;
  }

  /**
   * Get current scroll progress (0 to 1).
   */
  getProgress(): number {
    return this.scrollProgress;
  }

  /**
   * Clean up all resources.
   */
  destroy(): void {
    this.destroyed = true;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    // Remove event listeners (must match capture phase used in attachEvents)
    window.removeEventListener('wheel', this.boundWheel, { capture: true });
    window.removeEventListener('touchstart', this.boundTouchStart);
    window.removeEventListener('touchmove', this.boundTouchMove, { capture: true });
    window.removeEventListener('scroll', this.boundScroll);
    window.removeEventListener('keydown', this.boundKeyDown);

    // Always unlock scroll on destroy
    this.unlockScroll();

    this.transitionCallback = null;
    this.lockChangeCallback = null;
  }
}
