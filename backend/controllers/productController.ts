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
  getAll: (): Product[] => {
    initStorage();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  },

  create: (data: Omit<Product, 'id'>): Product => {
    const products = ProductController.getAll();
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const products = ProductController.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated = { ...products[index], ...updates };
    products[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updated;
  },

  delete: (id: string): void => {
    const products = ProductController.getAll();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
