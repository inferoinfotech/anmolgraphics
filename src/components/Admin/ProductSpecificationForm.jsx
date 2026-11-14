'use client';

import { Plus, Trash2 } from 'lucide-react';
import { adminBtnSmallOutlineBlue, adminBtnIconDanger } from '@/components/Admin/adminButtonClasses';
import {
  getCategorySpecGroupName,
  getSpecFieldsForCategory,
} from '@/components/ProductsPage/productCategorySpecFields';

const inputClass =
  'w-full px-3 py-2 border border-ag-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ag-primary/40';

export default function ProductSpecificationForm({
  category,
  values,
  onValuesChange,
  customRows,
  onCustomRowsChange,
}) {
  const fields = getSpecFieldsForCategory(category);
  const groupName = getCategorySpecGroupName(category);

  const setField = (label, value) => {
    onValuesChange({ ...values, [label]: value });
  };

  const addCustomRow = () => {
    onCustomRowsChange([...customRows, { key: `custom-${Date.now()}`, label: '', value: '' }]);
  };

  const updateCustom = (key, patch) => {
    onCustomRowsChange(
      customRows.map((row) => (row.key === key ? { ...row, ...patch } : row))
    );
  };

  const removeCustom = (key) => {
    onCustomRowsChange(customRows.filter((row) => row.key !== key));
  };

  return (
    <section className="rounded-xl border border-ag-border bg-white p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-ag-ink">Specifications tab</h3>
        <p className="mt-0.5 text-xs text-ag-ink/50">
          Fields for <span className="font-medium text-ag-ink/70">{groupName}</span> — shown as
          rows on the product page. Leave blank if not applicable.
        </p>
      </div>

      {!category ? (
        <p className="text-sm text-slate-400">Choose a category to see specification fields.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map((label) => (
            <div key={label}>
              <label htmlFor={`spec-${label}`} className="mb-1 block text-xs font-semibold text-ag-ink/55 uppercase tracking-wider">
                {label}
              </label>
              <input
                id={`spec-${label}`}
                type="text"
                value={values[label] || ''}
                onChange={(e) => setField(label, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 border-t border-ag-border pt-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-ag-ink/55 uppercase tracking-wider">Extra fields</p>
          <button type="button" onClick={addCustomRow} className={adminBtnSmallOutlineBlue}>
            <Plus className="w-3.5 h-3.5 inline mr-1" aria-hidden />
            Add field
          </button>
        </div>
        {customRows.length === 0 ? (
          <p className="text-xs text-ag-ink/45">Optional rows outside the category template.</p>
        ) : (
          <ul className="space-y-2">
            {customRows.map((row) => (
              <li key={row.key} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <input
                  type="text"
                  value={row.label}
                  onChange={(e) => updateCustom(row.key, { label: e.target.value })}
                  placeholder="Label"
                  className={inputClass}
                  aria-label="Extra specification label"
                />
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => updateCustom(row.key, { value: e.target.value })}
                  placeholder="Value"
                  className={inputClass}
                  aria-label="Extra specification value"
                />
                <button
                  type="button"
                  onClick={() => removeCustom(row.key)}
                  className={`${adminBtnIconDanger} mb-0.5 justify-self-end sm:justify-self-auto`}
                  aria-label="Remove extra field"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}