import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import "./SectionIndex.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_<>";

/**
 * HUD-style section readout, e.g. "SEC 03 / FEATURED WORK", that
 * scramble-decodes once when first scrolled into view. Decorative only —
 * the real section heading follows it in the DOM.
 */
const SectionIndex = ({ index, name }) => {
  const text = `SEC ${String(index).padStart(2, "0")} / ${name.toUpperCase()}`;
  const reduceMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [display, setDisplay] = useState(reduceMotion ? text : " ");
  const frame = useRef();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }
    const start = performance.now();
    const duration = 700;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const settled = Math.floor(text.length * t);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out +=
          text[i] === " "
            ? " "
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, reduceMotion, text]);

  return (
    <span className="section-index" ref={ref} aria-hidden="true">
      {display}
    </span>
  );
};

export default SectionIndex;
