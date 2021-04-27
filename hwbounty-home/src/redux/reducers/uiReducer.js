import { SET_AUTH_POPUP_OPEN, SET_MODULE, SET_THEME } from "../types";

const initialState = {
  theme: 0, // [light, dark, titan]
  module: 1,
  moduleFullscreen: false,
  authPopupOpen: false,
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
    case SET_AUTH_POPUP_OPEN:
      return {
        ...state,
        authPopupOpen: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
