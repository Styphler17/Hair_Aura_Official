import React, { useState, useEffect } from 'react';
import { ProductController } from '../backend/controllers/productController';
import { Product } from '../backend/models';
import { SettingsController } from '../backend/controllers/settingsController';
import { Trash2, Plus, X, Edit2, ImageIcon } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currency, setCurrency] = useState('GH₵');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    images: '',
    category: 'wigs' as 'wigs' | 'bundles' | 'closures',
    tags: '',
    seoKeywords: ''
  });

  useEffect(() => {
    refreshProducts();
    setCurrency(SettingsController.getSettings().currencySymbol);
  }, []);

  const refreshProducts = () => {
    setProducts(ProductController.getAll());
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        images: product.images ? product.images.join(', ') : product.image,
        category: product.category,
        tags: product.tags ? product.tags.join(', ') : '',
        seoKeywords: product.seoKeywords || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', price: '', description: '', image: '', images: '', category: 'wigs', tags: '', seoKeywords: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedTags = formData.tags 
      ? formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0) 
      : [];

    const processedImages = formData.images
      ? formData.images.split(',').map(url => url.trim()).filter(url => url.length > 0)
      : [formData.image];

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      tags: processedTags,
      images: processedImages,
      // Ensure image is set to first of images for compatibility
      image: processedImages.length > 0 ? processedImages[0] : formData.image,
      seoKeywords: formData.seoKeywords
    };

    if (editingId) {
      ProductController.update(editingId, productData);
    } else {
      ProductController.create(productData);
    }
    
    setIsModalOpen(false);
    refreshProducts();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      ProductController.delete(id);
      refreshProducts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-aura-black">Inventory</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage your luxury collection</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-aura-black text-white border border-aura-black px-6 py-3 rounded-sm uppercase text-xs font-bold tracking-[0.15em] flex items-center gap-2 hover:bg-white hover:text-aura-black hover:border-aura-black transition-all shadow-md w-full sm:w-auto justify-center group"
        >
          <Plus size={16} className="group-hover:scale-110 transition-transform"/> Add Product
        </button>
      </div>

      {/* Responsive List Layout */}
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="bg-white border border-neutral-200 p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-aura-gold transition-colors duration-300">
            {/* Image */}
            <div className="w-full md:w-24 h-48 md:h-24 flex-shrink-0 bg-neutral-100 rounded-sm overflow-hidden relative">
               {product.image ? (
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-neutral-300">
                   <ImageIcon size={24} />
                 </div>
               )}
               <div className="absolute top-2 left-2 md:hidden">
                 <span className="bg-aura-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{product.category}</span>
               </div>
            </div>

            {/* Details */}
            <div className="flex-grow min-w-0 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg font-bold text-aura-black truncate">{product.name}</h3>
                <span className="hidden md:inline-block px-2 py-1 border border-neutral-200 text-[10px] uppercase tracking-wider font-bold rounded-sm text-neutral-500">
                  {product.category}
                </span>
              </div>
              
              <p className="text-sm text-neutral-500 line-clamp-1 mb-3 font-light">{product.description}</p>
              
              <div className="flex gap-2 flex-wrap">
                {product.tags?.map(t => (
                  <span key={t} className="text-[9px] bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-1 rounded-sm uppercase tracking-wider font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 mt-2 md:mt-0 border-t md:border-t-0 border-neutral-100 pt-4 md:pt-0">
              <span className="font-serif text-xl font-bold text-aura-black">{currency}{product.price.toLocaleString()}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(product)} 
                  className="p-2 text-neutral-400 hover:text-aura-gold hover:bg-neutral-50 rounded-full transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="p-12 text-center bg-white border border-dashed border-neutral-200 rounded-sm">
            <p className="font-serif text-xl text-neutral-300 mb-2">Inventory Empty</p>
            <p className="text-sm text-neutral-400">Add your first luxury product to get started.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-aura-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 rounded-sm my-8 border-t-4 border-aura-gold">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-100">
              <h2 className="font-serif font-bold text-2xl text-aura-black">{editingId ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-aura-black transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              {/* Price & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Price ({currency})</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Category</label>
                  <select 
                    className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <option value="wigs">Wigs</option>
                    <option value="bundles">Bundles</option>
                    <option value="closures">Closures</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Image URLs (Comma separated for carousel)</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="https://image1.jpg, https://image2.jpg"
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                  value={formData.images}
                  onChange={e => {
                     setFormData({...formData, images: e.target.value, image: e.target.value.split(',')[0].trim()});
                  }}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              {/* SEO Section */}
              <div className="pt-2 bg-neutral-50 p-6 rounded-sm border border-neutral-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-gold mb-4 border-b border-neutral-200 pb-2">Search Optimization</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Visual Tags</label>
                    <input 
                      type="text" 
                      placeholder="Best Seller, HD Lace..."
                      className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                      value={formData.tags}
                      onChange={e => setFormData({...formData, tags: e.target.value})}
                      style={{ backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">SEO Hidden Keywords</label>
                    <textarea 
                      rows={2}
                      placeholder="straight wig, bone straight, ghana wigs..."
                      className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                      value={formData.seoKeywords}
                      onChange={e => setFormData({...formData, seoKeywords: e.target.value})}
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <p className="text-[10px] text-neutral-400 mt-2">These keywords will be injected into the site's metadata for search engines.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 border border-neutral-200 text-neutral-500 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-50 transition-colors">
                   Cancel
                </button>
                <button type="submit" className="w-2/3 bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-lg border border-aura-black hover:border-aura-gold hover:text-aura-gold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;