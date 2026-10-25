// =====================================================================
// context/AuthContext.jsx  -  accounts, sign in, sign up, sign out
//
// WHAT IS CONTEXT?
// Normally data is passed from parent to child with props. When many
// components far apart need the same data (the Navbar, the Cart page, the
// Checkout page all need "who is signed in?"), passing props through every
// level gets messy. Context is a shared "box" any component can open with
// one line:   const { user } = useAuth();
//
// IMPORTANT (be honest in the viva): this is a DEMO. Accounts are stored in
// this browser's localStorage only. A real website must check passwords on a
// server. We do hash the password (SHA-256 + a random salt) so the plain
// password is never stored, which shows the idea of real authentication.
// =====================================================================
import { createContext, useContext, useState } from "react";

const USERS_KEY = "edusphere_users";     // list of all accounts
const SESSION_KEY = "edusphere_session"; // who is signed in right now

const AuthContext = createContext(null);

// ---------- small helpers ----------
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// Turns "mypassword" into a long scrambled text that cannot be reversed.
// The same password + same salt always gives the same result, so we can
// compare at sign in without ever storing the real password.
async function hashPassword(password, salt) {
  const text = salt + password;
  if (window.crypto && window.crypto.subtle) {
    const bytes = new TextEncoder().encode(text);
    const buffer = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback if the browser has no crypto (very rare): a simple hash
  let hash = 0;
  for (const character of text) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return String(hash);
}

// ---------- the provider: wraps the app and shares the data ----------
export function AuthProvider({ children }) {
  // user is { name, email } when signed in, or null when signed out
  const [user, setUser] = useState(loadSession);

  // Controls the Sign in popup (it lives here so ANY page can open it)
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // "signin" or "signup"

  function openAuth(mode = "signin") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function closeAuth() {
    setAuthOpen(false);
  }

  // Remember the user in the browser and update the screen
  function startSession(account) {
    const session = { name: account.name, email: account.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    setAuthOpen(false);
  }

  // Create a new account. Returns { ok: true } or { ok: false, error: "..." }
  async function signUp(name, email, password) {
    const users = loadUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((account) => account.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists. Please sign in." };
    }

    const salt = Math.random().toString(36).slice(2, 12); // random text per user
    const passwordHash = await hashPassword(password, salt);
    const account = { name: name.trim(), email: cleanEmail, salt, passwordHash };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]));
    startSession(account); // sign the new user in straight away
    return { ok: true };
  }

  // Check email + password. Returns { ok: true } or { ok: false, error: "..." }
  async function signIn(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const account = loadUsers().find((item) => item.email === cleanEmail);

    // Same message for "no such email" and "wrong password" (does not
    // tell an attacker which emails exist)
    const wrong = { ok: false, error: "Incorrect email or password." };
    if (!account) return wrong;

    const hash = await hashPassword(password, account.salt);
    if (hash !== account.passwordHash) return wrong;

    startSession(account);
    return { ok: true };
  }

  function signOut() {
    localStorage.removeItem(SESSION_KEY); // only the session, accounts stay
    setUser(null);
  }

  // Everything inside `value` can be used by any component below
  const value = { user, authOpen, authMode, openAuth, closeAuth, signUp, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// A shortcut so components write useAuth() instead of useContext(AuthContext)
export function useAuth() {
  return useContext(AuthContext);
}
