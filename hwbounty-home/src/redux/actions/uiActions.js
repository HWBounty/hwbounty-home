import { SET_THEME, SET_MODULE, SET_AUTH_POPUP_OPEN } from "../types";

export const setTheme = (themeNum) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: themeNum });
};

export const setModule = (moduleId) => (dispatch) => {
  dispatch({ type: SET_MODULE, payload: parseInt(moduleId) });
};

export const setAuthPopupOpen = (open) => (dispatch) => {
  dispatch({ type: SET_AUTH_POPUP_OPEN, payload: open });
};
