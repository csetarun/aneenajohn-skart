import { SET_USER_INFO } from "../utils/constants";

export const loginReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, [action.payLoad.field]: action.payLoad.value };
    default:
      return state;
  }
};
