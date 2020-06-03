import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { RoleManagementActionTypes } from "./RoleManagement.actionTypes";
import api from "../../../api.json";

export function* getRoleManagementData(req) {
  let res = null;
  try {
    res = yield axios.get(api.roleManagement + "/" + req.payload.id);
    res.data.success
      ? yield put({
          type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_SUCCEEDED,
          getRole: res.data,
        })
      : yield put({
          type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED,
          getRole: res.data,
        });
  } catch (err) {
    yield put({
      type: RoleManagementActionTypes.ROLEMANAGEMENT_DATA_FAILED,
    });
  }
}

export function* updateRoleManagementData(req) {
  try {
    const res = yield axios.post(api.roleManagement, req.payload);
    res.data.success
      ? yield put({
          type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_SUCCEEDED,
          editRole: res.data,
        })
      : yield put({
          type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED,
          editRole: res.data,
        });
  } catch (err) {
    yield put({
      type: RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_FAILED,
    });
  }
}
export function* getAllRolesManagementData(req) {
  let res = null;
  try {
    res = yield axios.get(api.getAllRoles + "/" + req.payload.userProfileId);
    res.data.success
      ? yield put({
          type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_SUCCEEDED,
          getAllRoles: res.data,
        })
      : yield put({
          type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_FAILED,
          getAllRoles: res.data,
        });
  } catch (err) {
    yield put({
      type: RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA_FAILED,
    });
  }
}
export function* getMasterModulesData(req) {
  try {
    let res = null;
    req.payload.roleId
      ? (res = yield axios.get(
          api.roleModules +
            "/" +
            req.payload.userProfileId +
            "/" +
            req.payload.roleId
        ))
      : (res = yield axios.get(
          api.licenceModules + "/" + req.payload.userProfileId
        ));

    res.data.success
      ? yield put({
          type: RoleManagementActionTypes.GET_MASTERMODULES_SUCCEEDED,
          getMasterModules: res.data,
        })
      : yield put({
          type: RoleManagementActionTypes.GET_MASTERMODULES_FAILED,
          getMasterModules: res.data,
        });
  } catch (err) {
    yield put({
      type: RoleManagementActionTypes.GET_MASTERMODULES_FAILED,
    });
  }
}

export function* getRoleManagementDataWatcher() {
  yield takeLatest(
    RoleManagementActionTypes.ROLEMANAGEMENT_DATA,
    getRoleManagementData
  );
}

export function* updateRoleManagementDataWatcher() {
  yield takeLatest(
    RoleManagementActionTypes.UPDATE_ROLEMANAGEMENT_DATA,
    updateRoleManagementData
  );
}

export function* getMasterModulesDataWatcher() {
  yield takeLatest(
    RoleManagementActionTypes.GET_MASTERMODULES_DATA,
    getMasterModulesData
  );
}
export function* getAllRolesDataWatcher() {
  yield takeLatest(
    RoleManagementActionTypes.ALLROLESMANAGEMENT_DATA,
    getAllRolesManagementData
  );
}
