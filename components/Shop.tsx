
import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ProductController } from '../backend/controllers/productController';
import { Product } from '../backend/models';
import { ChevronDown, SlidersHorizontal, X, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import SEOHead from './SEOHead';
import { SettingsController } from '../backend/controllers/settingsController';

interface ShopProps {
  onNavigate?: (page: string, id?: string) => void;
}

const Shop: React.FC<ShopProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['all', 'wigs', 'bundles', 'closures'];

  useEffect(() => {
    setIsLoading(true);
    // Fetch from live API
    const fetchProducts = async () => {
      try {
        const products = await ProductController.getAll();
        setProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTag, searchQuery, sortOption]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [products]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(query) || p.category.includes(query))
      .slice(0, 5);
  }, [searchQuery, products]);

  const getFilteredProducts = () => {
    let filtered = products;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (activeTag) {
      filtered = filtered.filter(p => p.tags?.includes(activeTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getSortedProducts = (filtered: Product[]) => {
    const sorted = [...filtered];
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

  const allFilteredProducts = getSortedProducts(getFilteredProducts());
  const totalPages = Math.ceil(allFilteredProducts.length / itemsPerPage);
  const paginatedProducts = allFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const shopKeywords = products.map(p => p.seoKeywords).filter(Boolean).join(', ');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": paginatedProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "category": product.category,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GHS",
          "price": product.price,
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  const handleProductClick = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleNavigateToDetails = (id: string) => {
    if (onNavigate) {
      onNavigate('product-details', id);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const customOrderMessage = "Welcome to Hair Aura. How may we help you?";

  return (
    <div className="py-20 bg-white min-h-screen">
      <SEOHead 
        title="Shop Collection" 
        description="Browse our exclusive collection of 100% virgin human hair, from bone straight wigs to body wave bundles. Best prices in Ghana."
        keywords={shopKeywords}
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3 text-aura-black">The Collection</h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-medium">Curated for excellence</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8 pb-6 border-b border-neutral-100">
          <div className="relative w-full lg:w-96 z-20">
            <div className="relative">
                <input 
                type="text" 
                placeholder="Search wigs, bundles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-aura-black focus:ring-0 transition-colors"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-aura-black">
                    <X size={14} />
                </button>
                )}
            </div>
            {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-neutral-100 shadow-lg mt-1 rounded-sm">
                    {searchSuggestions.map(s => (
                        <button 
                            key={s.id}
                            onClick={() => { setSearchQuery(s.name); setQuickViewProduct(s); }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 border-b border-neutral-50 last:border-0 flex items-center justify-between group"
                        >
                            <span>{s.name}</span>
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-aura-black">View</span>
                        </button>
                    ))}
                </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
            <div className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`uppercase text-[10px] sm:text-[11px] font-bold tracking-[0.15em] pb-1 transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-aura-black border-b-2 border-aura-black'
                      : 'text-neutral-400 hover:text-aura-black border-b-2 border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-auto">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 text-[11px] font-bold uppercase tracking-widest text-aura-black border border-neutral-200 px-4 py-3 sm:py-2 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} />
                  <span>Sort By</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white border border-neutral-100 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
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

        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-48 flex-shrink-0">
                <div className="sticky top-24">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-aura-black mb-4 flex items-center gap-2">
                        <Filter size={14} /> Filter By Tag
                    </h3>
                    <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-3 pb-4 md:pb-0 hide-scrollbar">
                        <button 
                            onClick={() => setActiveTag(null)}
                            className={`text-left text-sm whitespace-nowrap px-3 py-2 md:px-0 md:py-1 rounded-full md:rounded-none transition-colors ${!activeTag ? 'bg-aura-black text-white md:bg-transparent md:text-aura-black md:font-bold' : 'bg-neutral-100 text-neutral-500 md:bg-transparent md:text-neutral-500 hover:text-aura-black'}`}
                        >
                            All Tags
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                                className={`text-left text-sm whitespace-nowrap px-3 py-2 md:px-0 md:py-1 rounded-full md:rounded-none transition-colors ${activeTag === tag ? 'bg-aura-black text-white md:bg-transparent md:text-aura-black md:font-bold' : 'bg-neutral-100 text-neutral-500 md:bg-transparent md:text-neutral-500 hover:text-aura-black'}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16 min-h-[500px]">
                {isLoading ? (
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
                ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onQuickView={handleProductClick} 
                    />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-32 bg-neutral-50 border border-dashed border-neutral-200">
                    <p className="font-serif text-2xl text-neutral-400 mb-2">No Matches Found</p>
                    <p className="text-sm text-neutral-400">Try adjusting your search or filter.</p>
                    <button onClick={() => {setSearchQuery(''); setActiveCategory('all'); setActiveTag(null);}} className="mt-4 text-aura-black underline text-xs uppercase font-bold tracking-widest">Clear Filters</button>
                    </div>
                )}
                </div>

                {!isLoading && totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                    <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-neutral-200 rounded-full hover:bg-aura-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
                    >
                    <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                        key={idx}
                        onClick={() => handlePageChange(idx + 1)}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full transition-colors ${
                            currentPage === idx + 1 
                            ? 'bg-aura-black text-white' 
                            : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-200'
                        }`}
                        >
                        {idx + 1}
                        </button>
                    ))}
                    </div>

                    <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-neutral-200 rounded-full hover:bg-aura-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
                    >
                    <ChevronRight size={20} />
                    </button>
                </div>
                )}
            </div>
        </div>

        <div className="mt-24 pt-12 border-t border-neutral-100 text-center px-4">
           <h3 className="font-serif text-2xl mb-4">Need something specific?</h3>
           <p className="text-neutral-500 text-sm mb-8 max-w-md mx-auto">We offer custom lengths, textures, and colors upon request. Chat with our specialists to build your dream unit.</p>
           <a 
             href={`https://wa.me/${SettingsController.getSettings().phoneNumber}?text=${encodeURIComponent(customOrderMessage)}`} 
             target="_blank" 
             rel="noopener noreferrer" 
             className="inline-block bg-aura-black text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors w-full sm:w-auto"
           >
             Request Custom Order
           </a>
        </div>
      </div>

      {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setQuickViewProduct(null)}>
              <div 
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
              >
                  <div className="flex justify-end p-2 sticky top-0 bg-white z-10">
                      <button onClick={() => setQuickViewProduct(null)} className="p-2 text-neutral-400 hover:text-aura-black">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="px-6 pb-8">
                      <div className="flex flex-col md:flex-row gap-8">
                          <div className="w-full md:w-1/2 aspect-[3/4] bg-neutral-100">
                              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="w-full md:w-1/2 flex flex-col justify-center">
                              <h2 className="font-serif text-3xl font-bold mb-2">{quickViewProduct.name}</h2>
                              <p className="text-xl font-bold mb-4 text-aura-black">{SettingsController.getSettings().currencySymbol}{quickViewProduct.price.toLocaleString()}</p>
                              <p className="text-neutral-600 mb-6 font-light">{quickViewProduct.description}</p>
                              
                              <button 
                                onClick={() => handleNavigateToDetails(quickViewProduct.id)}
                                className="bg-aura-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 mb-4"
                              >
                                View Full Details
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Shop;
