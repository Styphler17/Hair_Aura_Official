
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { TikTokIcon } from './Icons';
import { SettingsController } from '../backend/controllers/settingsController';
import ProductCard from './ProductCard';
import Reveal from './Reveal';
import { ProductController } from '../backend/controllers/productController';
import { Product, SiteSettings, BlogPost } from '../backend/models';
import { BlogController } from '../backend/controllers/blogController';
import SEOHead from './SEOHead';

interface HomeProps {
  onShopClick: () => void;
  onNavigate?: (page: string, id?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onShopClick, onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const blogScrollRef = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(SettingsController.getSettings());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await ProductController.getAll();
        setFeaturedProducts(allProducts.slice(0, 3));
        setLatestBlogs(BlogController.getAll().slice(0, 5));
        setSettings(SettingsController.getSettings());
      } catch (error) {
        console.error("Error loading featured products:", error);
      }
    };
    fetchData();
  }, []);
  
  const tiktokPosts = [
    { id: 1, image: 'https://picsum.photos/seed/hair1/600/900', views: '2.4M', desc: 'Bone straight vibes ✨' },
    { id: 2, image: 'https://picsum.photos/seed/hair2/600/900', views: '850K', desc: 'Install process 🤍' },
    { id: 3, image: 'https://picsum.photos/seed/hair3/600/900', views: '1.2M', desc: 'Customer review! 😍' },
    { id: 4, image: 'https://picsum.photos/seed/hair4/600/900', views: '500K', desc: 'Unboxing 613 Blonde' },
    { id: 5, image: 'https://picsum.photos/seed/hair5/600/900', views: '3.1M', desc: 'Maintenance tips 101' },
    { id: 6, image: 'https://picsum.photos/seed/hair6/600/900', views: '900K', desc: 'HD Lace melt 💦' },
  ];

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { current } = ref;
      // Scroll amount approximates card width + gap for a natural feel
      const scrollAmount = direction === 'left' ? -310 : 310;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product: Product) => {
    if (onNavigate) {
      onNavigate('product-details', product.id);
    }
  };

  return (
    <div>
      <SEOHead 
        title="Luxury Virgin Hair Extensions & Wigs" 
        description="Hair Aura offers premium 100% virgin human hair, HD lace wigs, and bundles in Accra, Ghana. Shop our luxury collection today."
        keywords="hair aura, ghana wigs, accra hair shop, virgin hair ghana, luxury extensions"
      />
      
      <div className="relative bg-aura-black text-white h-[85vh] md:h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroImage} 
            alt="Luxury Hair Model" 
            className="w-full h-full object-cover opacity-50 grayscale scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aura-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <Reveal>
            <h2 className="text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase mb-4 md:mb-6 text-neutral-300">
              Premium Virgin Hair in Ghana
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-serif font-bold mb-6 md:mb-8 leading-[0.95]" dangerouslySetInnerHTML={{ __html: settings.heroHeadline || 'Unleash Your Inner Aura' }}>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-base md:text-xl text-neutral-300 mb-8 md:mb-10 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
              {settings.heroSubheadline}
            </p>
          </Reveal>
          
          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={onShopClick} className="group flex items-center justify-center gap-2 bg-white text-aura-black px-8 py-4 rounded-sm uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-neutral-200 transition-all">
                {settings.heroCtaText}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={`https://wa.me/${settings.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-white text-white px-8 py-4 rounded-sm uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-white hover:text-aura-black transition-all">
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      
      <div className="bg-white py-16 md:py-20 text-center border-b border-neutral-100">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">The Aura Standard</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-24 opacity-60 grayscale px-4">
            <span className="font-serif text-xl md:text-2xl font-bold text-neutral-800">100% VIRGIN</span>
            <span className="hidden sm:inline w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span className="font-serif text-xl md:text-2xl font-bold text-neutral-800">HD LACE</span>
            <span className="hidden sm:inline w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span className="font-serif text-xl md:text-2xl font-bold text-neutral-800">DOUBLE DRAWN</span>
          </div>
        </Reveal>
      </div>

      <div className="py-20 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-aura-black mb-3">Best Sellers</h2>
              <p className="text-neutral-500 uppercase tracking-widest text-xs">Our most coveted pieces</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 150}>
                <ProductCard product={product} onQuickView={handleProductClick} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Reveal delay={300}>
              <button onClick={onShopClick} className="inline-flex items-center gap-2 border-b-2 border-aura-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-neutral-600 hover:border-neutral-600 transition-colors">
                View All Collection <ArrowRight size={14} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Social / TikTok Section */}
      <div className="bg-white py-20 md:py-24 overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
                  <div className="mb-6 md:mb-0">
                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-aura-black">As Seen On Aura</h2>
                      <a href="https://www.tiktok.com/@hair_aura_official" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-400 text-xs font-bold hover:text-aura-black transition-colors uppercase tracking-[0.2em]">
                          <TikTokIcon size={14} />
                          @hair_aura_official
                      </a>
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => scroll(scrollRef, 'left')} className="p-3 border border-neutral-200 hover:bg-neutral-50 transition-colors text-aura-black">
                          <ChevronLeft size={20} />
                      </button>
                      <button onClick={() => scroll(scrollRef, 'right')} className="p-3 border border-neutral-200 hover:bg-neutral-50 transition-colors text-aura-black">
                          <ChevronRight size={20} />
                      </button>
                  </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div 
                  ref={scrollRef}
                  className="flex gap-4 md:gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                  {tiktokPosts.map((post) => (
                      <a 
                          key={post.id} 
                          href="https://www.tiktok.com/@hair_aura_official" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative flex-none w-[220px] md:w-[280px] aspect-[9/16] bg-neutral-100 overflow-hidden snap-center cursor-pointer"
                      >
                          <img 
                              src={post.image} 
                              alt={post.desc} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                                  <Play size={20} className="text-white fill-white ml-1" />
                              </div>
                          </div>

                          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex items-center gap-2 mb-2">
                                  <TikTokIcon size={12} />
                                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{post.views} Views</span>
                              </div>
                              <p className="font-serif text-base md:text-lg leading-tight line-clamp-2">{post.desc}</p>
                          </div>
                      </a>
                  ))}
              </div>
            </Reveal>
        </div>
      </div>

      {/* Blog Carousel */}
      {latestBlogs.length > 0 && (
         <div className="bg-neutral-50 py-20 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <Reveal>
                  <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
                     <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-aura-black">The Journal</h2>
                        <button onClick={() => onNavigate && onNavigate('blog')} className="inline-flex items-center gap-2 text-neutral-400 text-xs font-bold hover:text-aura-black transition-colors uppercase tracking-[0.2em]">
                           Read All Stories <ArrowRight size={14} />
                        </button>
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => scroll(blogScrollRef, 'left')} className="p-3 border border-neutral-200 hover:bg-white transition-colors text-aura-black">
                           <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll(blogScrollRef, 'right')} className="p-3 border border-neutral-200 hover:bg-white transition-colors text-aura-black">
                           <ChevronRight size={20} />
                        </button>
                     </div>
                  </div>
               </Reveal>

               <Reveal delay={200}>
                  <div 
                     ref={blogScrollRef}
                     className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                     {latestBlogs.map((blog) => (
                        <div 
                           key={blog.id} 
                           className="flex-none w-[300px] md:w-[350px] snap-center cursor-pointer group"
                           onClick={() => onNavigate && onNavigate('blog-post', blog.id)}
                        >
                           <div className="aspect-[4/3] bg-white overflow-hidden mb-4">
                              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           </div>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-aura-gold mb-2">{new Date(blog.date).toLocaleDateString()}</p>
                           <h3 className="font-serif text-xl font-bold text-aura-black mb-2 leading-tight group-hover:underline">{blog.title}</h3>
                           <p className="text-sm text-neutral-500 line-clamp-2">{blog.excerpt}</p>
                        </div>
                     ))}
                  </div>
               </Reveal>
            </div>
         </div>
      )}
    </div>
  );
};

export default Home;
