
import React from 'react';
import { MapPin } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon } from './Icons';
import { WHATSAPP_CONFIG } from '../constants';

const Contact: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`;
  const tiktokUrl = "https://www.tiktok.com/@hair_aura_official";

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-aura-black">Get in Touch</h1>
        <p className="text-neutral-400 uppercase tracking-widest text-xs">Exclusively serving Ghana</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Introduction */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-lg text-neutral-600 font-light leading-relaxed">
            We operate exclusively online and via WhatsApp to ensure a personalized luxury experience for our clients in Ghana. 
            Connect with us directly for consultations and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* WhatsApp Card */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group border border-neutral-200 p-8 flex flex-col items-center justify-center text-center hover:border-aura-black transition-colors bg-white">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-aura-black transition-colors">
              <WhatsAppIcon size={24} className="text-aura-black group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2">WhatsApp Us</h3>
            <p className="text-neutral-500 text-sm mb-4">Start a chat for instant support & orders</p>
            <span className="text-xs font-bold uppercase tracking-widest border-b border-aura-black pb-1">Start Chat</span>
          </a>

          {/* TikTok Card */}
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="group border border-neutral-200 p-8 flex flex-col items-center justify-center text-center hover:border-aura-black transition-colors bg-white">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-aura-black transition-colors">
              <TikTokIcon size={24} className="text-aura-black group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2">Follow on TikTok</h3>
            <p className="text-neutral-500 text-sm mb-4">@hair_aura_official</p>
            <span className="text-xs font-bold uppercase tracking-widest border-b border-aura-black pb-1">View Content</span>
          </a>
        </div>

        {/* Info List */}
        <div className="border-t border-neutral-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2 text-aura-black">
              <MapPin size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">Location</span>
            </div>
            <p className="text-neutral-500 text-sm">Odumase GA West<br/>Accra, Ghana</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2 text-aura-black">
              <WhatsAppIcon size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">Phone</span>
            </div>
            <p className="text-neutral-500 text-sm">+233 50 800 7873</p>
          </div>

        </div>

      </div>

      {/* Newsletter / Updates Only */}
      <section className="py-20 bg-aura-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">The Aura Community</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Follow us on TikTok for the latest drops, styling tutorials, and exclusive Ghana-only offers.
          </p>
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-aura-black px-10 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-200 transition-colors">
            Follow @hair_aura_official
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
