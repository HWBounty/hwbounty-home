import { SET_THEME, SET_MODULE } from "../types";

export const setTheme = (themeNum) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: themeNum });
};

export const setModule = (moduleId) => (dispatch) => {
  dispatch({ type: SET_MODULE, payload: parseInt(moduleId) });
};
