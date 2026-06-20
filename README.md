# MarketPulse — Flash Market Dashboard

A modern React + Tailwind CSS dashboard with fast, AI-powered market flashes and advanced visualizations.

## Features

- Sidebar navigation
- Responsive navbar
- Analytics cards
- Interactive charts with Recharts
- Trending stocks section
- AI insights cards
- Portfolio tracking table
- Responsive mobile design
- Dark mode
- Smooth Framer Motion animations
- Loading skeletons

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the backend API server:
   ```bash
   npm run backend
   ```
3. Start the frontend dev server in a second terminal:
   ```bash
   npm run dev
   ```
4. Open the local Vite URL in your browser.

The frontend is configured to proxy `/api` requests to the backend server at `http://localhost:4000`.

## Project idea and step-by-step guide

This app is a polished front-end prototype for a stock market intelligence dashboard. It can be extended into a real investing or trading platform by integrating live market APIs, authentication, and backend portfolio management.

### Step-by-step implementation plan

1. **Initialize the project**
   - Use Vite to create a React + TypeScript app.
   - Install Tailwind CSS, Framer Motion, Recharts, Axios, and React Router.

2. **Create the layout**
   - Build a persistent sidebar for navigation.
   - Add a top navbar with search, notifications, and dark mode toggle.

3. **Dashboard sections**
   - Analytics cards for total value, daily change, trades, and signals.
   - Interactive stock chart using Recharts.
   - Trending stocks list with percent change.
   - AI insights cards for sentiment, risk alerts, and trade ideas.
   - AI insights cards for sentiment, risk alerts, trade ideas, and MarketPulse flash summaries.
   - Portfolio table showing holdings, performance, and allocation.

4. **Theme and Tailwind enhancements**
   - Add dynamic accent themes using CSS variables and Tailwind arbitrary values.
   - Provide light / dark / auto theme mode selection.
   - Let users choose from multiple dashboard palettes without rebuilding CSS.

5. **Backend improvements**
   - Keep the current Express API but add structured user endpoints for transactions and settings.
   - Use `POST /api/settings` plus `GET /api/settings` to persist dashboard preferences.
   - For production, the best backend is Node.js + Express with PostgreSQL / Prisma or Supabase for data and auth.

6. **Next step upgrades**
   - Add a real database layer (PostgreSQL or MongoDB) and move mock data into persistent storage.
   - Add authentication and user profiles for watchlists and portfolios.
   - Connect live market data feeds like Alpha Vantage, IEX Cloud, or Finnhub.

4. **Responsiveness and styling**
   - Use Tailwind utility classes for spacing and responsive breakpoints.
   - Add dark mode using `class` strategy.
   - Include smooth hover and entrance animations with Framer Motion.

5. **Data and UX polish**
   - Create realistic mock data for stock movements.
   - Add loading skeletons while data loads.
   - Add charts, counters, and badges to make the UI feel dynamic.

6. **Next steps**
   - Connect to a live market data API.
   - Add a portfolio transactions page.
   - Add authentication and user-specific portfolio storage.
   - Add notifications, watchlists, and alerts.

   ## AI Integration (optional)

   This project includes a simple AI assistant endpoint at `/api/ai/query`. By default the backend uses a lightweight rule-based fallback. To enable real AI responses via OpenAI, set the environment variable `OPENAI_API_KEY` before starting the backend.

   Example (macOS / Linux):

   ```bash
   export OPENAI_API_KEY="sk-..."
   npm run backend
   ```

   When `OPENAI_API_KEY` is present, the backend will proxy the prompt to OpenAI's chat completions API and return the model's answer to the frontend `AIAdvisor` component.
