import { motion } from 'framer-motion';
import { type FormEvent, useState } from 'react';
import { queryAI, type AIInsight, type AISummary } from '../api/dashboard';

type AIAdvisorProps = {
  aiSummary: AISummary;
  aiInsights: AIInsight[];
};

export default function AIAdvisor({ aiSummary, aiInsights }: AIAdvisorProps) {
  const [prompt, setPrompt] = useState('What are the best risk-adjusted growth ideas today?');
  const [answer, setAnswer] = useState('Ask the AI assistant for a smart trade idea.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await queryAI(prompt);
      setAnswer(result.answer);
    } catch (err) {
      setError('Unable to reach AI engine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPick = (text: string) => {
    setPrompt(text);
    setAnswer('Ask the AI assistant for a smart trade idea.');
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI Assistant</p>
            <h3 className="text-xl font-semibold">Smart trade ideas</h3>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md">
            {aiSummary.headline}
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{aiSummary.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {aiInsights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <span className="mt-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                {item.confidence}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">AI chat</p>
            <h3 className="text-xl font-semibold">Ask the market expert</h3>
          </div>
          <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {loading ? 'Generating...' : 'Ready' }
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={3}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {['Best entry today', 'AAPL outlook', 'High-conviction ideas'].map((text) => (
                <button
                  type="button"
                  key={text}
                  onClick={() => handleQuickPick(text)}
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {text}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md"
            >
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
        </form>

        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
            {error ? (
              <p className="text-rose-500">{error}</p>
            ) : (
              <div>
                <p>{answer}</p>
                <p className="mt-3 text-xs text-slate-500">Source: {/** @ts-ignore */ answer.source ?? 'assistant'}</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
