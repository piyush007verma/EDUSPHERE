// =====================================================================
// Hero.jsx  -  the first thing visitors see on the Home page.
// Left: headline + search box.  Right: auto-scrolling course images.
// =====================================================================
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import HeroSlider from "./HeroSlider.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Learn without limits</h1>
        <p>
          Build practical skills, learn from experts, and move closer to your
          goals with EduSphere.
        </p>

        <SearchBar />

        {/* Quick links: each one opens the Courses page with a search already typed */}
        <div className="hero-popular">
          <span>Popular:</span>
          <Link to="/courses?search=python">Python</Link>
          <Link to="/courses?search=ai">AI</Link>
          <Link to="/courses?search=cyber">Cyber Security</Link>
        </div>
      </div>

      {/* The yellow block behind the slider is drawn by CSS (.hero-media::before) */}
      <div className="hero-media">
        <HeroSlider />
      </div>
    </section>
  );
}
