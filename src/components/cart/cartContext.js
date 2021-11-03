import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const itemsInCart = [];
  const [state, dispatch] = useReducer(cartReducer, { itemsInCart });

  return (
    <CartContext.Provider
      value={(cartReducer, { itemsInCart: state.itemsInCart, dispatch })}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
