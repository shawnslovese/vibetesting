import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#e0e3eb] bg-[#fafbfc] text-[#787b86] text-xs">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10">
        {/* Footer Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-[#e0e3eb]">
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Products</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#products">Supercharts</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#pine">Pine Script®</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#screener">Stock Screener</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#etf">ETF Screener</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#crypto">Crypto Screener</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Markets</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#indices">Indices</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#us-stocks">US Stocks</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#world-stocks">World Stocks</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#crypto">Crypto</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#forex">Forex</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Community</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#ideas">Ideas</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#scripts">Scripts</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#rules">House Rules</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#moderators">Moderators</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Calendars</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#calendar-economic">Economic Calendar</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#calendar-earnings">Earnings Calendar</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#dividends">Dividends</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#ipo">IPO Calendar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#about">About</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#features">Features</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#pricing">Pricing</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#131722] text-sm mb-3">Business</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#widgets">Widgets</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#libraries">Charting libraries</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#lightweight">Lightweight Charts™</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#brokerage">Brokerage integration</a></li>
            </ul>
          </div>
        </div>

        {/* Legal and Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#131722] fill-current" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm15 0h-7V0h7v22z" fill="currentColor"></path>
            </svg>
            <span className="text-[#131722] font-semibold">TradingView</span>
            <span>· Made by humans</span>
          </div>
          <p className="text-center md:text-right text-[11px] text-[#787b86]">
            Select market data provided by ICE Data Services & FactSet. © 2026 TradingView, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
