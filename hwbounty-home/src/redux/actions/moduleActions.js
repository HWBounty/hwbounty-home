import {
  CALC_ADD_HISTORY,
  CALC_SET_INPUT,
  CALC_ADD_VARIABLE,
  CALC_REMOVE_VARIABLE,
} from "../types";

export const calc_addHistory = (latex) => (dispatch) => {
  dispatch({ type: CALC_ADD_HISTORY, payload: latex });
};

export const calc_setInput = (latex) => (dispatch) => {
  dispatch({ type: CALC_SET_INPUT, payload: latex });
};
export const calc_addVariable = (variable) => (dispatch) => {
  dispatch({ type: CALC_ADD_VARIABLE, payload: variable });
};
export const calc_removeVariable = (variable) => (dispatch) => {
  dispatch({ type: CALC_REMOVE_VARIABLE, payload: variable });
};
