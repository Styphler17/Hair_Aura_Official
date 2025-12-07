
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Eye, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../backend/models';
import { SettingsController } from '../backend/controllers/settingsController';
import { WishlistService } from '../services/wishlistService';
import { CartService } from '../services/cartService';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [currency, setCurrency] = useState('GH₵');

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await SettingsController.getSettings();
      setPhoneNumber(settings.phoneNumber);
      setCurrency(settings.currencySymbol);
    };
    fetchSettings();
    
    setInWishlist(WishlistService.isInWishlist(product.id));
    setInCart(CartService.isInCart(product.id));

    const handleWishlistUpdate = () => {
      setInWishlist(WishlistService.isInWishlist(product.id));
    };

    const handleCartUpdate = () => {
      setInCart(CartService.isInCart(product.id));
    }

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, [product.id]);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productLink = `${window.location.origin}?product_id=${product.id}`;
    const message = encodeURIComponent(`Hello Hair Aura, I am interested in ordering:\n\n*${product.name}*\nPrice: ${currency}${product.price.toLocaleString()}\nLink: ${productLink}`);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inCart) {
      CartService.addToCart(product);
      // Optional: Visual feedback or toast could go here
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      WishlistService.removeFromWishlist(product.id);
    } else {
      WishlistService.addToWishlist(product);
    }
  };

  return (
    <div className="group flex flex-col border border-neutral-100 hover:border-aura-black transition-colors duration-500 bg-white relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 cursor-pointer" onClick={() => onQuickView && onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} className={`transition-colors ${inWishlist ? 'fill-red-600 text-red-600' : 'text-neutral-400 hover:text-aura-black'}`} />
        </button>

        {/* View Details Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 z-10">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(product); }}
             className="bg-white text-aura-black px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-aura-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 flex items-center gap-2"
           >
             <Eye size={14} /> View Details
           </button>
        </div>

        <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-aura-black">
            {product.category}
          </span>
          {product.tags && product.tags.map(tag => (
             <span key={tag} className="bg-aura-black px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-white">
               {tag}
             </span>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg leading-tight font-medium text-aura-black pr-4 group-hover:underline decoration-1 underline-offset-4 cursor-pointer" onClick={() => onQuickView && onQuickView(product)}>
            {product.name}
          </h3>
          <span className="font-bold text-aura-black whitespace-nowrap">
            {currency}{product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-sm text-neutral-500 mb-6 line-clamp-2 font-light leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button 
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 border py-3 px-2 uppercase text-[10px] font-bold tracking-wider transition-all duration-300 ${inCart ? 'bg-aura-gold text-aura-black border-aura-gold cursor-default' : 'bg-white text-aura-black border-aura-black hover:bg-neutral-50'}`}
          >
            <ShoppingBag size={14} /> {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button 
            onClick={handleBuyClick}
            className="flex items-center justify-center gap-2 bg-aura-black text-white border border-aura-black py-3 px-2 uppercase text-[10px] font-bold tracking-wider hover:bg-neutral-800 transition-all duration-300"
          >
            Order Now
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
