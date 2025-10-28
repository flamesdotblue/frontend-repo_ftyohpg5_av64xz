import React, { useState, useCallback } from 'react';
import { Map, ClipboardList } from 'lucide-react';

const FLOW_STAGES = [
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
];

const ROLE_COLUMNS = {
  Planner: ['PO No', 'Plant', 'FCL Containers', 'Material', 'Fumigation Req', 'Batch No'],
  Booker: ['PO No', 'Containers Assigned'],
  'Vehicle assigner/router': ['Container No', 'Vehicle No', 'Route'],
  'Gate security': ['Container No', 'Arrival', 'Departure'],
  Maintainer: ['Container No', 'Maintenance', 'Pre-load Fumigation'],
  'Weigh bridge worker': ['Container No', 'Empty Wt', 'Loaded Wt', 'Post-load Fumigation', 'Billing'],
  'QA checker': ['Container No', 'Quality'],
  'Loading supervisor': ['Container No', 'Boxes Loaded'],
};

function LiveTracker({ containers }) {
  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-slate-900">Live Location</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {FLOW_STAGES.map((stage) => {
          const list = containers.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">{stage}</span>
                <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700">
                  {list.length}
                </span>
              </div>
              {list.length === 0 ? (
                <p className="text-sm text-slate-500">No containers</p>
              ) : (
                <ul className="space-y-1">
                  {list.map((c) => (
                    <li key={c.id} className="text-sm text-slate-800">{c.id} • PO {c.po}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function parsePaste(text) {
  // Accept TSV/CSV; split by newlines then by tab or comma
  return text
    .trim()
    .split(/\r?\n/)
    .map((row) => row.split(/\t|,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((c) => c.replace(/^"|"$/g, '')));
}

function ActionBoard({ role, onApplyRows }) {
  const columns = ROLE_COLUMNS[role] ?? ['Container No'];
  const [rows, setRows] = useState([Array(columns.length).fill('')]);

  const handlePaste = useCallback(
    (e) => {
      const text = e.clipboardData.getData('text');
      if (!text) return;
      e.preventDefault();
      const parsed = parsePaste(text);
      const normalized = parsed.map((r) => {
        const row = Array(columns.length).fill('');
        for (let i = 0; i < Math.min(columns.length, r.length); i++) row[i] = r[i];
        return row;
      });
      setRows(normalized);
    },
    [columns]
  );

  const updateCell = (r, c, val) => {
    setRows((prev) => prev.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? val : v)) : row)));
  };

  const apply = () => onApplyRows(rows);

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-900">Actions • {role}</h3>
        </div>
        <button
          onClick={apply}
          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
        >
          Apply Updates
        </button>
      </div>
      <div className="border rounded-lg overflow-auto bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 text-left font-medium text-slate-700 border-b">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody onPaste={handlePaste}>
            {rows.map((row, ri) => (
              <tr key={ri} className="even:bg-slate-50/40">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-1.5 border-b">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(ri, ci, e.target.value)}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onKeyDown={(e) => {
                        // Simple arrow navigation
                        const inputs = Array.from(e.currentTarget.closest('tbody').querySelectorAll('input'));
                        const idx = inputs.indexOf(e.currentTarget);
                        const cols = columns.length;
                        if (e.key === 'ArrowRight') inputs[Math.min(idx + 1, inputs.length - 1)]?.focus();
                        if (e.key === 'ArrowLeft') inputs[Math.max(idx - 1, 0)]?.focus();
                        if (e.key === 'ArrowDown') inputs[Math.min(idx + cols, inputs.length - 1)]?.focus();
                        if (e.key === 'ArrowUp') inputs[Math.max(idx - cols, 0)]?.focus();
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">Tip: Paste directly from Excel or Google Sheets. Use arrow keys to navigate.</p>
    </div>
  );
}

export default function Dashboard({ user }) {
  const [containers, setContainers] = useState(() => {
    // Seed demo containers across stages
    const sample = [
      { id: 'C-1001', po: 'PO-001', stage: 'Planning' },
      { id: 'C-1002', po: 'PO-001', stage: 'Booking' },
      { id: 'C-1003', po: 'PO-002', stage: 'Vehicle assignment' },
      { id: 'C-1004', po: 'PO-003', stage: 'Maintenance yard' },
      { id: 'C-1005', po: 'PO-003', stage: 'QA Pre-load check' },
      { id: 'C-1006', po: 'PO-004', stage: 'Loading Point' },
      { id: 'C-1007', po: 'PO-004', stage: 'Post-load W.B.' },
    ];
    return sample;
  });

  const applyRows = (rows) => {
    // For demo: if a row contains Container No and a new stage keyword, update stage heuristically
    const flat = [...containers];
    rows.forEach((r) => {
      const idx = columnsIndexMapper(user.role);
      const containerNo = idx !== -1 ? r[idx] : '';
      const nextStage = r.find((cell) => FLOW_STAGES.includes(cell));
      if (containerNo) {
        const i = flat.findIndex((c) => c.id === containerNo);
        if (i !== -1 && nextStage) flat[i] = { ...flat[i], stage: nextStage };
      }
    });
    setContainers(flat);
  };

  const columnsIndexMapper = (role) => {
    const map = {
      Planner: -1,
      Booker: 0, // PO
      'Vehicle assigner/router': 0, // Container No
      'Gate security': 0,
      Maintainer: 0,
      'Weigh bridge worker': 0,
      'QA checker': 0,
      'Loading supervisor': 0,
    };
    return map[role] ?? -1;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      <div className="rounded-xl border bg-white p-4 min-h-[320px]">
        <LiveTracker containers={containers} />
      </div>
      <div className="rounded-xl border bg-white p-4 min-h-[320px]">
        <ActionBoard role={user.role} onApplyRows={applyRows} />
      </div>
    </div>
  );
}
