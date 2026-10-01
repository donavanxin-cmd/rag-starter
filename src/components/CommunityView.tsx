import React, { useState } from 'react';
import { CommunityIdea } from '../types';

interface CommunityViewProps {
  ideas: CommunityIdea[];
  onToggleLike: (ideaId: string) => void;
  onOpenNewIdeaModal: () => void;
  onSelectIdea: (idea: CommunityIdea) => void;
  onBackToOverview: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  ideas,
  onToggleLike,
  onOpenNewIdeaModal,
  onSelectIdea,
  onBackToOverview,
}) => {
  const [filter, setFilter] = useState<'all' | 'picks' | 'popular' | 'stocks' | 'crypto'>('all');
  const [search, setSearch] = useState('');

  const filtered = ideas.filter((idea) => {
    const matchesFilter = filter === 'all' || idea.category === filter;
    const matchesSearch =
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.symbol.toLowerCase().includes(search.toLowerCase()) ||
      idea.author.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1e222d] gap-4">
        <div>
          <button
            onClick={onBackToOverview}
            className="text-xs text-[#2962ff] hover:underline flex items-center space-x-1 mb-2"
          >
            <span>← Back to Overview</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Trading Community</h1>
          <p className="text-xs text-[#787b86] mt-1">
            Over 100 million traders share setups, price action insights, and strategy discussions
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search ideas by ticker or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#131722] border border-[#2a2e39] text-xs text-white placeholder-[#787b86] px-3.5 py-2.5 rounded-xl focus:border-[#2962ff] focus:outline-none"
            />
          </div>
          <button
            onClick={onOpenNewIdeaModal}
            className="bg-[#2962ff] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-500/20 whitespace-nowrap cursor-pointer"
          >
            + Publish Idea
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 my-6 overflow-x-auto text-xs pb-1">
        {[
          { id: 'all', label: 'All Ideas' },
          { id: 'picks', label: "Editors' Picks" },
          { id: 'popular', label: 'Most Popular' },
          { id: 'stocks', label: 'Stocks & Equities' },
          { id: 'crypto', label: 'Crypto & DeFi' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition cursor-pointer ${
              filter === tab.id
                ? 'bg-[#2962ff] text-white shadow-md'
                : 'bg-[#131722] text-[#787b86] hover:text-white border border-[#1e222d]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Idea Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((idea) => (
          <article
            key={idea.id}
            className="bg-[#131722] border border-[#1e222d] hover:border-[#2a2e39] rounded-xl overflow-hidden flex flex-col transition group cursor-pointer shadow-lg"
          >
            {/* Chart Graphic Preview */}
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

              {/* Graphic */}
              <svg className="w-full h-24" viewBox="0 0 200 80">
                <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="20" y2="20" />
                <line stroke="#1e222d" strokeDasharray="2 2" x1="0" x2="200" y1="50" y2="50" />
                {idea.direction === 'Long' ? (
                  <path
                    d="M10 60 Q 70 50, 110 30 T 190 15"
                    fill="none"
                    stroke="#089981"
                    strokeWidth="2.5"
                  />
                ) : (
                  <path
                    d="M10 20 C 50 10, 80 15, 120 45 S 160 70, 190 65"
                    fill="none"
                    stroke="#f23645"
                    strokeWidth="2.5"
                  />
                )}
              </svg>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div onClick={() => onSelectIdea(idea)}>
                <h3 className="font-bold text-white text-[15px] group-hover:text-[#2962ff] transition leading-snug">
                  {idea.title}
                </h3>
                <p className="text-xs text-[#787b86] mt-2 line-clamp-3 leading-relaxed">
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
                  <span className="text-[10px] text-[#555865]">· {idea.date}</span>
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
        ))}
      </div>
    </div>
  );
};
