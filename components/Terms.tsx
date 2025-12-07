import React from 'react';
import SEOHead from './SEOHead';

const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      <SEOHead title="Terms & Conditions" description="Terms and conditions for Hair Aura." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-aura-black">Terms & Conditions</h1>
        
        <div className="prose prose-sm md:prose-base text-neutral-600 space-y-6">
          <p>Welcome to Hair Aura. By using our website and purchasing our products, you agree to the following terms and conditions.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">1. Product Quality</h3>
          <p>We guarantee that all our hair extensions and wigs are 100% virgin human hair. Due to the nature of raw hair, textures and colors may vary slightly from bundle to bundle.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">2. Orders & Payment</h3>
          <p>All orders are processed via WhatsApp to ensure availability. Payment must be confirmed before delivery or pickup is scheduled. Prices are subject to change without notice.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">3. Delivery</h3>
          <p>We deliver within Accra and to other regions in Ghana. Delivery fees apply and vary based on location. Pickup options are available at our Odumase location.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">4. Returns & Exchanges</h3>
          <p>Due to hygiene reasons, we do not accept returns on used hair. Exchanges are only permitted within 24 hours of receipt if the product is in its original, unaltered condition (tags attached, lace uncut).</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">5. Custom Orders</h3>
          <p>Custom wig orders require a deposit. Processing times for custom units vary between 3-7 business days.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;