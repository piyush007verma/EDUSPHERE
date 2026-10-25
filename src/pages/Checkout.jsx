// =====================================================================
// pages/Checkout.jsx  -  billing details + QR payment + confirmation
//
// The page has 3 situations:
//   1. order is set        -> show the "Order confirmed" screen
//   2. cart is empty       -> show an "empty" message
//   3. otherwise           -> show the checkout form
//
// The payment steps are stored in ONE state, `status`:
//   "idle" -> "verifying" -> "paid"      (or back to "idle" + an error message)
// "verifying" uses a PROMISE: verifyPayment() (utils/payment.js).
//   .then()  runs when the payment is accepted
//   .catch() runs when it fails (for example: no internet)
// =====================================================================
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import QrPayment from "../components/QrPayment.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/money.js";
import { verifyPayment } from "../utils/payment.js";
import "./Checkout.css";

// The exported page is wrapped in the guard: signed-out users see a Sign in
// message, signed-in users see CheckoutContent.
export default function Checkout() {
  return (
    <RequireAuth title="Checkout">
      <CheckoutContent />
    </RequireAuth>
  );
}

function CheckoutContent() {
  const { user } = useAuth();
  const { items, subtotal, discount, total, couponCode, placeOrder } = useCart();

  // ---------- STATE ----------
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");   // message shown when the payment check fails
  const [order, setOrder] = useState(null); // the finished order (after payment)

  // A "ref" is a box that keeps a value without causing a re-render.
  // We use it to know if this page is still on screen when the Promise finishes.
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; }; // runs when the user leaves the page
  }, []);

  // The browser checks the form (required, phone pattern) before this runs
  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setStatus("verifying");

    // verifyPayment() returns a Promise. We say what to do in each case:
    verifyPayment(total)
      .then(() => {
        if (!isMounted.current) return; // the user left the page: do nothing
        setOrder(placeOrder({ phone })); // saves the order and empties the cart
        setStatus("paid");
      })
      .catch((problem) => {
        if (!isMounted.current) return;
        setError(problem.message); // show why it failed
        setStatus("idle");         // let the user try again
      });
  }

  // ---------- 1. Order confirmed ----------
  if (order) {
    return (
      <>
        <PageHero title="Order confirmed" subtitle="Thank you for learning with EduSphere." />
        <section className="section">
          <div className="confirm-card">
            <div className="confirm-tick">✓</div>
            <h2>Payment successful</h2>
            <p className="confirm-id">Order ID: <strong>{order.id}</strong></p>

            <ul className="confirm-items">
              {order.items.map((item) => (
                <li key={item.slug}>
                  <span>{item.title}</span>
                  <span>{formatPrice(item.price)}</span>
                </li>
              ))}
            </ul>

            <OrderSummary subtotal={order.subtotal} discount={order.discount} total={order.total} couponCode={order.couponCode} />

            <p className="confirm-mail">A receipt has been saved to <strong>{order.email}</strong>.</p>
            <div className="confirm-buttons">
              <Link to="/my-courses" className="btn btn-primary">Start learning</Link>
              <Link to="/orders" className="btn btn-outline">View my orders</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---------- 2. Empty cart ----------
  if (items.length === 0) {
    return (
      <>
        <PageHero title="Checkout" subtitle="Your cart is empty." />
        <section className="section empty-state">
          <h2>Nothing to check out</h2>
          <p>Add a course to your cart first.</p>
          <Link to="/courses" className="btn btn-primary">Browse courses</Link>
        </section>
      </>
    );
  }

  // ---------- 3. The checkout form ----------
  return (
    <>
      <PageHero title="Checkout" subtitle="Confirm your details and pay with UPI." />

      <section className="section checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="panel">
            <h2>Billing details</h2>
            <div className="field">
              <label htmlFor="co-name">Name</label>
              <input id="co-name" className="input" value={user.name} readOnly />
            </div>
            <div className="field">
              <label htmlFor="co-email">Email</label>
              <input id="co-email" className="input" value={user.email} readOnly />
            </div>
            <div className="field">
              <label htmlFor="co-phone">Phone number</label>
              {/* pattern = exactly 10 digits. The browser blocks the form otherwise. */}
              <input
                id="co-phone" className="input" type="tel" required
                inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10 digit phone number"
                placeholder="10 digit mobile number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>

          <div className="panel">
            <h2>Pay with UPI</h2>
            <QrPayment amount={total} />
            {/* Shown only when the Promise was rejected */}
            {error && <p className="payment-error" role="alert">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={status === "verifying"}>
              {status === "verifying" ? "Verifying payment..." : `I have paid ${formatPrice(total)}, verify payment`}
            </button>
            <p className="demo-note">Demo only: no real payment is processed.</p>
          </div>
        </form>

        {/* ---------- Order summary ---------- */}
        <aside className="summary-card">
          <h2>Your order</h2>
          <ul className="checkout-items">
            {items.map((course) => (
              <li key={course.slug}>
                <img src={course.image} alt="" />
                <span>{course.title}</span>
                <strong>{course.price}</strong>
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal} discount={discount} total={total} couponCode={couponCode} />
          <Link to="/cart" className="continue-link">Edit cart or change coupon</Link>
        </aside>
      </section>
    </>
  );
}
