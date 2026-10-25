// =====================================================================
// pages/About.jsx  -  static "About us" page (no state, just content)
// =====================================================================
import PageHero from "../components/PageHero.jsx";
import "./About.css";

export default function About() {
  return (
    <>
      <PageHero
        title="About EduSphere"
        subtitle="We believe that high-quality education should be accessible, practical, and tailored to the modern industry demands."
      />

      <section className="section">
        <div className="about-story">
          <h2>Our story</h2>
          <p>
            Founded in 2026, EduSphere started with a simple idea: the traditional
            learning model isn't keeping up with the rapid pace of technology. We
            built a platform that connects passionate learners directly with
            industry experts. Whether you are learning Python, full-stack web
            development, or exploring artificial intelligence, our goal is to give
            you hands-on experience.
          </p>
        </div>

        <div className="mission-grid">
          <div className="mission-card mission-primary">
            <h3>Our mission</h3>
            <p>
              To democratize education by providing affordable, high-quality, and
              project-based learning experiences to students across the globe.
            </p>
          </div>
          <div className="mission-card">
            <h3>Our vision</h3>
            <p>
              To become the leading bridge between academic learning and industry
              requirements, ensuring every learner is job-ready.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
