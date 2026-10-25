// =====================================================================
// hooks/useInView.js  -  a CUSTOM HOOK (our own reusable hook)
//
// It answers one question: "has this element scrolled into view yet?"
//
//   const [ref, isVisible] = useInView();
//   <div ref={ref} className={isVisible ? "visible" : ""}>
//
// It uses the browser's IntersectionObserver API, which tells us when
// an element enters the screen, so we don't need a heavy scroll listener.
// =====================================================================
import { useEffect, useRef, useState } from "react";

export default function useInView(threshold = 0.15) {
  // A ref is a "handle" to a real HTML element. We attach it with ref={ref}.
  const ref = useRef(null);

  // STATE: has the element appeared on screen? (starts false)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current; // the real <article> in the page
    if (!element) return;

    // Very old browsers have no IntersectionObserver: just show the element.
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    // The observer calls this function whenever the element enters/leaves the screen.
    // threshold 0.15 = "at least 15% of the element must be visible".
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);          // trigger the animation
          observer.unobserve(element); // animate only once, then stop watching
        }
      },
      { threshold }
    );

    observer.observe(element);

    // Cleanup: when the component disappears, stop observing.
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
