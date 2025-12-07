
import React, { useState, useEffect } from 'react';
import { Product } from '../backend/models';
import { ProductService } from '../services/productService';
import { WishlistService } from '../services/wishlistService';
import { CartService } from '../services/cartService';
import { SettingsController } from '../backend/controllers/settingsController';
import ProductCard from './ProductCard';
import { ArrowLeft, MessageCircle, Heart, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import SEOHead from './SEOHead';

interface ProductDetailsProps {
  productId: string;
  onNavigate: (page: string, id?: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currency, setCurrency] = useState('GH₵');
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    // Fetch Product
    const allProducts = ProductService.getAll();
    const found = allProducts.find(p => p.id === productId);
    const settings = SettingsController.getSettings();
    setPhoneNumber(settings.phoneNumber);
    setCurrency(settings.currencySymbol);
    setSiteUrl(window.location.origin);

    if (found) {
      setProduct(found);
      
      const related = allProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 3);
      setRelatedProducts(related);

      setInWishlist(WishlistService.isInWishlist(found.id));
      setInCart(CartService.isInCart(found.id));
      
      setActiveImageIndex(0); 
      window.scrollTo(0, 0);
    }
  }, [productId]);

  useEffect(() => {
    const handleUpdate = () => {
      if (product) {
        setInWishlist(WishlistService.isInWishlist(product.id));
        setInCart(CartService.isInCart(product.id));
      }
    };
    window.addEventListener('wishlist-updated', handleUpdate);
    window.addEventListener('cart-updated', handleUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleUpdate);
      window.removeEventListener('cart-updated', handleUpdate);
    };
  }, [product]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const toggleWishlist = () => {
    if (inWishlist) {
      WishlistService.removeFromWishlist(product.id);
    } else {
      WishlistService.addToWishlist(product);
    }
  };

  const handleBuyNow = () => {
    const productLink = `${window.location.origin}?product_id=${product.id}`;
    const message = encodeURIComponent(`Hello Hair Aura, I am interested in:\n\n*${product.name}*\nPrice: ${currency}${product.price.toLocaleString()}\nLink: ${productLink}`);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
      if (!inCart) {
        CartService.addToCart(product);
      }
  };

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Hair Aura"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/?product_id=${product.id}`,
      "priceCurrency": "GHS",
      "price": product.price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-16">
      <SEOHead 
        title={product.name} 
        description={product.description} 
        keywords={product.seoKeywords}
        image={images[0]} // Pass main image for social sharing
      />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-neutral-400 hover:text-aura-black uppercase text-xs font-bold tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden group">
              <img 
                src={images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-aura-black opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-aura-black opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <button 
                onClick={toggleWishlist}
                className="absolute top-4 right-4 p-3 bg-white/90 rounded-full hover:bg-white shadow-sm transition-colors"
              >
                <Heart size={20} className={`transition-colors ${inWishlist ? 'fill-red-600 text-red-600' : 'text-neutral-400 hover:text-aura-black'}`} />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-square flex-shrink-0 border-2 transition-all ${activeImageIndex === idx ? 'border-aura-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-2">
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{product.category}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-aura-black mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-aura-black">{currency}{product.price.toLocaleString()}</span>
              {product.tags?.map(tag => (
                <span key={tag} className="bg-aura-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-aura-black mb-3">Available Colors</p>
                    <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, idx) => (
                            <span key={idx} className="border border-neutral-200 px-3 py-1 text-xs text-neutral-600 uppercase tracking-wider bg-neutral-50 rounded-sm">
                                {color}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="prose prose-sm text-neutral-600 font-light leading-relaxed mb-10">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 mt-4 space-y-1 text-neutral-500">
                <li>100% Virgin Human Hair</li>
                <li>Cuticle Aligned & Double Drawn</li>
                <li>Heat Resistant & Dye Friendly</li>
                <li>Sourced Ethically</li>
              </ul>
            </div>

            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
               <button 
                onClick={handleAddToCart}
                disabled={inCart}
                className={`w-full border py-5 uppercase text-sm font-bold tracking-[0.2em] transition-colors flex items-center justify-center gap-3 ${inCart ? 'bg-aura-gold text-aura-black border-aura-gold' : 'border-aura-black text-aura-black hover:bg-neutral-50'}`}
              >
                <ShoppingBag size={18} /> {inCart ? 'In Cart' : 'Add to Cart'}
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full bg-aura-black text-white py-5 uppercase text-sm font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <MessageCircle size={18} /> Order Now
              </button>
            </div>
            <p className="text-center text-[10px] text-neutral-400 uppercase tracking-wider mt-4">
                Secure checkout via WhatsApp Business • Delivery Exclusive to Ghana
            </p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-100 pt-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-aura-black mb-2">You May Also Like</h2>
              <p className="text-neutral-500 uppercase tracking-widest text-xs">Complete the look</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(related => (
                <ProductCard 
                  key={related.id} 
                  product={related} 
                  onQuickView={(p) => onNavigate('product-details', p.id)} 
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
