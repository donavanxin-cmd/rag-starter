import { MarketTicker, CommunityIdea, Broker, Candle } from '../types';

export const INITIAL_TICKERS: MarketTicker[] = [
  {
    id: 'spx',
    name: 'S&P 500',
    symbol: 'SPX',
    category: 'indices',
    price: 5864.67,
    change: 28.21,
    changePercent: 0.48,
    high: 5871.20,
    low: 5840.15,
    volume: '3.12B',
    sparkline: [5830, 5835, 5842, 5838, 5849, 5855, 5852, 5860, 5864.67],
    decimals: 2,
  },
  {
    id: 'ndx',
    name: 'Nasdaq 100',
    symbol: 'NDX',
    category: 'indices',
    price: 20387.20,
    change: 165.40,
    changePercent: 0.82,
    high: 20420.50,
    low: 20210.00,
    volume: '4.85B',
    sparkline: [20210, 20240, 20290, 20275, 20330, 20350, 20340, 20375, 20387.20],
    decimals: 2,
  },
  {
    id: 'btcusd',
    name: 'Bitcoin',
    symbol: 'BTCUSD',
    category: 'crypto',
    price: 67420.00,
    change: -842.10,
    changePercent: -1.24,
    high: 68650.00,
    low: 66980.00,
    volume: '28.4B',
    sparkline: [68400, 68200, 68500, 67900, 67600, 67800, 67300, 67250, 67420.00],
    decimals: 2,
  },
  {
    id: 'gc1',
    name: 'Gold',
    symbol: 'GC1!',
    category: 'commodities',
    price: 2735.40,
    change: 8.40,
    changePercent: 0.31,
    high: 2742.10,
    low: 2724.80,
    volume: '340K',
    sparkline: [2725, 2728, 2727, 2731, 2730, 2733, 2732, 2734, 2735.40],
    decimals: 2,
  },
  {
    id: 'aapl',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    category: 'stocks',
    price: 232.80,
    change: 3.45,
    changePercent: 1.50,
    high: 234.10,
    low: 229.40,
    volume: '48.2M',
    sparkline: [229.5, 230.2, 231.0, 230.8, 231.9, 232.4, 232.8],
    decimals: 2,
  },
  {
    id: 'nvda',
    name: 'NVIDIA Corp.',
    symbol: 'NVDA',
    category: 'stocks',
    price: 138.25,
    change: 4.12,
    changePercent: 3.07,
    high: 139.50,
    low: 134.20,
    volume: '82.6M',
    sparkline: [134.5, 135.2, 136.0, 135.8, 137.2, 137.8, 138.25],
    decimals: 2,
  },
  {
    id: 'tsla',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    category: 'stocks',
    price: 218.40,
    change: -2.85,
    changePercent: -1.29,
    high: 222.00,
    low: 216.50,
    volume: '54.1M',
    sparkline: [221.8, 220.4, 219.8, 220.1, 218.9, 217.9, 218.4],
    decimals: 2,
  },
  {
    id: 'eurusd',
    name: 'Euro / US Dollar',
    symbol: 'EURUSD',
    category: 'forex',
    price: 1.0824,
    change: -0.0018,
    changePercent: -0.17,
    high: 1.0860,
    low: 1.0815,
    volume: '115B',
    sparkline: [1.0845, 1.0850, 1.0838, 1.0840, 1.0830, 1.0825, 1.0824],
    decimals: 4,
  },
  {
    id: 'ethusd',
    name: 'Ethereum',
    symbol: 'ETHUSD',
    category: 'crypto',
    price: 2540.80,
    change: 32.10,
    changePercent: 1.28,
    high: 2580.00,
    low: 2490.50,
    volume: '14.2B',
    sparkline: [2495, 2510, 2505, 2525, 2530, 2545, 2540.8],
    decimals: 2,
  }
];

export const INITIAL_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-1',
    title: 'XAU/USD - Breakout Structure, Buyers Hold Strong',
    description: 'XAUUSD is navigating a critical breakout above descending trendline resistance. Gold is now consolidating above key 2,730-2,740 level with sustained volume expansion and high institutional interest.',
    author: 'AuricVerse_HQ',
    authorInitials: 'A',
    authorColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    symbol: 'XAUUSD',
    exchange: 'OANDA',
    direction: 'Long',
    category: 'picks',
    likes: 248,
    commentsCount: 32,
    date: '2 hours ago',
    chartType: 'breakout',
  },
  {
    id: 'idea-2',
    title: 'AAPL — Rising Trendline Holds as 380 Liquidity Comes Into Focus',
    description: 'AAPL maintains a broader bullish posture with price forming higher highs along the structural trend. Support zone around 228-230 remains resilient with continuous institutional dip buying.',
    author: 'XAUApex',
    authorInitials: 'X',
    authorColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    direction: 'Long',
    category: 'stocks',
    likes: 195,
    commentsCount: 18,
    date: '4 hours ago',
    chartType: 'trendline',
  },
  {
    id: 'idea-3',
    title: 'Bitcoin Rejected at the Highs: Deeper Retracement Underway',
    description: 'BTCUSDT printed a Rounding Top near local resistance where aggressive selling volume appeared. Key support at 66,200 now in danger of testing before the next major macro expansion.',
    author: 'LegionQ8',
    authorInitials: 'L',
    authorColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    symbol: 'BTCUSDT',
    exchange: 'BINANCE',
    direction: 'Short',
    category: 'crypto',
    likes: 412,
    commentsCount: 54,
    date: '5 hours ago',
    chartType: 'retracement',
  },
  {
    id: 'idea-4',
    title: 'NVDA - Cup and Handle Pattern Testing All-Time High Resistance',
    description: 'NVIDIA has formed a classic multi-week accumulation base. Target projection gives $155 on successful breakout above previous resistance band.',
    author: 'QuantumAlpha',
    authorInitials: 'Q',
    authorColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    symbol: 'NVDA',
    exchange: 'NASDAQ',
    direction: 'Long',
    category: 'popular',
    likes: 388,
    commentsCount: 41,
    date: '7 hours ago',
    chartType: 'breakout',
  },
  {
    id: 'idea-5',
    title: 'S&P 500 (SPX) - Liquidity Sweep Precedes Expansion Phase',
    description: 'Index swept overnight sell-side stops and is now establishing acceptance back inside the 5-day value area. Bullish continuation favored into monthly close.',
    author: 'MarketMakerPro',
    authorInitials: 'M',
    authorColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    symbol: 'SPX',
    exchange: 'CBOE',
    direction: 'Long',
    category: 'picks',
    likes: 512,
    commentsCount: 67,
    date: '9 hours ago',
    chartType: 'double_bottom',
  },
  {
    id: 'idea-6',
    title: 'ETH/USDT - Bullish Divergence on 4H Relative Strength Index',
    description: 'Ethereum is holding multi-month support while RSI shows clear higher lows. Favorable risk/reward setup targeting $2,850 liquidity shelf.',
    author: 'CryptoVoyager',
    authorInitials: 'C',
    authorColor: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    symbol: 'ETHUSDT',
    exchange: 'BINANCE',
    direction: 'Long',
    category: 'crypto',
    likes: 298,
    commentsCount: 29,
    date: '11 hours ago',
    chartType: 'trendline',
  }
];

export const BROKERS: Broker[] = [
  {
    id: 'forex-com',
    name: 'FOREX.com',
    badge: 'Forex • 4.5 ★ Great',
    rating: 4.5,
    ratingText: 'Great',
    types: ['Forex', 'Indices', 'Commodities'],
    spreads: 'From 0.8 pips on EUR/USD',
    minDeposit: '$100',
    platforms: 'TradingView, MT4, WebTrader',
  },
  {
    id: 'oanda',
    name: 'OANDA',
    badge: 'Best 2023 • 4.5 ★ Great',
    rating: 4.5,
    ratingText: 'Great',
    types: ['Forex', 'CFDs', 'Precious Metals'],
    spreads: 'Competitive dynamic spreads',
    minDeposit: '$0',
    platforms: 'TradingView API, OANDA Trade, fxTrade',
  },
  {
    id: 'ninjatrader',
    name: 'NinjaTrader',
    badge: 'Futures • 4.5 ★ Great',
    rating: 4.5,
    ratingText: 'Great',
    types: ['Futures', 'Micro Futures', 'Options on Futures'],
    spreads: '$0.50 / micro contract',
    minDeposit: '$50',
    platforms: 'TradingView, NinjaTrader 8',
  },
  {
    id: 'okx',
    name: 'OKX',
    badge: 'Crypto • 4.4 ★ Very Good',
    rating: 4.4,
    ratingText: 'Very Good',
    types: ['Spot Crypto', 'Futures & Perpetuals', 'Options'],
    spreads: '0.08% Maker / 0.10% Taker',
    minDeposit: '$10',
    platforms: 'TradingView, OKX App, API',
  }
];

// Generate 40 historical candles for a base price
export function generateCandles(basePrice: number, count = 40): Candle[] {
  const candles: Candle[] = [];
  let current = basePrice * 0.96;
  const now = Date.now();
  const step = 60 * 60 * 1000; // 1 hour step

  for (let i = count; i >= 0; i--) {
    const time = new Date(now - i * step).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const volatility = current * 0.008;
    const delta = (Math.random() - 0.48) * volatility;
    const open = current;
    const close = current + delta;
    const high = Math.max(open, close) + Math.random() * volatility * 0.7;
    const low = Math.min(open, close) - Math.random() * volatility * 0.7;
    const volume = Math.floor(Math.random() * 50000 + 10000);

    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume,
    });
    current = close;
  }
  return candles;
}

export const PINE_SCRIPT_PRESETS = [
  {
    name: 'Relative Strength Index (RSI)',
    code: `//@version=5
indicator("Relative Strength Index", shorttitle="RSI", overlay=false)
length = input.int(14, minval=1)
src = close
up = ta.rma(math.max(ta.change(src), 0), length)
down = ta.rma(-math.min(ta.change(src), 0), length)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi, "RSI", color=color.purple)
band1 = hline(70, "Overbought", color=color.red, linestyle=hline.style_dotted)
band0 = hline(30, "Oversold", color=color.green, linestyle=hline.style_dotted)
fill(band1, band0, color=color.rgb(126, 87, 194, 90))`
  },
  {
    name: 'Exponential Moving Average Ribbon (EMA 20/50/200)',
    code: `//@version=5
indicator("EMA Ribbon", overlay=true)
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
ema200 = ta.ema(close, 200)

plot(ema20, color=color.blue, title="EMA 20", linewidth=2)
plot(ema50, color=color.orange, title="EMA 50", linewidth=2)
plot(ema200, color=color.purple, title="EMA 200", linewidth=2)`
  },
  {
    name: 'Supertrend Trend Following Strategy',
    code: `//@version=5
indicator("Supertrend Indicator", overlay=true)
atrPeriod = input.int(10, "ATR Period")
factor = input.float(3.0, "Factor")

[supertrend, direction] = ta.supertrend(factor, atrPeriod)
bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction < 0 ? supertrend : na, "Up Trend", color=color.green, style=plot.style_linebr)
downTrend = plot(direction < 0 ? na : supertrend, "Down Trend", color=color.red, style=plot.style_linebr)`
  }
];
