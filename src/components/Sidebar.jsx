// =====================================================================
// Sidebar.jsx  -  the slide-in menu for phones (opened by the hamburger)
//                 It also contains the account links and the Dark Mode switch.
// =====================================================================
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "./Sidebar.css";

// Props (all given by App.jsx):
//   isOpen        -> true/false : should the menu be visible?
//   onClose       -> function   : closes the menu
//   darkMode      -> true/false : current theme
//   onToggleTheme -> function   : switches the theme
export default function Sidebar({ isOpen, onClose, darkMode, onToggleTheme }) {
  const { user, openAuth, signOut } = useAuth();
  const { cartCount } = useCart();

  // If isOpen is true we add the extra class "open".
  // Sidebar.css moves the menu on screen when that class is present.
  const openClass = isOpen ? "open" : "";

  return (
    <>
      {/* Dark transparent layer behind the menu. Clicking it closes the menu. */}
      <div className={`sidebar-overlay ${openClass}`} onClick={onClose}></div>

      <aside className={`sidebar-menu ${openClass}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        {/* Clicking any link also closes the menu (onClick={onClose}) */}
        <div className="sidebar-links">
          <NavLink to="/" end onClick={onClose}>Home</NavLink>
          <NavLink to="/courses" onClick={onClose}>Browse courses</NavLink>
          <NavLink to="/cart" onClick={onClose}>Cart ({cartCount})</NavLink>
          <NavLink to="/about" onClick={onClose}>About us</NavLink>
          <NavLink to="/feedback" onClick={onClose}>Feedback</NavLink>

          {user ? (
            <>
              <p className="sidebar-user">Signed in as <strong>{user.name}</strong></p>
              <NavLink to="/my-courses" onClick={onClose}>My courses</NavLink>
              <NavLink to="/orders" onClick={onClose}>My orders</NavLink>
              <button onClick={() => { onClose(); signOut(); }}>Sign out</button>
            </>
          ) : (
            <button onClick={() => { onClose(); openAuth("signin"); }}>Sign in / Create account</button>
          )}
        </div>

        {/* DARK MODE SWITCH
            A real checkbox (hidden by CSS) drawn as a sliding switch.
            checked={darkMode}   -> the switch always shows the current state
            onChange={...}       -> clicking it calls toggleTheme in App.jsx */}
        <div className="theme-toggle-box">
          <span>Dark mode</span>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={onToggleTheme} />
            <span className="slider"></span>
          </label>
        </div>
      </aside>
    </>
  );
}
