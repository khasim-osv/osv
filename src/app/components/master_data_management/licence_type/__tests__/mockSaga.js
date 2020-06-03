import { put, takeLatest, all } from "redux-saga/effects";
import "@testing-library/jest-dom/extend-expect";

import axios from "axios";
import { LicenseActionTypes } from "../Licenses.actionTypes";

import api from "../../../../api.json";

jest.mock("axios");

/*const api = {
  licenses: "http://localhost:3000/api/licenses",
  addLicense: "http://localhost:3000/api/addLicense",
};*/

export default function* rootSaga() {
  yield all([
    getLicensesDataWatcher(),
    updateLicenseDataWatcher(),
    saveLicenseDataWatcher(),
  ]);
}

export function* getLicensesData() {
  try {
    const res = yield axios.get(api.licenses);
    res.data.success
      ? yield put({
          type: LicenseActionTypes.LICENSES_DATA_SUCCEEDED,
          getLicenses: res.data,
        })
      : yield put({
          type: LicenseActionTypes.LICENSES_DATA_FAILED,
          getLicenses: res.data,
        });
  } catch (err) {
    yield put({
      type: LicenseActionTypes.LICENSES_DATA_FAILED,
      getLicenses: { success: false, data: [] },
    });
  }
}

export function* updateLicenseData({ payload }) {
  try {
    const res = yield axios.put(api.licenses + "/" + payload._id, payload);
    res.data.success
      ? yield put({
          type: LicenseActionTypes.UPDATE_LICENSE_SUCCEEDED,
          editLicense: res.data,
        })
      : yield put({
          type: LicenseActionTypes.UPDATE_LICENSE_FAILED,
        });
  } catch (err) {
    yield put({
      type: LicenseActionTypes.UPDATE_LICENSE_FAILED,
    });
  }
}

export function* saveLicenseData({ payload }) {
  try {
    const res = yield axios.post(api.addLicense, payload);
    res.data.success
      ? yield put({
          type: LicenseActionTypes.SAVE_LICENSE_SUCCEEDED,
          saveLicense: res.data,
        })
      : yield put({
          type: LicenseActionTypes.SAVE_LICENSE_FAILED,
        });
  } catch (err) {
    yield put({
      type: LicenseActionTypes.SAVE_LICENSE_FAILED,
    });
  }
}

export function* getLicensesDataWatcher() {
  yield takeLatest(LicenseActionTypes.LICENSES_DATA, getLicensesData);
}

export function* updateLicenseDataWatcher() {
  yield takeLatest(LicenseActionTypes.UPDATE_LICENSE_DATA, updateLicenseData);
}

export function* saveLicenseDataWatcher() {
  yield takeLatest(LicenseActionTypes.SAVE_LICENSE_DATA, saveLicenseData);
}
