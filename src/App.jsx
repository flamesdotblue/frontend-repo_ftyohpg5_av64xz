import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null);

  const handleNavigate = (next) => {
    if (next === 'landing') {
      setUser(null);
      setPage('landing');
      return;
    }
    setPage(next);
  };

  const handleLogin = (payload) => {
    setUser(payload);
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header onNavigate={handleNavigate} isAuthed={!!user} />

      {page === 'landing' && (
        <>
          <HeroSection onGetStarted={() => setPage('login')} />

          <section id="flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-4">Plant Flow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Planning',
                'Booking',
                'Vehicle assignment',
                'Gate In',
                'Maintenance yard',
                'Weighing Bridge Pre-load',
                'QA Pre-load check',
                'Loading Point',
                'Post-load W.B.',
                'Post-load fumigation',
                'Gate out',
              ].map((step) => (
                <div key={step} className="border rounded-lg p-4 bg-white">
                  <p className="font-medium">{step}</p>
                  <p className="text-sm text-slate-600 mt-1">Track container status as it moves through this stage.</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'login' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoginForm onLogin={handleLogin} />
        </section>
      )}

      {page === 'dashboard' && user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Welcome, {user.employeeId}</h2>
            <p className="text-slate-600">Role: {user.role}. Update tasks on the right; live container positions update on the left.</p>
          </div>
          <Dashboard user={user} />
        </section>
      )}

      <footer className="mt-16 py-8 border-t bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600">
          Built for real-time container orchestration across plant locations.
        </div>
      </footer>
    </div>
  );
}
