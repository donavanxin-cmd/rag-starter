import React, { useState } from 'react';
import { MarketTicker } from '../../types';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: MarketTicker[];
  onSelectTicker: (ticker: MarketTicker) => void;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'indices' | 'stocks' | 'crypto' | 'commodities' | 'forex'>('all');

  if (!isOpen) return null;

  const filtered = tickers.filter((t) => {
    const matchesTab = activeTab === 'all' || t.category === activeTab;
    const matchesQuery =
      t.symbol.toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1e222d] bg-[#1e222d]">
          <svg className="w-5 h-5 text-[#787b86] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search symbol, company or market..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-[#787b86] focus:outline-none"
          />
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#787b86] bg-[#131722] px-2 py-0.5 rounded border border-[#2a2e39]">
              ESC
            </span>
            <button
              onClick={onClose}
              className="text-[#787b86] hover:text-white p-1 rounded transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 px-4 py-2 border-b border-[#1e222d] overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'indices', label: 'Indices' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'commodities', label: 'Commodities' },
            { id: 'forex', label: 'Forex' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === tab.id
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Symbol List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#1e222d]/60">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#787b86] text-sm">
              No matching symbols found for "{query}"
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  onSelectTicker(t);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1e222d] cursor-pointer transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2a2e39] flex items-center justify-center font-bold text-xs text-white uppercase group-hover:bg-[#2962ff] transition">
                    {t.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm group-hover:text-[#2962ff] transition">
                        {t.symbol}
                      </span>
                      <span className="text-[11px] text-[#787b86] uppercase bg-black/40 px-1.5 py-0.5 rounded border border-[#2a2e39]">
                        {t.category}
                      </span>
                    </div>
                    <div className="text-xs text-[#787b86]">{t.name}</div>
                  </div>
                </div>

                <div className="text-right tabular-nums">
                  <div className="text-sm font-semibold text-white">
                    {t.price.toLocaleString(undefined, { minimumFractionDigits: t.decimals, maximumFractionDigits: t.decimals })}
                  </div>
                  <div className={`text-xs font-medium ${t.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {t.change >= 0 ? `+${t.change.toFixed(t.decimals)}` : t.change.toFixed(t.decimals)} ({t.changePercent >= 0 ? `+${t.changePercent.toFixed(2)}%` : `${t.changePercent.toFixed(2)}%`})
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Quick Tips */}
        <div className="px-4 py-2 bg-[#0e1118] border-t border-[#1e222d] text-[11px] text-[#787b86] flex items-center justify-between">
          <span>Click any symbol to open live Superchart</span>
          <span>Tip: Press Ctrl+K anywhere to search</span>
        </div>
      </div>
    </div>
  );
};
