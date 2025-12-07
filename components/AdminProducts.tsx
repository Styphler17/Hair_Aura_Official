
import React, { useState, useEffect } from 'react';
import { ProductController } from '../backend/controllers/productController';
import { Product } from '../backend/models';
import { SettingsController } from '../backend/controllers/settingsController';
import { Trash2, Plus, X, Edit2, ImageIcon, Upload, Link, Loader } from 'lucide-react';
import { optimizeImage, validateFile } from '../utils/fileHelpers';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currency, setCurrency] = useState('GH₵');
  
  // Upload State
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    images: '',
    category: 'wigs' as 'wigs' | 'bundles' | 'closures',
    tags: '',
    colors: '',
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
        colors: product.colors ? product.colors.join(', ') : '',
        seoKeywords: product.seoKeywords || ''
      });
      setUploadMode('url');
    } else {
      setEditingId(null);
      setFormData({ name: '', price: '', description: '', image: '', images: '', category: 'wigs', tags: '', colors: '', seoKeywords: '' });
      setUploadMode('file');
    }
    setIsModalOpen(true);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsProcessing(true);
    const newImages: string[] = [];
    const currentImages = formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [];

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const error = validateFile(file, 'image');
            if (error) {
                alert(error);
                continue;
            }

            const optimizedDataUrl = await optimizeImage(file);
            newImages.push(optimizedDataUrl);
        }

        const updatedImageList = [...currentImages, ...newImages];
        setFormData(prev => ({
            ...prev,
            images: updatedImageList.join(', '),
            image: updatedImageList[0] || prev.image
        }));
    } catch (err) {
        console.error("Optimization failed", err);
        alert("Failed to process image.");
    } finally {
        setIsProcessing(false);
        setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedTags = formData.tags 
      ? formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0) 
      : [];
    
    const processedColors = formData.colors
      ? formData.colors.split(',').map(c => c.trim()).filter(c => c.length > 0)
      : [];

    const processedImages = formData.images
      ? formData.images.split(',').map(url => url.trim()).filter(url => url.length > 0)
      : [formData.image];

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      tags: processedTags,
      colors: processedColors,
      images: processedImages,
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
                  <span key={t} className="text-[9px] bg-aura-black text-white border border-aura-black px-2 py-1 rounded-sm uppercase tracking-wider font-medium">{t}</span>
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-aura-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 rounded-sm my-8 border-t-4 border-aura-gold">
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-100">
              <h2 className="font-serif font-bold text-2xl text-aura-black">{editingId ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-aura-black transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Product Images</label>
                <div className="flex gap-4 mb-4">
                    <button 
                        type="button" 
                        onClick={() => setUploadMode('file')}
                        className={`flex-1 py-2 text-xs uppercase font-bold tracking-widest border ${uploadMode === 'file' ? 'bg-aura-black text-white border-aura-black' : 'bg-white text-neutral-500 border-neutral-200 hover:border-aura-black'}`}
                    >
                        <Upload size={14} className="inline mr-2" /> Upload File
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setUploadMode('url')}
                        className={`flex-1 py-2 text-xs uppercase font-bold tracking-widest border ${uploadMode === 'url' ? 'bg-aura-black text-white border-aura-black' : 'bg-white text-neutral-500 border-neutral-200 hover:border-aura-black'}`}
                    >
                        <Link size={14} className="inline mr-2" /> Paste URL
                    </button>
                </div>

                {uploadMode === 'file' ? (
                     <div 
                        className={`relative border-2 border-dashed rounded-sm p-8 text-center transition-all ${dragActive ? 'border-aura-gold bg-aura-gold/5' : 'border-neutral-300 bg-neutral-50 hover:bg-white'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                     >
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {isProcessing ? (
                            <div className="flex flex-col items-center text-aura-gold">
                                <Loader size={32} className="animate-spin mb-2" />
                                <span className="text-xs font-bold uppercase tracking-widest">Optimizing Images...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-neutral-400">
                                <ImageIcon size={32} className="mb-2" />
                                <span className="text-xs font-bold uppercase tracking-widest mb-1">Drag & Drop or Click to Upload</span>
                                <span className="text-[10px]">JPG, PNG, WebP (Max 10MB)</span>
                            </div>
                        )}
                     </div>
                ) : (
                     <textarea 
                        rows={2}
                        placeholder="https://image1.jpg, https://image2.jpg"
                        className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                        value={formData.images}
                        onChange={e => {
                            setFormData({...formData, images: e.target.value, image: e.target.value.split(',')[0].trim()});
                        }}
                        style={{ backgroundColor: '#ffffff' }}
                    />
                )}
                {formData.images && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {formData.images.split(',').filter(Boolean).map((img, idx) => (
                            <div key={idx} className="w-16 h-16 border border-neutral-200 flex-shrink-0 relative group">
                                <img src={img.trim()} className="w-full h-full object-cover" alt="Preview" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newImages = formData.images.split(',').filter((_, i) => i !== idx).join(', ');
                                        setFormData({...formData, images: newImages, image: newImages.split(',')[0]?.trim() || ''});
                                    }} 
                                    className="absolute top-0 right-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={10} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
              </div>

              <div className="pt-2 bg-neutral-50 p-6 rounded-sm border border-neutral-100 space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-gold mb-2 border-b border-neutral-200 pb-2">Search & Variants</h3>
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
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Available Colors</label>
                  <input 
                    type="text" 
                    placeholder="Natural Black, 613 Blonde, Auburn..."
                    className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                    value={formData.colors}
                    onChange={e => setFormData({...formData, colors: e.target.value})}
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
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 border border-neutral-200 text-neutral-500 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-50 transition-colors">
                   Cancel
                </button>
                <button type="submit" disabled={isProcessing} className="w-2/3 bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-lg border border-aura-black hover:border-aura-gold hover:text-aura-gold disabled:opacity-50">
                  {isProcessing ? 'Processing...' : 'Save Product'}
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
