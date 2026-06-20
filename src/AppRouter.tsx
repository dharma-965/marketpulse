import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Stocks from './components/Stocks';
import Settings from './components/Settings';
import Transactions from './components/Transactions';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}
