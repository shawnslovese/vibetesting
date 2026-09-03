import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { MarketItem, MarketIndexItem, AssetClass } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: (MarketItem | MarketIndexItem)[];
  onSelectItem: (item: MarketItem | MarketIndexItem) => void;
}

type SearchFilter = 'all' | 'stocks' | 'crypto' | 'forex' | 'indices';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allItems,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchFilter>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = allItems.filter((item) => {
    const isIndex = 'code' in item;
    const symbol = isIndex ? (item as MarketIndexItem).code : (item as MarketItem).symbol;
    const name = item.name;
    const assetClass: AssetClass = isIndex ? 'indices' : (item as MarketItem).assetClass;

    if (activeFilter !== 'all') {
      if (activeFilter === 'stocks' && assetClass !== 'stocks') return false;
      if (activeFilter === 'crypto' && assetClass !== 'crypto') return false;
      if (activeFilter === 'forex' && assetClass !== 'forex' && assetClass !== 'futures') return false;
      if (activeFilter === 'indices' && assetClass !== 'indices') return false;
    }

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    return symbol.toLowerCase().includes(q) || name.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] overflow-hidden z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[75vh]">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e0e3eb]">
          <Search className="w-5 h-5 text-[#787b86] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, crypto, or forex..."
            className="w-full bg-transparent text-base text-[#131722] placeholder-[#787b86] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#787b86] hover:text-[#131722] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-semibold text-[#787b86] px-2 py-0.5 rounded border border-[#e0e3eb] bg-[#f0f3fa]">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#e0e3eb] bg-[#fafbfc] overflow-x-auto scrollbar-none">
          {(['all', 'stocks', 'crypto', 'forex', 'indices'] as SearchFilter[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 transition-colors ${
                activeFilter === tab
                  ? 'bg-[#131722] text-white'
                  : 'bg-white text-[#787b86] hover:bg-[#f0f3fa] border border-[#e0e3eb]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#e0e3eb] flex-1 p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#787b86]">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-400 opacity-60" />
              <p className="text-sm font-semibold">No symbols found for "{query}"</p>
              <p className="text-xs text-gray-500 mt-1">Try searching NVDA, Bitcoin, S&P 500, or EURUSD</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isIndex = 'code' in item;
              const symbol = isIndex ? (item as MarketIndexItem).code : (item as MarketItem).symbol;
              const price = isIndex ? (item as MarketIndexItem).value : (item as MarketItem).price;
              const isUp = item.changePercent >= 0;

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f0f3fa] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-800">
                      {isIndex ? (item as MarketIndexItem).badge : (item as MarketItem).badgeText || symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] group-hover:text-[#2962ff]">
                          {symbol}
                        </span>
                        <span className="text-[11px] font-medium text-[#787b86] uppercase">
                          {isIndex ? 'INDEX' : (item as MarketItem).exchange}
                        </span>
                      </div>
                      <div className="text-xs text-[#787b86] truncate max-w-xs">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-[#131722]">
                      {price >= 1000 ? price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : price.toFixed(2)}
                    </div>
                    <div className={`text-xs font-semibold ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom note */}
        <div className="px-4 py-2.5 bg-[#fafbfc] border-t border-[#e0e3eb] flex items-center justify-between text-xs text-[#787b86]">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#2962ff]" />
            Real-time market quote lookup
          </span>
          <span>Click any symbol to view interactive chart</span>
        </div>
      </div>
    </div>
  );
};
