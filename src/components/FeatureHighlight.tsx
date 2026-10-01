import React from 'react';

interface FeatureHighlightProps {
  onExploreFeatures: () => void;
  onOpenPineDocs: () => void;
}

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  onExploreFeatures,
  onOpenPineDocs,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14" data-purpose="supercharts-showcase" id="products">
      <div className="bg-gradient-to-b from-[#131722] to-black border border-[#1e222d] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-xl z-10 relative">
          <span className="text-xs font-bold text-[#2962ff] uppercase tracking-widest">
            Next-Gen Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Supercharged Supercharts
          </h2>
          <p className="text-sm text-[#787b86] leading-relaxed mb-6">
            Equipped with 100+ pre-built technical indicators, Pine Script® customization, candlestick pattern recognition, and multi-asset overlay for every level of analysis.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onExploreFeatures}
              className="bg-[#2962ff] hover:bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Explore all features
            </button>
            <button
              onClick={onOpenPineDocs}
              className="bg-[#1e222d] hover:bg-[#2a2e39] text-white font-semibold text-xs px-5 py-2.5 rounded-full transition border border-[#2a2e39] cursor-pointer"
            >
              Pine Script® Docs
            </button>
          </div>
        </div>

        {/* Decorative Backdrop Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <svg className="w-full h-full text-blue-500" viewBox="0 0 400 300">
            <polygon
              fill="currentColor"
              fillOpacity="0.2"
              points="0,300 100,220 200,240 300,100 400,60 400,300"
            />
            <polyline
              fill="none"
              points="0,300 100,220 200,240 300,100 400,60"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
