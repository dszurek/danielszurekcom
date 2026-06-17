import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import ReactGA from "react-ga4";
import "./CtaLink.css";

const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));

/**
 * Shared call-to-action link: "primary" (leather, filled) drives toward
 * contact; "secondary" is outlined. Magnetic hover (capped ±6px) only on
 * fine pointers with motion allowed. Extra props (download, target, …)
 * pass through to the anchor.
 */
const CtaLink = ({
  href,
  variant = "primary",
  gaLabel,
  className = "",
  onClick,
  children,
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22 });
  const springY = useSpring(y, { stiffness: 320, damping: 22 });

  const onPointerMove = (e) => {
    if (
      reduceMotion ||
      !ref.current ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * 0.15, 6));
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * 0.15, 6));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (gaLabel) {
      ReactGA.event({ category: "CTA", action: "Click", label: gaLabel });
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`cta-link ${variant} ${className}`.trim()}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </motion.a>
  );
};

export default CtaLink;
