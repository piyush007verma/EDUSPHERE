// =====================================================================
// pages/Learn.jsx  -  the LEARNING PAGE (like Coursera)
//
//   address:  /learn/python            -> continue where you stopped
//             /learn/python/2-3        -> topic 2, lesson 3
//
//   Left : the YouTube video, Previous / Complete / Next buttons,
//          and tabs (Overview, Notes)
//   Right: "Course content" = the topics, each with its lessons.
//          Click a topic to open it, click a lesson to watch it.
// =====================================================================
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth.jsx";
import NotFound from "./NotFound.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { courses } from "../data/courses.js";
import { getModules } from "../data/lessons.js";
import { getProgress, saveProgress, getNote, saveNote } from "../utils/progress.js";
import "./Learn.css";

// ---------- 1. The guards: signed in? course exists? bought? ----------
export default function Learn() {
  return (
    <RequireAuth title="My learning">
      <LearnGate />
    </RequireAuth>
  );
}

function LearnGate() {
  const { slug } = useParams();
  const { isEnrolled, addToCart } = useCart();
  const course = courses.find((item) => item.slug === slug);

  if (!course) return <NotFound />;

  // Not bought yet: show a locked message instead of the lessons
  if (!isEnrolled(slug)) {
    return (
      <section className="section locked">
        <h1>{course.title}</h1>
        <p>You have not enrolled in this course yet. Enroll to unlock all lessons.</p>
        <div className="locked-buttons">
          <Link to={`/courses/${slug}`} className="btn btn-primary">View course</Link>
          <button className="btn btn-outline" onClick={() => addToCart(slug)}>Add to cart</button>
        </div>
      </section>
    );
  }

  // key={slug}: if the course changes, React builds a fresh player (fresh state)
  return <CoursePlayer key={slug} course={course} />;
}

// ---------- 2. The player ----------
function CoursePlayer({ course }) {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const modules = getModules(course.slug);
  const lessons = modules.flatMap((module) => module.lessons); // one flat list

  // ---------- STATE ----------
  // progress = { completed: ["1-1", "1-2"], last: "1-2" }  (loaded from localStorage)
  const [progress, setProgress] = useState(() => getProgress(user.email, course.slug));
  const [tab, setTab] = useState("overview");   // "overview" or "notes"
  const [note, setNote] = useState("");         // text of the notes box

  // Which lesson is open? The one in the address, else the last watched, else the first.
  const current =
    lessons.find((lesson) => lesson.id === lessonId) ||
    lessons.find((lesson) => lesson.id === progress.last) ||
    lessons[0];

  const [openModules, setOpenModules] = useState([current.moduleIndex]); // expanded topics

  // ---------- DERIVED VALUES ----------
  const currentIndex = lessons.indexOf(current);
  const previous = lessons[currentIndex - 1]; // undefined for the first lesson
  const next = lessons[currentIndex + 1];     // undefined for the last lesson
  const isDone = progress.completed.includes(current.id);
  const percent = Math.round((progress.completed.length / lessons.length) * 100);

  // ---------- EFFECTS ----------
  // Save the progress every time it changes
  useEffect(() => {
    saveProgress(user.email, course.slug, progress);
  }, [progress]);

  // Remember the lesson being watched (so "Continue learning" resumes here)
  useEffect(() => {
    setProgress((old) => (old.last === current.id ? old : { ...old, last: current.id }));
  }, [current.id]);

  // When the lesson changes: load ITS note, and open its topic in the list
  useEffect(() => {
    setNote(getNote(user.email, course.slug, current.id));
    setOpenModules((old) => (old.includes(current.moduleIndex) ? old : [...old, current.moduleIndex]));
  }, [current.id]);

  // ---------- ACTIONS ----------
  function goToLesson(lesson) {
    navigate(`/learn/${course.slug}/${lesson.id}`);
  }

  // Add the lesson to "completed", or remove it if it is already there
  function toggleComplete() {
    setProgress((old) => ({
      ...old,
      completed: isDone
        ? old.completed.filter((id) => id !== current.id)
        : [...old.completed, current.id],
    }));
  }

  function toggleModule(index) {
    setOpenModules((old) => (old.includes(index) ? old.filter((item) => item !== index) : [...old, index]));
  }

  function handleNoteChange(event) {
    setNote(event.target.value);
    saveNote(user.email, course.slug, current.id, event.target.value); // save as you type
  }

  const youtubeLink = `https://www.youtube.com/watch?v=${current.video}`;
  const searchLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(current.title + " " + course.title)}`;

  return (
    <div className="learn-page">
      {/* ---------- Top bar: back link, course title, progress ---------- */}
      <div className="learn-bar">
        <Link to="/my-courses" className="learn-back">&larr; My courses</Link>
        <h1>{course.title}</h1>
        <div className="learn-progress" aria-label={`${percent}% complete`}>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }}></div></div>
          <span>{percent}% complete</span>
        </div>
      </div>

      <div className="learn-layout">
        {/* ================= LEFT: video + tabs ================= */}
        <div className="learn-main">
          <div className="player">
            {/* The YouTube player. `key` makes React load a fresh player for each lesson. */}
            <iframe
              key={current.video}
              src={`https://www.youtube-nocookie.com/embed/${current.video}?rel=0&modestbranding=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="player-help">
            Video not playing? <a href={youtubeLink} target="_blank" rel="noreferrer">Watch it on YouTube</a> or{" "}
            <a href={searchLink} target="_blank" rel="noreferrer">find a similar video</a>.
          </p>

          <p className="lesson-path">{current.moduleTitle} &bull; Lesson {currentIndex + 1} of {lessons.length}</p>
          <h2 className="lesson-title">{current.title}</h2>

          {/* Previous / Mark complete / Next */}
          <div className="lesson-actions">
            <button className="btn btn-outline btn-sm" disabled={!previous} onClick={() => goToLesson(previous)}>
              &larr; Previous
            </button>
            <button className={isDone ? "btn btn-sm complete-btn done" : "btn btn-sm complete-btn"} onClick={toggleComplete}>
              {isDone ? "✓ Completed" : "Mark as complete"}
            </button>
            <button className="btn btn-primary btn-sm" disabled={!next} onClick={() => goToLesson(next)}>
              Next &rarr;
            </button>
          </div>

          {/* A banner when every lesson is done */}
          {percent === 100 && (
            <div className="course-complete">
              <strong>Congratulations! You completed {course.title}.</strong>
              <Link to="/feedback">Share your feedback</Link>
            </div>
          )}

          {/* Tabs */}
          <div className="learn-tabs" role="tablist">
            <button role="tab" aria-selected={tab === "overview"} className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>
              Overview
            </button>
            <button role="tab" aria-selected={tab === "notes"} className={tab === "notes" ? "active" : ""} onClick={() => setTab("notes")}>
              Notes
            </button>
          </div>

          {tab === "overview" ? (
            <div className="tab-panel">
              <h3>About this lesson</h3>
              <p>{current.about}</p>
              <h3>About this course</h3>
              <p>{course.about}</p>
              <p className="instructor-line">Instructor: <strong>{course.instructor.name}</strong>, {course.instructor.role}</p>
            </div>
          ) : (
            <div className="tab-panel">
              <h3>Your notes for this lesson</h3>
              <textarea
                className="input notes-box"
                placeholder="Write what you learned. Your notes are saved automatically in this browser."
                value={note}
                onChange={handleNoteChange}
              ></textarea>
            </div>
          )}
        </div>

        {/* ================= RIGHT: course content ================= */}
        <aside className="learn-sidebar">
          <h3>Course content</h3>

          {modules.map((module, moduleIndex) => {
            const isOpen = openModules.includes(moduleIndex);
            const doneCount = module.lessons.filter((lesson) => progress.completed.includes(lesson.id)).length;

            return (
              <div className="module" key={module.title}>
                {/* Topic title. Click it to open / close its lessons. */}
                <button className="module-head" onClick={() => toggleModule(moduleIndex)} aria-expanded={isOpen}>
                  <span className="module-name">
                    <small>Topic {moduleIndex + 1}</small>
                    {module.title}
                  </span>
                  <span className="module-count">{doneCount}/{module.lessons.length}</span>
                  <span className={isOpen ? "chevron open" : "chevron"}>&#9662;</span>
                </button>

                {isOpen && (
                  <ul className="lesson-list">
                    {module.lessons.map((lesson) => {
                      const done = progress.completed.includes(lesson.id);
                      const active = lesson.id === current.id;
                      return (
                        <li key={lesson.id}>
                          <button className={active ? "lesson-row active" : "lesson-row"} onClick={() => goToLesson(lesson)}>
                            <span className={done ? "lesson-status done" : "lesson-status"}>
                              {done ? "✓" : active ? "▶" : ""}
                            </span>
                            <span className="lesson-name">
                              {lesson.title}
                              <small>Video lesson</small>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
