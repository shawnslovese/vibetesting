import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MarketIndexItem } from '../types';

interface IndicesOverviewProps {
  indices: MarketIndexItem[];
  onSelectIndex: (index: MarketIndexItem) => void;
  onViewAllIndices: () => void;
  flashingItems?: Record<string, 'up' | 'down'>;
}

export const IndicesOverview: React.FC<IndicesOverviewProps> = ({
  indices,
  onSelectIndex,
  onViewAllIndices,
  flashingItems = {}
}) => {
  // Show top 3 benchmark indices for the cards
  const topIndices = indices.slice(0, 3);

  return (
    <section data-purpose="major-indices-cards">
      {/* Section Title with Chevron */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onViewAllIndices}
          className="group inline-flex items-center text-2xl sm:text-3xl font-bold tracking-tight text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>Indices</span>
          <ChevronRight className="w-6 h-6 ml-1.5 text-[#131722] group-hover:text-[#2962ff] transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={onViewAllIndices}
          className="text-xs font-semibold text-[#787b86] hover:text-[#2962ff] transition-colors"
        >
          View all {indices.length} indices
        </button>
      </div>

      {/* Top Benchmark Index Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topIndices.map((idx, indexOrder) => {
          const isUp = idx.changePercent >= 0;
          const flash = flashingItems[idx.id];
          const isFirstCard = indexOrder === 0;

          return (
            <div
              key={idx.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectIndex(idx);
                }
              }}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group cursor-pointer ${
                isFirstCard
                  ? 'bg-[#f0f3fa] hover:bg-[#e7ecf5]'
                  : 'bg-white border border-[#e0e3eb] hover:border-gray-300 hover:bg-[#f8f9fd]'
              } ${flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                {/* Badge (500 in red, 100 in cyan, 30 in teal) */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black tracking-tighter shadow-sm shrink-0"
                  style={{ backgroundColor: idx.badgeColor }}
                >
                  {idx.badge}
                </div>
                <div>
                  <div className="text-base font-bold text-[#131722] group-hover:text-[#2962ff] transition-colors">
                    {idx.name}
                  </div>
                  <div className="text-xs text-[#787b86] font-medium">
                    {idx.code}
                  </div>
                </div>
              </div>

              {/* Quote & Sparkline preview */}
              <div className="text-right">
                <div className="text-base font-bold text-[#131722]">
                  {idx.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div 
                  className={`text-xs font-semibold inline-flex items-center gap-0.5 ${
                    isUp ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  <span>{isUp ? `+${idx.changePercent.toFixed(2)}%` : `${idx.changePercent.toFixed(2)}%`}</span>
                  {isUp ? (
                    <ArrowUpRight className="w-3.5 h-3.5 inline" strokeWidth={2.5} />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 inline" strokeWidth={2.5} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
