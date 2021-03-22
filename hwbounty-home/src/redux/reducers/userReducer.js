import { SET_AUTHENTICATED } from "../types";

const initialState = {
  loading: false,
  authenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
