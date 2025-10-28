import React, { useState } from 'react';
import { ShieldCheck, User } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Planner');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !password) return;
    onLogin({ employeeId, role });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-slate-900">Employee Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Employee ID</label>
          <input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="E.g., EMP1234"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {['Planner','Booker','Vehicle Assigner','Gate Security','Maintainer','Weighing Bridge','QA Checker','Loading Supervisor'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500"
        >
          <User className="w-4 h-4" /> Login
        </button>
      </form>
    </div>
  );
}
