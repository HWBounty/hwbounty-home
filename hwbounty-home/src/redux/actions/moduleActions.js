import {
  CALC_PUSH_HISTORY,
  CALC_SET_INPUT,
  CALC_ADD_VARIABLE,
  CALC_REMOVE_VARIABLE,
  CALC_POP_HISTORY,
} from "../types";

export const calc_addHistory = (latex) => (dispatch) => {
  dispatch({ type: CALC_PUSH_HISTORY, payload: latex });
  //dispatch({ type: CALC_POP_HISTORY });
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
