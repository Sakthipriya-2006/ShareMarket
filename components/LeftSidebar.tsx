'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Zap, 
  Briefcase, 
  Newspaper, 
  Bell, 
  BarChart3, 
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface LeftSidebarProps {
  user: {
    name: string;
    riskProfile?: string;
  } | null;
}

export default function LeftSidebar({ user }: LeftSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Market', href: '/market', icon: TrendingUp },
    { name: 'Signals', href: '/signals', icon: Zap },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-40 transition-transform lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Top Brand Branding */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-brand-blue leading-none">SmartShare</span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
              AI-Powered Insights
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 sm:px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-active-nav text-brand-blue font-semibold border-l-2 border-brand-blue'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 ${
                  isActive ? 'text-brand-blue' : 'text-slate-400'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

      {/* Upgrade Promo and User Card */}
      <div className="p-3 sm:p-4 border-t border-slate-100 mt-auto space-y-4">
        <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-blue-900 border border-blue-100">
          <p className="text-[9px] sm:text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">
            Professional Tier
          </p>
          <p className="text-[10px] sm:text-xs mb-2 sm:mb-3 leading-tight text-slate-600">
            Unlock real-time data & AI predictive models.
          </p>
          <button className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-1.5 sm:py-2 rounded-lg text-xs transition shadow-sm">
            Upgrade
          </button>
        </div>

        {/* User profile row */}
        {user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-brand-blue font-bold flex items-center justify-center border border-slate-200 flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">
                  {user.riskProfile || 'Balanced'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  </>
  );
}
