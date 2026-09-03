import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types';

interface MarketCardProps {
  title: string;
  badgeTag?: string;
  items: MarketItem[];
  footerActionText?: string;
  onHeaderClick?: () => void;
  onFooterAction?: () => void;
  onSelectItem: (item: MarketItem) => void;
  flashingItems?: Record<string, 'up' | 'down'>;
  hideBadge?: boolean;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  title,
  badgeTag,
  items,
  footerActionText,
  onHeaderClick,
  onFooterAction,
  onSelectItem,
  flashingItems = {},
  hideBadge = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e0e3eb] p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e0e3eb]">
          <button
            type="button"
            onClick={onHeaderClick || onFooterAction}
            className="group inline-flex items-center text-xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer text-left"
          >
            <span>{title}</span>
            <ChevronRight className="w-4 h-4 ml-1 text-[#131722] group-hover:text-[#2962ff] transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </button>
          {badgeTag && (
            <span className="text-xs font-medium text-[#787b86] uppercase tracking-wider">
              {badgeTag}
            </span>
          )}
        </div>

        {/* Symbols List */}
        <div className="divide-y divide-[#e0e3eb]">
          {items.map((item) => {
            const isUp = item.changePercent > 0;
            const isNeutral = item.changePercent === 0;
            const flash = flashingItems[item.id];

            // Format price string with commas and decimals
            const formattedPrice = item.price >= 1000 
              ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : item.price < 1 && item.price > 0
              ? item.price.toFixed(4)
              : item.price.toFixed(2);

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItem(item);
                  }
                }}
                className={`flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg hover:bg-[#f0f3fa] transition-colors cursor-pointer group select-none ${
                  flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {/* Item Badge / Avatar Icon */}
                  {!hideBadge && item.badgeText && (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                        item.badgeBg || 'bg-gray-100'
                      } ${item.badgeTextColor || 'text-gray-800'}`}
                    >
                      {item.badgeText}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff] transition-colors truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#787b86] font-medium truncate">
                      {item.volume && !item.symbol.includes(item.volume) ? (
                        <span>{item.symbol} · {item.volume}</span>
                      ) : (
                        <span>
                          {item.symbol} · {item.marketCap || item.exchange}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-sm text-[#131722]">
                    {formattedPrice} {item.currency ? item.currency : ''}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isUp
                        ? 'text-[#089981]'
                        : isNeutral
                        ? 'text-[#787b86]'
                        : 'text-[#f23645]'
                    }`}
                  >
                    {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      {footerActionText && (
        <div className="mt-4 pt-3 border-t border-[#e0e3eb] text-center">
          <button
            type="button"
            onClick={onFooterAction || onHeaderClick}
            className="text-xs font-semibold text-[#2962ff] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{footerActionText}</span>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
};
