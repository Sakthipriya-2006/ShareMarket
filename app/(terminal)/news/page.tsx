'use client';

import { useState } from 'react';
import { TrendingUp, Brain, Filter } from 'lucide-react';

type NewsTab = 'All News' | 'Stocks' | 'Crypto' | 'Forex' | 'Economy';

const NEWS_ITEMS = [
  {
    sentiment: 'Bullish', sentimentColor: 'bg-blue-50 text-blue-600',
    source: 'Bloomberg', time: '5m ago',
    impact: 94, impactColor: 'text-blue-600',
    headline: 'Federal Reserve hints at potential rate stabilization as inflation cools faster than projected in Q3.',
    tickers: [
      { symbol: '$SPY', change: '+1.24%', up: true, path: 'M0 15 Q 10 18, 20 12 T 40 10 T 60 14 T 80 5 T 100 2' },
      { symbol: '$QQQ', change: '+2.10%', up: true, path: 'M0 18 Q 15 15, 30 14 T 60 8 T 90 2' },
    ],
  },
  {
    sentiment: 'Bearish', sentimentColor: 'bg-red-50 text-red-600',
    source: 'Reuters', time: '18m ago',
    impact: 78, impactColor: 'text-red-600',
    headline: 'Supply chain disruptions at major semiconductor hubs expected to affect hardware delivery timelines for FY25.',
    tickers: [
      { symbol: '$TSM', change: '-3.42%', up: false, path: 'M0 2 Q 25 5, 50 15 T 75 12 T 100 18' },
      { symbol: '$NVDA', change: '-1.15%', up: false, path: 'M0 5 Q 30 2, 60 12 T 100 15' },
    ],
  },
  {
    sentiment: 'Neutral', sentimentColor: 'bg-slate-100 text-slate-600',
    source: 'WSJ', time: '42m ago',
    impact: 32, impactColor: 'text-slate-600',
    headline: 'Tech conglomerates explore decentralized AI training models as regulatory pressure on data centers intensifies.',
    tickers: [
      { symbol: '$GOOGL', change: '+0.05%', up: true, path: 'M0 10 H 100' },
    ],
  },
  {
    sentiment: 'Bullish', sentimentColor: 'bg-blue-50 text-blue-600',
    source: 'FT', time: '1h ago',
    impact: 81, impactColor: 'text-blue-600',
    headline: "Apple unveils next-generation chip architecture promising 40% efficiency gains in machine learning workloads.",
    tickers: [
      { symbol: '$AAPL', change: '+3.24%', up: true, path: 'M0 20 L 25 16 L 50 10 L 75 8 L 100 3' },
    ],
  },
];

const TRENDING_TOPICS = [
  { tag: '#InterestRates', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { tag: '#AIChips', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  { tag: '#OPEC+', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { tag: '#CPI', color: 'bg-red-50 border-red-100 text-red-700' },
  { tag: '#Blockchain', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { tag: '#Earnings', color: 'bg-blue-50 border-blue-100 text-blue-700' },
];

const EVENTS = [
  { date: 'Today • 14:30 EST', title: 'FOMC Press Conference', note: 'High Volatility Expected', active: true },
  { date: 'Tomorrow • 08:30 EST', title: 'US Unemployment Claims', note: 'Institutional Forecast: 215k', active: false },
  { date: 'Friday • Market Close', title: 'S&P 500 Rebalancing', note: 'Medium Impact Index News', active: false },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<NewsTab>('All News');
  const [showToast, setShowToast] = useState(true);

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">News & Sentiment</h1>
          <p className="text-sm text-slate-500 mt-0.5">AI-powered market news analysis and sentiment scoring.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 mb-6">
        {(['All News', 'Stocks', 'Crypto', 'Forex', 'Economy'] as NewsTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sentiment Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Sentiment</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-slate-800">65%</span>
            <span className="text-sm font-bold text-slate-400">Bullish</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Most Bullish Sector</span>
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Technology</h3>
          <p className="text-xs font-bold text-emerald-500 mb-4">+4.2% AI Impact Score</p>
          <div className="flex gap-2">
            {['$NVDA', '$MSFT', '$AAPL'].map(t => (
              <span key={t} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Most Bearish Sector</span>
            <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Energy</h3>
          <p className="text-xs font-bold text-red-500 mb-4">-2.8% Negative Weight</p>
          <div className="flex gap-2">
            {['$XOM', '$CVX'].map(t => (
              <span key={t} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feed + Sidebar */}
      <div className="grid grid-cols-12 gap-6">
        {/* News Feed */}
        <div className="col-span-8 space-y-6">
          {NEWS_ITEMS.map((item, i) => (
            <article key={i} className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm ${item.sentiment === 'Neutral' ? 'opacity-90' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${item.sentimentColor}`}>
                    {item.sentiment}
                  </span>
                  <span className="text-xs text-slate-400">{item.source} • {item.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400 font-medium">AI Impact</span>
                  <span className={`text-sm font-bold ${item.impactColor}`}>{item.impact}/100</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-6 leading-snug">{item.headline}</h4>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex gap-8">
                  {item.tickers.map((ticker) => (
                    <div key={ticker.symbol} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-600">{ticker.symbol}</span>
                      <svg className="w-16 h-4" fill="none" viewBox="0 0 100 20">
                        <path d={ticker.path} fill="none" stroke={ticker.up ? '#10b981' : '#ef4444'} strokeWidth="2" />
                      </svg>
                      <span className={`text-xs font-bold ${ticker.up ? 'text-emerald-500' : 'text-red-500'}`}>
                        {ticker.change}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Analysis Brief
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="col-span-4 space-y-6">
          {/* Trending Topics */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Trending Topics
            </h5>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TOPICS.map(({ tag, color }) => (
                <span key={tag} className={`px-3 py-1.5 border rounded-lg text-xs font-semibold cursor-pointer hover:opacity-80 transition ${color}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Impactful Events */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              Impactful Events
            </h5>
            <div className="space-y-4 relative">
              <div className="absolute left-[11px] top-2 bottom-10 w-px bg-slate-100" />
              {EVENTS.map((event, i) => (
                <div key={i} className="relative pl-8 pb-4">
                  <div className={`absolute left-0 top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center z-10 shadow-sm border-2 ${event.active ? 'border-blue-500' : 'border-slate-300'}`}>
                    <div className={`w-2 h-2 rounded-full ${event.active ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{event.date}</p>
                    <h6 className="text-sm font-bold text-slate-800 mb-1">{event.title}</h6>
                    <p className="text-[10px] text-slate-500">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-slate-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100 hover:bg-blue-50 transition">
              View Economic Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 w-80 bg-blue-700 text-white p-5 rounded-xl shadow-2xl z-50 border border-blue-600">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-800 rounded-lg flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex-1">
              <h6 className="text-sm font-bold mb-1">Sentiment Reversal Detected</h6>
              <p className="text-[11px] leading-relaxed text-blue-100">Bullish divergence in tech sector newsflow over the last 12 hours.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-blue-300 hover:text-white text-lg leading-none">×</button>
          </div>
        </div>
      )}
    </div>
  );
}
