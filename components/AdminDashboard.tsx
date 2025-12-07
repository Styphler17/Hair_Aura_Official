
import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../types';
import { Trash2, Plus, X, Edit2, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'wigs' as 'wigs' | 'bundles' | 'closures'
  });

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = () => {
    setProducts(ProductService.getAll());
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        category: product.category
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', price: '', description: '', image: '', category: 'wigs' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingId) {
      ProductService.update(editingId, productData);
    } else {
      ProductService.add(productData);
    }
    
    setIsModalOpen(false);
    refreshProducts();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      ProductService.delete(id);
      refreshProducts();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Header */}
      <div className="bg-aura-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <span className="font-serif font-bold text-xl">Hair Aura <span className="text-neutral-500 text-sm font-sans uppercase tracking-widest ml-2">/ Admin</span></span>
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-neutral-300">
          <LogOut size={16} /> Exit
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-aura-black">Inventory</h1>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-aura-black text-white px-6 py-3 rounded-sm uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Image</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={product.image} alt={product.name} className="w-12 h-16 object-cover bg-neutral-100" />
                  </td>
                  <td className="px-6 py-4 font-medium text-aura-black">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-neutral-100 text-[10px] uppercase tracking-wider font-bold rounded-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">${product.price}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(product)} className="text-neutral-400 hover:text-aura-black transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="text-neutral-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-12 text-center text-neutral-400">No products found.</div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <h2 className="font-serif font-bold text-xl">{editingId ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-aura-black"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-aura-black"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-aura-black"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Category</label>
                  <select 
                    className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-aura-black bg-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="wigs">Wigs</option>
                    <option value="bundles">Bundles</option>
                    <option value="closures">Closures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-aura-black resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Image URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://..."
                  className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-aura-black"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <button type="submit" className="w-full bg-aura-black text-white py-4 mt-4 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors">
                {editingId ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
