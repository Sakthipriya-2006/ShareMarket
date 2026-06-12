'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp, TrendingDown, BarChart3, PieChart, Calendar,
  Download, Filter, MoreVertical, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Performance metrics
const PERFORMANCE_METRICS = [
  {
    label: 'Total Return',
    value: '+$5,974.00',
    percentage: '+4.80%',
    trend: 'up',
    timeframe: 'YTD'
  },
  {
    label: 'Avg Win Rate',
    value: '62.5%',
    percentage: '+8.2%',
    trend: 'up',
    timeframe: 'Last 30 days'
  },
  {
    label: 'Win/Loss Ratio',
    value: '1.85x',
    percentage: '+0.15x',
    trend: 'up',
    timeframe: 'This month'
  },
  {
    label: 'Max Drawdown',
    value: '-8.3%',
    percentage: '-0.5%',
    trend: 'down',
    timeframe: 'Peak to trough'
  }
];

// Monthly performance data
const MONTHLY_PERFORMANCE = [
  { month: 'Jan', return: 2.5, trades: 12 },
  { month: 'Feb', return: -1.2, trades: 8 },
  { month: 'Mar', return: 3.8, trades: 15 },
  { month: 'Apr', return: 1.5, trades: 10 },
  { month: 'May', return: 4.2, trades: 18 },
  { month: 'Jun', return: 2.1, trades: 14 }
];

// Asset allocation
const ASSET_ALLOCATION = [
  { symbol: 'AAPL', percentage: 7.4, value: '$9,260' },
  { symbol: 'MSFT', percentage: 4.8, value: '$5,973' },
  { symbol: 'BTC', percentage: 23.3, value: '$29,068.35' },
  { symbol: 'Cash', percentage: 64.5, value: '$80,198.65' }
];

// Trading statistics
const TRADING_STATS = [
  { label: 'Total Trades', value: '47', icon: 'trades' },
  { label: 'Winning Trades', value: '29', icon: 'win' },
  { label: 'Losing Trades', value: '18', icon: 'loss' },
  { label: 'Breakeven', value: '0', icon: 'breakeven' }
];

function PerformanceChart() {
  const maxReturn = Math.max(...MONTHLY_PERFORMANCE.map(d => d.return));
  const minReturn = Math.min(...MONTHLY_PERFORMANCE.map(d => d.return));
  const range = maxReturn - minReturn;

  return (
    <div className="space-y-4">
      {MONTHLY_PERFORMANCE.map((data) => {
        const normalized = (data.return - minReturn) / (range || 1);
        const isPositive = data.return >= 0;

        return (
          <div key={data.month} className="flex items-center gap-3">
            <div className="w-12 text-sm font-medium text-slate-600">{data.month}</div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isPositive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.max(normalized * 100, 5)}%` }}
                />
              </div>
              <div className="w-20 text-right">
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{data.return}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PieChartVisualization() {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="flex justify-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {ASSET_ALLOCATION.map((asset, index) => {
            const strokeDashoffset = currentOffset;
            const strokeDasharray = (asset.percentage / 100) * circumference;
            currentOffset += strokeDasharray;

            const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

            return (
              <circle
                key={asset.symbol}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={colors[index]}
                strokeWidth="35"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-currentOffset + strokeDasharray}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '100px 100px'
                }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-slate-900">$124.5K</div>
          <div className="text-xs text-slate-500">Total Value</div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">Your trading performance & insights</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-medium transition">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-8">
        {['1d', '7d', '30d', '90d', '1y', 'all'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tf.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {PERFORMANCE_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition"
          >
            <div className="text-sm text-slate-600 mb-2">{metric.label}</div>
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {metric.percentage}
              </div>
            </div>
            <div className="text-xs text-slate-500">{metric.timeframe}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Performance */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Monthly Performance</h2>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>
          <PerformanceChart />
        </div>

        {/* Asset Allocation */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Allocation</h2>
            <PieChart size={20} className="text-slate-400" />
          </div>
          <PieChartVisualization />
          <div className="mt-6 space-y-3">
            {ASSET_ALLOCATION.map((asset, idx) => {
              const colors = ['text-blue-600', 'text-green-600', 'text-amber-600', 'text-purple-600'];
              return (
                <div key={asset.symbol} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colors[idx]}`}></div>
                    <span className="text-slate-700">{asset.symbol}</span>
                  </div>
                  <span className="text-slate-900 font-medium">{asset.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {TRADING_STATS.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-sm text-slate-600 mb-3">{stat.label}</div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Performance Heatmap */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Performance by Asset</h2>
        <div className="space-y-4">
          {[
            { symbol: 'AAPL', return: '+12.5%', shares: '50', gain: '+$627.50' },
            { symbol: 'MSFT', return: '-1.7%', shares: '15', gain: '-$103.50' },
            { symbol: 'BTC', return: '+52.4%', shares: '0.452', gain: '+$10,034.20' },
            { symbol: 'CASH', return: '0%', shares: 'N/A', gain: '$0.00' }
          ].map((asset) => {
            const isPositive = !asset.return.startsWith('-') && asset.return !== '0%';
            return (
              <div
                key={asset.symbol}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div>
                  <div className="font-medium text-slate-900">{asset.symbol}</div>
                  <div className="text-sm text-slate-500">{asset.shares} units</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${isPositive ? 'text-green-600' : asset.return === '0%' ? 'text-slate-600' : 'text-red-600'}`}>
                    {asset.return}
                  </div>
                  <div className="text-sm text-slate-500">{asset.gain}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
