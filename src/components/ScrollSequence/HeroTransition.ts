/**
 * HeroTransition — Cinematic dissolve + UTS logo reveal
 * 
 * Manages the transition from the scroll sequence canvas to the existing
 * hero section. Orchestrates a multi-property dissolve (fade, scale, blur,
 * brightness) on the canvas and a premium logo reveal animation.
 * All transitions are fully reversible on scroll-up.
 */

import gsap from 'gsap';

export interface TransitionElements {
  /** The canvas container that will dissolve out */
  canvasContainer: HTMLElement;
  /** The UTS logo overlay element */
  logoOverlay: HTMLElement;
  /** The hero section content wrapper */
  heroContent: HTMLElement;
}

export class HeroTransition {
  private elements: TransitionElements;
  private canvasTimeline: gsap.core.Timeline | null = null;
  private logoTimeline: gsap.core.Timeline | null = null;
  private destroyed: boolean = false;

  // Transition starts at 96% scroll progress
  private readonly TRANSITION_START = 0.92;
  // Transition ends at 100%
  private readonly TRANSITION_END = 1.0;

  constructor(elements: TransitionElements) {
    this.elements = elements;
    this.setupInitialState();
  }

  /**
   * Set initial states for all transition elements.
   */
  private setupInitialState(): void {
    // Canvas starts fully visible
    gsap.set(this.elements.canvasContainer, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) brightness(1)',
    });

    // Logo overlay starts hidden
    gsap.set(this.elements.logoOverlay, {
      opacity: 0,
    });
    if (this.elements.logoOverlay.firstElementChild) {
      gsap.set(this.elements.logoOverlay.firstElementChild, {
        scale: 0.85,
        y: 30,
      });
    }

    // Hero content starts hidden
    gsap.set(this.elements.heroContent, {
      opacity: 0,
    });
  }

  /**
   * Update the transition based on scroll progress (0–1).
   * Called every frame by the ScrollController.
   */
  update(progress: number): void {
    if (this.destroyed) return;

    if (progress < this.TRANSITION_START) {
      // Before transition zone — ensure everything is reset
      this.resetToStart();
      return;
    }

    // Calculate local progress within the transition zone (0–1)
    const localProgress = Math.min(
      (progress - this.TRANSITION_START) / (this.TRANSITION_END - this.TRANSITION_START),
      1
    );

    this.applyTransition(localProgress);
  }

  /**
   * Reset all elements to their pre-transition state.
   */
  private resetToStart(): void {
    // Kill any running timelines
    if (this.canvasTimeline) {
      this.canvasTimeline.kill();
      this.canvasTimeline = null;
    }
    if (this.logoTimeline) {
      this.logoTimeline.kill();
      this.logoTimeline = null;
    }

    gsap.set(this.elements.canvasContainer, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) brightness(1)',
    });

    gsap.set(this.elements.logoOverlay, {
      opacity: 0,
    });
    if (this.elements.logoOverlay.firstElementChild) {
      gsap.set(this.elements.logoOverlay.firstElementChild, {
        scale: 0.85,
        y: 30,
      });
    }

    gsap.set(this.elements.heroContent, {
      opacity: 0,
    });
  }

  /**
   * Apply the transition effect based on local progress (0–1).
   */
  private applyTransition(localProgress: number): void {
    // Use power3.out easing for cinematic feel
    const eased = this.easeOutPower3(localProgress);

    // Canvas dissolve
    const canvasOpacity = 1 - eased;
    const canvasScale = 1 + (0.06 * eased);
    const blurAmount = 6 * eased;
    const brightness = 1 - (0.1 * eased);

    gsap.set(this.elements.canvasContainer, {
      opacity: canvasOpacity,
      scale: canvasScale,
      filter: `blur(${blurAmount}px) brightness(${brightness})`,
    });

    // Logo reveal — starts at 20% of transition progress
    const logoDelay = 0.2;
    if (localProgress > logoDelay) {
      const logoProgress = Math.min((localProgress - logoDelay) / (1 - logoDelay), 1);
      const logoEased = this.easeOutPower3(logoProgress);

      gsap.set(this.elements.logoOverlay, {
        opacity: logoEased,
      });
      
      if (this.elements.logoOverlay.firstElementChild) {
        gsap.set(this.elements.logoOverlay.firstElementChild, {
          scale: 0.85 + (0.15 * logoEased),
          y: 30 * (1 - logoEased),
        });
      }
    } else {
      gsap.set(this.elements.logoOverlay, {
        opacity: 0,
      });
      
      if (this.elements.logoOverlay.firstElementChild) {
        gsap.set(this.elements.logoOverlay.firstElementChild, {
          scale: 0.85,
          y: 30,
        });
      }
    }

    // Hero content — fades in at the very end
    const heroDelay = 0.6;
    if (localProgress > heroDelay) {
      const heroProgress = Math.min((localProgress - heroDelay) / (1 - heroDelay), 1);
      const heroEased = this.easeOutPower3(heroProgress);

      gsap.set(this.elements.heroContent, {
        opacity: heroEased,
      });
    } else {
      gsap.set(this.elements.heroContent, {
        opacity: 0,
      });
    }
  }

  /**
   * Power3 ease-out function.
   * Matches GSAP's power3.out easing.
   */
  private easeOutPower3(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Clean up all resources.
   */
  destroy(): void {
    this.destroyed = true;

    if (this.canvasTimeline) {
      this.canvasTimeline.kill();
      this.canvasTimeline = null;
    }

    if (this.logoTimeline) {
      this.logoTimeline.kill();
      this.logoTimeline = null;
    }
  }
}
