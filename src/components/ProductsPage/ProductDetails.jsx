"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandWhatsapp,
  IconCheck,
  IconChevronDown,
  IconCircleCheck,
  IconClock,
  IconMinus,
  IconPackages,
  IconReceiptTax,
  IconShieldCheck,
  IconTruckDelivery,
  IconPlus,
  IconDownload,
  IconFileTypePdf,
  IconInfoCircle,
  IconPhone,
  IconPlayerPlay,
  IconSend,
  IconX,
} from "@tabler/icons-react";
import ProductCatalogCard from "./ProductCatalogCard";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetailDescription from "./ProductDetailDescription";
import { getCategoryPillStyle } from "./categoryPillStyles";
import { PRODUCT_DETAIL_STATIC as STATIC } from "./productDetailConstants";
import {
  getProductSheetUrl,
  getVideoUrl,
  hasContent,
  getProductDeliveryInfo,
  normalizeCustomisationItems,
  normalizeFaqs,
  normalizeHighlights,
  normalizeIdealFor,
  normalizeOptions,
  normalizeSpecRows,
  parseVideoEmbed,
} from "./productDetailData";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ag-blue)] focus-visible:outline-offset-2";


function toSentenceCase(value) {
  const s = String(value).trim();
  if (!s) return s;
  const lower = s.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function ProductHighlights({ highlights, headingId }) {
  if (!highlights.length) return null;
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-2 text-base font-medium text-[var(--ag-ocean)]">
        Highlights
      </h2>
      <ul className="grid grid-cols-1 gap-2 min-[640px]:grid-cols-2 lg:grid-cols-2">
        {highlights.map((text) => (
          <li
            key={text}
            className="flex items-start gap-2 rounded-lg border border-[var(--ag-border)] bg-white px-2.5 py-2 text-sm text-[var(--ag-text)]"
          >
            <IconCircleCheck
              className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--ag-olive)]"
              stroke={1.75}
              aria-hidden
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const OPTIONS_COLLAPSED_MAX = 8;

function ProductAvailableOptions({ options, headingId, withTopRule = false }) {
  const [showAll, setShowAll] = useState(false);

  if (!options.length) return null;

  const needsMore = options.length > OPTIONS_COLLAPSED_MAX;
  const visible = needsMore && !showAll ? options.slice(0, OPTIONS_COLLAPSED_MAX) : options;
  const hiddenCount = options.length - OPTIONS_COLLAPSED_MAX;

  return (
    <section
      aria-labelledby={headingId}
      className={withTopRule ? "border-t border-[var(--ag-row-border)] pt-4" : undefined}
    >
      <p id={headingId} className="mb-2 text-sm text-[var(--ag-muted)]">
        {STATIC.availableOptionsLabel}
      </p>
      <ul className="flex flex-wrap gap-2">
        {visible.map((opt) => (
          <li
            key={opt}
            className="rounded-full border border-[var(--ag-chip-border)] bg-white px-3 py-1 text-xs text-[var(--ag-text)]"
          >
            {toSentenceCase(opt)}
          </li>
        ))}
        {needsMore && !showAll ? (
          <li>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className={`inline-flex min-h-[44px] items-center rounded-full border border-[var(--ag-chip-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--ag-blue)] ${FOCUS}`}
            >
              {STATIC.optionsMore(hiddenCount)}
            </button>
          </li>
        ) : null}
      </ul>
    </section>
  );
}

function StarRating({ rating }) {
  const r = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
  return (
    <div className="flex gap-0.5" aria-label={`${r} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-base leading-none"
          style={{ color: i < r ? "var(--ag-amber)" : "var(--ag-star-empty)" }}
        >
          {i < r ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function ProductBackLink() {
  return (
    <Link
      href="/products"
      className={`mb-3 inline-flex min-h-[44px] max-w-full items-center gap-1.5 text-sm font-medium text-[var(--ag-blue)] sm:hidden ${FOCUS}`}
    >
      <IconArrowLeft size={18} stroke={2} aria-hidden className="shrink-0" />
      <span className="truncate">{STATIC.backToProducts}</span>
    </Link>
  );
}

function ProductBreadcrumb({ product }) {
  const categoryHref = product.category
    ? `/products?category=${encodeURIComponent(product.category)}`
    : "/products";

  return (
    <nav className="mb-6 hidden text-sm text-[var(--ag-muted)] sm:block" aria-label="Breadcrumb">
      <Link href="/" className={`hover:text-[var(--ag-blue)] ${FOCUS} rounded`}>
        Home
      </Link>
      <span className="mx-2">→</span>
      <Link href="/products" className={`hover:text-[var(--ag-blue)] ${FOCUS} rounded`}>
        Products
      </Link>
      {product.category ? (
        <>
          <span className="mx-2">→</span>
          <Link
            href={categoryHref}
            className={`hover:text-[var(--ag-blue)] ${FOCUS} rounded`}
          >
            {product.category}
          </Link>
        </>
      ) : null}
      <span className="mx-2">→</span>
      <span className="font-semibold text-[var(--ag-ocean)]">{product.title}</span>
    </nav>
  );
}

const TRUST_STRIP_ICONS = {
  gst: IconReceiptTax,
  bulk: IconPackages,
  delivery: IconTruckDelivery,
  quality: IconShieldCheck,
};

function ProductTrustStrip() {
  return (
    <div
      className="mt-3 grid grid-cols-2 gap-2 min-[640px]:grid-cols-4 min-[640px]:gap-2.5"
      role="list"
      aria-label="Purchase assurances"
    >
      {STATIC.trustStrip.map((item) => {
        const Icon = TRUST_STRIP_ICONS[item.id] || IconShieldCheck;
        return (
          <div
            key={item.id}
            role="listitem"
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--ag-border)] bg-[var(--ag-page-bg)] px-2 py-2.5 text-center"
          >
            <Icon
              size={20}
              stroke={1.75}
              className="shrink-0 text-[var(--ag-blue)]"
              aria-hidden
            />
            <span className="text-[11px] font-medium leading-tight text-[var(--ag-text)] sm:text-xs">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProductIdealForChips({ items }) {
  if (!items.length) return null;
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--ag-muted)]">
        {STATIC.idealForHeading}
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={STATIC.idealForHeading}>
        {items.map((label) => (
          <li key={label}>
            <span className="inline-flex rounded-full border border-[var(--ag-chip-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--ag-ocean)] sm:text-[13px]">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDeliveryTurnaround({ dispatchTimeline, bulkOrderTimeline }) {
  const lines = [
    dispatchTimeline ? { key: "dispatch", text: dispatchTimeline, Icon: IconTruckDelivery } : null,
    bulkOrderTimeline
      ? { key: "bulk", text: bulkOrderTimeline, Icon: IconClock }
      : null,
  ].filter(Boolean);

  if (!lines.length) return null;

  return (
    <div className="mt-4 rounded-[10px] border border-[var(--ag-faq-open-border)] bg-[var(--ag-mist)] px-3.5 py-3.5 max-md:px-[14px] max-md:py-[14px]">
      <p className="mb-2 text-xs font-medium text-[var(--ag-ocean)]">{STATIC.deliveryHeading}</p>
      <ul className="m-0 list-none space-y-2 p-0">
        {lines.map(({ key, text, Icon }) => (
          <li key={key} className="flex items-start gap-2.5 text-sm leading-snug text-[var(--ag-text)]">
            <Icon
              size={18}
              stroke={1.75}
              className="mt-0.5 shrink-0 text-[var(--ag-blue)]"
              aria-hidden
            />
            <span className="min-w-0 flex-1">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionButtons({ product, className = "" }) {
  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.whatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <div className={`space-y-2 ${className}`}>
      <Link
        href={inquiryHref}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--ag-blue-hover)] ${FOCUS}`}
      >
        <IconSend size={18} stroke={1.75} aria-hidden className="shrink-0" />
        <span>{STATIC.sendInquiry}</span>
        <IconArrowRight size={18} stroke={1.75} aria-hidden className="shrink-0" />
      </Link>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--ag-olive)] bg-white px-2 text-sm font-medium text-[var(--ag-olive-dark)] transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
        >
          <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden className="shrink-0" />
          <span className="truncate">{STATIC.whatsApp}</span>
        </a>
        <a
          href={`tel:${STATIC.phoneTel}`}
          title={STATIC.phoneDisplay}
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[var(--ag-blue)] bg-white px-2 text-sm font-medium text-[var(--ag-blue)] transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
        >
          <IconPhone size={18} stroke={1.75} aria-hidden className="shrink-0" />
          <span>{STATIC.callUs}</span>
        </a>
      </div>
    </div>
  );
}

function VideoModal({ open, onClose, embed }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [open, onClose]);

  if (!open || !embed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product video"
        className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-black/50 text-white hover:bg-black/70 ${FOCUS}`}
          aria-label="Close video"
        >
          <IconX size={22} stroke={1.75} />
        </button>
        <div className="aspect-video w-full">
          {embed.type === "mp4" ? (
            <video
              key={embed.embedUrl}
              src={embed.embedUrl}
              controls
              className="h-full w-full"
            >
              <track kind="captions" />
            </video>
          ) : (
            <iframe
              key={embed.embedUrl}
              title="Product video"
              src={embed.embedUrl}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

function faqIdFromSlug(slug) {
  return String(slug || "product").replace(/[^a-zA-Z0-9-]/g, "-");
}

function FaqAccordion({ faqs, productSlug, isTabActive }) {
  const [openIndex, setOpenIndex] = useState(0);
  const idBase = faqIdFromSlug(productSlug);

  useEffect(() => {
    if (isTabActive) setOpenIndex(0);
  }, [isTabActive]);

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => {
        const expanded = openIndex === index;
        const btnId = `faq-btn-${idBase}-${index}`;
        const panelId = `faq-${idBase}-${index}`;

        return (
          <article
            key={`${faq.question}-${index}`}
            className={`mb-2 overflow-hidden rounded-[10px] border bg-white transition-[border-color,background-color] duration-150 motion-reduce:transition-none last:mb-0 ${
              expanded
                ? "border-[var(--ag-faq-open-border)] bg-[var(--ag-faq-open-bg)]"
                : "border-[var(--ag-border)]"
            }`}
            style={expanded ? { boxShadow: "inset 3px 0 0 var(--ag-gold)" } : undefined}
          >
            <button
              type="button"
              id={btnId}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenIndex(expanded ? -1 : index)}
              className={`flex min-h-[44px] w-full items-center justify-between gap-3 px-[14px] py-[13px] text-left transition-colors duration-150 motion-reduce:transition-none ${
                expanded ? "" : "hover:bg-[rgba(27,110,156,0.04)]"
              } ${FOCUS}`}
            >
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-[var(--ag-ocean)]">
                {faq.question}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full motion-reduce:transition-none transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  expanded
                    ? "scale-100 bg-[var(--ag-blue)] text-white"
                    : "scale-100 bg-[var(--ag-faq-icon-bg)] text-[var(--ag-muted)]"
                }`}
                aria-hidden
              >
                {expanded ? (
                  <IconMinus size={14} stroke={2.25} />
                ) : (
                  <IconPlus size={14} stroke={2.25} />
                )}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!expanded}
              className={`grid motion-reduce:transition-none transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={`whitespace-pre-line px-[14px] pb-3 pt-0 text-sm leading-[1.65] text-[var(--ag-muted)] motion-reduce:transition-none transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    expanded
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-0 pointer-events-none"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const CUSTOMISATION_COLLAPSED_COUNT = 6;
const CUSTOMISATION_EXPAND_THRESHOLD = 8;

function CustomisationTabPanel({ items, product }) {
  const [showAll, setShowAll] = useState(false);
  const needsToggle = items.length > CUSTOMISATION_EXPAND_THRESHOLD;
  const visibleItems =
    needsToggle && !showAll ? items.slice(0, CUSTOMISATION_COLLAPSED_COUNT) : items;

  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.customisationWhatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <>
      <div>
        <h3 className="m-0 mb-0.5 text-sm font-medium text-[var(--ag-ocean)] sm:text-base">
          {STATIC.customisationHeading}
        </h3>
        <p className="mb-2 text-sm text-[var(--ag-muted)]">{STATIC.customisationSubtext}</p>
      </div>

      <ul className="m-0 list-none p-0">
        {visibleItems.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={`flex items-start gap-[10px] py-2.5 text-sm leading-normal text-[var(--ag-text)] sm:text-[15px] sm:leading-[1.5] ${
              index > 0 ? "border-t border-[var(--ag-row-border)]" : ""
            }`}
          >
            <span
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--ag-check-circle-bg)] text-[var(--ag-olive-dark)]"
              aria-hidden
            >
              <IconCheck size={13} stroke={2.25} />
            </span>
            <span className="min-w-0 flex-1">{item}</span>
          </li>
        ))}
      </ul>

      {needsToggle ? (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          aria-expanded={showAll}
          className={`mt-1 inline-flex min-h-[44px] items-center gap-1.5 rounded text-sm font-medium text-[var(--ag-blue)] transition hover:text-[var(--ag-blue-hover)] ${FOCUS}`}
        >
          {showAll
            ? STATIC.customisationShowLess
            : `${STATIC.customisationShowAll} (${items.length})`}
          <IconChevronDown
            size={16}
            stroke={2}
            aria-hidden
            className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
              showAll ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : null}

      <div className="mt-3.5 flex flex-col gap-3 rounded-[10px] border border-[var(--ag-faq-open-border)] bg-[var(--ag-mist)] px-[14px] py-3 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between min-[640px]:gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--ag-ocean)]">
            {STATIC.customisationHelpTitle}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-[var(--ag-muted)] min-[640px]:text-[13px]">
            {STATIC.customisationHelpSubtext}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 min-[640px]:w-auto min-[640px]:min-w-[min(100%,280px)] min-[640px]:flex-row">
          <Link
            href={inquiryHref}
            className={`inline-flex h-11 min-h-[44px] w-full flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-3 text-sm font-semibold text-white transition hover:bg-[var(--ag-blue-hover)] min-[640px]:h-10 min-[640px]:flex-initial min-[640px]:w-auto min-[640px]:px-4 ${FOCUS}`}
          >
            <IconSend size={18} stroke={1.75} aria-hidden />
            {STATIC.sendInquiry}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-11 min-h-[44px] w-full flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--ag-olive)] bg-white px-3 text-sm font-medium text-[var(--ag-olive-dark)] transition hover:bg-white min-[640px]:h-10 min-[640px]:flex-initial min-[640px]:w-auto min-[640px]:px-4 ${FOCUS}`}
          >
            <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden />
            {STATIC.whatsApp}
          </a>
        </div>
      </div>
    </>
  );
}

function FaqStillHaveQuestion({ product }) {
  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.faqWhatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <div className="mt-3.5 flex flex-col gap-3 rounded-[10px] border border-[var(--ag-faq-open-border)] bg-[var(--ag-mist)] px-[14px] py-3 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--ag-ocean)]">{STATIC.faqHelpTitle}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[var(--ag-muted)] min-[640px]:text-[13px]">
          {STATIC.faqHelpSubtext}
        </p>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-2 min-[640px]:w-auto min-[640px]:min-w-[min(100%,280px)] min-[640px]:flex-row">
        <Link
          href={inquiryHref}
          className={`inline-flex h-11 min-h-[44px] w-full flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-3 text-sm font-semibold text-white transition hover:bg-[var(--ag-blue-hover)] min-[640px]:h-10 min-[640px]:flex-initial min-[640px]:w-auto min-[640px]:px-4 ${FOCUS}`}
        >
          <IconSend size={18} stroke={1.75} aria-hidden />
          {STATIC.sendInquiry}
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-11 min-h-[44px] w-full flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--ag-olive)] bg-white px-3 text-sm font-medium text-[var(--ag-olive-dark)] transition hover:bg-white min-[640px]:h-10 min-[640px]:flex-initial min-[640px]:w-auto min-[640px]:px-4 ${FOCUS}`}
        >
          <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden />
          {STATIC.whatsApp}
        </a>
      </div>
    </div>
  );
}

function ProductFaqJsonLd({ faqs }) {
  if (!faqs.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProductDetailPage({ product, relatedProducts = [] }) {
  const images = useMemo(() => {
    const list = (product.images || []).filter(Boolean);
    if (list.length > 0) return list.slice(0, 8);
    if (product.thumbnail) return [product.thumbnail];
    return ["/placeholder.svg"];
  }, [product]);

  const [activeTab, setActiveTab] = useState("description");
  const [videoOpen, setVideoOpen] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(true);
  const tabListRef = useRef(null);
  const tabScrollDidInitRef = useRef(false);

  const pillStyle = getCategoryPillStyle(product.category);
  const availabilityRaw = hasContent(product.availabilityLabel)
    ? product.availabilityLabel.trim()
    : STATIC.availabilityLabel;
  const availability = availabilityRaw.replace(/\bavaiable\b/gi, "available");
  const materialValue = hasContent(product.material)
    ? product.material.trim()
    : STATIC.materialDefault;
  const orderTypeValue = hasContent(product.orderType)
    ? product.orderType.trim()
    : STATIC.orderType;
  const priceNote = hasContent(product.note) ? product.note.trim() : STATIC.priceNote;

  const highlights = useMemo(() => normalizeHighlights(product), [product]);
  const options = useMemo(() => normalizeOptions(product), [product]);
  const specRows = useMemo(() => normalizeSpecRows(product), [product]);
  const customItems = useMemo(() => normalizeCustomisationItems(product), [product]);
  const idealFor = useMemo(() => normalizeIdealFor(product), [product]);
  const deliveryInfo = useMemo(() => getProductDeliveryInfo(product), [product]);
  const faqs = useMemo(() => normalizeFaqs(product), [product]);
  const sheetUrl = useMemo(() => getProductSheetUrl(product), [product]);
  const videoEmbed = useMemo(() => {
    const url = getVideoUrl(product);
    return url ? parseVideoEmbed(url) : null;
  }, [product]);

  const tabs = useMemo(() => {
    const list = [{ id: "description", label: STATIC.tabs.description }];
    if (specRows.length) list.push({ id: "specifications", label: STATIC.tabs.specifications });
    if (customItems.length) list.push({ id: "customisation", label: STATIC.tabs.customisation });
    if (faqs.length) list.push({ id: "faqs", label: STATIC.tabs.faqs });
    return list;
  }, [specRows.length, customItems.length, faqs.length]);

  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab)) {
      setActiveTab("description");
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    tabScrollDidInitRef.current = false;
  }, [product.slug]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return undefined;

    const syncForViewport = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setStickyBarVisible(true);
        return null;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setStickyBarVisible(!entry.isIntersecting);
        },
        { root: null, threshold: 0, rootMargin: "0px 0px -1px 0px" }
      );
      observer.observe(footer);
      return observer;
    };

    let observer = syncForViewport();
    const onResize = () => {
      observer?.disconnect();
      observer = syncForViewport();
    };
    window.addEventListener("resize", onResize);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!tabScrollDidInitRef.current) {
      tabScrollDidInitRef.current = true;
      return;
    }
    const list = tabListRef.current;
    if (!list) return;
    const activeBtn = list.querySelector(`#tab-${activeTab}`);
    if (!(activeBtn instanceof HTMLElement)) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    const targetLeft =
      activeBtn.offsetLeft - list.clientWidth / 2 + activeBtn.clientWidth / 2;
    list.scrollTo({ left: Math.max(0, targetLeft), behavior });
  }, [activeTab]);

  const descriptionBody = hasContent(product.description)
    ? product.description.trim()
    : STATIC.descriptionPlaceholder;

  const onTabKeyDown = useCallback(
    (e) => {
      const ids = tabs.map((t) => t.id);
      const idx = ids.indexOf(activeTab);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveTab(ids[(idx + 1) % ids.length]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveTab(ids[(idx - 1 + ids.length) % ids.length]);
      }
    },
    [activeTab, tabs]
  );

  if (!product) return <div>Product not found</div>;

  const showLeftHighlights = highlights.length > 0;

  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.whatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <>
      <ProductFaqJsonLd faqs={faqs} />
      <ProductBackLink />
      <ProductBreadcrumb product={product} />

      <div className="max-md:flex max-md:flex-col max-md:gap-4 md:grid md:grid-cols-2 md:items-start md:gap-6 lg:flex lg:min-w-0 lg:items-start lg:gap-8">
        <div
          className="flex max-md:order-2 min-w-0 flex-col gap-4 md:col-start-1 md:row-start-1 lg:max-w-[1.05fr] lg:flex-[1.05] lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
          style={{ scrollbarGutter: "stable" }}
        >
          <ProductDetailGallery images={images} productTitle={product.title} />

          {videoEmbed ? (
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className={`flex w-full min-h-[44px] items-center gap-3 rounded-xl border border-[var(--ag-border)] bg-white p-3 text-left transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--ag-ocean)] text-white">
                <IconPlayerPlay size={26} stroke={1.75} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-[var(--ag-ocean)]">
                  {STATIC.videoTitle}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--ag-muted)]">
                  {STATIC.videoSubtitle}
                </span>
              </span>
            </button>
          ) : null}

          {showLeftHighlights ? (
            <div className="hidden lg:block">
              <ProductHighlights highlights={highlights} headingId="product-highlights-desktop" />
            </div>
          ) : null}
        </div>

        <div className="flex max-md:order-3 min-w-0 flex-col gap-4 md:col-start-2 md:row-start-1 lg:min-w-0 lg:flex-1">
          {product.category ? (
            <span
              className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: pillStyle.bg,
                border: `1px solid ${pillStyle.border}`,
                color: pillStyle.text,
              }}
            >
              {product.category}
            </span>
          ) : null}

          <h1 className="text-[length:clamp(22px,6vw,26px)] font-medium leading-[1.25] text-[var(--ag-ocean)] lg:text-[28px] lg:leading-tight xl:text-[32px]">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-[var(--ag-muted)]">{availability}</span>
          </div>

          {hasContent(product.description) ? (
            <ProductDetailDescription text={product.description.trim()} />
          ) : null}

          <div className="flex flex-col gap-3">
            <ProductAvailableOptions
              options={options}
              headingId="product-options"
              withTopRule={false}
            />

            <dl className="w-full text-sm leading-[1.25]">
              <div className="flex items-start justify-between gap-4 border-t border-[var(--ag-row-border)] py-2.5">
                <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.category}</dt>
                <dd className="min-w-0 text-right font-medium text-[var(--ag-text)] break-words">
                  {product.category || "—"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-[var(--ag-row-border)] py-2.5">
                <dt className="shrink-0 text-[var(--ag-muted)]">{STATIC.detailLabels.material}</dt>
                <dd className="min-w-0 text-right font-medium text-[var(--ag-text)] break-words">
                  {materialValue}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-[var(--ag-row-border)] py-2.5">
                <dt className="shrink-0 text-[var(--ag-muted)]">{STATIC.detailLabels.orderType}</dt>
                <dd className="min-w-0 text-right font-medium text-[var(--ag-text)] break-words">
                  {orderTypeValue}
                </dd>
              </div>
            </dl>
          </div>

          <ActionButtons product={product} className="hidden md:block" />

          <div className="hidden flex-col gap-4 lg:flex">
            <div className="[&>div]:!mt-0">
              <ProductTrustStrip />
            </div>
            <ProductIdealForChips items={idealFor} />
            <ProductDeliveryTurnaround
              dispatchTimeline={deliveryInfo.dispatchTimeline}
              bulkOrderTimeline={deliveryInfo.bulkOrderTimeline}
            />
          </div>
        </div>

        <div className="flex max-md:order-9 flex-col gap-4 md:col-span-2 md:col-start-1 lg:hidden">
          <div className="[&>div]:!mt-0">
            <ProductTrustStrip />
          </div>
          <ProductIdealForChips items={idealFor} />
          <ProductDeliveryTurnaround
            dispatchTimeline={deliveryInfo.dispatchTimeline}
            bulkOrderTimeline={deliveryInfo.bulkOrderTimeline}
          />
        </div>

        {showLeftHighlights ? (
          <div className="max-md:order-[11] md:col-span-2 md:col-start-1 lg:hidden">
            <ProductHighlights highlights={highlights} headingId="product-highlights-mobile" />
          </div>
        ) : null}
      </div>

      <div className="mt-6 rounded-xl border border-[var(--ag-border)] bg-white p-4 sm:mt-8 sm:p-5">
        {tabs.length > 1 ? (
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Product information"
            className="product-detail-tabs-fade ag-scrollbar-hide -mx-4 flex max-md:flex-nowrap gap-4 overflow-x-auto border-b border-[var(--ag-border)] px-4 pb-0 sm:mx-0 sm:gap-6 sm:px-0 md:flex-wrap md:overflow-visible"
            onKeyDown={onTabKeyDown}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[44px] shrink-0 whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition sm:shrink ${FOCUS} ${
                    active
                      ? "border-[var(--ag-gold)] font-medium text-[var(--ag-ocean)]"
                      : "border-transparent font-normal text-[var(--ag-muted)] hover:text-[var(--ag-text)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : (
          <h2 className="border-b border-[var(--ag-border)] pb-3 text-sm font-medium text-[var(--ag-ocean)]">
            {STATIC.tabs.description}
          </h2>
        )}

        <div
          role="tabpanel"
          id="panel-description"
          aria-labelledby={`tab-${tabs.some((t) => t.id === "description") ? "description" : "description"}`}
          hidden={activeTab !== "description"}
          className="pt-4 text-[15px] leading-relaxed text-[var(--ag-muted)]"
        >
          {activeTab === "description" ? (
            <p className="whitespace-pre-line">{descriptionBody}</p>
          ) : null}
        </div>

        {specRows.length > 0 ? (
          <div
            role="tabpanel"
            id="panel-specifications"
            aria-labelledby="tab-specifications"
            hidden={activeTab !== "specifications"}
            className="pt-4"
          >
            {activeTab === "specifications" ? (
              (() => {
                const mid = Math.ceil(specRows.length / 2);
                const leftRows = specRows.slice(0, mid);
                const rightRows = specRows.slice(mid);

                const SpecColumn = ({ rows, offset }) => (
                  <dl className="min-w-0">
                    {rows.map((row, index) => (
                      <div
                        key={`${row.label}-${offset + index}`}
                        className="grid grid-cols-2 items-baseline gap-x-3 border-t border-[var(--ag-row-border)] py-3 text-sm first:border-t-0 sm:gap-x-4"
                      >
                        <dt className="min-w-0 text-[var(--ag-muted)]">{row.label}</dt>
                        <dd className="min-w-0 text-right font-medium text-[var(--ag-text)] break-words">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                );

                return (
                  <div className="grid w-full grid-cols-1 gap-x-10 sm:grid-cols-2">
                    <SpecColumn rows={leftRows} offset={0} />
                    {rightRows.length > 0 ? (
                      <SpecColumn rows={rightRows} offset={mid} />
                    ) : (
                      <div className="hidden sm:block" aria-hidden />
                    )}
                  </div>
                );
              })()
            ) : null}
          </div>
        ) : null}

        {customItems.length > 0 ? (
          <div
            role="tabpanel"
            id="panel-customisation"
            aria-labelledby="tab-customisation"
            hidden={activeTab !== "customisation"}
            className="pt-4"
          >
            {activeTab === "customisation" ? (
              <CustomisationTabPanel items={customItems} product={product} />
            ) : null}
          </div>
        ) : null}

        {faqs.length > 0 ? (
          <div
            role="tabpanel"
            id="panel-faqs"
            aria-labelledby="tab-faqs"
            hidden={activeTab !== "faqs"}
            className="pt-2"
          >
            {activeTab === "faqs" ? (
              <>
                <FaqAccordion
                  faqs={faqs}
                  productSlug={product.slug}
                  isTabActive={activeTab === "faqs"}
                />
                <FaqStillHaveQuestion product={product} />
              </>
            ) : null}
          </div>
        ) : null}

        {sheetUrl ? (
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={`mt-5 flex items-center gap-3 rounded-[10px] border border-[var(--ag-border)] px-3 py-2.5 transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
          >
            <IconFileTypePdf className="h-9 w-9 shrink-0 text-[var(--ag-blue)]" stroke={1.5} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[var(--ag-ocean)]">
                {STATIC.productSheetTitle}
              </span>
              <span className="text-xs text-[var(--ag-muted)]">{STATIC.productSheetSubtitle}</span>
            </span>
            <IconDownload className="h-5 w-5 shrink-0 text-[var(--ag-muted)]" stroke={1.75} aria-hidden />
          </a>
        ) : null}

        <div
          className="mt-5 flex gap-3 rounded-[10px] border border-[var(--ag-warm-note-border)] bg-[var(--ag-warm)] px-3.5 py-2.5 text-sm text-[var(--ag-warm-note-text)]"
          role="note"
        >
          <IconInfoCircle className="mt-0.5 h-5 w-5 shrink-0" stroke={1.75} aria-hidden />
          <p>{priceNote}</p>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <section className="mt-6 sm:mt-8 md:mt-10 max-md:mb-0">
          <h2 className="text-xl font-medium text-[var(--ag-ocean)]">{STATIC.relatedHeading}</h2>
          <div className="ag-scrollbar-hide -mx-4 mt-4 flex snap-x snap-proximity gap-3 overflow-x-auto px-4 pb-0 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p._id || p.slug}
                className="w-[min(220px,78vw)] shrink-0 snap-start sm:w-auto"
              >
                <ProductCatalogCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {!videoOpen ? (
        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ag-border)] bg-white px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(14,58,86,0.08)] motion-reduce:transition-none transition-transform duration-200 ease-out md:hidden ${
            stickyBarVisible
              ? "translate-y-0"
              : "pointer-events-none translate-y-full opacity-0"
          }`}
          aria-hidden={!stickyBarVisible}
        >
          <div className="grid h-11 grid-cols-[44px_44px_1fr] items-stretch gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={`flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--ag-olive)] bg-white text-[var(--ag-olive-dark)] ${FOCUS}`}
            >
              <IconBrandWhatsapp size={22} stroke={1.75} />
            </a>
            <a
              href={`tel:${STATIC.phoneTel}`}
              aria-label="Call us"
              className={`flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--ag-blue)] bg-white text-[var(--ag-blue)] ${FOCUS}`}
            >
              <IconPhone size={22} stroke={1.75} />
            </a>
            <Link
              href={inquiryHref}
              className={`flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-3 text-sm font-medium text-white ${FOCUS}`}
            >
              <IconSend size={18} stroke={1.75} aria-hidden />
              {STATIC.sendInquiry}
            </Link>
          </div>
        </div>
      ) : null}

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} embed={videoEmbed} />
    </>
  );
}