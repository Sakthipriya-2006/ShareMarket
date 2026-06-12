'use client';

import { useEffect, useState } from 'react';
import {
  Settings, Bell, Lock, Eye, Zap, BarChart3, Globe, Moon,
  ChevronRight, ToggleLeft, Save, LogOut, Trash2, AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Account settings state
  const [accountData, setAccountData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    riskProfile: 'Balanced',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    priceAlerts: true,
    tradeNotifications: true,
    marketNews: true,
    weeklyReports: true,
    pushNotifications: false,
  });

  // Trading preferences state
  const [tradingPrefs, setTradingPrefs] = useState({
    autoLeverage: false,
    defaultLeverage: '1x',
    confirmTrades: true,
    soundAlerts: true,
    darkMode: false,
    showGrid: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'trading', label: 'Trading', icon: Zap },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition ${
                activeTab === tab.id
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Account Settings Tab */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Risk Profile
                </label>
                <select
                  value={accountData.riskProfile}
                  onChange={(e) => setAccountData({ ...accountData, riskProfile: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Conservative</option>
                  <option>Balanced</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Member Since</div>
              <div className="text-2xl font-bold text-slate-900">Jan 2024</div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Account Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-lg font-bold text-green-600">Active</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-sm text-slate-600 mb-2">Total Trades</div>
              <div className="text-2xl font-bold text-slate-900">47</div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-6">
            <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Danger Zone
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition">
                <LogOut size={18} />
                Logout All Sessions
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition">
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive trading alerts via email' },
                { key: 'priceAlerts', label: 'Price Alerts', desc: 'Get notified when prices hit targets' },
                { key: 'tradeNotifications', label: 'Trade Notifications', desc: 'Receive updates on your trades' },
                { key: 'marketNews', label: 'Market News', desc: 'Daily market analysis and news' },
                { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Performance and portfolio reports' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Mobile push notifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50">
                  <div>
                    <div className="font-medium text-slate-900">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [item.key]: !notifications[item.key as keyof typeof notifications],
                      })
                    }
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trading Preferences Tab */}
      {activeTab === 'trading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Trading Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default Leverage
                </label>
                <select
                  value={tradingPrefs.defaultLeverage}
                  onChange={(e) =>
                    setTradingPrefs({ ...tradingPrefs, defaultLeverage: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>1x</option>
                  <option>2x</option>
                  <option>5x</option>
                  <option>10x</option>
                </select>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                {[
                  { key: 'autoLeverage', label: 'Auto Leverage', desc: 'Automatically apply leverage to trades' },
                  { key: 'confirmTrades', label: 'Confirm Trades', desc: 'Require confirmation before placing trades' },
                  { key: 'soundAlerts', label: 'Sound Alerts', desc: 'Play sound for trade notifications' },
                  { key: 'darkMode', label: 'Dark Mode', desc: 'Enable dark theme' },
                  { key: 'showGrid', label: 'Show Grid', desc: 'Display grid on charts' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                    <div>
                      <div className="font-medium text-slate-900">{item.label}</div>
                      <div className="text-sm text-slate-500">{item.desc}</div>
                    </div>
                    <button
                      onClick={() =>
                        setTradingPrefs({
                          ...tradingPrefs,
                          [item.key]: !tradingPrefs[item.key as keyof typeof tradingPrefs],
                        })
                      }
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                        tradingPrefs[item.key as keyof typeof tradingPrefs] ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                          tradingPrefs[item.key as keyof typeof tradingPrefs] ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Security Settings</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <div>
                  <div className="font-medium text-slate-900">Change Password</div>
                  <div className="text-sm text-slate-500">Update your password regularly</div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <div>
                  <div className="font-medium text-slate-900">Two-Factor Authentication</div>
                  <div className="text-sm text-slate-500">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Not enabled
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <div>
                  <div className="font-medium text-slate-900">Active Sessions</div>
                  <div className="text-sm text-slate-500">Manage connected devices</div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <div>
                  <div className="font-medium text-slate-900">API Keys</div>
                  <div className="text-sm text-slate-500">Manage API access</div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                <div>
                  <div className="font-medium text-slate-900">Login History</div>
                  <div className="text-sm text-slate-500">View your login activities</div>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="font-bold text-blue-900 mb-4">Security Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Use a strong password with uppercase, numbers, and symbols</li>
              <li>• Enable two-factor authentication for maximum security</li>
              <li>• Never share your password or API keys with anyone</li>
              <li>• Review your active sessions regularly</li>
              <li>• Be cautious of phishing emails and always verify URLs</li>
            </ul>
          </div>
        </div>
      )}

      {/* Save Button */}
      {activeTab !== 'security' && (
        <div className="fixed bottom-8 right-8 flex gap-3">
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Changes saved successfully
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
