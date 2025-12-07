
import React, { useState } from 'react';
import { MapPin, Facebook, Twitter, Youtube } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon, InstagramIcon, SnapchatIcon } from './Icons';
import { SettingsController } from '../backend/controllers/settingsController';
import { SiteSettings } from '../backend/models';
import SEOHead from './SEOHead';

const Contact: React.FC = () => {
  const [settings] = useState<SiteSettings>(SettingsController.getSettings());
  const whatsappUrl = `https://wa.me/${settings.phoneNumber}`;

  const renderSocialIcon = (platform: string, size: number) => {
    switch(platform) {
      case 'TikTok': return <TikTokIcon size={size} />;
      case 'Instagram': return <InstagramIcon size={size} />;
      case 'Facebook': return <Facebook size={size} />;
      case 'Twitter': return <Twitter size={size} />;
      case 'YouTube': return <Youtube size={size} />;
      case 'Snapchat': return <SnapchatIcon size={size} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Contact Us" 
        description={`Get in touch with Hair Aura in Accra, Ghana. Order via WhatsApp or visit our location in ${settings.address}.`}
      />
      <div className="bg-neutral-50 py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-aura-black">Get in Touch</h1>
        <p className="text-neutral-400 uppercase tracking-widest text-xs">Exclusively serving Ghana</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-lg text-neutral-600 font-light leading-relaxed">
            We operate exclusively online and via WhatsApp to ensure a personalized luxury experience for our clients in Ghana. 
            Connect with us directly for consultations and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group border border-neutral-200 p-8 flex flex-col items-center justify-center text-center hover:border-aura-black transition-colors bg-white">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-aura-black transition-colors">
              <WhatsAppIcon size={24} className="text-aura-black group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2">WhatsApp Us</h3>
            <p className="text-neutral-500 text-sm mb-4">Start a chat for instant support & orders</p>
            <span className="text-xs font-bold uppercase tracking-widest border-b border-aura-black pb-1">Start Chat</span>
          </a>

          {/* Display first available social link as featured, or default */}
          {settings.socialLinks.length > 0 && (
             <a href={settings.socialLinks[0].url} target="_blank" rel="noopener noreferrer" className="group border border-neutral-200 p-8 flex flex-col items-center justify-center text-center hover:border-aura-black transition-colors bg-white">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-aura-black transition-colors">
                  <div className="text-aura-black group-hover:text-white transition-colors">
                    {renderSocialIcon(settings.socialLinks[0].platform, 24)}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Follow on {settings.socialLinks[0].platform}</h3>
                <p className="text-neutral-500 text-sm mb-4">@hair_aura_official</p>
                <span className="text-xs font-bold uppercase tracking-widest border-b border-aura-black pb-1">View Content</span>
             </a>
          )}
        </div>

        <div className="border-t border-neutral-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2 text-aura-black">
              <MapPin size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">Location</span>
            </div>
            <p className="text-neutral-500 text-sm">{settings.address}</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2 text-aura-black">
              <WhatsAppIcon size={18} />
              <span className="font-bold text-sm uppercase tracking-widest">Phone</span>
            </div>
            <p className="text-neutral-500 text-sm">+{settings.phoneNumber}</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-aura-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">The Aura Community</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Follow us on social media for the latest drops, styling tutorials, and exclusive Ghana-only offers.
          </p>
          <div className="flex justify-center gap-4">
             {settings.socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white text-aura-black p-3 rounded-full hover:bg-neutral-200 transition-colors">
                  {renderSocialIcon(link.platform, 20)}
                </a>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
