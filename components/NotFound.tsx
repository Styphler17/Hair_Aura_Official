
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SEOHead from './SEOHead';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="text-center max-w-md">
        <h1 className="font-serif text-9xl font-bold text-neutral-100 mb-4">404</h1>
        <h2 className="font-serif text-3xl font-bold text-aura-black mb-4">Page Not Found</h2>
        <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a 
          href="/"
          className="inline-flex items-center gap-2 bg-aura-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft size={16} /> Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
