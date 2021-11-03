import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./components/cart/cartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { WishProvider } from "./components/WishList/wishContext";
import { ProductProvider } from "./components/ProductList/productContext";
import { AuthProvider } from "./components/Context/authProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishProvider>
              <App />
            </WishProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
