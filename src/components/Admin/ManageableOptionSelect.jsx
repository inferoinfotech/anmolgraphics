'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminBtnSmallPrimary, adminBtnIconDanger } from '@/components/Admin/adminButtonClasses';

const fieldClass =
  'w-full px-4 py-2.5 border border-ag-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ag-primary/40 text-sm bg-white';

export default function ManageableOptionSelect({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select…',
  addPlaceholder = 'Add new option',
  onAdd,
  onDelete,
  disabled = false,
}) {
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [manageOpen, setManageOpen] = useState(false);

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name || !onAdd) return;
    setAdding(true);
    try {
      const created = await onAdd(name);
      if (created) {
        setNewName('');
        onChange(created);
      }
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (option) => {
    if (!onDelete) return;
    setDeletingId(option._id);
    try {
      const ok = await onDelete(option);
      if (ok && value === option.name) {
        onChange('');
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-xs font-semibold text-ag-ink/55 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={fieldClass}
      >
        <option value="">{options.length ? placeholder : 'No options — add one below'}</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt.name}>
            {opt.name}
          </option>
        ))}
        {value && !options.some((o) => o.name === value) ? (
          <option value={value}>{value} (custom)</option>
        ) : null}
      </select>

      <div className="mt-2 flex gap-1.5">
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
          placeholder={addPlaceholder}
          className={`min-w-0 flex-1 px-3 py-2 border border-ag-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ag-primary/40`}
          disabled={disabled || adding}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled || adding || !newName.trim()}
          className={`${adminBtnSmallPrimary} shrink-0 inline-flex items-center gap-1 px-3 py-2 text-xs`}
        >
          <Plus className="w-3.5 h-3.5" aria-hidden />
          Add
        </button>
      </div>

      {options.length > 0 ? (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setManageOpen((v) => !v)}
            className="text-xs font-medium text-ag-primary hover:underline"
          >
            {manageOpen ? 'Hide' : 'Manage'} list ({options.length})
          </button>
          {manageOpen ? (
            <ul className="mt-1.5 max-h-28 overflow-y-auto ag-scrollbar ag-scrollbar-thin rounded-lg border border-ag-border divide-y divide-ag-border bg-slate-50/80">
              {options.map((opt) => (
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
    </div>
  );
}