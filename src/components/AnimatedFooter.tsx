import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: 'Instagram', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'TikTok', url: '#' },
  { name: 'YouTube', url: '#' },
  { name: 'Spotify', url: '#' },
  { name: 'Apple Music', url: '#' },
];

const FOOTER_LINKS = [
  { name: 'Music', url: '#' },
  { name: 'Artists', url: '#' },
  { name: 'Producers', url: '#' },
  { name: 'Awards', url: '#' },
  { name: 'Contact', url: '#' },
];

export const AnimatedFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Infinite Marquee for the massive text
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30, // Slow, luxurious scroll
        repeat: -1,
        ease: 'none',
      });

      // 2. Staggered Fade In for the footer columns
      gsap.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#050505] overflow-hidden pt-16 pb-12 flex flex-col items-center border-t border-white/10"
    >
      {/* Animated glowing background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[#e6e097] blur-[150px] opacity-10 pointer-events-none rounded-full" />

      {/* Massive Marquee Glowing Text */}
      <div className="w-full flex overflow-hidden relative z-10 mb-16">
        <div ref={marqueeRef} className="flex w-max">
          {/* Duplicated block for infinite looping */}
          {[1, 2].map((block) => (
            <div key={block} className="flex items-center gap-8 px-4 whitespace-nowrap">
              <h2 
                className="text-[20vw] sm:text-[18vw] font-black tracking-tighter text-white uppercase font-jakarta leading-none select-none cursor-pointer transition-all duration-700 hover:text-[#e6e097] hover:drop-shadow-[0_0_80px_rgba(230,224,151,0.8)]"
              >
                Mavin
              </h2>
              <span className="text-[10vw] text-[#e6e097] opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10 flex flex-col items-center">
        
        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

        {/* Footer Content Grid */}
        <div 
          ref={contentRef}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-left"
        >
          
                  {/* Column 1: Brand Logo & Text */}
          <div className="flex flex-col gap-4">
            <img 
              src="https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/Mavin-Logo.png" 
              alt="Mavin Records Logo" 
              className="w-32 h-auto object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The future of African music. We cultivate creativity, nurture talent, and push the boundaries of sound.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Explore</h3>
            {FOOTER_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                className="text-gray-400 hover:text-[#e6e097] text-sm font-medium transition-colors duration-300 w-fit"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Socials</h3>
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.url}
                className="group flex items-center justify-between text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300 w-full max-w-[150px]"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-[#e6e097]" />
              </a>
            ))}
          </div>

          {/* Column 4: Legal/Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Stay Updated</h3>
            <div className="relative w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white text-sm focus:outline-none focus:border-[#e6e097]/50 transition-colors placeholder-gray-500"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#e6e097] text-black text-xs font-bold uppercase px-4 rounded hover:bg-white transition-colors">
                Join
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              By subscribing, you agree to our Terms & Privacy Policy.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-24 pt-8 border-t border-white/10 gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Mavin Records. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};