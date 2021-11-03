import "./emptyWishlist-styles.css";
import { Link } from "react-router-dom";

export const EmptyWishlist = () => {
  // const navigate = useNavigate();
  return (
    <div className="empty">
      <h1 className="content">Oh no...Looks like your wishlist is empty</h1>
      <Link to="/">
        <div className="btn-container">
          <div className="btn btn--primary shopping">Shop Now</div>
        </div>
      </Link>
    </div>
  );
};
