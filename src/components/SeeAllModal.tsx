import React, { useState, useMemo } from 'react';
import { X, ArrowUpDown, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import { MarketItem, MarketIndexItem } from '../types';

interface SeeAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: (MarketItem | MarketIndexItem)[];
  onSelectItem: (item: MarketItem | MarketIndexItem) => void;
}

export const SeeAllModal: React.FC<SeeAllModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelectItem
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'price' | 'changePercent'>('changePercent');
  const [sortAsc, setSortAsc] = useState(false);

  const processedItems = useMemo(() => {
    let list = items.filter((item) => {
      const isIndex = 'code' in item;
      const symbol = isIndex ? (item as MarketIndexItem).code : (item as MarketItem).symbol;
      const name = item.name;
      const q = filterQuery.toLowerCase();
      return symbol.toLowerCase().includes(q) || name.toLowerCase().includes(q);
    });

    list.sort((a, b) => {
      const isIndexA = 'code' in a;
      const isIndexB = 'code' in b;
      const priceA = isIndexA ? (a as MarketIndexItem).value : (a as MarketItem).price;
      const priceB = isIndexB ? (b as MarketIndexItem).value : (b as MarketItem).price;

      if (sortField === 'name') {
        const res = a.name.localeCompare(b.name);
        return sortAsc ? res : -res;
      }
      if (sortField === 'price') {
        return sortAsc ? priceA - priceB : priceB - priceA;
      }
      if (sortField === 'changePercent') {
        return sortAsc ? a.changePercent - b.changePercent : b.changePercent - a.changePercent;
      }
      return 0;
    });

    return list;
  }, [items, filterQuery, sortField, sortAsc]);

  if (!isOpen) return null;

  const toggleSort = (field: 'name' | 'price' | 'changePercent') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e3eb] bg-white">
          <div>
            <h3 className="font-extrabold text-xl text-[#131722]">{title}</h3>
            <p className="text-xs text-[#787b86]">Total {items.length} instruments available</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Input */}
        <div className="p-4 border-b border-[#e0e3eb] bg-[#fafbfc]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#787b86] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by symbol or company name..."
              className="w-full bg-white text-sm text-[#131722] placeholder-[#787b86] pl-10 pr-4 py-2 rounded-xl border border-[#e0e3eb] focus:outline-none focus:ring-2 focus:ring-[#2962ff]"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#f0f3fa] text-xs font-semibold text-[#787b86] sticky top-0 z-10">
              <tr>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-[#131722]"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Symbol / Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  onClick={() => toggleSort('price')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#131722]"
                  onClick={() => toggleSort('changePercent')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">
                  Volume / Cap
                </th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e3eb]">
              {processedItems.map((item) => {
                const isIndex = 'code' in item;
                const symbol = isIndex ? (item as MarketIndexItem).code : (item as MarketItem).symbol;
                const price = isIndex ? (item as MarketIndexItem).value : (item as MarketItem).price;
                const isUp = item.changePercent >= 0;
                const currency = isIndex ? 'USD' : ((item as MarketItem).currency || 'USD');

                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="hover:bg-[#f0f3fa] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {'badge' in item ? (
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                            style={{ backgroundColor: (item as MarketIndexItem).badgeColor }}
                          >
                            {(item as MarketIndexItem).badge}
                          </div>
                        ) : (
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              (item as MarketItem).badgeBg || 'bg-gray-100'
                            } ${(item as MarketItem).badgeTextColor || 'text-gray-800'}`}
                          >
                            {(item as MarketItem).badgeText || symbol.slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-[#131722] group-hover:text-[#2962ff]">
                            {symbol}
                          </div>
                          <div className="text-xs text-[#787b86] truncate max-w-xs">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#131722]">
                      {price >= 1000 ? price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-[#787b86]">{currency}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-bold ${
                          isUp ? 'bg-emerald-50 text-[#089981]' : 'bg-rose-50 text-[#f23645]'
                        }`}
                      >
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {isUp ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#787b86] hidden sm:table-cell">
                      {'marketCap' in item ? (item as MarketItem).marketCap || (item as MarketItem).volume || '—' : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-xs font-semibold text-[#2962ff] group-hover:underline">
                        View Chart
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
