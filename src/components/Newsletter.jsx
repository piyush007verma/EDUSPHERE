// =====================================================================
// Newsletter.jsx  -  "Stay updated" email box inside the Footer.
// After clicking Subscribe, the form fades out and "Subscribed!" appears.
// =====================================================================
import { useState } from "react";

export default function Newsletter() {
  // STATE: has the user subscribed yet? (starts as false)
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // don't reload the page
    setSubscribed(true);    // React re-draws and the CSS shows the success message
  }

  return (
    <div className="footer-newsletter">
      <h4>Stay updated</h4>

      {/* When subscribed is true we add the class "subscribed";
          Footer.css uses it to hide the form and show the message. */}
      <div className={subscribed ? "newsletter-content subscribed" : "newsletter-content"}>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          {/* `required` + type="email": the browser checks the email for us */}
          <input type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>

        <div className="success-msg">
          <span className="tick-icon">✓</span> Subscribed!
        </div>
      </div>
    </div>
  );
}
