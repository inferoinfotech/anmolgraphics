/**
 * Normalizers for /products/[slug]. Optional product fields are read defensively.
 *
 * @typedef {{ label: string, value: string }} SpecRow
 * @typedef {{ question: string, answer: string }} ProductFaq
 */

export function hasContent(value) {
  if (value == null) return false;
  if (Array.isArray(value)) {
    return value.some((item) => hasContent(item));
  }
  if (typeof value === "object") {
    return Object.values(value).some((v) => hasContent(v));
  }
  return String(value).trim().length > 0;
}

export function normalizeStringList(value) {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          return String(item.text ?? item.label ?? item.name ?? "").trim();
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof value === "string" && hasContent(value)) {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

/** @returns {SpecRow[]} */
export function normalizeSpecRows(product) {
  const alternate = product.specificationRows ?? product.specificationsList;
  if (Array.isArray(alternate)) {
    return alternate
      .map((row) => ({
        label: String(row?.label ?? row?.name ?? "").trim(),
        value: String(row?.value ?? "").trim(),
      }))
      .filter((row) => row.label && row.value);
  }

  const spec = product.specifications;
  if (Array.isArray(spec)) {
    return spec
      .map((row) => ({
        label: String(row?.label ?? "").trim(),
        value: String(row?.value ?? "").trim(),
      }))
      .filter((row) => row.label && row.value);
  }

  if (typeof spec === "string" && hasContent(spec)) {
    const lines = spec.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const parsed = lines
      .map((line) => {
        const colon = line.indexOf(":");
        if (colon > 0) {
          return {
            label: line.slice(0, colon).trim(),
            value: line.slice(colon + 1).trim(),
          };
        }
        const dash = line.indexOf(" - ");
        if (dash > 0) {
          return {
            label: line.slice(0, dash).trim(),
            value: line.slice(dash + 3).trim(),
          };
        }
        return null;
      })
      .filter(Boolean);
    if (parsed.length) return parsed;
    if (lines.length === 1) return [{ label: "Details", value: lines[0] }];
  }

  return [];
}

export function normalizeCustomisationItems(product) {
  const raw = product.customisationItems ?? product.customisation;
  const list = normalizeStringList(raw);
  const seen = new Set();
  return list.filter((item) => {
    if (seen.has(item)) return false;
    seen.add(item);
    return true;
  });
}

/** @returns {ProductFaq[]} */
export function normalizeFaqs(product) {
  if (!Array.isArray(product.faqs)) return [];
  return product.faqs
    .map((faq) => ({
      question: String(faq?.question ?? "").trim(),
      answer: String(faq?.answer ?? "").trim(),
    }))
    .filter((faq) => faq.question && faq.answer);
}

export function normalizeHighlights(product) {
  return normalizeStringList(product.highlights).slice(0, 6);
}

export function normalizeOptions(product) {
  return normalizeStringList(product.options);
}

export function normalizeIdealFor(product) {
  return normalizeStringList(product.idealFor);
}

export function getProductDeliveryInfo(product) {
  const dispatchTimeline = String(product.dispatchTimeline ?? "").trim();
  const bulkOrderTimeline = String(product.bulkOrderTimeline ?? "").trim();
  return { dispatchTimeline, bulkOrderTimeline };
}

export function parseVideoEmbed(url) {
  if (!hasContent(url)) return null;
  const raw = String(url).trim();

  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (id) return { type: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return { type: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
      const embed = parsed.pathname.match(/\/embed\/([^/?]+)/);
      if (embed?.[1]) {
        return { type: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${embed[1]}` };
      }
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.match(/(\d+)/)?.[1];
      if (id) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }
  } catch {
    /* not a valid URL */
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(raw)) {
    return { type: "mp4", embedUrl: raw };
  }

  return null;
}

export function getProductSheetUrl(product) {
  const url = product.productSheetUrl ?? product.sheetUrl ?? product.pdfUrl;
  return hasContent(url) ? String(url).trim() : "";
}

export function getVideoUrl(product) {
  const url = product.videoUrl ?? product.video;
  return hasContent(url) ? String(url).trim() : "";
}