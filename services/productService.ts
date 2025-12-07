
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

  add: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const products = await ProductService.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(), // Simple ID generation
    };
    const updatedProducts = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return newProduct;
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const products = await ProductService.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  delete: async (id: string): Promise<void> => {
    const products = await ProductService.getAll();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
