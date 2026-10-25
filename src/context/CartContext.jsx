// =====================================================================
// context/CartContext.jsx  -  the shopping cart, coupon and orders
//
// Shared by: course cards (Add to cart), Navbar (badge), Cart page,
// Checkout page, Orders page.  Everything is saved in localStorage, so
// the cart survives a page reload.
// =====================================================================
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { courses } from "../data/courses.js";
import { evaluateCoupon } from "../data/coupons.js";
import { parsePrice } from "../utils/money.js";

const CART_KEY = "edusphere_cart";       // list of course slugs in the cart
const COUPON_KEY = "edusphere_coupon";   // the applied coupon code
const ORDERS_KEY = "edusphere_orders";   // every completed order

const CartContext = createContext(null);

function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------- STATE ----------
  const [cartSlugs, setCartSlugs] = useState(() => loadJSON(CART_KEY, []));
  const [couponCode, setCouponCode] = useState(() => localStorage.getItem(COUPON_KEY) || "");
  const [orders, setOrders] = useState(() => loadJSON(ORDERS_KEY, []));
  const [toast, setToast] = useState(""); // little message at the bottom of the screen

  // ---------- SAVE to localStorage whenever something changes ----------
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartSlugs));
  }, [cartSlugs]);

  useEffect(() => {
    localStorage.setItem(COUPON_KEY, couponCode);
  }, [couponCode]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Hide the toast message 2.2 seconds after it appears
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  // ---------- DERIVED VALUES (calculated from the state, never stored) ----------
  // Orders that belong to the signed-in user
  const myOrders = user ? orders.filter((order) => order.email === user.email) : [];
  // Slugs of the courses this user already bought
  const enrolledSlugs = myOrders.flatMap((order) => order.items.map((item) => item.slug));

  // Turn the slugs ["python", "ai"] into full course objects
  const items = cartSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter(Boolean);

  const subtotal = items.reduce((sum, course) => sum + parsePrice(course.price), 0);
  const coupon = evaluateCoupon(couponCode, subtotal, items.length);
  const discount = coupon.valid ? coupon.discount : 0;
  const total = subtotal - discount;

  const inCart = (slug) => cartSlugs.includes(slug);
  const isEnrolled = (slug) => enrolledSlugs.includes(slug);

  // ---------- ACTIONS ----------
  function addToCart(slug) {
    const course = courses.find((item) => item.slug === slug);
    if (isEnrolled(slug)) return setToast("You are already enrolled in this course");
    if (inCart(slug)) return setToast("This course is already in your cart");
    setCartSlugs([...cartSlugs, slug]);
    setToast(`${course.title} added to cart`);
  }

  function removeFromCart(slug) {
    setCartSlugs(cartSlugs.filter((item) => item !== slug));
  }

  // "Enroll now": put the course in the cart and go straight to checkout
  function buyNow(slug) {
    if (isEnrolled(slug)) return navigate(`/learn/${slug}`);
    if (!inCart(slug)) setCartSlugs([...cartSlugs, slug]);
    navigate("/checkout");
  }

  // Try to apply a coupon. Returns { ok, message } so the page can show it.
  function applyCoupon(code) {
    const result = evaluateCoupon(code, subtotal, items.length);
    if (result.valid) setCouponCode(code.trim().toUpperCase());
    return { ok: result.valid, message: result.message || "Enter a coupon code." };
  }

  function removeCoupon() {
    setCouponCode("");
  }

  // Called after the payment is verified: saves the order and empties the cart
  function placeOrder({ phone }) {
    const order = {
      id: "ES" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      email: user.email,
      name: user.name,
      phone,
      items: items.map((course) => ({ slug: course.slug, title: course.title, price: parsePrice(course.price) })),
      subtotal,
      discount,
      couponCode: coupon.valid ? couponCode : "",
      total,
    };
    setOrders([order, ...orders]);
    setCartSlugs([]);
    setCouponCode("");
    return order;
  }

  const value = {
    items, cartCount: items.length, subtotal, discount, total,
    couponCode, coupon, myOrders, toast,
    inCart, isEnrolled, addToCart, removeFromCart, buyNow,
    applyCoupon, removeCoupon, placeOrder,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
