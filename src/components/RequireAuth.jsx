// =====================================================================
// RequireAuth.jsx  -  a "guard" for pages that need a signed-in user.
//
//   <RequireAuth> <Checkout /> </RequireAuth>
//
// Signed in?  -> show the page (the `children`)
// Signed out? -> show a message with a Sign in button instead.
// When the user signs in, the context changes, React re-renders, and the
// real page appears automatically (no reload needed).
// =====================================================================
import { useAuth } from "../context/AuthContext.jsx";
import "./RequireAuth.css";

export default function RequireAuth({ title, children }) {
  const { user, openAuth } = useAuth();

  if (user) return children;

  return (
    <section className="section auth-required">
      <h1>{title}</h1>
      <p>Please sign in to continue.</p>
      <div className="auth-required-buttons">
        <button className="btn btn-primary" onClick={() => openAuth("signin")}>Sign in</button>
        <button className="btn btn-outline" onClick={() => openAuth("signup")}>Create account</button>
      </div>
    </section>
  );
}
