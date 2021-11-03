import "./styles.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList/productList";
import { Cart } from "./components/cart/cartList1";
import { WishList } from "./components/WishList/wishlist";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { DataLoader } from "./components/DataLoader";
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  return (
    <div className="App">
      <DataLoader />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
