
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../backend/models';
import { BlogController } from '../backend/controllers/blogController';
import SEOHead from './SEOHead';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { SettingsController } from '../backend/controllers/settingsController';

interface BlogPostProps {
  id: string;
  onNavigate: (page: string, id?: string) => void;
}

const BlogPostPage: React.FC<BlogPostProps> = ({ id, onNavigate }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const found = BlogController.getById(id);
    if (found) {
      setPost(found);
      const all = BlogController.getAll();
      setRelatedPosts(all.filter(p => p.id !== id).slice(0, 3));
      window.scrollTo(0,0);
    }
  }, [id]);

  if (!post) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Simple HTML rendering safety check could be added here, currently trusting admin input
  
  return (
    <div className="bg-white min-h-screen pb-20">
      <SEOHead 
        title={post.title} 
        description={post.seoDescription || post.excerpt} 
        image={post.image}
      />

      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
         <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 px-4">
             <div className="max-w-3xl mx-auto w-full text-white">
                 <button 
                   onClick={() => onNavigate('blog')}
                   className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-xs font-bold uppercase tracking-widest transition-colors"
                 >
                    <ArrowLeft size={16} /> Back to Journal
                 </button>
                 <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                 <div className="flex items-center gap-6 text-sm font-medium">
                    <span className="flex items-center gap-2"><Calendar size={16} className="text-aura-gold"/> {new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><User size={16} className="text-aura-gold"/> {post.author}</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-neutral-50 border-b border-neutral-100">
         <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 overflow-x-auto whitespace-nowrap">
             <span className="cursor-pointer hover:text-aura-black" onClick={() => onNavigate('home')}>Home</span>
             <span>/</span>
             <span className="cursor-pointer hover:text-aura-black" onClick={() => onNavigate('blog')}>Journal</span>
             <span>/</span>
             <span className="text-aura-black font-bold truncate">{post.title}</span>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
         <div 
           className="prose prose-lg prose-neutral font-light leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-aura-black first-letter:float-left first-letter:mr-3"
           dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
         />
         
         <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Share this article</span>
            <div className="flex gap-4">
               <button onClick={() => {
                   if (navigator.share) {
                       navigator.share({ title: post.title, url: window.location.href });
                   } else {
                       navigator.clipboard.writeText(window.location.href);
                       alert('Link copied to clipboard');
                   }
               }} className="text-aura-black hover:text-aura-gold transition-colors">
                  <Share2 size={20} />
               </button>
            </div>
         </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
         <div className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <h3 className="font-serif text-3xl font-bold text-center mb-12 text-aura-black">More Stories</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map(related => (
                     <div key={related.id} className="cursor-pointer group" onClick={() => onNavigate('blog-post', related.id)}>
                        <div className="aspect-video bg-white mb-4 overflow-hidden">
                           <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h4 className="font-serif text-xl font-bold mb-2 text-aura-black group-hover:underline">{related.title}</h4>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest">{new Date(related.date).toLocaleDateString()}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default BlogPostPage;
