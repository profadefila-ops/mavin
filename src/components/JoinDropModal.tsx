import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Box, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

interface JoinDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBox?: string;
}

export const JoinDropModal: React.FC<JoinDropModalProps> = ({
  isOpen,
  onClose,
  initialBox = 'The Family Block',
}) => {
  const [selectedBox, setSelectedBox] = useState<string>(initialBox);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(482);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    soundManager.playBoing(0.25);
    const generatedNum = Math.floor(Math.random() * 300) + 350;
    setWaitlistNumber(generatedNum);
    setSubmitted(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#ffffff', '#f59e0b', '#ec4899', '#3b82f6'],
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] text-white rounded-3xl max-w-lg w-full p-7 sm:p-8 relative shadow-2xl overflow-hidden border border-white/15">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tuesday Harvest Drop</span>
            </div>

            <h3 className="font-manrope text-2xl sm:text-3xl font-semibold text-white mb-2">
              Join the next drop.
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Boxes are limited to 500 crates per weekly cycle to guarantee brix perfection. Reserve your allocation below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Box Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Choose Box Volume
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['The Studio Cube', 'The Family Block', "The Chef's Geometry"].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => {
                        setSelectedBox(b);
                        soundManager.playBoing(0.08);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        selectedBox === b
                          ? 'border-white bg-white text-black font-bold shadow-md'
                          : 'border-white/15 bg-white/5 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {b.replace('The ', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kenji Sato"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="94107"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Delivery Frequency
                </label>
                <div className="flex gap-4 text-xs font-medium text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={frequency === 'weekly'}
                      onChange={() => setFrequency('weekly')}
                      className="accent-white"
                    />
                    <span>Weekly (Recommended)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="freq"
                      checked={frequency === 'biweekly'}
                      onChange={() => setFrequency('biweekly')}
                      className="accent-white"
                    />
                    <span>Bi-weekly</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-white text-black font-semibold text-sm tracking-tight hover:bg-gray-200 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Confirm Reservation for Tuesday
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                No credit card charged today. You’ll receive an SMS confirmation 24h prior to box delivery.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1 block">
              Reservation Confirmed
            </span>

            <h3 className="font-manrope text-3xl font-bold text-white mb-2">
              You are #{waitlistNumber} in line!
            </h3>

            <p className="text-sm text-gray-300 max-w-sm mx-auto mb-6">
              Thank you, <strong>{name || 'friend'}</strong>. Your allocation for <strong>{selectedBox}</strong> is locked in for next Tuesday&apos;s morning harvest drop.
            </p>

            <div className="bg-black/60 rounded-2xl p-4 text-xs text-gray-300 max-w-sm mx-auto mb-8 space-y-2 border border-white/10 text-left">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Box className="w-3.5 h-3.5" /> Box Choice:
                </span>
                <span className="font-semibold text-white">{selectedBox}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3.5 h-3.5" /> Next Harvest:
                </span>
                <span className="font-semibold text-emerald-400">Tuesday, 6:00 AM - 9:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Notice sent to:</span>
                <span className="font-mono text-[11px] text-gray-200">{email}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Back to site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
