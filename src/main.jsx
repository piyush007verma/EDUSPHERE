// =====================================================================
// main.jsx  -  the ENTRY POINT of the app (the first file that runs)
// =====================================================================
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Global CSS (theme colors, reset, buttons...) is loaded once, here.
// It must come BEFORE the components: when two CSS rules are equally
// specific, the one loaded LAST wins, so component CSS has to load after it.
import "./styles/global.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// The order matters: each provider can use the ones OUTSIDE it.
//   BrowserRouter  -> page navigation
//   AuthProvider   -> who is signed in
//   CartProvider   -> the cart (it needs to know who is signed in)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
