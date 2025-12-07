
import React, { useState } from 'react';
import { ShoppingBag, Settings, User, LogOut, ExternalLink, Menu, X, BookOpen, LayoutDashboard } from 'lucide-react';
import BackToTop from './BackToTop';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, onNavigate, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItemClass = (page: string) => `
    flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer mb-1 border-l-4
    ${currentPage === page 
      ? 'bg-neutral-50 border-aura-gold text-aura-black shadow-sm' 
      : 'border-transparent text-neutral-500 hover:bg-white hover:text-aura-black hover:border-neutral-200'}
  `;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 flex flex-col z-40
        transition-transform duration-300 ease-in-out transform
        md:translate-x-0 shadow-xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-100">
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-aura-black block">HAIR AURA</span>
            <span className="text-aura-gold text-[10px] font-sans font-bold tracking-[0.3em] uppercase">Admin Portal</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-neutral-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
             <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Overview</p>
             <ul>
               <li onClick={() => { onNavigate('admin-overview'); setIsSidebarOpen(false); }} className={navItemClass('admin-overview')}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </li>
             </ul>
          </div>

          <div className="mb-8">
            <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Store Management</p>
            <ul>
              <li onClick={() => { onNavigate('admin-products'); setIsSidebarOpen(false); }} className={navItemClass('admin-products')}>
                <ShoppingBag size={18} />
                <span>Inventory</span>
              </li>
              <li onClick={() => { onNavigate('admin-blog'); setIsSidebarOpen(false); }} className={navItemClass('admin-blog')}>
                <BookOpen size={18} />
                <span>Blog Posts</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Configuration</p>
            <ul>
              <li onClick={() => { onNavigate('admin-settings'); setIsSidebarOpen(false); }} className={navItemClass('admin-settings')}>
                <Settings size={18} />
                <span>Site Settings</span>
              </li>
              <li onClick={() => { onNavigate('admin-profile'); setIsSidebarOpen(false); }} className={navItemClass('admin-profile')}>
                <User size={18} />
                <span>Profile</span>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-6 border-t border-neutral-100 bg-white">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-aura-gold transition-colors w-full mb-3 border border-neutral-200 hover:border-aura-gold rounded-sm justify-center"
          >
            <ExternalLink size={14} /> View Live Site
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white bg-aura-black hover:bg-neutral-800 rounded-sm w-full transition-colors justify-center"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden transition-all duration-300 relative">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-neutral-200 flex justify-between items-center px-4 md:px-8 sticky top-0 z-10 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-aura-black p-2 hover:bg-neutral-100 rounded-md">
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-serif font-bold text-aura-black">
              {currentPage === 'admin-overview' && 'Dashboard Overview'}
              {currentPage === 'admin-products' && 'Product Inventory'}
              {currentPage === 'admin-blog' && 'Blog Management'}
              {currentPage === 'admin-settings' && 'General Settings'}
              {currentPage === 'admin-profile' && 'Admin Profile'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-aura-black">Admin User</p>
              <p className="text-[10px] text-aura-gold uppercase tracking-wider font-bold">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-aura-black text-aura-gold border-2 border-aura-gold rounded-full flex items-center justify-center font-serif font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-neutral-50 relative">
          {children}
        </main>
        
        <BackToTop />
      </div>
    </div>
  );
};

export default AdminLayout;
