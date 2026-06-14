'use client';

export const dynamic = 'force-dynamic'
import { useState } from 'react';
import { Star } from 'lucide-react';

type SignalTab = 'Strong Buy' | 'Recent Alerts' | 'Watchlist' | 'Forex';

const SIGNALS = [
  {
    symbol: 'TSLA', fullName: 'Tesla, Inc. (TSLA)', initial: 'T',
    price: '$187.91', change: '-1.24%', changeUp: false,
    badge: 'Strong Buy', badgeColor: 'bg-blue-50 border-blue-100 text-blue-700',
    confidence: 94, growth: '+12.4', risk: 'Low', riskColor: 'text-red-500 bg-red-50/30',
    timeframe: '14 - 30 Days',
    rationale: 'Neural processing of recent supply chain optimizations in Shanghai suggests a margin improvement exceeding market consensus. Correlation with lithium futures volatility indicates a strategic entry window before the quarterly production announcement.',
    active: true,
  },
  {
    symbol: 'NVDA', fullName: 'NVIDIA Corp (NVDA)', initial: 'N',
    price: '$822.79', change: '+0.45%', changeUp: true,
    badge: 'Accumulate', badgeColor: 'bg-blue-50 border-blue-100 text-blue-700',
    confidence: 88, growth: '+8.2', risk: 'Med', riskColor: 'text-slate-600 bg-slate-100',
    timeframe: '5 - 10 Days',
    rationale: 'GPU allocation patterns among Tier-1 cloud providers indicate sustained demand cycles for H100 units. LLM infrastructure spending signals remain robust, though short-term overbought technical indicators suggest a staggered entry approach.',
    active: true,
  },
  {
    symbol: 'AAPL', fullName: 'Apple Inc. (AAPL)', initial: 'A',
    price: '$183.12', change: '+1.10%', changeUp: true,
    badge: 'Strong Buy', badgeColor: 'bg-blue-50 border-blue-100 text-blue-700',
    confidence: 91, growth: '+15.5', risk: 'Low', riskColor: 'text-red-500 bg-red-50/30',
    timeframe: '60 - 90 Days',
    rationale: 'Ecosystem lock-in metrics have reached a 3-year high in emerging markets. AI model suggests that the upcoming software services expansion will offset any hardware cyclicality, with institutional whale accumulation patterns forming at current price levels.',
    active: true,
  },
  {
    symbol: 'AMZN', fullName: 'Amazon.com (AMZN)', initial: 'A',
    price: '$175.35', change: '-0.82%', changeUp: false,
    badge: 'Watching', badgeColor: 'bg-slate-100 border-slate-200 text-slate-500',
    confidence: 65, growth: '--', risk: 'High', riskColor: 'text-red-400 bg-red-50/30 border-red-100',
    timeframe: 'TBD',
    rationale: 'Current logistics overhead signals are conflicting with AWS growth projections. AI Engine is awaiting European regulatory clarification before issuing a definitive directional signal. Volatility remains high in the near-term.',
    active: false,
  },
];

export default function SignalsPage() {
  const [activeTab, setActiveTab] = useState<SignalTab>('Strong Buy');
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">AI Signals Hub</h1>
          <p className="text-slate-500 mt-2 font-medium">Institutional sentiment analysis and predictive market signals.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 border border-blue-100 rounded-full py-1.5 px-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700">Live Engine</span>
          </div>
          <div className="bg-slate-100 rounded-full py-1.5 px-4">
            <span className="text-xs font-medium text-slate-600">Last update: 2m ago</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8 overflow-x-auto">
        <div className="flex gap-10">
          {(['Strong Buy', 'Recent Alerts', 'Watchlist', 'Forex'] as SignalTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm whitespace-nowrap transition ${
                activeTab === tab
                  ? 'font-bold text-blue-700 border-b-2 border-blue-700'
                  : 'font-medium text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SIGNALS.map((signal) => (
          <article
            key={signal.symbol}
            className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${!signal.active ? 'opacity-90' : ''}`}
          >
            <div className="p-6 flex-1">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm text-slate-700">
                    {signal.initial}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-none">{signal.fullName}</h3>
                    <p className="text-xs mt-1">
                      <span className="text-slate-600 font-medium">{signal.price}</span>{' '}
                      <span className={`font-bold ${signal.changeUp ? 'text-blue-500' : 'text-red-500'}`}>
                        {signal.change}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={`border text-[10px] font-black px-3 py-1.5 rounded-md tracking-wider uppercase ${signal.badgeColor}`}>
                  {signal.badge}
                </div>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {signal.confidence}<span className="text-sm font-medium">%</span>
                  </p>
                </div>
                <div className="bg-blue-50/50 rounded-xl p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Growth Exp.</p>
                  <p className={`text-2xl font-bold ${signal.growth === '--' ? 'text-slate-300' : 'text-blue-600'}`}>
                    {signal.growth}{signal.growth !== '--' ? <span className="text-sm font-medium">%</span> : null}
                  </p>
                </div>
                <div className={`rounded-xl p-3 text-center ${signal.riskColor}`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Risk Score</p>
                  <p className={`text-2xl font-bold ${signal.risk === 'Low' ? 'text-red-500' : signal.risk === 'High' ? 'text-red-400' : 'text-slate-600'}`}>
                    {signal.risk}
                  </p>
                </div>
              </div>

              {/* Timeframe */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Timeframe</p>
                <p className={`text-xs font-bold ${signal.active ? 'text-slate-900' : 'text-slate-400'}`}>
                  {signal.timeframe}
                </p>
              </div>

              {/* AI Rationale */}
              <div className={`border-l-4 rounded-r-lg p-4 ${signal.active ? 'bg-blue-50/40 border-blue-600' : 'bg-slate-50/80 border-slate-400'}`}>
                {signal.active ? (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest">AI Rationale</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest">! Pending Data</span>
                  </div>
                )}
                <p className={`text-xs leading-relaxed ${signal.active ? 'text-slate-600' : 'text-slate-500 italic'}`}>
                  {signal.rationale}
                </p>
              </div>
            </div>

            {/* Card Actions */}
            <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex items-center gap-2">
              <button
                className={`flex-1 font-bold py-3 px-4 rounded-lg transition-colors ${
                  signal.active
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-200 text-slate-800 cursor-not-allowed'
                }`}
                disabled={!signal.active}
              >
                {signal.active ? 'Open Position' : 'Insufficient Signal'}
              </button>
              <button
                onClick={() => toggleWatchlist(signal.symbol)}
                className={`p-3 border rounded-lg transition-colors ${
                  watchlist.has(signal.symbol)
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'border-slate-200 bg-white hover:bg-white text-slate-400'
                }`}
              >
                <Star className={`w-5 h-5 ${watchlist.has(signal.symbol) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
