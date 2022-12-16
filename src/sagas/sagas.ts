import { all } from "redux-saga/effects";
import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "./actions/colleges";
import { queryCollegesURL, collegeAPIBaseUrl } from "../utils";

const fetchColleges = (url?: string) => {
  return fetch(url || collegeAPIBaseUrl);
};

function* getColleges(state) {
  try {
    const { name, page } = state?.payload;
    const result = yield call(fetchColleges, queryCollegesURL(name, page));
    const data = yield result?.json();
    yield put(actions.getCollegesSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* watchGetCollegesRequest() {
  yield takeEvery(actions.Types.GET_COLLEGES_REQUEST, getColleges);
}

export default function* rootSaga() {
  yield all([fork(watchGetCollegesRequest)]);
}
