import { useEffect, useRef } from "react";

export function useScrollToView<T extends HTMLElement>(trigger: unknown) {
  const anchorRef = useRef<T | null>(null);

  useEffect(() => {
    if (!anchorRef.current) return;
    anchorRef.current.scrollIntoView({ behavior: "smooth" });
  }, [trigger]);

  return anchorRef;
}
