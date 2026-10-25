// =====================================================================
// Reviews.jsx  -  the "Student reviews" section of the Home page
// =====================================================================
import SectionHeader from "./SectionHeader.jsx";
import ReviewCard from "./ReviewCard.jsx";
import { homeReviews } from "../data/siteContent.js";

export default function Reviews() {
  return (
    <section className="section reviews-section">
      <SectionHeader
        title="Student reviews"
        subtitle="See what our global community is saying."
      />
      <div className="reviews-grid">
        {homeReviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}
