
import React, { useState, useEffect } from 'react';
import { BlogController } from '../backend/controllers/blogController';
import { BlogPost } from '../backend/models';
import { Trash2, Plus, X, Edit2, ImageIcon } from 'lucide-react';

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Admin',
    seoDescription: ''
  });

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = () => {
    setPosts(BlogController.getAll());
  };

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        author: post.author,
        seoDescription: post.seoDescription
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', excerpt: '', content: '', image: '', author: 'Admin', seoDescription: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { ...formData };

    if (editingId) {
      BlogController.update(editingId, postData);
    } else {
      BlogController.create(postData);
    }
    
    setIsModalOpen(false);
    refreshPosts();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post?')) {
      BlogController.delete(id);
      refreshPosts();
    }
  };

  const inputStyle = { backgroundColor: '#ffffff', color: '#0a0a0a' };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-aura-black">The Journal</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage blog posts and articles.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-aura-black text-white border border-aura-black px-6 py-3 rounded-sm uppercase text-xs font-bold tracking-[0.15em] flex items-center gap-2 hover:bg-white hover:text-aura-black hover:border-aura-black transition-all shadow-md w-full sm:w-auto justify-center group"
        >
          <Plus size={16} className="group-hover:scale-110 transition-transform"/> New Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white border border-neutral-200 p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-aura-gold transition-colors duration-300">
            {/* Image */}
            <div className="w-full md:w-24 h-48 md:h-24 flex-shrink-0 bg-neutral-100 rounded-sm overflow-hidden relative">
               {post.image ? (
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-neutral-300">
                   <ImageIcon size={24} />
                 </div>
               )}
            </div>

            {/* Details */}
            <div className="flex-grow min-w-0 w-full">
              <h3 className="font-serif text-lg font-bold text-aura-black truncate">{post.title}</h3>
              <p className="text-xs text-neutral-400 mb-2 uppercase tracking-wide">{new Date(post.date).toLocaleDateString()} • {post.author}</p>
              <p className="text-sm text-neutral-500 line-clamp-2 font-light">{post.excerpt}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleOpenModal(post)} 
                className="p-2 text-neutral-400 hover:text-aura-gold hover:bg-neutral-50 rounded-full transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(post.id)} 
                className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="p-12 text-center bg-white border border-dashed border-neutral-200 rounded-sm">
            <p className="font-serif text-xl text-neutral-300 mb-2">No Articles Yet</p>
            <p className="text-sm text-neutral-400">Start writing your first blog post.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-aura-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl shadow-2xl animate-in fade-in zoom-in duration-200 rounded-sm my-8 border-t-4 border-aura-gold">
            <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-100">
              <h2 className="font-serif font-bold text-2xl text-aura-black">{editingId ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-aura-black transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Author</label>
                   <input 
                     type="text" 
                     className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                     value={formData.author}
                     onChange={e => setFormData({...formData, author: e.target.value})}
                     style={inputStyle}
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Thumbnail URL</label>
                   <input 
                     type="text" 
                     placeholder="https://..."
                     className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all"
                     value={formData.image}
                     onChange={e => setFormData({...formData, image: e.target.value})}
                     style={inputStyle}
                   />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Excerpt (Short Summary)</label>
                <textarea 
                  rows={2}
                  required
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">Content Body (HTML Supported)</label>
                <textarea 
                  rows={10}
                  required
                  className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold transition-all font-mono"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  style={inputStyle}
                />
              </div>

              <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-100">
                 <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-aura-black">SEO Meta Description</label>
                 <textarea 
                   rows={2}
                   className="w-full bg-white border border-neutral-300 p-3 text-sm text-aura-black focus:outline-none focus:border-aura-gold focus:ring-1 focus:ring-aura-gold resize-none transition-all"
                   value={formData.seoDescription}
                   onChange={e => setFormData({...formData, seoDescription: e.target.value})}
                   style={inputStyle}
                 />
                 <p className="text-[10px] text-neutral-400 mt-2">Will be used for search engines and social media previews.</p>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 border border-neutral-200 text-neutral-500 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-50 transition-colors">
                   Cancel
                </button>
                <button type="submit" className="w-2/3 bg-aura-black text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-lg border border-aura-black hover:border-aura-gold hover:text-aura-gold">
                  {editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
