export const analytics = [
  { title: 'Portfolio Value', value: '$274.2K', delta: '+5.4%', icon: '📈' },
  { title: 'Daily Gain', value: '+$3.8K', delta: '+1.4%', icon: '💹' },
  { title: 'Active Positions', value: '12', delta: '+2', icon: '📊' },
  { title: 'AI Signals', value: '8', delta: '+3', icon: '🤖' },
];

export const chartData = [
  { time: '09:00', price: 303.2 },
  { time: '09:30', price: 305.1 },
  { time: '10:00', price: 308.5 },
  { time: '10:30', price: 307.2 },
  { time: '11:00', price: 306.8 },
  { time: '11:30', price: 309.5 },
  { time: '12:00', price: 311.9 },
  { time: '12:30', price: 315.4 },
  { time: '13:00', price: 319.7 },
  { time: '13:30', price: 321.2 },
  { time: '14:00', price: 324.0 },
  { time: '14:30', price: 327.1 },
  { time: '15:00', price: 329.6 },
  { time: '15:30', price: 331.5 },
  { time: '16:00', price: 333.4 },
  { time: '16:30', price: 332.8 },
  { time: '17:00', price: 334.2 },
];

export const trendingStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', change: '+2.4%', price: '$187.20', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla', change: '-1.2%', price: '$210.80', sector: 'Consumer Discretionary' },
  { symbol: 'NVDA', name: 'NVIDIA', change: '+4.1%', price: '$462.10', sector: 'Semiconductors' },
  { symbol: 'AMZN', name: 'Amazon', change: '+1.6%', price: '$138.50', sector: 'E-Commerce' },
  { symbol: 'MSFT', name: 'Microsoft', change: '+0.9%', price: '$353.10', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', change: '+1.2%', price: '$132.40', sector: 'Technology' },
  { symbol: 'XOM', name: 'Exxon Mobil', change: '-0.6%', price: '$100.20', sector: 'Energy' },
  { symbol: 'JPM', name: 'JPMorgan', change: '+0.3%', price: '$148.80', sector: 'Financials' },
];

export const insights = [
  { title: 'Momentum Alert', description: 'Tech sector bullish momentum is strong ahead of earnings.', badge: 'High Confidence' },
  { title: 'Risk Monitor', description: 'Volatility is elevated in energy names—consider trimming overweight positions.', badge: 'Watch List' },
  { title: 'Earnings Watch', description: 'Several mega-cap names report this week; options skew is elevated.', badge: 'Earnings' },
];

export const aiInsights = [
  { title: 'Momentum scan', description: 'AI detects strong accumulation in semiconductors and renewable energy names.', confidence: 'High Confidence' },
  { title: 'Risk outlook', description: 'Short-term volatility is moderate; size positions carefully before earnings.', confidence: 'Moderate Confidence' },
  { title: 'Sentiment pulse', description: 'Investor sentiment is neutral with a slight bullish tilt toward tech.', confidence: 'Data-backed' },
];

export const aiSummary = {
  score: 78,
  headline: 'Bullish momentum is building across the market',
  summary: 'The AI engine recommends focusing on diversified growth names while protecting capital with tight stops.',
};

export const aiPicks = [
  { symbol: 'AAPL', name: 'Apple Inc.', reason: 'Strong earnings momentum and stable cash flow support continued upside.', score: 88 },
  { symbol: 'NVDA', name: 'NVIDIA', reason: 'AI demand remains robust, and semiconductor positioning is favorable on pullbacks.', score: 92 },
  { symbol: 'GOOGL', name: 'Alphabet', reason: 'Solid cloud growth and AI investment make this a balanced long-term overweight.', score: 82 },
  { symbol: 'MSFT', name: 'Microsoft', reason: 'Enterprise AI deployments and recurring revenue make this a defensive growth pick.', score: 85 },
  { symbol: 'XOM', name: 'Exxon Mobil', reason: 'Energy consolidation and stronger fundamentals support selective exposure.', score: 71 },
];

export const portfolioHoldings = [
  { asset: 'Apple', symbol: 'AAPL', allocation: '28%', shares: 320, avgPrice: '$153.40', current: '$59,840', profit: '+$9,640' },
  { asset: 'NVIDIA', symbol: 'NVDA', allocation: '24%', shares: 90, avgPrice: '$401.60', current: '$41,589', profit: '+$7,092' },
  { asset: 'Tesla', symbol: 'TSLA', allocation: '18%', shares: 120, avgPrice: '$195.20', current: '$25,296', profit: '+$5,180' },
  { asset: 'Amazon', symbol: 'AMZN', allocation: '12%', shares: 40, avgPrice: '$127.80', current: '$5,540', profit: '+$1,120' },
  { asset: 'Microsoft', symbol: 'MSFT', allocation: '10%', shares: 40, avgPrice: '$310.00', current: '$12,400', profit: '+$1,200' },
  { asset: 'Cash', symbol: 'USD', allocation: '8%', shares: 0, avgPrice: '$0', current: '$21,000', profit: '+$0' },
];

export const transactions = [
  { id: 1, type: 'BUY', symbol: 'AAPL', asset: 'Apple', shares: 50, price: '$154.20', total: '$7,710', date: '2024-05-22', status: 'Completed' },
  { id: 2, type: 'SELL', symbol: 'TSLA', asset: 'Tesla', shares: 25, price: '$210.50', total: '$5,262.50', date: '2024-05-21', status: 'Completed' },
  { id: 3, type: 'BUY', symbol: 'NVDA', asset: 'NVIDIA', shares: 15, price: '$462.80', total: '$6,942', date: '2024-05-20', status: 'Completed' },
  { id: 4, type: 'BUY', symbol: 'AMZN', asset: 'Amazon', shares: 30, price: '$138.40', total: '$4,152', date: '2024-05-19', status: 'Completed' },
  { id: 5, type: 'SELL', symbol: 'AAPL', asset: 'Apple', shares: 20, price: '$156.80', total: '$3,136', date: '2024-05-18', status: 'Completed' },
  { id: 6, type: 'BUY', symbol: 'MSFT', asset: 'Microsoft', shares: 10, price: '$320.00', total: '$3,200', date: '2024-05-17', status: 'Completed' },
  { id: 7, type: 'DIV', symbol: 'XOM', asset: 'Exxon Mobil', shares: 0, price: '$0.88', total: '$88', date: '2024-05-16', status: 'Completed' },
];

export const marketNews = [
  { id: 1, title: 'Fed signals gradual pace of hikes', summary: 'The Fed indicated a patient approach to future rate decisions, keeping markets steady.', time: '2h ago' },
  { id: 2, title: 'Tech earnings beat expectations', summary: 'Several large-cap tech firms reported better-than-expected revenue and guidance.', time: '4h ago' },
  { id: 3, title: 'Oil prices slip amid demand concerns', summary: 'International demand forecasts pushed oil slightly lower, benefiting some consumer sectors.', time: '6h ago' },
];

export const sectorPerformance = [
  { sector: 'Technology', change: '+1.9%' },
  { sector: 'Financials', change: '+0.4%' },
  { sector: 'Energy', change: '-0.6%' },
  { sector: 'Consumer Discretionary', change: '+0.2%' },
  { sector: 'Healthcare', change: '+0.7%' },
];

export const userSettings = {
  refreshRate: '1m',
  themeMode: 'auto',
  accentTheme: 'indigo',
  notifications: {
    priceAlerts: true,
    newsAlerts: false,
    tradeNotifications: true,
    email: true,
  },
};

export const watchlist = [
  { symbol: 'TSLA', name: 'Tesla', price: '$210.80', change: '-1.2%', addedDate: '2024-05-10' },
  { symbol: 'PLTR', name: 'Palantir', price: '$24.50', change: '+3.2%', addedDate: '2024-05-12' },
  { symbol: 'COIN', name: 'Coinbase', price: '$95.40', change: '+5.8%', addedDate: '2024-05-14' },
];

export const topGainers = [
  { symbol: 'COIN', name: 'Coinbase', change: '+5.8%', price: '$95.40' },
  { symbol: 'PLTR', name: 'Palantir', change: '+3.2%', price: '$24.50' },
  { symbol: 'RIVN', name: 'Rivian', change: '+2.9%', price: '$12.80' },
];

export const topLosers = [
  { symbol: 'TSLA', name: 'Tesla', change: '-1.2%', price: '$210.80' },
  { symbol: 'LCID', name: 'Lucid', change: '-2.5%', price: '$3.15' },
  { symbol: 'F', name: 'Ford', change: '-1.8%', price: '$9.40' },
];

export const earningsCalendar = [
  { symbol: 'AAPL', name: 'Apple', date: '2024-05-25', estimate: '$1.25' },
  { symbol: 'MSFT', name: 'Microsoft', date: '2024-05-26', estimate: '$2.54' },
  { symbol: 'GOOGL', name: 'Alphabet', date: '2024-05-28', estimate: '$1.82' },
  { symbol: 'NVDA', name: 'NVIDIA', date: '2024-05-30', estimate: '$3.12' },
];
