/**
 * Simple cache implementation using localStorage
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_PREFIX = 'bg_investment_';

export const cache = {
  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check if expired
      if (Date.now() > entry.expiresAt) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  /**
   * Set cached data
   */
  set<T>(key: string, data: T, durationMinutes: number = 60): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + durationMinutes * 60 * 1000,
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error('Cache set error:', error);
      // If storage is full, try to clear old entries
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        cache.clear();
      }
    }
  },

  /**
   * Remove cached data
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  },

  /**
   * Clear all cached data
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  },
};



