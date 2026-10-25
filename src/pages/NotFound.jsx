// =====================================================================
// pages/NotFound.jsx  -  shown for any address that does not exist
// (also used by CourseDetail when the course slug is unknown)
// =====================================================================
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="section not-found">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </section>
  );
}
