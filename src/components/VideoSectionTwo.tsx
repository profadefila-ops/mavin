import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Extracted video ID from: https://youtu.be/2ZTcvsdMR1c
const YOUTUBE_VIDEO_ID = '2ZTcvsdMR1c';

export const VideoSectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle entrance animation
      gsap.fromTo(
        videoContainerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
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

  // Construct the YouTube URL with autoplay, mute, loop, and hidden controls
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&playsinline=1&rel=0`;

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[80vh] bg-[#050505] overflow-hidden mt-12 sm:mt-24"
    >
      <div 
        ref={videoContainerRef}
        className="relative w-full h-full"
      >
        {/* YouTube Iframe Wrapper */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <iframe
            src={embedUrl}
            title="Mavin Experience Video 2"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-105"
            style={{ border: 'none' }}
          />
        </div>

        {/* Text Overlays */}
        <div className="absolute bottom-12 left-0 right-0 w-full z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            <div className="flex flex-col">
              <h2 
                className="font-bold font-jakarta text-white tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ fontSize: '18px' }}
              >
                Feel the Rhythm.
              </h2>
            </div>

            <div className="max-w-xs text-left md:text-right">
              <p 
                className="text-gray-100 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ fontSize: '18px' }}
              >
                Immerse yourself in the visual storytelling of Mavin. A journey through sound and culture.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};