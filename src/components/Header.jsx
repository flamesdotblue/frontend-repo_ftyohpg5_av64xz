import React from 'react';
import { Truck, Boxes, User, LogIn, LogOut } from 'lucide-react';

export default function Header({ onNavigate, isAuthed }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <Boxes className="w-6 h-6 text-indigo-600" />
          <span>Container Flow</span>
        </div>
        <nav className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Home
          </button>
          {!isAuthed ? (
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
