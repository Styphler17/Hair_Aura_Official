import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_CONFIG } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuyClick = () => {
    const message = encodeURIComponent(`${WHATSAPP_CONFIG.messagePrefix}${product.name} (Price: $${product.price})`);
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="group flex flex-col border border-neutral-100 hover:border-aura-black transition-colors duration-500 bg-white">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-aura-black">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg leading-tight font-medium text-aura-black pr-4 group-hover:underline decoration-1 underline-offset-4">
            {product.name}
          </h3>
          <span className="font-bold text-aura-black whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-neutral-500 mb-6 line-clamp-2 font-light leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto">
          <button 
            onClick={handleBuyClick}
            className="w-full border border-aura-black bg-white text-aura-black py-3 px-4 flex items-center justify-center gap-2 uppercase text-xs tracking-[0.15em] font-bold hover:bg-aura-black hover:text-white transition-all duration-300"
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