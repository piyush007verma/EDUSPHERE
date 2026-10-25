// =====================================================================
// CourseCard.jsx  -  ONE course card (image, title, details, price)
// It "pops in" (fades + scales up) when it scrolls into view.
// =====================================================================
import { Link } from "react-router-dom";
import useInView from "../hooks/useInView.js";
import { useCart } from "../context/CartContext.jsx";
import "./CourseCard.css";

// `course`   one object from data/courses.js
// `showTag`  decides if the little badge ("Bestseller"...) is drawn
// `index`    position in the grid, used to make cards pop in one after another
export default function CourseCard({ course, showTag = false, index = 0 }) {
  // Shared cart data from CartContext
  const { inCart, isEnrolled, addToCart } = useCart();

  // ref  -> we attach it to the <article> so the observer can watch it
  // isVisible -> becomes true when the card scrolls into view
  const [ref, isVisible] = useInView();

  // "4.8 ★★★★★" -> we only want the number "4.8"
  const ratingNumber = course.rating.split(" ")[0];

  return (
    <article
      ref={ref}
      className={isVisible ? "card course-card pop-in visible" : "card course-card pop-in"}
      style={{ "--delay": `${(index % 3) * 120}ms` }}
    >
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        {/* `a && b`: draw b ONLY if a is true / exists */}
        {showTag && course.tag && <span className="course-tag">{course.tag}</span>}
      </div>

      <div className="course-body">
        <span className="course-category">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="course-meta">
          <span>{course.info.Level}</span>
          <span>{course.info.Duration}</span>
          <span>★ {ratingNumber}</span>
        </div>

        <div className="course-footer">
          <strong className="course-price">{course.price}</strong>
          <div className="course-actions">
            {/* Goes to /courses/python, /courses/ai ... */}
            <Link to={`/courses/${course.slug}`} className="btn btn-outline btn-sm">
              View course
            </Link>
            {/* The button changes with the state of THIS course:
                already bought -> link "Start learning" (opens the lessons)
                in the cart    -> link "Go to cart"
                otherwise      -> "Add to cart" */}
            {isEnrolled(course.slug) ? (
              <Link to={`/learn/${course.slug}`} className="btn btn-primary btn-sm">Start learning</Link>
            ) : inCart(course.slug) ? (
              <Link to="/cart" className="btn btn-primary btn-sm">Go to cart</Link>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => addToCart(course.slug)}>
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
