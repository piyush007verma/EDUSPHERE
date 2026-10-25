// =====================================================================
// CountUp.jsx  -  a number that counts up from 0 to `end`.
//
//   <CountUp end={500} suffix="+" />   ->   0+ ... 120+ ... 500+
//
// It waits until the number is visible on screen (useInView), then runs
// an animation: ~60 times per second (requestAnimationFrame) it works out
// how far along we are and shows that share of the final number.
// =====================================================================
import { useState, useEffect } from "react";
import useInView from "../hooks/useInView.js";

export default function CountUp({ end, suffix = "", duration = 2000 }) {
  const [ref, isVisible] = useInView(0.3);
  const [value, setValue] = useState(0); // the number currently shown

  useEffect(() => {
    if (!isVisible) return; // wait until it is on screen

    // People who asked their system for less motion see the final number at once
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const startTime = performance.now();
    let frame;

    function tick(now) {
      // progress goes from 0 to 1 over `duration` milliseconds
      const progress = Math.min((now - startTime) / duration, 1);
      // "ease out": fast at the start, slowing down near the end
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick); // keep going
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame); // cleanup if we leave the page
  }, [isVisible, end, duration]);

  return <span ref={ref} className="count-up">{value}{suffix}</span>;
}
