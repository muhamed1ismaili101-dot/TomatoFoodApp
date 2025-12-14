import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { ToastProvider } from "./context/toastContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </BrowserRouter>
);
