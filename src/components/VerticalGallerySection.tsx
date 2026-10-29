
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGES = [
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/ab677762000056b8041dcd8202a5c3601c5a676a.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Jvxn.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Mbryo.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/milar.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Sevn5.jpg",
  "https://lightsalmon-stinkbug-756615.hostingersite.com/wp-content/uploads/2026/10/Prestige.jpg",
];

const COLUMNS = [
  { images: BASE_IMAGES, duration: 30, direction: "up", aspect: "aspect-[4/5]" },
  { images: [...BASE_IMAGES].reverse(), duration: 35, direction: "down", aspect: "aspect-[3/4]" },
  {
    images: [...BASE_IMAGES.slice(2), ...BASE_IMAGES.slice(0, 2)],
    duration: 40,
    direction: "up",
    aspect: "aspect-[4/5]",
  },
] as const;

export const VerticalGallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const animations: gsap.core.Tween[] = [];

      trackRefs.current.forEach((track, index) => {
        if (!track) return;

        const config = COLUMNS[index];
        const firstSet = track.querySelector<HTMLElement>(
          "[data-image-set]"
        );

        if (!firstSet) return;

        // Each set is exactly half of the track.
        // Moving -50% produces a seamless loop.
        const isDown = config.direction === "down";

        const tween = gsap.fromTo(
          track,
          { yPercent: isDown ? -50 : 0 },
          {
            yPercent: isDown ? 0 : -50,
            duration: config.duration,
            ease: "none",
            repeat: -1,
            paused: true,
          }
        );

        animations.push(tween);
      });

      // Only animate when the section is visible.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => animations.forEach((a) => a.play()),
        onEnterBack: () => animations.forEach((a) => a.play()),
        onLeave: () => animations.forEach((a) => a.pause()),
        onLeaveBack: () => animations.forEach((a) => a.pause()),
      });

      // Entrance animation runs only once.
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

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

      {/* Gallery grid */}
      <div className="w-full max-w-[1400px] h-full mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-hidden">
        {COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`relative h-full overflow-hidden ${
              columnIndex > 0 ? "hidden sm:block" : ""
            }`}
          >
            <div
              ref={(el) => {
                trackRefs.current[columnIndex] = el;
              }}
              className="absolute top-0 left-0 w-full flex flex-col"
            >
              {/* Two identical sets for infinite scrolling */}
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  data-image-set
                  aria-hidden={setIndex === 1}
                  className="flex flex-col gap-4 sm:gap-6 lg:gap-8 pb-4 sm:pb-6 lg:pb-8"
                >
                  {column.images.map((src, imageIndex) => (
                    <div
                      key={`${setIndex}-${imageIndex}`}
                      className={`relative w-full ${column.aspect} rounded-xl overflow-hidden border border-white/5`}
                    >
                      <img
                        src={src}
                        alt={setIndex === 0 ? "Gallery" : ""}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
