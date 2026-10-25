// =====================================================================
// WhyChoose.jsx  -  "Why learn with EduSphere?" (4 short points)
// =====================================================================
import SectionHeader from "./SectionHeader.jsx";
import { whyChoose } from "../data/siteContent.js";
import "./WhyChoose.css";

export default function WhyChoose() {
  return (
    <section className="section why-section">
      <SectionHeader
        title="Why learn with EduSphere?"
        subtitle="Everything you need to grow your career, in one platform."
      />
      <div className="why-grid">
        {whyChoose.map((item) => (
          <div className="why-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
