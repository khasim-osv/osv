import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { CreateUserProfileActionTypes } from "./CreateUserProfile.actionTypes";
import api from "../../../api.json";

export function* getPageData() {
  try {
    yield put({
      type: CreateUserProfileActionTypes.RESET_COMPANY_INFO,
    });
    yield put({
      type: CreateUserProfileActionTypes.RESET_SIGN_IN,
    });
    yield put({
      type: CreateUserProfileActionTypes.RESET_BANK_ACCOUNTS,
    });
    yield put({
      type: CreateUserProfileActionTypes.RESET_ROLES,
    });
    yield put({
      type: CreateUserProfileActionTypes.RESET_USERS,
    });
    const res = yield axios.get(api.getCreateUserPageData);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS,
          pageData: res.data.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.GET_PAGE_DATA_FAILED,
    });
  }
}

export function* saveCompanyInfo({ payload }) {
  try {
    const res = yield axios.post(api.saveCompanyInfo, payload);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS,
          saveCompanyInfo: res.data.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
          saveCompanyInfo: res.data.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
      saveCompanyInfo: { success: false, data: [] },
    });
  }
}

export function* saveSignInInInfo({ payload }) {
  try {
    const res = yield axios.post(api.saveSignInInfo, payload);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS,
          saveSignInInfo: res.data.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED,
          saveSignInInfo: res.data.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_FAILED,
      saveSignInInfo: { success: false, data: [] },
    });
  }
}
export function* saveBankAccountsInfo({ payload }) {
  try {
    //const res = yield axios.post(api.saveBankAccountsInfo, payload.bank);
    const res = yield axios.post(api.saveBankAccountsInfo, payload);
    if (payload._id) {
      res.data.success
        ? yield put({
            type: CreateUserProfileActionTypes.UPDATE_BANK_ACCOUNTS_SUCCESS,
            updatedBankAcc: res.data.data,
          })
        : yield put({
            type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
            saveBankAccounts: res.data.data,
          });
    } else {
      res.data.success
        ? yield put({
            type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_SUCCESS,
            saveBankAccounts: res.data.data,
          })
        : yield put({
            type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
            saveBankAccounts: res.data.data,
          });
    }
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS_FAILED,
      saveBankAccounts: { success: false, data: [] },
    });
  }
}

export function* saveWFManagement({ payload }) {
  try {
    const res = yield axios.post(api.addWorkflowManagement, payload);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_SUCCESS,
          saveWFManagement: res.data.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_FAILED,
          saveWFManagement: res.data.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_FAILED,
      saveWFManagement: { success: false, data: [] },
    });
  }
}

export function* saveCommunication({ payload }) {
  try {
    const res = yield axios.post(api.saveCommunication, payload);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_SUCCESS,
          saveCommunication: res.data.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED,
          saveCommunication: res.data.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.SAVE_COMMUNICATION_FAILED,
      saveCommunication: { success: false, data: [] },
    });
  }
}

export function* getUserProfile({ _id }) {
  try {
    const res = yield axios.get(api.getUserProfile + "/" + _id);

    if (res.data.success) {
      yield put({
        type: CreateUserProfileActionTypes.GET_PAGE_DATA_SUCCESS,
        pageData: res.data.pageData,
      });
      yield put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_SUCCESS,
        saveCompanyInfo: {
          ...res.data.companyInfoData,
          load: true,
        },
      });
      yield put({
        type: CreateUserProfileActionTypes.SAVE_SIGNIN_INFO_SUCCESS,
        saveSignInInfo: {
          ...res.data.signInInfoData,
          load: true,
        },
      });
      yield put({
        type: CreateUserProfileActionTypes.LOAD_BANK_ACCOUNTS,
        saveBankAccounts: res.data.bankAccounts,
      });
      yield put({
        type: CreateUserProfileActionTypes.GET_ROLES,
        roles: res.data.roles,
      });
      yield put({
        type: CreateUserProfileActionTypes.GET_USERS,
        users: res.data.users,
      });
      yield put({
        type: CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT_SUCCESS,
        saveWFManagement: { success: true, load: true },
      });
    }
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.GET_USER_PROFILE_FAILED,
      pageData: { success: false, data: [] },
    });
  }
}

export function* getWorkflowData({ payload }) {
  try {
    const res = yield axios.get(api.workflow + "/" + payload.userProfileId);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.GET_WORKFLOW_SUCCEEDED,
          getWorkflowData: res.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.GET_WORKFLOW_FAILED,
          getWorkflowData: res.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.GET_WORKFLOW_FAILED,
      getWorkflowData: { success: false, data: {} },
    });
  }
}

export function* updateWorkflowData({ payload }) {
  try {
    const res = yield axios.post(api.workflow, payload);
    res.data.success
      ? yield put({
          type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_SUCCEEDED,
          updateWorkflowData: res.data,
        })
      : yield put({
          type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_FAILED,
          updateWorkflowData: res.data,
        });
  } catch (err) {
    yield put({
      type: CreateUserProfileActionTypes.UPDATE_WORKFLOW_FAILED,
      updateWorkflowData: { success: false, data: {} },
    });
  }
}

/* watchers */
export function* getPageDataWatcher() {
  yield takeLatest(CreateUserProfileActionTypes.GET_PAGE_DATA, getPageData);
}
export function* saveCompanyInfoWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.SAVE_COMPANY_INFO,
    saveCompanyInfo
  );
}
export function* saveSignInInfoWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.SAVE_SIGNIN_INFO,
    saveSignInInInfo
  );
}
export function* saveBankAccountsInfoWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.SAVE_BANK_ACCOUNTS,
    saveBankAccountsInfo
  );
}
export function* saveWFManagementWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.SAVE_WORKFORCE_MANAGEMENT,
    saveWFManagement
  );
}
export function* saveCommunicationWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.SAVE_COMMUNICATION,
    saveCommunication
  );
}
export function* getUserProfileWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.GET_USER_PROFILE,
    getUserProfile
  );
}
export function* getWorkflowDataWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.GET_WORKFLOW_DATA,
    getWorkflowData
  );
}
export function* updateWorkflowDataWatcher() {
  yield takeLatest(
    CreateUserProfileActionTypes.UPDATE_WORKFLOW_DATA,
    updateWorkflowData
  );
}
