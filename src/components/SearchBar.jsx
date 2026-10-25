// =====================================================================
// SearchBar.jsx  -  the search box inside the hero.
//
// When the user searches, we send them to the Courses page with the
// word in the URL:   /courses?search=python
// The Courses page reads that word and filters the course list.
// =====================================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  // `query` = what the user has typed so far.
  // This is a "controlled input": React always knows its value.
  const [query, setQuery] = useState("");

  // useNavigate() gives us a function that changes the page from code
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser's default form reload
    const word = query.trim();
    // encodeURIComponent makes the text safe to put in a URL
    navigate(word ? `/courses?search=${encodeURIComponent(word)}` : "/courses");
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        type="search"
        className="search-input"
        placeholder="What do you want to learn?"
        aria-label="Search courses"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" className="btn btn-primary search-btn">Search</button>
    </form>
  );
}
