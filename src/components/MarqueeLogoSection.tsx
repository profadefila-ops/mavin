import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/16.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/12-scaled.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/11.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/ppl.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/ple.png",
];

export const MarqueeLogoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Infinite horizontal loop
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // 2. Fade in with Blur Entrance Animation
      gsap.fromTo(
        [titleRef.current, trackContainerRef.current],
        { 
          y: 30, 
          opacity: 0, 
          filter: 'blur(10px)' 
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.2, // Title fades in slightly before the logos
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%', // Triggers as soon as the section peeks into view
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      // Reduced padding top to pt-4 sm:pt-6
      className="relative w-full pt-4 sm:pt-6 pb-4 sm:pb-6 bg-[#050505] overflow-hidden flex flex-col items-center"
    >
      
      {/* Title */}
      <h3 
        ref={titleRef}
        className="text-[#e6e097] font-jakarta font-semibold tracking-wide uppercase mb-6 relative z-20"
        style={{ fontSize: '18px' }}
      >
        Our universe
      </h3>

      {/* Marquee Container */}
      <div 
        ref={trackContainerRef}
        className="relative w-full flex items-center overflow-hidden"
      >
        {/* Edge Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

        {/* The animated track */}
        <div 
          ref={marqueeRef} 
          className="flex w-max"
          style={{ willChange: 'transform' }}
        >
          {/* We duplicate the block to make the loop seamless */}
          {[1, 2].map((blockIndex) => (
            <div key={blockIndex} className="flex items-center">
              {LOGOS.map((src, idx) => (
                <div 
                  key={`${blockIndex}-${idx}`} 
                  className="flex items-center justify-center shrink-0 w-24 md:w-36 h-16 md:h-20 mx-4 md:mx-8 group relative"
                >
                  {/* Ambient Glow behind logo */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full pointer-events-none"
                    style={{ backgroundColor: '#e6e097' }}
                  />

                  {/* The Logo */}
                  <img
                    src={src}
                    alt={`Partner logo ${idx + 1}`}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 opacity-100 group-hover:opacity-100"
                    style={{
                      filter: 'brightness(0) invert(1) drop-shadow(0 0 6px rgba(230, 224, 151, 0.4)) drop-shadow(0 0 12px rgba(230, 224, 151, 0.2))',
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};