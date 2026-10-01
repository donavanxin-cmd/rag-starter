import React, { useState } from 'react';
import { CommunityIdea } from '../../types';

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (idea: CommunityIdea) => void;
}

export const NewIdeaModal: React.FC<NewIdeaModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState('XAUUSD');
  const [exchange, setExchange] = useState('OANDA');
  const [direction, setDirection] = useState<'Long' | 'Short'>('Long');
  const [category, setCategory] = useState<'stocks' | 'crypto' | 'picks' | 'popular'>('picks');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('ProTrader');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newIdea: CommunityIdea = {
      id: `idea-${Date.now()}`,
      title,
      description,
      author: author || 'Anonymous Trader',
      authorInitials: (author || 'A').charAt(0).toUpperCase(),
      authorColor: direction === 'Long'
        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      symbol: symbol.toUpperCase(),
      exchange: exchange.toUpperCase(),
      direction,
      category,
      likes: 1,
      commentsCount: 0,
      date: 'Just now',
      isLiked: true,
      chartType: direction === 'Long' ? 'breakout' : 'retracement',
    };

    onPublish(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#787b86] hover:text-white transition text-lg"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Publish Trading Idea</h3>
        <p className="text-xs text-[#787b86] mb-5">
          Share your technical analysis, price action setups, and forecasts with the community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#b2b5be] font-medium mb-1">Idea Title</label>
            <input
              type="text"
              required
              placeholder="e.g., BTC/USD - Descending Channel Breakout Imminent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3.5 py-2.5 focus:border-[#2962ff] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#b2b5be] font-medium mb-1">Symbol & Exchange</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="XAUUSD"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-1/2 bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3 py-2 uppercase focus:border-[#2962ff] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="OANDA"
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                  className="w-1/2 bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3 py-2 uppercase focus:border-[#2962ff] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#b2b5be] font-medium mb-1">Direction</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('Long')}
                  className={`flex-1 py-2 rounded-lg font-bold transition ${
                    direction === 'Long'
                      ? 'bg-[#089981] text-white shadow-sm'
                      : 'bg-[#1e222d] text-[#787b86] border border-[#2a2e39]'
                  }`}
                >
                  Long
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('Short')}
                  className={`flex-1 py-2 rounded-lg font-bold transition ${
                    direction === 'Short'
                      ? 'bg-[#f23645] text-white shadow-sm'
                      : 'bg-[#1e222d] text-[#787b86] border border-[#2a2e39]'
                  }`}
                >
                  Short
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#b2b5be] font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3 py-2 focus:border-[#2962ff] focus:outline-none"
              >
                <option value="picks">Editors' Picks</option>
                <option value="popular">Popular</option>
                <option value="stocks">Stocks</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>
            <div>
              <label className="block text-[#b2b5be] font-medium mb-1">Author Alias</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3 py-2 focus:border-[#2962ff] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#b2b5be] font-medium mb-1">Analysis & Trade Notes</label>
            <textarea
              required
              rows={3}
              placeholder="Detail your price levels, catalyst triggers, stop-loss strategy, and take-profit targets..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg p-3 focus:border-[#2962ff] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1e222d] text-[#787b86] hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-bold bg-[#2962ff] hover:bg-blue-600 text-white transition shadow-lg shadow-blue-500/20"
            >
              Publish Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
