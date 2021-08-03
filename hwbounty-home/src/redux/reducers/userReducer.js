import { SET_AUTHENTICATED, SET_SCHOOLOGY_LINKED, SET_USER } from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  schoologyLinked: false,
  user: {},
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
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
