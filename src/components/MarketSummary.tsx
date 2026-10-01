import React from 'react';
import { MarketTicker } from '../types';

interface MarketSummaryProps {
  tickers: MarketTicker[];
  onSelectTicker: (ticker: MarketTicker) => void;
  onSeeAllIndices: () => void;
}

export const MarketSummary: React.FC<MarketSummaryProps> = ({
  tickers,
  onSelectTicker,
  onSeeAllIndices,
}) => {
  // Grab the 4 main tickers from mockData or match SPX, NDX, BTCUSD, GC1
  const displayTickers = [
    tickers.find((t) => t.symbol === 'SPX') || tickers[0],
    tickers.find((t) => t.symbol === 'NDX') || tickers[1],
    tickers.find((t) => t.symbol === 'BTCUSD') || tickers[2],
    tickers.find((t) => t.symbol === 'GC1!') || tickers[3],
  ].filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" data-purpose="market-summary" id="markets">
      <div className="flex items-center justify-between pb-6 border-b border-[#1e222d] mb-6">
        <div className="flex items-baseline space-x-3">
          <h2 className="text-2xl font-bold text-white tracking-tight">Market summary</h2>
          <span className="text-xs text-[#787b86]">Real-time worldwide quotes</span>
        </div>
        <button
          onClick={onSeeAllIndices}
          className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer flex items-center space-x-1"
        >
          <span>See all major indices</span>
          <span>→</span>
        </button>
      </div>

      {/* Ticker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayTickers.map((t) => {
          const isPositive = t.change >= 0;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTicker(t)}
              className="bg-[#131722] hover:bg-[#1e222d] p-4 rounded-xl border border-[#1e222d] hover:border-[#2a2e39] transition group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm group-hover:text-[#2962ff] transition">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-[#787b86]">{t.symbol}</span>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded tabular-nums ${
                    isPositive
                      ? 'text-[#089981] bg-[#089981]/10'
                      : 'text-[#f23645] bg-[#f23645]/10'
                  }`}
                >
                  {isPositive ? `+${t.changePercent.toFixed(2)}%` : `${t.changePercent.toFixed(2)}%`}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between tabular-nums">
                <span className="text-lg font-bold text-white">
                  {t.price.toLocaleString(undefined, {
                    minimumFractionDigits: t.decimals,
                    maximumFractionDigits: t.decimals,
                  })}
                </span>
                <span
                  className={`text-xs ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive
                    ? `+${t.change.toFixed(t.decimals)}`
                    : t.change.toFixed(t.decimals)}
                </span>
              </div>

              {/* Sparkline Vector */}
              <div className="mt-3 h-8 w-full">
                <svg
                  className={`w-full h-full ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                  preserveAspectRatio="none"
                  viewBox="0 0 100 25"
                >
                  {t.symbol === 'SPX' && (
                    <path
                      d="M0 20 L20 18 L40 22 L60 12 L80 14 L100 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  {t.symbol === 'NDX' && (
                    <path
                      d="M0 22 L20 19 L40 15 L60 18 L80 8 L100 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  {t.symbol === 'BTCUSD' && (
                    <path
                      d="M0 5 L20 8 L40 4 L60 16 L80 14 L100 22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  {t.symbol === 'GC1!' && (
                    <path
                      d="M0 18 L25 15 L50 17 L75 10 L100 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  {!['SPX', 'NDX', 'BTCUSD', 'GC1!'].includes(t.symbol) && (
                    <path
                      d={
                        isPositive
                          ? 'M0 20 L25 16 L50 18 L75 10 L100 5'
                          : 'M0 5 L25 8 L50 14 L75 12 L100 22'
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
