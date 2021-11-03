import { useCart } from "./cart/cartContext";
import { Link, useLocation } from "react-router-dom";
import { useWishList } from "./WishList/wishContext";
import { useAuth } from "./Context/authProvider";
import {
  ADD_TO_CART,
  SET_LOGOUT,
  SET_WISHLIST_DATA,
  ADD_TO_WISHLIST,
  SET_CART_DATA
} from "./utils/constants";
import "./header.css";

export const Header = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const { wishList, dispatch: wishDispatch } = useWishList();
  const location = useLocation();
  console.log(location.state);

  const {
    authState: { isLoggedIn, userToken },
    authDispatch
  } = useAuth();

  console.log("isLoggedIn: ", isLoggedIn, "userToken: ", userToken);

  function logouthandler() {
    localStorage?.removeItem("login");
    authDispatch({
      type: SET_LOGOUT
    });
    // cartDispatch({
    //   type: SET_CART_DATA,
    //   payLoad: null
    // });
    // wishDispatch({
    //   type: SET_WISHLIST_DATA,
    //   payLoad: null
    // });
  }

  return (
    <nav className="head">
      <Link to="/">
        {/* <div className="brand">
          <img href="hola1-favicon.png" alt="logo"></img> */}
        <p className="para--lead app-home nav__logo">LingoKart</p>
        {/* </div> */}
      </Link>
      <ul className="menu">
        <Link to="/cart" state={{ itemsInCart }}>
          <div className="nav__link">
            {/* {itemsInCart?.length === 0 ? ( */}
            {!isLoggedIn ? (
              <i
                className="fa fa-shopping-cart fa-shopping-cart--nav"
                aria-hidden="true"
              ></i>
            ) : (
              <div class="icon-badge">
                <i class="fa fa-shopping-cart cart" aria-hidden="true"></i>
                <span class="icon-badge__cart">{itemsInCart?.length}</span>
              </div>
            )}
          </div>
        </Link>

        <li className="nav__item">
          <Link to="/wishlist" state={{ wishList }}>
            <div className="nav__link">
              {!isLoggedIn ? (
                <i className="fa fa-heart wish-header" aria-hidden="true"></i>
              ) : (
                <div class="icon-badge">
                  <i class="fa fa-heart wish-header" aria-hidden="true"></i>
                  <span class="icon-badge__wish">{wishList?.length}</span>
                </div>
              )}
            </div>
          </Link>
        </li>

        <li className="nav__item">
          {isLoggedIn ? (
            <p
              className="para--lead logout-text"
              onClick={() => logouthandler()}
            >
              Logout
            </p>
          ) : (
            <Link to="/login">
              <p className="nav__link login-text para--lead"> Login</p>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
