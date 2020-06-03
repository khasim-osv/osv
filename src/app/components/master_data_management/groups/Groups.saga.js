import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { GroupsActionTypes } from "./Groups.actionTypes";

import api from "../../../api.json";

export function* getGroupsData(req) {
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.groupsSearch, req.payload))
      : (res = yield axios.get(
          api.groups + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: GroupsActionTypes.GROUPS_DATA_SUCCEEDED,
          GetGroups: res.data,
        })
      : yield put({
          type: GroupsActionTypes.GROUPS_DATA_FAILED,
          GetGroups: res.data,
        });
  } catch (err) {
    yield put({
      type: GroupsActionTypes.GROUPS_DATA_FAILED,
    });
  }
}

export function* updateGroupsData(req) {
  const res = yield axios.put(api.groups + "/" + req.payload._id, req.payload);
  res.data.success
    ? yield put({
        type: GroupsActionTypes.UPDATE_GROUPS_SUCCEEDED,
        EditGroups: res.data,
      })
    : yield put({
        type: GroupsActionTypes.UPDATE_GROUPS_FAILED,
        EditGroups: res.data,
      });
}

export function* saveGroupsData(req) {
  const res = yield axios.post(api.groups, req.payload);
  res.data.success
    ? yield put({
        type: GroupsActionTypes.SAVE_GROUPS_SUCCEEDED,
        SaveGroups: res.data,
      })
    : yield put({
        type: GroupsActionTypes.SAVE_GROUPS_FAILED,
        SaveGroups: res.data,
      });
}

export function* getGroupsWatcher() {
  yield takeLatest(GroupsActionTypes.GROUPS_DATA, getGroupsData);
}

export function* updateGroupsWatcher() {
  yield takeLatest(GroupsActionTypes.UPDATE_GROUPS_DATA, updateGroupsData);
}

export function* saveGroupsWatcher() {
  yield takeLatest(GroupsActionTypes.SAVE_GROUPS_DATA, saveGroupsData);
}
