// =====================================================================
// App.jsx  -  the ROOT component.
//
// It owns the two pieces of state that only the layout needs:
//   1. darkMode  (true / false)  -> saved in localStorage
//   2. menuOpen  (true / false)  -> is the mobile sidebar open?
//
// Accounts and the cart are NOT here: they live in the Contexts
// (context/AuthContext.jsx and context/CartContext.jsx), so any
// component can read them with useAuth() / useCart().
// =====================================================================
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Toast from "./components/Toast.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import Learn from "./pages/Learn.jsx";
import About from "./pages/About.jsx";
import Feedback from "./pages/Feedback.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  // ---------- STATE 1: Dark mode ----------
  // useState(() => ...) with a function runs ONLY on the first render.
  // We read localStorage there, so the saved choice is applied immediately.
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // ---------- STATE 2: Mobile menu ----------
  const [menuOpen, setMenuOpen] = useState(false);

  // From the auth context: should the Sign in popup be on screen?
  const { authOpen } = useAuth();

  // Save the theme every time darkMode changes (the [darkMode] list at the end)
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((previous) => !previous);
  }

  return (
    // When darkMode is true we add the class "dark" (see global.css)
    <div className={darkMode ? "page-wrapper dark" : "page-wrapper"}>
      <ScrollToTop />

      <Navbar
        onMenuClick={() => setMenuOpen(true)}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      {/* <Routes> shows ONE page depending on the URL in the address bar */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/my-courses" element={<MyCourses />} />
          {/* Two addresses, same page: with and without a lesson id */}
          <Route path="/learn/:slug" element={<Learn />} />
          <Route path="/learn/:slug/:lessonId" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* `condition && <Popup />` draws the popup ONLY while the condition is true.
          When it closes it is removed, so its typed text and errors reset. */}
      {authOpen && <AuthModal />}
      <Toast />
    </div>
  );
}
