import axios from 'axios';

export type AnalyticsCard = {
  title: string;
  value: string;
  delta: string;
  icon: string;
};

export type ChartPoint = {
  time: string;
  price: number;
};

export type TrendingStock = {
  symbol: string;
  name: string;
  change: string;
  price: string;
  chart?: ChartPoint[];
};

export type InsightItem = {
  title: string;
  description: string;
  badge: string;
};

export type PortfolioHolding = {
  asset: string;
  symbol: string;
  allocation: string;
  shares: number;
  avgPrice: string;
  current: string;
  profit: string;
};

export type AIInsight = {
  title: string;
  description: string;
  confidence: string;
};

export type AISummary = {
  score: number;
  headline: string;
  summary: string;
};

export type AIPick = {
  symbol: string;
  name: string;
  reason: string;
  score: number;
};

export type MarketNewsItem = {
  id: number;
  title: string;
  summary: string;
  time: string;
};

export type SectorPerformance = {
  sector: string;
  change: string;
};

export type WatchlistItem = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  addedDate: string;
};

export type Gainer = {
  symbol: string;
  name: string;
  change: string;
  price: string;
};

export type EarningEvent = {
  symbol: string;
  name: string;
  date: string;
  estimate: string;
};

export type DashboardResponse = {
  analytics: AnalyticsCard[];
  chartData: ChartPoint[];
  trendingStocks: TrendingStock[];
  insights: InsightItem[];
  portfolioHoldings: PortfolioHolding[];
  aiInsights: AIInsight[];
  aiSummary: AISummary;
};

export async function fetchDashboardData(): Promise<DashboardResponse> {
  const response = await axios.get('/api/dashboard');
  return response.data;
}

export async function fetchAIPicks(): Promise<AIPick[]> {
  const response = await axios.get('/api/ai/picks');
  return response.data;
}

export async function queryAI(prompt: string): Promise<{ query: string; answer: string; source?: string }> {
  const response = await axios.post('/api/ai/query', { prompt });
  return response.data;
}

export async function fetchAISummary(): Promise<{ flash?: string; aiSummary: AISummary; aiInsights: AIInsight[]; source?: string }> {
  const response = await axios.get('/api/ai/summary');
  return response.data;
}

export async function fetchMarketNews(): Promise<MarketNewsItem[]> {
  const response = await axios.get('/api/news');
  return response.data;
}

export async function fetchSectors(): Promise<SectorPerformance[]> {
  const response = await axios.get('/api/sectors');
  return response.data;
}

export async function fetchWatchlist(): Promise<WatchlistItem[]> {
  const response = await axios.get('/api/watchlist');
  return response.data;
}

export async function fetchGainers(): Promise<Gainer[]> {
  const response = await axios.get('/api/gainers');
  return response.data;
}

export async function fetchLosers(): Promise<Gainer[]> {
  const response = await axios.get('/api/losers');
  return response.data;
}

export async function fetchEarnings(): Promise<EarningEvent[]> {
  const response = await axios.get('/api/earnings');
  return response.data;
}
