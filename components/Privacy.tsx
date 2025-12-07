import React from 'react';
import SEOHead from './SEOHead';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      <SEOHead title="Privacy Policy" description="Privacy Policy for Hair Aura." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-aura-black">Privacy Policy</h1>
        
        <div className="prose prose-sm md:prose-base text-neutral-600 space-y-6">
          <p>At Hair Aura, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">1. Information We Collect</h3>
          <p>We collect information you provide directly to us when you make an inquiry or purchase via WhatsApp, such as your name, phone number, and delivery address.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">2. How We Use Your Information</h3>
          <p>We use your information to process your orders, communicate with you about your purchase, and arrange for delivery. We may also use your contact details to send you exclusive offers if you opt-in.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">3. Data Security</h3>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">4. Third Parties</h3>
          <p>We do not sell or trade your personal information to third parties. We may share necessary details with delivery partners solely for the purpose of fulfilling your order.</p>
          
          <h3 className="text-aura-black font-bold text-lg uppercase tracking-wide">5. Contact Us</h3>
          <p>If you have any questions about this privacy policy, please contact us via WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;