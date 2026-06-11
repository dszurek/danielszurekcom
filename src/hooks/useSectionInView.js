import { useInView } from "react-intersection-observer";

/**
 * Shared intersection-observer config used by every page section to trigger
 * its entrance animation once, when ~10% of the section becomes visible.
 */
export const useSectionInView = () =>
  useInView({ triggerOnce: true, threshold: 0.1 });
