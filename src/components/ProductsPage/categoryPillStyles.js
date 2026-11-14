/** Category pill colors for product detail (and reuse elsewhere). */

const DEFAULT = {
  bg: "#ffffff",
  border: "var(--ag-border)",
  text: "var(--ag-muted)",
};

const STYLES = [
  { match: (c) => c.includes("attach"), bg: "#faeeda", border: "#e8d7b8", text: "#7a5016" },
  { match: (c) => c.includes("badge"), bg: "#e6f1f7", border: "#c5d9e8", text: "#1b6e9c" },
  { match: (c) => c.includes("holder"), bg: "#f3f6fa", border: "#dce6ed", text: "#0e3a56" },
  { match: (c) => c.includes("lanyard"), bg: "#eef6ec", border: "#c8dcc4", text: "#5e6b16" },
  { match: (c) => c.includes("id card"), bg: "#e6f1f7", border: "#b8d4e8", text: "#0e3a56" },
  { match: (c) => c.includes("card"), bg: "#f0f4f8", border: "#dce6ed", text: "#12293a" },
  { match: (c) => c.includes("medal"), bg: "#fff8e8", border: "#ebd6ae", text: "#7a5016" },
  { match: (c) => c.includes("gift"), bg: "#fdf0f5", border: "#e8d0dc", text: "#7a3050" },
];

export function getCategoryPillStyle(category) {
  const c = (category || "").toLowerCase();
  const hit = STYLES.find((s) => s.match(c));
  if (hit) return hit;
  return DEFAULT;
}