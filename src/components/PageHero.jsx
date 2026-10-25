// =====================================================================
// PageHero.jsx  -  the dark blue banner at the top of the Courses,
// About and Feedback pages.
// =====================================================================
import "./PageHero.css";

export default function PageHero({ title, subtitle }) {
  return (
    <section className="page-hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}
