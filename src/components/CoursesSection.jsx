// =====================================================================
// CoursesSection.jsx  -  the "Popular courses" block of the Home page:
// heading + "View all" button + the grid of animated course cards.
// =====================================================================
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader.jsx";
import CoursesGrid from "./CoursesGrid.jsx";

// Props:
//   courses  -> the list of courses to show
export default function CoursesSection({ courses }) {
  return (
    <section className="section" id="courses">
      <SectionHeader
        title="Popular courses"
        subtitle="Hand-picked courses to help you build real, in-demand skills."
      >
        <Link to="/courses" className="btn btn-outline btn-sm">View all courses</Link>
      </SectionHeader>

      {/* showTags -> draw the "Bestseller / Popular / New" badges */}
      <CoursesGrid courses={courses} showTags />
    </section>
  );
}
