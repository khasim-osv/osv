import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { BanksActionTypes } from "./Banks.actionTypes";

import api from "../../../api.json";

export function* getBanksData(req) {
  console.log("from saga", req);
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.banksSearch, req.payload))
      : (res = yield axios.get(
          api.banks + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: BanksActionTypes.BANKS_DATA_SUCCEEDED,
          GetBanks: res.data,
        })
      : yield put({
          type: BanksActionTypes.BANKS_DATA_FAILED,
          GetBanks: res.data,
        });
  } catch (err) {
    yield put({
      type: BanksActionTypes.BANKS_DATA_FAILED,
    });
  }
}

export function* updateBanksData(req) {
  const formData = new FormData();
  formData.append("file", req.payload.logo);
  formData.append("data", JSON.stringify(req.payload));
  const res = yield axios.put(api.banks + "/" + req.payload._id, formData, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
  res.data.success
    ? yield put({
        type: BanksActionTypes.UPDATE_BANKS_SUCCEEDED,
        EditBanks: res.data,
      })
    : yield put({
        type: BanksActionTypes.UPDATE_BANKS_FAILED,
        EditBanks: res.data,
      });
}

export function* saveBanksData(req) {
  const formData = new FormData();
  formData.append("file", req.payload.logo);
  formData.append("data", JSON.stringify(req.payload));
  const res = yield axios.post(api.banks, formData, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
  res.data.success
    ? yield put({
        type: BanksActionTypes.SAVE_BANKS_SUCCEEDED,
        SaveBanks: res.data,
      })
    : yield put({
        type: BanksActionTypes.SAVE_BANKS_FAILED,
        SaveBanks: res.data,
      });
}

export function* getBanksWatcher() {
  yield takeLatest(BanksActionTypes.BANKS_DATA, getBanksData);
}

export function* updateBanksWatcher() {
  yield takeLatest(BanksActionTypes.UPDATE_BANKS_DATA, updateBanksData);
}

export function* saveBanksWatcher() {
  yield takeLatest(BanksActionTypes.SAVE_BANKS_DATA, saveBanksData);
}
