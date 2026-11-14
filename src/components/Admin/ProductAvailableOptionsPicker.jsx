'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminBtnSmallPrimary, adminBtnIconDanger } from '@/components/Admin/adminButtonClasses';

export default function ProductAvailableOptionsPicker({
  selected = [],
  onSelectedChange,
  poolOptions = [],
  onAddToPool,
  onDeleteFromPool,
}) {
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [manageOpen, setManageOpen] = useState(false);

  const selectedSet = new Set(selected);

  const toggle = (name) => {
    if (selectedSet.has(name)) {
      onSelectedChange(selected.filter((n) => n !== name));
    } else {
      onSelectedChange([...selected, name]);
    }
  };

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name || !onAddToPool) return;
    setAdding(true);
    try {
      const created = await onAddToPool(name);
      if (created) {
        setNewName('');
        if (!selectedSet.has(created)) {
          onSelectedChange([...selected, created]);
        }
      }
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (opt) => {
    if (!onDeleteFromPool) return;
    setDeletingId(opt._id);
    try {
      const ok = await onDeleteFromPool(opt);
      if (ok) {
        onSelectedChange(selected.filter((n) => n !== opt.name));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="rounded-xl border border-ag-border bg-white p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-ag-ink">Available options</h3>
        <p className="mt-0.5 text-xs text-ag-ink/50">
          Select options shown as chips on the product page (for example Silver, Small).
        </p>
      </div>

      {poolOptions.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {poolOptions.map((opt) => {
            const checked = selectedSet.has(opt.name);
            return (
              <li key={opt._id}>
                <label
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                    checked
                      ? 'border-ag-primary bg-ag-active/40 text-ag-ink font-medium'
                      : 'border-ag-border bg-white text-ag-ink/80 hover:border-ag-ink/25'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-ag-border text-ag-primary focus:ring-ag-primary/40"
                    checked={checked}
                    onChange={() => toggle(opt.name)}
                  />
                  <span>{opt.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No options in the list yet. Add one below.</p>
      )}

      {selected.some((n) => !poolOptions.find((o) => o.name === n)) ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {selected
            .filter((n) => !poolOptions.find((o) => o.name === n))
            .map((name) => (
              <li key={name}>
                <label className="flex cursor-pointer items-center gap-2 rounded-full border border-ag-primary bg-ag-active/40 px-3 py-1.5 text-sm font-medium text-ag-ink">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded"
                    checked
                    onChange={() => toggle(name)}
                  />
                  <span>{name}</span>
                  <span className="text-[10px] uppercase text-ag-ink/45">custom</span>
                </label>
              </li>
            ))}
        </ul>
      ) : null}

      <div className="mt-3 flex gap-1.5">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="New option (e.g. Gold)"
          className="min-w-0 flex-1 px-3 py-2 border border-ag-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ag-primary/40"
          disabled={adding}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={adding || !newName.trim()}
          className={`${adminBtnSmallPrimary} shrink-0 inline-flex items-center gap-1 px-3 py-2 text-xs`}
        >
          <Plus className="w-3.5 h-3.5" aria-hidden />
          Add
        </button>
      </div>

      {poolOptions.length > 0 ? (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setManageOpen((v) => !v)}
            className="text-xs font-medium text-ag-primary hover:underline"
          >
            {manageOpen ? 'Hide' : 'Manage'} list ({poolOptions.length})
          </button>
          {manageOpen ? (
            <ul className="mt-1.5 max-h-28 overflow-y-auto ag-scrollbar ag-scrollbar-thin rounded-lg border border-ag-border divide-y divide-ag-border bg-slate-50/80">
              {poolOptions.map((opt) => (
                <li key={opt._id} className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-sm">
                  <span className="truncate text-ag-ink/80">{opt.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(opt)}
                    disabled={deletingId === opt._id}
                    className={adminBtnIconDanger}
                    aria-label={`Delete ${opt.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}