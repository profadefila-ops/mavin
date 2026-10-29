import React, { useRef, useState } from 'react';
import { FruitPhysicsCanvas, FruitPhysicsHandle } from './FruitPhysicsCanvas';
import { Plus, RotateCcw, Sparkles, Hand } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface HeroSectionProps {
  onJoinClick: () => void;
  isMuted: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onJoinClick, isMuted }) => {
  const physicsRef = useRef<FruitPhysicsHandle>(null);
  const [fruitCount, setFruitCount] = useState<number>(16);
  const [antiGravity, setAntiGravity] = useState<boolean>(false);
  const [hintVisible, setHintVisible] = useState(true);

  const handleSpawn = () => {
    physicsRef.current?.spawnFruit();
    soundManager.playBoing(0.12);
  };

  const handleReset = () => {
    physicsRef.current?.resetDrop();
    soundManager.playBoing(0.2);
  };

  const handleToggleGravity = () => {
    if (physicsRef.current) {
      const isAnti = physicsRef.current.toggleGravity();
      setAntiGravity(isAnti);
      soundManager.playBoing(0.18);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#050505] text-white select-none"
    >
      {/* 2D Physics Canvas Background & Falling TV Boxes */}
      <FruitPhysicsCanvas
        ref={physicsRef}
        isMuted={isMuted}
        onCountChange={(count) => {
          setFruitCount(count);
          if (count > 16) {
            setHintVisible(false);
          }
        }}
      />

      {/* Hero Headline Content (pointer-events-none so users can click through to physics canvas) */}
      <div className="relative z-10 w-full pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 text-center pointer-events-none">
        <div className="max-w-5xl mx-auto flex flex-col items-center relative">
          
          {/* Subtle Ambient Radial Glow in #fdc44e behind MAVIN */}
          <div className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(253,196,78,0.22)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10" />

          {/* Animated Glowing MAVIN Text in #fdc44e — bolder, tighter tracking */}
          <div className="relative my-2 sm:my-4">
            <h1
              className="font-jakarta font-black tracking-[-0.04em] sm:tracking-[-0.05em] text-7xl sm:text-9xl md:text-[140px] lg:text-[200px] leading-[0.85] uppercase text-[#fdc44e] animate-mavin-glow select-none transition-transform duration-300"
              style={{
                color: '#fdc44e',
                fontWeight: 900,
              }}
            >
              MAVIN
            </h1>
          </div>

          {/* Call to action & Interactive hint */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
            <button
              onClick={() => {
                soundManager.playBoing(0.18);
                onJoinClick();
              }}
              className="bg-[#fdc44e] text-black hover:bg-[#ffe082] font-jakarta font-extrabold text-[15px] tracking-[-0.02em] px-6 py-2.5 rounded-[12px] shadow-[0_0_20px_rgba(253,196,78,0.35)] hover:shadow-[0_0_30px_rgba(253,196,78,0.55)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              Our Music
            </button>
            <button
              onClick={handleSpawn}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white border border-white/15 font-jakarta font-semibold text-[14px] tracking-[-0.02em] px-4 py-2.5 rounded-[12px] shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#fdc44e] transition-transform group-hover:rotate-90" />
              <span>Shop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Control Bar */}
      <div className="relative z-20 w-full pb-6 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-none">
        
        {/* Interaction hint on left */}
        <div className="pointer-events-auto">
          {hintVisible ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-lg text-xs text-gray-300 font-jakarta">
              <Hand className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>Drag &amp; toss any TV box • Click anywhere to drop</span>
            </div>
          ) : (
            <div className="text-xs text-gray-400 font-jakarta font-medium">
              Click anywhere to spawn • Drag to fling
            </div>
          )}
        </div>

        {/* Physics Dock on right */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#121212]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg">
          {/* Box count badge */}
          <span className="px-2.5 py-1 text-xs font-jakarta font-bold text-white bg-white/10 rounded-lg">
            {fruitCount} boxes
          </span>

          {/* Reset drop */}
          <button
            onClick={handleReset}
            title="Reset stack / Re-drop TV boxes"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Reset Falling TV Boxes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Anti-gravity toggle */}
          <button
            onClick={handleToggleGravity}
            title={antiGravity ? 'Restore gravity' : 'Zero gravity float'}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              antiGravity
                ? 'bg-purple-900/60 text-purple-300 font-medium shadow-sm border border-purple-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Anti-Gravity"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};