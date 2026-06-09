import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'login' | 'dashboard'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEnter = () => {
    if (isLoggedIn) {
      setPage('dashboard');
    } else {
      setPage('login');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setPage('dashboard');
  };

  const handleBackToHome = () => {
    setPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('home');
  };

  return (
    <ThemeProvider>
      {page === 'home' && (
        <Home onEnter={handleEnter} />
      )}
      
      {page === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={handleBackToHome}
        />
      )}
      
      {page === 'dashboard' && (
        <Dashboard onBack={handleLogout} />
      )}
    </ThemeProvider>
  );
}
