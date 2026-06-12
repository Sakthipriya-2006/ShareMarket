'use client';

import { useEffect, useState } from 'react';
import { Bell, Zap, CheckCircle, Plus, X, Trash2 } from 'lucide-react';

const MOCK_PRICES: { [key: string]: number } = {
  AAPL: 192.42, TSLA: 238.45, NVDA: 822.79, MSFT: 374.08,
  GOOGL: 141.22, AMZN: 175.35, AMD: 112.50, INTC: 44.80,
  BTC: 64310.50, ETH: 3450.00,
};

const TRIGGERED_HISTORY = [
  { title: 'Bitcoin Price Surge Triggered', msg: 'Value reached $65,420.12 (Target: $65,000)', time: 'Today, 10:24 AM', active: true },
  { title: 'Market Volatility Alert', msg: 'Total Market Cap dropped 2.4% in 15 mins', time: 'Today, 08:15 AM', active: false },
  { title: 'ETH Threshold Reached', msg: 'Gas price dropped below 15 gwei', time: 'Yesterday, 11:45 PM', active: false },
];

const STATIC_ALERTS = [
  { symbol: 'BTC', label: 'Bitcoin Price Surge', condition: 'Price > $65,000', frequency: 'Real-time', status: 'Active', color: 'bg-blue-100 text-blue-600' },
  { symbol: 'ETH', label: 'Ethereum Dip', condition: 'Price < $3,200', frequency: '5 Min', status: 'Active', color: 'bg-emerald-100 text-emerald-600' },
  { symbol: 'SOL', label: 'Solana Volume Spike', condition: 'Volume > 20% Avg', frequency: '1 Hour', status: 'Paused', color: 'bg-purple-100 text-purple-600' },
];

export default function AlertsPage() {
  const [userAlerts, setUserAlerts] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [symbol, setSymbol] = useState('AAPL');
  const [type, setType] = useState<'ABOVE' | 'BELOW'>('ABOVE');
  const [targetPrice, setTargetPrice] = useState('');
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => setUserAlerts(d.user?.alerts || []))
      .catch(() => {});
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, type, targetPrice: parseFloat(targetPrice) }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Alert created successfully!');
        setShowCreate(false);
        setTargetPrice('');
        // Refresh
        const me = await fetch('/api/auth/me').then(r => r.json());
        setUserAlerts(me.user?.alerts || []);
      } else {
        setMessage(data.error || 'Failed to create alert');
      }
    } catch {
      setMessage('Error creating alert');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
      setUserAlerts(prev => prev.filter(a => a.id !== id));
    } catch {}
  };

  const activeCount = userAlerts.filter(a => a.isActive && !a.isTriggered).length;
  const triggeredCount = userAlerts.filter(a => a.isTriggered).length;

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Smart Alerts</h1>
          <p className="text-slate-500 text-sm mt-0.5">Real-time price and market event notifications.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Alert
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Active</p>
            <h3 className="text-3xl font-bold mt-1">{activeCount + STATIC_ALERTS.filter(a => a.status === 'Active').length}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2">↑ 4 new this week</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Bell className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Triggered Today</p>
            <h3 className="text-3xl font-bold mt-1">{112 + triggeredCount}</h3>
            <p className="text-xs text-slate-400 font-medium mt-2">Last trigger 2m ago</p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">System Health</p>
            <h3 className="text-3xl font-bold mt-1">99.9%</h3>
            <div className="flex items-center gap-1 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-emerald-600 font-medium">All systems operational</p>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Alerts Section */}
        <div className="col-span-8 space-y-6">
          {/* Active Alerts Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Active Alerts</h2>
              <input
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Search alerts..."
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Alert Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Condition</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-center">Frequency</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Static demo alerts */}
                  {STATIC_ALERTS.map((alert) => (
                    <tr key={alert.symbol + alert.label} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${alert.color}`}>
                            {alert.symbol}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{alert.label}</div>
                            <div className="text-xs text-slate-500">Created recently</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{alert.condition}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">{alert.frequency}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          alert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Real user alerts */}
                  {userAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                            {alert.symbol}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{alert.symbol} Price Alert</div>
                            <div className="text-xs text-slate-500">Created {new Date(alert.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        Price {alert.type === 'ABOVE' ? '>' : '<'} ${alert.targetPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">Real-time</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          alert.isTriggered ? 'bg-orange-100 text-orange-800' :
                          alert.isActive ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {alert.isTriggered ? 'Triggered' : alert.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(alert.id)} className="text-slate-400 hover:text-red-500 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">Showing {STATIC_ALERTS.length + userAlerts.length} alerts</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded text-sm opacity-50 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-white">Next</button>
              </div>
            </div>
          </div>

          {/* Triggered History */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-slate-800">Triggered History</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto custom-scrollbar">
              {TRIGGERED_HISTORY.map((item, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`mt-1 w-2 h-2 rounded-full bg-red-500 ${item.active ? 'shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'opacity-50'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.msg}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mt-2 tracking-tight">{item.time}</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-blue-600 hover:underline">View Chart</button>
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">Clear All History</button>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="col-span-4 space-y-6">
          {/* Market Pulse */}
          <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Market Pulse
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Fear & Greed Index</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-orange-400">68</span>
                  <span className="text-xs font-medium text-slate-400">Greed</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 h-full" style={{ width: '68%' }} />
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">B</div>
                    <span className="text-sm font-medium">BTC DOM</span>
                  </div>
                  <span className="text-sm font-bold">52.4% <span className="text-emerald-400 ml-1 text-xs">↑</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">G</div>
                    <span className="text-sm font-medium">GAS (ETH)</span>
                  </div>
                  <span className="text-sm font-bold">24 Gwei <span className="text-red-400 ml-1 text-xs">↓</span></span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors">
              Full Market Overview
            </button>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              Pro Tip
            </div>
            <p className="text-sm text-blue-900 leading-relaxed">
              Use the <strong>Whale Watcher</strong> template to get notified when large transfers (&gt;$1M) move between exchanges.
            </p>
            <a href="#" className="inline-block mt-4 text-sm font-bold text-blue-600 hover:text-blue-800">Browse Templates →</a>
          </div>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowCreate(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Create Price Alert</h3>
            <p className="text-xs text-slate-500 mb-6">Get notified when an asset hits your target price.</p>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Symbol</label>
                <select
                  value={symbol}
                  onChange={e => setSymbol(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-semibold focus:ring-1 focus:ring-blue-500"
                >
                  {Object.keys(MOCK_PRICES).map(s => (
                    <option key={s} value={s}>{s} (${MOCK_PRICES[s].toLocaleString()})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                {(['ABOVE', 'BELOW'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-2 text-xs font-bold rounded-md transition-all ${
                      type === t ? 'bg-white shadow-sm border border-slate-200 text-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Price {t === 'ABOVE' ? '>' : '<'} Target
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={targetPrice}
                  onChange={e => setTargetPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500"
                  placeholder={`Current: $${MOCK_PRICES[symbol]?.toLocaleString()}`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold disabled:opacity-50 transition"
              >
                {creating ? 'Creating...' : 'Create Alert'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
