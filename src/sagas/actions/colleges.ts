export const Types = {
  GET_COLLEGES_REQUEST: "GET_COLLEGES_REQUEST",
  GET_COLLEGES_SUCCESS: "GET_COLLEGES_SUCCESS",
  CLEAR_SEARCH_RESULT: "CLEAR_SEARCH_RESULT"
};

export const getCollegesRequest = (name: string, page: number) => ({
  type: Types.GET_COLLEGES_REQUEST,
  payload: { name, page }
});

export const getCollegesSuccess = (items) => ({
  type: Types.GET_COLLEGES_SUCCESS,
  payload: items
});

export const clearSearchResult = () => ({
  type: Types.CLEAR_SEARCH_RESULT
});
