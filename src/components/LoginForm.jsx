import React, { useMemo, useState } from 'react';
import { ShieldCheck, User, Info } from 'lucide-react';

const TEST_USERS = {
  '1211052': { role: 'Planner', password: '1211052' },
  '1211053': { role: 'Booker', password: '1211053' },
  '1211054': { role: 'Vehicle assigner/router', password: '1211054' },
  '1211055': { role: 'Gate security', password: '1211055' },
  '1211056': { role: 'Maintainer', password: '1211056' },
  '1211057': { role: 'Weigh bridge worker', password: '1211057' },
  '1211058': { role: 'QA checker', password: '1211058' },
  '1211059': { role: 'Loading supervisor', password: '1211059' },
};

const ROLE_OPTIONS = [
  'Planner',
  'Booker',
  'Vehicle assigner/router',
  'Gate security',
  'Maintainer',
  'Weigh bridge worker',
  'QA checker',
  'Loading supervisor',
];

export default function LoginForm({ onLogin }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Planner');
  const [error, setError] = useState('');

  const detectedRole = useMemo(() => {
    const rec = TEST_USERS[employeeId?.trim()];
    return rec?.role || role;
  }, [employeeId, role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const id = employeeId.trim();
    const rec = TEST_USERS[id];
    if (!rec) {
      setError('Unknown Employee ID. Use one of the provided test accounts below.');
      return;
    }
    if (password !== rec.password) {
      setError('Incorrect password for this Employee ID.');
      return;
    }
    onLogin({ employeeId: id, role: rec.role });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
              placeholder="e.g., 1211052"
              inputMode="numeric"
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
              value={detectedRole}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">Role auto-detects from Employee ID.</p>
          </div>
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500"
          >
            <User className="w-4 h-4" /> Login
          </button>
        </form>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-indigo-600" />
          <p className="text-sm font-medium text-slate-900">Test Accounts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {Object.entries(TEST_USERS).map(([id, rec]) => (
            <div key={id} className="rounded border p-2">
              <p className="font-medium">{rec.role}</p>
              <p className="text-slate-600">ID: {id} • PW: {rec.password}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
