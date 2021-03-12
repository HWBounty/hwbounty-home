import { SET_THEME } from "../types";

export const setTheme = (themeNum) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: themeNum });
};
