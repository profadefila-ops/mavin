import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGO_URL = 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/Mavin-Logo.png';

const IMAGES = [
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/tt.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/e56d4465-25fc-44cb-a647-220c63897a26.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/chatgpt-1.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/2dce901e-23f6-4f99-947c-7553f0f9af87.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/80.png",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/627c799a-f4b5-4bb7-8c70-987af7997295.png",
];

export const HoverAccordionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth entrance animation for the section
      gsap.fromTo(
        [headingRef.current, accordionRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 bg-[#050505] overflow-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4">
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 px-4">
          <span className="text-[#e6e097] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            The Collection
          </span>
          {/* Reduced h2 font size */}
          <h2 className="text-3xl sm:text-5xl font-bold font-jakarta text-white tracking-tighter">
            MAVIN The future.
          </h2>
        </div>

        {/* The Accordion Container */}
        <div 
          ref={accordionRef}
          className="flex flex-col sm:flex-row w-full h-[60vh] sm:h-[70vh] gap-2 sm:gap-4 overflow-hidden"
        >
          {IMAGES.map((src, index) => (
            <div 
              key={index}
              className="relative group flex-1 hover:flex-[3] transition-all duration-700 ease-in-out rounded-md overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
              style={{ willChange: 'flex', transform: 'translateZ(0)' }}
            >
              {/* Image */}
              <img 
                src={src} 
                alt={`Artifact ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ transform: 'translateZ(0)' }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none" />

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <img 
                  src={LOGO_URL} 
                  alt="Mavin Logo" 
                  className="w-16 sm:w-24 h-auto object-contain" 
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
                  }}
                />
              </div>

              {/* Horizontal Text (Expanded) */}
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                <span className="text-[#e6e097] text-xs font-bold tracking-wider uppercase mb-2 block">
                  Collection 0{index + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-white">
                  Artifact Name
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};