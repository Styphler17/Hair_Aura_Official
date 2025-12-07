
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'hair_aura_products_v1';

// Initialize storage if empty
const initStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  }
};

export const ProductService = {
  getAll: (): Product[] => {
    initStorage();
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  },

  add: (product: Omit<Product, 'id'>): Product => {
    const products = ProductService.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(), // Simple ID generation
    };
    const updatedProducts = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return newProduct;
  },

  update: (id: string, updates: Partial<Product>): Product | null => {
    const products = ProductService.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  delete: (id: string): void => {
    const products = ProductService.getAll();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
