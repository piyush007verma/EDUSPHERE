// =====================================================================
// Toast.jsx  -  the small message that pops up at the bottom of the
// screen ("Python Programming added to cart") and disappears by itself.
// The text and the timer live in CartContext.
// =====================================================================
import { useCart } from "../context/CartContext.jsx";
import "./Toast.css";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null; // nothing to show

  // role="status" makes screen readers read the message aloud
  return <div className="toast" role="status">{toast}</div>;
}
