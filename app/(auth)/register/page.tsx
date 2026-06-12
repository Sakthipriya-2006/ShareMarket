'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, Scale, Shield, TrendingUp } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [riskProfile, setRiskProfile] = useState<'Conservative' | 'Balanced' | 'Aggressive'>('Balanced');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, riskProfile }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create account.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-2 sm:p-4 font-sans">
      <main className="bg-white rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-[1000px] min-h-screen sm:min-h-[700px] border border-slate-100">
        
        {/* Left branding panel */}
        <section className="bg-slate-50 w-full md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div>
            <h1 className="text-brand-blue text-xl sm:text-2xl font-bold mb-3 sm:mb-4">SmartShare AI</h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
              Join thousands of institutional traders using generative intelligence to secure their portfolio.
            </p>
            
            {/* Mock screenshot container */}
            <div className="mt-6 sm:mt-8 md:mt-12 relative">
              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img
                  alt="Terminal Preview"
                  className="w-full object-cover grayscale-[0.1] h-[180px] sm:h-[200px]"
                  src="/share.png"
                  style={{ objectPosition: '15% center' }}
                />
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-slate-900/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-full border border-white/20 font-bold uppercase tracking-wider">
                  Terminal v2.4
                </div>
              </div>
            </div>
          </div>

          {/* Compliances */}
          <div className="mt-6 sm:mt-8 md:mt-10">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue flex-shrink-0" />
              <span className="text-slate-500 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider">
                Institutional Grade Security
              </span>
            </div>
            <p className="text-slate-400 text-[9px] sm:text-[10px] font-medium">© 2024 SmartShare AI. All rights reserved.</p>
          </div>
        </section>

        {/* Right form panel */}
        <section className="w-full md:w-3/5 p-4 sm:p-8 md:p-14">
          <div className="max-w-md mx-auto">
            <header className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold">Start your journey with institutional-grade AI signals today.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-xs sm:text-sm bg-slate-50/50 placeholder-slate-400 focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all font-semibold text-slate-800"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-xs sm:text-sm bg-slate-50/50 placeholder-slate-400 focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all font-semibold text-slate-800"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </span>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg text-xs sm:text-sm bg-slate-50/50 placeholder-slate-400 focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all font-semibold text-slate-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Risk Profile Selection */}
              <div className="space-y-2 sm:space-y-3 pt-2">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                  Investment Risk Profile
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setRiskProfile('Conservative')}
                    className={`py-2 sm:py-3 flex flex-col items-center justify-center rounded-lg border transition-all text-[10px] sm:text-xs font-semibold ${
                      riskProfile === 'Conservative'
                        ? 'border-brand-blue bg-white text-brand-blue shadow-sm'
                        : 'border-transparent bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                    Conservative
                  </button>
                  <button
                    type="button"
                    onClick={() => setRiskProfile('Balanced')}
                    className={`py-2 sm:py-3 flex flex-col items-center justify-center rounded-lg border transition-all text-[10px] sm:text-xs font-semibold ${
                      riskProfile === 'Balanced'
                        ? 'border-brand-blue bg-white text-brand-blue shadow-sm'
                        : 'border-transparent bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <Scale className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                    Balanced
                  </button>
                  <button
                    type="button"
                    onClick={() => setRiskProfile('Aggressive')}
                    className={`py-2 sm:py-3 flex flex-col items-center justify-center rounded-lg border transition-all text-[10px] sm:text-xs font-semibold ${
                      riskProfile === 'Aggressive'
                        ? 'border-brand-blue bg-white text-brand-blue shadow-sm'
                        : 'border-transparent bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                    Aggressive
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs sm:text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue text-white font-bold py-3 sm:py-3.5 rounded-lg shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-50 text-xs sm:text-sm"
                >
                  {isSubmitting ? 'Provisioning account terminal...' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Login Link and Social logins */}
            <div className="mt-6 sm:mt-8 text-center space-y-4 sm:space-y-6">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-blue font-bold hover:underline transition">
                  Login
                </Link>
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                  <span className="bg-white px-3 sm:px-4 text-slate-400">Or register with</span>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 sm:gap-3 border border-slate-200 bg-white rounded-lg py-2 sm:py-2.5 hover:bg-slate-50 transition text-[10px] sm:text-xs font-bold text-slate-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 sm:gap-3 border border-slate-200 bg-white rounded-lg py-2 sm:py-2.5 hover:bg-slate-50 transition text-[10px] sm:text-xs font-bold text-slate-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"></path>
                  </svg>
                  <span className="hidden sm:inline">Apple</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
