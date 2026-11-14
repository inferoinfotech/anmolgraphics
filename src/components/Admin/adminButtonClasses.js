/** Shared admin button styles — primary fill uses brand ink #0E3A56 (sidebar nav unchanged) */

export const adminBtnPrimary =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-ag-ink text-white shadow-sm hover:bg-ag-ink-hover active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed';

export const adminBtnOutlineGold =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-transparent border border-ag-gold/60 text-ag-amber hover:bg-ag-gold/10 hover:border-ag-gold disabled:opacity-50 disabled:cursor-not-allowed';

export const adminBtnOutlineBlue =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-transparent border border-ag-ink/35 text-ag-ink hover:bg-ag-ink/5 disabled:opacity-50 disabled:cursor-not-allowed';

export const adminBtnDangerOutline =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-transparent border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50';

export const adminBtnDangerSolid =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-red-600 text-white border border-red-600 hover:bg-red-700 disabled:opacity-70 shadow-sm';

export const adminBtnIcon =
  'p-2 rounded-lg transition-all text-ag-ink/75 hover:text-ag-ink hover:bg-ag-mist';

export const adminBtnIconMuted =
  'p-2 rounded-lg transition-all text-ag-ink/45 hover:text-ag-ink/70 hover:bg-ag-mist';

export const adminBtnIconDanger =
  'p-2 rounded-lg transition-all text-red-500 hover:text-red-700 hover:bg-red-50';

export const adminBtnSidebarNav = (active) =>
  `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
    active
      ? 'bg-ag-active text-ag-active-text shadow-sm'
      : 'text-ag-sidebar-text/80 hover:bg-white/10 hover:text-white'
  }`;

export const adminBtnLogout =
  'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-ag-amber bg-transparent border border-ag-gold/60 hover:bg-ag-gold/10 hover:border-ag-gold transition-all';

export const adminBtnSmallOutlineBlue =
  'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-transparent border border-ag-ink/35 text-ag-ink hover:bg-ag-ink/5';

export const adminBtnSmallPrimary =
  'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all bg-ag-ink text-white shadow-sm hover:bg-ag-ink-hover';

/** Icon controls on ag-sidebar (mobile menu, modal close on dark headers) */
export const adminBtnSidebarChrome =
  'rounded-lg transition-all text-ag-sidebar-text/90 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed';

export const adminBtnGrip =
  'p-1 rounded-lg cursor-grab active:cursor-grabbing transition-all text-ag-ink/35 hover:text-ag-ink hover:bg-ag-mist';

export const adminBtnToolbar = (active) =>
  `px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
    active
      ? 'bg-ag-ink text-white shadow-sm'
      : 'text-ag-ink/65 hover:bg-ag-mist'
  }`;

export const adminBtnToolbarMd = (active, extra = '') =>
  `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${extra} ${
    active
      ? 'bg-ag-ink text-white shadow-sm hover:bg-ag-ink-hover'
      : 'text-ag-ink/65 hover:bg-ag-mist'
  }`;

/** Section move up/down — visible on light gray cards */
export const adminBtnSectionMove =
  'min-w-[1.85rem] h-8 inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all border border-ag-ink/30 bg-white text-ag-ink shadow-sm hover:bg-ag-mist hover:border-ag-ink/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white';
