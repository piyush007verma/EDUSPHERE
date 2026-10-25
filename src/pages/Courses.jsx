// =====================================================================
// pages/Courses.jsx  -  list of ALL courses (+ search + category filter)
// =====================================================================
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import CoursesGrid from "../components/CoursesGrid.jsx";
import { courses } from "../data/courses.js";
import "./Courses.css";

// ["All", "Programming", "Development", ...]  built from the course data.
// `new Set` removes duplicates.
const categories = ["All", ...new Set(courses.map((course) => course.category))];

export default function Courses() {
  // Read the word after "?search=" in the URL, e.g. /courses?search=python
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim();

  // STATE: which category chip is selected
  const [category, setCategory] = useState("All");

  // .filter() keeps only the courses that match BOTH the search word and the category.
  const results = courses.filter((course) => {
    const text = `${course.title} ${course.description} ${course.category}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHero
        title="Explore all courses"
        subtitle="Enhance your skills with our industry-leading curriculums."
      />

      <section className="section">
        {/* One button per category. The selected one gets the class "active". */}
        <div className="filter-chips">
          {categories.map((name) => (
            <button
              key={name}
              className={name === category ? "chip active" : "chip"}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Only shown when the user searched for something */}
        {search && (
          <p className="search-info">
            {results.length} {results.length === 1 ? "result" : "results"} for "
            <strong>{search}</strong>" &nbsp;
            <Link to="/courses">Clear search</Link>
          </p>
        )}

        {/* If something matched show the grid, otherwise a friendly message */}
        {results.length > 0 ? (
          <CoursesGrid courses={results} />
        ) : (
          <p className="no-results">No courses match. Try another keyword or category.</p>
        )}
      </section>
    </>
  );
}
