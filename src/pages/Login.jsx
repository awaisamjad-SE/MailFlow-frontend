import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, User, AlertCircle, Sun, Moon } from 'lucide-react';

export default function Login({ onLoginSuccess, onBackToHome }) {
  const { isDark, toggle } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLoginSuccess();
      } else {
        setError('Invalid username or password. Try admin / admin.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen app-bg flex flex-col justify-between relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--accent-bg)] opacity-30 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-blue-500/10 opacity-20 blur-[120px] pointer-events-none" />

      {/* Floating Theme Button */}
      <div className="absolute top-6 right-6 z-55">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2.5 rounded-xl surface-2 hover:bg-[var(--surface-3)] border border-theme transition-colors cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="card-solid p-8 max-w-md w-full border border-theme shadow-2xl space-y-6 animate-slide-up">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-violet-600/20">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight t1">Secure Access</h2>
            <p className="t3 text-sm">Enter your credentials to manage MailFlow</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="field-label">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 t3">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="field-label">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 t3">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert-error flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 justify-center mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Back button */}
          <div className="text-center pt-2">
            <button
              onClick={onBackToHome}
              className="text-xs font-bold t3 hover:accent-text transition-colors bg-transparent border-none cursor-pointer"
            >
              ← Back to Landing Page
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] t4">
        MailFlow v2.0 • Secured Environment
      </footer>
    </div>
  );
}
