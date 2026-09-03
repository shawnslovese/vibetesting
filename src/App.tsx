import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesOverview } from './components/IndicesOverview';
import { MarketCard } from './components/MarketCard';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import { SeeAllModal } from './components/SeeAllModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { CategoryTab, MarketItem, MarketIndexItem } from './types';
import {
  INITIAL_INDICES,
  INITIAL_US_STOCKS,
  INITIAL_VOLUME_STOCKS,
  INITIAL_CRYPTO,
  INITIAL_FOREX_COMMODITIES,
  WORLD_STOCKS,
  GOV_BONDS,
  ETFS_DATA,
  ECONOMY_DATA
} from './data/marketData';

export default function App() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('US stocks');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [isLiveActive, setIsLiveActive] = useState(true);

  // Live state
  const [indices, setIndices] = useState<MarketIndexItem[]>(INITIAL_INDICES);
  const [usStocks, setUsStocks] = useState<MarketItem[]>(INITIAL_US_STOCKS);
  const [volumeStocks, setVolumeStocks] = useState<MarketItem[]>(INITIAL_VOLUME_STOCKS);
  const [cryptos, setCryptos] = useState<MarketItem[]>(INITIAL_CRYPTO);
  const [forexCommodities, setForexCommodities] = useState<MarketItem[]>(INITIAL_FOREX_COMMODITIES);

  // Flash state for micro price tick animation
  const [flashingItems, setFlashingItems] = useState<Record<string, 'up' | 'down'>>({});

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MarketItem | MarketIndexItem | null>(null);

  // "See All" modal state
  const [seeAllConfig, setSeeAllConfig] = useState<{
    isOpen: boolean;
    title: string;
    items: (MarketItem | MarketIndexItem)[];
  }>({
    isOpen: false,
    title: '',
    items: []
  });

  // Simulated Live Price Engine
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      // Pick random category to update
      const bucket = Math.floor(Math.random() * 5);
      const isUp = Math.random() > 0.48;
      const deltaPercent = (Math.random() * 0.25 + 0.05) * (isUp ? 1 : -1);

      if (bucket === 0) {
        // Update an index
        setIndices(prev => {
          const idxToUpdate = Math.floor(Math.random() * prev.length);
          const target = prev[idxToUpdate];
          const newPrice = target.value * (1 + deltaPercent / 100);
          const newChange = target.change + (newPrice - target.value);
          const newChangePct = target.changePercent + deltaPercent;

          setFlashingItems(f => ({ ...f, [target.id]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setFlashingItems(f => {
              const copy = { ...f };
              delete copy[target.id];
              return copy;
            });
          }, 1000);

          return prev.map((item, i) =>
            i === idxToUpdate
              ? {
                  ...item,
                  value: Math.round(newPrice * 100) / 100,
                  change: Math.round(newChange * 100) / 100,
                  changePercent: Math.round(newChangePct * 100) / 100
                }
              : item
          );
        });
      } else if (bucket === 1) {
        // Update US Stocks
        setUsStocks(prev => {
          const idxToUpdate = Math.floor(Math.random() * prev.length);
          const target = prev[idxToUpdate];
          const newPrice = target.price * (1 + deltaPercent / 100);
          const newChange = target.change + (newPrice - target.price);
          const newChangePct = target.changePercent + deltaPercent;

          setFlashingItems(f => ({ ...f, [target.id]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setFlashingItems(f => {
              const copy = { ...f };
              delete copy[target.id];
              return copy;
            });
          }, 1000);

          return prev.map((item, i) =>
            i === idxToUpdate
              ? {
                  ...item,
                  price: Math.round(newPrice * 100) / 100,
                  change: Math.round(newChange * 100) / 100,
                  changePercent: Math.round(newChangePct * 100) / 100
                }
              : item
          );
        });
      } else if (bucket === 2) {
        // Update Crypto
        setCryptos(prev => {
          const idxToUpdate = Math.floor(Math.random() * prev.length);
          const target = prev[idxToUpdate];
          if (target.symbol === 'USDTUSD') return prev; // stablecoin
          const newPrice = target.price * (1 + deltaPercent / 100);
          const newChange = target.change + (newPrice - target.price);
          const newChangePct = target.changePercent + deltaPercent;

          setFlashingItems(f => ({ ...f, [target.id]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setFlashingItems(f => {
              const copy = { ...f };
              delete copy[target.id];
              return copy;
            });
          }, 1000);

          return prev.map((item, i) =>
            i === idxToUpdate
              ? {
                  ...item,
                  price: Math.round(newPrice * 100) / 100,
                  change: Math.round(newChange * 100) / 100,
                  changePercent: Math.round(newChangePct * 100) / 100
                }
              : item
          );
        });
      } else if (bucket === 3) {
        // Update Volume stocks
        setVolumeStocks(prev => {
          const idxToUpdate = Math.floor(Math.random() * prev.length);
          const target = prev[idxToUpdate];
          const newPrice = target.price * (1 + deltaPercent / 100);
          const newChange = target.change + (newPrice - target.price);
          const newChangePct = target.changePercent + deltaPercent;

          setFlashingItems(f => ({ ...f, [target.id]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setFlashingItems(f => {
              const copy = { ...f };
              delete copy[target.id];
              return copy;
            });
          }, 1000);

          return prev.map((item, i) =>
            i === idxToUpdate
              ? {
                  ...item,
                  price: Math.round(newPrice * 100) / 100,
                  change: Math.round(newChange * 100) / 100,
                  changePercent: Math.round(newChangePct * 100) / 100
                }
              : item
          );
        });
      } else {
        // Update Forex/Commodities
        setForexCommodities(prev => {
          const idxToUpdate = Math.floor(Math.random() * prev.length);
          const target = prev[idxToUpdate];
          const factor = target.price < 2 ? 0.0001 : 0.01;
          const newPrice = target.price + (isUp ? factor : -factor);
          const newChange = target.change + (newPrice - target.price);
          const newChangePct = target.changePercent + (isUp ? 0.05 : -0.05);

          setFlashingItems(f => ({ ...f, [target.id]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setFlashingItems(f => {
              const copy = { ...f };
              delete copy[target.id];
              return copy;
            });
          }, 1000);

          return prev.map((item, i) =>
            i === idxToUpdate
              ? {
                  ...item,
                  price: target.price < 2 ? Math.round(newPrice * 10000) / 10000 : Math.round(newPrice * 100) / 100,
                  change: Math.round(newChange * 1000) / 1000,
                  changePercent: Math.round(newChangePct * 100) / 100
                }
              : item
          );
        });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Combined searchable item catalog
  const allSearchableItems = useMemo(() => {
    return [
      ...indices,
      ...usStocks,
      ...volumeStocks,
      ...cryptos,
      ...forexCommodities,
      ...WORLD_STOCKS,
      ...GOV_BONDS,
      ...ETFS_DATA,
      ...ECONOMY_DATA
    ];
  }, [indices, usStocks, volumeStocks, cryptos, forexCommodities]);

  const handleSelectItem = useCallback((item: MarketItem | MarketIndexItem) => {
    setSelectedItemForDetail(item);
  }, []);

  const openSeeAllModal = useCallback((title: string, items: (MarketItem | MarketIndexItem)[]) => {
    setSeeAllConfig({
      isOpen: true,
      title,
      items
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#131722] font-sans antialiased flex flex-col">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        isLiveActive={isLiveActive}
        onToggleLive={() => setIsLiveActive(!isLiveActive)}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Hero Headline Section */}
      <HeroSection
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* Main Content Area */}
      <main className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-4 space-y-12 flex-1">
        {/* Indices Benchmark Cards */}
        <IndicesOverview
          indices={indices}
          onSelectIndex={handleSelectItem}
          onViewAllIndices={() => openSeeAllModal('Global Indices', indices)}
          flashingItems={flashingItems}
        />

        {/* Dynamic Category Data Grids */}
        {activeTab === 'US stocks' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Left Column: US Stocks & Highest Volume */}
            <div className="space-y-8">
              {/* US Stocks Section */}
              <MarketCard
                title="US stocks"
                badgeTag="Regular Hours"
                items={usStocks.slice(0, 5)}
                footerActionText="See all US stocks"
                onHeaderClick={() => openSeeAllModal('All US Stocks', usStocks)}
                onFooterAction={() => openSeeAllModal('All US Stocks', usStocks)}
                onSelectItem={handleSelectItem}
                flashingItems={flashingItems}
              />

              {/* Highest Volume Stocks Section */}
              <MarketCard
                title="Highest volume stocks"
                items={volumeStocks.slice(0, 3)}
                footerActionText="See all most actively traded stocks"
                onHeaderClick={() => openSeeAllModal('Most Actively Traded Stocks', volumeStocks)}
                onFooterAction={() => openSeeAllModal('Most Actively Traded Stocks', volumeStocks)}
                onSelectItem={handleSelectItem}
                flashingItems={flashingItems}
                hideBadge={true}
              />
            </div>

            {/* Right Column: Crypto & Forex/Commodities */}
            <div className="space-y-8">
              {/* Crypto Overview Section */}
              <MarketCard
                title="Crypto"
                badgeTag="Market Cap Ranking"
                items={cryptos.slice(0, 4)}
                footerActionText="See all coins"
                onHeaderClick={() => openSeeAllModal('Cryptocurrency Rankings', cryptos)}
                onFooterAction={() => openSeeAllModal('Cryptocurrency Rankings', cryptos)}
                onSelectItem={handleSelectItem}
                flashingItems={flashingItems}
              />

              {/* Forex & Commodities Section */}
              <MarketCard
                title="Forex and commodities"
                badgeTag="Global Rates"
                items={forexCommodities.slice(0, 3)}
                footerActionText="See all futures & forex"
                onHeaderClick={() => openSeeAllModal('Forex & Commodity Rates', forexCommodities)}
                onFooterAction={() => openSeeAllModal('Forex & Commodity Rates', forexCommodities)}
                onSelectItem={handleSelectItem}
                flashingItems={flashingItems}
              />
            </div>
          </section>
        )}

        {activeTab === 'World stocks' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="World Megacaps"
              badgeTag="Global Markets"
              items={WORLD_STOCKS}
              footerActionText="Explore all international equities"
              onHeaderClick={() => openSeeAllModal('World Megacaps', WORLD_STOCKS)}
              onFooterAction={() => openSeeAllModal('World Megacaps', WORLD_STOCKS)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="US Megacaps"
              badgeTag="Wall Street"
              items={usStocks.slice(0, 5)}
              footerActionText="See all US stocks"
              onHeaderClick={() => openSeeAllModal('All US Stocks', usStocks)}
              onFooterAction={() => openSeeAllModal('All US Stocks', usStocks)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Crypto' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Top Cryptocurrencies by Market Cap"
              badgeTag="Live Blockchain"
              items={cryptos}
              footerActionText="View 500+ cryptocurrency pairs"
              onHeaderClick={() => openSeeAllModal('All Cryptocurrencies', cryptos)}
              onFooterAction={() => openSeeAllModal('All Cryptocurrencies', cryptos)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Crypto Volume Leaders"
              badgeTag="24H Volume"
              items={[...cryptos].reverse()}
              footerActionText="See active crypto spot trading"
              onHeaderClick={() => openSeeAllModal('Crypto Volume Leaders', cryptos)}
              onFooterAction={() => openSeeAllModal('Crypto Volume Leaders', cryptos)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Futures' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Commodities Futures"
              badgeTag="NYMEX & COMEX"
              items={forexCommodities.filter(i => i.assetClass === 'futures')}
              footerActionText="See all metals & energy contracts"
              onHeaderClick={() => openSeeAllModal('Commodities Futures', forexCommodities.filter(i => i.assetClass === 'futures'))}
              onFooterAction={() => openSeeAllModal('Commodities Futures', forexCommodities.filter(i => i.assetClass === 'futures'))}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Indices Futures"
              badgeTag="CME Globex"
              items={indices}
              footerActionText="See all index futures"
              onHeaderClick={() => openSeeAllModal('Index Futures', indices)}
              onFooterAction={() => openSeeAllModal('Index Futures', indices)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Forex' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Major Currency Pairs"
              badgeTag="Interbank Rates"
              items={forexCommodities.filter(i => i.assetClass === 'forex')}
              footerActionText="See all currency exchange rates"
              onHeaderClick={() => openSeeAllModal('Major Currency Pairs', forexCommodities.filter(i => i.assetClass === 'forex'))}
              onFooterAction={() => openSeeAllModal('Major Currency Pairs', forexCommodities.filter(i => i.assetClass === 'forex'))}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Global Benchmark Rates"
              badgeTag="Central Banks"
              items={GOV_BONDS.slice(0, 4)}
              footerActionText="See all sovereign rates"
              onHeaderClick={() => openSeeAllModal('Global Benchmark Rates', GOV_BONDS)}
              onFooterAction={() => openSeeAllModal('Global Benchmark Rates', GOV_BONDS)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Government bonds' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Sovereign Yield Curves"
              badgeTag="Global Treasuries"
              items={GOV_BONDS}
              footerActionText="See sovereign yield monitors"
              onHeaderClick={() => openSeeAllModal('Sovereign Yield Curves', GOV_BONDS)}
              onFooterAction={() => openSeeAllModal('Sovereign Yield Curves', GOV_BONDS)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="US Benchmark Yields"
              badgeTag="Federal Reserve"
              items={GOV_BONDS.filter(b => b.symbol.startsWith('US'))}
              footerActionText="See US treasury yield spread"
              onHeaderClick={() => openSeeAllModal('US Treasuries', GOV_BONDS.filter(b => b.symbol.startsWith('US')))}
              onFooterAction={() => openSeeAllModal('US Treasuries', GOV_BONDS.filter(b => b.symbol.startsWith('US')))}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Corporate bonds' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Corporate Debt Benchmarks"
              badgeTag="Fixed Income"
              items={GOV_BONDS.slice(0, 3)}
              footerActionText="See corporate bond spreads"
              onHeaderClick={() => openSeeAllModal('Corporate Debt Benchmarks', GOV_BONDS.slice(0, 3))}
              onFooterAction={() => openSeeAllModal('Corporate Debt Benchmarks', GOV_BONDS.slice(0, 3))}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Fixed Income ETFs"
              badgeTag="Liquid Credit"
              items={ETFS_DATA}
              footerActionText="See bond ETF tracker"
              onHeaderClick={() => openSeeAllModal('Fixed Income ETFs', ETFS_DATA)}
              onFooterAction={() => openSeeAllModal('Fixed Income ETFs', ETFS_DATA)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'ETFs' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Top Benchmark ETFs"
              badgeTag="US Exchanges"
              items={ETFS_DATA}
              footerActionText="See all 3,000+ US ETFs"
              onHeaderClick={() => openSeeAllModal('Top Benchmark ETFs', ETFS_DATA)}
              onFooterAction={() => openSeeAllModal('Top Benchmark ETFs', ETFS_DATA)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Underlying Indices"
              badgeTag="Tracked Benchmarks"
              items={indices.slice(0, 4)}
              footerActionText="See index benchmark weights"
              onHeaderClick={() => openSeeAllModal('Underlying Indices', indices)}
              onFooterAction={() => openSeeAllModal('Underlying Indices', indices)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}

        {activeTab === 'Economy' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <MarketCard
              title="Macroeconomic Indicators"
              badgeTag="Official Statistics"
              items={ECONOMY_DATA}
              footerActionText="See economic calendar & releases"
              onHeaderClick={() => openSeeAllModal('Macroeconomic Indicators', ECONOMY_DATA)}
              onFooterAction={() => openSeeAllModal('Macroeconomic Indicators', ECONOMY_DATA)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
            <MarketCard
              title="Treasury Benchmark Rates"
              badgeTag="Fixed Income"
              items={GOV_BONDS}
              footerActionText="See yield curve analysis"
              onHeaderClick={() => openSeeAllModal('Treasury Benchmark Rates', GOV_BONDS)}
              onFooterAction={() => openSeeAllModal('Treasury Benchmark Rates', GOV_BONDS)}
              onSelectItem={handleSelectItem}
              flashingItems={flashingItems}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        allItems={allSearchableItems}
        onSelectItem={handleSelectItem}
      />

      <SymbolDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
      />

      <SeeAllModal
        isOpen={seeAllConfig.isOpen}
        onClose={() => setSeeAllConfig(prev => ({ ...prev, isOpen: false }))}
        title={seeAllConfig.title}
        items={seeAllConfig.items}
        onSelectItem={handleSelectItem}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}
