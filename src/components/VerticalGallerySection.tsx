import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGES = [
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/ab677762000056b8041dcd8202a5c3601c5a676a.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Jvxn.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Mbryo.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/milar.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Sevn5.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Prestige.jpg",
];

const COLUMN_1 = [...BASE_IMAGES, ...BASE_IMAGES];
const COLUMN_2 = [...BASE_IMAGES].reverse().concat([...BASE_IMAGES].reverse());
const COLUMN_3 = [...BASE_IMAGES.slice(2), ...BASE_IMAGES.slice(0, 2), ...BASE_IMAGES.slice(2), ...BASE_IMAGES.slice(0, 2)];

export const VerticalGallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Column 1 moves UP
      gsap.to(col1Ref.current, {
        yPercent: -50,
        ease: 'none',
        duration: 30,
        repeat: -1,
      });

      // 2. Column 2 moves DOWN
      gsap.fromTo(
        col2Ref.current,
        { yPercent: -50 },
        {
          yPercent: 0,
          ease: 'none',
          duration: 35,
          repeat: -1,
        }
      );

      // 3. Column 3 moves UP (slower)
      gsap.to(col3Ref.current, {
        yPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1,
      });

      // 4. Smooth Entrance Animation for the section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
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
      className="relative w-full h-[150vh] bg-[#050505] overflow-hidden flex items-center justify-center mt-12 sm:mt-24"
    >
      {/* Gradient masks */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-64 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-64 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Grid Container */}
      <div className="w-full max-w-[1400px] h-full mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-hidden">
        
        {/* Column 1 */}
        <div className="relative h-full overflow-hidden">
          <div 
            ref={col1Ref} 
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 absolute top-0 left-0 w-full"
            // Force GPU Acceleration for buttery smooth animation
            style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {COLUMN_1.map((src, i) => (
              <div key={`col1-${i}`} className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/5 shadow-2xl group">
                <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="relative h-full overflow-hidden hidden sm:block">
          <div 
            ref={col2Ref} 
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 absolute top-0 left-0 w-full"
            style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {COLUMN_2.map((src, i) => (
              <div key={`col2-${i}`} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/5 shadow-2xl group">
                <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="relative h-full overflow-hidden hidden sm:block">
          <div 
            ref={col3Ref} 
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 absolute top-0 left-0 w-full"
            style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {COLUMN_3.map((src, i) => (
              <div key={`col3-${i}`} className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/5 shadow-2xl group">
                <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};