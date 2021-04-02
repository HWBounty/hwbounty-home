import { SET_AUTHENTICATED, SET_SCHOOLOGY_LINKED } from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  schoologyLinked: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_SCHOOLOGY_LINKED:
      return {
        ...state,
        schoologyLinked: true,
      };
    default:
      return state;
  }
};

export default userReducer;
