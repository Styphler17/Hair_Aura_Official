
import React, { useState, useEffect } from 'react';
import { BlogController } from '../backend/controllers/blogController';
import { BlogPost } from '../backend/models';
import SEOHead from './SEOHead';
import { ArrowRight, BookOpen } from 'lucide-react';

interface BlogProps {
  onNavigate?: (page: string, id?: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(BlogController.getAll());
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEOHead 
        title="The Journal" 
        description="Expert hair care tips, style guides, and behind the scenes at Hair Aura Ghana." 
      />
      
      {/* Header */}
      <div className="bg-neutral-50 py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-aura-black">The Journal</h1>
        <p className="text-neutral-400 uppercase tracking-widest text-xs">Styles, Stories & Care Tips</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
           <div className="text-center py-20 border border-dashed border-neutral-200">
              <BookOpen size={48} className="mx-auto text-neutral-300 mb-4" />
              <h2 className="font-serif text-2xl text-neutral-400">No stories yet</h2>
              <p className="text-neutral-500 text-sm">Check back soon for the latest updates.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map(post => (
               <div key={post.id} className="group flex flex-col cursor-pointer" onClick={() => onNavigate && onNavigate('blog-post', post.id)}>
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-6">
                     <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                     />
                  </div>
                  <div className="flex flex-col flex-grow">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-aura-gold">{new Date(post.date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{post.author}</span>
                     </div>
                     <h2 className="font-serif text-2xl font-bold text-aura-black mb-3 group-hover:underline decoration-1 underline-offset-4 leading-tight">
                        {post.title}
                     </h2>
                     <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                     </p>
                     <div className="mt-auto">
                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aura-black border-b border-aura-black pb-1 hover:text-aura-gold hover:border-aura-gold transition-colors">
                           Read Now <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
