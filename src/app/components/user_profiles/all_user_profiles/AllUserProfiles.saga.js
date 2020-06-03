import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AllUserProfileActionTypes } from "./AllUserProfiles.actionTypes";
import api from "../../../api.json";

export function* getAllUserProfileData(req) {
  try {
    let res = null;
    req && req.payload.search
      ? (res = yield axios.post(api.userProfilesSearch, req.payload))
      : (res = yield axios.get(
          api.userProfiles + "/" + req.payload.page + "/" + req.payload.pageSize
        ));
    res.data.success
      ? yield put({
          type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_SUCCEEDED,
          GetAllUserProfile: res.data,
        })
      : yield put({
          type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_FAILED,
          GetAllUserProfile: res.data,
        });
  } catch (err) {
    yield put({
      type: AllUserProfileActionTypes.ALLUSERPROFILE_DATA_FAILED,
    });
  }
}
export function* updateUserProfileData({ payload }) {
  try {
    const res = yield axios.put(api.userProfiles + "/" + payload._id, payload);
    res.data.success
      ? yield put({
          type: AllUserProfileActionTypes.UPDATE_USERPROFILE_SUCCEEDED,
          EditUserProfile: res.data,
        })
      : yield put({
          type: AllUserProfileActionTypes.UPDATE_USERPROFILE_FAILED,
          EditUserProfile: res.data,
        });
  } catch (err) {
    yield put({
      type: AllUserProfileActionTypes.UPDATE_USERPROFILE_FAILED,
    });
  }
}

export function* getLicencesData(req) {
  try {
    let res = yield axios.get(api.licenses);
    res.data.success
      ? yield put({
          type: AllUserProfileActionTypes.GET_LICENCES_SUCCEEDED,
          getLicences: res.data,
        })
      : yield put({
          type: AllUserProfileActionTypes.GET_LICENCES_FAILED,
          getLicences: res.data,
        });
  } catch (err) {
    yield put({
      type: AllUserProfileActionTypes.GET_LICENCES_FAILED,
    });
  }
}

export function* getUserProfileDataWatcher() {
  yield takeLatest(
    AllUserProfileActionTypes.ALLUSERPROFILE_DATA,
    getAllUserProfileData
  );
}

export function* updateUserProfileDataWatcher() {
  yield takeLatest(
    AllUserProfileActionTypes.UPDATE_USERPROFILE_DATA,
    updateUserProfileData
  );
}

export function* getLicencesDataWatcher() {
  yield takeLatest(
    AllUserProfileActionTypes.GET_LICENCES_DATA,
    getLicencesData
  );
}
