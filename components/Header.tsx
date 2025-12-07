import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { SettingsController } from '../backend/controllers/settingsController';
import { WishlistService } from '../services/wishlistService';
import { CartService } from '../services/cartService';
import { SiteSettings } from '../backend/models';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(SettingsController.getSettings());
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setSettings(SettingsController.getSettings());
    setWishlistCount(WishlistService.getWishlist().length);
    setCartCount(CartService.getCart().length);

    const handleWishlistUpdate = () => {
      setWishlistCount(WishlistService.getWishlist().length);
    };

    const handleCartUpdate = () => {
      setCartCount(CartService.getCart().length);
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const linkClass = (page: string) => `
    cursor-pointer uppercase text-xs tracking-widest font-bold transition-colors
    ${currentPage === page ? 'text-aura-black border-b-2 border-aura-black pb-1' : 'text-neutral-500 hover:text-aura-black'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            {settings.logo ? (
              <img src={settings.logo} alt="Hair Aura" className="h-12 w-auto object-contain" />
            ) : (
              <span className="font-serif text-3xl font-bold tracking-tighter text-aura-black">
                HAIR AURA<span className="text-4xl text-neutral-400">.</span>
              </span>
            )}
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <button onClick={() => handleNav('shop')} className={linkClass('shop')}>Shop Collection</button>
            <button onClick={() => handleNav('about')} className={linkClass('about')}>Our Story</button>
            <button onClick={() => handleNav('contact')} className={linkClass('contact')}>Contact</button>
            
            {/* Wishlist Icon */}
            <button onClick={() => handleNav('wishlist')} className="relative text-neutral-500 hover:text-aura-black transition-colors" title="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-aura-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button onClick={() => handleNav('cart')} className="relative text-neutral-500 hover:text-aura-black transition-colors" title="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-aura-gold text-aura-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <a href={`https://wa.me/${settings.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="bg-aura-black text-white px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors">
              Book Consultation
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => handleNav('cart')} className="relative text-aura-black">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-aura-gold text-aura-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-aura-black focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
            <button onClick={() => handleNav('shop')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Shop Collection</button>
            <button onClick={() => handleNav('about')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Our Story</button>
            <button onClick={() => handleNav('contact')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Contact</button>
            <button onClick={() => handleNav('wishlist')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">My Wishlist ({wishlistCount})</button>
            <button onClick={() => handleNav('cart')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">My Cart ({cartCount})</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;