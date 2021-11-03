import { createContext, useContext, useReducer } from "react";
import { wishReducer } from "./wishReducer";

export const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const wishList = [];
  const isWishListed = false;
  const [state, dispatch] = useReducer(wishReducer, { wishList, isWishListed });
  return (
    <WishContext.Provider
      value={
        (wishReducer, { wishList: state.wishList, dispatch, isWishListed })
      }
    >
      {children}
    </WishContext.Provider>
  );
};

export function useWishList() {
  return useContext(WishContext);
}
