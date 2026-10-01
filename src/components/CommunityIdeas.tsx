import React, { useState } from 'react';
import { CommunityIdea } from '../types';

interface CommunityIdeasProps {
  ideas: CommunityIdea[];
  onToggleLike: (ideaId: string) => void;
  onOpenNewIdeaModal: () => void;
  onSelectIdea: (idea: CommunityIdea) => void;
}

export const CommunityIdeas: React.FC<CommunityIdeasProps> = ({
  ideas,
  onToggleLike,
  onOpenNewIdeaModal,
  onSelectIdea,
}) => {
  const [activeTab, setActiveTab] = useState<'picks' | 'popular' | 'stocks' | 'crypto'>('picks');

  const filteredIdeas = ideas.filter((idea) => {
    if (activeTab === 'picks') return true; // Show all or picks
    return idea.category === activeTab;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" data-purpose="community-ideas" id="community">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#1e222d] gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Community ideas</h2>
            <button
              onClick={onOpenNewIdeaModal}
              className="text-xs bg-[#2962ff]/10 hover:bg-[#2962ff]/20 text-[#2962ff] border border-[#2962ff]/30 font-semibold px-2.5 py-1 rounded-md transition"
            >
              + Publish setup
            </button>
          </div>
          <p className="text-xs text-[#787b86] mt-1">
            Trading perspectives, market setups, and forecasts from pro users
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 bg-[#131722] p-1 rounded-lg border border-[#1e222d]">
          <button
            onClick={() => setActiveTab('picks')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition cursor-pointer ${
              activeTab === 'picks'
                ? 'bg-[#2a2e39] text-white'
                : 'text-[#787b86] hover:text-white'
            }`}
            type="button"
          >
            Editors' picks
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition cursor-pointer ${
              activeTab === 'popular'
                ? 'bg-[#2a2e39] text-white'
                : 'text-[#787b86] hover:text-white'
            }`}
            type="button"
          >
            Popular
          </button>
          <button
            onClick={() => setActiveTab('stocks')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition cursor-pointer ${
              activeTab === 'stocks'
                ? 'bg-[#2a2e39] text-white'
                : 'text-[#787b86] hover:text-white'
            }`}
            type="button"
          >
            Stocks
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition cursor-pointer ${
              activeTab === 'crypto'
                ? 'bg-[#2a2e39] text-white'
                : 'text-[#787b86] hover:text-white'
            }`}
            type="button"
          >
            Crypto
          </button>
        </div>
      </div>

      {/* Trade Ideas Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.slice(0, 3).map((idea) => {
          return (
            <article
              key={idea.id}
              className="bg-[#131722] border border-[#1e222d] hover:border-[#2a2e39] rounded-xl overflow-hidden flex flex-col transition group cursor-pointer"
            >
              {/* Mock Financial Chart Canvas Container */}
              <div
                onClick={() => onSelectIdea(idea)}
                className="h-44 bg-[#0a0d14] relative border-b border-[#1e222d] flex items-center justify-center p-3 overflow-hidden"
              >
                <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                  <span className="text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded border border-[#2a2e39]">
                    {idea.exchange}:{idea.symbol}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                      idea.direction === 'Long'
                        ? 'text-[#089981] bg-[#089981]/10 border-[#089981]/30'
                        : 'text-[#f23645] bg-[#f23645]/10 border-[#f23645]/30'
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>

                {/* Stylized Candlestick or Curve Graphic based on chartType */}
                {idea.chartType === 'breakout' && (
                  <svg className="w-full h-24" viewBox="0 0 200 80">
                    <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="20" y2="20" />
                    <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="50" y2="50" />
                    {/* Descending trendline being broken */}
                    <line stroke="#787b86" strokeDasharray="3 3" strokeWidth="1" x1="10" x2="190" y1="20" y2="60" />
                    {/* Candlesticks */}
                    <line stroke="#f23645" strokeWidth="1.5" x1="30" x2="30" y1="35" y2="65" />
                    <rect fill="#f23645" height="15" width="6" x="27" y="42" />
                    <line stroke="#089981" strokeWidth="1.5" x1="60" x2="60" y1="25" y2="55" />
                    <rect fill="#089981" height="18" width="6" x="57" y="30" />
                    <line stroke="#089981" strokeWidth="1.5" x1="90" x2="90" y1="20" y2="50" />
                    <rect fill="#089981" height="16" width="6" x="87" y="24" />
                    <line stroke="#089981" strokeWidth="1.5" x1="120" x2="120" y1="15" y2="40" />
                    <rect fill="#089981" height="15" width="6" x="117" y="18" />
                    <line stroke="#089981" strokeWidth="1.5" x1="150" x2="150" y1="10" y2="35" />
                    <rect fill="#089981" height="18" width="6" x="147" y="12" />
                  </svg>
                )}

                {idea.chartType === 'trendline' && (
                  <svg className="w-full h-24" viewBox="0 0 200 80">
                    <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="30" y2="30" />
                    <path
                      d="M10 60 Q 70 50, 110 30 T 190 15"
                      fill="none"
                      stroke="#2962ff"
                      strokeWidth="2"
                    />
                    <circle cx="110" cy="30" fill="#089981" r="4" />
                  </svg>
                )}

                {idea.chartType === 'retracement' && (
                  <svg className="w-full h-24" viewBox="0 0 200 80">
                    <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="40" y2="40" />
                    <path
                      d="M10 20 C 50 10, 80 15, 120 45 S 160 70, 190 65"
                      fill="none"
                      stroke="#f23645"
                      strokeWidth="2"
                    />
                  </svg>
                )}

                {idea.chartType === 'double_bottom' && (
                  <svg className="w-full h-24" viewBox="0 0 200 80">
                    <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="45" y2="45" />
                    <path
                      d="M10 25 L 50 65 L 90 35 L 130 65 L 190 15"
                      fill="none"
                      stroke="#089981"
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="65" fill="#2962ff" r="3" />
                    <circle cx="130" cy="65" fill="#2962ff" r="3" />
                  </svg>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div onClick={() => onSelectIdea(idea)}>
                  <h3 className="font-bold text-white text-[15px] group-hover:text-[#2962ff] transition leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#787b86] mt-2 line-clamp-2 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1e222d] text-xs text-[#787b86]">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${idea.authorColor}`}
                    >
                      {idea.authorInitials}
                    </div>
                    <span className="hover:text-white transition">{idea.author}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(idea.id);
                      }}
                      className={`flex items-center space-x-1 hover:text-white transition cursor-pointer ${
                        idea.isLiked ? 'text-rose-400 font-semibold' : ''
                      }`}
                    >
                      <span>{idea.isLiked ? '❤️' : '🤍'}</span>
                      <span className="tabular-nums">{idea.likes}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectIdea(idea);
                      }}
                      className="flex items-center space-x-1 hover:text-white transition"
                    >
                      <span>💬</span>
                      <span className="tabular-nums">{idea.commentsCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
