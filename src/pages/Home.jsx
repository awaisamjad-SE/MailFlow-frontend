import { useTheme } from '../context/ThemeContext';
import { Mail, Sun, Moon, Zap, Users, Sparkles, Layout, ArrowRight, Play, CheckCircle2, ShieldAlert, Key, Settings2 } from 'lucide-react';

export default function Home({ onEnter }) {
  const { isDark, toggle } = useTheme();

  const features = [
    {
      icon: Zap,
      title: 'Quick Send',
      desc: 'Instantly send a single email with live HTML previews. Perfect for quick notifications, testing, or basic direct emails.',
      color: 'from-violet-500 to-indigo-500',
    },
    {
      icon: Users,
      title: 'Bulk Send',
      desc: 'Upload a CSV of recipients and blast an email to all of them. Safe, throttled sending with progress indicators.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'Personalized CSV',
      desc: 'Send unique subjects and bodies to each recipient using variables. Use template tag placeholders like {{Name}} seamlessly.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Layout,
      title: 'Template Gallery',
      desc: 'Select from pre-configured rich layouts (Newsletter, Receipt, Welcome, Alert). Adjust colors and details on the fly.',
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Configure Webhook',
      desc: 'Set up your self-hosted n8n webhook URL in settings. It is stored securely in your LocalStorage.',
    },
    {
      number: '02',
      title: 'Draft & Preview',
      desc: 'Compose using our Rich Editor or select pre-built templates. Review the live sandboxed HTML preview.',
    },
    {
      number: '03',
      title: 'Automated Dispatch',
      desc: 'MailFlow pushes payloads directly to your n8n workflow for queued background delivery.',
    },
  ];

  const scrollToSetup = () => {
    const el = document.getElementById('setup-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen app-bg flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--accent-bg)] opacity-35 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 opacity-25 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-theme surface-1/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
              <Mail className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                MailFlow
              </span>
              <span className="text-[10px] ml-1.5 px-2 py-0.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] accent-text font-bold">
                v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl surface-2 hover:bg-[var(--surface-3)] border border-theme transition-all duration-350 cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <button
              onClick={onEnter}
              className="btn-primary"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center z-10 flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface-2 border border-theme text-xs font-semibold t2 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Requires custom n8n webhook setup</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight t1 max-w-4xl mx-auto leading-tight md:leading-none">
          Send Beautiful Emails{' '}
          <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Instantly & Elegantly
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl t2 max-w-2xl mx-auto leading-relaxed">
          The premium email automation companion. Supports quick messaging, customizable bulk dispatches, personalized CSV templates, and live visual HTML previews.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="btn-primary px-8 py-3.5 text-base shadow-xl"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Application</span>
          </button>
          <button
            onClick={scrollToSetup}
            className="btn-ghost px-8 py-3.5 text-base"
          >
            <span>Webhook Setup Guide</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-y border-theme py-8">
          <div>
            <h4 className="text-3xl font-extrabold t1 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">4 Modes</h4>
            <p className="text-xs font-semibold t3 uppercase tracking-wider mt-1">Unified Tooling</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold t1 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">100% Client</h4>
            <p className="text-xs font-semibold t3 uppercase tracking-wider mt-1">No Database Needed</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold t1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Live HTML</h4>
            <p className="text-xs font-semibold t3 uppercase tracking-wider mt-1">Real-Time Preview</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold t1 bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">LocalStorage</h4>
            <p className="text-xs font-semibold t3 uppercase tracking-wider mt-1">Private & Secure</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="surface-1 border-y border-theme py-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight t1">Tailored Sending Capabilities</h2>
            <p className="mt-4 text-base t2">
              Four robust components built to handle anything from debugging test emails to executing highly personalized marketing campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="card hover:border-[var(--accent)] transition-all duration-300 shadow-md flex gap-5 p-6 rounded-2xl group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg t1">{feat.title}</h3>
                    <p className="text-sm t2 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight t1 mb-16">Streamlined Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center max-w-sm mx-auto relative group">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center mb-6 shadow-lg shadow-violet-500/5 group-hover:scale-105 transition-transform duration-300">
                <span className="text-lg font-bold accent-text">{step.number}</span>
              </div>
              <h3 className="font-bold text-lg t1 mb-3">{step.title}</h3>
              <p className="text-sm t2 leading-relaxed">{step.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* Setup Guide Section */}
      <section id="setup-guide" className="surface-1 border-t border-theme py-24 z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight t1">n8n Webhook Setup Guide</h2>
            <p className="text-base t2 max-w-2xl mx-auto">
              MailFlow operates entirely on your browser. To send emails, you must configure your own n8n webhook workflow URL.
            </p>
          </div>

          {/* Privacy Banner */}
          <div className="alert-info border border-theme rounded-2xl flex items-start gap-4 p-5">
            <ShieldAlert className="w-6 h-6 shrink-0 text-[var(--info-text)] mt-0.5" />
            <div className="text-sm">
              <p className="font-bold mb-1">Privacy & Safety Notice</p>
              <p className="opacity-90 leading-relaxed">
                By default, MailFlow ships with **no preset webhook endpoint**. This keeps your email operations secure. All API endpoints you add are stored strictly in your browser's local sandbox (`localStorage`) and are called directly from your client machine.
              </p>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 flex gap-4 border border-theme">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-white shrink-0">
                <Key className="w-5 h-5 accent-text" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-base t1">1. Sign In to Dashboard</h4>
                <p className="text-sm t2 leading-relaxed">
                  Click the **Launch Application** button at the top. Sign in using the default administrator credentials:
                </p>
                <div className="p-3 bg-[var(--surface-2)] rounded-lg text-xs font-semibold t2 space-y-1 border border-theme mt-2 select-all">
                  <div>Username: <code className="accent-text">admin</code></div>
                  <div>Password: <code className="accent-text">admin</code></div>
                </div>
              </div>
            </div>

            <div className="card p-6 flex gap-4 border border-theme">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-white shrink-0">
                <Settings2 className="w-5 h-5 accent-text" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-base t1">2. Open API Configuration</h4>
                <p className="text-sm t2 leading-relaxed font-medium">
                  Once logged in, click the **Cog (Settings)** button in the top right header navigation. This slides open the Endpoint settings panel.
                </p>
              </div>
            </div>

            <div className="card p-6 flex gap-4 border border-theme">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5 accent-text" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-base t1">3. Enter your n8n Endpoint</h4>
                <p className="text-sm t2 leading-relaxed">
                  Paste your active n8n Production Webhook URL. It should accept JSON payloads containing recipients and email details.
                </p>
              </div>
            </div>

            <div className="card p-6 flex gap-4 border border-theme">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-5 h-5 accent-text" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-base t1">4. Save and Update Anytime</h4>
                <p className="text-sm t2 leading-relaxed">
                  Click **Save Changes**. The endpoint is stored locally. If you ever change n8n domains or deploy new webhook paths, simply open the Cog icon again to update or reset it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme surface-1 py-8 text-center text-xs t3 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 MailFlow Email Automation. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[var(--success-text)]">
              <CheckCircle2 className="w-4 h-4" /> System Operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
