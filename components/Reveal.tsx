import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Delay in ms
}

export const Reveal = ({ children, width = "100%", delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only animate once
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const transitionDelay = `${delay}ms`;

  return (
    <div ref={ref} style={{ width, position: 'relative' }}>
      <div 
        style={{ transitionDelay }}
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Reveal;