import {
  CALC_PUSH_HISTORY,
  CALC_SET_INPUT,
  CALC_ADD_VARIABLE,
  CALC_REMOVE_VARIABLE,
  CALC_SET_PARSER,
} from "../types";

const initialState = {
  calculator: {
    variables: {},
    history: [],
    input: "",
  },
  essayEditor: {
    // idk
  },
};

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALC_PUSH_HISTORY:
      return {
        ...state,
        calculator: {
          ...state.calculator,
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
          ...state.calculator,
          variables: { ...state.calculator.variables, ...action.payload },
        },
      };
    case CALC_REMOVE_VARIABLE:
      let vars = state.calculator.variables;
      delete vars[action.payload];
      return {
        ...state,
        calculator: {
          ...state.calculator,
          variables: vars,
        },
      };
    default:
      return state;
  }
};

export default moduleReducer;
