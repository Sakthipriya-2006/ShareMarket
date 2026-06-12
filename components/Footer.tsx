'use client';

import Link from 'next/link';

export function MainFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div>
            <div className="text-2xl font-extrabold text-slate-800 mb-4">SmartShare AI Terminal</div>
            <p className="text-slate-500 text-sm">
              © 2024 SmartShare AI Terminal. All rights reserved.
              <br />
              Market data delayed by 15 mins.
            </p>
          </div>
          <div className="flex flex-wrap gap-8">
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
              SEC Filings
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
              Help Center
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition">
              API Documentation
            </Link>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Trading in securities market are subject to market risks. Read all the related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 px-8 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-500">
        <div>
          <h5 className="font-bold text-slate-800 text-sm mb-1">SmartShare AI Terminal</h5>
          <p>© 2024 SmartShare AI Terminal. All rights reserved. Market data delayed by 15 mins.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
          <Link href="#" className="hover:text-brand-blue transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-brand-blue transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-brand-blue transition-colors">
            SEC Filings
          </Link>
          <Link href="#" className="hover:text-brand-blue transition-colors">
            Help Center
          </Link>
          <Link href="#" className="hover:text-brand-blue transition-colors">
            API Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
