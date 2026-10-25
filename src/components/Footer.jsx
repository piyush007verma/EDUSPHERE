// =====================================================================
// Footer.jsx  -  the dark footer at the bottom of every page
// =====================================================================
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import Newsletter from "./Newsletter.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          {/* Same Logo component as the Navbar, but without the icon */}
          <Logo showIcon={false} />
          <p>Empowering learners with accessible, practical education.</p>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/feedback">Feedback</Link>
        </div>

        <Newsletter />
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 EduSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
