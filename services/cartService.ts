import { Product } from '../backend/models';

const STORAGE_KEY = 'hair_aura_cart';

export const CartService = {
  getCart: (): Product[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addToCart: (product: Product): Product[] => {
    const current = CartService.getCart();
    // Allow duplicates in cart? Usually for hair, maybe quantity. 
    // For simplicity with this model, let's treat it as unique items or allow duplicates.
    // Given the simple data model, we'll check for ID. If exists, we won't add again for now to prevent spamming list.
    if (current.find(p => p.id === product.id)) return current;
    
    const updated = [...current, product];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
    return updated;
  },

  removeFromCart: (productId: string): Product[] => {
    const current = CartService.getCart();
    const updated = current.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
    return updated;
  },

  isInCart: (productId: string): boolean => {
    const current = CartService.getCart();
    return current.some(p => p.id === productId);
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('cart-updated'));
  }
};