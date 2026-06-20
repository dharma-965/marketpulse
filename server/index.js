import express from 'express';
import cors from 'cors';
import {
  analytics,
  chartData,
  trendingStocks,
  insights,
  portfolioHoldings,
  aiInsights,
  aiSummary,
  aiPicks,
  marketNews,
  sectorPerformance,
  transactions,
  userSettings,
  watchlist,
  topGainers,
  topLosers,
  earningsCalendar,
} from './data.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/dashboard', (req, res) => {
  res.json({ analytics, chartData, trendingStocks, insights, portfolioHoldings, aiInsights, aiSummary });
});

app.get('/api/analytics', (req, res) => res.json(analytics));
app.get('/api/chart', (req, res) => res.json(chartData));
app.get('/api/trending', (req, res) => res.json(trendingStocks));
app.get('/api/insights', (req, res) => res.json(insights));
app.get('/api/portfolio', (req, res) => res.json(portfolioHoldings));
app.get('/api/ai/insights', (req, res) => res.json({ aiInsights, aiSummary }));
app.get('/api/ai/picks', (req, res) => res.json(aiPicks));

app.get('/api/news', (req, res) => res.json(marketNews));
app.get('/api/sectors', (req, res) => res.json(sectorPerformance));
app.get('/api/watchlist', (req, res) => res.json(watchlist));
app.get('/api/gainers', (req, res) => res.json(topGainers));
app.get('/api/losers', (req, res) => res.json(topLosers));
app.get('/api/earnings', (req, res) => res.json(earningsCalendar));

app.get('/api/transactions', (req, res) => res.json(transactions));
app.get('/api/settings', (req, res) => res.json(userSettings));
app.post('/api/settings', (req, res) => {
  const settings = req.body;
  Object.assign(userSettings, settings);
  res.json(userSettings);
});

app.post('/api/ai/query', async (req, res) => {
  const { prompt } = req.body;
  const normalized = typeof prompt === 'string' ? prompt.toLowerCase() : '';

  // If an OpenAI API key is provided, proxy the request to OpenAI for a real model response.
  // simple in-memory rate limiter for AI endpoints (very basic)
  if (!globalThis._aiRate) globalThis._aiRate = { last: 0, count: 0 };
  const now = Date.now();
  if (now - globalThis._aiRate.last > 60_000) {
    globalThis._aiRate.count = 0;
    globalThis._aiRate.last = now;
  }
  globalThis._aiRate.count += 1;
  if (globalThis._aiRate.count > 120) {
    return res.status(429).json({ error: 'Rate limit exceeded for AI endpoints' });
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return res.json({ query: prompt, answer: text, source: 'openai' });
      } else {
        console.error('OpenAI API error:', resp.status, await resp.text());
      }
    } catch (err) {
      console.error('OpenAI request failed:', err);
    }
  }

  // Fallback rule-based assistant (keeps existing behavior when no API key).
  let answer = 'The AI assistant suggests staying diversified and watching key high-growth names closely.';

  if (normalized.includes('aapl')) {
    answer = 'AAPL is showing steady accumulation. A conservative add with a tight stop below recent support could be a smart move.';
  } else if (normalized.includes('nvda')) {
    answer = 'NVDA momentum remains strong. Consider adding on a pullback in a market with favorable semiconductor sentiment.';
  } else if (normalized.includes('buy')) {
    answer = 'The model recommends a balanced trade idea: favor large-cap strength while keeping downside protection in place.';
  } else if (normalized.includes('sell')) {
    answer = 'If your position has strong gains, consider trimming to lock in profits while maintaining some exposure.';
  } else if (normalized.includes('risk')) {
    answer = 'Risk is moderate. Use position sizing and stop-losses to manage volatility, especially around upcoming earnings.';
  }

  res.json({ query: prompt, answer, source: 'fallback' });
});

// AI flash summary: returns a short market flash; uses OpenAI when available
app.get('/api/ai/summary', async (req, res) => {
  if (!globalThis._aiRate) globalThis._aiRate = { last: 0, count: 0 };
  const now = Date.now();
  if (now - globalThis._aiRate.last > 60_000) {
    globalThis._aiRate.count = 0;
    globalThis._aiRate.last = now;
  }
  globalThis._aiRate.count += 1;
  if (globalThis._aiRate.count > 120) {
    return res.status(429).json({ error: 'Rate limit exceeded for AI endpoints' });
  }

  const base = { aiSummary, aiInsights };
  if (process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are MarketPulse, a concise market analyst. Provide a 2-3 sentence flash summary and a one-line trade idea.' },
            { role: 'user', content: `Summary data: ${JSON.stringify(base)}
            Provide a 2-3 sentence market flash and one concise trade idea.` },
          ],
          max_tokens: 200,
          temperature: 0.6,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        const text = data?.choices?.[0]?.message?.content;
        return res.json({ ...base, flash: text, source: 'openai' });
      }
    } catch (err) {
      console.error('OpenAI summary failed:', err);
    }
  }

  // fallback: build a short flash from existing summary
  const flash = `${aiSummary.headline} — ${aiSummary.summary} Top pick: ${aiPicks?.[0]?.symbol ?? 'N/A'} (${aiPicks?.[0]?.reason ?? ''}).`;
  res.json({ ...base, flash, source: 'fallback' });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
