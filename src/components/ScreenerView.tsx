import React, { useState } from 'react';
import { MarketTicker } from '../types';

interface ScreenerViewProps {
  tickers: MarketTicker[];
  onSelectTicker: (ticker: MarketTicker) => void;
  onBackToOverview: () => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  tickers,
  onSelectTicker,
  onBackToOverview,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'changePercent' | 'symbol'>('changePercent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filtered = tickers
    .filter((t) => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory;
      const matchSearch =
        t.symbol.toLowerCase().includes(search.toLowerCase()) ||
        t.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      let diff = 0;
      if (sortBy === 'price') diff = a.price - b.price;
      else if (sortBy === 'changePercent') diff = a.changePercent - b.changePercent;
      else if (sortBy === 'symbol') diff = a.symbol.localeCompare(b.symbol);
      return sortOrder === 'desc' ? -diff : diff;
    });

  const toggleSort = (col: 'price' | 'changePercent' | 'symbol') => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('desc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1e222d] gap-4">
        <div>
          <button
            onClick={onBackToOverview}
            className="text-xs text-[#2962ff] hover:underline flex items-center space-x-1 mb-2"
          >
            <span>← Back to Overview</span>
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Market Screener</h1>
          <p className="text-xs text-[#787b86] mt-1">
            Real-time filter and analysis across global equities, crypto, commodities & foreign exchange
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Filter symbols or company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131722] border border-[#2a2e39] text-xs text-white placeholder-[#787b86] pl-9 pr-3 py-2.5 rounded-xl focus:border-[#2962ff] focus:outline-none"
          />
          <svg
            className="w-4 h-4 text-[#787b86] absolute left-3 top-3 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 my-6 overflow-x-auto text-xs pb-1">
        {[
          { id: 'all', label: 'All Markets' },
          { id: 'indices', label: 'Major Indices' },
          { id: 'stocks', label: 'Equities' },
          { id: 'crypto', label: 'Crypto Assets' },
          { id: 'commodities', label: 'Commodities' },
          { id: 'forex', label: 'Currencies' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#2962ff] text-white shadow-md'
                : 'bg-[#131722] text-[#787b86] hover:text-white border border-[#1e222d]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Screener Table */}
      <div className="bg-[#131722] border border-[#1e222d] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e222d] text-[#787b86] bg-[#0f121a]">
                <th
                  onClick={() => toggleSort('symbol')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  Ticker & Company {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => toggleSort('price')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-white"
                >
                  Last Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => toggleSort('changePercent')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-white"
                >
                  24h Change {sortBy === 'changePercent' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-right">24h High / Low</th>
                <th className="py-3.5 px-4 text-right">Volume</th>
                <th className="py-3.5 px-4 text-center">Technical Rating</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e222d]/60 font-mono">
              {filtered.map((t) => {
                const isUp = t.change >= 0;
                return (
                  <tr
                    key={t.id}
                    onClick={() => onSelectTicker(t)}
                    className="hover:bg-[#1e222d] transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1e222d] group-hover:bg-[#2962ff] flex items-center justify-center font-bold text-xs text-white transition">
                          {t.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm group-hover:text-[#2962ff] transition">
                            {t.symbol}
                          </div>
                          <div className="text-[11px] text-[#787b86] font-sans">{t.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-white text-sm">
                      {t.price.toLocaleString(undefined, {
                        minimumFractionDigits: t.decimals,
                        maximumFractionDigits: t.decimals,
                      })}
                    </td>

                    <td
                      className={`py-3.5 px-4 text-right font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isUp ? `+${t.change.toFixed(t.decimals)}` : t.change.toFixed(t.decimals)} ({isUp ? `+${t.changePercent.toFixed(2)}%` : `${t.changePercent.toFixed(2)}%`})
                    </td>

                    <td className="py-3.5 px-4 text-right text-[#787b86]">
                      {t.low.toFixed(t.decimals)} - {t.high.toFixed(t.decimals)}
                    </td>

                    <td className="py-3.5 px-4 text-right text-zinc-300">{t.volume}</td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[11px] font-sans font-semibold text-[#089981] bg-[#089981]/10 px-2 py-0.5 rounded border border-[#089981]/20">
                        Strong Buy
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTicker(t);
                        }}
                        className="px-3 py-1 bg-[#1e222d] hover:bg-[#2962ff] text-white rounded-lg transition font-sans text-xs"
                      >
                        Launch Chart →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
