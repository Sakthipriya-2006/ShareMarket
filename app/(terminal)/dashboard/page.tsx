'use client';

export const dynamic = 'force-dynamic'
import { useEffect, useRef, useState } from 'react';
import {
  Wallet, TrendingUp, Brain, ArrowUpDown,
  ArrowUpRight, Star, ChevronRight, Download,
  AlertTriangle, CheckCircle, Bell
} from 'lucide-react';
import Link from 'next/link';

// Static mock market data
const MOCK_PRICES: { [key: string]: number } = {
  AAPL: 192.42,
  TSLA: 238.45,
  NVDA: 822.79,
  MSFT: 374.08,
  GOOGL: 141.22,
  AMZN: 175.35,
  AMD: 112.50,
  INTC: 44.80,
};

const ALPHA_SIGNALS = [
  {
    symbol: 'NVDA / USD', name: 'Breakout Pattern Identified', action: 'BUY',
    entry: '$742.50', target: '$785.00', stop: '$728.00', successRate: '94%',
  },
  {
    symbol: 'BTC / USDT', name: 'Resistance Test at 52k', action: 'HOLD',
    current: '$51,842', support: '$50,100', volume: 'Spiking', successRate: '',
  },
];

const RECENT_ALERTS = [
  {
    type: 'warning', title: 'Margin Warning', time: '08:42 AM',
    msg: 'Account level below 110% maintenance. Consider adding collateral.',
  },
  {
    type: 'success', title: 'Order Executed', time: '07:15 AM',
    msg: 'BUY 500 AAPL @ $184.12 successful. Position added to portfolio.',
  },
  {
    type: 'neutral', title: 'Price Alert: ETH', time: 'Yesterday',
    msg: 'ETH reached your target of $2,800. Review market conditions.',
  },
];

const MARKET_INTEL = [
  {
    category: 'Macro', color: 'bg-slate-100 text-slate-500', time: '2m ago',
    headline: 'Fed signals potential pause in rate hikes as inflation data cools faster',
  },
  {
    category: 'Crypto', color: 'bg-orange-50 text-orange-600', time: '15m ago',
    headline: 'Ethereum Layer-2 adoption hits all-time high as transaction costs decline...',
  },
  {
    category: 'Tech', color: 'bg-blue-50 text-blue-600', time: '1h ago',
    headline: 'Major AI chips manufacturer beats Q3 earnings estimate by 12%...',
  },
];

// Portfolio growth chart using SVG
function GrowthChart() {
  const points = [
    [0, 0.9], [0.1, 0.88], [0.2, 0.75], [0.3, 0.65], [0.4, 0.45],
    [0.5, 0.40], [0.6, 0.35], [0.7, 0.25], [0.8, 0.28], [0.9, 0.24], [1.0, 0.2],
  ];
  const W = 600, H = 240, P = 24;

  const toX = (x: number) => P + (W - P * 2) * x;
  const toY = (y: number) => P + (H - P * 3) * y;

  let d = '';
  points.forEach(([x, y], i) => {
    const cx = toX(x), cy = toY(y);
    if (i === 0) { d += `M${cx},${cy}`; }
    else {
      const [px, py] = points[i - 1];
      const cpx1 = toX(px) + (cx - toX(px)) / 2;
      const cpx2 = cpx1;
      d += ` C${cpx1},${toY(py)} ${cpx2},${cy} ${cx},${cy}`;
    }
  });

  const lastX = toX(1), lastY = toY(points[points.length - 1][1]);
  const firstX = toX(0);
  const fillPath = `${d} L${lastX},${H - P * 2} L${firstX},${H - P * 2} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[1, 2, 3, 4].map(i => {
        const y = (H - P * 2) * (i / 5) + P;
        return <line key={i} x1={P} y1={y} x2={W - P} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
      })}
      {/* Fill */}
      <path d={fillPath} fill="url(#growthGrad)" />
      {/* Line */}
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [activePeriod, setActivePeriod] = useState('1D');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => setUser(d.user))
      .catch(() => {});
  }, []);

  // Calculate portfolio value from holdings
  const portfolioValue = user?.holdings?.reduce((sum: number, h: any) => {
    const price = MOCK_PRICES[h.symbol] || h.avgPrice;
    return sum + price * h.quantity;
  }, 0) || 0;

  const totalValue = portfolioValue + (user?.cashBalance || 0);

  // Calculate today P&L (mock: 2.4% gain on portfolio value)
  const todayPL = portfolioValue * 0.024;

  const activeTrades = user?.holdings?.length || 0;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">Terminal Overview</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Real-time portfolio performance and AI-driven signals.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg p-1 text-[9px] sm:text-[11px] font-semibold text-slate-500 w-full sm:w-auto">
          {['1D', '1W', '1M', '1Y'].map(p => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded transition ${activePeriod === p ? 'bg-white shadow-sm border border-slate-100 text-blue-600' : 'hover:text-slate-900'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {/* Total Balance */}
        <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Balance</span>
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] sm:text-xs font-semibold text-blue-600 mt-1">
            +2.4% <span className="text-slate-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* Today's P&L */}
        <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today's P&L</span>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900">
            +${todayPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-blue-600 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            High Volatility
          </div>
        </div>

        {/* AI Confidence */}
        <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">AI Confidence</span>
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900">92%</div>
          <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full mt-2 sm:mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Active Trades */}
        <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Trades</span>
            <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900">{activeTrades}</div>
          <div className="text-[10px] sm:text-xs mt-1">
            <span className="text-orange-600 font-bold">4 Pending</span>{' '}
            <span className="text-slate-400">execution</span>
          </div>
        </div>
      </div>

      {/* Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        {/* Portfolio Growth Chart */}
        <div className="lg:col-span-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-slate-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Portfolio Growth</h3>
              <button className="text-slate-400 hover:text-slate-600 transition flex-shrink-0">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex-1 relative min-h-[200px] sm:min-h-[260px]">
              <GrowthChart />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] sm:text-[11px] font-medium text-slate-400 px-2">
                {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Intelligence */}
        <div className="lg:col-span-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-slate-200 h-full flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-4 sm:mb-6">Market Intelligence</h3>
            <div className="space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
              {MARKET_INTEL.map((item, i) => (
                <div key={i} className={`group cursor-pointer ${i > 0 ? 'border-t border-slate-50 pt-4 sm:pt-4' : ''}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase ${item.color}`}>
                      {item.category}
                    </span>
                    <span className="text-[9px] sm:text-[11px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-blue-600 transition line-clamp-2 sm:line-clamp-none">
                    {item.headline}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/news"
              className="w-full mt-4 sm:mt-6 flex items-center justify-center gap-2 text-blue-600 text-xs sm:text-xs font-bold py-2 sm:py-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition"
            >
              View Full Terminal
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Alpha Signals + Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
        {/* Alpha Signals */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Alpha Signals</h3>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse" />
              Live Processing
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {/* Signal 1: NVDA BUY */}
            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 hover:border-blue-300 transition group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">NVDA / USD</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">Breakout Pattern Identified</p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] font-black rounded">BUY</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Entry</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800">$742.50</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Target</p>
                  <p className="text-[10px] sm:text-xs font-bold text-blue-600">$785.00</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Stop</p>
                  <p className="text-[10px] sm:text-xs font-bold text-red-500">$728.00</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-blue-600">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  94% Success Rate
                </div>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 group-hover:text-blue-500 transition" />
              </div>
            </div>

            {/* Signal 2: BTC HOLD */}
            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 hover:border-blue-300 transition group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">BTC / USDT</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500">Resistance Test at 52k</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-black rounded">HOLD</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Current</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800">$51,842</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Support</p>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-800">$50,100</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">Volume</p>
                  <p className="text-[10px] sm:text-xs font-bold text-orange-600">Spiking</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500">
                  Consolidating...
                </div>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 group-hover:text-blue-500 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-slate-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Recent Alerts</h3>
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] sm:text-[10px] font-bold rounded-full">2 Unread</span>
            </div>
            <div className="space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
              {RECENT_ALERTS.map((alert, i) => (
                <div key={i} className={`flex gap-3 sm:gap-4 ${alert.type === 'neutral' ? 'opacity-60' : ''}`}>
                  <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-red-50 text-red-500' :
                    alert.type === 'success' ? 'bg-blue-50 text-blue-500' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {alert.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    {alert.type === 'success' && <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    {alert.type === 'neutral' && <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h5 className="text-[10px] sm:text-xs font-bold text-slate-900">{alert.title}</h5>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium flex-shrink-0">{alert.time}</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-none">{alert.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
