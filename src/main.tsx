import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ProductProvider } from "context/reducers/productReducer.tsx";
import { CartProvider } from "context/reducers/cartReducer.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
