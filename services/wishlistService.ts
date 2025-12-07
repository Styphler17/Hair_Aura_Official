import { Product } from '../backend/models';

const STORAGE_KEY = 'hair_aura_wishlist';

export const WishlistService = {
  getWishlist: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addToWishlist: (product: Product): Product[] => {
    const current = WishlistService.getWishlist();
    if (current.find(p => p.id === product.id)) return current;
    
    const updated = [...current, product];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  },

  removeFromWishlist: (productId: string): Product[] => {
    const current = WishlistService.getWishlist();
    const updated = current.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  },

  isInWishlist: (productId: string): boolean => {
    const current = WishlistService.getWishlist();
    return current.some(p => p.id === productId);
  },

  clearWishlist: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('wishlist-updated'));
  }
};