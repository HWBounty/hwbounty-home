import { SET_ASSIGNMENTS, SET_SCHEDULE } from "../types";

const initialState = {
  loading: false,
  assignments: [],
  schedule: {},
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
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
