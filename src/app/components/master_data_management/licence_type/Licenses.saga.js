import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LicenseActionTypes } from "./Licenses.actionTypes";
import api from "../../../api.json";

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

export function* getModules() {
  try {
    const res = yield axios.get(api.getAllModules);
    res.data.success
      ? yield put({
          type: LicenseActionTypes.UPDATE_MODULES,
          modules: res.data.data,
        })
      : yield put({
          type: LicenseActionTypes.GET_MODULES_FAILED,
          modules: res.data,
        });
  } catch (err) {
    yield put({
      type: LicenseActionTypes.GET_MODULES_FAILED,
      modules: { success: false, data: [] },
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
export function* getModulesWatcher() {
  yield takeLatest(LicenseActionTypes.GET_MODULES, getModules);
}
