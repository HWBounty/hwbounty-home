import { SET_MODULE, SET_THEME } from "../types";

const initialState = {
  theme: 0, // [light, dark, titan]
  module: 1,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_MODULE:
      return {
        ...state,
        module: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
