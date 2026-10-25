// =====================================================================
// AuthModal.jsx  -  the Sign in / Create account popup
//
// Two tabs share one form:
//   "signin" -> email + password
//   "signup" -> name + email + password + confirm password (+ strength meter)
// The form checks every field BEFORE calling the context functions
// (validation), and shows an error message under each wrong field.
// =====================================================================
import { useState } from "react";
import Modal from "./Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./AuthModal.css";

// Score a password from 0 to 4 and give it a label for the strength meter
function passwordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;                            // long enough
  if (password.length >= 10) score++;                           // really long
  if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) score++; // letters + numbers
  if (/[^a-zA-Z0-9]/.test(password) || /[A-Z]/.test(password)) score++; // symbol or capital
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

export default function AuthModal() {
  // From the context: the popup's starting tab and the actions
  const { authMode, closeAuth, signIn, signUp } = useAuth();

  // ---------- STATE ----------
  const [mode, setMode] = useState(authMode);       // which tab is open
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});         // { email: "message", ... }
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);    // true while we "check" the account

  const isSignup = mode === "signup";
  const strength = passwordStrength(form.password);

  // One handler for all inputs (each input has a `name` matching a key in `form`)
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // Switching tab clears old error messages
  function switchMode(newMode) {
    setMode(newMode);
    setErrors({});
  }

  // Returns an object of error messages. An empty object means "all good".
  function validate() {
    const found = {};
    if (isSignup && form.name.trim().length < 2) found.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) found.email = "Enter a valid email address.";
    if (form.password.length < 6) found.password = "Password must be at least 6 characters.";
    if (isSignup && form.confirm !== form.password) found.confirm = "Passwords do not match.";
    return found;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return; // stop: there are errors

    setLoading(true);
    // `await` waits for the (asynchronous) password hashing to finish
    const result = isSignup
      ? await signUp(form.name, form.email, form.password)
      : await signIn(form.email, form.password);
    setLoading(false);

    // On success the context closes the popup by itself. On failure we show why.
    if (!result.ok) setErrors({ form: result.error });
  }

  return (
    <Modal title={isSignup ? "Create account" : "Sign in"} onClose={closeAuth}>
      {/* Tabs */}
      <div className="auth-tabs" role="tablist">
        <button role="tab" aria-selected={!isSignup} className={!isSignup ? "active" : ""} onClick={() => switchMode("signin")}>
          Sign in
        </button>
        <button role="tab" aria-selected={isSignup} className={isSignup ? "active" : ""} onClick={() => switchMode("signup")}>
          Create account
        </button>
      </div>

      <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
      <p className="modal-text">
        {isSignup ? "Join EduSphere to buy courses and track your orders." : "Sign in to continue to EduSphere."}
      </p>

      {/* noValidate: we show our OWN error messages instead of the browser's */}
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <div className="form-error" role="alert">{errors.form}</div>}

        {/* Name is only needed when creating an account */}
        {isSignup && (
          <div className="field">
            <label htmlFor="auth-name">Full name</label>
            <input id="auth-name" name="name" className={errors.name ? "input has-error" : "input"}
              value={form.name} onChange={handleChange} placeholder="Your full name" maxLength={40} autoFocus />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
        )}

        <div className="field">
          <label htmlFor="auth-email">Email</label>
          <input id="auth-email" name="email" type="email" className={errors.email ? "input has-error" : "input"}
            value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email"
            autoFocus={!isSignup} />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <div className="password-wrap">
            <input id="auth-password" name="password" type={showPassword ? "text" : "password"}
              className={errors.password ? "input has-error" : "input"}
              value={form.password} onChange={handleChange} placeholder="At least 6 characters"
              autoComplete={isSignup ? "new-password" : "current-password"} />
            {/* Toggle between hidden dots and readable text */}
            <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="field-error">{errors.password}</p>}

          {/* Strength meter: 4 bars, the first `score` bars are colored */}
          {isSignup && form.password && (
            <div className="strength">
              <div className="strength-bars">
                {[1, 2, 3, 4].map((bar) => (
                  <span key={bar} className={bar <= strength.score ? `bar on level-${strength.score}` : "bar"}></span>
                ))}
              </div>
              <span className="strength-label">{strength.label}</span>
            </div>
          )}
        </div>

        {isSignup && (
          <div className="field">
            <label htmlFor="auth-confirm">Confirm password</label>
            <input id="auth-confirm" name="confirm" type={showPassword ? "text" : "password"}
              className={errors.confirm ? "input has-error" : "input"}
              value={form.confirm} onChange={handleChange} placeholder="Type the password again" autoComplete="new-password" />
            {errors.confirm && <p className="field-error">{errors.confirm}</p>}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="auth-note">Demo accounts are stored only in this browser.</p>
    </Modal>
  );
}
