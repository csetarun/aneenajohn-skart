import { SET_WISHLIST_DATA, ADD_TO_WISHLIST, REMOVE } from "../utils/constants";

export const wishReducer = (state, action) => {
  // console.log(state);
  // console.log(action.type);
  // console.log(action.payLoad);
  // console.log(state.wishList);
  // return state;
  switch (action.type) {
    case SET_WISHLIST_DATA:
      return {
        ...state,
        wishList: action.payload
      };
    case ADD_TO_WISHLIST:
      const isWishPresent = state.wishList?.find(
        (wish) => Number(wish._id) === Number(action.payLoad._id)
      );
      console.log("Is wish present", isWishPresent);
      return {
        ...state,
        wishList: state.wishList.find(
          (wish) => Number(wish._id) === Number(action.payLoad._id)
        )
          ? state.wishList.filter((wish) => wish._id !== action.payLoad._id)
          : [...state.wishList, action.payLoad]
      };
    case REMOVE:
      return {
        ...state,
        wishList: state.wishList.filter((item) => item._id !== action.payLoad)
      };
    default:
      return { state };
  }
};
