// =====================================================================
// HeroSlider.jsx  -  auto-scrolling images in the hero (replaces the video)
//
// All the slides sit side by side in one long "track". To show slide number
// `index` we slide the whole track to the left by (index x 100%) with CSS.
// A timer moves to the next slide every 3.5 seconds, and it pauses while
// the mouse is over the slider.
// =====================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses.js";
import "./HeroSlider.css";

export default function HeroSlider() {
  // STATE 1: which slide is showing (0, 1, 2 ...)
  const [index, setIndex] = useState(0);
  // STATE 2: is the user hovering? (then we stop the timer)
  const [paused, setPaused] = useState(false);

  // The timer. It restarts whenever `paused` changes.
  // `% courses.length` makes the last slide go back to the first.
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % courses.length);
    }, 3500);
    return () => clearInterval(timer); // cleanup: stop the old timer
  }, [paused]);

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The track moves left: slide 0 -> 0%, slide 1 -> -100%, slide 2 -> -200% ... */}
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {courses.map((course) => (
          <Link to={`/courses/${course.slug}`} className="slide" key={course.slug}>
            <img src={course.heroImage} alt={course.title} />
            <span className="slide-caption">
              <small>{course.category}</small>
              {course.title}
            </span>
          </Link>
        ))}
      </div>

      {/* One dot per slide. Clicking a dot jumps to that slide. */}
      <div className="slider-dots">
        {courses.map((course, dotIndex) => (
          <button
            key={course.slug}
            className={dotIndex === index ? "dot active" : "dot"}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show ${course.title}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
