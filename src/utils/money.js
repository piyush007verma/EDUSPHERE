// =====================================================================
// utils/money.js  -  two tiny helpers for prices
// Our course data stores prices as text ("₹1,999"), but to add them up
// and calculate discounts we need real numbers.
// =====================================================================

// "₹1,999"  ->  1999   (remove everything that is not a digit)
export function parsePrice(text) {
  return Number(String(text).replace(/[^0-9]/g, ""));
}

// 1999  ->  "₹1,999"   (en-IN adds the commas the Indian way)
export function formatPrice(number) {
  return "₹" + number.toLocaleString("en-IN");
}
