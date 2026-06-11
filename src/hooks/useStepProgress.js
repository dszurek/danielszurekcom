import { useEffect, useRef, useState } from "react";

/**
 * Tracks which case-study step currently crosses the middle band of the
 * viewport. Steps are descendants of the returned container ref matching
 * `.cs-step`, each carrying a `data-step` index. Returns [ref, activeIndex].
 */
export const useStepProgress = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const steps = containerRef.current?.querySelectorAll(".cs-step");
    if (!steps || steps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.step));
          }
        }
      },
      // Middle band, mirroring useActiveSection, so one step is active at a time
      { rootMargin: "-40% 0px -40% 0px" }
    );

    steps.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return [containerRef, active];
};
