import { SET_NEWUSER_INFO } from "../utils/constants";

export const signupReducer = (state, action) => {
  switch (action.type) {
    case SET_NEWUSER_INFO:
      return { ...state, [action.payLoad.field]: action.payLoad.value };
    default:
      return state;
  }
};
