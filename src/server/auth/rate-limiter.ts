import "server-only";

/**
 * UTS Rate Limiter
 *
 * In-memory rate limiter using a sliding window approach.
 * Designed to be upgraded to Redis for production multi-instance deployments.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Maximum number of requests */
  maxAttempts: number;
  /** Window size in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterSeconds: number;
}

/**
 * Check rate limit for a given key
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or window expired — allow
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + config.windowSeconds * 1000;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      remaining: config.maxAttempts - 1,
      resetAt: new Date(resetAt),
      retryAfterSeconds: 0,
    };
  }

  // Within window — check count
  if (entry.count >= config.maxAttempts) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.resetAt),
      retryAfterSeconds,
    };
  }

  // Increment
  entry.count++;
  store.set(key, entry);

  return {
    success: true,
    remaining: config.maxAttempts - entry.count,
    resetAt: new Date(entry.resetAt),
    retryAfterSeconds: 0,
  };
}

/**
 * Reset rate limit for a key (e.g., after successful login)
 */
export function resetRateLimit(key: string): void {
  store.delete(key);
}

// ============================================
// Pre-configured rate limiters
// ============================================

/** Login: 5 attempts per 15 minutes per identifier (email or IP) */
export function checkLoginRateLimit(identifier: string): RateLimitResult {
  return checkRateLimit(`login:${identifier}`, {
    maxAttempts: 5,
    windowSeconds: 15 * 60,
  });
}

/** Signup: 3 attempts per hour per IP */
export function checkSignupRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`signup:${ip}`, {
    maxAttempts: 3,
    windowSeconds: 60 * 60,
  });
}

/** Password reset: 3 per hour per email */
export function checkPasswordResetRateLimit(email: string): RateLimitResult {
  return checkRateLimit(`password-reset:${email}`, {
    maxAttempts: 3,
    windowSeconds: 60 * 60,
  });
}

/** API general: 100 requests per minute per IP */
export function checkApiRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`api:${ip}`, {
    maxAttempts: 100,
    windowSeconds: 60,
  });
}

/** Account lockout threshold: 10 failed attempts triggers lockout */
export const ACCOUNT_LOCKOUT_THRESHOLD = 10;
export const ACCOUNT_LOCKOUT_DURATION_MINUTES = 30;
