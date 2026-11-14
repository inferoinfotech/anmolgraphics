'use client';

import { IDEAL_FOR_PRESETS } from '@/components/ProductsPage/productIdealForPresets';

export default function ProductIdealForPicker({ selected = [], onSelectedChange }) {
  const toggle = (label) => {
    const set = new Set(selected);
    if (set.has(label)) set.delete(label);
    else set.add(label);
    const ordered = IDEAL_FOR_PRESETS.filter((item) => set.has(item));
    onSelectedChange(ordered);
  };

  return (
    <section className="rounded-xl border border-ag-border bg-white p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-ag-ink">Ideal for</h3>
        <p className="mt-0.5 text-xs text-ag-ink/50">
          Who this product suits — shown as chips on the product page.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {IDEAL_FOR_PRESETS.map((label) => {
          const checked = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggle(label)}
              aria-pressed={checked}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ag-primary/40 ${
                checked
                  ? 'border-ag-primary bg-ag-primary/10 text-ag-primary'
                  : 'border-ag-border bg-white text-ag-ink/70 hover:border-ag-primary/40'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}