"use client";

import { useEffect, useRef, useState } from "react";

const COOKIE_NAME = "pl:sidebar:collapsed";
const COOKIE_OPTS = "path=/; max-age=31536000; samesite=lax"; // 1 year

function setCookie(collapsed: boolean) {
  try {
    document.cookie = `${COOKIE_NAME}=${collapsed ? "1" : "0"}; ${COOKIE_OPTS}`;
  } catch {}
}

function setLocalStorage(collapsed: boolean) {
  try {
    localStorage.setItem(COOKIE_NAME, JSON.stringify(collapsed));
  } catch {}
}

export function usePersistentCollapsed(initialCollapsed: boolean) {
  // Initialize from server-provided value to avoid hydration mismatch
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);

  // After mount, prefer localStorage if present (so client toggles stick even if cookie missed)
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    try {
      const raw = localStorage.getItem(COOKIE_NAME);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "boolean" && parsed !== isCollapsed) {
          setIsCollapsed(parsed);
          setCookie(parsed);
        }
      } else {
        // seed localStorage from SSR value
        setLocalStorage(isCollapsed);
        setCookie(isCollapsed);
      }
    } catch {
      // ignore
    }
  }, [isCollapsed]);

  // Write-through when value changes
  useEffect(() => {
    if (!mounted.current) return;
    setLocalStorage(isCollapsed);
    setCookie(isCollapsed);
  }, [isCollapsed]);

  return [isCollapsed, setIsCollapsed] as const;
}
