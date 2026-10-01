/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenMode, MarketTicker, CommunityIdea, Broker } from './types';
import { INITIAL_TICKERS, INITIAL_IDEAS, BROKERS } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketSummary } from './components/MarketSummary';
import { CommunityIdeas } from './components/CommunityIdeas';
import { FeatureHighlight } from './components/FeatureHighlight';
import { SupportedBrokers } from './components/SupportedBrokers';
import { Footer } from './components/Footer';
import { SuperchartView } from './components/SuperchartView';
import { ScreenerView } from './components/ScreenerView';
import { CommunityView } from './components/CommunityView';
import { BrokersView } from './components/BrokersView';
import { SymbolSearchModal } from './components/modals/SymbolSearchModal';
import { GetStartedModal } from './components/modals/GetStartedModal';
import { SpaceStoryModal } from './components/modals/SpaceStoryModal';
import { PineScriptModal } from './components/modals/PineScriptModal';
import { NewIdeaModal } from './components/modals/NewIdeaModal';
import { BrokerConnectModal } from './components/modals/BrokerConnectModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenMode>('overview');
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);
  const [ideas, setIdeas] = useState<CommunityIdea[]>(INITIAL_IDEAS);
  const [brokersList, setBrokersList] = useState<Broker[]>(BROKERS);
  const [selectedTicker, setSelectedTicker] = useState<MarketTicker>(INITIAL_TICKERS[0]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [isPineDocsOpen, setIsPineDocsOpen] = useState(false);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const [selectedBrokerForModal, setSelectedBrokerForModal] = useState<Broker | null>(null);

  // Real-time market tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          // 40% chance this ticker updates this cycle
          if (Math.random() > 0.4) return t;

          const volatility = t.price * 0.0004;
          const delta = (Math.random() - 0.49) * volatility;
          const newPrice = Number(Math.max(t.price + delta, 0.001).toFixed(t.decimals));
          const newChange = Number((t.change + delta).toFixed(t.decimals));
          const basePrice = t.price - t.change;
          const newChangePercent = Number(((newChange / basePrice) * 100).toFixed(2));
          const updatedSparkline = [...t.sparkline.slice(1), newPrice];

          return {
            ...t,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            high: Math.max(t.high, newPrice),
            low: Math.min(t.low, newPrice),
            sparkline: updatedSparkline,
          };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Update selectedTicker reference when tickers update
  useEffect(() => {
    const updated = tickers.find((t) => t.id === selectedTicker.id);
    if (updated) {
      setSelectedTicker(updated);
    }
  }, [tickers, selectedTicker.id]);

  // Global Ctrl+K / Cmd+K search hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectTicker = (ticker: MarketTicker) => {
    setSelectedTicker(ticker);
    setCurrentScreen('supercharts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLike = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const isLiked = !idea.isLiked;
          return {
            ...idea,
            isLiked,
            likes: isLiked ? idea.likes + 1 : Math.max(0, idea.likes - 1),
          };
        }
        return idea;
      })
    );
  };

  const handlePublishIdea = (newIdea: CommunityIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
  };

  const handleConnectBroker = (brokerId: string) => {
    setBrokersList((prev) =>
      prev.map((b) => (b.id === brokerId ? { ...b, connected: true } : b))
    );
  };

  return (
    <div className="bg-black text-[#d1d4dc] min-h-screen flex flex-col font-sans antialiased selection:bg-[#2962ff] selection:text-white">
      {/* Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        userEmail={userEmail}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentScreen === 'overview' && (
          <>
            {/* Billboard Hero Section */}
            <Hero
              onGetStarted={() => setIsGetStartedOpen(true)}
              onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
            />

            {/* Market Summary Cards */}
            <MarketSummary
              tickers={tickers}
              onSelectTicker={handleSelectTicker}
              onSeeAllIndices={() => {
                setCurrentScreen('screener');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Community Ideas Section */}
            <CommunityIdeas
              ideas={ideas}
              onToggleLike={handleToggleLike}
              onOpenNewIdeaModal={() => setIsNewIdeaOpen(true)}
              onSelectIdea={(idea) => {
                const matchedTicker = tickers.find(
                  (t) => t.symbol.toUpperCase() === idea.symbol.toUpperCase()
                );
                if (matchedTicker) {
                  handleSelectTicker(matchedTicker);
                } else {
                  setCurrentScreen('community');
                }
              }}
            />

            {/* Supercharged Supercharts Banner */}
            <FeatureHighlight
              onExploreFeatures={() => {
                setCurrentScreen('supercharts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPineDocs={() => setIsPineDocsOpen(true)}
            />

            {/* Verified Brokers Section */}
            <SupportedBrokers
              brokers={brokersList}
              onOpenBrokerModal={(broker) => setSelectedBrokerForModal(broker)}
              onSeeAllBrokers={() => {
                setCurrentScreen('brokers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {currentScreen === 'supercharts' && (
          <SuperchartView
            selectedTicker={selectedTicker}
            tickers={tickers}
            onSelectTicker={setSelectedTicker}
            onBackToOverview={() => setCurrentScreen('overview')}
            onOpenPineDocs={() => setIsPineDocsOpen(true)}
          />
        )}

        {currentScreen === 'screener' && (
          <ScreenerView
            tickers={tickers}
            onSelectTicker={handleSelectTicker}
            onBackToOverview={() => setCurrentScreen('overview')}
          />
        )}

        {currentScreen === 'community' && (
          <CommunityView
            ideas={ideas}
            onToggleLike={handleToggleLike}
            onOpenNewIdeaModal={() => setIsNewIdeaOpen(true)}
            onSelectIdea={(idea) => {
              const matchedTicker = tickers.find(
                (t) => t.symbol.toUpperCase() === idea.symbol.toUpperCase()
              );
              if (matchedTicker) {
                handleSelectTicker(matchedTicker);
              }
            }}
            onBackToOverview={() => setCurrentScreen('overview')}
          />
        )}

        {currentScreen === 'brokers' && (
          <BrokersView
            brokers={brokersList}
            onOpenBrokerModal={(broker) => setSelectedBrokerForModal(broker)}
            onBackToOverview={() => setCurrentScreen('overview')}
          />
        )}
      </main>

      {/* Global Footer (shown on overview and listing screens) */}
      {currentScreen !== 'supercharts' && (
        <Footer
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPineDocs={() => setIsPineDocsOpen(true)}
          onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
        />
      )}

      {/* Global Modals */}
      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tickers={tickers}
        onSelectTicker={handleSelectTicker}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onSuccess={(email) => setUserEmail(email)}
      />

      <SpaceStoryModal
        isOpen={isSpaceStoryOpen}
        onClose={() => setIsSpaceStoryOpen(false)}
      />

      <PineScriptModal
        isOpen={isPineDocsOpen}
        onClose={() => setIsPineDocsOpen(false)}
        onApplyToChart={() => {
          setCurrentScreen('supercharts');
        }}
      />

      <NewIdeaModal
        isOpen={isNewIdeaOpen}
        onClose={() => setIsNewIdeaOpen(false)}
        onPublish={handlePublishIdea}
      />

      <BrokerConnectModal
        broker={selectedBrokerForModal}
        isOpen={!!selectedBrokerForModal}
        onClose={() => setSelectedBrokerForModal(null)}
        onConnect={handleConnectBroker}
      />
    </div>
  );
}
