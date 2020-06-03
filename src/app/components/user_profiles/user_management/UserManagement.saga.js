import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { UserManagementActionTypes } from "./UserManagement.actionTypes";
import api from "../../../api.json";

export function* getUserManagementData(req) {
  try {
    const res = yield axios.get(api.userManagement + "/" + req.payload.id);
    res.data.success
      ? yield put({
          type: UserManagementActionTypes.USERMANAGEMENT_DATA_SUCCEEDED,
          getUser: res.data,
        })
      : yield put({
          type: UserManagementActionTypes.USERMANAGEMENT_DATA_FAILED,
          getUser: res.data,
        });
  } catch (err) {
    yield put({
      type: UserManagementActionTypes.USERMANAGEMENT_DATA_FAILED,
    });
  }
}

export function* updateUserManagementData(req) {
  try {
    const res = yield axios.post(api.userManagement, req.payload);
    res.data.success
      ? yield put({
          type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_SUCCEEDED,
          editUser: res.data,
        })
      : yield put({
          type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_FAILED,
          editUser: res.data,
        });
  } catch (err) {
    yield put({
      type: UserManagementActionTypes.UPDATE_USERMANAGEMENT_FAILED,
    });
  }
}

export function* getRoleMasterData(req) {
  try {
    const res = yield axios.get(
      api.roleMaster + "/" + req.payload.userProfileId
    );
    res.data.success
      ? yield put({
          type: UserManagementActionTypes.ROLEMASTER_DATA_SUCCEEDED,
          getRolesMaster: res.data,
        })
      : yield put({
          type: UserManagementActionTypes.ROLEMASTER_DATA_FAILED,
          getRolesMaster: res.data,
        });
  } catch (err) {
    yield put({
      type: UserManagementActionTypes.ROLEMASTER_DATA_FAILED,
    });
  }
}

export function* getProfileUsersData(req) {
  try {
    const res = yield axios.get(
      api.allProfileUsers + "/" + req.payload.userProfileId
    );
    res.data.success
      ? yield put({
          type: UserManagementActionTypes.GET_PROFILEUSERS_SUCCEEDED,
          getAllProfileUsers: res.data,
        })
      : yield put({
          type: UserManagementActionTypes.ROLEMASTER_DATA_FAILED,
          getAllProfileUsers: res.data,
        });
  } catch (err) {
    yield put({
      type: UserManagementActionTypes.ROLEMASTER_DATA_FAILED,
    });
  }
}

export function* getUserManagementDataWatcher() {
  yield takeLatest(
    UserManagementActionTypes.USERMANAGEMENT_DATA,
    getUserManagementData
  );
}

export function* updateUserManagementDataWatcher() {
  yield takeLatest(
    UserManagementActionTypes.UPDATE_USERMANAGEMENT_DATA,
    updateUserManagementData
  );
}

export function* getRoleMasterDataWatcher() {
  yield takeLatest(
    UserManagementActionTypes.ROLEMASTER_DATA,
    getRoleMasterData
  );
}

export function* getProfileUsersDataWatcher() {
  yield takeLatest(
    UserManagementActionTypes.GET_PROFILEUSERS_DATA,
    getProfileUsersData
  );
}
