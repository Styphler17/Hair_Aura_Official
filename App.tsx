
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './components/Icons';
import { WHATSAPP_CONFIG } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'shop': return <Shop />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'admin': 
        return isAdminAuthenticated 
          ? <AdminDashboard /> 
          : <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
      case 'home':
      default: return <Home onShopClick={() => { setCurrentPage('shop'); window.scrollTo(0, 0); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-aura-black selection:bg-aura-black selection:text-white flex flex-col">
      {/* Conditionally render header only if not in admin mode for cleaner interface, or keep it. Keeping it for now. */}
      {currentPage !== 'admin' && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <footer className="bg-white border-t border-neutral-100 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left cursor-pointer" onClick={() => { setCurrentPage('home'); window.scrollTo(0,0); }}>
              <span className="font-serif text-2xl font-bold tracking-tighter text-aura-black">
                HAIR AURA<span className="text-3xl text-neutral-400">.</span>
              </span>
              <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest">Accra, Ghana</p>
            </div>
            
            <div className="flex gap-6">
              <a href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-aura-black hover:text-neutral-500 transition-colors"><WhatsAppIcon size={20} /></a>
              <a href="https://www.tiktok.com/@hair_aura_official" target="_blank" rel="noopener noreferrer" className="text-aura-black hover:text-neutral-500 transition-colors"><TikTokIcon size={20} /></a>
              <a href="https://instagram.com/hair_aura_official" target="_blank" rel="noopener noreferrer" className="text-aura-black hover:text-neutral-500 transition-colors"><InstagramIcon size={20} /></a>
            </div>

            <div className="text-center md:text-right text-xs text-neutral-400 flex flex-col gap-2">
              <p>&copy; {new Date().getFullYear()} Hair Aura. Ghana.</p>
              <button onClick={() => { setCurrentPage('admin'); window.scrollTo(0,0); }} className="hover:text-aura-black transition-colors text-[10px] uppercase tracking-wider">
                Staff Access
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
