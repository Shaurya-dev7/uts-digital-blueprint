/**
 * FrameLoader — Progressive image preloading engine
 * 
 * Auto-detects total frame count from /landing/sequence/ directory.
 * Loads frames in progressive waves to prevent network congestion.
 * All images stored as HTMLImageElement for direct Canvas drawing.
 */

export type LoadProgressCallback = (loaded: number, total: number) => void;

export class FrameLoader {
  private frames: (HTMLImageElement | null)[] = [];
  private totalFrames: number = 0;
  private basePath: string;
  private extension: string;
  private loadedCount: number = 0;
  private progressCallbacks: LoadProgressCallback[] = [];
  private _firstFrameReady: Promise<HTMLImageElement>;
  private _allFramesReady: Promise<void>;
  private resolveFirstFrame!: (img: HTMLImageElement) => void;
  private resolveAllFrames!: () => void;
  private destroyed: boolean = false;

  constructor(basePath: string = '/landing/sequence/', extension: string = 'jpg') {
    this.basePath = basePath;
    this.extension = extension;

    this._firstFrameReady = new Promise((resolve) => {
      this.resolveFirstFrame = resolve;
    });

    this._allFramesReady = new Promise((resolve) => {
      this.resolveAllFrames = resolve;
    });
  }

  /**
   * Detect total frame count by probing files.
   * Uses binary search for efficiency with large sequences.
   */
  async detectFrameCount(): Promise<number> {
    // First check if frame 1 exists
    const firstExists = await this.probeFrame(1);
    if (!firstExists) {
      console.warn('[FrameLoader] No frames found at', this.basePath);
      return 0;
    }

    // Binary search for the upper bound
    let low = 1;
    let high = 2;

    // Exponential search to find upper bound
    while (await this.probeFrame(high)) {
      low = high;
      high *= 2;
      if (high > 10000) break; // Safety cap
    }

    // Binary search between low and high
    while (low < high - 1) {
      const mid = Math.floor((low + high) / 2);
      if (await this.probeFrame(mid)) {
        low = mid;
      } else {
        high = mid;
      }
    }

    this.totalFrames = low;
    this.frames = new Array(this.totalFrames).fill(null);
    return this.totalFrames;
  }

  /**
   * Check if a frame file exists via HEAD request.
   */
  private async probeFrame(index: number): Promise<boolean> {
    try {
      const url = this.getFrameUrl(index);
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get the URL for a frame by its 1-based index.
   */
  private getFrameUrl(index: number): string {
    const padded = String(index).padStart(4, '0');
    return `${this.basePath}${padded}.${this.extension}`;
  }

  /**
   * Start progressive loading of all frames.
   * Wave 1: frames 1-10 (critical for first paint + initial scroll)
   * Wave 2: frames 11-20
   * Wave 3: remaining frames
   */
  async startLoading(): Promise<void> {
    if (this.totalFrames === 0) {
      await this.detectFrameCount();
    }

    if (this.totalFrames === 0) return;

    const wave1End = Math.min(10, this.totalFrames);
    const wave2End = Math.min(20, this.totalFrames);

    // Wave 1 — critical frames
    await this.loadRange(1, wave1End);

    if (this.destroyed) return;

    // Wave 2 — next batch
    if (wave2End > wave1End) {
      await this.loadRange(wave1End + 1, wave2End);
    }

    if (this.destroyed) return;

    // Wave 3 — remaining
    if (this.totalFrames > wave2End) {
      await this.loadRange(wave2End + 1, this.totalFrames);
    }

    this.resolveAllFrames();
  }

  /**
   * Load a range of frames (1-based inclusive).
   */
  private async loadRange(start: number, end: number): Promise<void> {
    const promises: Promise<void>[] = [];

    // Process frames in small chunks using requestIdleCallback or setTimeout fallback
    const processChunk = (currentStart: number) => {
      return new Promise<void>((resolve) => {
        const scheduleNext = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
        
        scheduleNext(() => {
          if (this.destroyed) {
            resolve();
            return;
          }

          const chunkEnd = Math.min(currentStart + 5, end);
          for (let i = currentStart; i <= chunkEnd; i++) {
            promises.push(this.loadSingleFrame(i));
          }

          if (chunkEnd < end) {
            processChunk(chunkEnd + 1).then(resolve);
          } else {
            Promise.all(promises).then(() => resolve());
          }
        });
      });
    };

    await processChunk(start);
  }

  /**
   * Load a single frame image.
   */
  private loadSingleFrame(index: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.destroyed) {
        resolve();
        return;
      }

      const img = new Image();
      img.decoding = 'async';

      img.onload = () => {
        if (this.destroyed) {
          resolve();
          return;
        }

        // Store at 0-based index
        this.frames[index - 1] = img;
        this.loadedCount++;

        // Notify progress
        this.progressCallbacks.forEach(cb => cb(this.loadedCount, this.totalFrames));

        // Resolve first frame promise
        if (index === 1) {
          this.resolveFirstFrame(img);
        }

        resolve();
      };

      img.onerror = () => {
        console.warn(`[FrameLoader] Failed to load frame ${index}`);
        this.loadedCount++;
        this.progressCallbacks.forEach(cb => cb(this.loadedCount, this.totalFrames));
        resolve();
      };

      img.src = this.getFrameUrl(index);
    });
  }

  /**
   * Get a frame by 0-based index.
   * Returns null if not yet loaded.
   */
  getFrame(index: number): HTMLImageElement | null {
    if (index < 0 || index >= this.totalFrames) return null;
    
    // Memory Sliding Window Optimization
    // Dereference distant frames to prevent OOM on mobile
    const WINDOW_SIZE = 40;
    
    // Only run cleanup periodically to save CPU
    if (index % 10 === 0) {
      const scheduleNext = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
      scheduleNext(() => {
        for (let i = 0; i < this.totalFrames; i++) {
          if (Math.abs(i - index) > WINDOW_SIZE && this.frames[i]) {
            // Nullify the image reference so GC can collect it
            this.frames[i] = null;
            this.loadedCount = Math.max(0, this.loadedCount - 1);
          }
        }
      });
    }

    // If the frame was evicted, trigger a background reload
    if (!this.frames[index]) {
      this.loadSingleFrame(index + 1); // loadSingleFrame is 1-based
    }

    return this.frames[index];
  }

  /**
   * Get the nearest loaded frame to the target index.
   * Searches outward from target to find the closest available frame.
   */
  getNearestFrame(targetIndex: number): HTMLImageElement | null {
    if (this.totalFrames === 0) return null;

    const clamped = Math.max(0, Math.min(targetIndex, this.totalFrames - 1));

    // Check exact frame first
    if (this.frames[clamped]) return this.frames[clamped];

    // Search outward
    for (let offset = 1; offset < this.totalFrames; offset++) {
      const before = clamped - offset;
      const after = clamped + offset;

      if (before >= 0 && this.frames[before]) return this.frames[before];
      if (after < this.totalFrames && this.frames[after]) return this.frames[after];
    }

    return null;
  }

  /**
   * Register a progress callback.
   */
  onProgress(callback: LoadProgressCallback): void {
    this.progressCallbacks.push(callback);
  }

  /**
   * Promise that resolves when the first frame is loaded.
   */
  get firstFrameReady(): Promise<HTMLImageElement> {
    return this._firstFrameReady;
  }

  /**
   * Promise that resolves when all frames are loaded.
   */
  get allFramesReady(): Promise<void> {
    return this._allFramesReady;
  }

  /**
   * Get total frame count.
   */
  getTotalFrames(): number {
    return this.totalFrames;
  }

  /**
   * Get loaded frame count.
   */
  getLoadedCount(): number {
    return this.loadedCount;
  }

  /**
   * Clean up all resources.
   */
  destroy(): void {
    this.destroyed = true;
    this.frames = [];
    this.progressCallbacks = [];
    this.loadedCount = 0;
  }
}
