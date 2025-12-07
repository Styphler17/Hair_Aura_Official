
import React, { useState, useEffect } from 'react';
import { SettingsController } from '../backend/controllers/settingsController';
import { SiteSettings, SocialLink } from '../backend/models';
import { Save, Upload, Plus, Trash2, Layout, Palette, RefreshCcw, Check, Share2, Loader, FileText } from 'lucide-react';
import { optimizeImage } from '../utils/fileHelpers';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setSettings(SettingsController.getSettings());
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      SettingsController.updateSettings(settings);
      setSuccessMsg('Settings updated successfully. Changes applied globally.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon' | 'heroImage' | 'defaultSocialImage') => {
    const file = e.target.files?.[0];
    if (file && settings) {
      setIsProcessing(true);
      try {
          const optimized = await optimizeImage(file, field === 'favicon' ? 128 : 1920);
          setSettings({ ...settings, [field]: optimized });
      } catch (err) {
          console.error("Image optimization failed", err);
          alert("Failed to process image.");
      } finally {
          setIsProcessing(false);
      }
    }
  };

  const addSocialLink = () => {
    if (settings) {
      setSettings({
        ...settings,
        socialLinks: [...settings.socialLinks, { platform: 'Instagram', url: '' }]
      });
    }
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    if (settings) {
      const updatedLinks = [...settings.socialLinks];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      setSettings({ ...settings, socialLinks: updatedLinks });
    }
  };

  const removeSocialLink = (index: number) => {
    if (settings) {
      const updatedLinks = settings.socialLinks.filter((_, i) => i !== index);
      setSettings({ ...settings, socialLinks: updatedLinks });
    }
  };

  const BRAND_DEFAULT = {
    name: 'Brand Standard',
    text: '#0a0a0a',
    bg: '#ffffff',
    accent: '#D4AF37'
  };

  const ALTERNATIVES = [
    { name: 'Midnight Luxury', text: '#ffffff', bg: '#0a0a0a', accent: '#D4AF37' },
    { name: 'Soft Rose', text: '#5c4b4b', bg: '#fff0f5', accent: '#c58f8f' },
    { name: 'Royal Navy', text: '#ffffff', bg: '#0f172a', accent: '#38bdf8' },
    { name: 'Clean Slate', text: '#1f2937', bg: '#f3f4f6', accent: '#4b5563' },
  ];

  const applyPreset = (preset: { text: string, bg: string, accent: string }) => {
    if (settings) {
      setSettings({
        ...settings,
        colorText: preset.text,
        colorBackground: preset.bg,
        colorAccent: preset.accent
      });
    }
  };

  if (!settings) return <div>Loading...</div>;

  const inputStyle = { backgroundColor: '#ffffff', color: '#0a0a0a' };
  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-aura-black">Site Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage global configuration, homepage visuals, and branding.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-8 border border-neutral-200 rounded-sm shadow-sm w-full">
        
        {/* Homepage Hero Configuration */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-100 pb-2 flex items-center gap-2">
            <Layout size={14} /> Homepage Configuration
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Hero Background Image</label>
              <div className="relative w-full h-48 bg-neutral-100 border border-neutral-200 overflow-hidden mb-2 group">
                <img 
                  src={settings.heroImage} 
                  alt="Hero Background" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer bg-white text-aura-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-aura-gold hover:text-white transition-colors flex items-center gap-2">
                    {isProcessing ? <Loader size={14} className="animate-spin"/> : <Upload size={14} />} Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'heroImage')} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-aura-black mb-2">Hero Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => handleChange('heroHeadline', e.target.value)}
                  className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-aura-black mb-2">Call to Action (Button Text)</label>
                <input
                  type="text"
                  value={settings.heroCtaText}
                  onChange={(e) => handleChange('heroCtaText', e.target.value)}
                  className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Hero Sub-headline</label>
              <textarea
                value={settings.heroSubheadline}
                onChange={(e) => handleChange('heroSubheadline', e.target.value)}
                rows={2}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold resize-none"
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        {/* Page Content Configuration */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-100 pb-2 flex items-center gap-2">
            <FileText size={14} /> Page Content
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-aura-black mb-2">About Page Title</label>
                <input
                  type="text"
                  value={settings.aboutTitle}
                  onChange={(e) => handleChange('aboutTitle', e.target.value)}
                  className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-aura-black mb-2">Contact Page Title</label>
                <input
                  type="text"
                  value={settings.contactTitle}
                  onChange={(e) => handleChange('contactTitle', e.target.value)}
                  className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">About Page Content (Our Story)</label>
              <textarea
                value={settings.aboutContent}
                onChange={(e) => handleChange('aboutContent', e.target.value)}
                rows={5}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold resize-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Contact Page Intro Text</label>
              <textarea
                value={settings.contactContent}
                onChange={(e) => handleChange('contactContent', e.target.value)}
                rows={3}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold resize-none"
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-100 pb-2 flex items-center gap-2">
            <Palette size={14} /> Branding & Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Logo Upload */}
            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Website Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden p-2">
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs text-neutral-400">No Logo</span>
                  )}
                </div>
                <label className="cursor-pointer bg-white border border-neutral-300 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 flex items-center gap-2">
                  {isProcessing ? <Loader size={14} className="animate-spin"/> : <Upload size={14} />} Upload Logo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                </label>
              </div>
            </div>

            {/* Favicon Upload */}
             <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Favicon</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden p-1">
                  {settings.favicon ? (
                    <img src={settings.favicon} alt="Favicon" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xs text-neutral-400">No Icon</span>
                  )}
                </div>
                 <label className="cursor-pointer bg-white border border-neutral-300 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 flex items-center gap-2">
                  {isProcessing ? <Loader size={14} className="animate-spin"/> : <Upload size={14} />} Upload Icon
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'favicon')} />
                </label>
              </div>
            </div>

             {/* Social Share Image Upload */}
             <div className="md:col-span-2">
              <label className="block text-xs font-bold text-aura-black mb-2 flex items-center gap-2"><Share2 size={12}/> Default Social Share Image</label>
              <p className="text-[10px] text-neutral-400 mb-2">This image will be displayed when your website link is shared on WhatsApp, Facebook, etc.</p>
              <div className="flex items-center gap-4">
                <div className="w-32 h-20 border border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden p-1">
                  {settings.defaultSocialImage ? (
                    <img src={settings.defaultSocialImage} alt="Social Share" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-neutral-400">Default</span>
                  )}
                </div>
                 <label className="cursor-pointer bg-white border border-neutral-300 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 flex items-center gap-2">
                  {isProcessing ? <Loader size={14} className="animate-spin"/> : <Upload size={14} />} Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'defaultSocialImage')} />
                </label>
              </div>
            </div>
            
            {/* Dynamic Colors Section */}
            <div className="md:col-span-2 pt-4 border-t border-neutral-100">
               <div className="mb-8">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Color Presets</h4>
                 
                 <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-32 pt-2">
                            <span className="text-xs font-bold text-aura-black block">Brand Default</span>
                            <span className="text-[10px] text-neutral-400 block">Original Theme</span>
                        </div>
                        <button 
                            type="button"
                            onClick={() => applyPreset(BRAND_DEFAULT)}
                            className="flex items-center gap-3 border border-neutral-200 p-2 rounded-sm hover:border-aura-gold transition-colors bg-neutral-50 group"
                        >
                             <div className="flex gap-1">
                                <div className="w-6 h-6 rounded-full border border-neutral-200" style={{ backgroundColor: BRAND_DEFAULT.text }} title="Text"></div>
                                <div className="w-6 h-6 rounded-full border border-neutral-200" style={{ backgroundColor: BRAND_DEFAULT.bg }} title="Background"></div>
                                <div className="w-6 h-6 rounded-full border border-neutral-200" style={{ backgroundColor: BRAND_DEFAULT.accent }} title="Accent"></div>
                             </div>
                             <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 group-hover:text-aura-black">Restore Default</span>
                        </button>
                    </div>

                    <div>
                        <div className="w-full pt-4 mb-2">
                            <span className="text-xs font-bold text-aura-black block">Alternatives</span>
                            <span className="text-[10px] text-neutral-400 block">Select a pre-configured theme</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {ALTERNATIVES.map((preset) => (
                                <button
                                    key={preset.name}
                                    type="button"
                                    onClick={() => applyPreset(preset)}
                                    className="flex flex-col gap-2 border border-neutral-200 p-3 rounded-sm hover:border-aura-gold transition-all hover:shadow-sm bg-white min-w-[140px]"
                                >
                                    <div className="flex gap-1 justify-center">
                                        <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: preset.text }}></div>
                                        <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: preset.bg }}></div>
                                        <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: preset.accent }}></div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 text-center">{preset.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                 </div>
               </div>

               <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 pt-4 border-t border-neutral-100">Custom Colors</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-aura-black mb-1">Text / Primary</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.colorText}
                        onChange={(e) => handleChange('colorText', e.target.value)}
                        className="w-12 h-10 p-1 bg-white border border-neutral-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colorText}
                        onChange={(e) => handleChange('colorText', e.target.value)}
                        className="flex-1 border border-neutral-300 p-2 text-sm"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-aura-black mb-1">Page Background</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.colorBackground}
                        onChange={(e) => handleChange('colorBackground', e.target.value)}
                        className="w-12 h-10 p-1 bg-white border border-neutral-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colorBackground}
                        onChange={(e) => handleChange('colorBackground', e.target.value)}
                        className="flex-1 border border-neutral-300 p-2 text-sm"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-aura-black mb-1">Accent / Highlight</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.colorAccent}
                        onChange={(e) => handleChange('colorAccent', e.target.value)}
                        className="w-12 h-10 p-1 bg-white border border-neutral-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.colorAccent}
                        onChange={(e) => handleChange('colorAccent', e.target.value)}
                        className="flex-1 border border-neutral-300 p-2 text-sm"
                        style={inputStyle}
                      />
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Phone Number (WhatsApp)</label>
              <input
                type="text"
                value={settings.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-aura-black mb-2">Currency Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => handleChange('currencySymbol', e.target.value)}
                className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                style={inputStyle}
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-neutral-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Social Media</h3>
            <button type="button" onClick={addSocialLink} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-aura-black hover:text-aura-gold">
              <Plus size={14} /> Add Platform
            </button>
          </div>
          
          <div className="space-y-4">
            {settings.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-1/3">
                  <select
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black"
                    style={inputStyle}
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Snapchat">Snapchat</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                    style={inputStyle}
                  />
                </div>
                <button type="button" onClick={() => removeSocialLink(index)} className="p-3 text-neutral-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4 flex items-center justify-between border-t border-neutral-100 mt-8">
            {successMsg && <span className="text-green-600 text-xs font-bold">{successMsg}</span>}
            <div className="flex-1"></div>
            <button type="submit" disabled={isProcessing} className="bg-aura-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-2 border border-aura-black hover:border-aura-gold hover:text-aura-gold disabled:opacity-50">
                {isProcessing ? <Loader size={16} className="animate-spin" /> : <Save size={16} />} Save Settings
            </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;