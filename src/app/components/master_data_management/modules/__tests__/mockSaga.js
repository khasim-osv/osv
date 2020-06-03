import { put, takeLatest, all } from "redux-saga/effects";
import "@testing-library/jest-dom/extend-expect";

import axios from "axios";
import { ModulesActionTypes } from "../Modules.actionTypes";

jest.mock("axios");

//import api from ".././Login.test";

const api = {
  modules: "http://localhost:3000/api/modules",
  addModule: "http://localhost:3000/api/addModule",
};

export default function* rootSaga() {
  yield all([
    getModulesDataWatcher(),
    updateModuleDataWatcher(),
    saveModuleDataWatcher(),
  ]);
}

function* getModulesData() {
  try {
    const res = yield axios.get(api.modules);
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
      getModules: { success: false, data: [] },
    });
  }
}

function* updateModuleData({ payload }) {
  try {
    const res = yield axios.put(api.modules + "/" + payload._id, payload);
    // const res =   {data:{"success":true}}
    res.data.success
      ? yield put({
          type: ModulesActionTypes.UPDATE_MODULES_SUCCEEDED,
          EditModule: res.data,
        })
      : yield put({
          type: ModulesActionTypes.UPDATE_MODULES_FAILED,
          EditModule: res.data,
        });
  } catch (err) {
    yield put({
      type: ModulesActionTypes.UPDATE_MODULES_FAILED,
      EditModule: { success: false, data: [] },
    });
  }
}

export function* saveModuleData({ payload }) {
  try {
    const res = yield axios.post(api.addModule, payload);
    //  const res = yield axios.post();
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

function* getModulesDataWatcher() {
  yield takeLatest(ModulesActionTypes.MODULES_DATA, getModulesData);
}

function* updateModuleDataWatcher() {
  yield takeLatest(ModulesActionTypes.UPDATE_MODULES_DATA, updateModuleData);
}

export function* saveModuleDataWatcher() {
  yield takeLatest(ModulesActionTypes.SAVE_MODULES_DATA, saveModuleData);
}
