'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
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
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-[#f8faff] to-[#f1f4ff] font-sans">
      <main className="flex-grow flex flex-col items-center justify-center p-3 sm:p-6 md:p-12">
        {/* Brand identity Header */}
        <header className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex justify-center mb-2 sm:mb-3">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L14.4 9.6H22L15.8 14.1L18.2 21.7L12 17.1L5.8 21.7L8.2 14.1L2 9.6H9.6L12 2Z"></path>
              <path d="M19 2L20 4.5L22.5 5.5L20 6.5L19 9L18 6.5L15.5 5.5L18 4.5L19 2Z" fillOpacity="0.6"></path>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">SmartShare AI</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Institutional Grade Analytics Terminal</p>
        </header>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg sm:shadow-xl shadow-slate-100">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">Welcome back</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-5 sm:mb-6 md:mb-8 font-medium">Enter your credentials to access the terminal.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700" htmlFor="email">
                Corporate Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 sm:pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-colors text-xs sm:text-sm font-medium bg-slate-50/50"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700" htmlFor="password">
                  Access Password
                </label>
                <Link href="#" className="text-[10px] sm:text-xs font-bold text-brand-blue hover:text-blue-500 transition">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 sm:pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-colors text-xs sm:text-sm font-medium bg-slate-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Keep Logged In Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-blue focus:ring-brand-blue border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-[10px] sm:text-xs text-slate-500 font-semibold cursor-pointer">
                Keep me logged in for 30 days
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 sm:p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-[10px] sm:text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-md shadow-blue-100 text-xs sm:text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Login'}
              <ChevronRight className="ml-1 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-5 sm:my-6 md:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                <span className="bg-white px-2 sm:px-3 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social mock log-ins */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 sm:gap-2 rounded-lg border border-slate-200 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="hidden sm:inline">Google</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 sm:gap-2 rounded-lg border border-slate-200 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"></path>
                </svg>
                <span className="hidden sm:inline">Apple</span>
              </button>
            </div>
          </form>
        </div>

        {/* Register link */}
        <div className="mt-5 sm:mt-6 md:mt-8 text-center text-xs sm:text-sm font-semibold text-slate-500">
          New to the terminal?
          <Link href="/register" className="text-brand-blue hover:text-blue-700 ml-1 transition">
            Register
          </Link>
        </div>

        {/* Compliances */}
        <div className="mt-5 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
            <span>256-bit AES</span>
          </div>
          <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
            <span>ISO 27001</span>
          </div>
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 sm:py-6 px-4 sm:px-8 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 font-medium">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-brand-blue font-bold text-base sm:text-lg">SmartShare AI</span>
          <span className="hidden sm:block text-slate-300 border-l border-slate-200 pl-3 text-xs sm:text-sm">Institutional Grade Analytics.</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
          <Link href="#" className="hover:text-brand-blue transition">Privacy</Link>
          <span className="text-slate-300">•</span>
          <Link href="#" className="hover:text-brand-blue transition">Terms</Link>
          <span className="text-slate-300">•</span>
          <Link href="#" className="hover:text-brand-blue transition">Disclosure</Link>
          <span className="text-slate-300">•</span>
          <Link href="#" className="hover:text-brand-blue transition">Contact</Link>
        </nav>
        <div className="text-[10px] sm:text-xs text-slate-400">
          © 2024 SmartShare AI.
        </div>
      </footer>
    </div>
  );
}
