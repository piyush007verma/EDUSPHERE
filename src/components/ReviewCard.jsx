// =====================================================================
// ReviewCard.jsx  -  ONE student review (comment, photo, name, stars)
// Used on the Home page and on every course page.
// =====================================================================
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  return (
    <div className="card review-card">
      <p>"{review.text}"</p>
      <div className="review-header">
        <img src={review.image} alt={review.name} />
        <div>
          <h4>{review.name}</h4>
          <div className="rating">{review.stars}</div>
        </div>
      </div>
    </div>
  );
}
