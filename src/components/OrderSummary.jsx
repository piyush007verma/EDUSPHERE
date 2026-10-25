// =====================================================================
// OrderSummary.jsx  -  the three money lines (Subtotal, Discount, Total).
// Used on BOTH the Cart page and the Checkout page, so the numbers
// always look the same.
// =====================================================================
import { formatPrice } from "../utils/money.js";
import "./OrderSummary.css";

export default function OrderSummary({ subtotal, discount, total, couponCode }) {
  return (
    <div className="order-lines">
      <div className="summary-line">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* The discount line is drawn only when a coupon is giving a discount */}
      {discount > 0 && (
        <div className="summary-line discount">
          <span>Discount ({couponCode})</span>
          <span>- {formatPrice(discount)}</span>
        </div>
      )}

      <div className="summary-line total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
