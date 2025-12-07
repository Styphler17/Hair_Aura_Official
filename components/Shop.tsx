
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { ProductService } from '../services/productService';
import { Product } from '../types';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['all', 'wigs', 'bundles', 'closures'];

  // Fetch data
  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay for effect
    const timer = setTimeout(() => {
      setProducts(ProductService.getAll());
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const getSortedProducts = () => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const displayedProducts = getSortedProducts();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-aura-black">The Collection</h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-medium">Curated for excellence</p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             {/* Category Filter */}
            <div className="flex flex-wrap gap-6 border-b border-neutral-100 pb-2 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`uppercase text-[11px] font-bold tracking-[0.15em] pb-2 transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-aura-black border-b-2 border-aura-black'
                      : 'text-neutral-400 hover:text-aura-black border-b-2 border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-aura-black border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors"
              >
                <SlidersHorizontal size={14} />
                <span>Sort By</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-100 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2 flex flex-col">
                    {[
                      { label: 'Featured', value: 'featured' },
                      { label: 'Price: Low to High', value: 'price-asc' },
                      { label: 'Price: High to Low', value: 'price-desc' },
                      { label: 'Name: A - Z', value: 'name-asc' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-neutral-50 transition-colors ${
                          sortOption === option.value ? 'font-bold text-aura-black' : 'text-neutral-500'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col border border-neutral-100 bg-white animate-pulse">
                <div className="aspect-[3/4] bg-neutral-100 w-full" />
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <div className="flex justify-between items-start">
                    <div className="h-6 bg-neutral-100 w-3/4 rounded" />
                    <div className="h-6 bg-neutral-100 w-1/4 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-100 w-full rounded" />
                    <div className="h-3 bg-neutral-100 w-2/3 rounded" />
                  </div>
                  <div className="mt-auto pt-4">
                     <div className="h-10 bg-neutral-100 w-full rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 bg-neutral-50 border border-dashed border-neutral-200">
              <p className="font-serif text-2xl text-neutral-400 mb-2">Collection Empty</p>
              <p className="text-sm text-neutral-400">No items found in this category.</p>
            </div>
          )}
        </div>

        {/* Custom Order CTA */}
        <div className="mt-24 pt-12 border-t border-neutral-100 text-center">
           <h3 className="font-serif text-2xl mb-4">Need something specific?</h3>
           <p className="text-neutral-500 text-sm mb-8 max-w-md mx-auto">We offer custom lengths, textures, and colors upon request. Chat with our specialists to build your dream unit.</p>
           <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-block bg-aura-black text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors">
             Request Custom Order
           </a>
        </div>
      </div>
    </div>
  );
};

export default Shop;
