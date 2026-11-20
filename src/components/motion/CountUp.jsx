import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "./Reveal";

export function CountUp({
  to,
  from = 0,
  duration = 1.2,
  suffix = "",
  separator = ",",
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  const formatNumber = (val) => {
    const rounded = Math.round(val);
    const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return `${formatted}${suffix}`;
  };

  const [displayValue, setDisplayValue] = useState(() => {
    if (reduce) return formatNumber(to);
    return formatNumber(from);
  });

  useEffect(() => {
    if (reduce) {
      setDisplayValue(formatNumber(to));
      return;
    }

    if (!inView) return;

    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        setDisplayValue(formatNumber(latest));
      },
    });

    return () => controls.stop();
  }, [inView, to, from, duration, suffix, separator, reduce]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export default CountUp;
