import { UPDATE, ADD_TO_CART, REMOVE, SET_CART_DATA } from "../utils/constants";

export const cartReducer = (state, action) => {
  // console.log(action.type);
  // console.log(action.payLoad);
  // console.log({ state });
  switch (action.type) {
    case SET_CART_DATA:
      return {
        ...state,
        itemsInCart: action.payload
      };
    case ADD_TO_CART:
      return {
        ...state,
        itemsInCart: state.itemsInCart.find(
          (item) => Number(item._id) === Number(action.payLoad._id)
        )
          ? state.itemsInCart.filter((item) => item._id !== action.payLoad._id)
          : [...state.itemsInCart, action.payLoad]
      };
    case UPDATE:
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item._id === action.payLoad._id
            ? { ...item, quantity: action.payLoad.quantity }
            : item
        )
      };

    case REMOVE:
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action.payLoad
        )
      };

    default:
      return state;
  }
};
