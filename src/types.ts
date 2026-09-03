export type AssetClass = 
  | 'stocks' 
  | 'crypto' 
  | 'forex' 
  | 'indices' 
  | 'futures' 
  | 'bonds' 
  | 'etfs' 
  | 'economy';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  currency?: string;
  change: number;
  changePercent: number;
  assetClass: AssetClass;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  volume?: string;
  marketCap?: string;
  high24h?: number;
  low24h?: number;
  openPrice?: number;
  prevClose?: number;
  peRatio?: number;
  dividendYield?: number;
  week52High?: number;
  week52Low?: number;
  chartData1D?: number[];
  chartData1M?: number[];
  chartData1Y?: number[];
}

export interface MarketIndexItem {
  id: string;
  name: string;
  code: string;
  badge: string;
  badgeColor: string;
  value: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  chartData?: number[];
}

export type CategoryTab = 
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';
