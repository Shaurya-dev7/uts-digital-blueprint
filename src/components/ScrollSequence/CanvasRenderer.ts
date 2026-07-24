/**
 * CanvasRenderer — Full-screen Canvas with Retina support, cover cropping,
 * and sub-frame cross-fade blending for cinema-smooth transitions.
 * 
 * Renders image frames onto a full-viewport HTML5 Canvas element.
 * Implements object-fit: cover behavior with center cropping.
 * Handles devicePixelRatio for Retina displays.
 * Supports blending two adjacent frames for smooth interpolation.
 */

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentImage: HTMLImageElement | null = null;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private boundHandleResize: () => void;
  private destroyed: boolean = false;

  // Cached dimensions to avoid repeated reads
  private displayWidth: number = 0;
  private displayHeight: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('[CanvasRenderer] Unable to get 2D context');
    }
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = true;

    this.boundHandleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.boundHandleResize);

    this.updateCanvasSize();
  }

  /**
   * Update canvas dimensions to match viewport with DPR scaling.
   */
  private updateCanvasSize(): void {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.displayWidth = width;
    this.displayHeight = height;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.style.transform = 'translateZ(0)';
    this.canvas.style.willChange = 'transform';

    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = true;

    // Redraw current image at new size
    if (this.currentImage) {
      this.clearCanvas();
      this.paintImageCover(this.currentImage);
    }
  }

  /**
   * Throttled resize handler (100ms debounce).
   */
  private handleResize(): void {
    if (this.destroyed) return;

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      if (!this.destroyed) {
        this.updateCanvasSize();
      }
    }, 100);
  }

  /**
   * Draw a single frame onto the canvas.
   * Only redraws if the image reference has changed.
   */
  drawFrame(image: HTMLImageElement | null): void {
    if (this.destroyed || !image) return;

    // Skip if same image (no change)
    if (image === this.currentImage) return;

    this.currentImage = image;
    this.clearCanvas();
    this.paintImageCover(image);
  }

  /**
   * Draw a cross-faded blend of two frames for sub-frame interpolation.
   * Creates cinema-smooth transitions between adjacent frames.
   * 
   * @param imageA - The "floor" frame (drawn at full opacity)
   * @param imageB - The "ceil" frame (drawn at `blend` opacity on top)
   * @param blend - Blend factor 0–1 (0 = all A, 1 = all B)
   */
  drawBlendedFrame(
    imageA: HTMLImageElement,
    imageB: HTMLImageElement,
    blend: number
  ): void {
    if (this.destroyed) return;

    // Invalidate cache since we're blending (always redraw)
    this.currentImage = null;

    // Clear once
    this.clearCanvas();

    // Draw base frame A at full opacity
    this.ctx.globalAlpha = 1;
    this.paintImageCover(imageA);

    // Draw frame B on top with blend alpha for cross-fade
    this.ctx.globalAlpha = blend;
    this.paintImageCover(imageB);

    // Reset alpha
    this.ctx.globalAlpha = 1;
  }

  /**
   * Force redraw the current image (used after resize).
   */
  forceRedraw(): void {
    if (this.currentImage) {
      this.clearCanvas();
      this.paintImageCover(this.currentImage);
    }
  }

  /**
   * Clear the entire canvas.
   */
  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);
  }

  /**
   * Paint an image with object-fit: cover behavior.
   * Center-crops the image to fill the canvas while preserving aspect ratio.
   * Does NOT clear the canvas — caller is responsible for clearing.
   */
  private paintImageCover(image: HTMLImageElement): void {
    const canvasWidth = this.displayWidth;
    const canvasHeight = this.displayHeight;

    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;

    if (imgWidth === 0 || imgHeight === 0) return;

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let sx: number, sy: number, sw: number, sh: number;

    if (imgAspect > canvasAspect) {
      // Image is wider than canvas — crop sides
      sh = imgHeight;
      sw = imgHeight * canvasAspect;
      sx = (imgWidth - sw) / 2;
      sy = 0;
    } else {
      // Image is taller than canvas — crop top/bottom
      sw = imgWidth;
      sh = imgWidth / canvasAspect;
      sx = 0;
      sy = (imgHeight - sh) / 2;
    }

    this.ctx.drawImage(
      image,
      sx, sy, sw, sh,                     // Source rectangle (crop)
      0, 0, canvasWidth, canvasHeight      // Destination (full canvas)
    );
  }

  /**
   * Clean up all resources.
   */
  destroy(): void {
    this.destroyed = true;
    window.removeEventListener('resize', this.boundHandleResize);

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.currentImage = null;
  }
}
