import { useEffect, useState } from 'react';

export default function useMarketTicker() {
  const [symbol, setSymbol] = useState('SPX');
  const [change, setChange] = useState('+0.00%');

  useEffect(() => {
    let mounted = true;
    function tick() {
      if (!mounted) return;
      // Simulate a small random market change for the header
      const val = (Math.random() * 0.6 - 0.3).toFixed(2);
      const sign = Number(val) >= 0 ? '+' : '';
      setChange(`${sign}${val}%`);
      // rotate symbol occasionally
      setSymbol((prev) => (Math.random() > 0.85 ? ['AAPL', 'NVDA', 'AMZN', 'TSLA'][Math.floor(Math.random() * 4)] : prev));
    }

    const id = setInterval(tick, 3500);
    tick();
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return { symbol, change };
}
