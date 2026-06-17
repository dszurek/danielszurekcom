import { useEffect, useState } from "react";

/**
 * Tracks which page section currently crosses the vertical middle of the
 * viewport. Drives the navbar scroll-spy and gear indicator with a single
 * IntersectionObserver — no scroll-event re-renders.
 *
 * `sectionIds` must be referentially stable (module-level constant).
 */
export const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Observe a thin band across the middle of the viewport, so exactly
      // one section is "active" at a time.
      { rootMargin: "-45% 0px -45% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};
