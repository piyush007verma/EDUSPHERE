// =====================================================================
// data/coupons.js  -  ALL discount coupons live here.
//
// To add your own coupon, add one more line to the object below:
//   CODE: { type, value, description, minTotal?, minItems? }
//
//   type      "percent" -> value is a percentage (10 = 10% off)
//             "flat"    -> value is a fixed amount in rupees
//   minTotal  (optional) the cart must be worth at least this much
//   minItems  (optional) the cart must contain at least this many courses
// =====================================================================
import { formatPrice } from "../utils/money.js";

export const coupons = {
  EDU10:      { type: "percent", value: 10, description: "10% off any order" },
  HESOYAM:  { type: "percent", value: 20, minTotal: 4000, description: "20% off orders above ₹4,000" },
  FEEPROJECT: { type: "flat",    value: 500, minTotal: 2500, description: "₹500 off orders above ₹2,500" },
  BUNDLE25:   { type: "percent", value: 25, minItems: 3, description: "25% off when you buy 3 or more courses" },
};

// Checks a code against the current cart and returns:
//   { valid: true/false, discount: amount in rupees, message: text to show }
export function evaluateCoupon(code, subtotal, itemCount) {
  const key = code.trim().toUpperCase();
  if (key === "") return { valid: false, discount: 0, message: "" };

  const coupon = coupons[key];
  if (!coupon) {
    return { valid: false, discount: 0, message: "This coupon code is not valid." };
  }
  if (coupon.minTotal && subtotal < coupon.minTotal) {
    return { valid: false, discount: 0, message: `${key} needs a cart of ${formatPrice(coupon.minTotal)} or more.` };
  }
  if (coupon.minItems && itemCount < coupon.minItems) {
    return { valid: false, discount: 0, message: `${key} needs at least ${coupon.minItems} courses in the cart.` };
  }

  // Percent coupons take a share of the subtotal. Flat coupons take a fixed amount.
  const amount = coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  // Never discount more than the cart is worth
  const discount = Math.min(amount, subtotal);
  return { valid: true, discount, message: `${key} applied: ${coupon.description}` };
}
