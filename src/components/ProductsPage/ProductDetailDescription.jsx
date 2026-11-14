"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCT_DETAIL_STATIC as STATIC } from "./productDetailConstants";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ag-blue)] focus-visible:outline-offset-2";

export default function ProductDetailDescription({ text, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const [needsClamp, setNeedsClamp] = useState(false);
  const measureRef = useRef(null);

  useEffect(() => {
    setExpanded(false);
  }, [text]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el || typeof window === "undefined") return undefined;

    const check = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) {
        setNeedsClamp(false);
        return;
      }
      setNeedsClamp(el.scrollHeight > el.clientHeight + 1);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [text, expanded]);

  if (!text) return null;

  return (
    <div className={className}>
      <p
        ref={measureRef}
        className={`text-[15px] leading-relaxed text-[var(--ag-muted)] md:text-base md:leading-[1.6] ${
          expanded ? "" : "max-md:line-clamp-3"
        }`}
      >
        {text}
      </p>
      {needsClamp || expanded ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-1.5 inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--ag-blue)] md:hidden ${FOCUS}`}
        >
          {expanded ? STATIC.showLess : STATIC.readMore}
        </button>
      ) : null}
    </div>
  );
}