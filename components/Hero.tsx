import React from 'react';

// Hero is now used inside Home.tsx purely for display. 
// Navigation logic is passed down or handled by parent composition.
const Hero: React.FC = () => {
  return (
    <div className="hidden">
      {/* 
        NOTE: The content of Hero has been moved directly into Home.tsx to allow better prop drilling 
        for the 'Shop Now' button without making Hero complicated. 
        This file is kept blank or can be removed in future refactors. 
        For now, the logic resides in Home.tsx. 
      */}
    </div>
  );
};

export default Hero;