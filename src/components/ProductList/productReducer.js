export const productReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payLoad };
    case "LANGUAGE":
      return { ...state, language: action.payLoad };
    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

    case "CLEAR_FILTER":
      return {
        ...state,
        sortBy: null,
        showInventoryAll: "All",
        showFastDeliveryOnly: false
      };

    case "SHOW_TOAST":
      return {
        ...state,
        showToast: !state.showToast
      };
    default:
      return { state };
  }
};
