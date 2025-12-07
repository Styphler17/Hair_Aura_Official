
import React, { useEffect, useState } from 'react';
import { ProductController } from '../backend/controllers/productController';
import { BlogController } from '../backend/controllers/blogController';
import { AuthController } from '../backend/controllers/authController';
import { SettingsController } from '../backend/controllers/settingsController';
import { ShoppingBag, BookOpen, Users, DollarSign, TrendingUp, Package, ArrowUpRight } from 'lucide-react';
import { Product, BlogPost } from '../backend/models';

const AdminOverview: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    totalBlogs: 0,
    totalAdmins: 0,
    categories: {
      wigs: 0,
      bundles: 0,
      closures: 0
    }
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState('GH₵');

  useEffect(() => {
    // Fetch Data
    const products = ProductController.getAll();
    const blogs = BlogController.getAll();
    const admins = AuthController.getUsers();
    const settings = SettingsController.getSettings();

    // Calculate Stats
    const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);
    const wigs = products.filter(p => p.category === 'wigs').length;
    const bundles = products.filter(p => p.category === 'bundles').length;
    const closures = products.filter(p => p.category === 'closures').length;

    setStats({
      totalProducts: products.length,
      totalValue,
      totalBlogs: blogs.length,
      totalAdmins: admins.length,
      categories: { wigs, bundles, closures }
    });

    // Get 5 most recent products (assuming new ones are added to top/start of list)
    setRecentProducts(products.slice(0, 5));
    setCurrency(settings.currencySymbol);
  }, []);

  const StatCard = ({ title, value, icon: Icon, subtext, accent = false }: any) => (
    <div className={`p-6 rounded-sm border transition-all duration-300 ${accent ? 'bg-aura-black text-white border-aura-black' : 'bg-white border-neutral-200 hover:border-aura-gold'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest ${accent ? 'text-aura-gold' : 'text-neutral-500'}`}>{title}</p>
          <h3 className="text-3xl font-serif font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${accent ? 'bg-white/10 text-white' : 'bg-neutral-50 text-aura-black'}`}>
          <Icon size={20} />
        </div>
      </div>
      {subtext && <p className={`text-xs ${accent ? 'text-neutral-400' : 'text-neutral-400'}`}>{subtext}</p>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-aura-black">Dashboard Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">Live statistics and store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Inventory Value" 
          value={`${currency}${stats.totalValue.toLocaleString()}`} 
          icon={DollarSign}
          subtext="Total asset value"
          accent={true}
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={ShoppingBag}
          subtext="Active items in store"
        />
        <StatCard 
          title="Blog Posts" 
          value={stats.totalBlogs} 
          icon={BookOpen}
          subtext="Published articles"
        />
        <StatCard 
          title="Team Members" 
          value={stats.totalAdmins} 
          icon={Users}
          subtext="Active admin accounts"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Category Breakdown Chart */}
        <div className="lg:col-span-2 bg-white p-8 border border-neutral-200 rounded-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-serif text-lg font-bold text-aura-black">Inventory Distribution</h3>
             <button onClick={() => onNavigate('admin-products')} className="text-xs text-aura-black font-bold uppercase tracking-wider hover:text-aura-gold flex items-center gap-1">
               Manage Inventory <ArrowUpRight size={14} />
             </button>
          </div>
          
          <div className="space-y-6">
            {/* Wigs Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span>Wigs</span>
                <span>{stats.categories.wigs} Items</span>
              </div>
              <div className="w-full bg-neutral-100 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-aura-black h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.totalProducts ? (stats.categories.wigs / stats.totalProducts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Bundles Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span>Bundles</span>
                <span>{stats.categories.bundles} Items</span>
              </div>
              <div className="w-full bg-neutral-100 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-aura-gold h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.totalProducts ? (stats.categories.bundles / stats.totalProducts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Closures Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                <span>Closures</span>
                <span>{stats.categories.closures} Items</span>
              </div>
              <div className="w-full bg-neutral-100 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-neutral-400 h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${stats.totalProducts ? (stats.categories.closures / stats.totalProducts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Recent */}
        <div className="bg-neutral-50 p-8 border border-neutral-200 rounded-sm">
           <h3 className="font-serif text-lg font-bold text-aura-black mb-6">Recent Additions</h3>
           <div className="space-y-4">
             {recentProducts.length > 0 ? (
               recentProducts.map(product => (
                 <div key={product.id} className="flex items-center gap-4 bg-white p-3 border border-neutral-100 shadow-sm">
                   <img src={product.image} alt={product.name} className="w-10 h-10 object-cover bg-neutral-100" />
                   <div className="min-w-0 flex-1">
                     <p className="text-sm font-bold text-aura-black truncate">{product.name}</p>
                     <p className="text-[10px] text-neutral-500 uppercase tracking-wide">{product.category}</p>
                   </div>
                   <span className="text-xs font-bold text-aura-gold">{currency}{product.price.toLocaleString()}</span>
                 </div>
               ))
             ) : (
               <p className="text-sm text-neutral-400 italic">No products yet.</p>
             )}
           </div>
           
           <button 
             onClick={() => onNavigate('admin-products')}
             className="w-full mt-6 bg-white border border-neutral-300 text-aura-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-aura-black hover:text-white transition-colors"
           >
             View All Products
           </button>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;
