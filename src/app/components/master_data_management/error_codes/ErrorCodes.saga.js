import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ErrorCodesActionTypes } from "./ErrorCodes.actionTypes";

import api from "../../../api.json";

export function* getErrorCodesData(req) {
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.errorCodesSearch, req.payload))
      : (res = yield axios.get(
          api.errorCodes + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: ErrorCodesActionTypes.ERRORCODE_DATA_SUCCEEDED,
          GetErrorCodes: res.data,
        })
      : yield put({
          type: ErrorCodesActionTypes.ERRORCODE_DATA_FAILED,
          GetErrorCodes: res.data,
        });
  } catch (err) {
    yield put({
      type: ErrorCodesActionTypes.ERRORCODE_DATA_FAILED,
    });
  }
}

export function* updateErrorCodesData(req) {
  const res = yield axios.put(
    api.errorCodes + "/" + req.payload._id,
    req.payload
  );
  res.data.success
    ? yield put({
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_SUCCEEDED,
        EditErrorCodes: res.data,
      })
    : yield put({
        type: ErrorCodesActionTypes.UPDATE_ERRORCODE_FAILED,
        EditErrorCodes: res.data,
      });
}

export function* saveErrorCodesData(req) {
  const res = yield axios.post(api.errorCodes, req.payload);
  res.data.success
    ? yield put({
        type: ErrorCodesActionTypes.SAVE_ERRORCODE_SUCCEEDED,
        SaveErrorCodes: res.data,
      })
    : yield put({
        type: ErrorCodesActionTypes.SAVE_ERRORCODE_FAILED,
        SaveErrorCodes: res.data,
      });
}

export function* getErrorCodesDataWatcher() {
  yield takeLatest(ErrorCodesActionTypes.ERRORCODE_DATA, getErrorCodesData);
}

export function* updateErrorCodesDataWatcher() {
  yield takeLatest(
    ErrorCodesActionTypes.UPDATE_ERRORCODE_DATA,
    updateErrorCodesData
  );
}

export function* saveErrorCodesDataWatcher() {
  yield takeLatest(
    ErrorCodesActionTypes.SAVE_ERRORCODE_DATA,
    saveErrorCodesData
  );
}
