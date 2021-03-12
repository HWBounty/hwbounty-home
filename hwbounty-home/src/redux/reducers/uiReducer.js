import { SET_THEME } from "../types";

const initialState = {
  theme: 0, // [light, dark, titan]
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
