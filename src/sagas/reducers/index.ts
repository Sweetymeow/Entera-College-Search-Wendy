import { combineReducers } from "redux";
import { Types } from "../actions/colleges";

const initialState = {
  metadata: {
    page: -1,
    total: 0,
    per_page: 30
  },
  results: []
};

const collegesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_COLLEGES_SUCCESS:
      const { metadata, results } = action?.payload;
      const updatedResult =
        metadata.page > state.metadata.page
          ? state.results.concat(results)
          : state.results;
      return {
        ...state,
        metadata,
        results: updatedResult
      };
    case Types.CLEAR_SEARCH_RESULT:
      return initialState;
    default:
      return state;
  }
};

export default combineReducers({
  colleges: collegesReducer
});
