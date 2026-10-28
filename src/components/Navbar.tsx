import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface NavbarProps {
  onJoinClick: () => void;
  onNavigate: (sectionId: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const NAV_ITEMS = [
  { label: 'Tour', id: 'Tour' },
  { label: 'Music', id: 'music' },
  { label: 'Artists', id: 'artists' },
  { label: 'Producers', id: 'producers' },
  { label: 'Awards', id: 'awards' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onJoinClick,
  onNavigate,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-30 w-full bg-[#050505]/85 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center cursor-pointer focus:outline-none group"
          aria-label="Mavin Home"
        >
          <img
            src="https://pub-00276c480a6b455b8d30567940f580c8.r2.dev/Mavin-Logo.png"
            alt="Mavin Logo"
            className="h-8 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-[14px] text-gray-400 hover:text-white tracking-[-0.03em] font-medium transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle Sounds"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Join the Drop Button */}
          <button
            onClick={() => {
              soundManager.playBoing(0.15);
              onJoinClick();
            }}
            className="bg-white text-black hover:bg-gray-200 text-[14px] font-semibold tracking-[-0.03em] px-4 py-2 rounded-[10px] shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
          >
            Join the label
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0d0d]/98 backdrop-blur-md px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="block w-full text-left py-2 text-sm text-gray-300 hover:text-white font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};