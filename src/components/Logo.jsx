// =====================================================================
// Logo.jsx  -  the EduSphere logo. Used in the Navbar AND the Footer.
// One component, written once, used in two places = reusability.
// =====================================================================
import { Link } from "react-router-dom";

// `showIcon` is a PROP (an input to the component).
// "= true" is its default value, so <Logo /> shows the icon.
export default function Logo({ showIcon = true }) {
  return (
    // <Link> is like <a href>, but it does NOT reload the page
    <Link to="/" className="logo">
      {showIcon && (
        <span className="logo-icon">
          {/* Colors of the 3 shapes are set in global.css (.logo-icon path) */}
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
            <path d="M2 6c3-2 6-2 8 0v12c-2-2-5-2-8 0V6z" />
            <path d="M22 6c-3-2-6-2-8 0v12c2-2 5-2 8 0V6z" />
            <path d="M9 4l3-2 3 2v2l-3-1.5L9 6V4z" />
          </svg>
        </span>
      )}
      <span className="logo-text">
        Edu<span>Sphere</span>
      </span>
    </Link>
  );
}
