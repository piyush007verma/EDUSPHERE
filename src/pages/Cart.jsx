// =====================================================================
// pages/Cart.jsx  -  the shopping cart
//   Left : the courses in the cart (with a Remove button)
//   Right: coupon box + price summary + "Proceed to checkout"
// All the data comes from CartContext (useCart).
// =====================================================================
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { useCart } from "../context/CartContext.jsx";
import { coupons } from "../data/coupons.js";
import "./Cart.css";

export default function Cart() {
  const { items, subtotal, discount, total, couponCode, coupon, removeFromCart, applyCoupon, removeCoupon } = useCart();

  // STATE: the text typed in the coupon box, and the message under it
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok: true/false, text: "..." } or null

  // Apply a coupon typed by the user (or clicked from the list)
  function tryCoupon(code) {
    const result = applyCoupon(code);
    setFeedback({ ok: result.ok, text: result.message });
    if (result.ok) setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    tryCoupon(input);
  }

  // ---------- Empty cart ----------
  if (items.length === 0) {
    return (
      <>
        <PageHero title="Your cart" subtitle="Courses you add will appear here." />
        <section className="section empty-state">
          <h2>Your cart is empty</h2>
          <p>Find a course you like and add it to your cart.</p>
          <Link to="/courses" className="btn btn-primary">Browse courses</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Your cart"
        subtitle={`${items.length} ${items.length === 1 ? "course" : "courses"} ready for checkout.`}
      />

      <section className="section cart-layout">
        {/* ---------- LEFT: the items ---------- */}
        <div className="cart-items">
          {items.map((course) => (
            <article className="cart-item" key={course.slug}>
              <img src={course.image} alt={course.title} />
              <div className="cart-item-info">
                <Link to={`/courses/${course.slug}`}><h3>{course.title}</h3></Link>
                <p>{course.info.Level} &bull; {course.info.Duration}</p>
                <button className="remove-btn" onClick={() => removeFromCart(course.slug)}>Remove</button>
              </div>
              <strong className="cart-item-price">{course.price}</strong>
            </article>
          ))}
        </div>

        {/* ---------- RIGHT: coupon + summary ---------- */}
        <aside className="summary-card">
          <h2>Order summary</h2>

          {/* A coupon is applied: show it with a Remove button */}
          {couponCode ? (
            <div className={coupon.valid ? "coupon-applied" : "coupon-applied warning"}>
              <span>{coupon.valid ? coupon.message : `${couponCode}: ${coupon.message}`}</span>
              <button onClick={() => { removeCoupon(); setFeedback(null); }}>Remove</button>
            </div>
          ) : (
            <>
              {/* No coupon yet: show the input box */}
              <form className="coupon-form" onSubmit={handleSubmit}>
                <input
                  className="input"
                  placeholder="Coupon code"
                  aria-label="Coupon code"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button type="submit" className="btn btn-outline">Apply</button>
              </form>

              {feedback && (
                <p className={feedback.ok ? "coupon-msg ok" : "coupon-msg error"}>{feedback.text}</p>
              )}

              {/* Clickable list of the coupons from data/coupons.js */}
              <div className="coupon-list">
                <span>Available coupons:</span>
                {Object.entries(coupons).map(([code, info]) => (
                  <button key={code} className="coupon-chip" title={info.description} onClick={() => tryCoupon(code)}>
                    {code}
                  </button>
                ))}
              </div>
            </>
          )}

          <OrderSummary subtotal={subtotal} discount={discount} total={total} couponCode={couponCode} />

          <Link to="/checkout" className="btn btn-primary btn-block">Proceed to checkout</Link>
          <Link to="/courses" className="continue-link">Continue shopping</Link>
        </aside>
      </section>
    </>
  );
}
