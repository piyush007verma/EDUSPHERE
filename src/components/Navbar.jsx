// =====================================================================
// Navbar.jsx  -  the bar at the top of every page (stays visible while scrolling)
// =====================================================================
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "./Navbar.css";

// Props from App.jsx:
//   onMenuClick   -> opens the sidebar (hamburger, phones only)
//   darkMode      -> true/false, decides which icon (moon or sun) we show
//   onToggleTheme -> flips dark mode
export default function Navbar({ onMenuClick, darkMode, onToggleTheme }) {
  // Shared data from the contexts
  const { user, openAuth, signOut } = useAuth();
  const { cartCount } = useCart();

  // STATE: is the little user menu (My orders / Sign out) open?
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // A ref to the user menu box, so we can tell if a click happened outside it
  const userMenuRef = useRef(null);

  // Close the user menu when the user clicks anywhere outside of it
  useEffect(() => {
    function handleOutsideClick(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick); // cleanup
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Logo />

        {/* NavLink = Link + it automatically adds the class "active"
            to the link of the page we are currently on.
            `end` on Home means: only active on exactly "/" */}
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/feedback">Feedback</NavLink>
        </nav>

        <div className="nav-actions">
          {/* Dark mode button: shows a sun when dark, a moon when light */}
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>

          {/* Cart icon with a number badge (only shown when the cart has items) */}
          <Link to="/cart" className="cart-btn" aria-label={`Cart, ${cartCount} items`}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
              <circle cx="9.5" cy="20" r="1.2" />
              <circle cx="17" cy="20" r="1.2" />
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {/* Signed in: avatar + name that opens a small menu. Signed out: Sign in button. */}
          {user ? (
            <div className="user-menu" ref={userMenuRef}>
              <button className="user-trigger" onClick={() => setUserMenuOpen(!userMenuOpen)} aria-expanded={userMenuOpen}>
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
              </button>

              {userMenuOpen && (
                <div className="dropdown">
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.email}</p>
                  <Link to="/my-courses" onClick={() => setUserMenuOpen(false)}>My courses</Link>
                  <Link to="/orders" onClick={() => setUserMenuOpen(false)}>My orders</Link>
                  <button onClick={() => { setUserMenuOpen(false); signOut(); }}>Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-primary btn-sm auth-btn" onClick={() => openAuth("signin")}>
              Sign in
            </button>
          )}

          <button className="hamburger-btn" onClick={onMenuClick} aria-label="Open menu">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
