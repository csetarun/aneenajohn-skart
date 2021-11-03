import { useCart } from "./cartContext";
import { useWishList } from "../WishList/wishContext";
import { Header } from "../header";
import "./cartStyles.css";
import { ToastContainer } from "react-toastify";
import {
  wishlistHandler,
  CartUpdate,
  deleteCartItem
} from "../ServerCalls/ServerCalls";
import { isAddedInList } from "../utils/utils";
import { EmptyCart } from "./EmptyCart";
import { useAuth } from "../Context/authProvider";
import { DataLoader } from "../DataLoader";

export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch, wishList } = useWishList();
  const {
    authState: { userToken }
  } = useAuth();
  // const [isQtyUpdated, setQtyUpdate] = useState(true);
  const totalPrice = () =>
    itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* <DataLoader /> */}
      <section className="cart-container">
        <div>
          <Header />
          {console.log("items in cart", { itemsInCart })}
          <br />
          <div className="aside cart-total center">
            {itemsInCart?.length && (
              <div className="bill">
                <div className="para total">
                  <b>Total:</b> {""}
                  {""}
                  {totalPrice()}
                </div>
                <p className="para">
                  <strong>Delivery Charges</strong> :Free
                </p>
                <div className="para">
                  <b>Amount to be paid:</b>
                  {""}
                  {""}
                  {totalPrice()}
                </div>
                <button className="btn btn--primary btn--buy-now">
                  Order Now
                </button>
              </div>
            )}
          </div>
          {itemsInCart?.length === 0 ? (
            <p className="para--lead">
              <EmptyCart />
            </p>
          ) : (
            <div className="container__main">
              <h1 class="heading center fs-h1">My Cart</h1>
              <div className="card-container">
                {itemsInCart?.map((data) => (
                  <div className="card card--display" Key={data._id}>
                    <div className="card__thumbnail">
                      <img
                        src={data.imageUrl}
                        className="card__img"
                        alt="cardImg"
                      />
                    </div>
                    <i
                      className={
                        isAddedInList(data._id, wishList)
                          ? "fa fa-heart wish-icon wish-icon--selected"
                          : "fa fa-heart wish-icon"
                      }
                      aria-hidden="true"
                      onClick={() =>
                        wishlistHandler(data, wishList, wishDispatch, userToken)
                      }
                    ></i>
                    <div className="card__desc">
                      <h1>
                        <strong>{data.name}</strong>
                      </h1>
                      <div className="star-count">
                        <p className="star-count__star">{data.ratings}</p>
                        <div class="rating">
                          <div className="rating__stars">
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                      <h2>
                        <strong> ₹ {data.price}</strong>
                      </h2>
                      <p className="card__details offer">{data.offer}</p>
                      <i
                        class="fa fa-plus"
                        aria-hidden="true"
                        onClick={() =>
                          CartUpdate(
                            { type: "INCREMENT", payLoad: data._id },
                            data.name,
                            itemsInCart,
                            cartDispatch,
                            userToken
                          )
                        }
                      ></i>
                      <div className="card__quantity">{data.quantity}</div>
                      <i
                        class="fa fa-minus"
                        aria-hidden="true"
                        onClick={() =>
                          CartUpdate(
                            { type: "DECREMENT", payLoad: data._id },
                            data.name,
                            itemsInCart,
                            cartDispatch,
                            userToken
                          )
                        }
                      ></i>
                      <button
                        className="btn btn--primary  btn--trash"
                        onClick={
                          () =>
                            deleteCartItem(
                              data._id,
                              data.name,
                              cartDispatch,
                              userToken
                            )
                          // cartDispatch({ type: "REMOVE", payLoad: _id })
                        }
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <ToastContainer style={{ fontSize: "medium" }} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
