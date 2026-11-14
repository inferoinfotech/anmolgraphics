const BADGE_ALIASES = new Set(["Badge", "Badges"]);

function uniqueProducts(products) {
  const seen = new Set();
  return products.filter((p) => {
    const id = p._id || p.slug;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

/** UI-only merge: Badge + Badges → single "Badges" row (preserves API order). */
export function mergeCategoriesForNav(categories) {
  if (!categories?.length) return [{ name: "All", products: [] }];

  const all = categories.find((c) => c.name === "All");
  const rest = categories.filter((c) => c.name !== "All");
  const result = [];
  let badgeProducts = [];
  let sawBadge = false;

  for (const cat of rest) {
    if (BADGE_ALIASES.has(cat.name)) {
      sawBadge = true;
      badgeProducts = badgeProducts.concat(cat.products || []);
      continue;
    }
    result.push(cat);
  }

  if (sawBadge) {
    result.push({ name: "Badges", products: uniqueProducts(badgeProducts) });
  }

  return [{ name: "All", products: all?.products ?? [] }, ...result];
}

/** Resolve selected category for product filtering (handles merged Badges). */
export function resolveSelectedCategory(rawCategories, selectedName) {
  const fallback = rawCategories[0] || { name: "All", products: [] };
  if (!selectedName || selectedName === "All") return fallback;

  const canonical =
    selectedName === "Badge" || selectedName === "Badges" ? "Badges" : selectedName;

  if (canonical === "Badges") {
    const products = uniqueProducts(
      rawCategories
        .filter((c) => BADGE_ALIASES.has(c.name))
        .flatMap((c) => c.products || [])
    );
    return { name: "Badges", products };
  }

  return rawCategories.find((c) => c.name === canonical) || fallback;
}

export function normalizeCategorySelection(name) {
  if (name === "Badge") return "Badges";
  return name;
}