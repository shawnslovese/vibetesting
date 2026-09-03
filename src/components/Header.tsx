import React from 'react';
import { Search, Globe, User, Radio, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  isLiveActive: boolean;
  onToggleLive: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  isLiveActive,
  onToggleLive,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e0e3eb]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left side: Brand Logo & Global Search */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* TradingView Logo Icon ('17' monogram) */}
          <button 
            type="button"
            aria-label="TradingView Home" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 focus:outline-none hover:opacity-85 transition-opacity"
          >
            <svg 
              className="w-8 h-8 text-black fill-current" 
              viewBox="0 0 36 28" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V6h7v16zm15 0h-7V0h7v22z" fill="currentColor"></path>
              <path d="M0 22h7v6H0v-6zm29 0h7v6h-7v-6z" fill="currentColor"></path>
            </svg>
          </button>

          {/* Global Search Input Pill (clickable to open search dialog) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="relative hidden sm:flex items-center w-52 md:w-64 bg-[#f0f3fa] hover:bg-[#e7ecf5] text-sm text-[#787b86] rounded-full pl-10 pr-3 py-2 text-left transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2962ff]"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#787b86] group-hover:text-[#131722]">
              <Search className="w-4 h-4" />
            </div>
            <span className="truncate">Search</span>
            <kbd className="ml-auto hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-medium text-[#787b86] bg-white rounded border border-[#e0e3eb]">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium">
          <a href="#products" className="text-[#131722] hover:text-[#2962ff] transition-colors">
            Products
          </a>
          <a href="#community" className="text-[#131722] hover:text-[#2962ff] transition-colors">
            Community
          </a>
          <a href="#markets" className="text-[#2962ff] font-semibold flex items-center gap-1">
            Markets
            <span className="w-1.5 h-1.5 rounded-full bg-[#2962ff]"></span>
          </a>
          <a href="#brokers" className="text-[#131722] hover:text-[#2962ff] transition-colors">
            Brokers
          </a>
          <a href="#more" className="text-[#131722] hover:text-[#2962ff] transition-colors">
            More
          </a>
        </nav>

        {/* Right side: Live Ticker Toggle, Language, User Profile, CTA Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile search button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="sm:hidden p-2 text-[#131722] hover:bg-[#f0f3fa] rounded-full transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Live Quotes Stream Indicator / Toggle */}
          <button
            type="button"
            onClick={onToggleLive}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors border ${
              isLiveActive
                ? 'bg-emerald-50 text-[#089981] border-emerald-200'
                : 'bg-gray-50 text-gray-500 border-gray-200'
            }`}
            title="Toggle simulated live price updates"
          >
            <span className="relative flex h-2 w-2">
              {isLiveActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveActive ? 'bg-[#089981]' : 'bg-gray-400'}`}></span>
            </span>
            <span>{isLiveActive ? 'Live Market' : 'Paused'}</span>
          </button>

          {/* Language Selector */}
          <button
            type="button"
            aria-label="Change Language"
            className="flex items-center gap-1 text-sm font-semibold text-[#131722] hover:text-[#2962ff] py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#131722]" />
            <span className="text-sm font-semibold tracking-wide">EN</span>
          </button>

          {/* User Profile Avatar Placeholder */}
          <button
            type="button"
            onClick={onOpenAuth}
            aria-label="User profile"
            className="p-1.5 text-[#131722] hover:bg-[#f0f3fa] rounded-full transition-colors cursor-pointer"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Get Started CTA Button */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="tv-btn-gradient text-white text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all inline-flex items-center justify-center cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#131722] hover:bg-[#f0f3fa] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e0e3eb] bg-white px-4 py-3 space-y-2">
          <button 
            type="button"
            onClick={onToggleLive}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg bg-[#f0f3fa]"
          >
            <span>Live Price Feed</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isLiveActive ? 'bg-emerald-100 text-[#089981]' : 'bg-gray-200 text-gray-600'}`}>
              {isLiveActive ? 'Active' : 'Paused'}
            </span>
          </button>
          <a href="#markets" className="block px-3 py-2 text-[#2962ff] font-semibold rounded-lg bg-blue-50">
            Markets
          </a>
          <a href="#products" className="block px-3 py-2 text-[#131722] font-medium hover:bg-[#f0f3fa] rounded-lg">
            Products
          </a>
          <a href="#community" className="block px-3 py-2 text-[#131722] font-medium hover:bg-[#f0f3fa] rounded-lg">
            Community
          </a>
          <a href="#brokers" className="block px-3 py-2 text-[#131722] font-medium hover:bg-[#f0f3fa] rounded-lg">
            Brokers
          </a>
        </div>
      )}
    </header>
  );
};
