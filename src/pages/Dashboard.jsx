import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Sun, Moon, Zap, Users, Sparkles, Layout, Mail } from 'lucide-react';

import QuickSend from '../components/QuickSend';
import BulkSend from '../components/BulkSend';
import PersonalizedCSV from '../components/PersonalizedCSV';
import TemplateGallery from '../components/TemplateGallery';

export default function Dashboard({ onBack }) {
  const { isDark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'bulk' | 'personalized' | 'templates'

  const tabs = [
    { id: 'quick', label: 'Quick Send', icon: Zap },
    { id: 'bulk', label: 'Bulk Send', icon: Users },
    { id: 'personalized', label: 'Personalized CSV', icon: Sparkles },
    { id: 'templates', label: 'Template Gallery', icon: Layout },
  ];

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
        {renderActiveComponent()}
      </main>
    </div>
  );
}
