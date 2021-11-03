import { useCart } from "./cartContext";
import { useWishList } from "../WishList/wishContext";
import { Header } from "../header";
import { ToastContainer } from "react-toastify";
import {
  wishlistHandler,
  CartUpdate,
  deleteCartItem
} from "../ServerCalls/ServerCalls";
import { isAddedInList } from "../utils/utils";
import { EmptyCart } from "./EmptyCart";
import { useAuth } from "../Context/authProvider";
import "./cartList1.styles.css";
import "./cartStyles.css";
import { processPayment } from "./processPayment";
import { GetPrice } from "./getPrice";

export const Cart = () => {
  const { itemsInCart, dispatch: cartDispatch } = useCart();
  const { dispatch: wishDispatch, wishList } = useWishList();
  const {
    authState: { userToken }
  } = useAuth();
  // const [isQtyUpdated, setQtyUpdate] = useState(true);
  // const totalPrice = () =>
  //   itemsInCart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      {itemsInCart?.length === 0 && (
        <p className="para--lead">
          <EmptyCart />
        </p>
      )}
      <section className="cart-container">
        <div>
          {itemsInCart?.length !== 0 && (
            <div className="container__main">
              <h2 className="cart-title">My Cart ({itemsInCart?.length})</h2>
              <div className="cart-items">
                {itemsInCart?.map((data) => (
                  <div className="item" Key={data._id}>
                    <div className="card__thumbnail cart-image">
                      <img
                        src={data.imageUrl}
                        className="card__img"
                        alt="cardImg"
                      />
                    </div>
                    <i
                      className={
                        isAddedInList(data._id, wishList)
                          ? "fa fa-heart wish-icon cart wish-icon--selected"
                          : "fa fa-heart wish-icon cart"
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
                      <p className="description">{data.description}</p>
                      <div className="star-count">
                        <p className="star-count__star">{data.ratings}</p>
                        <div class="rating">
                          <div className="rating__stars">
                            <i className="fa fa-star" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                      <h2 className="price">
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
                        className="btn-outlined btn-outlined--primary  btn--trash"
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
              <div className="order-btn-container">
                <div
                  class="btn btn--primary order-btn"
                  onClick={() => processPayment(itemsInCart)}
                >
                  Place Order
                </div>
              </div>
              <ToastContainer style={{ fontSize: "medium" }} />
            </div>
          )}
        </div>
        {itemsInCart?.length !== 0 && (
          <div className="billing">
            <p className="bill-header para">Price Details</p>
            <div className="bill-container">
              <div className="bill-details para">
                <p>Price ({itemsInCart?.length} items)</p>
                {/* <p>{totalPrice()}</p> */}
                <p>
                  <GetPrice />
                </p>
              </div>
              <div className="bill-details para">
                <p>Delivery Charges</p>
                <p>
                  <span className="free">FREE</span>
                </p>
              </div>
              <div className="bill-details total para">
                <p>Total Amount</p>
                <p>
                  <GetPrice />
                  {/* <span>{totalPrice()}</span> */}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
