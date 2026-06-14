'use client';

export const dynamic = 'force-dynamic'
import { useState } from 'react';
import { Filter, TrendingUp, TrendingDown, Brain } from 'lucide-react';

const EQUITIES = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 192.42, change: 1.24, volume: '52.4M', cap: '2.98T', trend: 'up', sparkPath: 'M0,25 L10,22 L20,24 L30,18 L40,20 L50,15 L60,10 L70,12 L80,5 L100,2' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 238.45, change: -3.12, volume: '108.2M', cap: '756.2B', trend: 'down', sparkPath: 'M0,5 L15,8 L30,15 L45,12 L60,20 L75,18 L90,25 L100,28' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 822.79, change: 5.84, volume: '42.1M', cap: '1.22T', trend: 'up', sparkPath: 'M0,25 L20,22 L40,15 L60,10 L80,5 L100,2' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.08, change: 0.42, volume: '24.5M', cap: '2.78T', trend: 'up', sparkPath: 'M0,15 L20,16 L40,14 L60,15 L80,13 L100,10' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.22, change: -0.88, volume: '19.8M', cap: '1.76T', trend: 'down', sparkPath: 'M0,15 L25,18 L50,22 L75,25 L100,28' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 175.35, change: 2.15, volume: '38.2M', cap: '1.51T', trend: 'up', sparkPath: 'M0,25 L20,20 L40,22 L60,15 L80,18 L100,10' },
  { symbol: 'META', name: 'Meta Platforms', price: 485.00, change: 1.72, volume: '18.4M', cap: '1.24T', trend: 'up', sparkPath: 'M0,20 L20,18 L40,15 L60,12 L80,8 L100,5' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 112.50, change: -1.05, volume: '84.1M', cap: '182.3B', trend: 'down', sparkPath: 'M0,10 L25,12 L50,18 L75,20 L100,25' },
];

const CRYPTO = [
  { symbol: 'BTC', name: 'Bitcoin', price: 64310.50, change: 2.34, volume: '28.5B', cap: '1.26T', trend: 'up', sparkPath: 'M0,20 L20,18 L40,12 L60,8 L80,10 L100,5' },
  { symbol: 'ETH', name: 'Ethereum', price: 3450.00, change: -1.18, volume: '12.2B', cap: '414.5B', trend: 'down', sparkPath: 'M0,8 L25,10 L50,15 L75,18 L100,22' },
  { symbol: 'SOL', name: 'Solana', price: 178.40, change: 4.21, volume: '3.4B', cap: '79.6B', trend: 'up', sparkPath: 'M0,25 L20,20 L40,15 L60,10 L80,5 L100,3' },
];

const FOREX = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0851, change: 0.12, volume: '5.2T', cap: '--', trend: 'up', sparkPath: 'M0,15 L20,14 L40,12 L60,13 L80,11 L100,10' },
  { symbol: 'GBP/USD', name: 'British Pound / USD', price: 1.2642, change: -0.08, volume: '1.8T', cap: '--', trend: 'down', sparkPath: 'M0,12 L25,14 L50,16 L75,17 L100,18' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.75, change: 0.32, volume: '2.1T', cap: '--', trend: 'up', sparkPath: 'M0,20 L20,18 L40,15 L60,14 L80,12 L100,10' },
];

const MOST_ACTIVE = [
  { symbol: 'TSLA', initial: 'T', volume: '108.2M' },
  { symbol: 'AMD', initial: 'A', volume: '84.1M' },
  { symbol: 'INTC', initial: 'I', volume: '61.5M' },
];

const INDICES = [
  { name: 'S&P 500', value: '4,550.58', change: '+0.12%', up: true },
  { name: 'NASDAQ 100', value: '15,841.35', change: '-0.45%', up: false },
  { name: 'DOW JONES', value: '34,947.28', change: '+0.08%', up: true },
];

type Tab = 'Equities' | 'Crypto' | 'Forex';

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Equities');
  const [page, setPage] = useState(1);

  const assets = activeTab === 'Equities' ? EQUITIES : activeTab === 'Crypto' ? CRYPTO : FOREX;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">Live Market Terminal</h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">Institutional-grade real-time market data across global equities.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto overflow-x-auto">
          {(['Equities', 'Crypto', 'Forex'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition whitespace-nowrap ${activeTab === tab
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-300 mx-1 sm:mx-2 hidden sm:block" />
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 font-semibold border border-gray-300 bg-white rounded-md text-xs sm:text-sm hover:bg-gray-50 whitespace-nowrap">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Market Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">7D Trend</th>
                <th className="px-6 py-4 text-right">Change %</th>
                <th className="px-6 py-4 text-right">Volume (24H)</th>
                <th className="px-6 py-4 text-right">Market Cap</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-700">{asset.symbol}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{asset.name}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-right">
                    ${typeof asset.price === 'number' ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : asset.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <svg className="w-24 h-8" viewBox="0 0 100 30">
                        <style>{`.sparkline{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}`}</style>
                        <path
                          className="sparkline"
                          d={asset.sparkPath}
                          stroke={asset.trend === 'up' ? '#3b82f6' : '#ef4444'}
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      asset.change >= 0
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">{asset.volume}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-600">{asset.cap}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-300 hover:text-blue-500 transition">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing {assets.length} of 1,482 assets</span>
          <div className="flex items-center space-x-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            {[1, 2, 3].map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                  page === p
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-3 gap-8">
        {/* Most Active */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Most Active</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {MOST_ACTIVE.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-xs text-gray-600">
                    {item.initial}
                  </div>
                  <span className="font-bold text-sm">{item.symbol}</span>
                </div>
                <span className="text-sm font-medium text-gray-500">{item.volume}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indices */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Indices</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <div className="space-y-4">
            {INDICES.map((index) => (
              <div key={index.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{index.name}</span>
                <div className="text-right">
                  <div className="font-bold text-sm">{index.value}</div>
                  <div className={`text-[10px] font-bold ${index.up ? 'text-blue-600' : 'text-red-500'}`}>
                    {index.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Sentiment */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">AI Sentiment</h3>
            <Brain className="w-5 h-5 text-gray-400" />
          </div>
          {/* Circular progress */}
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-gray-100" cx="56" cy="56" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-blue-600"
                cx="56" cy="56" fill="transparent" r="50"
                stroke="currentColor"
                strokeDasharray="314.159"
                strokeDashoffset="78.5"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-blue-600">75</div>
          </div>
          <h4 className="font-extrabold text-blue-700 text-sm tracking-widest uppercase mb-1">Bullish</h4>
          <p className="text-[10px] text-gray-500 leading-relaxed px-4">
            Market momentum indicates high institutional buying pressure.
          </p>
        </div>
      </div>
    </div>
  );
}
