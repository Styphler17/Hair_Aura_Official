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
      
      if (response.ok && Array.isArray(data)) {
        return data;
      }
      
      throw new Error('Invalid response from API');
    } catch (error) {
      console.error("Error fetching products from API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    }
  },

  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/save_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          ...data
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Return the created product from API response
        const newProduct: Product = {
          ...data,
          id: result.id,
        };
        return newProduct;
      }
      
      throw new Error(result.error || 'Failed to create product');
    } catch (error) {
      console.error("Error creating product via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const products = await ProductController.getAll();
      const newProduct: Product = {
        ...data,
        id: Date.now().toString(),
      };
      const updated = [newProduct, ...products];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newProduct;
    }
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
      // First get the existing product from API
      const products = await ProductController.getAll();
      const existing = products.find(p => p.id === id);
      if (!existing) {
        console.error("Product not found with id:", id);
        return null;
      }

      const updatedData = { ...existing, ...updates };

      const response = await fetch('https://hair-aura.debesties.com/api/save_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          ...updatedData
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Return updated data from API
        return updatedData;
      }
      
      throw new Error(result.error || 'Failed to update product');
    } catch (error) {
      console.error("Error updating product via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const products = await ProductController.getAll();
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return null;

      const updated = { ...products[index], ...updates };
      products[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return updated;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch('https://hair-aura.debesties.com/api/delete_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Successfully deleted from API, no localStorage update needed
        return;
      }
      
      throw new Error(result.error || 'Failed to delete product');
    } catch (error) {
      console.error("Error deleting product via API, using localStorage fallback:", error);
      // Fallback to LocalStorage only if API fails
      initStorage();
      const products = await ProductController.getAll();
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  }
};
