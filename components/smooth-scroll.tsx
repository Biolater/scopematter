"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      event.preventDefault();
      // Offset by sticky navbar height to avoid over-scrolling past the section title
      const navbar = document.getElementById("site-navbar");
      const offset = (navbar?.getBoundingClientRect().height ?? 0) + 22; // small cushion
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}


