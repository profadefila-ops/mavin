import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OverlapGallerySection } from './components/OverlapGallerySection';
import { MarqueeLogoSection } from './components/MarqueeLogoSection';
import { VideoSection } from './components/VideoSection'; // <-- Import
import { VerticalGallerySection } from './components/VerticalGallerySection'; 
import { VideoSectionTwo } from './components/VideoSectionTwo'; 
import { HoverAccordionSection } from './components/HoverAccordionSection'; // <-- Import
import { JoinDropModal } from './components/JoinDropModal';
import { AnimatedFooter } from './components/AnimatedFooter'; // <-- Import
import { soundManager } from './utils/sound';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedBox, setPreselectedBox] = useState('The Family Block');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleToggleSound = useCallback(() => {
    const isNowOn = soundManager.toggle();
    setSoundEnabled(isNowOn);
  }, []);

  const handleOpenJoin = useCallback((boxName?: string) => {
    if (boxName) {
      setPreselectedBox(boxName);
    }
    setModalOpen(true);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black flex flex-col font-sans">
      {/* Top Sticky Navigation */}
      <Navbar
        onJoinClick={() => handleOpenJoin()}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 
        The Hero Section is wrapped in a sticky container. 
        As you scroll, it stays pinned to the top of the screen.
      */}
      <div className="sticky top-0 w-full h-[100dvh] z-0 overflow-hidden">
        <HeroSection
          onJoinClick={() => handleOpenJoin()}
          isMuted={!soundEnabled}
        />
      </div>

      {/* 
        The rest of the page sits in a relative container with a higher z-index.
        This makes it slide smoothly OVER the pinned Hero section.
      */}
      <div className="relative z-10 w-full bg-[#050505]">
        <OverlapGallerySection />

         {/* NEW MARQUEE SECTION */}
        <MarqueeLogoSection />

        <VideoSection />
        
        <VerticalGallerySection /> {/* <-- New Section */}

        <VideoSectionTwo />
                <HoverAccordionSection />



               <AnimatedFooter />

      </div>

      {/* Waitlist Drop Modal with Confetti */}
      <JoinDropModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBox={preselectedBox}
      />
    </div>
  );
}