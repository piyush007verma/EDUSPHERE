// =====================================================================
// pages/Orders.jsx  -  "My orders": everything the signed-in user bought.
// Orders are saved in localStorage by CartContext.placeOrder().
// =====================================================================
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/money.js";
import "./Orders.css";

export default function Orders() {
  return (
    <RequireAuth title="My orders">
      <OrdersContent />
    </RequireAuth>
  );
}

function OrdersContent() {
  const { myOrders } = useCart();

  return (
    <>
      <PageHero title="My orders" subtitle="Your purchased courses and receipts." />

      <section className="section">
        {myOrders.length === 0 ? (
          <div className="empty-state">
            <h2>No orders yet</h2>
            <p>When you buy a course it will show up here.</p>
            <Link to="/courses" className="btn btn-primary">Browse courses</Link>
          </div>
        ) : (
          <div className="orders-list">
            {myOrders.map((order) => (
              <article className="order-card" key={order.id}>
                <header className="order-head">
                  <div>
                    <strong>Order {order.id}</strong>
                    {/* toLocaleDateString turns the saved date into e.g. 24 Oct 2026 */}
                    <span>{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <strong className="order-total">{formatPrice(order.total)}</strong>
                </header>

                <ul>
                  {order.items.map((item) => (
                    <li key={item.slug}>
                      {/* Bought courses open the learning page */}
                      <Link to={`/learn/${item.slug}`}>{item.title}</Link>
                      <span>{formatPrice(item.price)}</span>
                    </li>
                  ))}
                </ul>

                {order.discount > 0 && (
                  <p className="order-saved">Coupon {order.couponCode} saved you {formatPrice(order.discount)}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
