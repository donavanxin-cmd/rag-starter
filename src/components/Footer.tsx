import React from 'react';
import { ScreenMode } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenMode) => void;
  onOpenPineDocs: () => void;
  onOpenSpaceStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPineDocs,
  onOpenSpaceStory,
}) => {
  return (
    <footer className="border-t border-[#1e222d] bg-black pt-16 pb-12 mt-16" data-purpose="footer-links">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Footer Nav Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#1e222d]">
          {/* Col 1: Products */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Products</h4>
            <button
              onClick={() => onNavigate('supercharts')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Supercharts
            </button>
            <button
              onClick={onOpenPineDocs}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Pine Script®
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Stock Screener
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Heatmaps
            </button>
            <span className="text-xs text-[#787b86]/60 cursor-default">Mobile Apps</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Desktop App</span>
          </div>

          {/* Col 2: Screeners & Heatmaps */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Screeners</h4>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Stocks
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              ETFs
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Crypto coins
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Bonds
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              DEX pairs
            </button>
          </div>

          {/* Col 3: Community */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Community</h4>
            <button
              onClick={() => onNavigate('community')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Trading Ideas
            </button>
            <button
              onClick={onOpenPineDocs}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Scripts & Indicators
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Social network
            </button>
            <span className="text-xs text-[#787b86]/60 cursor-default">House Rules</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Refer a friend</span>
          </div>

          {/* Col 4: Business */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Business</h4>
            <span className="text-xs text-[#787b86]/60 cursor-default">Widgets</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Charting libraries</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Lightweight Charts™</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Advanced Charts</span>
            <button
              onClick={() => onNavigate('brokers')}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Brokerage integration
            </button>
          </div>

          {/* Col 5: Company */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Company</h4>
            <span className="text-xs text-[#787b86]/60 cursor-default">Who we are</span>
            <button
              onClick={onOpenSpaceStory}
              className="text-left text-xs text-[#787b86] hover:text-white transition"
            >
              Space mission
            </button>
            <span className="text-xs text-[#787b86]/60 cursor-default">Blog</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Careers</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Security tips</span>
          </div>

          {/* Col 6: Legal & Policies */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Policies</h4>
            <span className="text-xs text-[#787b86]/60 cursor-default">Terms of Use</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Disclaimer</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Privacy Policy</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Cookies Policy</span>
            <span className="text-xs text-[#787b86]/60 cursor-default">Status page</span>
          </div>
        </div>

        {/* Footer Bottom Meta */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#787b86] gap-4">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 36 28">
              <path
                fillRule="evenodd"
                d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 10h-7v18h7V10z"
              />
            </svg>
            <span className="text-neutral-400">Made by humans • © 2026 TradingView, Inc.</span>
          </div>
          <p className="max-w-xl text-center md:text-right text-[11px] text-zinc-500 leading-relaxed">
            Select market data provided by ICE Data Services. Select reference data provided by FactSet. CUSIP Database provided by FactSet Research Systems Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
