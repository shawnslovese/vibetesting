import React, { useState, useMemo } from 'react';
import { X, ArrowUpRight, ArrowDownRight, Bookmark, Bell, ExternalLink, Activity, BarChart2 } from 'lucide-react';
import { MarketItem, MarketIndexItem } from '../types';

interface SymbolDetailModalProps {
  item: MarketItem | MarketIndexItem | null;
  onClose: () => void;
}

type TimeFrame = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({ item, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('1D');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!item) return null;

  const isIndex = 'code' in item;
  const symbol = isIndex ? (item as MarketIndexItem).code : (item as MarketItem).symbol;
  const name = item.name;
  const price = isIndex ? (item as MarketIndexItem).value : (item as MarketItem).price;
  const changePercent = item.changePercent;
  const change = item.change;
  const isUp = changePercent >= 0;
  const currency = isIndex ? 'USD' : ((item as MarketItem).currency || 'USD');

  // Generate responsive chart points based on base price and selected timeframe
  const chartPoints = useMemo(() => {
    const pointsCount = selectedTimeframe === '1D' ? 24 : selectedTimeframe === '5D' ? 30 : selectedTimeframe === '1M' ? 30 : 50;
    const base = price;
    const volatility = isIndex ? 0.008 : 0.02;
    const points: number[] = [];
    
    let current = base * (1 - (changePercent / 100));
    for (let i = 0; i < pointsCount; i++) {
      const step = (base - current) / (pointsCount - i);
      const noise = (Math.random() - 0.48) * (base * volatility);
      current = Math.max(current + step + noise, base * 0.7);
      points.push(current);
    }
    // ensure last point equals current price
    points[points.length - 1] = price;
    return points;
  }, [price, changePercent, selectedTimeframe, isIndex]);

  // SVG Chart Calculation
  const minVal = Math.min(...chartPoints) * 0.998;
  const maxVal = Math.max(...chartPoints) * 1.002;
  const range = maxVal - minVal || 1;

  const width = 680;
  const height = 240;
  const padding = 20;

  const coords = chartPoints.map((val, idx) => {
    const x = padding + (idx / (chartPoints.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x, y, val };
  });

  const pathD = coords.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const activePoint = hoveredIndex !== null ? coords[hoveredIndex] : coords[coords.length - 1];
  const activePrice = activePoint ? activePoint.val : price;

  const strokeColor = isUp ? '#089981' : '#f23645';
  const fillColor = isUp ? 'rgba(8, 153, 129, 0.12)' : 'rgba(242, 54, 69, 0.12)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e3eb] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {'badge' in item ? (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: (item as MarketIndexItem).badgeColor }}
              >
                {(item as MarketIndexItem).badge}
              </div>
            ) : (
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                  (item as MarketItem).badgeBg || 'bg-gray-100'
                } ${(item as MarketItem).badgeTextColor || 'text-gray-800'}`}
              >
                {(item as MarketItem).badgeText || symbol.slice(0, 2)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-[#131722]">{symbol}</span>
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#f0f3fa] text-[#787b86]">
                  {isIndex ? 'INDEX' : (item as MarketItem).exchange}
                </span>
              </div>
              <div className="text-xs text-[#787b86] font-medium">{name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isWatchlisted 
                  ? 'bg-blue-50 border-blue-200 text-[#2962ff]' 
                  : 'border-[#e0e3eb] text-[#787b86] hover:bg-[#f0f3fa]'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Price Header */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#131722] tracking-tight">
                {activePrice >= 1000 
                  ? activePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : activePrice.toFixed(activePrice < 2 ? 4 : 2)}{' '}
                <span className="text-lg font-semibold text-[#787b86]">{currency}</span>
              </div>
              <div 
                className={`text-sm font-semibold flex items-center gap-1 mt-1 ${
                  isUp ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>
                  {isUp ? `+${change.toFixed(2)}` : change.toFixed(2)} ({isUp ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}) Today
                </span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-[#f0f3fa] p-1 rounded-xl text-xs font-semibold">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as TimeFrame[]).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedTimeframe === tf 
                      ? 'bg-white text-[#131722] shadow-2xs' 
                      : 'text-[#787b86] hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="border border-[#e0e3eb] rounded-2xl p-4 bg-white shadow-2xs">
            <div className="flex items-center justify-between pb-2 text-xs text-[#787b86]">
              <span className="font-semibold flex items-center gap-1 text-[#131722]">
                <Activity className="w-3.5 h-3.5 text-[#2962ff]" />
                Interactive Superchart Preview
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setChartType('area')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${chartType === 'area' ? 'bg-[#e0e3eb] text-[#131722]' : 'text-[#787b86]'}`}
                >
                  Area
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('line')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${chartType === 'line' ? 'bg-[#e0e3eb] text-[#131722]' : 'text-[#787b86]'}`}
                >
                  Line
                </button>
              </div>
            </div>

            <div className="relative w-full h-56">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-full overflow-visible"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Grid horizontal lines */}
                {[0.25, 0.5, 0.75].map((fraction) => {
                  const y = padding + fraction * (height - padding * 2);
                  return (
                    <line 
                      key={fraction} 
                      x1={padding} 
                      y1={y} 
                      x2={width - padding} 
                      y2={y} 
                      stroke="#f0f3fa" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                    />
                  );
                })}

                {/* Area Gradient */}
                {chartType === 'area' && (
                  <path d={areaD} fill={fillColor} />
                )}

                {/* Main line */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={strokeColor} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Hoverable trigger areas */}
                {coords.map((c, i) => (
                  <circle
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    r={hoveredIndex === i ? 6 : 4}
                    fill={strokeColor}
                    stroke="#ffffff"
                    strokeWidth={hoveredIndex === i ? 2.5 : 0}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredIndex(i)}
                  />
                ))}

                {/* Active crosshair vertical line */}
                {hoveredIndex !== null && activePoint && (
                  <line 
                    x1={activePoint.x} 
                    y1={padding} 
                    x2={activePoint.x} 
                    y2={height - padding} 
                    stroke="#787b86" 
                    strokeWidth="1" 
                    strokeDasharray="3 3" 
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div>
            <h4 className="text-sm font-bold text-[#131722] mb-3">Key Statistics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <div className="text-xs text-[#787b86]">Day's High</div>
                <div className="text-sm font-bold text-[#131722] mt-0.5">
                  {((item as MarketItem).high24h || price * 1.01).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <div className="text-xs text-[#787b86]">Day's Low</div>
                <div className="text-sm font-bold text-[#131722] mt-0.5">
                  {((item as MarketItem).low24h || price * 0.99).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <div className="text-xs text-[#787b86]">Volume</div>
                <div className="text-sm font-bold text-[#131722] mt-0.5">
                  {(item as MarketItem).volume || '38.4M'}
                </div>
              </div>
              <div className="p-3 bg-[#f0f3fa] rounded-xl">
                <div className="text-xs text-[#787b86]">Market Cap</div>
                <div className="text-sm font-bold text-[#131722] mt-0.5">
                  {(item as MarketItem).marketCap || '1.82 T'}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Summary Gauge */}
          <div className="p-4 border border-[#e0e3eb] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#787b86] uppercase tracking-wider">TradingView Technicals</div>
              <div className="text-base font-bold text-[#131722] mt-0.5">Summary Rating: {isUp ? 'Strong Buy' : 'Neutral'}</div>
              <div className="text-xs text-[#787b86] mt-0.5">Based on 26 technical indicators (oscillators & moving averages)</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center px-3 py-1.5 rounded-lg bg-red-50 text-[#f23645]">
                <div className="text-xs font-bold">Sell</div>
                <div className="text-sm font-extrabold">3</div>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-gray-100 text-[#787b86]">
                <div className="text-xs font-bold">Neutral</div>
                <div className="text-sm font-extrabold">8</div>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-emerald-50 text-[#089981]">
                <div className="text-xs font-bold">Buy</div>
                <div className="text-sm font-extrabold">15</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#e0e3eb] bg-[#fafbfc] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#787b86] hover:text-[#131722]"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Alert set for ${symbol} at $${price}`)}
              className="px-4 py-2 text-xs font-semibold text-[#131722] bg-white border border-[#e0e3eb] hover:bg-[#f0f3fa] rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5" />
              Set Alert
            </button>
            <button
              type="button"
              onClick={() => alert(`Opening Supercharts for ${symbol}...`)}
              className="tv-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Launch Superchart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
