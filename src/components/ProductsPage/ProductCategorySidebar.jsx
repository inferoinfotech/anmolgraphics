"use client";

import { useEffect, useMemo, useState } from "react";
import { IconAdjustmentsHorizontal, IconSearch, IconX } from "@tabler/icons-react";
import { CategoryIcon } from "./productCategoryIcons";
import { mergeCategoriesForNav, normalizeCategorySelection } from "./productCategoryNavUtils";

const VISIBLE_DEFAULT = 8;

const rowFocus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B6E9C] focus-visible:outline-offset-2";

function CategoryRow({ category, active, onSelect }) {
  const count = category.products?.length ?? 0;

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(category.name)}
        aria-current={active ? "true" : undefined}
        className={`flex min-h-9 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-[background,color,box-shadow] duration-150 ${rowFocus} ${
          active
            ? "bg-[#E6F1F7] font-medium text-[#0E3A56] shadow-[inset_3px_0_0_#C48A3A]"
            : "text-[#12293A] hover:bg-[rgba(27,110,156,0.06)]"
        }`}
      >
        <CategoryIcon name={category.name} active={active} />
        <span className="min-w-0 flex-1 truncate leading-snug">{category.name}</span>
        <span className="ml-auto shrink-0 rounded-full bg-white px-2 py-px text-[11px] font-medium leading-5 text-[#7B8E9B]">
          {count}
        </span>
      </button>
    </li>
  );
}

function ProductCategoryPanel({ categories, selectedName, onSelect, className = "" }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const navCategories = useMemo(() => mergeCategoriesForNav(categories), [categories]);
  const selected = normalizeCategorySelection(selectedName);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navCategories;
    return navCategories.filter((c) => c.name.toLowerCase().includes(q));
  }, [navCategories, query]);

  const searchActive = query.trim().length > 0;

  const activeIndex = filtered.findIndex((c) => c.name === selected);
  const needsExpandForActive = !searchActive && activeIndex >= VISIBLE_DEFAULT;

  useEffect(() => {
    if (needsExpandForActive) setExpanded(true);
  }, [needsExpandForActive, selected]);

  const visibleList = useMemo(() => {
    if (searchActive || expanded) return filtered;
    return filtered.slice(0, VISIBLE_DEFAULT);
  }, [filtered, searchActive, expanded]);

  const hiddenCount = searchActive ? 0 : Math.max(0, filtered.length - VISIBLE_DEFAULT);

  const handleSelect = (name) => {
    onSelect(normalizeCategorySelection(name));
  };

  return (
    <div
      className={`flex max-h-[calc(100vh-120px)] flex-col overflow-hidden rounded-2xl bg-[#F3F6FA] p-4 ${className}`}
    >
      <h2 className="mb-3 text-lg font-medium text-[#0E3A56]">Product categories</h2>

      <div className="relative mb-3 shrink-0">
        <IconSearch
          size={18}
          stroke={1.75}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#5B7283]"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a category"
          className={`h-10 w-full rounded-lg border border-[#DCE6ED] bg-white pl-10 pr-9 text-sm text-[#12293A] placeholder:text-[#5B7283] ${rowFocus}`}
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#5B7283] hover:bg-white ${rowFocus}`}
            aria-label="Clear search"
          >
            <IconX size={16} stroke={1.75} aria-hidden />
          </button>
        ) : null}
      </div>

      <nav
        aria-label="Product categories"
        className="min-h-0 flex-1 overflow-y-auto [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin]"
      >
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#5B7283]">No categories found</p>
        ) : (
          <ul className="space-y-0.5">
            {visibleList.map((category) => (
              <CategoryRow
                key={category.name}
                category={category}
                active={selected === category.name}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        )}

        {!searchActive && hiddenCount > 0 ? (
          <div className="mt-3 border-t border-[#DCE6ED] pt-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className={`w-full text-center text-sm font-medium text-[#1B6E9C] transition hover:opacity-90 ${rowFocus}`}
            >
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
            </button>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export function ProductCategorySidebar({ categories, selectedName, onSelect }) {
  return (
    <aside className="hidden lg:block lg:self-start">
      <div className="sticky top-[96px]">
        <ProductCategoryPanel categories={categories} selectedName={selectedName} onSelect={onSelect} />
      </div>
    </aside>
  );
}

export function ProductCategoryMobileDrawer({ categories, selectedName, onSelect }) {
  const [open, setOpen] = useState(false);
  const selected = normalizeCategorySelection(selectedName);

  const handleSelect = (name) => {
    onSelect(name);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="mb-4 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#1B6E9C] bg-white px-4 text-sm font-medium text-[#1B6E9C] ${rowFocus}`}
      >
        <IconAdjustmentsHorizontal size={18} stroke={1.75} aria-hidden />
        Filter by category
        {selected !== "All" ? (
          <span className="text-[#5B7283]">· {selected}</span>
        ) : null}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close category filter"
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] rounded-t-2xl bg-[#F3F6FA] shadow-[0_-8px_32px_rgba(14,58,86,0.12)]"
            role="dialog"
            aria-modal="true"
            aria-label="Filter by category"
          >
            <div className="flex justify-center pb-1 pt-3">
              <span className="h-1 w-10 rounded-full bg-[#DCE6ED]" aria-hidden />
            </div>
            <div className="max-h-[calc(88vh-2rem)] overflow-hidden px-1 pb-6">
              <ProductCategoryPanel
                categories={categories}
                selectedName={selectedName}
                onSelect={handleSelect}
                className="max-h-none bg-transparent shadow-none"
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}