import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onOpenSpaceStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStarted,
  onOpenSpaceStory,
}) => {
  return (
    <section
      className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden flex flex-col items-center justify-center text-center px-4"
      data-purpose="hero-main"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Billboard Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Where the world does markets
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#868993] max-w-2xl font-normal leading-relaxed mb-10">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* Slanted / Beveled Call to Action */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onGetStarted}
            className="tv-hero-btn bg-white text-black font-bold text-[15px] sm:text-base px-8 py-3.5 rounded-lg shadow-xl cursor-pointer"
          >
            Get started for free
          </button>
          <span className="text-xs text-[#6a6d78] font-medium tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>

        {/* Astronaut Space Mission Pill Badge */}
        <div className="mt-20">
          <button
            onClick={onOpenSpaceStory}
            className="inline-flex items-center space-x-3 bg-[#131722]/80 hover:bg-[#1e222d] border border-[#2a2e39] py-2 px-4 rounded-full transition-all group backdrop-blur cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-neutral-800 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full text-zinc-400 p-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left text-xs">
              <div className="text-white font-medium group-hover:text-blue-400 transition flex items-center gap-1">
                <span>See our space story</span>
                <span className="text-gray-400">›</span>
              </div>
              <div className="text-[#787b86] text-[11px]">
                With astronaut Scott "Kidd" Poteet
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
