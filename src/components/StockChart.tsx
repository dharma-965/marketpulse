import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import type { ChartPoint } from '../api/dashboard';

type StockChartProps = {
  chartData: ChartPoint[];
};

export default function StockChart({ chartData }: StockChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border border-slate-700 bg-gradient-to-br from-slate-950 to-slate-900 p-5 text-white shadow-xl dark:border-slate-700"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">AAPL</p>
          <h3 className="text-2xl font-semibold">Apple stock</h3>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm text-white font-semibold shadow-md">+3.6%</div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid opacity={0.12} vertical={false} />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} width={38} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: 'none' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
