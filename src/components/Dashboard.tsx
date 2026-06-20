import { motion } from 'framer-motion';
import AnalyticsCards from './AnalyticsCards';
import StockChart from './StockChart';
import TrendingStocks from './TrendingStocks';
import NewsPanel from './NewsPanel';
import SectorPerformance from './SectorPerformance';
import TopMovers from './TopMovers';
import EarningsCalendar from './EarningsCalendar';
import InsightsCards from './InsightsCards';
import PortfolioTable from './PortfolioTable';
import LoadingSkeleton from './LoadingSkeleton';
import AIAdvisor from './AIAdvisor';
import AIFlash from './AIFlash';
import { useEffect, useMemo, useState } from 'react';
import { fetchDashboardData, type DashboardResponse } from '../api/dashboard';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchDashboardData()
      .then((data) => {
        if (isMounted) {
          setDashboardData(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load dashboard data.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasData = useMemo(() => !loading && dashboardData !== null, [loading, dashboardData]);

  return (
    <div className="space-y-6">
      {error && !hasData ? (
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-5 text-rose-700 shadow-sm dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-200">
          <strong className="block text-sm font-semibold">API error:</strong>
          <p className="mt-2 text-sm">{error} Please start the backend with <code>npm run backend</code> and reload the page.</p>
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Overview</p>
              <h3 className="text-xl font-semibold">Market performance</h3>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 text-sm font-medium text-cyan-700 dark:from-cyan-900/30 dark:to-blue-900/30 dark:text-cyan-300">
              Live chart with premium insights
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {hasData ? (
              <div>
                <AIFlash />
                <StockChart chartData={dashboardData!.chartData} />
              </div>
            ) : (
              <LoadingSkeleton count={1} />
            )}
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <AnalyticsCards analytics={dashboardData?.analytics ?? []} />
          <TrendingStocks trendingStocks={dashboardData?.trendingStocks ?? []} onAddToWatchlist={() => {}} />
          <div className="mt-4 grid gap-4">
            <NewsPanel />
            <SectorPerformance />
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-md dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Portfolio</p>
              <h3 className="text-xl font-semibold">Holdings and allocation</h3>
            </div>
            <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md dark:shadow-indigo-500/30">
              View report
            </button>
          </div>
          {hasData ? <PortfolioTable holdings={dashboardData!.portfolioHoldings} /> : <LoadingSkeleton count={1} />}
        </section>

        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-md border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <InsightsCards insights={dashboardData?.insights ?? []} />
          {hasData ? (
            <AIAdvisor aiSummary={dashboardData!.aiSummary} aiInsights={dashboardData!.aiInsights} />
          ) : (
            <LoadingSkeleton count={1} />
          )}
        </section>
      </div>

      <div className="space-y-6">
        <TopMovers />
        <EarningsCalendar />
      </div>
    </div>
  );
}
