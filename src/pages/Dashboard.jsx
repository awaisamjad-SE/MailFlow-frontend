import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Sun, Moon, Zap, Users, Sparkles, Layout, Mail, Settings } from 'lucide-react';

import QuickSend from '../components/QuickSend';
import BulkSend from '../components/BulkSend';
import PersonalizedCSV from '../components/PersonalizedCSV';
import TemplateGallery from '../components/TemplateGallery';
import StatusToast from '../components/StatusToast';
import { getWebhookUrl, setWebhookUrl } from '../utils/api';

export default function Dashboard({ onBack }) {
  const { isDark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'bulk' | 'personalized' | 'templates'
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState(getWebhookUrl());
  const [toast, setToast] = useState(null);

  const tabs = [
    { id: 'quick', label: 'Quick Send', icon: Zap },
    { id: 'bulk', label: 'Bulk Send', icon: Users },
    { id: 'personalized', label: 'Personalized CSV', icon: Sparkles },
    { id: 'templates', label: 'Template Gallery', icon: Layout },
  ];

  const handleSaveWebhook = () => {
    if (!webhookUrlInput || webhookUrlInput.trim() === '') {
      setWebhookUrl('');
      setToast({
        type: 'info',
        message: 'Endpoint Cleared',
        details: 'Please configure an active webhook URL in Settings before sending.',
      });
    } else {
      setWebhookUrl(webhookUrlInput);
      setToast({
        type: 'success',
        message: 'Settings Updated',
        details: `Active endpoint: ${webhookUrlInput}`,
      });
    }
    setShowSettings(false);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'quick':
        return <QuickSend />;
      case 'bulk':
        return <BulkSend />;
      case 'personalized':
        return <PersonalizedCSV />;
      case 'templates':
        return <TemplateGallery onNavigateToQuick={() => setActiveTab('quick')} />;
      default:
        return <QuickSend />;
    }
  };

  return (
    <div className="min-h-screen app-bg flex flex-col transition-colors duration-300">
      {/* Top Header Navigation */}
      <header className="border-b border-theme surface-1 sticky top-0 z-30 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="btn-ghost px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                MailFlow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings button */}
            <button
              onClick={() => {
                setWebhookUrlInput(getWebhookUrl());
                setShowSettings(!showSettings);
              }}
              aria-label="Toggle settings"
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                showSettings
                  ? 'bg-[var(--accent-bg)] border-[var(--accent-border)] accent-text'
                  : 'surface-2 hover:bg-[var(--surface-3)] border-theme t2 hover:t1'
              }`}
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* Theme switcher */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-lg surface-2 hover:bg-[var(--surface-3)] border border-theme transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Tab Bar */}
      <div className="border-b border-theme surface-3 sticky top-16 z-20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[var(--accent-bg)] border border-[var(--accent-border)] accent-text'
                      : 't3 hover:t1 hover:bg-[var(--surface-2)] border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 animate-fade-in overflow-y-auto">
        {/* Runtime Webhook Configuration Settings Panel */}
        {showSettings && (
          <div className="card p-6 mb-8 animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-theme pb-2">
              <h3 className="font-bold text-base t1 flex items-center gap-2">
                <Settings className="w-5 h-5 accent-text" />
                <span>API Settings</span>
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="btn-ghost px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-2">
              <label className="field-label">n8n Webhook Endpoint URL</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  placeholder="https://n8n.awaisamjad.engineer/webhook/send-email"
                  className="input-field flex-1"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveWebhook}
                    className="btn-primary whitespace-nowrap"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
              <p className="text-xs t3">
                Change your self-hosted n8n webhook API path. The setting is saved in your browser's LocalStorage and will persist across reloads.
              </p>
            </div>
          </div>
        )}

        {renderActiveComponent()}
      </main>

      {toast && <StatusToast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
