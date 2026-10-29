import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGO_URL = 'https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/Mavin-Logo.png';
const BUTTON_LOGO = 'https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/53.png';

export const OverlapGallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateBlock = (blockRef: React.RefObject<HTMLDivElement | null>) => {
        if (!blockRef.current) return;
        
        const images = blockRef.current.querySelectorAll('.gallery-image-wrapper');
        
        gsap.fromTo(
          images,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8, // Faster, snappier animation
            stagger: 0.1, // Stagger is cheaper than simultaneous
            ease: 'power2.out',
            scrollTrigger: {
              trigger: blockRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none', // Plays once and stops (no reverse)
            },
          }
        );
      };

      animateBlock(block1Ref);
      animateBlock(block2Ref);
      animateBlock(block3Ref);

      // The Constant Jump Animation for the Button
      // Using a simpler scale-based animation which is hardware accelerated
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          y: -6, // Smaller jump distance
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut', // Smoother than power1
          repeatDelay: 0.3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Reusable Image Card with 3-Piece Split Effect
  const SplitImageCard = ({
    baseSrc,
    hoverSrc,
    tag,
    title,
    align = 'left',
  }: {
    baseSrc: string;
    hoverSrc: string;
    tag: string;
    title: string;
    align?: 'left' | 'right';
  }) => {
    return (
      <div className="relative w-full h-full group overflow-hidden rounded-2xl bg-black">
        
        {/* HOVER IMAGE PIECES */}
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:-translate-x-[4%] opacity-0 group-hover:opacity-100 z-0" style={{ clipPath: 'polygon(0 0, 33.33% 0, 33.33% 100%, 0 100%)' }}>
          <img src={hoverSrc} alt="Hover Left" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 z-0" style={{ clipPath: 'polygon(33.33% 0, 66.66% 0, 66.66% 100%, 33.33% 100%)' }}>
          <img src={hoverSrc} alt="Hover Middle" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:translate-x-[4%] opacity-0 group-hover:opacity-100 z-0" style={{ clipPath: 'polygon(66.66% 0, 100% 0, 100% 100%, 66.66% 100%)' }}>
          <img src={hoverSrc} alt="Hover Right" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* BASE IMAGE PIECES */}
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:-translate-x-[15%] group-hover:opacity-0 z-10" style={{ clipPath: 'polygon(0 0, 33.33% 0, 33.33% 100%, 0 100%)' }}>
          <img src={baseSrc} alt="Base Left" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:opacity-0 z-10" style={{ clipPath: 'polygon(33.33% 0, 66.66% 0, 66.66% 100%, 33.33% 100%)' }}>
          <img src={baseSrc} alt="Base Middle" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:translate-x-[15%] group-hover:opacity-0 z-10" style={{ clipPath: 'polygon(66.66% 0, 100% 0, 100% 100%, 66.66% 100%)' }}>
          <img src={baseSrc} alt="Base Right" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* UI OVERLAYS */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <img
            src={LOGO_URL}
            alt="Mavin Logo Overlay"
            className="w-16 sm:w-24 h-auto object-contain opacity-0 scale-50 -rotate-12 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
        
        <div className={`absolute bottom-6 ${align === 'left' ? 'left-6' : 'right-6 text-right'} text-white z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-0`}>
          <span className="text-[#e6e097] text-xs font-bold tracking-wider uppercase mb-1 block">{tag}</span>
          <h3 className="text-white" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '18px', fontWeight: 600 }}>
            {title}
          </h3>
        </div>

      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#050505] flex flex-col items-center justify-center border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden pt-16 sm:pt-24 pb-16"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 space-y-24 md:space-y-32">
        
        {/* =========================================
            FIRST GALLERY BLOCK
            ========================================= */}
        <div ref={block1Ref} className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          
          <div className="gallery-image-wrapper relative w-full md:w-[48%] z-10 md:-mr-16 lg:-mr-24 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl -rotate-2 group-hover:-rotate-1 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/chatgpt.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/chatgpt-1.png"
                tag="Artist Spotlight"
                title="REMA aka The Future"
                align="left"
              />
            </div>
          </div>

          <div className="gallery-image-wrapper relative w-full md:w-[58%] z-20 mt-8 md:mt-24 md:-ml-16 lg:-ml-24 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl rotate-3 group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/chatgpt-2.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/627c799a-f4b5-4bb7-8c70-987af7997295.png"
                tag="Artist Spotlight"
                title="Stargirl"
                align="right"
              />
            </div>
          </div>

        </div>

        {/* =========================================
            SECOND GALLERY BLOCK
            ========================================= */}
        <div ref={block2Ref} className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:pl-12 lg:pl-24">
          
          <div className="gallery-image-wrapper relative w-full md:w-[45%] z-10 md:mr-16 lg:mr-24 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl rotate-3 group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/be57262e-372d-458e-abe2-7f37b0666b66.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/tt.png"
                tag="Artist Spotlight"
                title="Bayanni"
                align="left"
              />
            </div>
          </div>

          <div className="gallery-image-wrapper relative w-full md:w-[40%] z-20 mt-8 md:mt-32 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl -rotate-6 group-hover:-rotate-2 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/af096112-b36a-4fdb-a301-defef25ad136.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/e56d4465-25fc-44cb-a647-220c63897a26.png"
                tag="Artist Spotlight"
                title="Boy Spyce"
                align="right"
              />
            </div>
          </div>

        </div>

        {/* =========================================
            THIRD GALLERY BLOCK (Asymmetrical Overlap)
            ========================================= */}
        <div ref={block3Ref} className="relative w-full flex flex-col md:flex-row items-center justify-center min-h-[400px] md:min-h-[500px]">
          
          <div className="gallery-image-wrapper relative md:absolute left-0 md:w-[55%] z-20 mt-8 md:mt-24 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.9)] -rotate-6 group-hover:-rotate-2 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/he.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/2dce901e-23f6-4f99-947c-7553f0f9af87.png"
                tag="Artist Spotlight"
                title="CupidSZN"
                align="left"
              />
            </div>
          </div>

          <div className="gallery-image-wrapper relative md:absolute right-0 md:w-[45%] z-10 group transition-transform duration-500 hover:z-30">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl rotate-2 group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-500">
              <SplitImageCard 
                baseSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/88.png"
                hoverSrc="https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/80.png"
                tag="Artist Spotlight"
                title="Johnny Drille"
                align="right"
              />
            </div>
          </div>

        </div>

        {/* =========================================
            UPDATED JUMPING VIEW MORE BUTTON
            ========================================= */}
        <div className="relative w-full flex justify-center pt-8 sm:pt-12 pb-12 z-30">
          
          {/* Outer wrapper to hold the size */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => console.log('View More clicked!')}
              // Reduced width, padding, and set border radius to 15px
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0a0a0a] border border-[#e6e097]/40 shadow-[0_0_20px_rgba(230,224,151,0.15)] group transition-all duration-300 hover:border-[#e6e097] hover:shadow-[0_0_30px_rgba(230,224,151,0.4)]"
              style={{ borderRadius: '15px' }}
            >
              
              {/* Single Logo */}
              <img 
                src={BUTTON_LOGO} 
                alt="Icon" 
                className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
              />

              {/* Text */}
              <span 
                className="text-white font-jakarta tracking-normal font-semibold group-hover:text-[#e6e097] transition-colors"
                style={{ fontSize: '15px' }}
              >
                View More
              </span>

            </button>
          </div>

        </div>

      </div>
    </section>
  );
};