import { SET_ASSIGNMENTS } from "../types";

const initialState = {
  loading: false,
  assignments: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload.sort(
          (a, b) => new Date(a.due) - new Date(b.due)
        ),
      };
    default:
      return state;
  }
};

export default dataReducer;
