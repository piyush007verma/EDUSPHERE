// =====================================================================
// Stats.jsx  -  the strip with 4 big numbers that count up
// =====================================================================
import CountUp from "./CountUp.jsx";
import { stats } from "../data/siteContent.js";
import "./Stats.css";

export default function Stats() {
  return (
    <section className="statistics">
      {stats.map((item) => (
        <div className="stat-item" key={item.label}>
          <h3>
            <CountUp end={item.value} suffix={item.suffix} />
          </h3>
          <p>{item.label}</p>
        </div>
      ))}
    </section>
  );
}
