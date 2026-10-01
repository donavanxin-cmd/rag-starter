import React, { useState } from 'react';
import { ScreenMode } from '../types';

interface HeaderProps {
  currentScreen: ScreenMode;
  onNavigate: (screen: ScreenMode) => void;
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  userEmail?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenGetStarted,
  userEmail,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-[#1e222d] w-full px-4 lg:px-6 h-[64px] flex items-center justify-between">
      {/* Left: Brand Logo & Navigation */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* TradingView Logo Mark */}
        <button
          onClick={() => onNavigate('overview')}
          aria-label="TradingView Home"
          className="flex items-center space-x-2 group focus:outline-none cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-white fill-current transition-transform group-hover:scale-105"
            viewBox="0 0 36 28"
          >
            <path
              fillRule="evenodd"
              d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 10h-7v18h7V10z"
            />
          </svg>
        </button>

        {/* Search Input Container */}
        <div
          onClick={onOpenSearch}
          className="relative hidden md:flex items-center w-52 lg:w-64 cursor-pointer"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#787b86]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="w-full bg-[#1e222d] hover:bg-[#2a2e39] text-xs text-[#787b86] pl-9 pr-3 py-2 rounded-full border border-transparent transition flex items-center justify-between">
            <span>Search (Ctrl+K)</span>
            <kbd className="hidden lg:inline-block text-[10px] bg-black/40 text-[#787b86] px-1.5 py-0.5 rounded border border-[#2a2e39]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium tracking-tight">
          <button
            onClick={() => onNavigate('supercharts')}
            className={`transition whitespace-nowrap cursor-pointer ${
              currentScreen === 'supercharts'
                ? 'text-[#2962ff] font-semibold'
                : 'text-white hover:text-white/80'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => onNavigate('community')}
            className={`transition whitespace-nowrap cursor-pointer ${
              currentScreen === 'community'
                ? 'text-[#2962ff] font-semibold'
                : 'text-[#b2b5be] hover:text-white'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => onNavigate('screener')}
            className={`transition whitespace-nowrap cursor-pointer ${
              currentScreen === 'screener'
                ? 'text-[#2962ff] font-semibold'
                : 'text-[#b2b5be] hover:text-white'
            }`}
          >
            Markets
          </button>
          <button
            onClick={() => onNavigate('brokers')}
            className={`transition whitespace-nowrap cursor-pointer ${
              currentScreen === 'brokers'
                ? 'text-[#2962ff] font-semibold'
                : 'text-[#b2b5be] hover:text-white'
            }`}
          >
            Brokers
          </button>

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="text-[#b2b5be] hover:text-white transition flex items-center space-x-1 cursor-pointer"
            >
              <span>More</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showMoreMenu && (
              <div
                className="absolute left-0 mt-2 w-48 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl py-1 text-xs z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowMoreMenu(false)}
              >
                <button
                  onClick={() => {
                    onNavigate('supercharts');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white flex items-center justify-between"
                >
                  <span>Supercharts Studio</span>
                  <span className="text-[10px] text-[#2962ff] font-bold">PRO</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('screener');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white"
                >
                  Market Screeners
                </button>
                <button
                  onClick={() => {
                    onNavigate('community');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white"
                >
                  Pine Script® Community
                </button>
                <button
                  onClick={() => {
                    onNavigate('brokers');
                    setShowMoreMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white"
                >
                  Verified Brokers
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right: Language, Profile, and Get Started CTA */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Mobile search icon */}
        <button
          onClick={onOpenSearch}
          className="md:hidden text-[#b2b5be] hover:text-white p-2"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-label="Select language"
            className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-[#b2b5be] hover:text-white px-2 py-1.5 rounded-lg transition cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                strokeWidth="1.8"
              />
            </svg>
            <span>{language}</span>
          </button>

          {showLangMenu && (
            <div
              className="absolute right-0 mt-2 w-32 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-xl py-1 text-xs z-50"
              onMouseLeave={() => setShowLangMenu(false)}
            >
              {['EN', 'DE', 'ES', 'FR', 'JA', 'ZH'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#1e222d] transition ${
                    language === lang ? 'text-[#2962ff] font-bold' : 'text-white'
                  }`}
                >
                  {lang === 'EN' && 'English (EN)'}
                  {lang === 'DE' && 'Deutsch (DE)'}
                  {lang === 'ES' && 'Español (ES)'}
                  {lang === 'FR' && 'Français (FR)'}
                  {lang === 'JA' && '日本語 (JA)'}
                  {lang === 'ZH' && '中文 (ZH)'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile / Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Account profile"
            className="text-[#b2b5be] hover:text-white p-1 rounded-full transition cursor-pointer flex items-center"
            type="button"
          >
            {userEmail ? (
              <div className="w-7 h-7 rounded-full bg-[#2962ff] text-white flex items-center justify-center text-xs font-bold shadow-md">
                {userEmail.charAt(0).toUpperCase()}
              </div>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            )}
          </button>

          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-56 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl py-2 text-xs z-50"
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="px-4 py-2 border-b border-[#1e222d]">
                <div className="text-[11px] text-[#787b86]">Signed in as</div>
                <div className="text-white font-semibold truncate">
                  {userEmail || 'Guest Trader'}
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate('supercharts');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white"
              >
                Paper Trading Portfolio
              </button>
              <button
                onClick={() => {
                  onNavigate('community');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-white"
              >
                My Published Setups
              </button>
              <button
                onClick={() => {
                  onOpenGetStarted();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#1e222d] text-[#2962ff] font-semibold border-t border-[#1e222d]"
              >
                {userEmail ? 'Switch Account' : 'Sign Up / Sign In'}
              </button>
            </div>
          )}
        </div>

        {/* Primary Gradient Header Action Button */}
        <button
          onClick={onOpenGetStarted}
          className="bg-gradient-to-r from-[#0052ff] via-[#3b82f6] to-[#7928ca] text-white font-semibold text-[13px] px-5 py-2 rounded-full hover:brightness-110 active:scale-95 transition shadow-lg shadow-blue-500/20 whitespace-nowrap cursor-pointer"
        >
          {userEmail ? 'Upgrade Pro' : 'Get started'}
        </button>
      </div>
    </header>
  );
};
