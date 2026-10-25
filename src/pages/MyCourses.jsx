// =====================================================================
// pages/MyCourses.jsx  -  all the courses the signed-in user has bought,
// with a progress bar. Clicking one opens the learning page.
// =====================================================================
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { courses } from "../data/courses.js";
import { getAllLessons } from "../data/lessons.js";
import { getProgress } from "../utils/progress.js";
import "./MyCourses.css";

export default function MyCourses() {
  return (
    <RequireAuth title="My courses">
      <MyCoursesContent />
    </RequireAuth>
  );
}

function MyCoursesContent() {
  const { user } = useAuth();
  const { myOrders } = useCart();

  // Every bought course, once (an order can hold several courses)
  const slugs = [...new Set(myOrders.flatMap((order) => order.items.map((item) => item.slug)))];
  const myCourses = slugs.map((slug) => courses.find((course) => course.slug === slug)).filter(Boolean);

  return (
    <>
      <PageHero title="My courses" subtitle="Pick up where you left off." />

      <section className="section">
        {myCourses.length === 0 ? (
          <div className="empty-state">
            <h2>You have no courses yet</h2>
            <p>Buy a course and it will appear here, ready to watch.</p>
            <Link to="/courses" className="btn btn-primary">Browse courses</Link>
          </div>
        ) : (
          <div className="my-courses-grid">
            {myCourses.map((course) => {
              const total = getAllLessons(course.slug).length;
              const progress = getProgress(user.email, course.slug);
              const done = progress.completed.length;
              const percent = Math.round((done / total) * 100);

              return (
                <article className="card my-course" key={course.slug}>
                  <Link to={`/learn/${course.slug}`} className="my-course-image">
                    <img src={course.image} alt={course.title} />
                  </Link>
                  <div className="my-course-body">
                    <span className="course-category">{course.category}</span>
                    <h3>{course.title}</h3>

                    <div className="my-progress">
                      <div className="my-progress-track"><div className="my-progress-fill" style={{ width: `${percent}%` }}></div></div>
                      <span>{done} of {total} lessons &bull; {percent}%</span>
                    </div>

                    <Link to={`/learn/${course.slug}`} className="btn btn-primary btn-sm">
                      {done === 0 ? "Start learning" : percent === 100 ? "Review course" : "Continue learning"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
