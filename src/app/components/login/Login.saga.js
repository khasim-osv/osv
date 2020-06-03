import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { LoginActionTypes } from "./Login.actionTypes";
import api from "../../api.json";

export function fetchFromApi(req) {
  return axios.post(api.login, req.payload);
}

export function* loginUser(req) {
  try {
    const res = yield call(fetchFromApi, req);
    res.data.success
      ? yield put({ type: LoginActionTypes.LOGIN_SUCCEEDED, user: res.data })
      : yield put({ type: LoginActionTypes.LOGIN_FAILED, user: res.data });
  } catch (err) {
    yield put({
      type: LoginActionTypes.LOGIN_FAILED,
    });
  }
}

export function* loginUserWatcher() {
  yield takeLatest(LoginActionTypes.LOGIN, loginUser);
}
