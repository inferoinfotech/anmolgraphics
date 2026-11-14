"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconInfoCircle,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import ProductCatalogCard from "./ProductCatalogCard";
import { getCategoryPillStyle } from "./categoryPillStyles";
import { PRODUCT_DETAIL_STATIC as STATIC } from "./productDetailConstants";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ag-blue)] focus-visible:outline-offset-2";

const TAB_IDS = ["description", "specifications", "customisation"];

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
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--ag-blue)] px-4 text-sm font-semibold text-white transition hover:bg-[#155a80] ${FOCUS}`}
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
          className={`flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--ag-olive)] bg-white px-2 text-sm font-medium text-[#5e6b16] transition hover:bg-[var(--ag-mist)] ${FOCUS}`}
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

export default function ProductDetailPage({ product, relatedProducts = [] }) {
  const images = useMemo(() => {
    const list = (product.images || []).filter(Boolean);
    if (list.length > 0) return list.slice(0, 8);
    if (product.thumbnail) return [product.thumbnail];
    return ["/placeholder.svg"];
  }, [product]);

  const [mainImage, setMainImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  const thumbnails = images.slice(0, 4);
  const showThumbs = images.length > 1;

  const pillStyle = getCategoryPillStyle(product.category);
  const availability =
    product.availabilityLabel?.trim() || STATIC.availabilityLabel;
  const materialValue = product.material?.trim() || STATIC.materialDefault;
  const orderTypeValue = product.orderType?.trim() || STATIC.orderType;
  const priceNote = product.note?.trim() || STATIC.priceNote;

  const tabContent = useMemo(
    () => ({
      description: product.description?.trim() || STATIC.descriptionPlaceholder,
      specifications: product.specifications?.trim() || STATIC.specificationsPlaceholder,
      customisation: product.customisation?.trim() || STATIC.customisationPlaceholder,
    }),
    [product.description, product.specifications, product.customisation]
  );

  const onTabKeyDown = useCallback((e) => {
    const idx = TAB_IDS.indexOf(activeTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab(TAB_IDS[(idx + 1) % TAB_IDS.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab(TAB_IDS[(idx - 1 + TAB_IDS.length) % TAB_IDS.length]);
    }
  }, [activeTab]);

  if (!product) return <div>Product not found</div>;

  const inquiryHref = `/contact?product=${encodeURIComponent(product.slug)}`;
  const waText = encodeURIComponent(
    `${STATIC.whatsAppMessagePrefix} ${product.title}.`
  );
  const waHref = `https://wa.me/${STATIC.whatsAppNumber}?text=${waText}`;

  return (
    <>
      <ProductBreadcrumb product={product} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Gallery */}
        <div>
          <div
            className="flex h-[min(420px,55vw)] min-h-[280px] items-center justify-center rounded-xl border border-[var(--ag-border)] bg-white p-4 sm:h-[400px] lg:h-[420px]"
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
                    className={`relative h-[68px] min-w-[72px] shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition ${FOCUS} ${
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
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.category ? (
            <span
              className="mb-3 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: pillStyle.bg,
                borderColor: pillStyle.border,
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

          {product.description ? (
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--ag-muted)] sm:text-base">
              {product.description}
            </p>
          ) : null}

          <dl className="mt-6 w-full text-sm">
            <div className="flex justify-between gap-4 border-t border-[#e5ecf1] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.category}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{product.category || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#e5ecf1] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.material}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{materialValue}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#e5ecf1] py-3">
              <dt className="text-[var(--ag-muted)]">{STATIC.detailLabels.orderType}</dt>
              <dd className="font-medium text-[var(--ag-text)]">{orderTypeValue}</dd>
            </div>
          </dl>

          <ActionButtons product={product} className="mt-6 hidden md:block" />
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 rounded-xl border border-[var(--ag-border)] bg-white p-5">
        <div
          role="tablist"
          aria-label="Product information"
          className="flex gap-6 border-b border-[var(--ag-border)]"
          onKeyDown={onTabKeyDown}
        >
          {TAB_IDS.map((id) => {
            const label = STATIC.tabs[id];
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={active}
                aria-controls={`panel-${id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(id)}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium transition ${FOCUS} ${
                  active
                    ? "border-[var(--ag-gold)] text-[var(--ag-ocean)]"
                    : "border-transparent text-[var(--ag-muted)] hover:text-[var(--ag-text)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {TAB_IDS.map((id) => (
          <div
            key={id}
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={activeTab !== id}
            className="pt-4 text-[15px] leading-relaxed text-[var(--ag-muted)]"
          >
            <p className="whitespace-pre-line">{tabContent[id]}</p>
          </div>
        ))}

        <div
          className="mt-5 flex gap-3 rounded-[10px] border border-[#ebd6ae] bg-[var(--ag-warm)] px-3.5 py-2.5 text-sm text-[#633806]"
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

      {/* Mobile sticky bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ag-border)] bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(14,58,86,0.08)] md:hidden"
        aria-hidden={false}
      >
        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--ag-olive)] text-[#5e6b16] ${FOCUS}`}
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
    </>
  );
}