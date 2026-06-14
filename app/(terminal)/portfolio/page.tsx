'use client';

export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react';
import { Download, MoreVertical } from 'lucide-react';

const MOCK_PRICES: { [key: string]: number } = {
  AAPL: 192.42,
  TSLA: 238.45,
  NVDA: 822.79,
  MSFT: 374.08,
  GOOGL: 141.22,
  AMZN: 175.35,
  AMD: 112.50,
  INTC: 44.80,
  META: 485.00,
  BTC: 64310.50,
  ETH: 3450.00,
};

type Period = '1D' | '1W' | '1M' | '1Y' | 'ALL';

const BAR_DATA = [30, 55, 40, 75, 60, 85, 95];
const BAR_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const ASSET_ICONS: { [key: string]: { bg: string; text: string; label: string } } = {
  AAPL: { bg: 'bg-blue-50', text: 'text-blue-600', label: '🍎' },
  BTC: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: '₿' },
  ETH: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Ξ' },
  NVDA: { bg: 'bg-green-50', text: 'text-green-600', label: 'N' },
  MSFT: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'M' },
  TSLA: { bg: 'bg-red-50', text: 'text-red-600', label: 'T' },
  AMZN: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'A' },
  GOOGL: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'G' },
  AMD: { bg: 'bg-slate-50', text: 'text-slate-600', label: 'A' },
  INTC: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'I' },
  META: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'M' },
};

export default function PortfolioPage() {
  const [user, setUser] = useState<any>(null);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [period, setPeriod] = useState<Period>('1M');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        setUser(d.user);
        setHoldings(d.user?.holdings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Compute portfolio metrics
  const portfolioValue = holdings.reduce((sum, h) => {
    const price = MOCK_PRICES[h.symbol] || h.avgPrice;
    return sum + price * h.quantity;
  }, 0);

  const costBasis = holdings.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0);
  const totalPL = portfolioValue - costBasis;
  const todayPL = portfolioValue * 0.01; // mock 1% daily gain
  const overallROI = costBasis > 0 ? ((portfolioValue - costBasis) / costBasis) * 100 : 0;

  // Asset allocation (simplified)
  const stockSymbols = ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'META', 'AMD', 'INTC'];
  const cryptoSymbols = ['BTC', 'ETH'];

  const stockValue = holdings.filter(h => stockSymbols.includes(h.symbol)).reduce((sum, h) => {
    return sum + (MOCK_PRICES[h.symbol] || h.avgPrice) * h.quantity;
  }, 0);
  const cryptoValue = holdings.filter(h => cryptoSymbols.includes(h.symbol)).reduce((sum, h) => {
    return sum + (MOCK_PRICES[h.symbol] || h.avgPrice) * h.quantity;
  }, 0);
  const cashBalance = user?.cashBalance || 0;

  const total = stockValue + cryptoValue + cashBalance || 1;
  const stockPct = Math.round((stockValue / total) * 100);
  const cryptoPct = Math.round((cryptoValue / total) * 100);
  const cashPct = Math.round((cashBalance / total) * 100);

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Portfolio Overview</h2>
          <p className="text-slate-500 text-sm">Track your global assets and AI-optimized returns</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Total Portfolio Value */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Total Portfolio Value</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-slate-900">
              ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded">+2.4%</span>
          </div>
          <div className="absolute -bottom-2 -right-2 text-slate-50 text-6xl rotate-12 font-black">💼</div>
        </div>

        {/* Today's P/L */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Today's P/L</p>
          <div className="flex items-baseline space-x-2">
            <h3 className={`text-3xl font-bold ${todayPL >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {todayPL >= 0 ? '+' : ''}${Math.abs(todayPL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="absolute -bottom-2 -right-2 text-slate-50 text-6xl rotate-12 font-black">📈</div>
        </div>

        {/* Overall ROI */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Overall ROI</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-blue-600">
              {overallROI >= 0 ? '+' : ''}{overallROI.toFixed(1)}%
            </h3>
            <span className="text-slate-400 text-xs font-medium italic">All Time</span>
          </div>
          <div className="absolute -bottom-2 -right-2 text-slate-50 text-6xl rotate-12 font-black">✨</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-800">Portfolio Performance</h4>
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-500">
              {(['1D', '1W', '1M', '1Y', 'ALL'] as Period[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    period === p ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between px-4 gap-3">
            {BAR_DATA.map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    background: i === BAR_DATA.length - 1
                      ? '#2563eb'
                      : i === BAR_DATA.length - 2
                        ? '#93c5fd'
                        : '#dbeafe',
                  }}
                />
                <span className="text-[10px] text-slate-400 font-medium">{BAR_MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h4 className="font-bold text-slate-800 mb-8">Asset Allocation</h4>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Stocks', pct: stockPct, color: 'bg-blue-600' },
              { label: 'Crypto', pct: cryptoPct, color: 'bg-emerald-500' },
              { label: 'Cash', pct: cashPct, color: 'bg-slate-600' },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${color}`} />
                    {label}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-slate-400 text-xs font-medium">Strategy:</span>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-md">
              {user?.riskProfile || 'Balanced'} Growth
            </span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
          <h4 className="font-bold text-slate-800 text-lg">Holdings Details</h4>
          <button className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-slate-400">Loading holdings...</div>
        ) : holdings.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-400 text-sm mb-2">No holdings yet.</p>
            <p className="text-slate-400 text-xs">Use the Trade Now button to start building your portfolio.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="holdings-table">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Quantity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Avg. Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Current Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">P/L ($)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Change %</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {holdings.map((holding) => {
                  const currentPrice = MOCK_PRICES[holding.symbol] || holding.avgPrice;
                  const pl = (currentPrice - holding.avgPrice) * holding.quantity;
                  const pct = ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                  const iconInfo = ASSET_ICONS[holding.symbol] || { bg: 'bg-slate-50', text: 'text-slate-600', label: holding.symbol.charAt(0) };

                  return (
                    <tr key={holding.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-xl ${iconInfo.bg} flex items-center justify-center mr-3 ${iconInfo.text} font-bold`}>
                            {iconInfo.label}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{holding.symbol}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{holding.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-slate-700 text-sm">
                        {holding.quantity.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-slate-700 text-sm">
                        ${holding.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-slate-700 text-sm">
                        ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`px-6 py-5 text-right font-bold text-sm ${pl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {pl >= 0 ? '+' : ''}${Math.abs(pl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          pct >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                        }`}>
                          {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
