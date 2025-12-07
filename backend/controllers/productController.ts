import { Product } from '../models';
import { PRODUCTS as INITIAL_PRODUCTS } from '../../constants';

const STORAGE_KEY = 'hair_aura_products_db';

const initStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
  }
};

export const ProductController = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/get_products.php');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to LocalStorage if API fails
      initStorage();
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    }
  },

  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const products = await ProductController.getAll();
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const products = await ProductController.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated = { ...products[index], ...updates };
    products[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    const products = await ProductController.getAll();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
