import "./EmptyCartStyles.css";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="empty">
      <h2 className="content">Oh no...Looks like your cart is empty !</h2>
      <Link to="/">
        <div className="btn-container">
          <div className="btn btn--primary shopping">Shop Now</div>
        </div>
      </Link>
    </div>
  );
};
