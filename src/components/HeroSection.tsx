import React, { useState } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { CategoryTab } from '../types';
import { CATEGORY_TABS } from '../data/marketData';

interface HeroSectionProps {
  activeTab: CategoryTab;
  onSelectTab: (tab: CategoryTab) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const REGIONS = [
  { id: 'global', label: 'Everywhere (Global)' },
  { id: 'us', label: 'United States' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia-Pacific' },
  { id: 'americas', label: 'Americas' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTab,
  onSelectTab,
  selectedRegion,
  onSelectRegion
}) => {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  return (
    <section className="pt-10 md:pt-12 pb-6 px-4 text-center max-w-5xl mx-auto" data-purpose="hero-title-section">
      {/* Main Display Heading with Dropdown */}
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
          className="group inline-flex items-center gap-3 text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight text-[#131722] hover:text-[#2962ff] transition-colors select-none focus:outline-none"
        >
          <span>
            {selectedRegion === 'global' ? 'Markets, everywhere' : `Markets, ${REGIONS.find(r => r.id === selectedRegion)?.label}`}
          </span>
          <ChevronDown
            className={`w-7 h-7 sm:w-8 sm:h-8 mt-1 text-[#131722] group-hover:text-[#2962ff] transition-transform duration-200 ${
              regionDropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
            strokeWidth={3}
          />
        </button>

        {/* Region Dropdown Menu */}
        {regionDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setRegionDropdownOpen(false)} 
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-[#e0e3eb] py-2 z-40 text-left">
              <div className="px-4 py-2 text-xs font-bold text-[#787b86] uppercase tracking-wider border-b border-[#e0e3eb]">
                Select Market Region
              </div>
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => {
                    onSelectRegion(region.id);
                    setRegionDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-[#131722] hover:bg-[#f0f3fa] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#787b86]" />
                    {region.label}
                  </span>
                  {selectedRegion === region.id && (
                    <Check className="w-4 h-4 text-[#2962ff]" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Horizontal Category Filter Pills */}
      <div 
        className="mt-8 flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2 text-sm font-medium" 
        data-purpose="category-pills"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              className={`px-4 py-2 rounded-full shrink-0 transition-all cursor-pointer select-none text-sm font-semibold ${
                isActive
                  ? 'bg-[#e0e3eb] text-[#131722] shadow-xs'
                  : 'bg-transparent hover:bg-[#f0f3fa] text-[#787b86] hover:text-[#131722]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </section>
  );
};
