import React, { useState, useEffect } from 'react';
import { Product } from '../backend/models';
import { WishlistService } from '../services/wishlistService';
import { CartService } from '../services/cartService';
import { SettingsController } from '../backend/controllers/settingsController';
import ProductCard from './ProductCard';
import { Trash2, ShoppingBag } from 'lucide-react';
import SEOHead from './SEOHead';

interface WishlistProps {
  onNavigate?: (page: string, id?: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [currency, setCurrency] = useState('GH₵');

  useEffect(() => {
    setItems(WishlistService.getWishlist());
    const settings = SettingsController.getSettings();
    setCurrency(settings.currencySymbol);

    const handleUpdate = () => {
      setItems(WishlistService.getWishlist());
    };
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  const clearWishlist = () => {
    if (window.confirm('Clear all items from your wishlist?')) {
      WishlistService.clearWishlist();
    }
  };

  const removeFromWishlist = (id: string) => {
    WishlistService.removeFromWishlist(id);
  };

  const moveToCart = (product: Product) => {
    CartService.addToCart(product);
    WishlistService.removeFromWishlist(product.id);
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <SEOHead title="My Wishlist" description="Your favorite luxury hair picks." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-neutral-100 pb-6 gap-6">
          <div>
             <h1 className="text-3xl md:text-4xl font-serif font-bold text-aura-black mb-2">My Wishlist</h1>
             <p className="text-neutral-500 text-sm">{items.length} items saved</p>
          </div>
          {items.length > 0 && (
             <button onClick={clearWishlist} className="flex items-center gap-2 text-neutral-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-widest">
                <Trash2 size={16} /> Clear All
             </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 border border-dashed border-neutral-200">
            <h2 className="font-serif text-2xl text-neutral-400 mb-4">Your wishlist is empty</h2>
            <p className="text-neutral-500 text-sm mb-8">Save items you love to purchase later.</p>
            <button 
              onClick={() => onNavigate && onNavigate('shop')}
              className="bg-aura-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
             {items.map(product => (
                <div key={product.id} className="flex flex-col md:flex-row items-center gap-6 border border-neutral-100 p-4 bg-white hover:border-aura-gold transition-colors">
                   {/* Image */}
                   <div className="w-full md:w-32 h-32 flex-shrink-0 bg-neutral-100 cursor-pointer" onClick={() => onNavigate && onNavigate('product-details', product.id)}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                   </div>

                   {/* Info */}
                   <div className="flex-1 text-center md:text-left">
                      <h3 className="font-serif text-lg font-bold text-aura-black cursor-pointer hover:underline" onClick={() => onNavigate && onNavigate('product-details', product.id)}>
                        {product.name}
                      </h3>
                      <p className="text-aura-gold font-bold">{currency}{product.price.toLocaleString()}</p>
                      <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">{product.category}</p>
                   </div>

                   {/* Actions */}
                   <div className="flex gap-3 w-full md:w-auto">
                      <button 
                         onClick={() => moveToCart(product)}
                         className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-aura-black text-white px-6 py-3 uppercase text-[10px] font-bold tracking-widest hover:bg-neutral-800 transition-colors"
                      >
                         <ShoppingBag size={14} /> Add to Cart
                      </button>
                      <button 
                         onClick={() => removeFromWishlist(product.id)}
                         className="px-4 py-3 border border-neutral-200 text-neutral-400 hover:text-red-600 hover:border-red-600 transition-colors"
                         title="Remove"
                      >
                         <Trash2 size={16} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;