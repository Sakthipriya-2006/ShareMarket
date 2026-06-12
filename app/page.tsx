'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Compass, AlertCircle, ArrowRight, Check, X, ShieldAlert, Cpu, Heart, Coins } from 'lucide-react';
import { MainFooter } from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-brand-blue tracking-tight">SmartShare AI</span>
            </Link>
            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-semibold text-brand-blue border-b-2 border-brand-blue pb-1">
                Terminal
              </Link>
              <Link href="/market" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
                Market
              </Link>
              <Link href="/signals" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
                Signals
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-64 pl-10 pr-3 py-1.5 border border-slate-200 rounded-full bg-slate-100 text-sm focus:ring-brand-blue focus:border-brand-blue focus:outline-none"
                placeholder="Search Symbols..."
                onClick={() => router.push('/login')}
              />
            </div>
            
            {/* Action buttons */}
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition pr-2">
              Sign In
            </Link>
            <button
              onClick={() => router.push('/register')}
              className="bg-brand-blue hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
            >
              Open Free Terminal
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1 rounded-full mb-8">
            <Cpu className="w-4 h-4 text-brand-blue animate-pulse" />
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Next-Gen AI Analysis for Indian & Global Markets
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Institutional Intel for the
            <br />
            <span className="text-brand-blue">Modern Investor.</span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Predict market shifts with 94.2% historical accuracy. SmartShare AI processes millions of data points across global equities to deliver executable signals.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Open Free Terminal
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition shadow-sm"
            >
              View Live Market Data
            </button>
          </div>
        </div>

        {/* Index Tick Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 px-4">
          {/* NIFTY 50 */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NIFTY 50</span>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">+1.24%</span>
            </div>
            <div className="text-xl font-bold text-slate-800 mb-4">22,419.40</div>
            <div className="h-10 w-full bg-blue-50/30 rounded flex items-end">
              <svg className="w-full h-8 text-brand-blue" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 20 L10 15 L20 18 L30 12 L40 16 L50 8 L60 14 L70 10 L80 18 L90 5 L100 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* SENSEX */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SENSEX</span>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">+0.98%</span>
            </div>
            <div className="text-xl font-bold text-slate-800 mb-4">73,806.15</div>
            <div className="h-10 w-full bg-blue-50/30 rounded flex items-end">
              <svg className="w-full h-8 text-brand-blue" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 15 L15 18 L30 10 L45 15 L60 12 L75 18 L100 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* USD/INR */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">USD/INR</span>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">-0.04%</span>
            </div>
            <div className="text-xl font-bold text-slate-800 mb-4">82.88</div>
            <div className="h-10 w-full bg-red-50/30 rounded flex items-end">
              <svg className="w-full h-8 text-red-500" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 10 L20 15 L40 12 L60 18 L80 14 L100 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* GOLD */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">GOLD (MCX)</span>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">+2.15%</span>
            </div>
            <div className="text-xl font-bold text-slate-800 mb-4">66,240</div>
            <div className="h-10 w-full bg-blue-50/30 rounded flex items-end">
              <svg className="w-full h-8 text-brand-blue" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0 18 L20 12 L40 16 L60 8 L80 14 L100 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Analytical Powerhouse Features Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Analytical Powerhouse</h2>
              <p className="text-slate-500 font-medium">Beyond charts. Actionable insights driven by LLM pattern recognition.</p>
            </div>
            <Link href="/login" className="text-brand-blue font-bold flex items-center gap-1 hover:underline">
              View All Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Deep Signal Discovery */}
            <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center overflow-hidden">
              <div className="md:w-1/2">
                <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Deep Signal Discovery</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                  Our neural network scans 2,000+ global stocks in real-time, identifying institutional accumulation phases before the breakout occurs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Check className="w-4 h-4 text-brand-blue" />
                    Volume Anomaly Detection
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Check className="w-4 h-4 text-brand-blue" />
                    Sentiment Score Correlation
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="bg-slate-900 rounded-2xl p-4 shadow-2xl">
                  <img
                    alt="Signal Terminal Preview"
                    className="w-full h-auto rounded-lg border border-slate-700/50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA80nCaYk550tbLJqqKSitUl2MbXhyDvo6GNNJ1QHyFt1Haf0XIPEvTDt--xAae-rOm4-sB2ylr6lD0o8M-08v9hSt_rY8_4w1FVMI5OEs5VEeorov8hzAcblpnpLM67Gibuyo70gaksv7sMuPQwBLwOMEl9inhzpjSlEfKQ8Ab3th0cxMyHsqWDqxYafqk6m8yGzPNXp0Jv8wIroiIWj2HVv9IKdMGgytABVwSVq-UYDhUmBf8qB2yU9uY-LCU-7A1vs5XaSOqsO8"
                  />
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI Insights</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                  Summarized earnings reports and news sentiment delivered in plain English.
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <p className="text-xs font-semibold text-slate-600">
                    RELIANCE Sentiment: <span className="font-bold text-slate-900">88% Positive</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <p className="text-xs font-semibold text-slate-600">
                    HDFCBANK: <span className="font-bold text-slate-900">Divergence Detected</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary features grid bottom row */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex items-center gap-4">
              <div className="bg-blue-100 text-brand-blue w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-base mb-1">Portfolio Health</h4>
                <p className="text-slate-500 text-xs font-medium">Real-time risk assessment and automated rebalancing suggestions based on your profile.</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex items-center justify-between gap-6">
              <div className="max-w-md">
                <div className="bg-blue-100 text-brand-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-950 text-base mb-1">One-Click Execution</h4>
                <p className="text-slate-500 text-xs font-medium">Integrated with India's top brokers for seamless order execution directly from the analysis terminal.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-xs font-extrabold text-slate-600 border border-white shadow-sm">Z</span>
                <span className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-xs font-extrabold text-slate-600 border border-white shadow-sm">A</span>
                <span className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-xs font-extrabold text-slate-600 border border-white shadow-sm">G</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Timeline Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Your Journey to Alpha</h2>
          <p className="text-slate-500 font-semibold mb-16">Four steps to institutional-grade decision making.</p>
          
          <div className="relative space-y-12 max-w-3xl mx-auto">
            {/* Center connector line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            {/* Step 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-right">
              <div>
                <h4 className="text-brand-blue font-bold mb-1 text-sm uppercase tracking-wider">01. Connect</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Link your existing brokerage account or watchlists in under 60 seconds via secure API.
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <div className="z-10 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md">1</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
              <div className="flex justify-center md:justify-end order-2 md:order-1">
                <div className="z-10 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md">2</div>
              </div>
              <div className="order-1 md:order-2">
                <h4 className="text-brand-blue font-bold mb-1 text-sm uppercase tracking-wider">02. Analyze</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Our AI scans your holdings and the broader market for risk anomalies and growth opportunities.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-right">
              <div>
                <h4 className="text-brand-blue font-bold mb-1 text-sm uppercase tracking-wider">03. Signal</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Receive clear &quot;Buy/Sell/Hold&quot; signals based on multi-factor quantitative modeling.
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <div className="z-10 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md">3</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
              <div className="flex justify-center md:justify-end order-2 md:order-1">
                <div className="z-10 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md">4</div>
              </div>
              <div className="order-1 md:order-2">
                <h4 className="text-brand-blue font-bold mb-1 text-sm uppercase tracking-wider">04. Execute</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Verify the signal and execute the trade instantly without leaving the platform.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 font-medium">Choose the level of intelligence that matches your trading volume.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col h-full hover:shadow-md transition">
              <div className="mb-8">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Standard</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₹0</span>
                  <span className="text-slate-400 text-sm font-semibold">/mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">Ideal for casual monitoring.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-xs">
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  Real-time NSE/BSE Quotes
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  Basic News Feed
                </li>
                <li className="flex items-center gap-3 font-medium text-slate-300">
                  <X className="w-4 h-4 text-slate-300" />
                  AI Pattern Recognition
                </li>
              </ul>
              <button 
                onClick={() => router.push('/register')}
                className="w-full py-3 px-6 border border-brand-blue text-brand-blue font-bold rounded-lg hover:bg-blue-50 transition text-xs"
              >
                Start Free
              </button>
            </div>

            {/* Advanced Tier */}
            <div className="relative bg-white border-2 border-brand-blue rounded-3xl p-8 flex flex-col h-full shadow-lg shadow-blue-50 scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-[9px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Most Popular
              </div>
              <div className="mb-8">
                <h3 className="text-brand-blue font-bold text-xs uppercase tracking-widest mb-4">Advanced Terminal</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₹499</span>
                  <span className="text-slate-400 text-sm font-semibold">/mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">For active daily traders.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-xs">
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  All Standard Features
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  AI Buy/Sell Signals
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  Unlimited Watchlists
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  Institutional Sentiment Tracking
                </li>
              </ul>
              <button 
                onClick={() => router.push('/register')}
                className="w-full py-3 px-6 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-lg transition text-xs shadow-md shadow-blue-200"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Institutional Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col h-full hover:shadow-md transition">
              <div className="mb-8">
                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Institutional</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">₹1,499</span>
                  <span className="text-slate-400 text-sm font-semibold">/mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">For wealth managers & HNIs.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-xs">
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  White-label Terminal
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  API Integration Access
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-brand-blue" />
                  Dedicated Account Manager
                </li>
              </ul>
              <button 
                onClick={() => router.push('/register')}
                className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition text-xs border border-slate-200"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-brand-blue rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-xl shadow-blue-100">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-64 h-64 bg-blue-700 rounded-full blur-3xl opacity-40"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 relative z-10 leading-tight">
            Ready to transform your trades?
          </h2>
          <button 
            onClick={() => router.push('/register')}
            className="bg-white text-brand-blue px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition shadow-xl relative z-10"
          >
            Get 14 days free trial
          </button>
        </div>
      </section>

      {/* Landing Footer */}
      <MainFooter />
    </div>
  );
}
