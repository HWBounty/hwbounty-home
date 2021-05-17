import {
  CALC_ADD_HISTORY,
  CALC_SET_INPUT,
  CALC_ADD_VARIABLE,
  CALC_REMOVE_VARIABLE,
} from "../types";

const initialState = {
  calculator: {
    variables: [],
    history: [],
    input: "",
  },
  essayEditor: {
    // idk
  },
};

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALC_ADD_HISTORY:
      return {
        ...state,
        calculator: {
          history: [action.payload, ...state.calculator.history],
        },
      };
    case CALC_SET_INPUT:
      return {
        ...state,
        calculator: {
          ...state.calculator,
          input: action.payload,
        },
      };
    case CALC_ADD_VARIABLE:
      return {
        ...state,
        calculator: {
          variables: [...state.calculator.variables, action.payload],
        },
      };
    case CALC_REMOVE_VARIABLE:
      const vars = state.calculator.variables.splice(
        state.calculator.variables.indexOf(action.payload)
      );
      return {
        ...state,
        calculator: {
          variables: vars,
        },
      };
    default:
      return state;
  }
};

export default moduleReducer;
