import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to a numeric target the first time the returned ref scrolls
 * into view, easing out over `duration` ms. Returns [ref, displayString].
 * Non-numeric targets render as-is; reduced motion renders the final value
 * immediately with no animation.
 */
export const useCountUp = (target, { duration = 1200, decimals = 0 } = {}) => {
  const reduceMotion = useReducedMotion();
  const numericTarget = Number(target);
  const isNumeric = Number.isFinite(numericTarget);
  const animate = isNumeric && !reduceMotion;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [value, setValue] = useState(animate ? 0 : numericTarget);
  const frame = useRef();

  useEffect(() => {
    if (!animate || !inView) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(numericTarget * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [animate, inView, numericTarget, duration]);

  const display = isNumeric ? value.toFixed(decimals) : String(target);
  return [ref, display];
};
