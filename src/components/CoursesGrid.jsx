// =====================================================================
// CoursesGrid.jsx  -  a responsive grid of course cards.
// Used on the Home page (3 popular courses) AND the Courses page (all).
// =====================================================================
import CourseCard from "./CourseCard.jsx";
import "./CoursesGrid.css";

// `courses` is an ARRAY (a list). .map() turns every item of the list
// into a <CourseCard>. This replaces copy-pasting the same HTML 6 times.
// `key` helps React keep track of each item in the list.
// `index` (0, 1, 2 ...) is the position of the card in the list.
export default function CoursesGrid({ courses, showTags = false }) {
  return (
    <div className="courses-grid">
      {courses.map((course, index) => (
        <CourseCard
          key={course.slug}
          course={course}
          showTag={showTags}
          index={index}
        />
      ))}
    </div>
  );
}
