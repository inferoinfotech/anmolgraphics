"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconChevronDown,
  IconCircleCheck,
  IconDownload,
  IconFileTypePdf,
  IconInfoCircle,
  IconPhone,
  IconPlayerPlay,
  IconSend,
  IconX,
} from "@tabler/icons-react";
import ProductCatalogCard from "./ProductCatalogCard";
import { getCategoryPillStyle } from "./categoryPillStyles";
import { PRODUCT_DETAIL_STATIC as STATIC } from "./productDetailConstants";
import {
  getProductSheetUrl,
  getVideoUrl,
  hasContent,
  normalizeCustomisationItems,
  normalizeFaqs,
  normalizeHighlights,
  normalizeOptions,
  normalizeSpecRows,
  parseVideoEmbed,
} from "./productDetailData";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ag-blue)] focus-visible:outline-offset-2";

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

function ProductBreadcrumb({ product }) {
  const categoryHref = product.category
    ? `/products?category=${encodeURIComponent(product.category)}`
    : "/products";

  return (
    <nav className="mb-6 text-sm text-[var(--ag-muted)]" aria-label="Breadcrumb">
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
          className={`group/call flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--ag-blue)] bg-white px-1.5 text-sm font-medium text-[var(--ag-blue)] transition hover:bg-[var(--ag-mist)] sm:gap-2 sm:px-2 ${FOCUS}`}
        >
          <IconPhone size={18} stroke={1.75} aria-hidden className="shrink-0" />
          <span className="grid min-w-0 place-items-center tabular-nums leading-none">
            <span
              className="col-start-1 row-start-1 select-none whitespace-nowrap text-[11px] opacity-0 sm:text-xs"
              aria-hidden
            >
              {STATIC.phoneDisplay}
            </span>
            <span className="col-start-1 row-start-1 whitespace-nowrap text-xs transition-opacity group-hover/call:opacity-0 sm:text-sm">
              {STATIC.callUs}
            </span>
            <span className="col-start-1 row-start-1 whitespace-nowrap text-[11px] opacity-0 transition-opacity group-hover/call:opacity-100 sm:text-xs">
              {STATIC.phoneDisplay}
            </span>
          </span>
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

function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-[var(--ag-row-border)]">
      {faqs.map((faq, index) => {
        const expanded = openIndex === index;
        return (
          <div key={faq.question} className="py-1">
            <button
              type="button"
              id={`faq-btn-${index}`}
              aria-expanded={expanded}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpenIndex(expanded ? -1 : index)}
              className={`flex w-full min-h-[44px] items-center justify-between gap-3 py-3 text-left text-[15px] font-medium text-[var(--ag-ocean)] ${FOCUS} rounded`}
            >
              <span>{faq.question}</span>
              <IconChevronDown
                size={18}
                stroke={1.75}
                className={`shrink-0 text-[var(--ag-muted)] transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              hidden={!expanded}
              className="pb-3 text-[15px] leading-relaxed text-[var(--ag-muted)]"
            >
              <p className="whitespace-pre-line">{faq.answer}</p>
            </div>
          </div>
        );
      })}
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

  const [mainImage, setMainImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState("description");
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  const thumbnails = images.slice(0, 4);
  const showThumbs = images.length > 1;

  const pillStyle = getCategoryPillStyle(product.category);
  const availability = hasContent(product.availabilityLabel)
    ? product.availabilityLabel.trim()
    : STATIC.availabilityLabel;
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

  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.whatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <>
      <ProductFaqJsonLd faqs={faqs} />
      <ProductBreadcrumb product={product} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <div
            className="flex h-[min(440px,55vw)] min-h-[280px] items-center justify-center rounded-xl border border-[var(--ag-warm-border)] bg-[var(--ag-warm)] p-4 sm:h-[400px] lg:h-[400px] lg:min-h-[380px]"
          >
            <Image
              src={mainImage}
              alt={product.title}
              width={640}
              height={480}
              className="max-h-full max-w-full object-contain"
              priority
            />
          </div>
          {showThumbs ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
              {thumbnails.map((img, index) => {
                const selected = mainImage === img;
                return (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`relative h-[68px] min-w-[calc(25%-6px)] flex-1 overflow-hidden rounded-lg border-2 bg-white p-1 transition sm:min-w-[72px] sm:flex-none ${FOCUS} ${
                      selected
                        ? "border-[var(--ag-blue)]"
                        : "border-transparent ring-1 ring-[var(--ag-border)]"
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={selected ? "true" : undefined}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={80}
                      height={68}
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}

          {videoEmbed ? (
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className={`mt-4 flex w-full items-center gap-3 rounded-xl border border-[var(--ag-border)] bg-white p-3 text-left transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
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
        </div>

        <div className="flex flex-col">
          {product.category ? (
            <span
              className="mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: pillStyle.bg,
                border: `1px solid ${pillStyle.border}`,
                color: pillStyle.text,
              }}
            >
              {product.category}
            </span>
          ) : null}

          <h1 className="text-[28px] font-medium leading-tight text-[var(--ag-ocean)] sm:text-[32px]">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-[var(--ag-muted)]">{availability}</span>
          </div>

          {hasContent(product.description) ? (
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--ag-muted)] sm:text-base sm:leading-[1.6]">
              {product.description}
            </p>
          ) : null}

          {highlights.length > 0 ? (
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
          ) : null}

          {options.length > 0 ? (
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--ag-muted)]">
                {STATIC.availableOptionsLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {options.map((opt) => (
                  <li
                    key={opt}
                    className="rounded-full border border-[var(--ag-chip-border)] bg-white px-3 py-1 text-xs text-[var(--ag-text)]"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <dl className="mt-6 w-full text-sm">
            <div className="flex justify-between gap-4 border-t border-[var(--ag-row-border)] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.category}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{product.category || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--ag-row-border)] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.material}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{materialValue}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--ag-row-border)] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.orderType}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{orderTypeValue}</dd>
            </div>
          </dl>

          <ActionButtons product={product} className="mt-6 max-md:hidden" />
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-[var(--ag-border)] bg-white p-5">
        {tabs.length > 1 ? (
          <div
            role="tablist"
            aria-label="Product information"
            className="flex flex-wrap gap-4 border-b border-[var(--ag-border)] sm:gap-6"
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
                  className={`-mb-px border-b-2 pb-3 text-sm transition ${FOCUS} ${
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
              <ul className="space-y-2 text-[15px] text-[var(--ag-muted)]">
                {customItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconCircleCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ag-olive)]"
                      stroke={1.75}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
            {activeTab === "faqs" ? <FaqAccordion faqs={faqs} /> : null}
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
        <section className="mt-10 md:mt-12">
          <h2 className="text-xl font-medium text-[var(--ag-ocean)]">{STATIC.relatedHeading}</h2>
          <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {relatedProducts.map((p) => (
              <div key={p._id || p.slug} className="w-[min(280px,72vw)] shrink-0 sm:w-auto">
                <ProductCatalogCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ag-border)] bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(14,58,86,0.08)] md:hidden"
      >
        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--ag-olive)] text-[var(--ag-olive-dark)] ${FOCUS}`}
          >
            <IconBrandWhatsapp size={22} stroke={1.75} />
          </a>
          <a
            href={`tel:${STATIC.phoneTel}`}
            aria-label="Call us"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--ag-blue)] text-[var(--ag-blue)] ${FOCUS}`}
          >
            <IconPhone size={22} stroke={1.75} />
          </a>
          <Link
            href={inquiryHref}
            className={`flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-3 text-sm font-semibold text-white ${FOCUS}`}
          >
            <IconSend size={18} stroke={1.75} aria-hidden />
            {STATIC.sendInquiry}
          </Link>
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} embed={videoEmbed} />
    </>
  );
}