export type ScreenMode = 'overview' | 'supercharts' | 'screener' | 'community' | 'brokers';

export interface MarketTicker {
  id: string;
  name: string;
  symbol: string;
  category: 'indices' | 'crypto' | 'commodities' | 'stocks' | 'forex';
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  sparkline: number[];
  currency?: string;
  decimals: number;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  symbol: string;
  exchange: string;
  direction: 'Long' | 'Short';
  category: 'picks' | 'popular' | 'stocks' | 'crypto';
  likes: number;
  commentsCount: number;
  date: string;
  isLiked?: boolean;
  chartType: 'breakout' | 'trendline' | 'retracement' | 'double_bottom';
}

export interface Broker {
  id: string;
  name: string;
  badge: string;
  rating: number;
  ratingText: string;
  types: string[];
  spreads: string;
  minDeposit: string;
  platforms: string;
  connected?: boolean;
}

export interface PaperPosition {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  timestamp: string;
}
