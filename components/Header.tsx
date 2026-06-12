'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Wallet, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface HeaderProps {
  user: {
    id: string;
    name: string;
    cashBalance: number;
  } | null;
  onRefresh?: () => void;
}

const TICKER_PRICES: { [key: string]: number } = {
  AAPL: 192.42,
  TSLA: 238.45,
  NVDA: 822.79,
  MSFT: 374.08,
  GOOGL: 141.22,
  AMZN: 175.35,
  AMD: 112.50,
  INTC: 44.80,
};

export default function Header({ user, onRefresh }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isTradeOpen, setIsTradeOpen] = useState(false);
  const [tradeSymbol, setTradeSymbol] = useState('AAPL');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(1);
  const [tradeError, setTradeError] = useState('');
  const [tradeSuccess, setTradeSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState<any[]>([]);

  // Periodically fetch notifications or unread alerts
  useEffect(() => {
    if (!user) return;
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          // Filter alerts that are active or triggered
          if (data.user?.alerts) {
            const triggered = data.user.alerts.filter((a: any) => a.isTriggered);
            setUnreadAlerts(triggered);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const symbol = searchQuery.trim().toUpperCase();
    if (TICKER_PRICES[symbol] !== undefined) {
      router.push(`/analytics?symbol=${symbol}`);
    } else {
      router.push(`/market?search=${symbol}`);
    }
    setSearchQuery('');
  };

  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTradeError('');
    setTradeSuccess('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/portfolio/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: tradeSymbol,
          type: tradeType,
          quantity: Number(quantity),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setTradeError(data.error || 'Transaction failed.');
      } else {
        setTradeSuccess(`Successfully executed: ${tradeType} ${quantity} ${tradeSymbol}`);
        setTimeout(() => {
          setIsTradeOpen(false);
          setTradeSuccess('');
          setQuantity(1);
          if (onRefresh) onRefresh();
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      setTradeError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPrice = TICKER_PRICES[tradeSymbol] || 0;
  const estimatedCost = currentPrice * quantity;

  return (
    <>
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue"
            placeholder="Search symbols (e.g. AAPL, NVDA)..."
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Balance Widget */}
          {user && (
            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Wallet className="w-4 h-4 text-brand-blue" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cash:</span>
              <span className="text-sm font-bold text-slate-800">${user.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}

          {/* Notifications Bell */}
          <div className="relative cursor-pointer" onClick={() => router.push('/alerts')}>
            <Bell className="w-5 h-5 text-slate-400 hover:text-slate-600 transition" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          {/* Trade CTA */}
          <button 
            onClick={() => setIsTradeOpen(true)}
            className="bg-brand-blue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition"
          >
            Trade Now
          </button>
        </div>
      </header>

      {/* Trade Dialog Modal */}
      {isTradeOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsTradeOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Order Execution Terminal</h3>
            <p className="text-xs text-slate-500 mb-6">Place institutional trades directly inside the mock terminal.</p>

            <form onSubmit={handleTradeSubmit} className="space-y-4">
              {/* Trade Type Selection */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`py-2 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    tradeType === 'BUY' 
                      ? 'bg-white text-brand-blue shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 text-brand-blue" />
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`py-2 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    tradeType === 'SELL' 
                      ? 'bg-white text-red-600 shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                  SELL
                </button>
              </div>

              {/* Ticker Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Ticker Asset
                </label>
                <select
                  value={tradeSymbol}
                  onChange={(e) => setTradeSymbol(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-semibold focus:ring-1 focus:ring-brand-blue"
                >
                  {Object.keys(TICKER_PRICES).map((symbol) => (
                    <option key={symbol} value={symbol}>
                      {symbol} (${TICKER_PRICES[symbol].toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Volume Quantity
                </label>
                <input
                  type="number"
                  min="0.001"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-semibold focus:ring-1 focus:ring-brand-blue"
                  required
                />
              </div>

              {/* Cost Summary Info */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Asset Market Price</span>
                  <span className="font-semibold text-slate-900">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Total cost</span>
                  <span className="font-bold text-brand-blue text-sm">${estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {user && (
                  <div className="flex justify-between border-t border-slate-100 pt-2 text-slate-500">
                    <span>Your Cash Balance</span>
                    <span className={`font-semibold ${user.cashBalance < estimatedCost && tradeType === 'BUY' ? 'text-red-500 font-bold' : 'text-slate-800'}`}>
                      ${user.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>

              {/* Error and Success Notifications */}
              {tradeError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold">
                  {tradeError}
                </div>
              )}
              {tradeSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold">
                  {tradeSuccess}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || (!!user && user.cashBalance < estimatedCost && tradeType === 'BUY')}
                className={`w-full py-3 px-4 rounded-lg text-sm font-bold text-white shadow-md transition ${
                  tradeType === 'BUY' 
                    ? 'bg-brand-blue hover:bg-blue-700 shadow-blue-200' 
                    : 'bg-red-600 hover:bg-red-700 shadow-red-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Processing Order...' : `Execute ${tradeType}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
