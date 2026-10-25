// =====================================================================
// pages/CourseDetail.jsx  -  ONE page layout for ALL 6 courses.
//
// The URL decides which course is shown:
//   /courses/python  ->  slug = "python"  ->  Python course data
//   /courses/cloud   ->  slug = "cloud"   ->  Cloud course data
// (In the old site this needed 6 separate HTML files.)
// =====================================================================
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import NotFound from "./NotFound.jsx";
import { courses } from "../data/courses.js";
import "./CourseDetail.css";

export default function CourseDetail() {
  // Cart helpers from CartContext
  const { inCart, isEnrolled, addToCart, buyNow } = useCart();
  // useParams() reads the ":slug" part of the URL (see the Route in App.jsx)
  const { slug } = useParams();

  // .find() returns the first course whose slug matches (or undefined)
  const course = courses.find((item) => item.slug === slug);

  // Unknown address like /courses/banana -> show the 404 page
  if (!course) {
    return <NotFound />;
  }

  const enrolled = isEnrolled(course.slug);

  return (
    <div className="course-page">
      {/* ================= HERO (dark banner) ================= */}
      <header className="course-hero">
        <div className="course-hero-content">
          {/* Breadcrumb: shows where we are and a way back */}
          <p className="breadcrumb">
            <Link to="/courses">Courses</Link> / {course.title}
          </p>
          <span className="course-badge">{course.category}</span>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
          <div className="course-hero-stats">
            <span>Rating: {course.rating}</span>
            <span>Students: {course.students}</span>
            <span>Instructor: {course.instructorName}</span>
          </div>
        </div>
        <div className="course-hero-image">
          <img src={course.heroImage} alt={`${course.title} course`} />
        </div>
      </header>

      {/* ================= BODY: 2 columns ================= */}
      <div className="course-container">
        {/* ---------- LEFT COLUMN: the course content ---------- */}
        <div className="course-content">
          <section>
            <h2 className="course-heading">Course highlights</h2>
            <div className="highlights-grid">
              {course.highlights.map((item) => (
                <div className="highlight-item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="course-heading">What you'll learn</h2>
            <ul className="learn-list">
              {course.learn.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="course-heading">Course curriculum</h2>
            <div className="curriculum-list">
              {course.modules.map((lesson, index) => (
                <div className="module-card" key={lesson.title}>
                  {/* index starts at 0, so +1; padStart makes 1 -> "01" */}
                  <h5>MODULE {String(index + 1).padStart(2, "0")}</h5>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.meta}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="course-heading">About this course</h2>
            <p className="course-about">{course.about}</p>

            <h2 className="course-heading">Requirements</h2>
            <ul className="req-list">
              {course.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="course-heading">Who is this course for?</h2>
            <div className="who-for-grid">
              {course.whoFor.map((person) => (
                <div className="who-card" key={person}>{person}</div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="course-heading">Meet your instructor</h2>
            <div className="instructor-card">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="instructor-img"
              />
              <div className="instructor-info">
                <h3>{course.instructor.name}</h3>
                <p>{course.instructor.role}</p>
                <p>{course.instructor.bio}</p>
                <p>
                  <strong>Rating:</strong> {course.instructor.rating} &bull;{" "}
                  <strong>Learners:</strong> {course.instructor.learners}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="course-heading">Student reviews</h2>
            {/* Same ReviewCard component that the Home page uses */}
            <div className="reviews-grid">
              {course.reviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </section>
        </div>

        {/* ---------- RIGHT COLUMN: price card (sticks while scrolling) ---------- */}
        <aside className="course-sidebar">
          <div className="info-card">
            <div className="price">{course.price}</div>
            <ul className="info-list">
              {/* Object.entries turns {Duration: "12 Weeks", ...}
                  into pairs [["Duration", "12 Weeks"], ...] we can .map() */}
              {Object.entries(course.info).map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            {/* "Enroll now" = put in cart + go to checkout.  "Add to cart" = keep browsing. */}
            {enrolled ? (
              <Link to={`/learn/${course.slug}`} className="enroll-btn">Start learning</Link>
            ) : (
              <>
                <button className="enroll-btn" onClick={() => buyNow(course.slug)}>Enroll now</button>
                {inCart(course.slug) ? (
                  <Link to="/cart" className="cart-link-btn">Go to cart</Link>
                ) : (
                  <button className="cart-link-btn" onClick={() => addToCart(course.slug)}>Add to cart</button>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="final-cta">
        <h2>Ready to start learning?</h2>
        <p>Join thousands of learners building practical skills with EduSphere.</p>
        <button className="cta-btn" onClick={() => buyNow(course.slug)}>
          {enrolled ? "Start learning" : "Enroll now"}
        </button>
      </section>
    </div>
  );
}
