
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import BackToTop from './components/BackToTop';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Blog from './components/Blog';
import BlogPostPage from './components/BlogPost';
import Maintenance from './components/Maintenance';
import NotFound from './components/NotFound';
import { InstagramIcon, TikTokIcon, WhatsAppIcon, SnapchatIcon } from './components/Icons';
import { SettingsController } from './backend/controllers/settingsController';
import { SiteSettings } from './backend/models';
import SEOHead from './components/SEOHead';
import GlobalStyles from './components/GlobalStyles';
import { Facebook, Twitter, Youtube } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(SettingsController.getSettingsSync());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productIdFromUrl = params.get('product_id');

    if (productIdFromUrl) {
      setSelectedId(productIdFromUrl);
      setCurrentPage('product-details');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Refresh settings on page change
    const fetchSettings = async () => {
      const currentSettings = await SettingsController.getSettings();
      setSettings(currentSettings);
    };
    fetchSettings();
    
    const handleSettingsUpdate = async () => {
      const updatedSettings = await SettingsController.getSettings();
      setSettings(updatedSettings);
    };
    
    window.addEventListener('settings-updated', handleSettingsUpdate);
    return () => window.removeEventListener('settings-updated', handleSettingsUpdate);
    
  }, [currentPage]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) {
      setSelectedId(id);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    // Admin Routes
    if (currentPage.startsWith('admin')) {
      if (!isAdminAuthenticated) {
        return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
      }
      return <AdminDashboard currentPage={currentPage} onNavigate={handleNavigate} onLogout={() => setIsAdminAuthenticated(false)} />;
    }

    // Maintenance Mode Check
    if (settings.maintenanceMode && !isAdminAuthenticated) {
        return <Maintenance />;
    }

    // Public Routes
    switch(currentPage) {
      case 'shop': return <Shop onNavigate={handleNavigate} />;
      case 'product-details': 
        return selectedId ? (
          <ProductDetails productId={selectedId} onNavigate={handleNavigate} />
        ) : (
          <Shop onNavigate={handleNavigate} />
        );
      case 'blog': return <Blog onNavigate={handleNavigate} />;
      case 'blog-post':
        return selectedId ? (
          <BlogPostPage id={selectedId} onNavigate={handleNavigate} />
        ) : (
           <Blog onNavigate={handleNavigate} />
        );
      case 'wishlist': return <Wishlist onNavigate={handleNavigate} />;
      case 'cart': return <Cart onNavigate={handleNavigate} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'terms': return <Terms />;
      case 'privacy': return <Privacy />;
      case 'home': return <Home onShopClick={() => { handleNavigate('shop'); }} onNavigate={handleNavigate} />;
      default: return <NotFound />; // Catch-all 404
    }
  };

  const renderSocialIcon = (platform: string, size: number) => {
    switch(platform) {
      case 'TikTok': return <TikTokIcon size={size} />;
      case 'Instagram': return <InstagramIcon size={size} />;
      case 'Facebook': return <Facebook size={size} />;
      case 'Twitter': return <Twitter size={size} />;
      case 'YouTube': return <Youtube size={size} />;
      case 'Snapchat': return <SnapchatIcon size={size} />;
      default: return null;
    }
  };

  // Only show header/footer if not Maintenance mode (or if admin is logged in)
  const isMaintenanceVisible = settings.maintenanceMode && !isAdminAuthenticated && !currentPage.startsWith('admin');
  const isAdminPage = currentPage.startsWith('admin');

  return (
    <div className="min-h-screen bg-white selection:bg-aura-black selection:text-white flex flex-col transition-colors duration-500" style={{ color: settings.colorText }}>
      <GlobalStyles />
      
      {settings.favicon && (
        <SEOHead title="" description="" />
      )}

      {!isAdminPage && !isMaintenanceVisible && (
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>

      {!isAdminPage && !isMaintenanceVisible && <BackToTop />}

      {!isAdminPage && !isMaintenanceVisible && (
        <footer className="bg-white border-t border-neutral-100 pt-16 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left cursor-pointer" onClick={() => { handleNavigate('home'); }}>
              {settings.logo ? (
                 <img src={settings.logo} alt="Hair Aura" className="h-8 w-auto object-contain mx-auto md:mx-0 mb-2" />
              ) : (
                <span className="font-serif text-2xl font-bold tracking-tighter" style={{ color: settings.colorText }}>
                  HAIR AURA<span className="text-3xl text-neutral-400">.</span>
                </span>
              )}
              <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest">{settings.address.split(',')[0]}</p>
            </div>
            
            <div className="flex gap-6">
              <a 
                href={`https://wa.me/${settings.phoneNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-opacity hover:opacity-70"
                style={{ color: settings.colorAccent }}
              >
                <WhatsAppIcon size={20} />
              </a>
              {settings.socialLinks?.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="transition-opacity hover:opacity-70"
                  style={{ color: settings.colorAccent }}
                >
                  {renderSocialIcon(link.platform, 20)}
                </a>
              ))}
            </div>

            <div className="text-center md:text-right text-xs text-neutral-400 flex flex-col gap-2">
              <div className="flex gap-4 justify-center md:justify-end mb-2">
                <button onClick={() => handleNavigate('terms')} className="hover:text-aura-black transition-colors" style={{ color: settings.colorText }}>Terms</button>
                <button onClick={() => handleNavigate('privacy')} className="hover:text-aura-black transition-colors" style={{ color: settings.colorText }}>Privacy</button>
              </div>
              <p>&copy; {new Date().getFullYear()} Hair Aura. Ghana.</p>
              <button 
                onClick={() => { handleNavigate('admin-products'); }} 
                className="hover:opacity-70 transition-opacity text-[10px] uppercase tracking-wider"
                style={{ color: settings.colorText }}
              >
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
