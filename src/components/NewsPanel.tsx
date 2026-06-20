import { useEffect, useState } from 'react';
import { fetchMarketNews, type MarketNewsItem } from '../api/dashboard';

export default function NewsPanel() {
  const [news, setNews] = useState<MarketNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchMarketNews()
      .then((data) => {
        if (!mounted) return;
        setNews(data.slice(0, 5));
      })
      .catch(() => setNews([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">News</p>
      <div className="mt-3 news-list">
        {loading ? (
          <p className="text-sm text-slate-500">Loading news…</p>
        ) : news.length === 0 ? (
          <p className="text-sm text-slate-500">No news available.</p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="news-item">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.summary}</p>
              <p className="mt-2 text-xs text-slate-400">{item.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
