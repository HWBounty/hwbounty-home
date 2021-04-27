import {
  SET_THEME,
  SET_MODULE,
  SET_AUTH_POPUP_OPEN,
  SET_MODULE_FULLSCREEN,
} from "../types";

export const setTheme = (themeNum) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: themeNum });
};

export const setModule = (moduleId) => (dispatch) => {
  dispatch({ type: SET_MODULE, payload: parseInt(moduleId) });
};

export const setFullscreenModule = (name) => (dispatch) => {
  // basically, we check the url params of /modules/:moduleName
  // and convert that to id, set the fullscreen param to true, which enabled the modal

  const tmp_map = {
    calculator: 1,
    essayEditor: 2,
  };
  if (name !== "") {
    dispatch({ type: SET_MODULE, payload: tmp_map[name] });
  }
  dispatch({ type: SET_MODULE_FULLSCREEN, payload: true });
};

export const setAuthPopupOpen = (open) => (dispatch) => {
  dispatch({ type: SET_AUTH_POPUP_OPEN, payload: open });
};
