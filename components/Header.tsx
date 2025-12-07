
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

    const handleSettingsUpdate = () => {
      setSettings(SettingsController.getSettings());
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('settings-updated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('settings-updated', handleSettingsUpdate);
    };
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const isActive = (page: string) => currentPage === page || (page === 'blog' && currentPage === 'blog-post');

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            {settings.logo ? (
              <img src={settings.logo} alt="Hair Aura" className="h-12 w-auto object-contain" />
            ) : (
              <span className="font-serif text-3xl font-bold tracking-tighter" style={{ color: settings.colorText }}>
                HAIR AURA<span className="text-4xl text-neutral-400">.</span>
              </span>
            )}
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {['shop', 'about', 'blog', 'contact'].map((page) => (
              <button 
                key={page}
                onClick={() => handleNav(page)} 
                className={`cursor-pointer uppercase text-xs tracking-widest font-bold transition-all duration-300 pb-1 border-b-2`}
                style={{ 
                  color: isActive(page) ? settings.colorText : '#737373', // Neutral-500 default
                  borderColor: isActive(page) ? settings.colorAccent : 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = settings.colorText}
                onMouseLeave={(e) => e.currentTarget.style.color = isActive(page) ? settings.colorText : '#737373'}
              >
                {page === 'blog' ? 'The Journal' : page === 'about' ? 'Our Story' : page === 'shop' ? 'Shop Collection' : page}
              </button>
            ))}
            
            {/* Wishlist Icon */}
            <button 
              onClick={() => handleNav('wishlist')} 
              className="relative transition-colors text-neutral-500 hover:text-opacity-80" 
              title="Wishlist"
              style={{ color: currentPage === 'wishlist' ? settings.colorText : undefined }}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: settings.colorText }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => handleNav('cart')} 
              className="relative transition-colors text-neutral-500 hover:text-opacity-80" 
              title="Cart"
              style={{ color: currentPage === 'cart' ? settings.colorText : undefined }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: settings.colorAccent, color: settings.colorText }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <a 
              href={`https://wa.me/${settings.phoneNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:opacity-90 transition-opacity text-white"
              style={{ backgroundColor: settings.colorText }}
            >
              Book Consultation
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => handleNav('cart')} className="relative" style={{ color: settings.colorText }}>
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: settings.colorAccent, color: settings.colorText }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              style={{ color: settings.colorText }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
            {['shop', 'about', 'blog', 'contact'].map((page) => (
              <button 
                key={page}
                onClick={() => handleNav(page)} 
                className="block px-3 py-2 text-base font-medium uppercase tracking-widest"
                style={{ color: settings.colorText }}
              >
                {page === 'blog' ? 'The Journal' : page === 'about' ? 'Our Story' : page === 'shop' ? 'Shop Collection' : page}
              </button>
            ))}
            <button onClick={() => handleNav('wishlist')} className="block px-3 py-2 text-base font-medium uppercase tracking-widest" style={{ color: settings.colorText }}>My Wishlist ({wishlistCount})</button>
            <button onClick={() => handleNav('cart')} className="block px-3 py-2 text-base font-medium uppercase tracking-widest" style={{ color: settings.colorText }}>My Cart ({cartCount})</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
