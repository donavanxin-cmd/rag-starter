import React from 'react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-[#787b86] hover:text-white flex items-center justify-center border border-[#2a2e39] transition"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Hero Visual Banner with Earth and Orbit */}
        <div className="relative h-64 bg-gradient-to-b from-[#020510] via-[#091124] to-[#131722] flex items-center justify-center overflow-hidden p-6 border-b border-[#1e222d]">
          {/* Stars & Orbit Elements */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="absolute -bottom-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-3 py-1 rounded-full mb-3">
              <span>Polaris Dawn Spaceflight</span>
              <span>•</span>
              <span>Apogee 1,400 km</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              TradingView in Orbit
            </h2>
            <p className="text-xs text-[#868993] max-w-md mt-1">
              With mission pilot Scott "Kidd" Poteet reaching the highest Earth orbit flown by humans since the Apollo program.
            </p>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-8 space-y-4 text-xs text-[#d1d4dc] leading-relaxed max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#0a0d14] rounded-xl border border-[#1e222d]">
            <div>
              <div className="text-[11px] text-[#787b86]">Astronaut</div>
              <div className="text-sm font-bold text-white mt-0.5">Scott "Kidd" Poteet</div>
            </div>
            <div>
              <div className="text-[11px] text-[#787b86]">Mission Call</div>
              <div className="text-sm font-bold text-white mt-0.5">Polaris Dawn</div>
            </div>
            <div>
              <div className="text-[11px] text-[#787b86]">Altitude Record</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">1,400.7 km</div>
            </div>
          </div>

          <p>
            When former USAF pilot and astronaut Scott "Kidd" Poteet climbed into Dragon capsule for the historic Polaris Dawn mission, his dedication to discipline, precision data, and real-time execution came along for the ride.
          </p>

          <blockquote className="border-l-2 border-[#2962ff] pl-3 py-1 italic text-zinc-300">
            "Whether you're flying high-performance aircraft at Mach 2 or navigating financial markets during high volatility, situational awareness and crisp visual charts are what keep you ahead."
          </blockquote>

          <p>
            TradingView was built on the core belief that anyone, anywhere — even 1,400 kilometers above the globe — should have access to the highest-fidelity market visualization, technical analysis tools, and global collaborative intelligence.
          </p>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="bg-[#2962ff] hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg text-xs transition"
            >
              Explore Supercharts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
