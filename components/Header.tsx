import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../constants';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <span className="font-serif text-3xl font-bold tracking-tighter text-aura-black">
              HAIR AURA<span className="text-4xl text-neutral-400">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            <button onClick={() => handleNav('shop')} className={linkClass('shop')}>Shop Collection</button>
            <button onClick={() => handleNav('about')} className={linkClass('about')}>Our Story</button>
            <button onClick={() => handleNav('contact')} className={linkClass('contact')}>Contact</button>
            <a href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="bg-aura-black text-white px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors">
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-aura-black focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
            <button onClick={() => handleNav('shop')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Shop Collection</button>
            <button onClick={() => handleNav('about')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Our Story</button>
            <button onClick={() => handleNav('contact')} className="block px-3 py-2 text-base font-medium text-aura-black uppercase tracking-widest">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;