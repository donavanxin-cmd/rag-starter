import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MarketTicker, Candle, PaperPosition } from '../types';
import { generateCandles } from '../data/mockData';

interface SuperchartViewProps {
  selectedTicker: MarketTicker;
  tickers: MarketTicker[];
  onSelectTicker: (ticker: MarketTicker) => void;
  onBackToOverview: () => void;
  onOpenPineDocs: () => void;
}

export const SuperchartView: React.FC<SuperchartViewProps> = ({
  selectedTicker,
  tickers,
  onSelectTicker,
  onBackToOverview,
  onOpenPineDocs,
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W'>('1D');
  const [chartType, setChartType] = useState<'candles' | 'line' | 'area' | 'bars'>('candles');
  
  // Indicators toggles
  const [showEMA, setShowEMA] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showRSI, setShowRSI] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [showIndicatorMenu, setShowIndicatorMenu] = useState(false);

  // Active drawing tool
  const [activeDrawingTool, setActiveDrawingTool] = useState<string>('crosshair');

  // Interactive mouse crosshair
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  // Bottom drawer: 'pine' | 'paper' | 'strategy' | null
  const [bottomTab, setBottomTab] = useState<'paper' | 'pine' | 'strategy' | null>('paper');

  // Paper Trading state
  const [accountBalance, setAccountBalance] = useState<number>(100000);
  const [positions, setPositions] = useState<PaperPosition[]>([
    {
      id: 'pos-1',
      symbol: selectedTicker.symbol,
      side: 'BUY',
      shares: 10,
      entryPrice: selectedTicker.price * 0.985,
      currentPrice: selectedTicker.price,
      pnl: 10 * (selectedTicker.price - selectedTicker.price * 0.985),
      pnlPercent: 1.5,
      timestamp: 'Today, 09:30 AM',
    }
  ]);
  const [orderShares, setOrderShares] = useState<number>(10);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  // Pine script code state
  const [pineCode, setPineCode] = useState<string>(
`//@version=5
indicator("Custom Momentum Overlay", overlay=true)
emaShort = ta.ema(close, 9)
emaLong = ta.ema(close, 21)
plot(emaShort, color=color.blue, title="EMA 9")
plot(emaLong, color=color.orange, title="EMA 21")`
  );
  const [pineStatus, setPineStatus] = useState<string>('Compiled successfully');

  // Historical candle data
  const [candles, setCandles] = useState<Candle[]>(() => generateCandles(selectedTicker.price, 45));

  // Regenerate candles when symbol or timeframe changes
  useEffect(() => {
    setCandles(generateCandles(selectedTicker.price, 45));
  }, [selectedTicker.symbol, timeframe]);

  // Update candle real-time on price ticks
  useEffect(() => {
    if (candles.length === 0) return;
    setCandles((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (!last) return prev;
      const updatedClose = selectedTicker.price;
      const updatedHigh = Math.max(last.high, updatedClose);
      const updatedLow = Math.min(last.low, updatedClose);
      copy[copy.length - 1] = {
        ...last,
        close: updatedClose,
        high: updatedHigh,
        low: updatedLow,
      };
      return copy;
    });

    // Update positions currentPrice and pnl
    setPositions((prev) =>
      prev.map((pos) => {
        if (pos.symbol === selectedTicker.symbol) {
          const currentPrice = selectedTicker.price;
          const diff = pos.side === 'BUY' ? currentPrice - pos.entryPrice : pos.entryPrice - currentPrice;
          const pnl = diff * pos.shares;
          const pnlPercent = (diff / pos.entryPrice) * 100;
          return { ...pos, currentPrice, pnl, pnlPercent };
        }
        return pos;
      })
    );
  }, [selectedTicker.price]);

  // Chart layout math
  const chartHeight = 420;
  const paddingY = 40;
  const minPrice = useMemo(() => Math.min(...candles.map((c) => c.low)) * 0.995, [candles]);
  const maxPrice = useMemo(() => Math.max(...candles.map((c) => c.high)) * 1.005, [candles]);
  const priceRange = maxPrice - minPrice || 1;

  const getY = (price: number) => {
    return chartHeight - paddingY - ((price - minPrice) / priceRange) * (chartHeight - paddingY * 2);
  };

  const currentCandle = hoveredIndex !== null && candles[hoveredIndex] ? candles[hoveredIndex] : candles[candles.length - 1];

  // Paper trading place order
  const handlePlaceOrder = (side: 'BUY' | 'SELL') => {
    const cost = orderShares * selectedTicker.price;
    if (side === 'BUY' && cost > accountBalance) {
      setTradeMessage('Insufficient virtual buying power!');
      setTimeout(() => setTradeMessage(null), 3000);
      return;
    }

    const newPos: PaperPosition = {
      id: `pos-${Date.now()}`,
      symbol: selectedTicker.symbol,
      side,
      shares: orderShares,
      entryPrice: selectedTicker.price,
      currentPrice: selectedTicker.price,
      pnl: 0,
      pnlPercent: 0,
      timestamp: 'Just now',
    };

    if (side === 'BUY') {
      setAccountBalance((b) => b - cost);
    } else {
      setAccountBalance((b) => b + cost);
    }

    setPositions((prev) => [newPos, ...prev]);
    setTradeMessage(`Executed ${side} ${orderShares} shares of ${selectedTicker.symbol} @ $${selectedTicker.price.toFixed(selectedTicker.decimals)}`);
    setTimeout(() => setTradeMessage(null), 3500);
  };

  const handleClosePosition = (posId: string) => {
    const pos = positions.find((p) => p.id === posId);
    if (!pos) return;
    const returnVal = pos.shares * pos.currentPrice;
    setAccountBalance((b) => b + (pos.side === 'BUY' ? returnVal : -returnVal));
    setPositions((prev) => prev.filter((p) => p.id !== posId));
    setTradeMessage(`Closed position in ${pos.symbol}. Realized P&L: $${pos.pnl.toFixed(2)}`);
    setTimeout(() => setTradeMessage(null), 3500);
  };

  // Compile Pine Script simulation
  const handleCompilePine = () => {
    setPineStatus('Validating AST syntax... OK. Applied script to chart overlay.');
    setShowEMA(true);
    setTimeout(() => setPineStatus('Active on Chart: Custom Momentum Overlay'), 1500);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#0a0d14] text-[#d1d4dc] font-sans">
      {/* Top Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-[#131722] border-b border-[#1e222d] text-xs gap-2">
        {/* Left tools: Back, Symbol Selector, Price */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToOverview}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#1e222d] hover:bg-[#2a2e39] text-white transition cursor-pointer"
            title="Return to Main Overview"
          >
            <span>←</span>
            <span className="hidden sm:inline font-semibold">Overview</span>
          </button>

          {/* Symbol Dropdown */}
          <div className="flex items-center space-x-2 border-l border-[#1e222d] pl-3">
            <select
              value={selectedTicker.id}
              onChange={(e) => {
                const found = tickers.find((t) => t.id === e.target.value);
                if (found) onSelectTicker(found);
              }}
              className="bg-[#1e222d] hover:bg-[#2a2e39] text-white font-bold py-1.5 px-3 rounded-lg border border-[#2a2e39] focus:outline-none cursor-pointer"
            >
              {tickers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.symbol} • {t.name}
                </option>
              ))}
            </select>

            {/* Current Price & Change */}
            <div className="flex items-baseline space-x-2 tabular-nums">
              <span className="text-base font-extrabold text-white">
                {selectedTicker.price.toLocaleString(undefined, {
                  minimumFractionDigits: selectedTicker.decimals,
                  maximumFractionDigits: selectedTicker.decimals,
                })}
              </span>
              <span
                className={`text-xs font-semibold ${
                  selectedTicker.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {selectedTicker.change >= 0 ? `+${selectedTicker.change.toFixed(selectedTicker.decimals)}` : selectedTicker.change.toFixed(selectedTicker.decimals)} ({selectedTicker.changePercent >= 0 ? `+${selectedTicker.changePercent.toFixed(2)}%` : `${selectedTicker.changePercent.toFixed(2)}%`})
              </span>
            </div>
          </div>
        </div>

        {/* Middle tools: Timeframes & Chart Type */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {(['1m', '5m', '15m', '1H', '4H', '1D', '1W'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 rounded text-xs font-semibold transition ${
                timeframe === tf
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tf}
            </button>
          ))}

          <div className="h-4 w-px bg-[#2a2e39] mx-1" />

          {/* Chart Type Selector */}
          <div className="flex items-center bg-[#1e222d] p-0.5 rounded-md border border-[#2a2e39]">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                chartType === 'candles' ? 'bg-[#2a2e39] text-white' : 'text-[#787b86] hover:text-white'
              }`}
              title="Candlesticks"
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                chartType === 'line' ? 'bg-[#2a2e39] text-white' : 'text-[#787b86] hover:text-white'
              }`}
              title="Line Chart"
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                chartType === 'area' ? 'bg-[#2a2e39] text-white' : 'text-[#787b86] hover:text-white'
              }`}
              title="Area Chart"
            >
              Area
            </button>
          </div>
        </div>

        {/* Right tools: Indicators Menu */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowIndicatorMenu(!showIndicatorMenu)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1e222d] hover:bg-[#2a2e39] text-white font-medium rounded-lg border border-[#2a2e39] transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-[#2962ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Indicators</span>
            </button>

            {showIndicatorMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in"
                onMouseLeave={() => setShowIndicatorMenu(false)}
              >
                <div className="text-[11px] font-bold text-[#787b86] uppercase px-2 py-1">
                  Active Overlays
                </div>
                <label className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#1e222d] cursor-pointer text-xs text-white">
                  <span>Moving Average (EMA 20)</span>
                  <input
                    type="checkbox"
                    checked={showEMA}
                    onChange={(e) => setShowEMA(e.target.checked)}
                    className="rounded bg-[#0a0d14] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#1e222d] cursor-pointer text-xs text-white">
                  <span>Bollinger Bands (20, 2)</span>
                  <input
                    type="checkbox"
                    checked={showBollinger}
                    onChange={(e) => setShowBollinger(e.target.checked)}
                    className="rounded bg-[#0a0d14] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#1e222d] cursor-pointer text-xs text-white">
                  <span>Volume Histogram</span>
                  <input
                    type="checkbox"
                    checked={showVolume}
                    onChange={(e) => setShowVolume(e.target.checked)}
                    className="rounded bg-[#0a0d14] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#1e222d] cursor-pointer text-xs text-white">
                  <span>RSI Oscillator (14)</span>
                  <input
                    type="checkbox"
                    checked={showRSI}
                    onChange={(e) => setShowRSI(e.target.checked)}
                    className="rounded bg-[#0a0d14] border-[#2a2e39] text-[#2962ff] focus:ring-0"
                  />
                </label>
              </div>
            )}
          </div>

          <button
            onClick={onOpenPineDocs}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-[#1e222d] hover:bg-[#2a2e39] text-white rounded-lg border border-[#2a2e39] transition font-medium"
          >
            <span>Pine Editor</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Tool Rail + Chart Canvas + Right Watchlist */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawing Tools Rail */}
        <div className="w-12 bg-[#131722] border-r border-[#1e222d] flex flex-col items-center py-3 space-y-3 shrink-0">
          {[
            { id: 'crosshair', icon: '+', title: 'Crosshair' },
            { id: 'trendline', icon: '╱', title: 'Trendline' },
            { id: 'ray', icon: '→', title: 'Horizontal Ray' },
            { id: 'fibonacci', icon: '≡', title: 'Fibonacci Retracement' },
            { id: 'brush', icon: '✎', title: 'Brush / Draw' },
            { id: 'text', icon: 'T', title: 'Text Note' },
            { id: 'ruler', icon: '📏', title: 'Measure / Price Range' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveDrawingTool(tool.id)}
              title={tool.title}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition ${
                activeDrawingTool === tool.id
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tool.icon}
            </button>
          ))}
          <div className="w-6 h-px bg-[#1e222d] my-1" />
          <button
            onClick={() => setActiveDrawingTool('crosshair')}
            title="Clear Chart Drawings"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs text-[#787b86] hover:text-rose-400 hover:bg-[#1e222d] transition"
          >
            🗑
          </button>
        </div>

        {/* Center: Chart Workspace */}
        <div className="flex-1 flex flex-col relative bg-[#0a0d14] overflow-hidden">
          {/* OHLC Bar Info Header */}
          <div className="absolute top-2 left-4 z-20 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono pointer-events-none bg-black/40 px-3 py-1.5 rounded-lg border border-[#1e222d]/60 backdrop-blur-sm">
            <span className="text-white font-bold">{selectedTicker.symbol}</span>
            <span className="text-[#787b86]">{timeframe}</span>
            <span>
              O: <strong className="text-white">{currentCandle?.open.toFixed(selectedTicker.decimals)}</strong>
            </span>
            <span>
              H: <strong className="text-white">{currentCandle?.high.toFixed(selectedTicker.decimals)}</strong>
            </span>
            <span>
              L: <strong className="text-white">{currentCandle?.low.toFixed(selectedTicker.decimals)}</strong>
            </span>
            <span>
              C: <strong className="text-white">{currentCandle?.close.toFixed(selectedTicker.decimals)}</strong>
            </span>
            {currentCandle && (
              <span
                className={
                  currentCandle.close >= currentCandle.open ? 'text-[#089981]' : 'text-[#f23645]'
                }
              >
                {(
                  ((currentCandle.close - currentCandle.open) / currentCandle.open) *
                  100
                ).toFixed(2)}
                %
              </span>
            )}
          </div>

          {/* Interactive SVG Chart Canvas */}
          <div
            className="flex-1 relative w-full h-full min-h-[380px] cursor-crosshair select-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setHoverCoord({ x, y });
              // Map x to candle index
              const candleWidth = rect.width / candles.length;
              const idx = Math.min(Math.max(0, Math.floor(x / candleWidth)), candles.length - 1);
              setHoveredIndex(idx);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setHoverCoord(null);
            }}
          >
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Background Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((pct) => (
                <line
                  key={pct}
                  x1="0"
                  x2="100%"
                  y1={`${pct * 100}%`}
                  y2={`${pct * 100}%`}
                  stroke="#171b26"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Bollinger Bands Overlay if enabled */}
              {showBollinger && (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = (i + 0.5) * (100 / candles.length);
                      const yTop = getY(c.close * 1.018);
                      return `${i === 0 ? 'M' : 'L'} ${x}% ${yTop}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962ff"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              )}

              {/* EMA Line Overlay if enabled */}
              {showEMA && (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = (i + 0.5) * (100 / candles.length);
                      const y = getY(c.close * (1 + Math.sin(i / 5) * 0.003));
                      return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="2"
                />
              )}

              {/* Volume Bars at Bottom */}
              {showVolume &&
                candles.map((c, i) => {
                  const xPct = (i / candles.length) * 100;
                  const barWidthPct = (100 / candles.length) * 0.65;
                  const isUp = c.close >= c.open;
                  const maxVol = Math.max(...candles.map((k) => k.volume));
                  const vHeight = (c.volume / maxVol) * 60;
                  return (
                    <rect
                      key={`vol-${i}`}
                      x={`${xPct}%`}
                      y={chartHeight - vHeight}
                      width={`${barWidthPct}%`}
                      height={vHeight}
                      fill={isUp ? '#089981' : '#f23645'}
                      fillOpacity="0.25"
                    />
                  );
                })}

              {/* Main Candlesticks / Line Chart */}
              {chartType === 'candles' &&
                candles.map((c, i) => {
                  const xPct = (i / candles.length) * 100;
                  const barWidthPct = (100 / candles.length) * 0.65;
                  const centerX = xPct + barWidthPct / 2;
                  const isUp = c.close >= c.open;
                  const color = isUp ? '#089981' : '#f23645';

                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);
                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);

                  return (
                    <g key={i}>
                      {/* High-Low Wick */}
                      <line
                        x1={`${centerX}%`}
                        x2={`${centerX}%`}
                        y1={yHigh}
                        y2={yLow}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      {/* Candle Body */}
                      <rect
                        x={`${xPct}%`}
                        y={bodyTop}
                        width={`${barWidthPct}%`}
                        height={bodyHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {chartType === 'line' && (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = (i + 0.5) * (100 / candles.length);
                      const y = getY(c.close);
                      return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="2.5"
                />
              )}

              {chartType === 'area' && (
                <g>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2962ff" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${candles
                      .map((c, i) => {
                        const x = (i + 0.5) * (100 / candles.length);
                        const y = getY(c.close);
                        return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
                      })
                      .join(' ')} L 100% ${chartHeight} L 0% ${chartHeight} Z`}
                    fill="url(#areaGradient)"
                  />
                  <path
                    d={candles
                      .map((c, i) => {
                        const x = (i + 0.5) * (100 / candles.length);
                        const y = getY(c.close);
                        return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#2962ff"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* Current Price Beacon Line */}
              {candles.length > 0 && (
                <g>
                  <line
                    x1="0"
                    x2="100%"
                    y1={getY(selectedTicker.price)}
                    y2={getY(selectedTicker.price)}
                    stroke={selectedTicker.change >= 0 ? '#089981' : '#f23645'}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <circle
                    cx="99%"
                    cy={getY(selectedTicker.price)}
                    r="4"
                    fill={selectedTicker.change >= 0 ? '#089981' : '#f23645'}
                    className="animate-ping"
                  />
                </g>
              )}

              {/* Interactive Crosshair when mouse hovers */}
              {hoverCoord && (
                <g>
                  <line
                    x1={hoverCoord.x}
                    x2={hoverCoord.x}
                    y1="0"
                    y2="100%"
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="0"
                    x2="100%"
                    y1={hoverCoord.y}
                    y2={hoverCoord.y}
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </g>
              )}
            </svg>

            {/* Right Y-Axis Price Label */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-[#131722]/80 border-l border-[#1e222d] flex flex-col justify-between py-6 px-1 text-[11px] font-mono text-[#787b86] select-none pointer-events-none">
              <span>{maxPrice.toFixed(selectedTicker.decimals)}</span>
              <span>{((maxPrice + minPrice) / 2).toFixed(selectedTicker.decimals)}</span>
              <span>{minPrice.toFixed(selectedTicker.decimals)}</span>

              {/* Current Price Badge on Axis */}
              <div
                className={`absolute right-0 px-2 py-0.5 rounded-l text-[11px] font-bold text-white shadow-md tabular-nums transition-all ${
                  selectedTicker.change >= 0 ? 'bg-[#089981]' : 'bg-[#f23645]'
                }`}
                style={{
                  top: `${Math.min(Math.max(10, getY(selectedTicker.price)), chartHeight - 25)}px`,
                }}
              >
                {selectedTicker.price.toFixed(selectedTicker.decimals)}
              </div>
            </div>
          </div>

          {/* Sub-Pane for RSI if active */}
          {showRSI && (
            <div className="h-28 border-t border-[#1e222d] bg-[#0c0f17] p-2 relative">
              <div className="text-[11px] font-bold text-[#787b86] flex items-center space-x-2">
                <span>RSI (14, Close)</span>
                <span className="text-purple-400 font-mono">56.24</span>
              </div>
              <svg className="w-full h-20" preserveAspectRatio="none">
                <line x1="0" x2="100%" y1="20" y2="20" stroke="#f23645" strokeDasharray="2 2" strokeWidth="0.8" />
                <line x1="0" x2="100%" y1="60" y2="60" stroke="#089981" strokeDasharray="2 2" strokeWidth="0.8" />
                <path
                  d="M0 45 Q 50 20, 100 35 T 200 65 T 300 30 T 400 50"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}

          {/* Trade Notification Toast */}
          {tradeMessage && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#1e222d] border border-[#2962ff] text-white px-4 py-2 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
              <span className="text-[#2962ff]">●</span>
              <span>{tradeMessage}</span>
            </div>
          )}
        </div>

        {/* Right Watchlist and Symbol Statistics */}
        <div className="w-72 bg-[#131722] border-l border-[#1e222d] flex flex-col shrink-0">
          <div className="p-3 border-b border-[#1e222d] flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Watchlist</span>
            <span className="text-[11px] text-[#787b86] font-mono tabular-nums">
              {tickers.length} Symbols
            </span>
          </div>

          {/* Watchlist tickers */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1e222d]/60">
            {tickers.map((t) => {
              const isSelected = t.id === selectedTicker.id;
              const isUp = t.change >= 0;
              return (
                <div
                  key={t.id}
                  onClick={() => onSelectTicker(t)}
                  className={`flex items-center justify-between p-2.5 px-3 hover:bg-[#1e222d] cursor-pointer transition ${
                    isSelected ? 'bg-[#1e222d] border-l-2 border-[#2962ff]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-white text-xs">{t.symbol}</span>
                      <span className="text-[10px] text-[#787b86] uppercase">{t.category}</span>
                    </div>
                    <div className="text-[11px] text-[#787b86] truncate max-w-[120px]">{t.name}</div>
                  </div>

                  <div className="text-right tabular-nums">
                    <div className="text-xs font-semibold text-white">
                      {t.price.toFixed(t.decimals)}
                    </div>
                    <div className={`text-[11px] font-medium ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isUp ? `+${t.changePercent.toFixed(2)}%` : `${t.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Technical Summary for Selected Symbol */}
          <div className="p-3.5 border-t border-[#1e222d] bg-[#0c0f17] text-xs space-y-2">
            <div className="flex justify-between text-[#787b86]">
              <span>Day's Range</span>
              <span className="text-white font-mono">
                {selectedTicker.low.toFixed(selectedTicker.decimals)} - {selectedTicker.high.toFixed(selectedTicker.decimals)}
              </span>
            </div>
            <div className="flex justify-between text-[#787b86]">
              <span>24h Volume</span>
              <span className="text-white font-mono">{selectedTicker.volume}</span>
            </div>
            <div className="flex justify-between text-[#787b86]">
              <span>Technical Rating</span>
              <span className="text-[#089981] font-bold">Strong Buy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel Drawer: Paper Trading, Pine Editor, Strategy Tester */}
      <div className="border-t border-[#1e222d] bg-[#131722] text-xs">
        {/* Tab Headers */}
        <div className="flex items-center justify-between px-4 border-b border-[#1e222d]">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setBottomTab(bottomTab === 'paper' ? null : 'paper')}
              className={`py-2 px-3 font-semibold transition border-b-2 cursor-pointer ${
                bottomTab === 'paper'
                  ? 'border-[#2962ff] text-white'
                  : 'border-transparent text-[#787b86] hover:text-white'
              }`}
            >
              Paper Trading (Virtual $100K)
            </button>
            <button
              onClick={() => setBottomTab(bottomTab === 'pine' ? null : 'pine')}
              className={`py-2 px-3 font-semibold transition border-b-2 cursor-pointer ${
                bottomTab === 'pine'
                  ? 'border-[#2962ff] text-white'
                  : 'border-transparent text-[#787b86] hover:text-white'
              }`}
            >
              Pine Editor
            </button>
            <button
              onClick={() => setBottomTab(bottomTab === 'strategy' ? null : 'strategy')}
              className={`py-2 px-3 font-semibold transition border-b-2 cursor-pointer ${
                bottomTab === 'strategy'
                  ? 'border-[#2962ff] text-white'
                  : 'border-transparent text-[#787b86] hover:text-white'
              }`}
            >
              Strategy Tester
            </button>
          </div>

          <div className="text-[11px] text-[#787b86] font-mono">
            Balance: <strong className="text-emerald-400">${accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        {/* Tab Content */}
        {bottomTab === 'paper' && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#0a0d14]">
            {/* Quick Order Entry Form */}
            <div className="bg-[#131722] p-4 rounded-xl border border-[#1e222d]">
              <div className="font-bold text-white mb-3 flex items-center justify-between">
                <span>Place Order • {selectedTicker.symbol}</span>
                <span className="text-[11px] text-[#787b86]">Market Execution</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-[#787b86] mb-1">Quantity / Shares</label>
                  <input
                    type="number"
                    min="1"
                    value={orderShares}
                    onChange={(e) => setOrderShares(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-3 py-1.5 font-mono focus:border-[#2962ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#787b86] mb-1">Order Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as any)}
                    className="w-full bg-[#1e222d] border border-[#2a2e39] text-white rounded-lg px-2 py-1.5 focus:border-[#2962ff] focus:outline-none"
                  >
                    <option value="MARKET">Market</option>
                    <option value="LIMIT">Limit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePlaceOrder('BUY')}
                  className="py-2.5 rounded-xl font-bold bg-[#089981] hover:bg-emerald-600 text-white transition shadow-sm cursor-pointer"
                >
                  BUY / LONG
                </button>
                <button
                  onClick={() => handlePlaceOrder('SELL')}
                  className="py-2.5 rounded-xl font-bold bg-[#f23645] hover:bg-rose-600 text-white transition shadow-sm cursor-pointer"
                >
                  SELL / SHORT
                </button>
              </div>
            </div>

            {/* Open Positions Table */}
            <div className="lg:col-span-2 bg-[#131722] p-4 rounded-xl border border-[#1e222d] overflow-x-auto">
              <div className="font-bold text-white mb-2">Open Positions ({positions.length})</div>
              {positions.length === 0 ? (
                <div className="py-6 text-center text-[#787b86]">No active positions. Execute a trade above.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[#787b86] border-b border-[#1e222d]">
                      <th className="pb-2">Symbol</th>
                      <th className="pb-2">Side</th>
                      <th className="pb-2">Qty</th>
                      <th className="pb-2">Entry</th>
                      <th className="pb-2">Last</th>
                      <th className="pb-2">Unrealized P&L</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e222d]/60 font-mono">
                    {positions.map((pos) => {
                      const isProfit = pos.pnl >= 0;
                      return (
                        <tr key={pos.id} className="hover:bg-[#1e222d]">
                          <td className="py-2 font-bold text-white">{pos.symbol}</td>
                          <td className="py-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                pos.side === 'BUY'
                                  ? 'bg-[#089981]/15 text-[#089981]'
                                  : 'bg-[#f23645]/15 text-[#f23645]'
                              }`}
                            >
                              {pos.side}
                            </span>
                          </td>
                          <td className="py-2">{pos.shares}</td>
                          <td className="py-2">${pos.entryPrice.toFixed(2)}</td>
                          <td className="py-2">${pos.currentPrice.toFixed(2)}</td>
                          <td className={`py-2 font-bold ${isProfit ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                            {isProfit ? `+$${pos.pnl.toFixed(2)}` : `-$${Math.abs(pos.pnl).toFixed(2)}`} ({pos.pnlPercent >= 0 ? `+${pos.pnlPercent.toFixed(2)}%` : `${pos.pnlPercent.toFixed(2)}%`})
                          </td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => handleClosePosition(pos.id)}
                              className="px-2 py-1 bg-[#1e222d] hover:bg-[#2a2e39] text-rose-400 rounded transition text-[11px]"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {bottomTab === 'pine' && (
          <div className="p-4 bg-[#0a0d14] flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#2962ff] font-bold">
                Pine Script® v5 Compiler
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-[#787b86]">{pineStatus}</span>
                <button
                  onClick={handleCompilePine}
                  className="px-4 py-1.5 bg-[#2962ff] hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-sm text-xs cursor-pointer"
                >
                  Save & Add to Chart
                </button>
              </div>
            </div>
            <textarea
              rows={4}
              value={pineCode}
              onChange={(e) => setPineCode(e.target.value)}
              className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-[#2962ff]"
            />
          </div>
        )}

        {bottomTab === 'strategy' && (
          <div className="p-4 bg-[#0a0d14] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#131722] p-3 rounded-xl border border-[#1e222d]">
              <div className="text-[11px] text-[#787b86]">Net Profit</div>
              <div className="text-base font-bold text-emerald-400 mt-1">+$18,450.20 (+18.45%)</div>
            </div>
            <div className="bg-[#131722] p-3 rounded-xl border border-[#1e222d]">
              <div className="text-[11px] text-[#787b86]">Win Rate</div>
              <div className="text-base font-bold text-white mt-1">68.4% (38/55)</div>
            </div>
            <div className="bg-[#131722] p-3 rounded-xl border border-[#1e222d]">
              <div className="text-[11px] text-[#787b86]">Profit Factor</div>
              <div className="text-base font-bold text-white mt-1">2.14</div>
            </div>
            <div className="bg-[#131722] p-3 rounded-xl border border-[#1e222d]">
              <div className="text-[11px] text-[#787b86]">Max Drawdown</div>
              <div className="text-base font-bold text-rose-400 mt-1">-4.82%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
