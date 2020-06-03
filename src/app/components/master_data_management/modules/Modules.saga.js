import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ModulesActionTypes } from "./Modules.actionTypes";

import api from "../../../api.json";

export function* getModulesData(req) {
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.modulesSearch, req.payload))
      : (res = yield axios.get(
          api.modules + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: ModulesActionTypes.MODULES_DATA_SUCCEEDED,

          getModules: res.data,
        })
      : yield put({
          type: ModulesActionTypes.MODULES_DATA_FAILED,

          getModules: res.data,
        });
  } catch (err) {
    yield put({
      type: ModulesActionTypes.MODULES_DATA_FAILED,
    });
  }
}

export function* updateModuleData({ payload }) {
  try {
    const res = yield axios.put(api.modules + "/" + payload._id, payload);
    res.data.success
      ? yield put({
          type: ModulesActionTypes.UPDATE_MODULES_SUCCEEDED,
          editModule: res.data,
        })
      : yield put({
          type: ModulesActionTypes.UPDATE_MODULES_FAILED,
        });
  } catch (err) {
    yield put({
      type: ModulesActionTypes.UPDATE_MODULES_FAILED,
    });
  }
}

export function* saveModuleData({ payload }) {
  try {
    const res = yield axios.post(api.addModule, payload);
    res.data.success
      ? yield put({
          type: ModulesActionTypes.SAVE_MODULES_SUCCEEDED,
          saveModule: res.data,
        })
      : yield put({
          type: ModulesActionTypes.SAVE_MODULES_FAILED,
        });
  } catch (err) {
    yield put({
      type: ModulesActionTypes.SAVE_MODULES_FAILED,
    });
  }
}

export function* getCategories() {
  try {
    const res = yield axios.get(api.categories);
    res.data.success
      ? yield put({
          type: ModulesActionTypes.UPDATE_CATEGORIES,
          categories: res.data,
        })
      : yield put({
          type: ModulesActionTypes.UPDATE_MODULES_FAILED,
          categories: res.data,
        });
  } catch (err) {
    yield put({
      type: ModulesActionTypes.UPDATE_MODULES_FAILED,
      categories: { success: false, data: [] },
    });
  }
}

export function* getModulesDataWatcher() {
  yield takeLatest(ModulesActionTypes.MODULES_DATA, getModulesData);
}

export function* updateModuleDataWatcher() {
  yield takeLatest(ModulesActionTypes.UPDATE_MODULES_DATA, updateModuleData);
}

export function* saveModuleDataWatcher() {
  yield takeLatest(ModulesActionTypes.SAVE_MODULES_DATA, saveModuleData);
}
export function* getCategoriesWatcher() {
  yield takeLatest(ModulesActionTypes.GET_CATEGORIES, getCategories);
}
